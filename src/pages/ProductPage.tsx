//product

import React, { useContext, useEffect, useState } from "react";
import { IMAGE_URL, instance } from "../helpers";
import { useParams } from "react-router-dom";
import Slider from "../components/Slider";
import { Table } from "react-bootstrap";
import { CartContext } from "../context";

export const ProductPage = () => {
  const param = useParams(); // inside your component
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState();
  const [images, setImages] = useState<string[]>([]);
  const { cart, setCart } = useContext(CartContext);

  const insertToCart = () => {
    const newCart = [...cart];
    const data_ = {
      name: data[0]?.name,
      image: images,
    };
    if (newCart.find((item) => item.name === data[0]?.name)) {
      alert("Already added to quote");
      return;
    }
    newCart.push({
      name: data[0]?.name,
      image: images,
    });
    setCart(newCart);
    alert("Added to quote");
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const getProduct = async () => {
    const response = await instance.get(
      "/products.php?case=get_product_by_id&id=" + param.id
    );
    setData(response.data);
    console.log(data);

    let imagesArray = response.data[0]?.images.replace(/"/g, "").split(",");

    setImages(imagesArray);
  };

  useEffect(() => {
    getProduct();
  }, []);

  // replace with
  useEffect(() => {
    if (data[0]?.data) {
      // Replace newline characters with escaped newline (\n)
      const sanitizedData = data[0].data.replace(/\n/g, "\\n");
      try {
        const data_ = JSON.parse(sanitizedData);
        console.log(data_);
        setTableData(data_);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [data]);

  return (
    <div>
      <div className="w-[100vw] mx-auto mb-10 md:px-40 md:space-x-10 flex flex-col md:flex-row">
        
        <Slider images={images} />
          
          
        <div className="w-[100vw] md:w-[70%] px-3 md:px-0 ">
          <div className="flex flex-col  justify-center items-center">
            <p className="text-2xl font-bold mt-5"> {data[0]?.name} </p>
            <p className="mt-8">
              पानी बचाओ देश बचाओ” (Save water to save the country)
            </p>
            <button
            onClick={insertToCart}
            className="bg-purple-900 hover:bg-purple-700 text-white p-2 px-[13rem]  mt-16 rounded-md">
              Add TO Quote
            </button>
          </div>
          <div>
            <p className="font-semibold mt-8">Product Details:</p>
            <p className="mt-4 mb-10">
            {data[0]?.description}
            </p>
            <div className="overflow-x-auto">
              {tableData && (
                <div className="w-[90%]">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        {tableData &&
                          tableData?.headers?.map((item, index) => (
                            <th key={index}>{item}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData &&
                        tableData?.rows?.map((item, index) => (
                          <tr>
                            {Object.values(item).map((item, index) => (
                              <td key={index}>{item}</td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
