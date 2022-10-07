import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import './App.css';
import ProductDetails from './components/products/product-details';
import ProductsContainer from './components/products/product-container';
import AddProductPage from './components/products/product-add';
import EditProductPage from './components/products/product-edit';
import { ProductContextProvider } from './context/ProductContext';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <ProductContextProvider>
       <Routes>
         <Route path="/" element={<ProductsContainer />}>
      </Route>
         <Route path="/product/:id"  element={<ProductDetails />} />
         <Route path="/add-product/"  element={<AddProductPage/>} />
         <Route path="/edit-product/:id"  element={<EditProductPage/>} />
    </Routes>
    </ProductContextProvider>
  </BrowserRouter>
  )
}

export default App;
