import { FC } from "react";
import { ToneSalad, writeCurrentSalad } from "../../../app/reducer";
import style from "./oneSalad.module.scss";
import salad from "../../../images/salad.svg";
import file from "../../../images/file.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const OneSalad: FC<{ elem: ToneSalad }> = ({ elem }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const discounted = useAppSelector((state) => state.main.discounted);
  if (elem) {
    const id = elem._id;

    const openInfo = () => {
      dispatch(writeCurrentSalad(elem));
      navigate(`/main/${id}`, { state: { from: location.pathname } });
    };

    return (
      <div className={style.container}>
        <img className={style.saladImage} src={salad} alt="salad" />
        <div className={style.info}>
          <h1>{elem.title}</h1>
          <h2>Price: {discounted ? elem.discount_price : elem.price}$</h2>
        </div>
        <h2>
          <img
            onClick={openInfo}
            className={style.detail}
            src={file}
            alt="file"
          />
        </h2>
      </div>
    );
  } else return null;
};

export default OneSalad;
