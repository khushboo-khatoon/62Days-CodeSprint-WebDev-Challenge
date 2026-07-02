import { devices } from '../../constants/devices';
import { useViewport } from '../../hooks/useViewport';
import './DeviceToolbar.css';

export default function DeviceToolbar() {
  const { preset, setPreset } = useViewport();

  return (
    <div className="device-toolbar">
      {devices.map((device) => (
        <button
          key={device.name}
          className={`device-btn ${preset === device.name.toLowerCase() ? 'active' : ''}`}
          onClick={() => setPreset(device)}
          aria-label={`Switch to ${device.name}`}
        >
          {device.icon} {device.name}
        </button>
      ))}
    </div>
  );
}
