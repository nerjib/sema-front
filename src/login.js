import React, { Component, useEffect, useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import ruwasa from './semaLogo.jpg'
import  Loader from 'react-loader-spinner'

//import './Login.css'


const Login = () => {
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('')
const [acttype, setActtype] = useState('')
const [ loading, setLoading] = useState(false)
const [ token, setToken] =  useState({
                                    status: 'dd',
                                    data:{
                                    token: 'ttttggdvd',
                                    id: 'id'
                                    },
                                })
const [login, setLogin] = useState(localStorage.getItem('login'))
//let login = 'stop';

const handlePhoneChange = (event) => {
    const { value, name } = event.target;
        setPhone(value)
  }

  const handleEmailChange = (event) => {
    const { value, name } = event.target;
        setEmail(value)
  }

  const onSubmit = (event) => {
      setLoading(true)
    event.preventDefault();
    let data={
      pword: phone,
      phone: email
    }
    axios.post('https://kd-sema.herokuapp.com/api/v1/users/login',data)
    .then(res => {
    //   alert(res.data[0].phone_no)
  // alert(res.data[0].role)
        alert(JSON.stringify(res))
     // if ( res.data[0].role=='admin') {
       // return < Redirect to="/home"/>
      // alert('youre in')
      setLogin('pass')
      setToken(res)
      setLoading(false)
      
      localStorage.setItem('login', login);
      //  localStorage.setItem('acttype', res.data[0].acttype);
        //localStorage.setItem('token', 'res.data.token');
      //  return <Redirect to='/home'> </Redirect>

       // return < Redirect to="/home"/>
              // this.props.history.push('/home');
      /*} else {
        localStorage.setItem('login', 'stop');
        const error = new Error(res.error);
        throw error;
     //   alert('not in')
      }*/
    }
    )
    .catch(err => {
      alert(err)
      console.error(err);
       localStorage.setItem('login', 'stop');
     // return <Redirect to='/home'> </Redirect>
      // alert('Error logging in  please try again');
    });
    
  }

  useEffect(()=>{
    const acc = localStorage.getItem('login')
    if (acc == 'pass'){
     // localStorage.setItem('login','stop')
       setLogin('stop')    
        return    <Redirect to='/home'/>  

      }
  },[])

if(localStorage.getItem('login')==='pass'){
//alert(login)
  //return    <Redirect to='/'/>  

}
  
  return(
    <div >
    <form className="Container border col-md-3 mx-auto border-primary" style={{margin:20}} onSubmit={onSubmit}>
      <div>
                  <div >  <img className='  responsive-image' style={{width:'70%'}}
                                                      src={ruwasa}

                  alt='Logo'
                                  />
                                  </div>
      </div>
  <h1>Login{login + phone+ localStorage.getItem('login')}</h1>
      {loading &&
      <Loader type="Circles" color="Blue"/> }
      <div className="table">
<table align="center" ><tr><td>        <input
        name="email"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
        required
      /></td></tr>
     
     <tr><td> <input
        type="password"
        name="phone"
        placeholder="Password"
        value={phone}
        onChange={handlePhoneChange}
        required
      /></td></tr>
<tr><td>        <input type="submit" value="Login"/>
  </td></tr></table></div>  </form>
</div>
  )
}
export default Login
/*
export default class Login extends Component {
  constructor(props) {
    super(props)
    let login = 'stop';
    this.state = {
      email : '',
      phone: '',
      acttype:'',
      login,
      loading: false,
      token: {
        status: 'dd',
        data:{
          token: 'ttttggdvd',
          id: 'id'
        },
      },
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    this.setState({
      loading: true
    })
    event.preventDefault();
    axios.get('https://ruwassa.herokuapp.com/api/v1/users/admin/'+this.state.email)
    .then(res => {
      // alert(res.data[0].phone)
  // alert(res.data[0].role)
        
      if (res.data[0].phone == this.state.phone & res.data[0].role=='admin') {
       // return < Redirect to="/home"/>
      // alert('youre in')
       this.setState({
         login: 'pass',
         token:  res,
         loading: false

        });
        localStorage.setItem('login', this.state.login);
        localStorage.setItem('acttype', res.data[0].acttype);
        localStorage.setItem('token', 'res.data.token');
        return <Redirect to='/home'> </Redirect>

       // return < Redirect to="/home"/>
              // this.props.history.push('/home');
      } else {
        localStorage.setItem('login', 'stop');
        const error = new Error(res.error);
        throw error;
     //   alert('not in')
      }
    }
    )
    .catch(err => {
      console.error(err);
       localStorage.setItem('login', 'stop');
     // return <Redirect to='/home'> </Redirect>
       alert('Error logging in  please try again');
    });
    
  }
componentDidMount = ()=>{
 const acc = localStorage.getItem('login')
 if (acc == 'pass'){
   this.setState({
     login: 'pass'
   })
 }
}
  render() {
   
    if (this.state.login === 'pass'){
   return <Redirect to='/home'> </Redirect>
 }
  

    
      
   
    
    return (
      <div >
      <form className="Container border col-md-3 mx-auto border-primary" style={{margin:20}} onSubmit={this.onSubmit}>
        <div>
                    <div >  <img className='  responsive-image' style={{width:'70%'}}
                                                        src={ruwasa}

                    alt='Logo'
                                    />
                                    </div>
        </div>
        <h1>Login Below!</h1>
        {this.state.loading &&
        <Loader type="Circles" color="Blue"/> }
        <div className="table">
<table align="center" ><tr><td>        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        /></td></tr>
       
       <tr><td> <input
          type="password"
          name="phone"
          placeholder="Password"
          value={this.state.phone}
          onChange={this.handleInputChange}
          required
        /></td></tr>
<tr><td>        <input type="submit" value="Login"/>
    </td></tr></table></div>  </form>
  </div>
    );
  }
}
*/