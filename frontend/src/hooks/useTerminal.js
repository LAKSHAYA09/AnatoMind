import { useState, useEffect } from 'react';

/**
 * Hook to simulate a real-time rolling terminal boot sequence
 * @param {string[]} logs Array of log messages to write out
 * @param {number} baseDelay Base delay between lines in milliseconds
 */
export function useTerminal(logs, baseDelay = 150) {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (logs.length === 0) {
      setIsComplete(true);
      return;
    }

    if (currentIndex >= logs.length) {
      // Add a slight pause after the last log line before triggering completion
      const completionTimer = setTimeout(() => {
        setIsComplete(true);
      }, 800);
      return () => clearTimeout(completionTimer);
    }

    // Variable delay to simulate actual file operations / diagnostic processing checks
    const randomFuzz = Math.random() * 80;
    const currentDelay = baseDelay + (currentIndex % 3 === 0 ? randomFuzz * 3 : randomFuzz);

    const timer = setTimeout(() => {
      setDisplayedLogs((prev) => [...prev, logs[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, currentDelay);

    return () => clearTimeout(timer);
  }, [currentIndex, logs, baseDelay]);

  return { displayedLogs, isComplete };
}
