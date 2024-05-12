import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import Modal from "./Modal";

import menSalonIcon from "../assest/Mensalon.webp";
import repairIcon from "../assest/Repair.webp";
import cleaningIcon from "../assest/Cleaning.webp";
import mostBookedIcon from "../assest/Most Book Service.webp";
import newProductIcon from "../assest/New Product.webp";
import salonForWomen from "../assest/Womensalon.webp"
import image1 from "../assest/image1.webp";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  // State to manage the selected category and filtered products
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to handle category click and filter products
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = productData.filter((el) => el.category.toLowerCase() === category.toLowerCase());
    setFilteredProducts(filtered);
    setShowModal(true);
  };

  // Mapping between category names and their respective icons
  const categoryIcons = {
    "mensalon": menSalonIcon,
    "repair": repairIcon,
    "cleaning": cleaningIcon,
    "Most book service": mostBookedIcon,
    "New Product": newProductIcon,
    "Salon for women": salonForWomen,
  };

  return (
    <div className="flex flex-col md:flex-row mb-6">
      {/* Left side with category icons */}
      <div className="w-full md:w-1/2 pr-4">
        <h2 className="font-bold text-2xl text-slate-800 m-6">{heading}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:my-20">
          {categoryList.map((el) => (
            <div
              key={el}
              className={`flex flex-col items-center cursor-pointer`}
              onClick={() => handleCategoryClick(el)}
            >
              <img src={categoryIcons[el]} alt={el} className="w-12 h-12 mb-2 md:w-20 md:h-20" />
              <p className="text-center">{el}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side with image */}
      <div className="w-full md:w-1/2 pl-4 flex justify-end">
        <div className="w-full md:w-3/4 p-5 md:p-10 flex items-center justify-center">
          <img src={image1} alt="Image1" className="w-full h-auto" />
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <h2 className="font-bold text-xl mt-4 mb-2">Selected Products - {selectedCategory}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {filteredProducts.map((el) => (
              <CardFeature
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                category={el.category}
                price={el.price}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllProduct;
