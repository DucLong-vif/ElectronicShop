import React, { useEffect, useState } from "react";
import { apiGetProduct } from "../apis/product";
import { CustomSlider } from ".";
import bannerOne from '../assets/bannerOne.png';
import bannerTwo from '../assets/bannerTwo.png';
import { getNewProducts } from "../store/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";


const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "news arrivals" },
];

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null);
  const [activedTab, setactivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispath = useDispatch();
  const {newProducts} = useSelector(state => state.products)
  // console.log(newProducts);
  const fetchProducts = async () => {
    const response = await apiGetProduct({ sort: "-sold" })
    if (response.success){
      setBestSeller(response.products);
      setProducts(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispath(getNewProducts());
  }, [dispath]);

  useEffect(()=>{
    if(activedTab === 1) setProducts(bestSeller);
    if(activedTab === 2) setProducts(newProducts);
  },[activedTab])

  return (
    <div>
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-red-600">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase border-r cursor-pointer text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : " "
            }`}
            onClick={() => setactivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <CustomSlider products={products} activedTab={activedTab}/>
      </div>
      <div className="w-full flex gap-4 mt-10">
          <img src={bannerOne} alt="bannerOne" className="flex-1 object-contain" />
          <img src={bannerTwo} alt="bannerOne" className="flex-1 object-contain" />
      </div>
    </div>
  );
};

export default BestSeller;
