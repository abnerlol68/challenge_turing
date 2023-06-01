import { Link } from "react-router-dom";
import {
  FiLogIn,
  FiUserPlus,
  FiMoreHorizontal,
} from "react-icons/fi";
import { BiStoreAlt } from "react-icons/bi";
import { FcRemoveImage } from "react-icons/fc";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useEffect, useState } from "react";

import Footer from "../../components/Footer";

const URL = import.meta.env.VITE_API;

export default function Landing() {
  const [products, setProducts] = useState(null);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    setShowProducts(false);
    const getProducts = async () => {
      const reqProducts = await fetch(`${URL}get/products`);
      const resProducts = await reqProducts.json();
      const productsList = [];
      resProducts.products.forEach(async (prod) => {
        const reqImgs = await fetch(`${URL}get/products_img/${prod.p_id}`);
        const resImgs = await reqImgs.json();
        const prodObj = { ...prod, p_img: resImgs[0] };
        productsList.push(prodObj);
      });
      setProducts(productsList);
    };
    getProducts();
  }, []);

  return (
    <>
      <button onClick={() => console.log(products)}>prod</button>
      <header className="flex justify-between p-8">
        <div className="">
          <Link to={"/"}>
            <button className="btn btn-neutral gap-3 text-base px-6">
              Market Turing <BiStoreAlt className="text-2xl" />
            </button>
          </Link>
        </div>
        <nav className="flex justify-between gap-6">
          <Link to={"/login"} className="">
            <button className="btn btn-primary gap-2 text-white">
              Log In <FiLogIn className="text-base" />
            </button>
          </Link>
          <Link to={"/signup"} className="">
            <button className="btn btn-secondary gap-2">
              Sign Up <FiUserPlus className="text-base" />
            </button>
          </Link>
        </nav>
      </header>
      <main className="pb-10">
        <section className="bg-neutral text-white pt-16 pb-28 px-8 flex flex-col items-center">
          <h1 className="bg-accent rounded-md text-center text-3xl w-fit py-1 px-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit
          </h1>
          <p className="text-center py-7 px-16">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa est
            consequuntur totam tempora omnis quis natus vitae quisquam
            voluptatum. Odio, cupiditate.
          </p>
          <button className="btn btn-accent text-white">Registrate</button>
        </section>
        <div className="flex gap-8 px-8 relative bottom-16">
          <div className="bg-accent text-white rounded-lg p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eius
            deleniti assumenda vero quo culpa architecto.
          </div>
          <div className="bg-accent text-white rounded-lg p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eius
            deleniti assumenda vero quo culpa architecto.
          </div>
          <div className="bg-accent text-white rounded-lg p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eius
            deleniti assumenda vero quo culpa architecto.
          </div>
        </div>
        <section className="flex flex-col items-center gap-12">
          <h3 className="bg-accent rounded-md text-center text-white text-lg w-fit py-1 px-3">
            Our major products
          </h3>
          {!showProducts ? (
            <button
              className="btn btn-secondary gap-2"
              onClick={() => setShowProducts(true)}>
              Show products
            </button>
          ) : !products ? (
            <div className="flex flex-col items-center justify-center">
              <MdProductionQuantityLimits className="text-4xl" />
              <span>Without Products</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {products.map((prod, i) => {
                return (
                  <div
                    className="card card-compact w-64 bg-base-100 shadow-xl lg:w-96 md:w-64"
                    key={i}>
                    {prod.p_img === undefined ? (
                      <div className="flex justify-center p-4">
                        <FcRemoveImage className="text-9xl" />
                      </div>
                    ) : (
                      <figure>
                        <img
                          src={`data:image/png;base64,${prod.p_img.img}`}
                          alt="Shoes"
                        />
                      </figure>
                    )}
                    <div className="card-body">
                      <h2 className="card-title">{prod.p_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-end">
                        <Link to={"/login"}>
                          <button className="btn btn-primary text-white">
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Link to={"/login"}>
            <button className="btn btn-secondary gap-2">
              Get more <FiMoreHorizontal className="text-lg" />
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
