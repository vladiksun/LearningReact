import { useContext } from "react";
import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from "../../store/cart-context";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const addToCartHandler = item => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    };

    const orderHandler = () => {
        setIsCheckout(true)
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        const response = await fetch('https://my-react-project-37b53-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems =
        <ul className={classes['cart-items']}> {
            cartCtx.items.map(item => <CartItem
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
                <span>{totalAmount}</span>
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