import { createStore, combineReducers, } from 'redux';
import homeReducers from './reducers/home-reducers';

const allReducers = combineReducers({
    cart: homeReducers
})
const store = createStore(allReducers);

export default store;