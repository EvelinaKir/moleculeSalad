import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCurrentSalad, getMolecules } from "../../app/requests";
import style from "./detail.module.scss";
import error from "../../images/error.svg";
import arrow from "../../images/arrow.svg";
import { AddButton } from "../Sub/AddButton/AddButton";
import { changeDefaultOrder } from "../../app/reducer";
import { fetchImage } from "../../app/requests";

const SaladDetail: FC = ({}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);

  const { currentSalad, molecules, defaultOrder, discounted } = useAppSelector(
    (state) => state.main
  );
  useEffect(() => {
    if (!molecules) {
      dispatch(getMolecules());
    }
    if (!currentSalad && id) {
      dispatch(getCurrentSalad({ id: id }));
    }
  }, []);

  const handleBack = () => {
    navigate("/main");
  };

  if (molecules && currentSalad) {
    const addToCard = () => {
      dispatch(changeDefaultOrder(currentSalad));
    };

    return (
      <div className={style.saladContainer}>
        <div>
          <h1>{currentSalad.title} </h1>
          <h2>
            Price:{" "}
            {discounted ? currentSalad.discount_price : currentSalad.price}$
          </h2>
        </div>
        <div className={style.detailed}>
          <h3>Consist: </h3>
          <div className={style.arrayContainer}>
            {currentSalad.composition.map((elem) => (
              <SmallMolecule
                setIsError={setIsError}
                isError={isError}
                key={elem}
                elem={elem}
              />
            ))}
          </div>
        </div>
        <div className={style.buttons}>
          <img
            className={style.arrow}
            onClick={handleBack}
            src={arrow}
            alt="aroow to go back"
          />
          {!isError && !defaultOrder && <AddButton action={addToCard} />}
          {isError && (
            <h2 className={style.error}>Ops! Not enough molecules!</h2>
          )}
        </div>
      </div>
    );
  } else return null;
};

const SmallMolecule: FC<{
  elem: string;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
}> = ({ elem, isError, setIsError }) => {
  const [img, setImg] = useState<string>("");
  const { molecules, discounted } = useAppSelector((state) => state.main);
  const rightMolecule = molecules?.filter((el) => el._id === elem);

  useEffect(() => {
    if (rightMolecule) {
      fetchImage(rightMolecule[0], setImg);
      if (rightMolecule[0].qty < rightMolecule.length) {
        setIsError(true);
      }
    }
  }, []);

  if (rightMolecule) {
    return (
      <div className={style.moleculeContainer}>
        <img
          className={style.moleculeImage}
          src={img ? img : error}
          alt="image of molecule"
        />
        <div className={style.moleculeInfo}>
          <h2>Title: {rightMolecule[0].title}</h2>
          <h3>
            price:{" "}
            {discounted
              ? rightMolecule[0].discount_price
              : rightMolecule[0].price}
            $
          </h3>
          <h3> Need quantity: {rightMolecule.length}</h3>
        </div>
      </div>
    );
  } else return null;
};

export default SaladDetail;
