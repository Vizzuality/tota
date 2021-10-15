import { useRef, useEffect } from 'react';

let uniqueId = 0;
const getUniqueId = () => uniqueId++;

export function useComponentId() {
  const idRef = useRef<number>();
  if (idRef.current === undefined) {
    idRef.current = getUniqueId();
  }
  return idRef.current;
}

export function useResize(callback: () => any) {
  useEffect(() => {
    window.addEventListener('resize', callback);
    callback();
    return () => window.removeEventListener('resize', callback);
  }, [callback]);
}
