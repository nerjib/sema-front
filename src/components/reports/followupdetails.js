import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';
import { set } from 'jsonpointer';



const FollowupDetails = ({match}) => {
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
    const [followupdata, setFollowupdata]=useState([])





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
           axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getfollowup/'+match.params.id)
           .then(res=>{
               setFollowupdata(res.data[0])
              
           axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getdraft/'+res.data[0].rid)
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
          <table className='table'>
              <tbody>
                  <tr>
                    <td>
                        <tr><td>Killed</td><td>{followupdata.killed}</td></tr>
                        <tr><td>Men</td><td>{followupdata.killedmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.killedwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.killedchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.killedelder}</td></tr>
                    </td>
                    <td>
                        <tr><td>Missing</td><td>{followupdata.missing}</td></tr>
                        <tr><td>Men</td><td>{followupdata.missingmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.missingwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.missingchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.missingelder}</td></tr>
                    </td>
                    <td>
                        <tr><td>Injured</td><td>{followupdata.injured}</td></tr>
                        <tr><td>Men</td><td>{followupdata.injuredmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.injuredwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.injuredchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.injuredelder}</td></tr>
                    </td>
                    
                    <td>Magnitude {followupdata.missing}</td>
                      </tr>

                      <tr>
                    <td>
                        <tr><td>Affected</td><td>{followupdata.affected}</td></tr>
                        <tr><td>Families</td><td>{followupdata.affectedfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.affectedmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.affectedwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.affectedchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.affectedelder}</td></tr>
                    </td>
                    <td>
                        <tr><td>Victim</td><td>{followupdata.victim}</td></tr>
                        <tr><td>Families</td><td>{followupdata.victimfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.victimmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.victimwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.victimchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.victimelder}</td></tr>
                    </td>
                    <td>
                        <tr><td>Transferred</td><td>{followupdata.transferred}</td></tr>
                        <tr><td>Families</td><td>{followupdata.transferredfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.transferredmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.transferredwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.transferredchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.transferredelder}</td></tr>
                    </td>
                    
                    <td>
                        <tr><td>Evacuated</td><td>{followupdata.evacuated}</td></tr>
                        <tr><td>Families</td><td>{followupdata.evacuatedfamilies}</td></tr>
                        <tr><td>Men</td><td>{followupdata.evacuatedmen}</td></tr>
                        <tr><td>Women</td><td>{followupdata.evacuatedwomen}</td></tr>
                        <tr><td>Children</td><td>{followupdata.evacuatedchildren}</td></tr>
                        <tr><td>Elder</td><td>{followupdata.evacuatedelder}</td></tr>
                    </td>
                      </tr>
                      <tr>
                    <td>
                        <tr><td>Houses Destroyed</td><td>{followupdata.housesdestroyed}</td></tr>
                        <tr><td>Brick/Concrete</td><td>{followupdata.housesdestroyedbrick}</td></tr>
                        <tr><td>Wood/Bamboo</td><td>{followupdata.housesdestroyedwood}</td></tr>
                     </td>
                    <td>
                        <tr><td>Houses damaged</td><td>{followupdata.housesdamaged}</td></tr>
                        <tr><td>Brick/Concrete</td><td>{followupdata.housesdamagedbrick}</td></tr>
                        <tr><td>Wood/Bamboo</td><td>{followupdata.housesdamagedwood}</td></tr>
                     </td>
                    <td>
                        <tr><td>Schools destroyed</td><td>{followupdata.schoolsdestroyed}</td></tr>
                        <tr><td>Classes</td><td>{followupdata.schoolsdestroyedclass}</td></tr>
                        <tr><td>Student</td><td>{followupdata.schoolsdestroyedstudents}</td></tr>
                     </td>
                    
                    <td>
                        <tr><td>Schools Damaged</td><td>{followupdata.schoolsdamaged}</td></tr>
                        <tr><td>Classes</td><td>{followupdata.schoolsdamagedclass}</td></tr>
                        <tr><td>Students</td><td>{followupdata.schoolsdamagedstudents}</td></tr>
                     </td>
                      </tr>

                      <tr>
                    <td>
                        <tr><td>Hospital destroyed</td><td>{followupdata.hospitaldestroyed}</td></tr>
                        <tr><td>Hospital damaged</td><td>{followupdata.hospitaldamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Health centers destroyed</td><td>{followupdata.healthcentersdestroyed}</td></tr>
                        <tr><td>Health centers damaged</td><td>{followupdata.healthcentersdamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Health posts destroyed</td><td>{followupdata.healthpostsdestroyed}</td></tr>
                        <tr><td>health posts damaged</td><td>{followupdata.healthpostsdamaged}</td></tr>
                     </td>                    
                   
                      </tr>

                      <tr>
                    <td>
                        <tr><td>Religious buildings destroyed</td><td>{followupdata.religiousbuildingsdestroyed}</td></tr>
                        <tr><td>Religious buildings damaged</td><td>{followupdata.religiousbuildingsdamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Public buildings destroyed</td><td>{followupdata.publicbuildingdestroyed}</td></tr>
                        <tr><td>Public buildings damaged</td><td>{followupdata.publicbuildingdamaged}</td></tr>
                     </td>
                    <td>
                        <tr><td>Cost damages(local)</td><td>{followupdata.costdamageslocal}</td></tr>
                        <tr><td>Cost damages ($usd)</td><td>{followupdata.costdamagesdolar}</td></tr>
                     </td>                    
                   
                      </tr>

              </tbody>
          </table>

                      
        </div>
    )
}



export default FollowupDetails
