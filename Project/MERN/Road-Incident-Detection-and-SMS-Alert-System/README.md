<div align="center">

   # 🚨 Real-Time Road Incident/Hazard Detection and SMS Alert Notification System
   ### A real-time road incident detection system using Computer Vision (MobileNet SSD + optional YOLO), AI-based incident reporting (T5), and instant SMS alerts (Twilio) via a dashboard.
   <img width="1000" height="auto" alt="Screenshot from 2025-11-16 13-43-00" src="https://github.com/user-attachments/assets/79ffb09b-3f4b-4fa7-9426-e50f9181bf51">

</div>
<p></p>

### Original Repo link: [github.com/riyahal/Road-Incident-Detection-and-SMS-Alert-System](github.com/riyahal/Road-Incident-Detection-and-SMS-Alert-System)

---

## TABLE OF CONTENTS

* <b>[📝 Overview](#overview)</b>
    * [🧩 Core Features](#core-features)
    * [💥 Incidents the CV/YOLO Model Detects](#incidents-the-cvyolo-model-detects)

* <b>[📹 Project Demo Images](#project-demo-images)</b>

* <b>[⚙️ Technology Stack](#technology-stack)</b>

* <b>[🔄 System Flow](#system-flow)</b>
    * [🖧 Diagram](#diagram)
    * [📝 Steps](#steps)

* <b>[📁 Project Structure](#project-structure)</b>
    * [🐍 Root Python Modules](#root-python-modules)
    * [📦 Model Folder](#model-folder)
    * [🎨 UI Layer](#ui-layer)
    * [🧪 Dependencies](#dependencies)

* <b>[🔧 Configuration Guide](#configuration-guide)</b>
    * [💬 Create a Free Twilio Account](#step-1---create-a-free-twilio-account)
    * [⛁ Create a Free MongoDB Atlas Account](#step-2---create-a-free-mongodb-atlas-account)

* <b>[🚀 Steps to Run The Application](#steps-to-run-the-application)</b>

* <b>[💪 Development Challenges](#development-challenges)</b>

* <b>[✅ Final Notes](#final-notes)</b>

* <b>[License](#license)</b>

---

## Overview

This system continuously monitors video feeds, detects hazards, generates natural-language incident reports using T5, and alerts responders through SMS.

My team of 3 developed this during a 24-hr hackathon, and we were shortlisted to round 2. However, we did not place in the final rankings.

This repository contains a full end-to-end pipeline: Flask (CV + dashboard) + Node/Express (API proxy, SMS dispatch, MongoDB logging) + MongoDB/Mongoose + a React dashboard UI. All components included here work together as provided.

### Core Features

* 📹 **Real-time video analysis** (OpenCV + MobileNet SSD + optional YOLO)
* 🧠 **Automatic incident reports** using a T5 model
* 🕹️ Controller verification interface
* ✉️ **SMS dispatch via Twilio**
* 🌐 Flask dashboard for real-time monitoring

### Incidents the CV/YOLO Model Detects

The detector supports multiple incident heuristics.

* Vehicle Crash 💥 (vehicle bounding boxes touching/overlapping logic)
* Traffic Jam 🚧 (proximity and clustering logic)
* Fire 🔥 (HSV color detection logic)
* Person Hit by Vehicle 💥 (approximate proximity logic)

---

## Project Demo Images

<b>For our hackathon demo, we used toy cars to simulate a real car crash. Bounding boxes can be seen around the cars along with confidence scores.</b>

<div align="center">
<img width="850" height="auto" alt="Screenshot from 2025-11-16 13-43-00" src="https://github.com/user-attachments/assets/79ffb09b-3f4b-4fa7-9426-e50f9181bf51">
</div>

<b>Multiple incidents occurring at the same time or overlapping will also be displayed:</b>

<div align="center">
<img width="449" height="49" alt="image" src="https://github.com/user-attachments/assets/21117233-7ae3-4d88-b26f-6c37d2e672d7" />
</div>

<b>After an incident is detected (in this case, fire), an SMS alert is triggered via Twilio API.</b>

<div align="center">
<img width="auto" height="500" alt="Screenshot from 2025-10-26 06-03-47" src="https://github.com/user-attachments/assets/10649a17-e1d8-44d5-a2b1-dbffad3adaa0" />
</div>

<b>The incident data is logged to MongoDB.</b>

<div align="center">
<img width="900" height="auto" alt="Screenshot from 2025-10-24 21-54-04" src="https://github.com/user-attachments/assets/979a66ad-ca83-45a4-b6fc-3a95b804fc92" />
</div>

---

## Technology Stack

### Web & Backend Frameworks

![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask)
![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn)

**- Flask**: Flask web server (routes + dashboard)  
**- Gunicorn**: Optional production WSGI server for Flask (deployment)

### Optional UI / API Components (MERN-style)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)

**- React**: Optional dashboard UI (`client/`)  
**- Express**: Optional Node/Express API (`server/`)  
**- Mongoose**: MongoDB ODM used by the Node server

### Computer Vision (CV) Stack

![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv)
![Ultralytics](https://img.shields.io/badge/Ultralytics-YOLOv8-blue?style=for-the-badge&logo=ultralytics)

**- opencv-python**: OpenCV with GUI support (local testing)  
**- opencv-python-headless**: Headless OpenCV for servers / Docker  
**- ultralytics**: YOLOv8 (optional real-time object detection)

### Deep Learning / AI Components

![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch)
![Transformers](https://img.shields.io/badge/HuggingFace-Transformers-yellow?style=for-the-badge&logo=huggingface)
![scikit-learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikitlearn)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas)

**- torch**: PyTorch backend for T5 + model inference  
**- transformers**: HuggingFace Transformers (T5 model)  
**- sentencepiece**: Tokenizer dependency for T5  
**- tokenizers**: Fast tokenizer library (HF)  
**- scikit-learn**: ML utilities (clustering/overlap logic)  
**- datasets**: HuggingFace dataset loader (optional)  
**- pandas**: Data handling for logs and tables

### Database Layer

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb)

**- pymongo[srv]**: MongoDB Atlas connector (SRV protocol)

### Messaging / API Integrations

![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio)

**- twilio**: SMS notifications API

### Utilities (Optional)

![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy)
![Matplotlib](https://img.shields.io/badge/Matplotlib-11557C?style=for-the-badge&logo=matplotlib)

**- numpy**: Numerical operations used across CV + ML  
**- matplotlib**: Debug visuals, heatmaps, plotting

---

## System Flow

### Diagram

```
Camera → OpenCV Detection → Incident? → T5 Report → Twilio SMS Dispatch
```

### Steps

1. 📡 Capture video feed.
2. 🧠 Run CV incident detection.
3. 📝 Generate AI narrative.
4. 📤 SMS dispatch.
5. 🚑 Responders notified (Ambulance/Police/Fire Station).

---

## Project Structure

```
Road-Incident-Detection-and-SMS-Alert-System/
├── app.py                       # Flask detector + dashboard server
├── detector.py                  # CV pipeline + incident detection thread
├── main.py                      # Incident classification/merging logic
├── t5_generator.py              # T5 narrative generator
├── db_utils.py                  # MongoDB logging utilities
├── sms_utils.py                 # Twilio SMS sender
├── resources.py                 # Emergency receiver mapping
├── config.py                    # Twilio + MongoDB + runtime settings
├── requirements.txt            # Python dependencies
├── mobilenet/                  # MobileNet SSD model files
│   ├── MobileNetSSD_deploy.prototxt
│   └── MobileNetSSD_deploy.caffemodel
├── templates/                  # Flask templates
│   ├── index.html
│   └── history.html
├── static/                     # Flask static assets
│   └── styles.css
|
└── server/                     # Node/Express
    ├── server.js
    ├── routes/api.js
    └── services/twilioService.js

└── client/                     # React UI
    └── src/...
```

---

### Root Python Modules

#### `app.py`
Flask backend that serves the dashboard and streams the processed video.

#### `detector.py`
Real-time CV pipeline (MobileNet SSD detection + incident heuristics).

#### `main.py`
Incident classification, clustering/merge logic, and priority scoring.

#### `t5_generator.py`
T5 narrative generation.

#### `db_utils.py`
MongoDB logging utilities.

#### `sms_utils.py`
Twilio SMS sender.

#### `resources.py`
Maps incident type to receiver phone numbers.

#### `config.py`
Runtime settings, Twilio credentials, and MongoDB settings.

---

### Model Folder

MobileNet SSD pretrained model files.

---

### UI Layer

#### `templates/index.html`
Dashboard (video feed + real-time generated incident data)

#### `templates/history.html`
Log history (fetched dynamically from MongoDB)

---

### Dependencies

`requirements.txt`

```
flask
gunicorn
opencv-python
opencv-python-headless
ultralytics
torch
transformers
sentencepiece
tokenizers
scikit-learn
datasets
pandas
pymongo[srv]
twilio
numpy
matplotlib
```

---

## Configuration Guide

### Step 1 - Create a Free Twilio Account

Get your Twilio credentials (**Account SID**, **Auth Token**, and a **Twilio phone number**).

Insert these into the Node server environment variables (not the React client):
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`

### Step 2 - Create a Free MongoDB Atlas Account


Create a MongoDB cluster and note:
- `MONGO_URI`
- database name (default: `resq`)
- collection name (default: `reports`)

Insert these into `config.py`.

### Step 3 - `config.py` (Flask/CV settings)

Update `config.py` values for:
- `T5_MODEL_NAME` (e.g., `t5-small` or a local checkpoint path)
- `VIDEO_SOURCE` (webcam index like `0`, a device path like `/dev/video0`, or an RTSP/HTTP stream URL)

> Note: `VIDEO_SOURCE` can also be provided via environment variable `VIDEO_SOURCE` (root `config.py` reads it).

---


## Steps to Run The Application

This project runs as a **full end-to-end pipeline** (Flask + Node/Express + React + MongoDB/Mongoose).

---

### Prerequisites
- Python 3.9+
- Node.js 18+ (recommended)
- Flask service on http://127.0.0.1:5000 (CV endpoint)
- Node/Express service on http://localhost:8000 (proxy + SMS + MongoDB logging)
- MongoDB Atlas connection string (set in Node via `MONGO_URI`)
- Twilio credentials (set in Node via `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`)
- A webcam / device path / RTSP (set `VIDEO_SOURCE` in the root `config.py` or as env var)


---

## 1) Clone the Repository to your machine

Run:
```bash
git clone https://github.com/abhisek2004/62Days-CodeSprint-WebDev-Challenge/Project/MERN/Road-Incident-Detection-and-SMS-Alert-System.git
```

---

## 2) Run the Flask detector dashboard

### 2.1 Create & activate a Python virtual environment
```
python3 -m venv env
source env/bin/activate
```

### 2.2 Install Python dependencies
```
pip install -r requirements.txt
```

### 2.3 Configure Flask/CV settings
Update `config.py` (or set `VIDEO_SOURCE`) for your camera/RTSP input.


### 2.4 Run Flask
```
python3 app.py
```

Open:
```
http://127.0.0.1:5000
```

---

## 3) Run the React client

From `client/`:
```
cd client

npm install
npm start
```

---

## 4) Run the Node/Express server

From `server/`:
```
cd server

# install dependencies
npm install
```

Then set environment variables (required by Node):
```
# (in a terminal, before running npm start)
export MONGO_URI="<your-mongodb-atlas-connection-string>"
export TWILIO_ACCOUNT_SID="<your_account_sid>"
export TWILIO_AUTH_TOKEN="<your_auth_token>"
export TWILIO_FROM_NUMBER="<your_twilio_from_number>"

npm start
```

---

## Reinstalling Node Dependencies (Optional Clean Setup)

You can safely delete the `node_modules` folders (they are generated by `npm install`). When you want to run the project again, re-install dependencies from the relevant folders.

### What you can delete
- `/node_modules`
- `/client/node_modules`
- `/server/node_modules`

### What you should not delete
- `package.json` / `package-lock.json` (root)
- `client/package.json` / `client/package-lock.json`
- `server/package.json` / `server/package-lock.json`
- (Unless you intentionally want to rebuild) `client/build/`

### Recreate dependencies
From the project root:

**Root (if you use the root scripts):**
```bash
npm ci
# or: npm install
```

**React client:**
```bash
cd client
npm ci
# or: npm install
```

**Node/Express server:**
```bash
cd server
npm ci
# or: npm install
```

### What you should not reinstall
- `client/build/` (unless you want to rebuild the React app)

---

## Running the Project

### Start the server
```bash
cd server
npm start
```

### Start the React client
```bash
cd ../client
npm start
```

### Open the React client in your browser
Open `http://localhost:3000` in your browser.

---

## Configuring the Project

### Environment Variables

You can set environment variables in `.env` files in the root of the project.

### Config File

You can also set environment variables in the `config.py` file in the root of the project.

### Video Source

You can set the video source in the `config.py` file in the root of the project.

### MongoDB

You can set the MongoDB URI in the `config.py` file in the root of the project.

### Twilio
---

## Final Notes

* Never commit secrets like your MongoDB or Twilio account passwords/phone numbers.
* Use environment variables in production.
* Ensure webcam or RTSP feed is configured.

---

## License

This project is under the MIT license and is free to copy, modify, and distribute with appropriate attribution. Read the license at [LICENSE.md](LICENSE.md).

