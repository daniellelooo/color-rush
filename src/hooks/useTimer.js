import { useState, useEffect, useRef } from 'react';

export function useTimer(duration, onExpire, resetKey = 0, paused = false) {
  const [remaining, setRemaining] = useState(duration);
  const onExpireRef = useRef(onExpire);
  const activeRef = useRef(true);
  const pausedRef = useRef(paused);

  useEffect(() => { onExpireRef.current = onExpire; }, [onExpire]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    setRemaining(duration);
    activeRef.current = true;

    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setRemaining(prev => {
        const next = prev - 50;
        if (next <= 0) {
          clearInterval(interval);
          if (activeRef.current) onExpireRef.current();
          return 0;
        }
        return next;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      activeRef.current = false;
    };
  }, [duration, resetKey]);

  return { progress: remaining / duration };
}
