import React,{useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {login} from '../../redux/auth/auth.actions';
import {connect} from 'react-redux';
import './login.styles.scss';


const Login = ({login,error,isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email : '',
        password : ''
    });

    if(isAuthenticated){
        return <Redirect to='/now_showing' />
      }

    const {email,password} = formData;

    const handleChange = event => {
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        login(email,password);
        setFormData({
            email : '',
            password : ''
        });
    }
    


    return (
        <div className='body-login'>
        <div class="container" id="container">
        <div class="form-container sign-in-container">
            <form  onSubmit={handleSubmit}>
                <h1>Sign in</h1>
          
              
                <input 
                    type="email"
                    placeholder="Email"
                    name='email'
                    onChange={handleChange}
                    value={email}
                    required
                />
                <input 
                type="password" 
                placeholder="Password" 
                name='password' 
                onChange={handleChange}
                value={password}
                required
                />
                
                { error ? (<p>{error}</p>): ''}

                <button type='submit'>Sign In</button>
            </form>
        </div>
        <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-right">
                    <h1>Welcome Back!</h1>
                    <p>To manage your expenses, please login back </p>
                    <p style={{marginBottom:0}}>Not a member? Create a new account</p>
                    <Link to='/signup'><button class="ghost" id="signIn">Sign Up</button></Link>
                    
                </div>
            </div>
        </div>
    </div>
    </div>
    
   )
  };

  const mapStateToProps = state => ({
    error : state.auth.error,
    isAuthenticated : state.auth.isAuthenticated
  })

  export default connect(mapStateToProps,{login})(Login);