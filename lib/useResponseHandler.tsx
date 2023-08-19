import { handleErrorResponse, handlePositiveResponse } from "@/lib/responses";
import UserContext from "@/store/user-context";
import { useContext, useState } from "react";

const useResponseHandler = (messageRef: React.RefObject<HTMLDivElement>) => {
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [positiveTimeoutId, setPositiveTimeoutId] = useState<number | null>(
    null
  );

  const handleAction = async (apiEndpoint: string, requestBody: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (setUser && response.ok) {
        await handlePositiveResponse(
          response,
          setUser,
          setIsLoading,
          setActionMessage,
          positiveTimeoutId,
          setPositiveTimeoutId,
          messageRef
        );

        return response;
      } else {
        await handleErrorResponse(
          response,
          setErrorMessage,
          timeoutId,
          setTimeoutId,
          setIsLoading,
          messageRef
        );
      }
    } catch (error) {
      console.error("Error processing action:", error);
      setIsLoading(false);
    }
  };

  return {
    errorMessage,
    actionMessage,
    isLoading,
    handleAction,
  };
};

export default useResponseHandler;
