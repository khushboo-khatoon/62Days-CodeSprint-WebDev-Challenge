import { useState, useEffect } from 'react';

/**
 * Generic hook for persisting state to Local Storage.
 * @param {string} key - Storage key.
 * @param {*} initialValue - Initial value when nothing is stored.
 * @returns {[any, function]} - Value and setter.
 */
export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('useLocalStorage: error reading from localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('useLocalStorage: error writing to localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
