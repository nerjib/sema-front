import React, {useState} from 'react'
import axios from 'axios';
//import BrowserHistory from 


const CategoryFollowup =({match})=>{
const [phone, setPhone]=useState('')
const [users, setUsers]= useState('')
const [userSelect, setUserselect]= useState('')
const [category, setCategory]= useState('close')
const [closeddate, setCloseddate]= useState('')


const categorytype=['close','rejected']

const onchangePhone = (e) =>{
    const { value, name } = e.target;
    setPhone(value)
    axios.get(`https://kd-sema.herokuapp.com/api/v1/users/searchuser/${value}`)
    .then(res=>{
        setUsers(res.data)
    }).catch(e=>{console.log(e)})

}

const changeCategory =(e)=>{
    const {value}=e.target

  
    setCategory(value)
}
const update=()=>{
    const data ={
        rid : match.params.id,
        category,
        date: closeddate
    }
    axios.put('https://kd-sema.herokuapp.com/api/v1/reports/updatecategory',data)
    .then(res=>{
        alert('updated')
    }).catch(e=>{alert(e)})
}
    return(
        <div>
            <input type='text' onChange={onchangePhone} value={phone}/>
            {users.length}
            {userSelect}
            <select className='form-control' id='title' name='title' onChange={changeCategory}>
                    {categorytype.map((e,i)=>
                        <option value={e}>{e}</option>
                      )}
                    </select> 
                    <button onClick={update}>Update{closeddate}</button>
        </div>
    )

}

export default CategoryFollowup