import { GangDetailsResponse } from "@/pages/api/user/gangDetails";
import UserContext from "@/store/user-context";
import { useContext } from "react";
import styles from "./GangDetails.module.scss";

interface IGangDetails {
  gangDetails: GangDetailsResponse;
}

const GangDetails = ({ gangDetails }: IGangDetails) => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.gangDetailsContainer}>
      <h2></h2>
      <p>Total Members: {gangDetails?.totalMembers}</p>
      <p>Top 5 Players:</p>
      <ul>
        {/* {gangDetails.members.map((player: any, index: number) => (
          <li key={index}>{player.name}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default GangDetails;
