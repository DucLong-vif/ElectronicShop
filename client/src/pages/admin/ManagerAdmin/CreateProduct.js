import React,{useState, useCallback, useEffect} from 'react'
import {useForm} from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Select , Button, Markdown} from '../../../components'
import { validate, fileToBase64 } from '../../../ultils/helpers';
import { toast } from 'react-toastify';
import { IoTrashBinOutline } from 'react-icons/io5';
import { apiCreateProduct } from '../../../apis'
const CreateProduct = () => {
  const { register, handleSubmit, formState: { errors },watch,reset } = useForm();
  const {categories} = useSelector(state => state.app)
  const [preview, setPreview] = useState({
    thumb : '',
    images : []
  })
  const [payload, setPayload] = useState({
    description : ''
  })
  const [invalidFields, setInvalidFields] = useState([])
  const [hoverEl, setHoverEl] = useState(null)
  const changeValue = useCallback((e) => {
    setPayload(e)
  },[payload,setPayload])

  const handlePriviewThumb = async (file) =>{
    const base64Thumb = await fileToBase64(file);
    setPreview(prev => ({...prev,thumb : base64Thumb}))
  }
  const handlePriviewImage = async (files) => {
    const imagesPreview = [];
    for(let file of files){
      if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
        toast.warning('file này không được hỗ trợ');
        return;
      }
      else{
        const base64 = await fileToBase64(file);
        imagesPreview.push({name : file.name, path : base64})
      }
    }
    setPreview(prev => ({...prev,images : imagesPreview}))
  }
  const handleRemoveImage = (name) =>{
    if(preview.images?.some(el => el.name === name)) setPreview(prev => ({...prev,images : prev.images?.filter(el => el.name !== name)}))
  }
  useEffect(() => {
    handlePriviewThumb(watch('thumb')[0])
  },[watch('thumb')])
  useEffect(() => {
    handlePriviewImage(watch('images'))
  },[watch('images')])
  const handleCreateProduct = async (data) => {
    const invalids = validate(payload,setInvalidFields)
    if(invalids === 0){
      if(data.category) data.category = categories?.find(el => el._id === data.category)?.title;
      const finalPayload = {...data, ...payload};
      const formData = new FormData();
      for(let i of Object.entries(finalPayload)) formData.append(i[0],i[1]);
      if(finalPayload.thumb) formData.append('thumb',finalPayload.thumb[0]);
      if(finalPayload.images){
        for(let image of finalPayload.images) formData.append('images',image);
      }
      const response = await apiCreateProduct(formData);
    }
  }
    
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Tạo sản phẩm mới</span>
      </h1>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <div className='flex flex-col'>
            <span>Tên sản phẩm</span>
            <input
              className='my-2 text-gray-950' 
              type="text" 
              placeholder="Tên của sản phẩm mới" 
              {...register("title", {required: 'Không được để trống', maxLength: 80})} 
            />
          </div>
          <div className='flex gap-4 w-full'>
            <div className='flex flex-col w-full'>
              <span>Giá sản phẩm</span>
              <input
                className='my-2 text-gray-950' 
                type="number" 
                placeholder="Giá của sản phẩm mới" 
                {...register("price", {required: 'Không được để trống'})} 
              />
            </div>
            <div className='flex flex-col w-full'>
              <span>Số lượng sản phẩm</span>
              <input
                className='my-2 text-gray-950' 
                type="number" 
                placeholder="Số lượng của sản phẩm mới" 
                {...register("quantity", {required: 'Không được để trống'})} 
              />
            </div>
            <div className='flex flex-col w-full'>
              <span>Màu sản phẩm</span>
              <input
                className='my-2 text-gray-950' 
                type="text" 
                placeholder="Màu của sản phẩm mới" 
                {...register("color", {required: 'Không được để trống'})} 
              />
            </div>
          </div>




          {/* <div className='flex gap-4 w-full '>
            <div className='flex flex-col my-2 w-full'>
              <label htmlFor='id'>Danh mục</label>
              <select className='my-2 text-gray-900' {...register("title", { required: true })}>
                <option value="">---Chọn---</option>
                {categories?.map(el => (
                  <option value={el._id}>{el.title}</option>
                ))}
              </select>
              <Select
                lable='Brand'
                options={categories?.find(el => el._id === watch('category'))?.map(el =>({code:el,value:el}))}
                register={register}
                id='brand'
                validate={{required : true}}
                style={`flex-auto`}
                errors={errors}
                fullWidth
              />
            </div>
            <div className='flex flex-col my-2 w-full'>
              <label htmlFor='id'>Danh mục nhãn hiệu</label>
              <select className='my-2 text-gray-900' {...register("brand", { required: true })}>
              <option value="">---Chọn---</option>
               {categories?.find(el => el._id === watch('category'))?.brand?.map(el => (
                <option value={el}>{el.brand}</option>
               ))}
              </select>
            </div>    
          </div> */}
          <div className='w-full flex my-4 gap-4'>
            <Select
              lable='Category'
              options={categories?.map(el => ({code:el._id,value:el.title}))}
              register={register}
              id='category'
              validate={{required:'Không được để trống'}}
              style={`flex-auto`}
              errors={errors}
              fullWidth
            />
            <Select
              lable='Brand'
              options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({code:el,value:el}))}
              register={register}
              id='brand'
              validate={{required:'Không được để trống'}}
              style={`flex-auto`}
              errors={errors}
              fullWidth
            />
          </div>

          <Markdown
            name='description'
            changeValue={changeValue}
            labe='Mô tả'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <div className='flex flex-col gap-2 mt-4'>
            <label className='font-semibold' htmlFor='thumb'>Upload ảnh chính sản phẩm</label>
            <input
              type='file'
              id='thumb'
              {...register('thumb',{required:'Không được để trống'})}
            />
            {errors['thumb'] && <span className='text-main text-xs'>{errors['thumb']?.message}</span>}
          </div>
          {preview.thumb && 
            <div className='my-4'>
              <img src={preview.thumb} alt='thumbnall' className='w-[200px] object-cover'/>
            </div>
          }
          <div className='flex flex-col gap-2 mt-4'>
            <label className='font-semibold' htmlFor='products'>Upload ảnh chi tiết sản phẩm</label>
            <input
              type='file'
              id='products'
              multiple
              {...register('images',{required:'Không được để trống'})}
            />
            {errors['products'] && <span className='text-main text-xs'>{errors['products']?.message}</span>}
          </div>
          {preview.images.length > 0 && 
            <div className='my-4 flex gap-2 w-full flex-wrap'>
              {preview.images?.map((el,index) => (
                <div 
                  onMouseEnter={() => setHoverEl(el.name)}
                  key={index}
                  className='w-fit relative'
                  onMouseLeave={() => setHoverEl(null)}
                  
                >
                  <img src={el.path} alt='product' className='w-[200px] object-cover'/>
                  {hoverEl === el.name &&
                    <div 
                      className='absolute inset-0 animate-scale-up-center cursor-pointer bg-overlay flex items-center justify-center'
                      onClick={() => handleRemoveImage(el.name)}
                    >
                        <IoTrashBinOutline size={24} color='while'/>
                    </div>
                  }
                </div>
              ))}
            </div>
          }
          <div className='my-4'>
            <Button type='submit'>
              Taọ sản phẩm mới
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct