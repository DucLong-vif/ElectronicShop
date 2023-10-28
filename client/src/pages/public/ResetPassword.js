import React,{useState} from 'react'
import { Button } from '../../components';
import { useParams } from 'react-router-dom';
import { apiResetPassword } from '../../apis';
import { toast } from 'react-toastify';
const ResetPassword = () => {

  const [password, setPassword] = useState('')
  const {token} = useParams();
  const handlResetPassword = async() =>{
    const response = await apiResetPassword({password,token})
    if(response.success){
      toast.success(response.mes,{theme:'colored'})
    }
    else toast.info(response.mes,{theme:'colored'})
  }
  return (
    <div className='animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50 '>
      <div className='flex flex-col gap-4'>
        <label htmlFor='password'>Nhập mật khẩu mới của bạn :</label>
        <input
          type='text'
          id='password'
          className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
          placeholder='nhập mật khẩu mới ở đây'
          value={password}
          onChange={ e => setPassword(e.target.value)}
        />
        <div className='flex items-center justify-between w-full'>
          <Button handlOnclick={handlResetPassword}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword