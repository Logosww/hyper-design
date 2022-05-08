// 考虑使用uuid替换此方法
export const generateId = (): number => Math.floor(Math.random() * 1000);

export const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));