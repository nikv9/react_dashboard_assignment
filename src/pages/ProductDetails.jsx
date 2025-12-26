import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/shared/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to load product", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Loader />;

  return (
    <div className="p-6 flex justify-center">
      <div className="max-w-4xl w-full border rounded-lg shadow-md p-6 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-4 hover:underline cursor-pointer"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-3">{product.title}</h3>

            <p className="text-xl font-semibold text-blue-600 mb-4">
              $ {product.price}
            </p>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
