import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./NightclubContent.module.scss";

let socket: any;

export interface IMessage {
  author: string;
  message: string;
}

const NightclubContent: React.FC = () => {
  const pageData = pageDescriptions.nightclub;
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const socketInitializer = async () => {
    await fetch("/api/user/nightclub");

    socket = io({
      path: "/api/socket_io",
    });

    socket.on("newIncomingMessage", (msg: IMessage) => {
      setMessages((currentMsg) => {
        const updatedMessages = [
          ...currentMsg,
          { author: msg.author, message: msg.message },
        ];

        const uniqueMessages = updatedMessages.filter(
          (message, index, self) =>
            self.findIndex(
              (m) =>
                m.author === message.author && m.message === message.message
            ) === index
        );

        return uniqueMessages;
      });
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  const sendMessage = async () => {
    if (message.length > 100) {
      setErrorMessage("Message is too long. Maximum length is 100 characters.");
      return;
    }

    socket.emit("createdMessage", { author: user?.username, message });
    setMessage("");
    setErrorMessage("");
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <div className={styles.chatWrapper}>
        <div className={styles.messagesWrapper}>
          {!messages.length && (
            <div className={styles.noMessages}>
              <p className={styles.message}>Start conversation...</p>
            </div>
          )}
          {messages.map((msg, i) => {
            return (
              <p className={styles.message} key={i}>
                <span>{msg.author}</span> : {msg.message}
              </p>
            );
          })}
        </div>
        <div className={styles.inputContainer}>
          <InputField
            id="message"
            type="text"
            name="message"
            placeholder={"New message..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeypress}
          />
          <Button
            onClick={() => {
              sendMessage();
            }}
            secondary
          >
            Send
          </Button>
        </div>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default NightclubContent;
