import React,{useEffect, useState } from 'react'
import { apiGetUsers } from '../../../apis/user';
import { roles } from '../../../ultils/contants';
import moment from 'moment';
import { InputField,Pagination, InputForm, Button } from '../../../components';
import useDebounce from '../../../Hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const ManageUser = () => {
  const {handleSubmit,register, formState:{errors}} = useForm({
    email : '',
    firstName : '',
    lastName : '',
    role : '',
    phoneNumber : '',
    isBlocked : ''
  });
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q : ""
  })
  const [edit, setEdit] = useState(null);
  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response  = await apiGetUsers({...params,limit : process.env.REACT_APP_PRODUCT_LIMIT})
    if(response.success) setUsers(response)
  }
  const queriesDebounce = useDebounce(queries.q,2000)
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if(queriesDebounce) queries.q = queriesDebounce
    fetchUsers(queries);  
  },[queriesDebounce,params]);

  const handleUpdate = (data) => {
    console.log(data);
  }
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Quản lý người dùng</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4'>
          <InputField
            nameKey={'q'}
            value={queries.q}
            setValue={setQueries}
            style={`text-gray-800`}
            placeholder='Tìm Kiếm người dùng...'
            isHideLable
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {edit && <Button type='submit'>Submit</Button>}
        <table className='table-auto mb-6 text-left w-full'>
          <thead className='font-bold text-gray-100 text-sm border text-center'>
            <tr>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Địa chỉ Email</th>
              <th className='px-4 py-2'>Họ</th>
              <th className='px-4 py-2'>tên </th>
              <th className='px-4 py-2'>Role</th>
              <th className='px-4 py-2'>Số điện thoại</th>
              <th className='px-4 py-2'>Trạng thái</th>
              <th className='px-4 py-2'>Ngày tạo</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users?.users?.map((el,index)=> (
              <tr key={el._id} className='border'>
                <td className='px-4 py-2'>{index+1}</td>
                <td className='px-4 py-2'>{
                  edit?._id === el._id ? <InputForm
                    register={register}
                    defaultValue={edit?.email}
                    id={'email'}
                    validate={{
                      require : "Không được để trống",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Địa chỉ email không hợp lệ!"
                      }
                    }}
                    fullWidth
                    errors={errors}
                  /> : <span>{el.email}</span>
                }</td>
                <td className='px-4 py-2'>{
                   edit?._id === el._id ? <InputForm
                    register={register}
                    defaultValue={edit?.firstName}
                    id={'firstName'}
                    validate={{require : "Không được để trống"}}
                    fullWidth
                    errors={errors}
                   /> : <span>{el.firstName}</span>
                }</td>
                <td className='px-4 py-2'>{
                   edit?._id === el._id ? <InputForm
                    register={register}
                    defaultValue={edit?.lastName}
                    id={'lastName'}
                    validate={{require : "Không được để trống"}}
                    fullWidth
                    errors={errors}
                   /> : <span>{el.lastName}</span>
                }</td>
                <td className='px-4 py-2'>{roles.find(role => +role.code === +el.role)?.value}</td>
                <td className='px-4 py-2'>{
                   edit?._id === el._id ? <InputForm
                    register={register}
                    defaultValue={edit?.phoneNumber}
                    id={'phoneNumber'}
                    validate={{require : "Không được để trống"}}
                    fullWidth
                    errors={errors}
                   /> : <span>{el.phoneNumber}</span>
                }</td>
                <td className='px-4 py-2'>{el.isBlocked ? 'Blocked' : 'Active'}</td>
                <td className='px-4 py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                <td className='px-4 py-2'>
                  {edit 
                    ? <span onClick={() => setEdit(null)} className='px-2 text-main hover:underline cursor-pointer'>back</span>
                    : <span onClick={() => setEdit(el)} className='px-2 text-main hover:underline cursor-pointer'>Sửa</span>}
                  <span className='px-2 text-main hover:underline cursor-pointer'>Xóa</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </form>
        <div className='w-full text-right'>
          <Pagination
            totalCount={users?.counts}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageUser