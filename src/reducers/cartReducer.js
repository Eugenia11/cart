import { ADD_TO_CART, ADD_QUANTITY, SUB_QUANTITY, REMOVE_ITEM, REMOVE_ITEMS } from '../constants/item';

import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';
import image7 from '../images/image7.jpg';
import image8 from '../images/image8.jpg';
import image9 from '../images/image9.jpg';
import image10 from '../images/image10.jpg';

const initialState = {
    items: [
        { id: 1, title: 'Белое платье-миди с цельнокроеным рукавом', price: 895, image: image1 },
        { id: 2, title: 'Платье-гольф черного цвета с потайной молнией', price: 695, image: image2 },
        { id: 3, title: 'Обтягивающее платье бежевого цвета из стрейч-гипюра', price: 695, image: image3 },
        { id: 4, title: 'Платье в серую клетку из костюмки с рукавами реглан ', price: 695, image: image4 },
        { id: 5, title: 'Платье в тёмно-синюю клетку с расклешенной юбкой ', price: 795, image: image5 },
        { id: 6, title: 'Синее платье с верхом из креп-шифона и принтованной юбкой', price: 695, image: image6 },
        { id: 7, title: 'Серое платье свободного кроя с карманами ', price: 595, image: image7 },
        { id: 8, title: 'Обтягивающее платье-миди пудрового цвета', price: 695, image: image8 },
        { id: 9, title: 'Шифоновое платье с принтом и воротником-аскот зеленое', price: 795, image: image9 },
        { id: 10, title: 'Платье с запахом чёрного цвета из креп-дайвинга', price: 675, image: image10 },
    ],
    addedItems: [],
    total: 0
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            let addedItem = state.items.find(item => item.id === action.id);
            let existedItem = state.addedItems.find(item => action.id === item.id);

            if (existedItem) {
                addedItem.quantity += 1;
                addedItem.time = new Date();
                let newTotal = state.total + addedItem.price;
                let newCart = { itemsInCart: state.addedItems, totalPrice: newTotal };
                localStorage.setItem('cart', JSON.stringify(newCart));
                return { ...state, total: state.total + addedItem.price };
            } else {
                addedItem.quantity = 1;
                addedItem.time = new Date();
                let newTotal = state.total + addedItem.price;
                let newCart = { itemsInCart: [...state.addedItems, addedItem], totalPrice: newTotal };
                localStorage.setItem('cart', JSON.stringify(newCart));
                return { ...state, total: newTotal, addedItems: [...state.addedItems, addedItem] }
            }
        }
        case ADD_QUANTITY: {
            let addedItem = state.items.find(item => item.id === action.id);
            addedItem.quantity += 1;
            let newTotal = state.total + addedItem.price;
            let newCart = { itemsInCart: state.addedItems, totalPrice: newTotal };
            localStorage.setItem('cart', JSON.stringify(newCart));
            return { ...state, total: newTotal }
        }

        case SUB_QUANTITY: {
            let addedItem = state.items.find(item => item.id === action.id);
            if (addedItem.quantity === 1) {
                let newItems = state.addedItems.filter(item => item.id !== action.id);
                let newTotal = state.total - addedItem.price;
                let newCart = { itemsInCart: newItems, totalPrice: newTotal };
                localStorage.setItem('cart', JSON.stringify(newCart));
                return { ...state, addedItems: newItems, total: newTotal }
            }
            else {
                addedItem.quantity -= 1;
                let newTotal = state.total - addedItem.price;
                let newCart = { itemsInCart: state.addedItems, totalPrice: newTotal };
                localStorage.setItem('cart', JSON.stringify(newCart));
                return { ...state, total: newTotal }
            }
        }

        case REMOVE_ITEM: {
            let itemToRemove = state.addedItems.find(item => action.id === item.id);
            let newItems = state.addedItems.filter(item => action.id !== item.id);
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity);
            let newCart = { itemsInCart: newItems, totalPrice: newTotal };
            localStorage.setItem('cart', JSON.stringify(newCart));
            return { ...state, addedItems: newItems, total: newTotal };
        }

        case REMOVE_ITEMS: {
            state.addedItems = [];
            state.total = 0;
            let newCart = { itemsInCart: state.addedItems, totalPrice: state.total };
            localStorage.setItem('cart', JSON.stringify(newCart));
            return { ...state, addedItems: state.addedItems, total: state.total };
        }

        default:
            return state;
    }
}

export default cartReducer;