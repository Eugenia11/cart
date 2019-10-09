import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import ItemCartTemplate from '../templates/itemCartTemplate'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { removeItems } from '../../actions/items';

import Navbar from './navbar';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "5%",
        marginRight: "5%",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3, 0),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    totalPrice: {
        textAlign: "center"
    },
    button: {
        marginRight: 40
    }
}));

function Cart(props) {

    const classes = useStyles();

    const [itemCard, setItemCard] = useState(null);
    const [cartContent, setCartContent] = useState(null);
    const [lsCart, setLsCart] = useState(null);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            setLsCart(cart);
            const sortCart = cart.itemsInCart.sort((a, b) => {
                let dateA = new Date(a.time);
                let dateB = new Date(b.time);
                return dateB - dateA
            })
            setCartContent(sortCart);
        }

    }, [props.cart])

    useEffect(() => {
        if (cartContent) {
            const itemList = cartContent.map((item) => {
                return (
                    <ItemCartTemplate
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        id={item.id}
                        quantity={item.quantity}
                    />

                )
            });
            setItemCard(itemList);
        }
    }, [cartContent]);

    const handleClick = () => {
        props.removeItemsData();
    };

    return (
        <main>

            <Navbar />

            <div className={classes.drawerHeader} />

            <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Button size="medium" color="primary" onClick={handleClick} className={classes.button}>
                    Clear cart
                </Button>
            </Box>

            <div className={classes.container}>{itemCard}</div>

            <Typography gutterBottom variant="h5" component="h6" className={classes.totalPrice}>
                К оплате: {lsCart ? lsCart.totalPrice : ''} грн
            </Typography>
        </main>
    )
}

Cart.defaultProps = {
    cart: null,
}

Cart.propTypes = {
    removeItemsData: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
    cart: store.cart,
});

const mapDispatchToProps = dispatch => ({
    removeItemsData: data => dispatch(removeItems(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
