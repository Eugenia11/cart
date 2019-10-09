import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { addToCart } from '../../actions/items';

const useStyles = makeStyles({
    card: {
        maxWidth: 350,
        marginBottom: 20,
        marginLeft: 20,
    },
    media: {
        height: 500,
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    price: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    }
});

function ItemTemplate(props) {

    const classes = useStyles();

    const handleClick = () => {
        props.addToCartData(props.id);
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.image ? props.image : ''}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                            {props.title ? props.title : ''}
                        </Typography>

                        <Typography gutterBottom variant="h5" component="h1" className={classes.price}>
                            {props.price ? props.price : ''} грн
                        </Typography>

                    </CardContent>
                </CardActionArea>

                <CardActions className={classes.button}>
                    <Button size="medium" color="primary" onClick={handleClick}>
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </div>
    );

}

ItemTemplate.defaultProps = {
    cart: null,
}

ItemTemplate.propTypes = {
    addToCartData: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
    cart: store.cart,
});

const mapDispatchToProps = dispatch => ({
    addToCartData: data => dispatch(addToCart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemTemplate);