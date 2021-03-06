import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { routes } from './components/utils/routes';
import PrivateRoute from './components/utils/privateRoute';

function App() {
  return (
    <div className="d-flex pt-4 justify-content-center">
        <Router>
          <Switch>
            {routes.map((route, index) => 
              route.protected === true ? (
                <PrivateRoute exact key={index} path={route.path} component={route.component} />
              ) : (
                <Route key={index} path={route.path} component={route.component} />
              )
            )}
          </Switch>
        </Router>
    </div>
  );
}

export default App;

