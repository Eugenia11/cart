import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { addQuantity, subQuantity, removeItem }  from '../../actions/items';

const useStyles = makeStyles({
    card: {
        maxWidth: 800,
        marginBottom: 20,
        marginLeft: 20,
    },
    media: {
        height: 300,
        width: 200,
        maxWidth: 200,
        minWidth: 200
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    iconButton: {
        marginLeft: 20,
    }
});

function ItemCartTemplate(props) {

    const classes = useStyles();

    const handleClickAdd = () => {
        props.addQuantityData(props.id);
    };

    const handleClickSub = () => {
        props.subQuantityData(props.id);
    };

    const handleClickRemove = () => {
        props.removeItemData(props.id);
    };

    return (
        <div>
            <Card className={classes.card}>

                <Box display="flex" flexDirection="row" justifyContent="flex-end">
                    <IconButton aria-label="remove" onClick={handleClickRemove}>
                        <HighlightOffIcon fontSize="inherit" />
                    </IconButton>
                </Box>

                <Box display="flex" flexDirection="row">
                    <CardMedia
                        className={classes.media}
                        image={props.image ? props.image : ''}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h6">
                            {props.title ? props.title : ''}
                        </Typography>

                        <Box display="flex" flexDirection="row">
                            <Typography gutterBottom variant="h6" component="h6">
                                Количество: {props.quantity ? props.quantity : ''}
                            </Typography>

                            <IconButton aria-label="sub" size="small" className={classes.iconButton} onClick={handleClickSub}>
                                <RemoveIcon fontSize="inherit" />
                            </IconButton>

                            <IconButton aria-label="add" size="small" className={classes.iconButton} onClick={handleClickAdd}>
                                <AddIcon fontSize="inherit" />
                            </IconButton>

                        </Box>


                        <Typography gutterBottom variant="h6" component="h6">
                            Цена: {(props.price && props.quantity) ? props.price * props.quantity : ''} грн
                        </Typography>

                    </CardContent>
                </Box>
            </Card>
        </div>
    );

}

ItemCartTemplate.defaultProps = {
    cart: null,
}

ItemCartTemplate.propTypes = {
    addQuantityData: PropTypes.func.isRequired,
    subQuantityData: PropTypes.func.isRequired,
    removeItemData: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
    cart: store.cart,
});

const mapDispatchToProps = dispatch => ({
    addQuantityData: data => dispatch(addQuantity(data)),
    subQuantityData: data => dispatch(subQuantity(data)),
    removeItemData: data => dispatch(removeItem(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCartTemplate);