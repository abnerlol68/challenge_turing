import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";

import { UserCtx } from "../../context/UserCtx";

const URL = import.meta.env.VITE_API;

export default function Home() {
  const getLayout = () => {
    const layoutContent = [];
  };

  const Layouts = () => {
    return (
      <>
        <li>
          <a onClick={() => {}}>Post product</a>
        </li>
        <li>
          <a onClick={() => {}}>Create user</a>
        </li>
        <li>
          <a href="/" onClick={handleLogout}>
            Log Out
          </a>
        </li>
      </>
    );
  };

  const [categories, setCategories] = useState({});
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(UserCtx);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: 100,
    user_id: JSON.parse(localStorage.getItem("user")).u_id,
    img: [],
  });

  const [formAlert, setFormAlert] = useState({
    enable: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      const req = await fetch(`${URL}get/categories`);
      const res = await req.json();
      const categoriesSet = {};
      res.categories.forEach((cat) => (categoriesSet[cat.c_id] = cat.c_name));
      setCategories(categoriesSet);
    };
    getCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLogged(false);
  };

  const handleSummit = async (evt) => {
    evt.preventDefault();

    const productWithoutImg = JSON.parse(JSON.stringify(product));
    delete productWithoutImg.img;
    const { img } = product;
    const imgFile = img[0];

    const reqProduct = await fetch(`${URL}add/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productWithoutImg),
    });
    const resProduct = await reqProduct.json();

    const idProduct = resProduct.product[0].p_id;

    const imgData = new FormData();
    imgData.append("img", imgFile);
    const reqImgProduct = await fetch(`${URL}add/product_img/${idProduct}`, {
      method: "POST",
      body: imgData,
    });
    const resImgProduct = await reqImgProduct.json();

    setFormAlert(
      reqProduct.ok && reqImgProduct.ok
        ? {
            enable: true,
            type: "success",
            message: "Publicación exitosa",
          }
        : {
            enable: true,
            type: "error",
            message: "Publicación fallida",
          }
    );
  };

  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value, files } = target;

    const newValues = {
      ...product,
      [name]: files || value,
    };

    setProduct(newValues);
  };

  return (
    <>
      <main className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <header className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">Market Turing</div>
            <nav className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <Layouts />
              </ul>
            </nav>
          </header>
          {/* Page content here */}
          <section>
            <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-6">
              <Alert
                enable={formAlert.enable}
                type={formAlert.type}
                message={formAlert.message}
              />
              <form
                className="flex flex-col justify-between items-center gap-4 w-1/2 bg-neutral-content p-8 my-10 rounded-2xl"
                onSubmit={handleSummit}>
                <h2 className="text-3xl">Postear un producto</h2>
                {/* Input name */}
                <div className="form-control w-full max-w-xs">
                  <label htmlFor="name" className="label">
                    <span className="label-text text-base">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                {/* Input price */}
                <div className="form-control w-full max-w-xs">
                  <label htmlFor="price" className="label">
                    <span className="label-text text-base">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Precio del producto"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                {/* Select category */}
                <div className="form-control w-full max-w-xs">
                  <label htmlFor="category" className="label">
                    <span className="label-text text-base">Category</span>
                  </label>
                  <select
                    name="category"
                    id="category"
                    onChange={handleChange}
                    className="select select-bordered">
                    <option disabled selected>
                      Categorias
                    </option>
                    {Object.entries(categories).map(([altKey, altVal]) => (
                      <option key={altKey} value={altKey}>
                        {altVal}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Input imgs */}
                <div className="form-control w-full max-w-xs">
                  <label htmlFor="img" className="label">
                    <span className="label-text text-base">
                      Elige la imagen del producto
                    </span>
                  </label>
                  <input
                    name="img"
                    id="img"
                    type="file"
                    onChange={handleChange}
                    accept="image/png, image/jpeg, image/jpg"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                {/* Button Submit */}
                <button
                  type="submit"
                  id="btnSummit"
                  className="btn btn-primary text-white w-80">
                  Publicar
                </button>
              </form>
            </main>
          </section>
        </div>
        <nav className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200">
            {/* Sidebar content here */}
            <Layouts />
          </ul>
        </nav>
      </main>
    </>
  );
}
