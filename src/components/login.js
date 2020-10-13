import React, {useState, useEffect} from 'react';

import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Sema from '../../src/semaLogo.jpg'
import IDP from '../../src/img/Idp.jpg'
import Flood from '../../src/img/flooicon.png'
import Fire from '../../src/img/firer.png'
import BFire from '../../src/img/busFire.png'
import MyPie from '../../src/analytics/pie'
import FloodPie from '../../src/analytics/floodpie'


import './home.css'



const Login = ({params}) => {
const [floodCases, setFloodCases]=useState(0);
const [fireCases, setFireCases]=useState(0);
const [timer, setTimer] = useState(0)




    return(
        <div className='mainContainer' >
        
          <Body fire={fireCases} flood={floodCases} />
          

            
        </div>

    )
}
const Text =()=> <div><h3>SEMA</h3></div>
const Body = () => {
    return(
        <div className='container'>
            <div style={{flexDirection:"column"}}>
            <input type='text' placeholder='Phone no.'/><br/>
            <input type='password' placeholder='Password'/><br/>
                <button>Login</button>
                </div>
             </div>
    )
}


export default Login
