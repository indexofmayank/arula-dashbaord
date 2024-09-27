import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/ThemeConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/user_context';
import { OrderProvider } from './context/order_context';
import { ProductProvider } from './context/product_context';
import { AdminProvider } from './context/admin_context';
import { CourseProvider } from './context/course_context';
import { ProductCategoryProvider } from './context/productCategory_context';
import { CourseCategoryProvider } from './context/courseCategory_context';

ReactDOM.render(
  <UserProvider>
    <AdminProvider>
      <OrderProvider>
        <ProductProvider>
          <CourseProvider>
            <ProductCategoryProvider>
              <CourseCategoryProvider>
                <ChakraProvider theme={theme}>
                  <App />
                </ChakraProvider>
              </CourseCategoryProvider>
            </ProductCategoryProvider>
          </CourseProvider>
        </ProductProvider>
      </OrderProvider>
    </AdminProvider>
  </UserProvider>,
  document.getElementById('root')
);
