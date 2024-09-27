import React from 'react';
import {
  FaHome,
  FaProductHunt,
  FaShoppingCart,
  FaUserTie,
  FaPhotoVideo,
  FaTh,
  FaFileVideo,
  FaRocketchat,
  FaBlenderPhone,
  FaUser
} from 'react-icons/fa';

export const LinkItems = [
  { name: 'Home', url: '/', icon: <FaHome /> },
  { name: 'Product', url: '/product', icon: <FaProductHunt /> },
  { name: 'Orders', url: '/orders', icon: <FaShoppingCart /> },
  { name: 'Admins', url: '/admins', icon: <FaUserTie /> },
  { name: 'Course', url: '/course', icon: <FaPhotoVideo />},
  { name: 'Product Category', url: '/product-category', icon: <FaTh />},
  { name: 'Course Category', url: '/course-category', icon: <FaFileVideo />},
  { name: 'Consultation Category', url: '/consultation-category', icon: <FaRocketchat />},
  { name: 'Bookings', url: '/bookings', icon: <FaBlenderPhone />},
  { name: 'Users', url: '/users', icon: <FaUser />}
];

export const orderStatusList = [
  { name: 'Reject', value: 'rejected' },
  { name: 'Processing', value: 'processing' },
  { name: 'Confirmed', value: 'confirmed' },
  { name: 'Shipped', value: 'shipped' },
  { name: 'Delivered', value: 'delivered' },
];

export const domain = process.env.REACT_APP_BACKEND_HOST;
export const auth_url = `${domain}/api/admin/auth`;
export const login_url = `${domain}/api/admin/login`;
export const register_url = `${domain}/api/admin/register`;
export const logout_url = `${domain}/api/admin/logout`;
export const orders_url = `${domain}/api/admin/orders`;
export const update_product_url = `${domain}/api/admin/product/`;
export const products_url = `${domain}/api/products/`;
export const admins_url = `${domain}/api/admin/users/`;
export const single_order_url = `${domain}/api/orders/`;
export const update_order_status = `${domain}/api/admin/order/`;
export const create_new_product = `${domain}/api/admin/product/new`;
export const delete_review = `${domain}/api/admin/product/review/`;
export const productCategory_url = `${domain}/api/productcategory/`;
export const productCategoryTable_url = `${domain}/api/productcategory/table/`;
export const courseCategory_url = `${domain}/api/coursecategory/`;
export const course_url = `${domain}/api/course/`;
export const courseForTable_url = `${domain}/api/course/table/`;
export const createConsultation_url = `${domain}/api/consultationcategory/`;
export const consultationForTable_url = `${domain}/api/consultationcategory/table/`;
export const dropdownForProductCategory_url = `${domain}/api/productcategory/dropdown/name`;
export const deleteCourse_url = `${domain}/api/course/`;
export const dropdownForCourCategory = `${domain}/api/coursecategory/dropdown/name`;
