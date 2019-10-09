import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import ItemTemplate from '../templates/itemTemplate';
import Navbar from './navbar';

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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
}));

function Home(props) {

    const classes = useStyles();

    const [itemCard, setItemCard] = useState(null);

    useEffect(() => {
        if (props.cart) {
            const itemList = props.cart.items.map((item) => {
                return (
                    <ItemTemplate
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.image}
                        id={item.id}
                    />

                )
            });
            setItemCard(itemList);
        }
    }, [props.cart]);

    return (
        <main>
            <Navbar />

            <div className={classes.drawerHeader} />

            <div className={classes.container}>{itemCard}</div>

        </main>
    )
}

Home.defaultProps = {
    cart: null,
}

Home.propTypes = null;

const mapStateToProps = store => ({
    cart: store.cart,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
