import React,{useEffect} from 'react';
import {Route,Routes} from 'react-router-dom';
import {Login,Home,Publics,FAQ,Services,DetailProduct,Blogs,Products,FinalRegister,ResetPassword} from './pages/public';
import path from './ultils/path';
import {getCategories} from './store/app/asyncActions';
import {useDispatch, useSelector} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './components';
import { AdminLayout,ManageOrder,ManageProduct,CreateProduct,Dashboard,ManageUser } from './pages/admin';
import { MenberLayout,PersonalInformation } from './pages/private';
function App() {
  const dispatch = useDispatch();
  const {isShowModal,modalChildren} = useSelector(state => state.app)
  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch])
  return (
    <div className="min-h-screen font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Publics/>}>
          <Route path={path.HOME} element={<Home/>}/>
          <Route path={path.BLOGS} element={<Blogs/>}/>
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID_TITLE} element={<DetailProduct/>}/>
          <Route path={path.FAQ} element={<FAQ/>}/>
          <Route path={path.OUR_SERVICES} element={<Services/>}/>
          <Route path={path.PRODUCTS} element={<Products/>}/>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword/>}/>
          <Route path={path.ALL} element={<Home/>}/>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout/>}>
          <Route path={path.DASHBOARD} element={<Dashboard/>}/>
          <Route path={path.MANAGE_ORDER} element={<ManageOrder/>}/>
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct/>}/>
          <Route path={path.MANAGE_USER} element={<ManageUser/>}/>
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct/>}/>
          <Route/>
          <Route/>
        </Route>
        <Route path={path.MENBER} element={<MenberLayout/>}>
          <Route path={path.PERSONAL} element={<PersonalInformation/>}/>
        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister/>}/>
        <Route path={path.LOGIN} element={<Login/>}/>
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
