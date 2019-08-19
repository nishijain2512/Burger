import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => { 
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/order.json?auth='+ token, orderData )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            } )
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/order.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) { //while fetching data from firebase, we dont get data in the form of array.
                    fetchedOrders.push({    //Instead we get data in js object. so we  transform that object in array.
                        ...res.data[key],   //As we want to keep the unique key assigned by firebase to each order,
                        id: key     //we spread each data property using spread operator and add another property id which is unique key.
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail);
            })
    }
}