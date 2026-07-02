import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Hook to manage viewport size and device presets
export function useViewport() {
  const [preset, setPreset] = useLocalStorage('viewportPreset', 'desktop');
  const [customSize, setCustomSize] = useLocalStorage('customViewport', {
    width: 1440,
    height: 900,
  });

  const setPresetSize = (device) => {
    setPreset(device.id);
    setCustomSize({ width: device.width, height: device.height });
  };

  const updateCustom = (size) => {
    setCustomSize(size);
    setPreset('custom');
  };

  return {
    preset,
    setPreset: setPresetSize,
    customSize,
    setCustomSize: updateCustom,
  };
}
