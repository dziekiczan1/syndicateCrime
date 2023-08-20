import Loading from "@/components/ui/loading/Loading";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import RequiredText from "@/components/ui/required/RequiredText";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import gangImages from "@/constants/images/gang";
import useGangDetailsFetch from "@/lib/useGangDetailsFetch";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { useContext, useRef } from "react";
import styles from "./SabotageContent.module.scss";
import SabotageDetails from "./SabotageDetails";

const SabotageContent: React.FC = () => {
  const pageData = pageDescriptions.sabotage;
  const { user } = useContext(UserContext);
  const { isLoadingGangDetails, gangDetails } = useGangDetailsFetch(
    user?.defaultParams.gang,
    true,
    user?.defaultParams.respect
  );
  const messageRef = useRef<HTMLDivElement>(null);
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleSabotageAction = async (playerId: string | ObjectId) => {
    await handleAction("/api/user/sabotageActions", { playerId });
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <ResponseHandler
        isLoading={isLoading}
        errorMessage={errorMessage}
        actionMessage={actionMessage}
        messageRef={messageRef}
      />
      {isLoadingGangDetails && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {user?.defaultParams.gang && !isLoadingGangDetails && (
        <>
          <SabotageDetails
            gangDetails={gangDetails}
            handleSabotageAction={handleSabotageAction}
          />
          <RequiredText text="Please note that each sabotage incurs an energy cost of 20%" />
          <RequiredText text="Remember that you can sabotage another user only once per day." />
          <RequiredText text="You can only perform up to 5 sabotages per day." />
        </>
      )}
      {user && !user.defaultParams.gang && (
        <div className={styles.choosegang}>
          <Image
            src={gangImages.choosegang}
            alt="Choose fraction"
            width={680}
            height={360}
            className="sectionImage"
          />
          <p className={styles.choosegangText}>
            Sabotage missions await gang members...
          </p>
        </div>
      )}
    </div>
  );
};

export default SabotageContent;
