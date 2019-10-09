import React, { useState, useEffect } from 'react';
import history from '../../utils/history';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    title: {
        paddingRight: 10,
    },
    username: {
        color: 'white',
        marginRight: 20,
    },
    growElement: {
        flexGrow: 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    margin: {
        margin: theme.spacing(2),
    },
}));

function Navbar() {

    const classes = useStyles();

    const [quantity, setQuantity] = useState(0);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        let tmpQuantity = 0;
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            cart.itemsInCart.map((item) => {
                return tmpQuantity += item.quantity;
            });
            setQuantity(tmpQuantity);
        }
    });

    const handleOpenCart = () => {
        setHidden(true);
        history.push('/cart');
    };

    const handleOpenHome = () => {
        history.push('/');
    }

    return (
            <AppBar position="fixed" color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}> Shop </Typography>

                    <div className={classes.growElement} />

                    <Tooltip title="Home">
                        <HomeIcon onClick={handleOpenHome} />
                    </Tooltip>

                    <Tooltip title="Cart">
                        <Badge
                            className={classes.margin}
                            badgeContent={hidden ? null : quantity}
                            color="secondary">
                            <ShoppingCartIcon onClick={handleOpenCart} />
                        </Badge>
                    </Tooltip>

                </Toolbar>
            </AppBar>

    )

}

export default Navbar;