export const range = (start: number, stop: number, step: number = 1) => {
  const _step = stop > start ? step : -step;
  return Array.from({ length: Math.abs(stop - start) / step + 1 }, (_, i) => start + i * _step);
};
