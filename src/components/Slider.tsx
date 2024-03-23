// Slider.js
import React, { useState, useEffect } from "react";
import { LuArrowLeftCircle } from "react-icons/lu";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { TbPlayerPause } from "react-icons/tb";
import { BsFullscreen } from "react-icons/bs";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { IMAGE_URL } from "../helpers";

const Slider = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  console.log(images.length);

  useEffect(() => {
    let intervalId: number;
    if (isPlaying && images.length > 0) {
      intervalId = setInterval(() => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, images.length]);

  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentImage(index);
  };

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div className="w-[100%] md:w-[30%]  flex flex-col overflow-x-auto py-10">
      <div className="relative w-[80%] mx-auto  md:w-[80%]">
        <div className="overflow-hidden">
          <img
            className="w-full transition-transform duration-300 transform"
            src={IMAGE_URL + images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
          />
        </div>
        <button
          className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-gray-200 text-black px-1 py-1 rounded-full"
          onClick={prevSlide}
        >
          <MdKeyboardArrowLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-gray-200 text-black px-1 py-1 rounded-full"
          onClick={nextSlide}
        >
          <MdChevronRight className="w-5 h-5" />
        </button>

        <button
          className="absolute bottom-4 left-4 text-black  px-3 py-1 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <TbPlayerPause className="w-8 h-8 " />
          ) : (
            <CiPlay1 className="w-8 h-8" />
          )}
        </button>
        <button className="absolute bottom-4 right-4 text-black  px-3 py-1 rounded-full">
          <BsFullscreen className="text-2xl" />
        </button>
      </div>
      <div className="flex flex-row ml-0 md:-ml-10 mx-auto">
            {images.map((image) => (
                <img
                    src={IMAGE_URL + image}
                    className="h-[110px] w-[110px] "
                ></img>
            ))}
          </div>
    </div>
  );
};

export default Slider;
