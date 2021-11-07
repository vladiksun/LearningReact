import { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import {useSelector} from "react-redux";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartItemsState = useSelector((state) => state.cart.items);

    const numberOfCartItems = cartItemsState.reduce((currentNumber, cartItem) => {
        return currentNumber + cartItem.amount;
    }, 0);

    const buttonClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (cartItemsState.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [cartItemsState])

  return (
      <button className={buttonClasses} onClick={props.onClick}>
          <span className={classes.icon}>
            <CartIcon/>
          </span>
          <span>Your Cart</span>
          <span className={classes.badge}>
              {numberOfCartItems}
          </span>
      </button>
  );
}

export default HeaderCartButton;