import { ADD_TO_CART, ADD_QUANTITY, SUB_QUANTITY, REMOVE_ITEM, REMOVE_ITEMS } from '../constants/item';

export const addToCart = id => ({
    type: ADD_TO_CART,
    id
});

export const addQuantity = id => ({
    type: ADD_QUANTITY,
    id
});

export const subQuantity = id => ({
    type: SUB_QUANTITY,
    id
});

export const removeItem = id => ({
    type: REMOVE_ITEM,
    id
});

export const removeItems = () => ({
    type: REMOVE_ITEMS,
});