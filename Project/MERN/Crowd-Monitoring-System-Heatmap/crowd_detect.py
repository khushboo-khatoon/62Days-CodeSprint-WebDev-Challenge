import cv2
import numpy as np
import time
import argparse
import json
import base64
import sys
import os
from sklearn.cluster import DBSCAN

# --- Argument Parser ---
ap = argparse.ArgumentParser()
ap.add_argument("--server", action="store_true",
                help="Run in server mode (output JSON to stdout)")
ap.add_argument("-i", "--input", type=str, default="0",
                help="path to input video file or camera index")
args = vars(ap.parse_args())

# --- Constants ---
SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
PROTOTXT_PATH = os.path.join(SCRIPT_DIR, "mobilenet", "MobileNetSSD_deploy.prototxt")
MODEL_PATH = os.path.join(SCRIPT_DIR, "mobilenet", "MobileNetSSD_deploy.caffemodel")

PERSON_CLASS_ID = 15
CONFIDENCE_THRESHOLD = 0.5

ALERT_THRESHOLD = 5
CLUSTER_DISTANCE = 75  # Adjust based on camera scale
CLUSTER_SIZE_THRESHOLD = 3  # Min number of people to form a cluster
HEATMAP_DECAY = 0.95  # Decay factor for the heatmap intensity

# Load model
net = cv2.dnn.readNetFromCaffe(PROTOTXT_PATH, MODEL_PATH)

# --- Video Capture Initialization ---
source = args["input"]
try:
    # Try to convert to integer for camera index
    source = int(source)
except ValueError:
    # Keep as string for file path
    pass

cap = cv2.VideoCapture(source)

if not cap.isOpened():
    print(f"[ERROR] Could not open video source: {args['input']}", file=sys.stderr)
    sys.exit(1)

heatmap = None

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Initialize heatmap on the first valid frame
    if heatmap is None:
        h, w = frame.shape[:2]
        heatmap = np.zeros((h, w), dtype=np.float32)

    # Apply a decay factor to the heatmap to fade old detections
    heatmap *= HEATMAP_DECAY

    h, w = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 0.007843, (300, 300), 127.5)
    net.setInput(blob)
    detections = net.forward()

    people_centroids = []

    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        class_id = int(detections[0, 0, i, 1])

        if confidence > CONFIDENCE_THRESHOLD and class_id == PERSON_CLASS_ID:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            x1, y1, x2, y2 = box.astype("int")
            cx, cy = int((x1 + x2) / 2), int((y1 + y2) / 2)
            if 0 <= cx < w and 0 <= cy < h:
                people_centroids.append([cx, cy])
                heatmap[cy, cx] += 1
                cv2.rectangle(frame, (x1, y1), (x2, y2), (57, 255, 20), 3)

    # Cluster detection
    cluster_count = 0
    # Only run DBSCAN if there are enough people to potentially form a cluster
    if len(people_centroids) >= CLUSTER_SIZE_THRESHOLD:
        people_np = np.array(people_centroids)
        clustering = DBSCAN(eps=CLUSTER_DISTANCE, min_samples=CLUSTER_SIZE_THRESHOLD).fit(people_np)
        labels = clustering.labels_

        unique_clusters = set(labels)
        if -1 in unique_clusters:
            unique_clusters.remove(-1)  # Remove noise points
        cluster_count = len(unique_clusters)

    # Heatmap
    heatmap_blur = cv2.GaussianBlur(heatmap, (51, 51), 0)
    heatmap_norm = cv2.normalize(heatmap_blur, None, 0, 255, cv2.NORM_MINMAX)
    heatmap_color = cv2.applyColorMap(heatmap_norm.astype(np.uint8), cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(heatmap_color, 0.6, frame, 0.4, 0)

    # Display crowd info
    cv2.putText(overlay, f"People: {len(people_centroids)}", (20, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    cv2.putText(overlay, f"Clusters: {cluster_count}", (w - 250, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)

    if len(people_centroids) >= ALERT_THRESHOLD:
        cv2.putText(overlay, "ALERT: CROWD FORMING", (20, 70),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

    if args["server"]:
        # --- Server Mode: Output JSON ---
        _, buffer = cv2.imencode('.jpg', overlay)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        output = {
            "people_count": len(people_centroids),
            "cluster_count": cluster_count,
            "frame": frame_base64
        }
        print(json.dumps(output))
        sys.stdout.flush()  # Ensure data is sent immediately
    else:
        # --- Desktop Mode: Display Window ---
        cv2.imshow("Crowd and Cluster Monitoring", overlay)
        if cv2.waitKey(1) == 27:  # ESC key
            break

cap.release()
cv2.destroyAllWindows()
