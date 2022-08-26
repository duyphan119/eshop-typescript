import React from "react";

interface Props {
  cx: Function;
  quantity: number;
  onChangeQuantity: Function;
}

const QuantityWrapper: React.FC<Props> = (props: Props) => {
  const { cx, quantity, onChangeQuantity } = props;
  console.log("first");
  return (
    <div className={cx("quantity-wrapper")}>
      <div className={cx("quantity")}>
        <div
          className={cx("quantity-change")}
          onClick={() => onChangeQuantity(quantity - 1)}
        >
          -
        </div>
        <input
          value={quantity}
          onChange={(e) => onChangeQuantity(e.target.value)}
        />
        <div
          className={cx("quantity-change")}
          onClick={() => onChangeQuantity(quantity + 1)}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuantityWrapper);
