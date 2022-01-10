import { useState, useEffect } from "react";

const useElementHeight = (elementRef) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (elementRef.current) {
      setHeight(height);
    }
  }, [elementRef]);

  return height;
}

export default useElementHeight;