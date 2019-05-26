export const UPDATE_ITEM = 'cart.updateItem';

export function updateItem(newItem) {
    return {
        type: UPDATE_ITEM,
        payload: {
            cart: newItem 
        }
    }
}