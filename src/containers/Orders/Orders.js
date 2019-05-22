import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import Aux from '../../hoc/Aux/Aux';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/order.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) { //while fetching data from firebase, we dont get data in the form of array.
                    fetchedOrders.push({    //Instead we get data in js object. so we  transform that object in array.
                        ...res.data[key],   //As we want to keep the unique key assigned by firebase to each order,
                        id: key     //we spread each data property using spread operator and add another property id which is unique key.
                    })
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }
    render () {
        
        return (
            <div>
                <h3>Your order history</h3>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients} 
                        price={order.price} />
                ))}
            </div> 
        );
    }
}

export default withErrorHandler(Orders, axios);