import React from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import Saucer from "../components/Saucer";

const Menu = () => {
  // State for Saucers
  const [saucers, setSaucers] = React.useState([]);

  // Get from the database in real time
  React.useEffect(() => {
    const getSaucer = () => {
      firestore().collection("products").onSnapshot(handleSnapshot);
    };
    getSaucer();
  }, []);

  function handleSnapshot(snapshot) {
    const saucers = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setSaucers(saucers);
  }

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/new-saucer"
        className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Add Saucer
      </Link>

      {saucers.map((saucer) => (
        <Saucer key={saucer.id} product={saucer} />
      ))}
    </>
  );
};

export default Menu;
