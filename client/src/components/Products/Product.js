import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

import { Container, Info, Image, Details, PriceBox, Circle, Icon } from "./ProductStyle"

import { useSelector, useDispatch } from 'react-redux'

import { addToCart } from '../../reducers/cart/cartSlice'

const Product = ({ item }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)

    const divStyles = {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: 10,
        margin: '1em',
      };

    const addToCartHandler = (product) => {
        console.log(product)
        dispatch(addToCart(product))
        user ? navigate('/cart') : navigate('/login')
    }

return (
    <div style={divStyles}>
    <Container>
    <Circle />
    <Image src={item.image} />
    <Info>
        <Icon onClick={() => addToCartHandler(item)}>
            <AddShoppingCartIcon />
        </Icon>
    </Info>
    </Container>
    <Details>
        <PriceBox>{item.name}</PriceBox>
        <PriceBox>Rs {item.price} <Rating value={item.rating} text={` | ${item.numReviews}`} /></PriceBox>
    </Details>
    </div>
);
};

export default Product;