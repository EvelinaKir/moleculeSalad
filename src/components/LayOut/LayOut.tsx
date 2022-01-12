import style from "./layOut.module.scss";
import { FC } from "react";
import Plate from "../Plate/Plate";
import Header from "../Header/Header";
import { RouteProps } from "react-router-dom";

import { Outlet } from "react-router-dom";

const LayOut: FC<RouteProps> = () => {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.mainContent}>
        <Plate />
        <div className={style.choose}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayOut;
