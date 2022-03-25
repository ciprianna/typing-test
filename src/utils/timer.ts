const minuteCalculation = (startTime, timerStarted) => {
  if (!timerStarted || startTime === 60) {
    return 1;
  }

  return (60 - startTime) / 60;
}

export { minuteCalculation };
