import React, { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Share } from "lucide-react";
import { IMAGE_URL, instance } from "../helpers";
import { CartContext } from "../context";
import { ToastContainer, toast } from "react-toastify";
import ReactImageMagnify from "react-image-magnify";
import dummy from "../assets/15-Watt-Series-768x768.jpg";
import { MdChevronRight, MdKeyboardArrowLeft } from "react-icons/md";
import { TbPlayerPause } from "react-icons/tb";
import { CiPlay1 } from "react-icons/ci";
import { BsFullscreen } from "react-icons/bs";
import { useParams } from "react-router-dom";

const ProductDet = ({ data }) => {
  const param = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // const images_with_quotes = data?.images?.split(",");
  // const images = images_with_quotes?.map((item) => item?.replace(/"/g, ""));
  const [images, setImages] = useState<string[]>([]);
  
    const getProduct = async () => {
      const response = await instance.get(
        "/products.php?case=get_product_by_id&id=" + param.id
      );

      let imagesArray = response.data[0]?.images.replace(/"/g, "").split(",");

      setImages(imagesArray);
    };
    useEffect(() => {
      getProduct();
    }, []);


  const { cart, setCart } = useContext(CartContext);

  const insertToCart = () => {
    const newCart = [...cart];
    const data_ = {
      name: data?.name,
      image: images,
    };
    if (newCart.find((item) => item.name === data_.name)) {
      alert("Already added to quote");
      return;
    }
    newCart.push({
      name: data?.name,
      image: images,
    });
    setCart(newCart);
    alert("Added to quote");
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  
  return (
    <div className="sp mx-auto w-full max-w-[1400px] px-2 py-10 lg:px-0">
      <div className="overflow-hidden">
        <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
          <div className="items-start justify-between lg:flex lg:space-x-8">
            <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
              <div className="w-full xl:flex xl:flex-row-reverse">
                <div className=" mb-2.5 h-[400px] w-[600px] shrink-0 overflow-hidden rounded-md border md:mb-3  ">
                  {/* <div className="relative flex items-center justify-center ">
                    {images && (
                      <img
                        alt="Product gallery 1"
                        src={IMAGE_URL + images[selectedIndex]}
                        width={400}
                        height={400}
                        className="rounded-lg  "
                      />
                    )}
                  </div> */}

                  {/* <div className="absolute w-1/2 bg-red-800 px-2">
                    <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Wristwatch by Ted Baker London',
                            isFluidWidth: true,
                            src: dummy,
                            width: 200,
                            height: 200
                        },
                        largeImage: {
                            src: dummy,
                            width: 1200,
                            height: 600
                        }
                    }} />
                  </div> */}
                  

                  {/* <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                    <ChevronLeft className="text-white" />
                    <ChevronRight className="text-white" />
                  </div> */}
                </div>
                <div className="flex gap-2 xl:flex-col">
                  {images &&
                    images.map((image, index) => (
                      <div
                        key={image}
                        className="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75"
                        onClick={() => setSelectedIndex(index)}
                      >
                        <img
                          alt={`Product ${index}`}
                          src={IMAGE_URL + image}
                          decoding="async"
                          loading="lazy"
                          className="h-20 w-20 object-cover "
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* <div className="relative">
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
                  </div> */}
            <ToastContainer />
            <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">
                  {data?.name}
                </h2>
              </div>
              <div className="pb-2" />
              <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
                <button
                  type="button"
                  onClick={insertToCart}
                  className="w-full rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add To Quote
                </button>
              </div>
              <div className="pt-6 xl:pt-8">
                <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
                  Product Details:
                </h3>
                <p className="text-sm">{data?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDet;
