import TableThead from "@/components/ui/table/TableThead";
import { GangDetailsResponse } from "@/pages/api/user/gangDetails";
import { IUser } from "@/store/user-context";
import { ObjectId } from "mongodb";
import SabotageAction from "./SabotageAction";
import styles from "./SabotageDetails.module.scss";

interface ISabotageDetails {
  gangDetails: GangDetailsResponse;
  handleSabotageAction: (playerId: string | ObjectId) => void;
}

const SabotageDetails = ({
  gangDetails,
  handleSabotageAction,
}: ISabotageDetails) => {
  const gangMembersTheads = ["Username", "Gang", "Strength", "Sabotage"];

  return (
    <div className={styles.container}>
      <p className="tableHeading">Pick your sabotage victim*:</p>
      <div className={styles.tableWrapper}>
        <table className="table activeTable">
          <TableThead columns={gangMembersTheads} />
          <tbody>
            {gangDetails?.members.map((player: IUser, index: number) => (
              <SabotageAction
                key={index}
                player={player}
                handleSabotageAction={handleSabotageAction}
              />
            ))}
          </tbody>
        </table>
      </div>
      {(!gangDetails || !gangDetails.members.length) && (
        <p className={styles.noResultText}>No players found</p>
      )}
    </div>
  );
};

export default SabotageDetails;
