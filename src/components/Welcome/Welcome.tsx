import { FC } from "react";
import style from "./welcome.module.scss";
import discount from "../../images/discount.svg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { makeDiscount } from "../../app/reducer";

const Welcome: FC = ({}) => {
  const dispatch = useAppDispatch();
  const discounted = useAppSelector((state) => state.main.discounted);
  return (
    <div className={style.container}>
      <h1>Welcome!</h1>
      <div className={style.discount}>
        {!discounted && <h2>Please, take this coupon</h2>}
        {!discounted && (
          <img
            src={discount}
            className={`${style.discount}${
              discounted ? style.discounted : style.makeDiscount
            }`}
            onClick={() => dispatch(makeDiscount())}
            alt="discount"
          />
        )}
        {discounted && <h1 className={style.infoDiscount}>Discounted!</h1>}
        {!discounted && <h3>if you fant a discount</h3>}
      </div>
    </div>
  );
};

export default Welcome;
