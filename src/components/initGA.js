import {createBrowserHistory} from 'history';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-149513172-3');

const initGA = () => {
    ReactGA.pageview(window.location.pathname);
    console.log('Pathname : ' + window.location.pathname);

    const history = createBrowserHistory();
    history.listen(location => {
    ReactGA.set({page: location.pathname});
    ReactGA.pageview(location.pathname);
    console.log('Pathname : ' + location.pathname);

    })
};

export default initGA;