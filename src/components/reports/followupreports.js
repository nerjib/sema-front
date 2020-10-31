import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ZoneApie from '../../analytics/ZoneApie'



import { Link, Route, Redirect } from 'react-router-dom';

import './reports.css'


const FollowupReports = () => {
    let [reports, setReports] = useState([])
    let [fire, setFire]= useState(0)


    useEffect(()=>{
        axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getdraft')
        .then(res=>{
          //alert(JSON.stringify(res.data))
           setReports(res.data)
        })
    },[])
    return(
        <div className='mainContainer'>
            {reports.length}
           
        
                          <div className='container'>


           {
               reports && <FireTable fire={fire} reports={reports}/>
           }
           </div>
        </div>
    )
}

const FireTable = ({reports, fire}) =>{

    let day1 = 1000 * 3600 * 24;
    let today = new Date();

    
    return( 
        <div>
    
                    <div>
        <table  className='table'>
            <thead>
                <tr>
                    <th>sn</th><th>Events</th><th>Location</th><th>Date</th><th>Time</th><th>Days</th><th>source</th>
                </tr>
            </thead>
<tbody>
{   Object.keys(reports).map(e=>  reports[e].category ==='followup' &&   (<tr>
            <td></td><td>{reports[e].event}</td> <td>{reports[e].ward+', '+reports[e].lga}</td>
            <td>
                {new Date(reports[e].date).getDate()+'/'+new Date(reports[e].date).getMonth() +'/'+ new Date(reports[e].date).getFullYear()}
            </td>
            <td>
                {new Date(reports[e].date).getHours()+ ':' + new Date(reports[e].date).getMonth() + ':' + new Date(reports[e].date).getSeconds()}
            </td>
            <td>
          
                {  Math.round((today.getTime() - (new Date(reports[e].date)).getTime())/day1).toFixed(0)
    }
           
            </td>
            <td>{reports[e].type}</td><td><a href={`#draft/followup/${reports[e].id}`}><button className='btn btn-primary'>View</button></a></td>
        </tr>)
    )
}
</tbody>
</table>
</div>
</div>
    )
}
export default FollowupReports