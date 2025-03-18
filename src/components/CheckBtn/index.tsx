import styles from "./styles.module.css";

type Props = {
  value: string;
  setValue: () => void;
  EhX: boolean;
};

const CheckBtn = ({ value, setValue, EhX }: Props) => {
  return (
    <td>
      <button
        className={`${styles.btn} ${
          value === "" ? (EhX ? styles.hoverX : styles.hoverO) : ""
        } ${value === "X" ? styles.backgroundX : ""}${
          value === "O" ? styles.backgroundO : ""
        }`}
        onClick={() => {
          if (value === "") {
            setValue();
          }
        }}
      ></button>
    </td>
  );
};
export default CheckBtn;
