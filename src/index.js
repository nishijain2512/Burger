import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'; // applyMiddleware n compose are imported to use middleware in app. 
import { Provider} from 'react-redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import ReactGA from 'react-ga';
//import {createBrowserHistory} from 'history';

ReactGA.initialize('UA-149513172-3'); // initialize app with the GA tracking id.

 //NOTE: in this approach, we listen to the history, whenever there is change in history.location,
 //      it sets the path and notifies GA about the pageview. After this portion of code we need to wrap
//      our <App> with <Router history={history}> <App> <Router />. 
// ** NOTE CONTINUES AT THE BOTTOM.....

// ReactGA.pageview(window.location.pathname); //records initial homepage pageview.

// const history = createBrowserHistory();

// Initialize google analytics page view tracking
// history.listen(location => {
//   ReactGA.set({page: location.pathname}); // Update the user's current page(For 'pageview' hits, either &dl or both &dh and &dp have to be specified for the hit to be valid. Used to specify virtual page paths.)
//   ReactGA.pageview(location.pathname); // Record a pageview for the given page
// })
//-----------------------------------------------------------------------------

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // this was copied from "https://github.com/zalmoxisus/redux-devtools-extension" under advanced store setup as we r setting up store with middleware and enhancers
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();


//NOTE CONTINUES.......
//      <Router> is  low-level interface for all router components. Typically apps will use one of the high-level routers instead:
//       <BrowserRouter>, <HashRouter>, <MemoryRouter>, <NativeRouter>, <StaticRouter>, </StaticRouter>

//      <BrowserRouter> is a <Router> that uses the HTML5 history API (pushState, replaceState and 
//      the popstate event) to keep your UI in sync with the URL.

//      BrowserRouter ignores the history prop (if we pass it as parameter in it) as it handles the   
//      history automatically for you. If you need access to the history outside of a react component, 
//      then using Router should be fine.

//      So, if we are already using BrowserRouter in our app, we dont need to listen to the history. We  
//      can directly send history.location.pathname to set ReactGA.set and ReactGA.pageview for each of 
//      the component loaded(this can be done in componentDidMount function of class based component.This aprroach is used in this burger app).