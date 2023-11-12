const path = {
    PUBLIC : '/',
    HOME :'',
    ALL :'*',
    LOGIN : 'login',
    PRODUCTS : ':category',
    BLOGS : 'blogs',
    OUR_SERVICES : 'services',
    FAQ : 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID_TITLE : ':category/:pid/:title',
    // DETAIL_PRODUCT : 'san-pham',
    FINAL_REGISTER : 'finalregister/:status',
    RESET_PASSWORD : 'reset-password/:token',

    //admin
    ADMIN: 'admin',
    DASHBOARD: 'thong-ke',
    MANAGE_USER : 'manage-user',
    MANAGE_PRODUCTS : 'manage-products',
    MANAGE_ORDER : 'manage-order',
    CREATE_PRODUCT : 'create-product',

    //menber
    MENBER : 'menber',
    PERSONAL : 'personal',

}

export default path;