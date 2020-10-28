import React, {useState} from 'react'
import axios from 'axios';
//import BrowserHistory from 


const UpdateOid =({match})=>{
const [phone, setPhone]=useState('')
const [users, setUsers]= useState('')
const [userSelect, setUserselect]= useState('')


const onchangePhone = (e) =>{
    const { value, name } = e.target;
    setPhone(value)
    axios.get(`https://kd-sema.herokuapp.com/api/v1/users/searchuser/${value}`)
    .then(res=>{
        setUsers(res.data)
    }).catch(e=>{console.log(e)})

}

const handlechangeUser =(e)=>{
    const {value}=e.target
    setUserselect(value)
}
const update=()=>{
    const data ={
        rid : match.params.id,
        oid: userSelect
    }
    axios.put('https://kd-sema.herokuapp.com/api/v1/reports/oid',data)
    .then(res=>{
        alert('updated')
    }).catch(e=>{alert(e)})
}
    return(
        <div>
            <input type='text' onChange={onchangePhone} value={phone}/>
            {users.length}
            {userSelect}
            <select className='form-control' id='title' name='title' onChange={handlechangeUser}>
                <option >...select</option>
                <option value='Sanitation'>Sanitation</option>
                    {Object.keys(users).map(e=>
                        <option value={users[e].id}>{users[e].first_name}</option>
                    )}
                    </select> 
                    <button onClick={update}>Update</button>
        </div>
    )

}

export default UpdateOid