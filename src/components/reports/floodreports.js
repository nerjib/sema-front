import React, {useState, useEffect} from 'react';
import axios from 'axios'



const FloodReports = () => {
    let [reports, setReports] = useState('')


    useEffect(()=>{
        axios.get('https://kd-sema.herokuapp.com/api/v1/reports')
        .then(res=>{
          //alert(JSON.stringify(res.data))
            setReports(res.data)
        })
    },[])
    return(
        <div>
            Welcome {reports.length}

           {reports && <FireTable reports={reports}/>
           }
        </div>
    )
}

const FireTable = ({reports}) =>{
    return( 
        <table  className='table'>
            <thead>
                <tr>
                    <th>sn</th><th>Incident</th><th>Location</th><th>sender</th>
                </tr>
            </thead>
<tbody>
{   Object.keys(reports).map(e=>  reports[e].incidence=='Flood' &&   (<tr>
            <td></td><td>{reports[e].incidence}</td> <td>{reports[e].address}</td>
            <td>{reports[e].first_name+ ' '+ reports[e].phone_no}</td><td><a href={`#/reports/${reports[e].id}`}><button className='btn btn-primary'>View</button></a></td>
        </tr>)
    )
}
</tbody>
</table>

    )
}
export default FloodReports