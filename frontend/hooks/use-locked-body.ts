import { useState, useLayoutEffect, useEffect } from 'react';

type ReturnType = [boolean, (locked: boolean) => void];

export default function useLockedBody(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked);

  useLayoutEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);

  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
  }, [initialLocked]);

  return [locked, setLocked];
}
