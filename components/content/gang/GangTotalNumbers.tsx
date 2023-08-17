import styles from "./GangTotalNumbers.module.scss";

interface IGangTotalNumbers {
  totalMembers: number;
  parameterTotals: Record<string, number | undefined>;
}

const GangTotalNumbers: React.FC<IGangTotalNumbers> = ({
  totalMembers,
  parameterTotals,
}) => {
  return (
    <div className={styles.totalNumbers}>
      <p className="custom-label">Total numbers:</p>
      <p className={styles.statName}>
        members: <span>{totalMembers}</span>
      </p>
      {Object.entries(parameterTotals).map(([parameter, total]) => (
        <p key={parameter} className={styles.statName}>
          {parameter}: {parameter === "money" && <span>$</span>}
          <span>{total?.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export default GangTotalNumbers;
