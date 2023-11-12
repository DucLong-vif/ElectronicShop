import path from "./path";
import icons from "./icons";
export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "FAQs",
    path: `/${path.FAQ}`,
  },
];

const { BsShieldShaded, BiSolidTruck, AiFillGift, FaReply, FaTty } = icons;

export const productExtraInformation = [
  {
    id: 1,
    title: "Đảm bảo",
    sub: "Đã kiểm tra chất lượng",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Miễn phí vận chuyển",
    sub: "Miễn phí trên tất cả sản phẩm",
    icon: <BiSolidTruck />,
  },
  {
    id: 3,
    title: "Thẻ quà tặng đặc biệt",
    sub: "Thẻ quà tặng đặc biệt",
    icon: <AiFillGift />,
  },
  {
    id: 4,
    title: "Hoàn trả miễn phí",
    sub: "Trong vòng 7 ngày",
    icon: <FaReply />,
  },
  {
    id: 5,
    title: "Tư vấn",
    sub: "Trọn đời 24/7/356",
    icon: <FaTty />,
  },
];

export const productInfoTabs = [
  {
    id: 1,
    name: "Miêu Tả",
    content: `Technology: GSM / HSPA / LTE
        Dimensions: 153.8 x 75.5 x 7.6 mm
        Weight: 154 g
        Display: IPS LCD 5.5 inches
        Resolution: 720 x 1280
        OS: Android OS, v6.0 (Marshmallow)
        Chipset: Octa-core
        CPU: Octa-core
        Internal: 32 GB, 4 GB RAM
        Camera: 13MB - 20 MP`,
  },
  {
    id: 2,
    name: "Bảo Đảm",
    content: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    name: "Vận Chuyển",
    content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
  {
    id: 4,
    name: "Thanh Toán",
    content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  }
];


export const colors = [
  'black',
  'brown',
  'gray',
  'white',
  'pink',
  'yellow',
  'orange',
  'purple',
  'green',
  'blue'
]

export const sorts = [
  {
    id : 1,
    value : '-sold',
    text : 'Bán chạy nhất'
  },
  {
    id : 2,
    value : 'title',
    text : 'Theo bảng chữ cái, A-Z'
  },
  {
    id : 3,
    value : '-title',
    text : 'Theo bảng chữ cái, Z-A'
  },
  {
    id : 4,
    value : 'price',
    text : 'Giá từ thấp đến cao'
  },
  {
    id : 5,
    value : '-price',
    text : 'Giá từ cao đến thấp'
  },
  {
    id : 6,
    value : '-createdAt',
    text : 'Ngày, mới đến cũ'
  },
  {
    id : 7,
    value : 'createdAt',
    text : 'Ngày, cũ đến mới'
  },
  
]

export const voteOptions = [
  {
    id : 1,
    text : 'Rất tệ'
  },
  {
    id : 2,
    text : 'Tệ'
  },
  {
    id : 3,
    text : 'Bình thường'
  },
  {
    id : 4,
    text : 'Tốt'
  },
  {
    id : 5,
    text : 'Tuyệt vời'
  },
]

const {AiOutlineDashboard, MdGroups2 , FaProductHunt, FaFirstOrder} = icons;
export const adminSidebar = [
  {
    id : 1,
    type : 'SINGLE',
    text : 'Thống kê',
    path : `/${path.ADMIN}/${path.DASHBOARD}`,
    icon : <AiOutlineDashboard size={20}/>
  },
  {
    id : 2,
    type : 'SINGLE',
    text : 'Quản lý người dùng',
    path : `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon : <MdGroups2 size={20}/>
  },
  {
    id : 3,
    type : 'PARENT',
    text : 'Quản lý sản phẩm',
    icon : <FaProductHunt size={20}/>,
    submenu : [
      {
        text : 'Tạo sản phẩm',
        path : `/${path.ADMIN}/${path.CREATE_PRODUCT}`
      },
      {
        text : 'Quản lý sản phẩm',
        path : `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
      },
    ]
  },
  {
    id : 4,
    type : 'SINGLE',
    text : 'Quản lý giỏ hàng',
    path : `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon : <FaFirstOrder size={20}/>
  },
]


export const roles = [
  {
    code: 1978,
    value:'Admin' 
},
{
    code: 2000,
    value:'User' 
},
]

export const blockStatus = [
  {
    code: true,
    value:'Blocked' 
},
{
    code: false,
    value:'Active' 
},
]