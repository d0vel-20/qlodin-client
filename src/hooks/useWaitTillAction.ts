import { useEffect, useState } from "react";

export function useWaitTillAction(waitFor = 30 * 1000) {
  const [allowed, setAllowed] = useState(false);
  const [times, setTimes] = useState(1);
  const [timer, setTimer] = useState(waitFor);

  function disallow() {
    setTimer(waitFor * (times + 1));
    setTimes(times + 1);
    setAllowed(false);
  }

  function allow() {
    setTimer(0);
    setTimes(times - 1);
    setAllowed(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1000);
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      setAllowed(true);
    }

    return () => clearInterval(interval);
  }, [timer]);


  return { allowed, allow, disallow, timer: timer / 1000, formattedTime: formatTimeDuration(timer/1000) };
}

function formatTimeDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}m, ${seconds % 60}s`;
}
