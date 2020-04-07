// Here be the Actions Creators: Functions which create an ACTION OBJECT to feed into the dispatcher function,
// not unlike the process through which mission data is passed to the game engine in Block Land!

                            // Newish syntax here: the regular bracket, followed by the curly one, denotes an
                            // IMPLIED RETURN, much like some of the shorter .map, .forEach, or .filter statements we've seen before.
                            // The use of the curly brace simply indicates that what we're returning is an object:
export const addItem = item => ({
    // Type tells the dispatcher what to do:
    type: 'ADD_ITEM',
    // item (in this case - whatever your argument above is goes here) tells the dispatcher what to use when it does its thing:
    item,
});

export const removeItem = item => ({
    type: 'REMOVE_ITEM',
    item,
})

export const increaseQty = (item, amt) => ({
    type: 'INCREASE_QUANTITY',
    item,
    amt,
});

export const decreaseQty = (item, amt) => ({
    type: 'DECREASE_QUANTITY',
    item,
    amt,
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
})