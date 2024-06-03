/*  2024-06-03 12:08:01


*/

import { useEffect, useState } from "react";

type UseLocalStorageProps<T> = {
  key: string;
  initialValue: T | (() => T);
};

const useLocalStorage = <T,>({
  key,
  initialValue,
}: UseLocalStorageProps<T>) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else return initialValue;
    } else {
      return JSON.parse(localValue);
    }
  });
  //   console.log("value ", value);

  useEffect(() => {
    if (value === "undefined") localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
