import mealsImage from '../../assets/meals.jpg'
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {uiActions} from "../../store/ui-slice";
import Notification from "../UI/Notification";

let isInitial = true;

const Header = props => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const notificationState = useSelector(state => state.ui.notification)

    useEffect(() => {
        const sendCartData = async () => {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data'
            }))

            const response = await fetch(`${process.env.REACT_APP_FIREBASE_TEST_DB}/cart.json`, {
                method: 'PUT',
                body: JSON.stringify(cartState)
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed.')
            }

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully.'
            }));
        };

        if (isInitial) {
            isInitial = false;
            return;
        }

        sendCartData()
            .catch(error => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed.'
                }));
            });

    }, [cartState])

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

export default Header;