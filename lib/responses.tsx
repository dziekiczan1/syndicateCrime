import { Dispatch, SetStateAction } from "react";

export const handleErrorResponse = async (
  response: Response,
  setErrorMessage: any,
  timeoutId: number | null,
  setTimeoutId: Dispatch<SetStateAction<number | null>>,
  setIsLoadingRobbery: Dispatch<SetStateAction<boolean>>
) => {
  const errorData = await response.json();
  setErrorMessage(errorData.error);

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  const newTimeoutId = window.setTimeout(() => {
    setErrorMessage(null);
  }, 5000);

  setTimeoutId(newTimeoutId);
  setIsLoadingRobbery(false);
};
