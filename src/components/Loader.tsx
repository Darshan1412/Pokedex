import React from "react";
import pikachuLoader from "assets/pikachu-loader.gif";
import pikaLoader from "assets/pika-loader.gif";
function Loader() {
  return (
    <div className="loader">
      <img src={pikachuLoader} alt="" />
      {/* <img src={pikaLoader} alt="" /> */}
    </div>
  );
}

export default Loader;