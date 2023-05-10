import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Child components
const ImageGallery = () => (
   <div>Image Gallery</div>
);

const ProductInformation = () => (
  <div>Product Information</div>
);

const StyleSelector = () => (
  <div>Style Selector</div>
);

const AddToCart = () => (
  <div>Add To Cart</div>
);

const Overview = () => (
  <div>
    <h1>Overview</h1>
    <ImageGallery />
    <ProductInformation />
    <StyleSelector />
    <AddToCart />
  </div>
);

export default Overview;
