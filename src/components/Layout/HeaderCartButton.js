import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/cart-context";

const HeaderCartButton = (props) => {

    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  //HeaderCartButton component re-evaluted when context changed.
  const cartCtx = useContext(CartContext);
  //first argument is function, second argument is started value
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const {items} = cartCtx;
  const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`;

  useEffect(() => {
      if(items.length === 0)
      {
          return;
      }
      setBtnIsHighLighted(true);

     const timer =  setTimeout(() => {
        setBtnIsHighLighted(false);
      }, 300);

      return () => {
          clearTimeout(timer);
      };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
