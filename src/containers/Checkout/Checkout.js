import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
//import axios from 'axios';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import ReactGA from 'react-ga';

class Checkout extends Component {
    componentDidMount() {
        ReactGA.set({page: this.props.history.location.pathname});
        ReactGA.pageview(this.props.history.location.pathname);
        console.log('Pathname : ' + this.props.history.location.pathname);
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render (){
        let summary = <Redirect to="/"/>
            if (this.props.ings) {
                const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
                summary = 
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                     <Route path={this.props.match.url + '/contact-data'} 
                        component={ContactData}/>
                </div>
                
            }
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);