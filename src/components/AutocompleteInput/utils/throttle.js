const throttle = (func, interval, ...params) => {
  let canBeCalled = true;
  return () => {
    if (canBeCalled) {
      canBeCalled = false;
      setTimeout(() => canBeCalled = true, interval);
      return func(...params);
    }
  }
}

export default throttle;