import Button from "@/components/ui/button/Button";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import { guideContent } from "@/constants/guide/guide";
import useResponseHandler from "@/lib/useResponseHandler";
import { useRef, useState } from "react";
import styles from "./GuideModal.module.scss";
import GuideSlide from "./GuideSlide";

const GuideModal = () => {
  const [guideComponent, setGuideComponent] = useState(1);
  const messageRef = useRef<HTMLDivElement>(null);
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleNextClick = () => {
    setGuideComponent((prevGuideComponent) => prevGuideComponent + 1);
  };

  const handlePreviousClick = () => {
    setGuideComponent((prevGuideComponent) => prevGuideComponent - 1);
  };

  const handleSeenGuide = async () => {
    await handleAction("/api/user/updateStat", {
      statToUpdate: "hasSeenGuide",
      valueToUpdate: true,
    });
  };

  return (
    <div className={styles.container}>
      {guideComponent <= guideContent.length && (
        <GuideSlide guideChapter={guideContent[guideComponent - 1]} />
      )}
      <ResponseHandler
        isLoading={isLoading}
        errorMessage={errorMessage}
        actionMessage={actionMessage}
        messageRef={messageRef}
      />
      <div className={styles.buttonWrapper}>
        <Button
          onClick={handlePreviousClick}
          disabled={guideComponent === 1}
          fullSize
        >
          Previous
        </Button>
        {guideComponent === guideContent.length ? (
          <Button onClick={handleSeenGuide} secondary fullSize>
            Got it, thanks!
          </Button>
        ) : (
          <Button
            onClick={handleNextClick}
            disabled={guideComponent === guideContent.length}
            fullSize
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default GuideModal;
