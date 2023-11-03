import Button from "@/components/ui/button/Button";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import useResponseHandler from "@/lib/useResponseHandler";
import { useRef, useState } from "react";
import FirstSlide from "./FirstSlide";
import styles from "./GuideModal.module.scss";
import SecondSlide from "./SecondSlide";

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
      {guideComponent === 1 && <FirstSlide />}
      {guideComponent === 2 && <SecondSlide />}
      {guideComponent === 3 && <p>third guide</p>}
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
        {guideComponent === 3 ? (
          <Button onClick={handleSeenGuide} secondary fullSize>
            Got it, thanks!
          </Button>
        ) : (
          <Button
            onClick={handleNextClick}
            disabled={guideComponent === 3}
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
