import mealsImage from '../../assets/meals.jpg'
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Notification from "../UI/Notification";
import {sendCardDataThunk, fetchCartData} from '../../store/cart-actions';

let isInitial = true;

const HeaderWithActionCreator = props => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const notificationState = useSelector(state => state.ui.notification)

    useEffect(() => {
        dispatch(fetchCartData());
    }, []);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cartState.changed) {
            dispatch(sendCardDataThunk(cartState));
        }
    }, [cartState]);

    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>

            {notificationState && <Notification
                status = {notificationState.status}
                title = {notificationState.title}
                message = {notificationState.message}/>}

            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!"/>
            </div>
        </>
    );
}

export default HeaderWithActionCreator;