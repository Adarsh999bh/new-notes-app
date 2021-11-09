import './App.css';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import ForgetPassWord from './components/forgotPassword/forgotPass';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/" exact component={ Registration } />
          <Route path="/login" component={ Login } />
          <Route path="/forgtpass" component={ ForgetPassWord } />
      </Router>
    </div>
  );
}

export default App;
