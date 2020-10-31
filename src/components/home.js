import React, {useState, useEffect} from 'react';
/*import axios from 'axios';
import Supervisors from './supervisors/phaseSupervisors'
import Projects from './Projects/projects'
import Contractors from './contractors/contractors'
import { Link, Route, Redirect } from 'react-router-dom';
import wassh from '../img/wassh1.jpg'
import ruwasa from '../img/ruwasa.jpg'
import DailyMap from './map/dailymap'
import Menu from './menu'
import Reports from './reports/reports'
import Analytics from './analytics'
import './home.css'
*/
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Sema from '../../src/semaLogo.jpg'
import IDP from '../../src/img/Idp.jpg'
import Flood from '../../src/img/flooicon.png'
import Fire from '../../src/img/firer.png'
import BFire from '../../src/img/busFire.png'
import MyPie from '../../src/analytics/pie'
import FloodPie from '../../src/analytics/floodpie'
import ZoneApie from '../analytics/ZoneApie'


import './home.css'



const Home = ({params}) => {
const [floodCases, setFloodCases]=useState(0);
const [fireCases, setFireCases]=useState(0);
const [accident, setAccident]=useState(0);
const [zonAFire, setZoneAFire] = useState(0)
const [zonBFire, setZoneBFire] = useState(0)
const [zonCFire, setZoneCFire] = useState(0)
const [zonAFlood, setZoneAFlood] = useState(0)
const [zonBFlood, setZoneBFlood] = useState(0)
const [zonCFlood, setZoneCFlood] = useState(0)
const [zonAAccident, setZoneAAccicent] = useState(0)
const [zonBAccident, setZoneBAccident] = useState(0)
const [zonCAccident, setZoneCAccident] = useState(0)

const [timer, setTimer] = useState(0)
let events = ['fire','flood']
let day1 = 1000 * 3600 * 24;
let today = new Date();

let date1= new Date("10/30/2020, 9:59:12")
let date2= new Date().toLocaleString()
let difftime= date2- date1
let diffdate = Math.round((today.getTime() - date1.getTime())/day1).toFixed(0)
let diffdate1 =(today.getTime() - date1.getTime())/day1

const handleTimer = () =>{
//this.inInterval2= setInterval( ()=>this.tick2(), 1000);
    setInterval(
      () => setTimer(new Date().toLocaleString()),
      1000
    )};
    useEffect(()=>handleTimer(),[])
    const Loader=()=>{
    setInterval(()=>    axios.get('https://kd-sema.herokuapp.com/api/v1/analytics')
        .then(res=>{
            setFloodCases(res.data['flood'])
            setFireCases(res.data['fire'])
            setAccident(res.data.accident)

    
        }).catch(err=>{console.log(err)}),1000)
    }

    useEffect(()=>  Loader,[])
useEffect(()=>{

    axios.get('https://kd-sema.herokuapp.com/api/v1/analytics')
    .then(res=>{
         setFloodCases(res.data['flood'])
        setFireCases(res.data['fire'])
        setAccident(res.data.accident)
     
    }).catch(err=>{console.log(err)})

    axios.get('https://kd-sema.herokuapp.com/api/v1/analytics/zonalfire')
    .then(res=>{
         setZoneAFire(res.data.zoneAFire)
        setZoneBFire(res.data.zoneBFire)
        setZoneCFire(res.data.zoneCFire)
     
    }).catch(err=>{console.log(err)})
    axios.get('https://kd-sema.herokuapp.com/api/v1/analytics/zonalFlood')
    .then(res=>{
         setZoneAFlood(res.data.zoneAFlood)
        setZoneBFlood(res.data.zoneBFlood)
        setZoneCFlood(res.data.zoneCFlood)
     
    }).catch(err=>{console.log(err)})
    axios.get('https://kd-sema.herokuapp.com/api/v1/analytics/zonalAccident')
    .then(res=>{
         setZoneAAccicent(res.data.zoneAAccident)
        setZoneBAccident(res.data.zoneBAccident)
        setZoneCAccident(res.data.zoneCAccident)
     
    }).catch(err=>{console.log(err)})

},
    [])

const handlel=()=> <Link to='/homp'/>

    return(
        <div className='mainContainer' >
            <Header time={timer}/> 
       
           <Menu diffdate=         {diffdate}/>
           <button onClick={handlel}>jjj</button>
          <Body fire={fireCases} flood={floodCases} accident={accident} zoneAFire={zonAFire}
          zoneBFire={zonBFire} zoneCFire={zonCFire} zoneAFlood={zonAFlood} zoneBFlood={zonBFlood}
          zoneCFlood={zonCFlood} zoneAAccident={zonAAccident} zoneBAccident={zonBAccident} zoneCAccident={zonCAccident}/>
         

            
        </div>

    )
}
const Text =()=> <div><h3>SEMA</h3></div>
const Body = ({fire, flood, accident, time, zoneAFire,zoneBFire,zoneCFire, zoneAAccident,zoneBAccident,
                zoneCAccident, zoneAFlood,zoneBFlood,zoneCFlood}) => {
    const  Eventslabel = ['Fire','Flood','Accidents']
    const  Firelabel = ['Zone A','Zone B','Zone C']
    const Firecolor = ['red','blue','green']
    const eventsColor = ['red','blue','green']
    const Firedata= [zoneAFire, zoneBFire,zoneCFire]
    const Flooddata= [zoneAFlood,zoneBFlood,zoneCFlood]
    const AccidentData= [zoneAAccident,zoneBAccident,zoneCAccident]

    const eventData = [fire,flood,accident]

    
    return(
        <div className='container'>

       <div  className='box2'>
                      <h3>  Events</h3><br/>
    <h2>  {Number(fire) +Number(accident)+Number(flood)}</h2>
    <ZoneApie  labels={Eventslabel} backgroundColor={eventsColor} data={eventData} />


                    
                    {//<img style={{zIndex:3, height:'30vh'}} className='responsive-image1' id='img' 
   // alt='Logo' src={Fire} /> 
    }
                    </div>

          <Link to="/reports">        <div  className='box2'>
                      <h3>  Fire</h3><br/>
    <h2>  {Number(zoneAFire) +Number(zoneBFire)+Number(zoneCFire)}</h2>
    <ZoneApie  labels={Firelabel} backgroundColor={Firecolor} data={Firedata} />


                    
                    {//<img style={{zIndex:3, height:'30vh'}} className='responsive-image1' id='img' 
   // alt='Logo' src={Fire} /> 
    }
                    </div></Link>
          
             
             <Link to="/floodreports">      <div className='box2'>
             <h3>  Flood</h3><br/>
                    <h2>{Number(zoneAFlood) + Number(zoneBFlood)+ Number(zoneCFlood) }</h2>
          {//}          <img style={{zIndex:3, height:'15vh'}} className='responsive-image' id='img' 
   // alt='Logo' src={Flood} /> 
    }
             <ZoneApie  labels={Firelabel} backgroundColor={Firecolor} data={Flooddata} />


                    </div></Link>

                    <Link to="/floodreports">      <div className='box2'>
             <h3>  Accidents</h3><br/>
                    <h2>{Number(zoneAAccident) +Number(zoneBAccident)+ Number(zoneCAccident) }</h2>
          {//}          <img style={{zIndex:3, height:'15vh'}} className='responsive-image' id='img' 
   // alt='Logo' src={Flood} /> 
    }
             <ZoneApie  labels={Firelabel} backgroundColor={Firecolor} data={AccidentData} />


                    </div></Link>
                    <div className='box2'>
                       <h3> Bandit Attacks</h3><br/>
                        <h2>0 </h2>

     {//}               <img style={{zIndex:3, height:'15vh'}} className='responsive-image' id='img' 
    //alt='Logo' src={BFire} /> 
}
                    </div>
                    <div className='box2'>
                        <h3>IDP Camps</h3>
                            <h2>0</h2>

 {//}                   <img style={{zIndex:3, height:'15vh'}} className='responsive-image' id='img' 
    //alt='Logo' src={IDP} /> 
}
                    </div> 
                    <div className='box2'>
                       <h3> Erosion</h3><br/>
                        <h2>0 </h2>

     {//}               <img style={{zIndex:3, height:'15vh'}} className='responsive-image' id='img' 
    //alt='Logo' src={BFire} /> 
}
                    </div>
                    <div className='box2'>
                       <h3> Accident</h3><br/>
                        <h2>0 </h2>

     {//}               <img style={{zIndex:3, height:'15vh'}} className='responsive-image' id='img' 
    //alt='Logo' src={BFire} /> 
}
                    </div>
                    
            </div>
    )
}

const Header=({time})=>(
 <div className='header'>
     <div className='row'>
    <div className='col-md-1'style={{zIndex:4}}  ><img style={{zIndex:3, height:'15vh'}} className='responsive-image' id='img' 
    alt='Logo' src={Sema} /> 
    </div>
    <div style={{ backgroundColor:'#00a9f9',height:'15vh'}} className='col-md-11'  >        
               <div><h2 style={{color:'#ffffff', alignSelf:'center'}} className=' text-center'>{time}</h2></div> 
    </div> 
    </div>
    <td>
                   
                     </td>
 </div>
)


const Menu = (         {diffdate}
    ) => {
    return (
<div className='Menu'>
                <button className='button'>
                Home        {diffdate}

            </button>
            <a href={`#/kdmap`}>
 <button className='button'>
               Map 
            </button></a>
           
    {/*}        <Link to="/reports">
            <button className='button'>
                Report
            </button>
            </Link>
    */}
            <Link to="/drafts">
            <button className='button'>
                Draft
            </button>
            </Link>
            <Link to="/followup">
            <button className='button'>
                Followup
            </button>
            </Link>
            <Link to="/closedreports">
            <button className='button'>
                Closed
            </button>
            </Link>
            <Link to="/followup">
            <button className='button'>
                Rejected
            </button>
            </Link>
            <Link to="/volunteers">
            <button className='button'>
                Volunteers
            </button>
            </Link>
            <Link to="/followup">
            <button className='button'>
                System settings
            </button>
            </Link>
        </div>
    )
}

export default Home


/*
export default class Home extends React.Component{
constructor(props){
    super(props)
    const access = localStorage.getItem('login');

    this.state={
        projects:'',
        supervisors:'',
        display:'none',
        welcome:'none',
        supervisorView:'none',
        reportView:'none',
        contractorsView:'none',
        analyticsView:'',
        title:'ANALYTICS',
       time:'',
        login: access,
        mapView:'none',
        view1:'analytics'

    }

    if(access !== 'pass'){
        this.setState({login: 'stop'})
      }
      
}

onDisplay=()=>{

}
handleProjects=()=>{
    this.setState({
        display: this.state.display='',
        welcome: this.state.display='none',
        supervisorView: this.state.display='none',
        reportView: this.state.display='none',
        contractorsView: this.state.display='none',
        analyticsView: this.state.display='none',
        mapView: this.state.display='none',
        view1: 'projects',
        title: 'PROJECTS'
    })
}

handleSupervisors=()=>{
    this.setState({
        display: this.state.display='none',
        welcome: this.state.display='none',
        supervisorView: this.state.display='',
        reportView: this.state.display='none',
        contractorsView: this.state.display='none',
        analyticsView: this.state.display='none',
        mapView: this.state.display='none',
        view2:'supervisors',
        title:'SUPERVISORS'
    })
}
handleReports=()=>{
    this.setState({
        display: this.state.display='none',
        welcome: this.state.display='none',
        supervisorView: this.state.display='none',
        reportView: this.state.display='',
        contractorsView: this.state.display='none',
        analyticsView: this.state.display='none',
        mapView: this.state.display='none',
        view1:'reports',
        title:'Reports'
    })
}
handleContractors=()=>{
    this.setState({
        display: this.state.display='none',
        welcome: this.state.display='none',
        supervisorView: this.state.display='none',
        reportView: this.state.display='none',
        contractorsView: this.state.display='',
        analyticsView: this.state.display='none',
        mapView: this.state.display='none',
        view1: 'contractors',
        title:'CONTRACTORS'
    })
}
handleAnalyticts=()=>{
    this.setState({
        display: this.state.display='none',
        welcome: this.state.display='none',
        supervisorView: this.state.display='none',
        reportView: this.state.display='none',
        contractorsView: this.state.display='none',
        analyticsView: this.state.display='',
        mapView: this.state.display='none',
        view1:'analytics',
        title:'ANALYTICS'
    })
}
handleHome=()=>{
    this.setState({
        display: this.state.display='none',
        welcome: this.state.display='',
        supervisorView: this.state.display='none',
        reportView: this.state.display='none',
        contractorsView: this.state.display='none',
        analyticsView: this.state.display='none',
        mapView: this.state.display='none',
        view1: 'about',
        title:'ABOUT'
    })
}

handleMap=()=>{
    this.setState({
        display: this.state.display='none',
        welcome: this.state.display='none',
        supervisorView: this.state.display='none',
        reportView: this.state.display='none',
        contractorsView: this.state.display='none',
        analyticsView: this.state.display='none',
        mapView: this.state.display='',
        title:'MAP',
        view1: 'map'
    })

}
handleSignOut=()=> {}
    


tick2(){
    this.setState({
      time: new Date().toLocaleString()

    })
}
componentDidMount(){


   
    axios.get('/api/v1/users')
        .then(res =>{
            this.setState({supervisors: res.data})
        })
        .catch(function(error){
             console.log(error)
        })
       this.inInterval2= setInterval( ()=>this.tick2(), 1000);

}
componentWillUnmount(){
    clearInterval(this.inInterval2)
}
render(){
  if (this.state.login !== 'pass'){
        return <Redirect to='/'></Redirect>
       };
  //     alert(this.state.login)
    return(
        <div className='fluid-container' >
            <div id='header1' className='row'>
 <div className='col-md-2'style={{zIndex:4}}  ><img style={{zIndex:3}} className='responsive-image' id='img'  src={ruwasa}
 alt='Logo'  /> </div>
            <div style={{ backgroundColor:'#00a9f9', width:'100%'}}   className='col-md-10'>        
            <div><h2 style={{color:'#ffffff', marginTop:70}} className=' text-center'>{this.state.title}</h2></div> 
             <div><h2 style={{color:'white'}}>{(this.state.time)}</h2></div>
            </div> 
            </div>
  
            <div className='row' id='contentbody'  >
        {//--menu--
        }
                <div className='col-md-2' style={{backgroundColor:'#00a9f9'}} id='menu'  >
                <div className='block' style={{backgroundColor:'#00a9f9', height:50, alignItems:'center', marginBottom:10, display:'block'}}><h3 className='text-center'>Dashboard</h3></div>
                <Menu onMap={this.handleMap} onSignOut={this.handleSignOut} onContractors={this.handleContractors} onHome={this.handleHome} onProjects={this.handleProjects} onReports={this.handleReports} /*onSupervisors={this.handleSupervisors} onAnalytics={this.handleAnalyticts} />
                </div>
       
                <div  className='col-md-10' id='viewcontent' style={{ float:'right' }} >
                        <span >
                            <div style={{display:this.state.welcome}}>
                           <h6 className='text-block text-justify'> The goal of the WASH programme is to contribute to an 
                           improvement in the number of people benefiting from improved water and sanitation facilities.
                           
                            Increase access to improved water and sanitation facilities and hygiene knowledge and practice for communities and students in schools in selected areas.
                     </h6>
                           
                           <br/>
                           <br/>
                            <div className='row'>

                                <div className='col-md-4'>
                                    <img className='responsive-image' style={{width:'100%'}}
                                    src='https://files.globalwaters.org/water-links-files/latrine-Mingkaman-South-sudan-PROPEL-Global-Communities.JPG'
                                    alt='laterine'
                                    />
                                </div>
                                <div className='col-md-4'>
                                <img className='responsive-image'
                                src=''
                            alt='wash img'/>
                         
                                </div>
                            </div>

                            <div className='row'>

                                <div className='col-md-4'>
                                    <img className='responsive-image' style={{width:'100%'}}
                                    src='src\img\wassh1.jpg'
                                    alt='laterine'
                                    />
                                </div>
                                <div className='col-md-4'>
                                    <img className='responsive-image' style={{width:'100%'}}
                                    src={wassh}
                                    alt='laterine'
                                    />
                                </div>
                                </div>

                            </div>
                            </span>

                            {this.state.view1=='analytics' &&
                            <div style={{display: this.state.analyticsView}}>
                            <Analytics />                            
                            </div>
}
{this.state.view1=='projects' &&
                            <div style={{display: this.state.display}}>
                            <Projects />                            
                            </div>
}
{this.state.view1=='reports' &&
                            <div style={{display: this.state.reportView}}>
                            <Reports />                            
                            </div>
}
                         {/*}   <div style={{display: this.state.supervisorView}}>
                            <Supervisors />                            
                            </div>*}
   {this.state.view1=='contrctors' &&                          
                            <div style={{display: this.state.contractorsView}}>
                            <Contractors />                            
                            </div>
}
{this.state.view1=='map' &&
                            <div style={{display: this.state.mapView}}>
                               <DailyMap/>
                          </div>
}
                </div>

            </div>

            
        </div>
     
     
    )
}
}
*/