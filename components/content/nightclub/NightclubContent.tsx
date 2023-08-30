import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import UserContext from "@/store/user-context";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styles from "./NightclubContent.module.scss";

export interface IMessage {
  author: string;
  message: string;
}

const NightclubContent: React.FC = () => {
  const pageData = pageDescriptions.nightclub;
  const { user } = useContext(UserContext);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {});

    newSocket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleMessageSubmit = () => {
    if (message && socket) {
      socket.emit("message", { author: user?.username, message });
      setMessage("");
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (message) {
        handleMessageSubmit();
      }
    }
  };

  const scrollToLatestMessage = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [messages]);

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <div className={styles.chatWrapper}>
        <div className={styles.messagesWrapper} ref={messagesContainerRef}>
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
          <Button onClick={handleMessageSubmit} secondary>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NightclubContent;
