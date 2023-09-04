import React from "react";
import { firestore } from "../firebase";

const Saucer = ({ product }) => {
  const existenceRef = React.useRef(product.existence);

  const { id, name, image, category, price, description, existence } = product;

  // State of saucers for existe
  const updateAvailability = () => {
    const existence = existenceRef.current.value === "true";

    try {
      firestore().collection("products").doc(id).update({ existence });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={image} alt=" Saucer " />
            <div className="sm:flex sm:-mx-2 pl-2">
              {/* <label className="block sm:w-2/4 mt-5"> */}
              {/* <span className="block text-gray-800 mb-2">Existence</span> */}
              {/* <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-none focus:border-blue-500 focus:ring"
                  value={existence}
                  ref={existenceRef}
                  onChange={() => updateAvailability()}
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select> */}
              {/* </label> */}
              <div className="inline-block  mt-5">
                <button className="bg-green-400 m-2 shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-none hover:bg-green-700">
                  Edit
                </button>
                <button className="bg-red-400 m-2 shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline-none hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
            <p className="text-gray-600 mb-4">
              Category:{" "}
              <span className="text-gray-700 font-bold">
                {category.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-600 mb-4">
              Price: <span className="text-gray-700 font-bold"> ${price}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Existence:{" "}
              <span className="text-gray-700 font-bold"> {existence}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saucer;
