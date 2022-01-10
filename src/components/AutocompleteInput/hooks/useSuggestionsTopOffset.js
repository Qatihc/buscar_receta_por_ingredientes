import { useState, useLayoutEffect } from "react"
import { throttle } from "../../../utils";

const useSuggestionsTopOffset = (suggestionsContainerRef, inputYPosition, suggestions) => {
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const updateContainerTopOffset = throttle(() => {
      if (suggestionsContainerRef.current) {
        const windowHeight = window.innerHeight;
        const { height } = suggestionsContainerRef.current.getBoundingClientRect();
        const canFitUnderInput = inputYPosition + height < windowHeight;
        const topOffset = (canFitUnderInput) ? 'auto' : -height;
        setOffset(topOffset)
      }
    }, 10)
    
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

  return offset
}

export default useSuggestionsTopOffset;