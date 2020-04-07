import React from 'react';
import styled from 'styled-components';
import UnstyledButton from './UnstyledButton';
import Button from './Button';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { getStoreItemArray } from '../reducers';
import { clearCart } from '../actions';

function Cart() {
    // Grab the state from Redux with useSelector hook. In this case we are taking the whole state as denoted by (state => state)...
    // in other situations we would add more complexity to this statement to narrow down what we're taking:
    // "let state be a selection of the state, from which we take the state." ==> "L'etat c'est moi."
    const state = useSelector(state => state);
    // We have a function in the reducers folder for arrayifying the values of the state:
    const storeItems = useSelector(getStoreItemArray);
    // Dispatcher brought in specially for cart clearing function:
    const dispatch = useDispatch();
    // Eventually we will need to show the price for these items:
    let subtotal = 0;
    storeItems.forEach(item => {
        subtotal += (item.price * item.quantity);
    });

    return (
        <CartBox>
            <h1> Let's Go Shopping! </h1>
            <h3>Items</h3>
            {storeItems.map(item => {
                return (
                    <CartItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    />
                );
            })}
            <Bottom>
                <span style={{gridArea: "Price", marginTop: 6}}>Total Price = ${(subtotal/100) || 0}</span>
                <Button style={{gridArea: "Purchase", width: "40%"}} type="submit">Purchase</Button>
            </Bottom>
            <Basement>
            {(storeItems.length > 0) ?
            <UnstyledButton style={{border: "1px solid black", borderRadius: 4, padding: 8, background: "red", marginTop: 64}} onMouseUp={() => {
                dispatch(clearCart())
            }}>Clear Cart</UnstyledButton> : <> </>
            }
            </Basement>
        </CartBox>
    );
};

const CartBox = styled.div`
    position: absolute;
    background: #491057;
    color: whitesmoke;
    width: 25vw;
    height: 100%;
    padding: 24px;
`;

const ItemBox = styled.div`
    border: 1px dashed whitesmoke;
    display: grid;
    grid-template-areas: 'Item Exit'
                         'Quantity Quantity'
                         'Price Purchase';
`;

const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 5vh;
    justify-content: space-evenly;
`;

const Basement = styled.div`
    border-top: 2px solid whitesmoke;
    margin-top: 32px;
`

export default Cart;