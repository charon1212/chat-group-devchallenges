export type DateObj = ReturnType<typeof getDateObj>;
export const getDateObj = (m: number) => {
  const d = new Date(m);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
    milliSeconds: d.getMilliseconds(),
  };
};
