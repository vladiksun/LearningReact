import {createSlice} from '@reduxjs/toolkit';


const cartInitialState = {
    items: [],
    totalAmount: 0,
    changed: false
}

const getTotalPrice = (items) => {
    return items.reduce(function (accumulator, item) {
        return accumulator + item.price * item.amount;
    }, 0);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
        },
        addItem(state, action) {
            let newItem = action.payload;

            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push(newItem);
            } else {
                existingItem.amount = existingItem.amount + newItem.amount;
            }

            state.totalAmount = getTotalPrice(state.items);
            state.changed = true;

        },
        removeItem(state, action) {
            let itemId = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);

            if (existingItem.amount === 1) {
                state.items = state.items.filter(item => item.id !== itemId);
            } else {
                existingItem.amount--;
            }

            state.totalAmount = getTotalPrice(state.items);
            state.changed = true;
        },
        clearCart(state) {
            state = cartInitialState;
        }
    }
});


export const cartActions = cartSlice.actions;

export default cartSlice;