import { FC, useEffect, useState } from "react";
import style from "./plate.module.scss";
import plate from "../../images/plate.svg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeDefaultOrder,
  cleanOrderAnswer,
  changeOrder,
  ToneMolecule,
} from "../../app/reducer";
import trash from "../../images/trash.svg";
import { createOrder } from "../../app/requests";

const Plate: FC<{}> = () => {
  const { order, defaultOrder, orderAnswer } = useAppSelector(
    (state) => state.main
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (orderAnswer && orderAnswer === "Salad was completed") {
      dispatch(changeDefaultOrder(null));
      dispatch(changeOrder(null));
    }
  }, [orderAnswer]);

  return (
    <div className={style.container}>
      <img className={style.plate} src={plate} alt="plate image" />
      {(order || defaultOrder) && <OrderReady />}
      {orderAnswer && !order && !defaultOrder && (
        <h1 className={style.infoAboutOrder}>{orderAnswer}</h1>
      )}
      <div className={style.orderInfo}>
        {defaultOrder && <OnePiece />}
        {order &&
          order.map((el) => (
            <CustomPiece ingredient={el} key={el.molecule._id} />
          ))}
      </div>
      <div></div>
    </div>
  );
};

const OnePiece: FC<{}> = () => {
  const { defaultOrder, orderAnswer } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(changeDefaultOrder(null));
    if (orderAnswer) {
      dispatch(cleanOrderAnswer());
    }
  };

  return (
    <div className={style.saladContainer}>
      <h3>{defaultOrder?.title}</h3>
      <img
        className={style.trash}
        onClick={handleDelete}
        src={trash}
        alt="trash image"
      />
    </div>
  );
};

const CustomPiece: FC<{
  ingredient: { molecule: ToneMolecule; qty: number };
}> = ({ ingredient }) => {
  const discounted = useAppSelector((state) => state.main.discounted);
  return (
    <div className={style.CustomContainer}>
      <h1>{ingredient.molecule.title}</h1>
      <h1>
        {discounted
          ? ingredient.molecule.discount_price
          : ingredient.molecule.price}
        $ x {ingredient.qty}
      </h1>
    </div>
  );
};

const OrderReady: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { order, defaultOrder } = useAppSelector((state) => state.main);
  const [listofIds, setListofIds] = useState<
    Array<{ id: string; qty: number }>
  >([]);
  const handleDefOrder = () => {
    if (defaultOrder) {
      const orderList = defaultOrder.composition;
      const newList: Array<{ id: string; qty: number }> = [];
      for (let i = 0; i < orderList.length; i++) {
        const found = newList.find((el) => el.id == orderList[i]);
        if (found) {
          const foundCopy = Object.assign(found);
          const result = newList.map((e) => {
            if (e.id === foundCopy.id) {
              foundCopy.qty += 1;
            }
            return foundCopy;
          });
          setListofIds(result);
        } else {
          newList.push({ id: orderList[i], qty: 1 });
          setListofIds(newList);
        }
      }
      dispatch(cleanOrderAnswer());
      dispatch(createOrder({ order: listofIds }));
    }
  };

  const handleOrder = () => {
    if (order) {
      const dataTosend = order.map((el) => {
        return { id: el.molecule._id, qty: el.qty };
      });
      dispatch(cleanOrderAnswer);
      dispatch(createOrder({ order: dataTosend }));
    }
  };

  return (
    <button
      onClick={defaultOrder ? handleDefOrder : handleOrder}
      className={style.makeAnOrder}
    >
      {"Order it now!"}
    </button>
  );
};

export default Plate;
