export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formattedHours = hours > 0 ? hours.toString() : "";
  const formattedMinutes = minutes.toString().padStart(2, "0");

  if (formattedHours) {
    return `${formattedHours}:${formattedMinutes}`;
  } else {
    return `${formattedMinutes}`;
  }
}

export function calculatePercentage(number1: number, number2: number) {
  if (number1 === 0) {
    return 0;
  }

  const timePercentage = Math.round((number2 / number1) * 100);
  const maxPercentage = 100;

  const percentage = maxPercentage - timePercentage;

  return percentage;
}
