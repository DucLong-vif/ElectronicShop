import React,{useState,useEffect,memo} from 'react';
import icons from '../ultils/icons';
import { apiGetProduct } from '../apis/product';
import {renderStarFromNumber,formatMoney,secondsTohHms} from '../ultils/helpers';
import {Countdown} from './'
import moment from 'moment'

const {AiFillStar,GiHamburgerMenu} = icons;
let idInterval
const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [exprireTime, setExprireTime] = useState(false)
    const fetchDealDaily = async ()=>{
        const response = await apiGetProduct({limit : 1, page : Math.round(Math.random()*10 + 1), totalRatings : 5});
        if(response.success){
            setDealDaily(response.products[0]);

            const today = `${moment().format('MM/DD/YYYY')} 5:00:00`;
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
            const number = secondsTohHms(seconds)
            setHours(number.h)
            setMinutes(number.m)
            setSeconds(number.s)
        }
        else{
            setHours(0)
            setMinutes(60)
            setSeconds(60)
        }
    }

    useEffect(()=>{
        idInterval && clearInterval(idInterval);
        fetchDealDaily()
    },[exprireTime])

    useEffect(()=>{
        idInterval = setInterval(()=>{
            if(seconds > 0) setSeconds(prev => prev - 1)
            else{
                if(minutes > 0) {
                    setMinutes(prev => prev - 1)
                    setSeconds(60)
                }
                else{
                    if(hours > 0) {
                        setHours(prev => prev - 1)
                        setMinutes(59);
                        setSeconds(60);
                    }
                    else{
                        setExprireTime(!exprireTime)
                    }
                }
            }
        },1000)
        return () =>{
            clearInterval(idInterval)
        }
    },[seconds, minutes, hours, exprireTime])

  return (
    <div className='border w-full flex-auto'>
        <div className='flex items-center justify-between p-4 w-full'>
            <span className='flex-1 flex justify-center'><AiFillStar size={20} color='#DD1111'/></span>
            <span className='flex-8 font-semibold text-[20px] flex justify-center text-gray-600'>DEAL DAILY</span>
            <span className='flex-1'></span>
        </div>
        <div className='w-full flex flex-col items-center gap-2 pt-8 px-4'>
            <img src={dealDaily?.thumb || 'long'} alt='' className='w-full object-contain'/>
            <span className='line-clamp-1'>{dealDaily?.title}</span>
            <span className='flex h-4 text-center'>
                {renderStarFromNumber(dealDaily?.totalRatings,20)?.map((el,index)=>(
                    <span key={index}>{el}</span>
                ))}
            </span>
            <span>{`${formatMoney(dealDaily?.price)} VND`}</span>
        </div>
        <div className='px-4 mt-8'>
            <div className='flex justify-center gap-2 items-center mb-4'>
                <Countdown unit={'Hours'} number={hours}/>
                <Countdown unit={'Minutes'} number={minutes}/>
                <Countdown unit={'Seconds'} number={seconds}/>
            </div>
            <button 
            type='button' 
            className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'>
                <GiHamburgerMenu/>
                <span>Options</span>
            </button>
        </div>
    </div>
  )
}

export default memo(DealDaily)