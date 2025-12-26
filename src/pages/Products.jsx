import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/shared/Loader";

export default function Products() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <Link to="/products/add" className="text-blue-600">
          Add Product
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="border rounded-lg p-4 shadow-md transform hover:scale-101 hover:shadow-lg transition "
          >
            <div className="h-40 flex items-center justify-center mb-3">
              <img
                src={p.image}
                alt={p.title}
                className="max-h-full object-contain"
              />
            </div>

            <h3 className="font-semibold text-sm mb-2">{p.title}</h3>

            <p className="font-bold text-blue-600">$ {p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
