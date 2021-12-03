export const shuffleArray = (array: any[]) => {
  return array.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

export const delay = (t: number) => new Promise((r) => setTimeout(r, t));

export const swap = (base: number, target: number, source: number[]) => {
  [source[base], source[target]] = [source[target], source[base]];
};
