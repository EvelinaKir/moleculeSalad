import { FC, useEffect } from "react";
import style from "./main.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMolecules, getSalads } from "../../app/requests";
import OneSalad from "../Sub/OneSalad/OneSalad";
import {
  changeOrder,
  cleanOrderAnswer,
} from "../../app/reducer";

const Main: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { salads, loading, molecules } = useAppSelector((state) => state.main);

  useEffect(() => {
    dispatch(changeOrder(null));
    dispatch(cleanOrderAnswer);
    if (!salads) {
      dispatch(getSalads());
    }
    if (!molecules) {
      dispatch(getMolecules());
    }
  }, []);

  return (
    <div className={style.container}>
      <h1>Choose your salad</h1>
      <div className={style.salads}>
        {salads &&
          loading === "succeeded" &&
          salads.map((elem) => <OneSalad key={elem._id} elem={elem} />)}
      </div>
    </div>
  );
};

export default Main;
