import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Login from "./screens/login";
import Identity from "./screens/identity";
import Vote from "./screens/vote";

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Switch>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/identity" exact>
                <Identity />
              </Route>
              <Route path="/vote" exact>
                <Vote />
              </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
