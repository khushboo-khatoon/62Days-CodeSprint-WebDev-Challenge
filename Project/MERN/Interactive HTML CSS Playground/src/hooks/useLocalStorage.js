// src/hooks/useLocalStorage.js
// Hook to synchronize a state value with localStorage.
import { useState, useEffect } from "react";

/**
 * useLocalStorage
 * @param {string} key - Storage key.
 * @param {any} initialValue - Default value if nothing in storage.
 * @returns {[any, function]} - Current value and setter that also updates storage.
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("useLocalStorage get error", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("useLocalStorage set error", error);
    }
  };

  // Optional: keep in sync if storage changes in another tab.
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
