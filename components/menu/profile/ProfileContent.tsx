import { ChangeEvent, useState } from "react";

import InputField from "@/components/auth/InputField";
import Avatar from "@/components/user/avatar/Avatar";
import avatars from "@/constants/avatars";
import styles from "./ProfileContent.module.scss";

const BaseTemplate: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("");

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
      <div className={styles.control}>
        <InputField label="Avatar" id="avatar" type="hidden" />
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
