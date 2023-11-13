import { useState, useEffect } from 'react';

function useDebounce<T>(callback: (value: T) => void, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>(
    undefined
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedValue !== undefined) callback(debouncedValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [debouncedValue, callback, delay]);

  const updateValue = (value: T) => {
    setDebouncedValue(value);
  };

  return updateValue;
}

export default useDebounce;
