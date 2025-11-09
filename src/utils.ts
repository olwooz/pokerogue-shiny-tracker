export const debounce = (fn: () => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<typeof fn>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...(args as Parameters<typeof fn>)), delay);
  };
};
