import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import Landing from './page/Landing';
import LoginForm from './page/login.page';
import RegisterForm from './page/register.page';
import Dashboard from './page/Dashboard.page';
import AuthContextProvider from './contexts/AuthContext';
import ProtectedRoute from './protected/protectedRoute';
import { Navigate } from 'react-router-dom';

import 'antd/dist/antd.min.css';

import './App.scss';
import ChangePassword from './page/changePassword.page';

function App() {
  return (
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="register" element = {<RegisterForm />} />
            <Route element = {<ProtectedRoute />} >
              <Route path="/" element = {<Navigate to='dashboard' />} />
              <Route path="login" element = {<LoginForm />} />
              <Route path="dashboard" element = {<Dashboard />} />
              <Route path="change-password" element= {<ChangePassword />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </Router>
  )
}
export default App;