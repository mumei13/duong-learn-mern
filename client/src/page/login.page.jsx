import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from '../components/AlertMessage'


const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext)

  // Router
  const navigate = useNavigate()

  /* Local State
  *  Define a variable to save form data
  */
  const [ loginForm, setLoginForm ] = useState({
    username: '',
    password: ''
  })

  const [alert, setAlert] = useState(null)

  const { username, password } = loginForm

  // Function to get data and check with database
  // Get data and save to variable loginForm
  const onChangeLoginForm = event =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value })
  // Check with database
  const onFinish = async event => {
    const loginData = await loginUser(loginForm);

    try {
      if(loginData.success) {
        navigate('/dashboard')
      } else{
        setAlert({type: 'danger', message: loginData.message})
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
    
  };
  // Noti when fail
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Form submit
  return (
  <div className='form-middle'>
    <h1>Login</h1>
    <Form 
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
     >
       
        <Form.Item>
          <AlertMessage info={alert} />
        </Form.Item>

        <Form.Item
        onChange={onChangeLoginForm}
        value={username} 
        label="Username" 
        name="username" 
        placeholder='Username' 
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}>
          <Input name="username" />
        </Form.Item>        
        <Form.Item 
        onChange={onChangeLoginForm}
        value={password} 
        label="Password" 
        name="password" 
        placeholder='Password' 
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}>
          <Input.Password name="password" />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Login</Button>
        </Form.Item>
    <p>Don't have account?
      <Link to='../register'>
        <Button variant='info' className='btn'>Register</Button>
      </Link>
    </p>
    </Form>
  </div>
  )
}

export default LoginForm