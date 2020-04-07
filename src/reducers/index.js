// Reducer Component for Redux:

// start with an empty objecT:
const initialState = {};

// Create preliminary reducer function for changing the state:
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            let qty = 0;
            state[action.item.id] ? qty = (state[action.item.id].quantity + 1) : qty = 1;
            return {
                ...state,
                // the action object has two features (in this case): a type (used above to determine which case to use) and an item,
                // which itself contains some info on the item to buy (in this case a sticker).
                // What we are doing here is adding an attribute to the global state representing this item (named for its id):
                [action.item.id]: {
                    // then we spread the properties of that item,
                    ...action.item,
                    // and add a new property to the copy of our item that now lives 'in state': the initial quantity we wish to purchase:
                    quantity: qty,
                }
            }
        }
        case "REMOVE_ITEM": {
            // We cannot alter the state directly; instead we must always return a new state, based on a copy we make of the original:
            let stateCopy = {...state};
            delete stateCopy[action.item.id];
            // No curly brackets here, else the stateCopy becomes a new property of the original state!!
            return stateCopy;
        }
        case "INCREASE_QUANTITY": {
            return {
                ...state,
                [action.item.id]: {
                    ...action.item,
                    quantity: action.amt,
                }
            }
        }
        case "DECREASE_QUANTITY": {
            return {
                ...state,
                [action.item.id]: {
                    ...action.item,
                    quantity: action.amt,
                }
            }
        }
        case "CLEAR_CART": {
            return {};
        }
        default:
            return state;
    };
};

// Since state is an object, and we ultimately want an array to map through, we'll need to process this info before using it in our cart.
// This function resides with the rest of the reducer functions since it returns a bit of state:
export const getStoreItemArray = state => Object.values(state);