import Link from "next/link";

import Icon from "@/components/ui/icons/Icon";
import styles from "./NavItem.module.scss";

export interface INavItem {
  component: React.FC<{ fill?: string }>;
  fill?: string;
  width: number;
  height: number;
  viewBox: string;
  actionName: string;
  href: string;
  onClick?: () => void;
}

const NavItem: React.FC<INavItem> = ({
  width,
  height,
  fill,
  viewBox,
  component,
  actionName,
  href,
  onClick,
}) => {
  return (
    <li>
      <Link href={href} className={styles.container} onClick={onClick}>
        <div className={styles.items}>
          <div className={styles.icon}>
            <Icon
              component={component}
              width={width}
              height={height}
              fill={fill}
              viewBox={viewBox}
            />
          </div>
          <div className={styles.name}>
            <p className="custom-label">{actionName}</p>
          </div>
        </div>
        <div className={styles.underline}></div>
      </Link>
    </li>
  );
};

export default NavItem;
