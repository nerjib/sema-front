import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ZoneApie from '../../analytics/ZoneApie'
import ZoneCpie from '../../analytics/ZoneCPie'
import ZoneBpie from '../../analytics/ZoneBPie'



import { Link, Route, Redirect } from 'react-router-dom';

import './reports.css'


const Reports = () => {
    let [reports, setReports] = useState([])
    let [fire, setFire]= useState(0)


    useEffect(()=>{
        axios.get('https://kd-sema.herokuapp.com/api/v1/reports')
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
     const  zoneAlabel = ['Kaduna North','Kaduna South','Giwa','Chikun','Igabi','Birnin Gwari', 'Kajuru']
     const zoneAcolor = ['red','blue','purple','green','black', 'gray', 'pink']
     const zoneAdata= [0,2,3,4,5,6,1]
     const  zoneBlabel = ['Zaria',' Kudan', 'Soba','Makarfi','Sabon Gari','Ikara','Kubau','Lere']
     const zoneBcolor = ['red','blue','purple','green','black', 'gray', 'pink','silver']
     const zoneBdata= [0,2,3,4,5,6,1,8]
     const  zoneClabel =  ['Jemaa','Jaba',' Kaura','Kagarko', 'Kauru','Sanga','Zangon Kataf','Kachia']
     const zoneCcolor = ['red','blue','purple','green','black', 'gray', 'pink','silver']
     const zoneCdata= [4,2,3,4,5,6,1,8]

    return( 
        <div>
            <div className='pie'>
                <div  className='box'>
                      <h3>Zone A Fire</h3> <h2>  {Number(fire) +6}</h2>
    <ZoneApie zone_a={fire} labels={zoneAlabel} backgroundColor={zoneAcolor} data={zoneAdata} zone_b={4} zone_c={2}/>

                    
                    {//<img style={{zIndex:3, height:'30vh'}} className='responsive-image1' id='img' 
   // alt='Logo' src={Fire} /> 
    }
                    </div>
                    <div  className='box'>
                      <h3>Zone B Fire</h3> <h2>  {Number(fire) +6}</h2>
                      <ZoneApie  labels={zoneBlabel} backgroundColor={zoneBcolor} data={zoneBdata}/>

                    
                    {//<img style={{zIndex:3, height:'30vh'}} className='responsive-image1' id='img' 
   // alt='Logo' src={Fire} /> 
    }
                    </div>

                   <div  className='box'>
                      <h3>Zone C Fire</h3> <h2>  {Number(fire) +6}</h2>
                      <ZoneApie  labels={zoneClabel} backgroundColor={zoneCcolor} data={zoneCdata}/>

                    
                    {//<img style={{zIndex:3, height:'30vh'}} className='responsive-image1' id='img' 
   // alt='Logo' src={Fire} /> 
    }
                    </div>
                    </div>
                    <div>
        <table  className='table'>
            <thead>
                <tr>
                    <th>sn</th><th>Incident</th><th>Location</th><th>Date</th><th>Time</th><th>sender</th>
                </tr>
            </thead>
<tbody>
{   Object.keys(reports).map(e=>  reports[e].incidence=='Fire' &&   (<tr>
            <td></td><td>{reports[e].incidence}</td> <td>{reports[e].address}</td>
            <td>
                {new Date(reports[e].rtime).getDate()+'/'+new Date(reports[e].rtime).getMonth() +'/'+ new Date(reports[e].rtime).getFullYear()}
            </td>
            <td>
                {new Date(reports[e].rtime).getHours()+ ':' + new Date(reports[e].rtime).getMonth() + ':' + new Date(reports[e].rtime).getSeconds()}
            </td>
            <td>{reports[e].first_name+ ' '+ reports[e].phone_no}</td><td><a href={`#/reports/${reports[e].id}`}><button className='btn btn-primary'>View</button></a></td>
        </tr>)
    )
}
</tbody>
</table>
</div>
</div>
    )
}
export default Reports