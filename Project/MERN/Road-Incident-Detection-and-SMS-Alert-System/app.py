from flask import Flask, Response, jsonify
import detector
import time
import numpy as np
import cv2

from detector import start_detector_thread, CURRENT_PREDICTION_DATA, CURRENT_FRAME, STATE_LOCK, FRAME_LOCK
from config import FLASK_HOST, FLASK_PORT, VIDEO_SOURCE

app = Flask(__name__)


# --- Start Detector Thread ---
start_detector_thread(
    video_source=VIDEO_SOURCE,
    model_dir="mobilenet",
    conf_threshold=0.5,
    inference_delay=0.08
)


# --- Video Frame Generator (optimized) ---
def generate_frames():
    """Stream MJPEG frames.

    Optimization: encode only when the detector has produced a new frame,
    and keep a steady target FPS to avoid UI jitter.
    """
    target_fps = 25
    frame_interval = 1.0 / target_fps

    last_frame_id = None
    while True:
        start = time.time()

        with FRAME_LOCK:
            frame_exists = detector.CURRENT_FRAME is not None
            frame_id = getattr(detector, "CURRENT_FRAME_ID", None)
            frame = detector.CURRENT_FRAME.copy() if frame_exists else np.zeros((480, 640, 3), dtype=np.uint8)

        if not frame_exists:
            cv2.putText(
                frame,
                "Initializing Camera...",
                (50, 240),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (255, 255, 255),
                2,
            )

        # Only encode when frame_id changes (detector updated).
        if frame_exists and frame_id is not None and frame_id != last_frame_id:
            ret, buffer = cv2.imencode('.jpg', frame)
            if ret:
                last_frame_id = frame_id
                yield (
                    b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n'
                )
        elif frame_exists and frame_id is None:
            # Fallback if CURRENT_FRAME_ID is not available.
            ret, buffer = cv2.imencode('.jpg', frame)
            if ret:
                yield (
                    b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n'
                )

        elapsed = time.time() - start
        sleep_for = frame_interval - elapsed
        if sleep_for > 0:
            time.sleep(sleep_for)


# --- API Routes for the Node.js server ---
@app.route('/api/data')
def current_data():
    """Returns the latest detection data."""
    with STATE_LOCK:
        data = CURRENT_PREDICTION_DATA.copy()
    return jsonify(data)


@app.route('/api/video_feed')
def video_feed():
    """Streams the processed video frames."""
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/')
def index():
    return {
        "status": "ok",
        "message": "Flask detector API is running",
        "routes": ["/api/data", "/api/video_feed"],
    }


if __name__ == "__main__":
    # Note: Run this with a production-ready WSGI server like Gunicorn
    app.run(host=FLASK_HOST, port=FLASK_PORT, debug=True, use_reloader=False, threaded=True)

