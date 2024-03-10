import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ productDetails, isMobile }) => {
  if (!productDetails) {
    return (
       <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Oops!</strong>
        <span className="block sm:inline"> Something went wrong. Unable to display product details.</span>
       </div>
    );
  }

  const {
    _id,
    title,
    category,
    image,
    price,
  } = productDetails;

  return (
    <div className={`lg:w-1/4 md:w-1/2 sm:w-full p-4 ${isMobile ? 'text-gray-600' : ''}`}>
      <Link to={`/product/${_id}`}>
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img
            alt={title}
            className="object-contain object-center w-full h-48"
            src={image}
          />
          <div className="p-6">
            <h3 className={`tracking-widest text-xs text-indigo-500 font-medium title-font ${isMobile ? 'text-gray-600' : ''}`}>
              {category}
            </h3>
            <h2 className={`text-lg text-gray-900 font-medium title-font mb-4 ${isMobile ? 'text-gray-600' : ''}`}>{title}</h2>
            <p className={`leading-relaxed text-base ${isMobile ? 'text-gray-600' : ''}`}>${price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
