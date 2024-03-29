import footerImages from "@/constants/images/footer";
import menuItems from "@/constants/sections/menu";
import Image from "next/image";
import Link from "next/link";
import Copyrights from "../copyrights/Copyrights";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionsWrapper}>
        <div className={styles.menuSections}>
          <ul className={styles.section}>
            <h3 className={styles.sectionTitle}>Menu</h3>
            {menuItems.map((item) => (
              <li key={item.actionName}>
                <Link href={item.href}>
                  <p className={styles.sectionItem}>{item.actionName}</p>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.section}>
            <h3 className={styles.sectionTitle}>Contact us!</h3>
            <li>
              <p>Some Link</p>
            </li>
          </ul>
          <ul className={styles.section}>
            <h3 className={styles.sectionTitle}>Social Media</h3>
            <li>
              <p>Some Link</p>
            </li>
          </ul>
          <div className={styles.copyrightsSection}>
            <div className={styles.seperateLine}></div>
            <Copyrights />
          </div>
        </div>
        <div className={styles.imageSection}>
          <Image
            src={footerImages.grave}
            width={300}
            height={300}
            alt="Syndicate Crime"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
