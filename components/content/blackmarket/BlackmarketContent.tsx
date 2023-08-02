import PageHeader from "@/components/ui/pageheader/PageHeader";
import TableThead from "@/components/ui/table/TableThead";
import { blackMarketActions } from "@/constants/actions/blackmarketactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./BlackmarketContent.module.scss";
import WeaponDetails from "./WeaponDetails";

const BlackmarketContent: React.FC = () => {
  const pageData = pageDescriptions.blackmarket;

  const allWhoresTheads = ["Weapon", "Cost", "Respect", "Buy"];

  const handleWeaponAction = async (weapon: any, action: string) => {};

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />

      <p className={styles.tableHeading}>All whores:</p>
      <table className={`table ${styles.activeTable}`}>
        <TableThead columns={allWhoresTheads} />
        <tbody>
          {blackMarketActions.map((weapon, index) => (
            <WeaponDetails
              key={index}
              weapon={weapon}
              handleWeaponAction={handleWeaponAction}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BlackmarketContent;
