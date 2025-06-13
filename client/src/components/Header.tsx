import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-20 w-full bg-teal-100">
      <div className="h-20 flex items-center justify-center">
        <Link to="/" className="text-2xl font-bold">TENTECHSOLUTIONS</Link>
      </div>
    </div>
  );
};

export default Header;
