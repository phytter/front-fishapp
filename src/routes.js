import { Switch, Route } from 'react-router-dom';
import Info from './information/index';
import About from './about/index';
import App from './App'

const Router = () => (
    <Switch>
        <Route exact path="/">
            <App />
        </Route>
        <Route exact path="/especies">
            <Info />
        </Route>
        <Route exact path="/sobre">
            <About />
        </Route>
        <Route path="*">
            <App />
        </Route>
    </Switch>
);

export default Router;