import PageHeader from "@/components/ui/pageheader/PageHeader";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import gangImages from "@/constants/images/gang";
import UserContext from "@/store/user-context";
import Image from "next/image";
import { useContext } from "react";
import styles from "./SabotageContent.module.scss";

const SabotageContent: React.FC = () => {
  const pageData = pageDescriptions.sabotage;
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
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
