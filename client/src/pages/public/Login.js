import React,{useState,useCallback, useEffect} from 'react'
import {InputField,Button ,Loading} from '../../components/index';
import { apiRegister,apiLogin,apiForgotPassword,apiFinalRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { useNavigate,Link } from 'react-router-dom';
import path from '../../ultils/path';
import {login} from '../../store/user/userSlice';
import {useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from '../../ultils/helpers';
import { showModal } from '../../store/app/appSlice'
const Login = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [payload,setPayload] = useState({
    email: '',
    password :'',
    firstName :'',
    lastName : '',
    phoneNumber : '',
  })

  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: '',
      password :'',
      firstName :'',
      lastName : '',
      phoneNumber : '',
    })
  }

  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const handlForgotPassword = async()=>{
    const response = await apiForgotPassword({email})
    if(response.success){
      toast.success(response.mes,{theme:'colored'})
    }
    else toast.info(response.mes,{theme:'colored'})
  }

  useEffect(()=>{
    resetPayload()
  },[isRegister])

  const handleSubmit = useCallback(async()=>{
    const {firstName,lastName,phoneNumber,...data} = payload;

    const invalids = isRegister ? validate(payload,setInvalidFields) : validate(data,setInvalidFields)

    if(invalids === 0) {
      if(isRegister){
        dispath(showModal({isShowModal : true,modalChildren:<Loading/>}))
        const response = await apiRegister(payload);
        dispath(showModal({isShowModal : false,modalChildren:null}))
        if(response.success){
          setIsVerifiedEmail(true);
        }else{
          Swal.fire(response.success ? 'Đăng ký thất bại' : 'Oops!' ,response.mes,'error')
        }
      }
      else{
        const rs = await apiLogin(data);
        if(rs.success){
          dispath(login({isLoggedIn : true, token : rs.accessToken,userData : rs.userData}));
          navigate(`/${path.HOME}`)
        }
        else{
          Swal.fire(rs.success ? 'Đăng ký thất bại' : 'Oops!' ,rs.mes,'error')
        }
      }
    }
    else{

    }
  },[payload,isRegister,navigate,dispath])

  const finalRegister = async() =>{
    const response = await apiFinalRegister(token)
    console.log(response);
    if(response.success){
          Swal.fire(response.success ? 'Đăng ký thành công' : 'Không được để trống',response.mes,'success').then(()=>{
              setIsRegister(false);
              resetPayload();
          })
    }else{
      Swal.fire('Oops!' ,response.mes,'error')
    }
    setIsVerifiedEmail(false);
    setToken('')
  }

  return (
    <div className='w-screen h-screen relative'>
      {isVerifiedEmail && 
      <div className='absolute top-0 left-0 bottom-0 right-0 bg-overlay z-50 flex flex-col items-center justify-center'>
      <div className='bg-main w-[500px] rounded-md p-8'>
        <h4 className=''>chúng tôi đã gửi mã vào email của bạn. Vui lòng kiểm tra email và nhập mã của bạn</h4>
        <input
          type='text'
          value={token}
          onChange={e => setToken(e.target.value)}
          className='p-2 border rounded-md'
        />
        <button
          type='button'
          className='px-4 py-2 bg-blue-500 font-semibold text-white ml-4'
          onClick={finalRegister}
        >
          Xác nhận
        </button>
      </div>
    </div>
      }
      {isForgotPassword &&
      <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50 '>
      <div className='flex flex-col gap-4'>
        <label htmlFor='email'>Enter your email :</label>
        <input
          type='text'
          id='email'
          className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
          placeholder='Exp : email@gmail.com'
          value={email}
          onChange={ e => setEmail(e.target.value)}
        />
        <div className='flex items-center justify-between w-full'>
          <Button handlOnclick={() => setIsForgotPassword(false)}>Thoát</Button>
          <Button 
           handlOnclick={handlForgotPassword}
           style = {`px-4 py-2 rounded-md text-white my-2 bg-blue-500 text-semibold`}
          >Gửi</Button>
        </div>
      </div>
    </div>
      }
      <img src='https://i.pinimg.com/originals/40/00/bd/4000bd388ff1bb3043eb0c6633b03012.jpg'
       alt=''
       className='w-full h-full object-cover'
       />
       <div className='absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center'>
          <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
          <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h1>
          {isRegister &&
          <div>
            <div className='flex items-center gap-2'>
            <InputField
            value={payload.firstName}
            setValue={setPayload}
            nameKey='firstName'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            />
             <InputField
            value={payload.lastName}
            setValue={setPayload}
            nameKey='lastName'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            />
          </div>
          <div>
            <InputField
            value={payload.phoneNumber}
            setValue={setPayload}
            nameKey='phoneNumber'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            />
          </div>
          </div>
          }
          <InputField
          value={payload.email}
          setValue={setPayload}
          nameKey='email'
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          />
          <InputField
          value={payload.password}
          setValue={setPayload}
          nameKey='password'
          type='password'
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          />
          <Button 
          handlOnclick={handleSubmit}
          fw
          >{isRegister ? 'Đăng ký' : 'Đăng nhập'}</Button>
          <div className='flex items-center justify-between my-2 w-full text-sm'>
            {!isRegister && <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 hover:underline cursor-pointer'>Quên mật khẩu</span>}
            {!isRegister && 
            <span
            className='text-blue-500 hover:underline cursor-pointer'
            onClick={() => setIsRegister(true)}
            >Đăng ký</span>
            }
            {isRegister && 
            <span
            className='text-blue-500 hover:underline cursor-pointer w-full text-center'
            onClick={() => setIsRegister(false)}
            >Đăng nhập</span>
            }
          </div>
          <Link className='text-blue-500 text-sm hover:underline cursor-pointer w-full text-center' to={`/${path.HOME}`}>Trang Chủ</Link>
          </div>
       </div>
    </div>
  )
}

export default Login