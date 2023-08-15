import { useContext, useRef, useState } from "react";

import InputField from "@/components/auth/InputField";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import ResponseHandler from "@/components/ui/responsehandler/ResponseHandler";
import Avatar from "@/components/user/avatar/Avatar";
import StatsNode from "@/components/user/stats/StatsNode";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import avatars from "@/constants/sections/avatars";
import { getUserStatistics } from "@/constants/sections/userstats";
import useResponseHandler from "@/lib/useResponseHandler";
import UserContext from "@/store/user-context";
import styles from "./ProfileContent.module.scss";

const ProfileContent: React.FC = () => {
  const pageData = pageDescriptions.profile;
  const { user, setUser } = useContext(UserContext);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar);
  const userStats = user?.defaultParams;
  const userStatistics = getUserStatistics(userStats);
  const messageRef = useRef<HTMLDivElement>(null);

  const {
    errorMessage,
    actionMessage,
    isLoading,
    handleAction: handleAvatarSubmit,
  } = useResponseHandler(messageRef);

  const handleAvatarChange = (selectedAvatar: string) => {
    setSelectedAvatar(selectedAvatar);
  };

  const updateAvatar = async () => {
    try {
      const response = await handleAvatarSubmit("/api/user/updateStat", {
        statToUpdate: "avatar",
        valueToUpdate: selectedAvatar,
      });

      const data = await response?.json();

      const updatedUser = { ...data, avatar: data.avatar as string };
      if (setUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
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
      {user && (
        <div className={styles.stats}>
          <div className={styles.params}>
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <p>Class: {user.defaultParams.class}</p>
            <p>Morale: {user.defaultParams.morale}</p>
            <p>Energy: {user.defaultParams.energy}%</p>
            <p>Life: {user.defaultParams.life}%</p>
            <p>Addiction: {user.defaultParams.addiction}%</p>
          </div>
          <div className={styles.photo}>
            <Avatar
              width={200}
              height={200}
              src={selectedAvatar ? selectedAvatar : user.avatar}
              alt={user.username}
            />
          </div>
          <div className={styles.userStats}>
            {userStatistics.map((stat) => (
              <StatsNode
                key={stat.statsName}
                component={stat.component}
                fill={stat.fill}
                width={stat.width}
                height={stat.height}
                viewBox={stat.viewBox}
                statsValue={stat.statsValue}
                statsName={stat.statsName}
              />
            ))}
          </div>
        </div>
      )}
      <div className={styles.control}>
        <InputField label="Change Your Avatar" id="avatar" type="hidden" />
        <div className={styles.avatars}>
          {avatars.map((avatar) => (
            <div key={avatar.src} className={styles.avatar}>
              <InputField
                id={avatar.src}
                type="radio"
                name="avatar"
                value={avatar.src}
                onChange={() => handleAvatarChange(avatar.src)}
                checked={selectedAvatar === avatar.src}
              >
                <Avatar
                  src={avatar.src}
                  width={150}
                  height={150}
                  alt={avatar.src}
                />
              </InputField>
            </div>
          ))}
        </div>
        <Button onClick={updateAvatar} fullSize secondary>
          Change Your Avatar
        </Button>
      </div>
    </div>
  );
};

export default ProfileContent;
