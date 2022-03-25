const wpm = (typed: number, minutes: number) => {
  const wordEstimate = typed / 5;
  return Math.round(wordEstimate / minutes);
};

export { wpm };
