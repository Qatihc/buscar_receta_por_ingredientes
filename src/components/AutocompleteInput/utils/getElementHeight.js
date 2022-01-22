const getElementHeight = (ref) => {
  if (ref.current) {
    return ref.current.getBoundingClientRect();
  }
  return 0;
}

export default getElementHeight;