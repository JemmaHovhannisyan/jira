import { DragEvent, FunctionComponent, useState } from "react";
import s from "./style.module.css";
interface ICart {
  id: number;
  text: string;
  order: number;
}

export const Card: FunctionComponent = () => {
  const [cartList, setCartList] = useState<ICart[]>([
    {
      id: 1,
      text: "first",
      order: 1,
    },
    {
      id: 2,
      text: "second",
      order: 2,
    },
    {
      id: 3,
      text: "third",
      order: 3,
    },
  ]);
  const [currentCart, setCurrentCurt] = useState<ICart>();

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, cart: ICart) => {
    // e.preventDefault();
    console.log("cart", cart);
    setCurrentCurt(cart);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    element.style.background = "aqua";
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    element.style.background = "red";
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, cart: ICart) => {
    e.stopPropagation();
    e.preventDefault();
    const element = e.target as HTMLElement;

    setCartList(
      cartList.map((c) => {
        if (c.id === cart.id && currentCart) {
          return { ...c, order: currentCart.order };
        }
        if (currentCart && c.id === currentCart.id) {
          return { ...c, order: cart.order };
        }
        return c;
      })
    );
    element.style.background = "aqua";
    console.log("cart", cart);
  };

  const sortCarts = (a: ICart, b: ICart) => {
    if (a.order > b.order) return 1;
    else return -1;
  };

  return (
    <div className={s.wrapper}>
      {cartList.sort(sortCarts).map((el) => (
        <div
          key={el.id}
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, el)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, el)}
          className={s.carts}
        >
          {el.text}
        </div>
      ))}
    </div>
  );
};
