export const getRandomDigit = (multiple = 10000) => {
  return +((Math.random() + 1) * multiple).toFixed();
};
