import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import ReactGA from 'react-ga';

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
        ReactGA.set({page: this.props.history.location.pathname});
        ReactGA.pageview(this.props.history.location.pathname);
        console.log('Pathname : ' + this.props.history.location.pathname);
    }
    render () {
        let orders = <Spinner />
        if (!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id} 
                    ingredients={order.ingredients} 
                    price={order.price} />
            ))
        }
        return (
            <div>
                <h3>Your order history</h3>
                {orders}
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));