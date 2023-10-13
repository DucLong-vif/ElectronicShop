import React, { useEffect } from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import path from '../../ultils/path';
import Swal from 'sweetalert2';
const FinalRegister = () => {
    const {status} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        if(status === 'failed') Swal.fire('Oops!','Đăng ký không thành công','error').then(()=>{
            navigate(`/${path.LOGIN}`)
        })
        if(status === 'success') Swal.fire('Congratulations','Đăng ký thành công.hãy đăng nhập','success').then(()=>{
            navigate(`/${path.LOGIN}`)
        })
    },[navigate,status])
  return (
    <div className='w-screen h-screen bg-gray-400'></div>
  )
}

export default FinalRegister