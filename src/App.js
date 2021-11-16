import './App.css';
import Registration from './pages/registration/registration';
import Login from './pages/login/login';
import ForgetPassWord from './pages/forgotPassword/forgotPass';
import ResetPassWord from './pages/reset/resetPass';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from './pages/homepage/homepage';
function App() {
  return (
    <div className="App">
      <Router>
          <Route path="/" exact component={ Registration } />
          <Route path="/login" component={ Login } />
          <Route path="/forgotpass" component={ForgetPassWord} />
          <Route path="/reset/:token" component={ ResetPassWord } />
          <Route path="/home" component={Homepage} />
      </Router>
    </div>
  );
}

export default App;
