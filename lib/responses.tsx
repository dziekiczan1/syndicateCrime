import { Dispatch, SetStateAction } from "react";

export const handlePositiveResponse = async (
  response: Response,
  setUser: Dispatch<SetStateAction<any>>,
  setIsLoadingAction: Dispatch<SetStateAction<boolean>>,
  setActionMessage?: Dispatch<SetStateAction<any>>,
  positiveTimeoutId?: number | null,
  setPositiveTimeoutId?: Dispatch<SetStateAction<number | null>>
) => {
  const updatedUser = await response.json();

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (setActionMessage) {
    setActionMessage(updatedUser.message);

    if (positiveTimeoutId) {
      clearTimeout(positiveTimeoutId);
    }

    const newTimeoutId = window.setTimeout(() => {
      setActionMessage(null);
    }, 5000);

    if (setPositiveTimeoutId) {
      setPositiveTimeoutId(newTimeoutId);
    }
  }

  setUser(updatedUser);
  setIsLoadingAction(false);
};

export const handleErrorResponse = async (
  response: Response,
  setErrorMessage: Dispatch<SetStateAction<any>>,
  timeoutId: number | null,
  setTimeoutId: Dispatch<SetStateAction<number | null>>,
  setIsLoadingAction: Dispatch<SetStateAction<boolean>>
) => {
  const errorData = await response.json();

  window.scrollTo({ top: 0, behavior: "smooth" });

  setErrorMessage(errorData.error);

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  const newTimeoutId = window.setTimeout(() => {
    setErrorMessage(null);
  }, 5000);

  setTimeoutId(newTimeoutId);
  setIsLoadingAction(false);
};
