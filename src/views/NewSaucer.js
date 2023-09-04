import React from "react";
// import { db, storageRef } from "../firebase";
import { firestore, storage } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

const NewSaucer = () => {
  // Image state
  const [upload, setUpload] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [urlimage, setUrlimage] = React.useState("");

  // Navigate
  const navigate = useNavigate();

  // validation and read form data
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Saucers must contain at least 3 characters")
        .required("Name is required"),
      price: Yup.number()
        .min(1, "You must add a number")
        .required("Price is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string()
        .min(10, "The description should be longer")
        .required("Description is required"),
    }),
    onSubmit: async (e) => {
      try {
        e.existence = "Available";
        e.image = urlimage;
        firestore().collection("products").add(e);
        // await addDoc(collection(db, "saucers"), e);

        // Redirect
        navigate("/menu");
      } catch (error) {
        console.log(error);
      }

      console.log(e);
    },
  });

  // Image Functions
  const handleUploadStart = () => {
    setUpload(true);
    setProgress(0);
  };
  const handleUploadError = (error) => {
    setUpload(false);
    console.log(error);
  };
  const handleUploadSuccess = async (filename) => {
    setProgress(100);
    setUpload(false);

    const url = await storage()
      .ref("products")
      .child(filename)
      .getDownloadURL();
    console.log(url);
    setUrlimage(url);
  };
  const handleProgress = (progress) => {
    setProgress(progress);
    console.log(progress);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">New Saucer</h1>
      <div className="flex justify-center mt-4">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-none focus:border-blue-500 focus:ring"
                type="text"
                placeholder="Name Saucer"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-none focus:border-blue-500 focus:ring"
                type="number"
                placeholder="$50"
                min={0}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                value={formik.values.category}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-none focus:border-blue-500 focus:ring"
              >
                <option value="">-- Select --</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="drinks">Drinks</option>
                <option value="desserts">Desserts</option>
                <option value="salads">Salads</option>
              </select>
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{formik.errors.category}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={storage().ref("products")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />

              {upload && (
                <div className="h-12 relative w-full border">
                  <div
                    className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                    style={{ width: `${progress}%` }}
                  >
                    {progress} %
                  </div>
                </div>
              )}

              {urlimage && (
                <p className="bg-green-500 text-white p-3 text-center my-5">
                  The image was uploaded correctly
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                className="shadow appearance-none h-40 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-none focus:border-blue-500 focus:ring"
                placeholder="Description of Saucer"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full text-white mt-4 p-2 uppercase font-bold"
              value="Add Saucer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSaucer;
