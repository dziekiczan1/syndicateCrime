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
}

const NavItem: React.FC<INavItem> = ({
  width,
  height,
  fill,
  viewBox,
  component,
  actionName,
  href,
}) => {
  return (
    <Link href={href} className={styles.container}>
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
    </Link>
  );
};

export default NavItem;
