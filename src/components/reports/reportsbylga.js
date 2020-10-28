import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ZoneApie from '../../analytics/ZoneApie'
import './reports.css'

const ReportsByLGA = ({match}) => {
    let [reports, setReports] = useState([])


    useEffect(()=>{
        axios.get(`https://kd-sema.herokuapp.com/api/v1/reports/reportsbylga/${match.params.id}`)
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
               reports && <Table fire={reports} reports={reports} LGA={match.params.id}/>
           }
           </div>
        </div>
    )
}

const Table = ({reports, fire, LGA}) =>{
    const label=  ['Fire',' Accident', 'Flood','Arm bandit','erosion']
    const color= ['red','blue','purple','green','gray']
    const data = [3,5,7,9,5]

    return( 
<div>
        <div className='pie'>
        <div  className='box'>
              <h3>{LGA}</h3>
<ZoneApie zone_a={fire} labels={label} backgroundColor={color} data={data} zone_b={4} zone_c={2}/>

            
            {//<img style={{zIndex:3, height:'30vh'}} className='responsive-image1' id='img' 
// alt='Logo' src={Fire} /> 
}
            </div>
            </div>
            <div style={{margin:100}}>
        <table  className='table'>
            <thead>
                <tr>
                    <th>sn</th><th>Incident</th><th>Location</th><th>Date</th><th>Time</th><th>sender</th>
                </tr>
            </thead>
<tbody>
{   Object.keys(reports).map(e=> (<tr>
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
export default ReportsByLGA