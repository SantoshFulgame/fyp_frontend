


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.find((el) => el._id === filterby);
  const [showMoreSafetyDetails, setShowMoreSafetyDetails] = useState(false);

  const handleAddCartProduct = () => {
    if (productDisplay) {
      dispatch(addCartItem(productDisplay));
    }
  };

  const handleBuy = () => {
    if (productDisplay) {
      dispatch(addCartItem(productDisplay));
      navigate("/cart");
    }
  };

  const SafetyDetailsCard = () => {
    const initialSafetyDetails = [
      "Review service descriptions and terms to understand what's included.",
      "Check for any specific requirements or preparations needed before the service.",
    ];

    const additionalSafetyDetails = [
      "Consider any potential allergies or sensitivities when selecting services.",
      "Communicate any special requests or concerns to the service provider in advance.",
    ];

    const allSafetyDetails = [...initialSafetyDetails, ...additionalSafetyDetails];

    const toggleSafetyDetails = () => {
      setShowMoreSafetyDetails(!showMoreSafetyDetails);
    };

    return (
      <div className="relative max-w-full bg-white overflow-hidden shadow-md rounded-2xl p-4 mb-3">
        <h3 className="text-gray-500 font-semibold text-xl mb-3">Additional Details and Precautions</h3>
        <ul className="list-disc pl-5">
          {showMoreSafetyDetails
            ? allSafetyDetails.map((detail, index) => <li key={index}>{detail}</li>)
            : initialSafetyDetails.map((detail, index) => <li key={index}>{detail}</li>)}
        </ul>
        {!showMoreSafetyDetails && (
          <button onClick={toggleSafetyDetails} className="text-blue-500 mt-2 hover:underline focus:outline-none">
            Read More
          </button>
        )}
      </div>
    );
  };

  const SCPromiseCard = () => {
    return (
      <div className="relative max-w-full bg-white overflow-hidden shadow-md rounded-2xl p-4 mb-5">
        <span className="absolute top-0 right-0 bg-blue-500 text-white py-3 px-5 rounded-bl-2xl z-10">
          SC
        </span>
        <div className="flex items-center mb-2">
          <span className="text-gray-500 font-semibold">SC Promise</span>
        </div>
        <ul className="list-disc pl-5">
          <li className="flex items-center">
            <span className="text-blue-500">&#10003;</span>
            <span className="ml-3">Verified Professionals</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-500">&#10003;</span>
            <span className="ml-3">Hassle Free Booking</span>
          </li>
          <li className="flex items-center">
            <span className="text-blue-500">&#10003;</span>
            <span className="ml-3">Transparent Pricing</span>
          </li>
        </ul>
      </div>
    );
  };

  const CancellationPolicyCard = () => {
    return (
      <div className="relative max-w-full bg-white overflow-hidden shadow-md rounded-2xl p-4 mb-5">
        <h3 className="text-gray-500 font-semibold text-xl mb-3">Cancellation Policy</h3>
        <p>Services can be cancelled up to <strong>ONE DAY</strong> before the scheduled appointment without incurring any fees.</p>
      </div>
    );
  };
  

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        {productDisplay && (
          <>
            <div className="w-full md:w-1/4">
              <SCPromiseCard />
              <SafetyDetailsCard />
              <CancellationPolicyCard />
            </div>
            <div className="w-full md:w-3/4 md:ml-4">
              <div className="max-w-sm bg-white overflow-hidden shadow-md rounded-lg p-4">
                <img
                  src={productDisplay.image}
                  alt={productDisplay.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-800 font-semibold text-xl">{productDisplay.name}</h3>
                  <p className="text-gray-600">{productDisplay.category}</p>
                  <p className="text-gray-700 font-bold">₹{productDisplay.price}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleBuy}
                      className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px] focus:outline-none"
                    >
                      Buy
                    </button>
                    <button
                      onClick={handleAddCartProduct}
                      className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px] focus:outline-none"
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-4">
                <p className="text-slate-600 font-medium text-2xl mb-2">Description:</p>
                <div className="text-slate-700 pr-8">
                  {productDisplay.description.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
