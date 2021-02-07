import { Switch, Route } from 'react-router-dom';
import Info from './information/index';
import App from './App'
 
export default () => (
    <Switch>
        <Route exact path="/">
            <App />
        </Route>
        <Route exact path="/info">
            <Info />
        </Route>
        <Route path="*">
            <App />
        </Route>
    </Switch>
);