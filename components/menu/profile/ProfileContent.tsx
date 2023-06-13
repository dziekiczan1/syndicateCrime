import { ChangeEvent, useContext, useState } from "react";

import InputField from "@/components/auth/InputField";
import Avatar from "@/components/user/avatar/Avatar";
import StatsNode from "@/components/user/stats/StatsNode";
import avatars from "@/constants/avatars";
import { getUserStatistics } from "@/constants/userstats";
import UserContext from "@/store/user-context";
import styles from "./ProfileContent.module.scss";

const BaseTemplate: React.FC = () => {
  const { user } = useContext(UserContext);
  const [selectedAvatar, setSelectedAvatar] = useState(user!.avatar);
  const userStats = user?.defaultParams;
  const userStatistics = getUserStatistics(userStats);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedAvatar(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          Explore the profile of an accomplished player and dive into their
          gaming journey. Gain insights into their achievements, stats, and
          progress as they conquer challenges and make their mark in the gaming
          world. From epic victories to strategic triumphs, follow their path to
          greatness. Are you ready to delve into the realm of gaming excellence
          and discover what it takes to become a legend?
        </p>
      </div>
      <h2 className={styles.title}>Player Profile: A Journey of Success</h2>
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
              src={selectedAvatar}
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
                onChange={handleAvatarChange}
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
      </div>
    </div>
  );
};

export default BaseTemplate;
