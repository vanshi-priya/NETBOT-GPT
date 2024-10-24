import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video px-6 absolute pt-[20%] text-white bg-gradient-to-r from-black">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">{title}</h1>
      <p className="hidden lg:inline-block py-6 text-lg  w-[45%]  ">{overview}</p>
      <div className="my-2 md:my-0">
        <button className="bg-white text-black py-1 md:py-3 lg:py-4 px-2 md:px-6 lg:px-12 md:text-xl rounded-lg hover:bg-opacity-80">
          ▷ Play
        </button>
        <button className="hidden md:inline-block  mx-2 bg-gray-500 text-white py-1 md:py-3 lg:py-4 px-2 md:px-6 lg:px-12 md:text-xl  bg-opacity-50 rounded-lg hover:bg-opacity-60">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
