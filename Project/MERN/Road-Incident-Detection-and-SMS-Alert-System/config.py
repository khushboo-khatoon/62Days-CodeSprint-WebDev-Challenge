# config.py
# Secret keys / URIs. DO NOT COMMIT with real credentials to public repos.

# Twilio credentials
TWILIO_ACCOUNT_SID = "your_account_sid"
TWILIO_AUTH_TOKEN = "your_auth_token"
TWILIO_FROM_NUMBER = "your_from_number"  # Twilio virtual number

# MongoDB (Atlas) connection string (use srv or non-srv)
MONGO_URI = "your_uri"
MONGO_DB_NAME = "resq"
MONGO_COLLECTION = "reports"

# T5 Model ('t5-small' or path to local checkpoint)
T5_MODEL_NAME = "t5-small"

# Video source:
# Supports:
#   - 0 or 1 (webcam index)
#   - /dev/video0 (device path)
#   - RTSP/HTTP stream URL (e.g. "http://<ip>:8080/video")
import os

_default_video_source = "0"
VIDEO_SOURCE_ENV = os.environ.get("VIDEO_SOURCE", _default_video_source).strip()

# If env looks like an int, use as webcam index; otherwise treat as URL/device path.
try:
    VIDEO_SOURCE = int(VIDEO_SOURCE_ENV)
except ValueError:
    VIDEO_SOURCE = VIDEO_SOURCE_ENV


# Default location for incidents
INCIDENT_LOCATION = "PES University RR Campus, Banashankari, Bengaluru 560085"

# Flask settings
FLASK_HOST = "0.0.0.0"
FLASK_PORT = 5000
