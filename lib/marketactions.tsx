export const calculatePercentageChange = (
  currentCost: number,
  baseCost: number
) => {
  const change = currentCost - baseCost;
  return (change / baseCost) * 100;
};
