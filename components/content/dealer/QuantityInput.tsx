import styles from "./QuantityInput.module.scss";

import { ArrowDownIcon, ArrowUpIcon } from "@/components/ui/icons";
import Icon from "@/components/ui/icons/Icon";
import { drugDetails } from "@/constants/sections/dealerdrugs";

export interface IQuantityInput {
  drug: keyof typeof drugDetails;
  quantity: number;
  handleQuantityChange: (drug: any, action: "increase" | "decrease") => void;
}

const QuantityInput: React.FC<IQuantityInput> = ({
  drug,
  quantity,
  handleQuantityChange,
}) => {
  return (
    <div className={styles.inputContainer}>
      <button
        onClick={() => handleQuantityChange(drug, "decrease")}
        className={styles.minusBtn}
      >
        <Icon
          component={ArrowDownIcon}
          width={20}
          height={20}
          viewBox="24 24"
        />
      </button>
      <input type="text" value={quantity} readOnly className={styles.input} />
      <button
        onClick={() => handleQuantityChange(drug, "increase")}
        className={styles.plusBtn}
      >
        <Icon component={ArrowUpIcon} width={20} height={20} viewBox="24 24" />
      </button>
    </div>
  );
};

export default QuantityInput;
