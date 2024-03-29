import {useState} from "react";
import Header from './components/Layout/Header'
import HeaderWithActionCreator from './components/Layout/HeaderWithActionCreator'
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    }

    const hideCartHandler = () => {
        setCartIsShown(false);
    }

    return (
        <>
            {cartIsShown && <Cart onHideCart={hideCartHandler}/>}

            {/*<Header onShowCart={showCartHandler}/>*/}

            <HeaderWithActionCreator onShowCart={showCartHandler}/>

            <main>
                <Meals/>
            </main>
        </>
    );
}

export default App;
