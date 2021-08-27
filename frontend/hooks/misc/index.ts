import { useRef } from 'react';

let uniqueId = 0;
const getUniqueId = () => uniqueId++;

export function useComponentId() {
  const idRef = useRef<number>();
  if (idRef.current === undefined) {
    idRef.current = getUniqueId();
  }
  return idRef.current;
}
