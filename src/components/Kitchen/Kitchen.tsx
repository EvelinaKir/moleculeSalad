import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeDefaultOrder,
  changeOrder,
  cleanOrderAnswer,
  ToneMolecule,
} from "../../app/reducer";
import style from "./kitchen.module.scss";
import { useState } from "react";
import { getMolecules } from "../../app/requests";
import errorImg from "../../images/error.svg";
import { fetchImage } from "../../app/requests";

const Kitchen: FC = ({}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeDefaultOrder(null));
    dispatch(cleanOrderAnswer);
    if (!ingredients) {
      dispatch(getMolecules());
    }
  }, []);

  const ingredients = useAppSelector((state) => state.main.molecules);
  return (
    <div className={style.ingredientsContainer}>
      {ingredients &&
        ingredients.map((el) => <OneIngredient key={el._id} ingredient={el} />)}
    </div>
  );
};

const OneIngredient: FC<{ ingredient: ToneMolecule }> = ({ ingredient }) => {
  const [img, setImg] = useState<string>("");
  const { order, orderAnswer, discounted } = useAppSelector(
    (state) => state.main
  );
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (ingredient) fetchImage(ingredient, setImg);
  }, []);

  const handleUp = () => {
    if (counter < ingredient.qty) {
      if (orderAnswer) {
        dispatch(cleanOrderAnswer());
      }
      setCounter(counter + 1);
    }
  };

  const handleDown = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  useEffect(() => {
    if (orderAnswer) {
      setCounter(0);
    }
  }, [orderAnswer]);

  useEffect(() => {
    if (counter > 0) {
      let newArr: Array<{ molecule: ToneMolecule; qty: number }> = [];
      if (order) {
        const found = order.find(
          (elem) => elem.molecule._id === ingredient._id
        );
        if (found) {
          newArr = order.filter((elem) => elem.molecule._id !== ingredient._id);
        }
        if (!found) {
          newArr = order.concat([]);
        }
      }
      newArr.push({ molecule: ingredient, qty: counter });
      dispatch(changeOrder(newArr));
    }
    if (counter === 0 && order) {
      dispatch(
        changeOrder(order.filter((el) => el.molecule._id !== ingredient._id))
      );
    }
  }, [counter]);

  return (
    <div className={style.oneIngredient}>
      <img
        className={style.image}
        src={img ? img : errorImg}
        alt="image of ingredient"
      />
      <div className={style.info}>
        <h1>{ingredient.title}</h1>
        <h2>
          Price: {discounted ? ingredient.discount_price : ingredient.price}$
        </h2>
        <h3>In stock: {ingredient.qty}</h3>
      </div>
      {ingredient.qty > 0 && (
        <div className={style.counter}>
          <button onClick={handleUp}>+</button>
          <h3>{counter}</h3>
          <button onClick={handleDown}>-</button>
        </div>
      )}
    </div>
  );
};

export default Kitchen;
