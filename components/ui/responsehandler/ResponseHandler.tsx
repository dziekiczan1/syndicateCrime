import ErrorMessage from "@/components/ui/error/ErrorMessage";
import Loading from "@/components/ui/loading/Loading";
import Message from "@/components/ui/message/Message";
import React from "react";
import styles from "./ResponseHandler.module.scss";

interface ResponseHandlerProps {
  errorMessage: string | null;
  actionMessage: string | null;
  isLoading: boolean;
  messageRef: React.RefObject<HTMLDivElement>;
}

const ResponseHandler: React.FC<ResponseHandlerProps> = ({
  errorMessage,
  actionMessage,
  isLoading,
  messageRef,
}) => {
  return (
    <div ref={messageRef}>
      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {errorMessage ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        actionMessage && <Message message={actionMessage} />
      )}
    </div>
  );
};

export default ResponseHandler;
