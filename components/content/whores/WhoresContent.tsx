import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/pageheader/PageHeader";
import { whoresActions } from "@/constants/actions/whoresactions";
import pageDescriptions from "@/constants/descriptions/pagedescriptions";
import styles from "./WhoresContent.module.scss";

const WhoresContent: React.FC = () => {
  const pageData = pageDescriptions.whores;

  return (
    <div className={styles.container}>
      <PageHeader pageData={pageData} />
      <table className="table">
        <thead>
          <tr>
            <th>
              <p>Name</p>
            </th>
            <th>
              <p>Cost</p>
            </th>
            <th>
              <p>Earnings per day</p>
            </th>
            <th>
              <p>Buy</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {whoresActions.map((whore, index) => (
            <tr key={whore.name}>
              <td>
                <p>{whore.name}</p>
              </td>
              <td>
                <p>${whore.cost.toLocaleString()}</p>
              </td>
              <td>
                <p>${whore.earnings.toLocaleString()}</p>
              </td>
              <td>
                <Button secondary fullSize>
                  Buy
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default WhoresContent;
