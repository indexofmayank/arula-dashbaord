import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  AdminsPage,
  Dashboard,
  LoginPage,
  OrdersPage,
  PrivateRoute,
  ProductsPage,
  SingleOrderPage,
  SingleProductPage,
  CoursePage,
  CategoryPage,
  CourseCategoryPage,
  UserPage
  
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/orders'>
          <OrdersPage />
        </PrivateRoute>
        <PrivateRoute exact path='/orders/:id'>
          <SingleOrderPage />
        </PrivateRoute>
        <PrivateRoute exact path='/product'>
          <ProductsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/product/:id'>
          <SingleProductPage />
        </PrivateRoute>
        <PrivateRoute exact path="/product-category">
          <CategoryPage />
        </PrivateRoute>
        <PrivateRoute exact path="/course-category">
          <CourseCategoryPage />
        </PrivateRoute>
        <PrivateRoute exact path="/user">
          <UserPage />
        </PrivateRoute>
        <PrivateRoute exact path='/admins'>
          <AdminsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/course'>
          <CoursePage />
        </PrivateRoute>
        <PrivateRoute exact path='/login'>
          <LoginPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
