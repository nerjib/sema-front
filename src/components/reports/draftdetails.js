import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';
import { set } from 'jsonpointer';



const DraftDetails = ({match}) => {
    const [report, setReport] = useState('')
    const [feedback, setFeedback] = useState([])
    const [msg, setMsg]=useState('')
    const [gps, setGPS]=useState('')
    const [imgurl1, setImgurl1]=useState('')
    const [imgurl2, setImgurl2]=useState('')
    const [aidname, setAid]=useState('')
    const [vname, setVname]=useState('')
    const [oname, setOname]=useState('')
    const [followup, setFollowup]=useState([])




const loader =()=>{
  /*  setInterval(
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
    }) , 1000

    )
    */
}              


        useEffect(()=>{
        //    alert(JSON.stringify(match))
           // alert(match.params.id)
              
           axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getdraft/'+match.params.id)
           .then(res=>{
               setReport(res.data[0])
              
               axios.get('https://kd-sema.herokuapp.com/api/v1/users/userid/'+res.data[0].oid)
               .then(res=>{
                if(res.data[0]){

                   setOname(res.data[0].first_name+' '+res.data[0].last_name)
                }else{
                    setOname('Not assign')
                }
               }
               )
           
               axios.get('https://kd-sema.herokuapp.com/api/v1/users/userid/'+res.data[0].vid)
               .then(res=>{
                   if(res.data[0]){
                   setVname(res.data[0].first_name+' '+res.data[0].last_name)
                   }else{
                       setVname('Not assign')
                   }
               })
           
           })
        }           
           
        ,[])



        

        const load=()=>{
            setInterval(()=>  
                axios.get('https://kd-sema.herokuapp.com/api/v1/reports/followup/'+match.params.id)
                .then(res=>{
                    setFollowup(res.data)
                })            
            ,1000)
        }
        useEffect(()=> load(),[])

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
                        <td>Date: {report.date}</td>
                        <td>soure: {report.type}</td>
                    </tr>
                    <tr>
                        <td>State: Kaduna</td>
                        <td>lga: {report.lga}</td>
                        <td>ward: {report.ward}</td>
                    </tr>
                    <tr>
                         <td  colSpan={2} > Event: {report.event}</td>
                         <td colSpan={1}> Place: {report.place}</td>

                    </tr>
                    <tr>
                         <td  colSpan={1} > Cause: {report.cause}</td>
                         <td colSpan={2}> Descr. Cause: {report.descrcause}</td>

                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <img src={report.imgurla} alt='icident img' width='250px' height='250px'/>
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
                        Category: {report.category}
                        </td>                      
                             
                                      
                     <td>
                   <a href={`#/updatecategory/${match.params.id}`}> <button>Edit</button></a>
                     </td>
                       
                    </tr>
                    <tr>
                        <td colSpan={3}>
                        Volunteer incharge: {vname}
                        </td>                      
                             
                                      
                     <td>
                   <a href={`#/updatevid/${match.params.id}`}> <button>Edit</button></a>
                     </td>
                       
                    </tr>
                    <tr>
                        <td colSpan={3}>
                        Officer incharge: {oname}
                        </td>                      
                             
                                      
                     <td>
                   <a href={`#/updateoid/${match.params.id}`}> <button>Edit</button></a>
                     </td>
                       
                    </tr>
                </tbody>
            </table>
            Followup
            { 
                Object.keys(followup).map((e,i)=>
                             <div >{i+1 +'. '+followup[e].id} 
                             {' '+followup[e].time}'
                             <a href={`#/followup/${followup[e].id}`}> <button>View</button></a>
                             <hr/>
                           
                             </div>
                            
                )}


                      
        </div>
    )
}



export default DraftDetails
