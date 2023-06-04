export function getFunnyMessage(isSuccess: boolean): string {
  const successMessages = [
    "You hit the jackpot! Time to buy that private island.",
    "You're on a roll! The money keeps flowing.",
    "Congratulations! You're a master thief.",
    "Success! The stars are aligned in your favor.",
    "You've unlocked the secrets of successful robbery!",
  ];

  const failureMessages = [
    "Oops! Better luck next time.",
    "You tripped on your own shoelaces. Not your day.",
    "The universe has a strange sense of humor. Keep trying!",
    "Failure is just a stepping stone to success.",
    "Learn from your mistakes and try again.",
  ];

  const messages = isSuccess ? successMessages : failureMessages;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

export function isRobberySuccessful(successProbability: number): boolean {
  if (successProbability === 100) {
    return true;
  }

  const randomNumber = Math.random() * 100;

  return randomNumber < successProbability;
}

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
