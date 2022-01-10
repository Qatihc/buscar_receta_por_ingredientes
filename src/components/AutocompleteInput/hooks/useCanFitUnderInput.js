import { useState, useLayoutEffect } from "react"
import { throttle } from "../../../utils";

const useCanFitUnderInput = (containerRef, getInputYPosition, suggestions) => {
  const [canFitUnderInput, setCanFitUnderInput] = useState(true);
  const [offset, setOffset] = useState(0);

  const updateContainerTopOffset = throttle(() => {
    if (containerRef.current) {
      const windowHeight = window.innerHeight;
      const { height } = containerRef.current.getBoundingClientRect();
      setOffset(-height)
      const canFitUnderInput = getInputYPosition() + height < windowHeight;

      setCanFitUnderInput(canFitUnderInput);
      console.log(canFitUnderInput)
    }
  }, 10)

  useLayoutEffect(() => {
    updateContainerTopOffset()
    const eventsToListen = ['scroll', 'resize'];
    
    eventsToListen.forEach((eventName) => {
      window.addEventListener(eventName, updateContainerTopOffset);
    })
    
    return () => {
      eventsToListen.forEach((eventName) => {
        window.removeEventListener(eventName, updateContainerTopOffset);
      })
    }
  }, [suggestions.length])

  return [ canFitUnderInput, offset ]
}

export default useCanFitUnderInput;