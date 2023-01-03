import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Link } from 'react-router-dom';
import {Container, Wrapper, Title, Top, TopButton, TopTexts, TopText, Bottom,Info, 
  Product, ProductDetail, Image, Details, ProductName, Quantity, 
  ProductSize, PriceDetail, ProductAmountContainer, ProductQuantity, ProductPrice, Hr, 
  Summary, SummaryTitle, SummaryItem, SummaryItemText, SummaryItemPrice, Button, ClearCartText, Remove } from "./CartStyle"

import { useSelector, useDispatch } from 'react-redux'
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart, } from '../.././reducers/cart/cartSlice'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset } from '../../reducers/user/userSlice'

const Cart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);

  const { user, isError, message } = useSelector(
    (state) => state.user
  )

  const { cartItems, totalQuantity, totalAmount } = cart;

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(reset())

    dispatch(getTotals());
  }, [user, isError, message, navigate, cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to='/'><TopButton>CONTINUE SHOPPING</TopButton></Link>
          <TopTexts>
            <TopText>Total Items = {totalQuantity}</TopText>
            <ClearCartText onClick={() => handleClearCart()}>Clear Cart</ClearCartText>
          </TopTexts>
          <TopButton type="filled"><Link to='/address' className='header-link-desktop'>CHECKOUT NOW</Link></TopButton>
        </Top>
        {cartItems.length === 0 ? (
          <span><Link to='/'>Start Shopping</Link></span>
          ) : (
        <Bottom>
          <Info>
            {cartItems && cartItems.map((item) => (
              <div key={item._id}>
                <Product>
                  <ProductDetail>
                    <Image src={item.image} alt={item.name}/>
                    <Details>
                      <ProductName>
                        <b>{item.name}</b>
                      </ProductName>
                      <ProductSize>
                      <Remove onClick={() => handleRemoveFromCart(item)}>
                        <DeleteForeverIcon/>
                      </Remove>
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Quantity>
                        <RemoveIcon style={{cursor: 'pointer'}} onClick={() => handleDecreaseCart(item)}/>
                        <ProductQuantity>{item.productQuantity}</ProductQuantity>
                        <AddIcon style={{cursor: 'pointer'}} onClick={() => handleAddToCart(item)}/>
                      </Quantity>
                      <ProductPrice>Rs {item.price * item.productQuantity}</ProductPrice>
                    </ProductAmountContainer>
                  </PriceDetail>
                </Product>
              </div>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs {totalAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Charge</SummaryItemText>
              <SummaryItemPrice>Rs 40</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs {totalAmount + 40}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => handleRemoveFromCart()}><Link className='header-link-desktop' to='/address'>CHECKOUT NOW</Link></Button>
          </Summary>
        </Bottom>
        )}
      </Wrapper>
    </Container>
  );
};

export default Cart;