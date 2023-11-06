import Button from "@/components/ui/button/Button";
import Collapsible from "@/components/ui/collapsible/Collapsible";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import faqData from "@/constants/sections/faq";
import useResponseHandler from "@/lib/useResponseHandler";
import { useRef } from "react";
import styles from "./HelpContent.module.scss";

const HelpContent: React.FC = () => {
  const pageData = pageDescriptions.help;
  const messageRef = useRef<HTMLDivElement>(null);
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleSeenGuide = async () => {
    await handleAction("/api/user/updateStat", {
      statToUpdate: "hasSeenGuide",
      valueToUpdate: false,
    });
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <div className={styles.guide}>
        {isLoading ? (
          <ResponseHandler
            isLoading={isLoading}
            errorMessage={errorMessage}
            actionMessage={actionMessage}
            messageRef={messageRef}
          />
        ) : (
          <Button onClick={handleSeenGuide} secondary>
            View the guide!
          </Button>
        )}
      </div>
      <div className={styles.faq}>
        {faqData.map((faq, idx) => (
          <Collapsible title={faq.question} key={idx}>
            {faq.answer}
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default HelpContent;
