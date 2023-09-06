import useResponseHandler from "@/lib/useResponseHandler";
import { useForm } from "react-hook-form";

const useCasinoActions = (messageRef: React.RefObject<HTMLDivElement>) => {
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validationRules = {
    casinobet: {
      required: "Please enter a correct amount.",
      pattern: {
        value: /^[0-9]*$/,
        message: "Please enter a valid number.",
      },
      min: {
        value: 1,
        message: "Please enter a positive number.",
      },
      max: {
        value: 1000000,
        message: "Maximum bet is: $1.000,000",
      },
    },
  };

  const onSubmit = async (data: number, action: string) => {
    try {
      const requestData = {
        data,
        action: action,
      };

      const response = await handleAction("/api/user/casinoActions", {
        requestData,
      });

      return response;
    } catch (error) {
      console.error("An error occurred while placing the bet:", error);
      throw error;
    } finally {
      reset();
    }
  };

  return {
    errorMessage,
    actionMessage,
    isLoading,
    handleAction: onSubmit,
    register,
    handleSubmit,
    errors,
    validationRules,
  };
};

export default useCasinoActions;
