import React, {Component} from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactGA from 'react-ga';

class Logout extends Component {

    componentDidMount () {
        this.props.onLogout();
        ReactGA.set({page: this.props.history.location.pathname});
        ReactGA.pageview(this.props.history.location.pathname);
        console.log('Pathname : ' + this.props.history.location.pathname);
    }
    render () {
        return <Redirect to="/"/>;
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(Logout);