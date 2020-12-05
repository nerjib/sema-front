import React,{useState, useEffect} from 'react';
import axios from 'axios';





const Volunteers =()=>{

    const [volunteers, setVolunteers] = useState([])

useEffect(()=>{
    axios.get('https://kd-sema.herokuapp.com/api/v1/users')
    .then(val=>{
        setVolunteers(val.data)
    }).catch(e=>{console.log(e)})


},[])

    return(
        <div>
            jjd {volunteers.length}
            <Table vol={volunteers}/>

        </div>
    )

}

const Table=({vol})=>{
return(
    <table className='table'>
        <thead>
            <tr>
                <th>Name</th><th>Phone</th><th>LGA</th><th>Ward</th><th>Address</th><th>Gender</th><th>category</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(vol).map((e,i)=>
                <tr keys={i}>
                    <td>{vol[e].first_name} {vol[e].last_name}</td>  
                     <td>{vol[e].phone_no}</td>
                     <td>{vol[e].lga}</td>
                     <td>{vol[e].ward}</td>
                     <td>{vol[e].address}</td>
                     <td>{vol[e].gender}</td>
                     <td>{vol[e].type}</td>
                     <td>{vol[e].pword}</td>
                </tr>
            )}
        </tbody>
    </table>
)
}


export default Volunteers