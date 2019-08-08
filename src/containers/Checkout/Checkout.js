import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
//import axios from 'axios';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render (){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.url + '/contact-data'} 
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);