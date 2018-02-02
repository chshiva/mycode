import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';
import { AppContainer } from 'react-hot-loader';
import store from './store';

import MainLayout from './commons/MainLayout';
import LoginContainer from './login/container';

// reducerRegistry.register(reducersCore)
const history = createHistory();
const mountNode = document.getElementById('root');
const theme = createMuiTheme({
    palette: {
        primary: blueGrey
    }
});

const renderApp = () => {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={LoginContainer}/>
                        <MainLayout />
                    </Switch>
                </ConnectedRouter>

            </Provider>
        </MuiThemeProvider>,
        mountNode
    );
};

renderApp();

// // Hot Module Replacement of react components
// if (module.hot) {
//     module.hot.accept('./routers/routes', () => {
//         const HotMainRouter = require('./routers/routes').default;
//         ReactDOM.render(
//             <MuiThemeProvider theme={theme}>
//                 <Provider store={store}>
//                     <HotMainRouter />
//                 </Provider>
//             </MuiThemeProvider>,
//             mountNode
//         );
//     });
// }