import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';



const ReportDetails = ({match}) => {
    const [report, setReport] = useState('')
    const [feedback, setFeedback] = useState([])
    const [msg, setMsg]=useState('')
    const [gps, setGPS]=useState('')
    const [imgurl1, setImgurl1]=useState('')
    const [imgurl2, setImgurl2]=useState('')
    const [aidname, setAid]=useState('')




        useEffect(()=>{
        //    alert(JSON.stringify(match))
           // alert(match.params.id)
                axios.get('https://kd-sema.herokuapp.com/api/v1/reports/reportid/'+match.params.id)
                .then(res=>{
                    setReport(res.data[0])
                    axios.get('https://kd-sema.herokuapp.com/api/v1/users/userid/'+res.data[0].aid)
                    .then(res=>{
                        setAid(res.data[0].first_name+' '+res.data[0].last_name)
                    })

                })
                
                axios.get('https://kd-sema.herokuapp.com/api/v1/reports/reportfeedback/'+match.params.id)
                .then(res=>{
                    setFeedback(res.data)
                })
                

        },[])

     const   onchangeMsg=(e)=>{
     const { value, name } = e.target;
    //    alert(value)
            setMsg(value)
        }
        const submit=(e)=>{
            const data = {
                rid: match.params.id,
                senderid: 10,
                receiverid: report.aid,
                msg,
                imgurl1,
                imgurl2
            }
            axios.post('https://kd-sema.herokuapp.com/api/v1/reports/feedback', data)
            .then(res=>{
                alert('sent')
                setMsg('')
                setImgurl1('')
                setImgurl2('')
            })

        }

    return(
        <div>
          <Link to='/'>  <button className='btn'>Home</button> </Link>
            Report Details 
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Reporter's name: {report.first_name + ' '+ report.last_name}</td>
                        <td>Phone no: {report.phone_no}</td>
                        <td>Adress: {report.address}</td>
                    </tr>
                    <tr>
                         <td colSpan={2}> Incident: {report.incidence}</td>
                         <td colSpan={1}> Cause: {report.incidence}</td>

                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <img src={report.imga} alt='icident img' width='250px' height='250px'/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                           Resident contact: { report.contact !== '' && report.contact } { report.contact=='' && report.contact }
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                           GPS: { report.gps }
                        </td>
                        <td>
                     <a href={`#/incidentmap/${report.gps}`}> <button>View location in google map</button></a>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                        Volunteer: {aidname}
                        </td>                      
                             
                                      
                     <td>
                   <a href={`#/updateaid/${match.params.id}`}> <button>Edit</button></a>
                     </td>
                       
                    </tr>
                </tbody>
            </table>
            { Object.keys(feedback).map(e=>
                             <div style={{color:'red', textAlign: feedback[e].senderid==10?'right':'left'}}>{feedback[e].message+' '+ feedback[e].receiverid}<hr/></div>
                         )}


                         <div>
                             <textarea onChange={onchangeMsg} value={msg} style={{width:'50%', height:'200px', margin:'50px'}}/>
                                <button onClick={submit} >send</button>
                         </div>
        </div>
    )
}

export default ReportDetails
