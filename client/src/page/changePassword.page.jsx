import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
// import { AuthContext } from '../contexts/AuthContext'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../contexts/constants';
import setAuthToken from "../utils/setAuthToken";


const initialState = {
    password: '',
    error: '',
    success: ''
}

function ChangePassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()
    console.log(useParams())
    const {password, error, success} = data

    const handleChangeInput = event => {
        const {value} = event.target
        setData({...data, error: '', success: ''})
    }


    const handleChangePass = async () => {
        // if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        //    token =  setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        // }
        console.log(token)

        try {
            const res = await axios.post('/auth/change-password', {Authorization: {token}}, {password})

            return setData({...data, error: "", success: res.data.message})

        } catch (error) {
            error.response.data.message && setData({...data, error: error.response.data.message, success: ''})
        }
        
    }

    return (
        <div className=''>
            <h2>Change Your Password</h2>

            <div className=''>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password}
                onChange={handleChangeInput} />

                <button onClick={handleChangePass}>Change Password</button>
            </div>
        </div>
    )
}

export default ChangePassword
