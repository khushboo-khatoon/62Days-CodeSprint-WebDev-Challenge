import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const PYTHON_VIDEO_URL = process.env.REACT_APP_PYTHON_SERVICE_URL || 'http://localhost:5000/api/video_feed';

function Dashboard() {
    const [incidentData, setIncidentData] = useState(null);
    const [error, setError] = useState('');
    const [isDispatching, setIsDispatching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // The 'proxy' in package.json forwards this to http://localhost:8000/api/incident_data
                const response = await axios.get('/api/incident_data');
                setIncidentData(response.data);
                setError('');
            } catch (err) {
                console.error("Error fetching incident data:", err);
                setError('Failed to connect to the server. Is the backend running?');
            }
        };

        const intervalId = setInterval(fetchData, 2000); // Poll every 2 seconds
        fetchData(); // Initial fetch

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const handleDispatch = async () => {
        if (!incidentData || !incidentData.resources_needed || incidentData.resources_needed.length === 0) {
            alert('No resources needed for dispatch.');
            return;
        }
        setIsDispatching(true);

        try {
            const response = await axios.post('/api/dispatch', {
                incidentData, // The backend will now handle receiver lookups
            });
            alert('Dispatch initiated successfully!');
            console.log(response.data);
        } catch (err) {
            console.error('Dispatch error:', err);
            alert('Failed to initiate dispatch.');
        } finally {
            setIsDispatching(false);
        }
    };

    const isIncidentActive = incidentData?.incident_type !== 'Normal Flow' && incidentData?.incident_type !== 'Initializing...';

    return (
        <div className="dashboard-container">
            <div className="video-panel">
                <h2>Live Feed</h2>
                <img 
                    src={PYTHON_VIDEO_URL} 
                    alt="Live video feed from CV service" 
                    className="video-feed"
                />
            </div>
            <div className="data-panel">
                <h2>Live Status</h2>
                {error && <p className="error-message">{error}</p>}
                {!incidentData && !error && <p>Loading live data...</p>}
                {incidentData && (
                    <div className="incident-details">
                        <p><strong>Status:</strong> <span className={isIncidentActive ? 'status-incident' : 'status-normal'}>{incidentData.incident_type}</span></p>
                        <p><strong>Location:</strong> {incidentData.location_gps}</p>
                        <p><strong>Timestamp:</strong> {incidentData.timestamp}</p>
                        <p><strong>Events:</strong> {incidentData.events || 'None'}</p>
                        <hr />
                        <h4>Incident Report</h4>
                        <p className="report-text"><em>{incidentData.final_report}</em></p>
                        <hr />
                        <h4>Required Resources: {incidentData.resources_needed?.join(', ') || 'None'}</h4>
                        <button onClick={handleDispatch} disabled={isDispatching || !isIncidentActive} className="dispatch-button">{isDispatching ? 'Dispatching...' : 'Dispatch Emergency Services'}</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;