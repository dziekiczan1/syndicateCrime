import PageHeader from "@/components/ui/pageheader/PageHeader";
import {
  IDistrictActions,
  districtActions,
} from "@/constants/actions/districtactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import { useContext, useRef } from "react";
import DistrictAction from "./DistrictAction";
import styles from "./DistrictContent.module.scss";

const DistrictContent = () => {
  const pageData = pageDescriptions.districts;
  const { user } = useContext(UserContext);
  const messageRef = useRef<HTMLDivElement>(null);
  const { errorMessage, actionMessage, isLoading, handleAction } =
    useResponseHandler(messageRef);

  const handleDistrictAction = async (
    mission: IDistrictActions,
    action?: string
  ) => {
    await handleAction("/api/user/districtActions", { mission, action });
  };

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <div className={styles.actionsContainer}>
        {user &&
          districtActions.map((mission, key) => (
            <DistrictAction
              key={key}
              mission={mission}
              handleDistrictAction={handleDistrictAction}
            />
          ))}
      </div>
    </div>
  );
};

export default DistrictContent;
