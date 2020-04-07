import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import UnstyledButton from './UnstyledButton';
import { useDispatch } from 'react-redux';
import { removeItem, increaseQty, decreaseQty } from '../actions';

function CartItem({id, title, price, quantity}) {
    // Make changes to quantities on change:
    const dispatch = useDispatch();

    // this doesn't work:
    function handleQtyChange(ev) {
        ev.target.value > quantity ? dispatch(increaseQty({id, title, price}, ev.target.value)) : dispatch(decreaseQty({id, title, price}, ev.target.value));
    }

    // Getting rid of the item when its X is clicked:
    function handleRemoval() {
        dispatch(removeItem({id}));
    }
    
    // Little price format adjustment here:
    const stringyPrice = (price/100).toString();

    return (
        <ItemBox>
            <h2 style={{gridArea: "Item", padding: 12}}>{title}</h2>
            <UnstyledButton
                style={{gridArea: "Exit", position: "relative", bottom: "30%", left: "70%"}}
                onMouseUp={() => handleRemoval({id})}
                >
                X</UnstyledButton>
            <form style={{gridArea: "Quantity", padding: 12, background: "#430a52"}}>
                <label style={{paddingRight: 4}}>Quantity:</label>
                <input value={quantity} onChange={handleQtyChange} type="number" placeholder="qty" style={{maxWidth: 48, textIndent: 4}}></input>
                <span style={{marginLeft: 32}}>${stringyPrice} per unit</span>
            </form>
        </ItemBox>
    );
};

const ItemBox = styled.div`
    border: 1px dashed whitesmoke;
    display: grid;
    grid-template-areas: 'Item Exit'
                         'Quantity Quantity'
                         'Price Purchase';
`;

export default CartItem;