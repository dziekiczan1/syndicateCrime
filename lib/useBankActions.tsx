import useResponseHandler from "@/lib/useResponseHandler";
import { useForm } from "react-hook-form";

const useBankActions = (messageRef: React.RefObject<HTMLDivElement>) => {
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const validationRules = {
    bankmoney: {
      required: "Please enter correct amount.",
      pattern: {
        value: /^[0-9]*$/,
        message: "Please enter a valid number.",
      },
      min: {
        value: 1,
        message: "Please enter a positive number.",
      },
    },
  };

  const onSubmit = async (data: any, isStash: boolean) => {
    const action = isStash ? "stash" : "withdraw";
    const requestData = {
      ...data,
      action: action,
    };

    await handleAction("/api/user/bankActions", { requestData });
    reset();
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

export default useBankActions;
