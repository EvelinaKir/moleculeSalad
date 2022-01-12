import { FC } from "react";
import style from "./header.module.scss";
import icon from "../../images/icon.svg";
import { Link, useNavigate } from "react-router-dom";

const Header: FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <ul className={style.menu}>
        <li className={style.logo}>
          <img src={icon} alt="logo" onClick={() => navigate("/")} />
        </li>
        <li className={style.buttons}>
          {" "}
          <Link to="/main" className={style.button}>
            Choose
          </Link>{" "}
          <Link to="/kitchen" className={style.button}>
            Make
          </Link>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Header;
