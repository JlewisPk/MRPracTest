import { UPDATE_ITEM } from '../actions/home-actions'

export default function userReducers(state=[], {type, payload}) {
    switch (type) {
        case UPDATE_ITEM:
            return payload.cart;
        default:
            return state;
    }
}