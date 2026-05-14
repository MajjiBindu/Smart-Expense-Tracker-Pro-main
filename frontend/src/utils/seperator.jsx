export const sortCategoryWise = (expdata, categories) => {
  const total = new Map();
  for (const cat of categories) {
    total.set(cat, 0);
  }
  for (const item of expdata) {
    const prev = total.get(item.category) || 0;
    total.set(item.category, prev + item.amount);
  }
  const arr = [];
  for (const [, value] of total) {
    arr.push(value);
  }
  return arr;
};

export const getTotal = (expenseArr) => {
  let total = 0;
  for (const value of expenseArr) {
    total += value;
  }
  return total;
};
