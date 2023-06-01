import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";

export default function Footer(props) {
  return (
    <footer className="bg-neutral text-white grid grid-cols-3 px-4 py-8">
      <div className="flex flex-col justify-between">
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-accent text-white rounded-lg">
            <FiInstagram />
          </button>
          <button className="btn btn-accent text-white rounded-lg">
            <FiTwitter />
          </button>
          <button className="btn btn-accent text-white rounded-lg">
            <FiFacebook />
          </button>
          <button className="btn btn-accent text-white rounded-lg">
            <FiLinkedin />
          </button>
        </div>
        <div className="pl-2 pb-1">Copyright © 2023 Market Turing Inc.</div>
      </div>
      <div className="flex justify-around col-span-2">
        <div className="flex flex-col gap-2">
          <span className="bg-secondary p-1 rounded-lg">Section 1</span>
          <span className="pl-2">Some 1</span>
          <span className="pl-2">Some 2</span>
          <span className="pl-2">Some 3</span>
          <span className="pl-2">Some 4</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="bg-secondary p-1 rounded-lg">Section 2</span>
          <span className="pl-2">Some 1</span>
          <span className="pl-2">Some 2</span>
          <span className="pl-2">Some 3</span>
          <span className="pl-2">Some 4</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="bg-secondary p-1 rounded-lg">Section 3</span>
          <span className="pl-2">Some 1</span>
          <span className="pl-2">Some 2</span>
          <span className="pl-2">Some 3</span>
          <span className="pl-2">Some 4</span>
        </div>
      </div>
    </footer>
  );
}
