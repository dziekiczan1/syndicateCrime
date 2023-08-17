import InputField from "@/components/auth/InputField";
import TableThead from "@/components/ui/table/TableThead";
import { calculateParameterTotal } from "@/lib/gangdetails";
import { GangDetailsResponse } from "@/pages/api/user/gangDetails";
import { IUser } from "@/store/user-context";
import { useState } from "react";
import styles from "./GangDetails.module.scss";
import GangMembers from "./GangMembers";

interface IGangDetails {
  gangDetails: GangDetailsResponse;
}

const GangDetails = ({ gangDetails }: IGangDetails) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredPlayers = gangDetails?.members.filter((player: IUser) =>
    player.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedPlayers = filteredPlayers?.sort(
    (a: IUser, b: IUser) => b.defaultParams.respect - a.defaultParams.respect
  );

  const parameterTotals = {
    respect: calculateParameterTotal(sortedPlayers, "respect"),
    strength: calculateParameterTotal(sortedPlayers, "strength"),
    intelligence: calculateParameterTotal(sortedPlayers, "intelligence"),
    charisma: calculateParameterTotal(sortedPlayers, "charisma"),
    endurance: calculateParameterTotal(sortedPlayers, "endurance"),
    money: calculateParameterTotal(sortedPlayers, "money"),
  };

  const gangMembersTheads = [
    "Username",
    "Respect",
    "Strength",
    "Intelligence",
    "Charisma",
  ];

  return (
    <div className={styles.container}>
      <p className={styles.tableHeading}>
        {searchQuery ? `Results for: "${searchQuery}"` : "Top 10 Players:"}
      </p>
      <table className={`table ${styles.activeTable}`}>
        <TableThead columns={gangMembersTheads} />
        <tbody>
          {sortedPlayers?.slice(0, 10).map((player: IUser, index: number) => (
            <GangMembers key={index} player={player} />
          ))}
        </tbody>
      </table>
      {sortedPlayers && !sortedPlayers.length && (
        <p className={styles.noResultText}>No players found</p>
      )}
      <div className={styles.searchInput}>
        <InputField
          type="text"
          id="gang-members"
          label="Search by name"
          placeholder="Find gang member"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.totalNumbers}>
        <p className="custom-label">Total numbers:</p>
        <p className={styles.statName}>
          members: <span>{gangDetails?.totalMembers}</span>
        </p>
        {Object.entries(parameterTotals).map(([parameter, total]) => (
          <p key={parameter} className={styles.statName}>
            {parameter}: {parameter === "money" && <span>$</span>}
            <span>{total?.toLocaleString()}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default GangDetails;
