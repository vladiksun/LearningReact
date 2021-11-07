import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import {useSelector, useDispatch} from 'react-redux';
import {cartActions} from '../../store/cart-slice'
import {useEffect, useState} from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const dispatch = useDispatch();

    const cartState = useSelector((state) => state.cart);

    // const cartItemsState = useSelector((state) => state.cart.items);
    // const totalAmountState = useSelector((state) => state.cart.totalAmount);

    const totalAmountFixed = `$${cartState.totalAmount.toFixed(2)}`;
    const hasItems = cartState.items.length > 0;

    const cartItemRemoveHandler = id => {
        dispatch(cartActions.removeItem(id));
    }

    const addToCartHandler = item => {
        dispatch(cartActions.addItem({
            ...item,
            amount: 1
        }));
    };

    const orderHandler = () => {
        setIsCheckout(true)
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        const response = await fetch(`${process.env.REACT_APP_FIREBASE_TEST_DB}/orders.json`, {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartState.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        dispatch(cartActions.clearCart());
    };

    const cartItems =
        <ul className={classes['cart-items']}> {
            cartState.items.map(item => <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={addToCartHandler.bind(null, item)}/>)
        }
        </ul>;

    const modalActions =
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems
            && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>

    const cartModalContent =
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmountFixed}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler}/>}
            {!isCheckout && modalActions}
        </>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent =
        <>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onHideCart}>Close</button>
            </div>
        </>

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;