import { useEffect, useRef } from "react";

/**
 * A hook which accepts function as a callback to execute with chosen delay interval
 *
 * @template F The type of the callback function
 * @param delay The interval delay in milliseconds
 *
 * TypeScript version of the Dan Abramovs JavaScript version
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
const useInterval = <F extends () => unknown>(callback: F, delay: number) => {
  const savedCallback = useRef<F>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay !== null) {
      const cbIntervalId = setInterval(tick, delay);
      return () => {
        clearInterval(cbIntervalId);
      };
    }
  }, [delay]);
};

export default useInterval;
