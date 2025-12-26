import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title) return toast.error("Title is required");
    if (!form.price || form.price <= 0)
      return toast.error("Price must be greater than 0");
    if (!form.description) return toast.error("Description is required");
    if (!form.category) return toast.error("Category is required");
    if (!imageFile) return toast.error("Please select an image");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", Number(form.price));
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("image", imageFile); // ✅ binary file

      await axios.post("https://fakestoreapi.com/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully");
      setTimeout(() => navigate("/products"), 1500);
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline float-end p-2 cursor-pointer"
      >
        ← Back
      </button>

      <form
        onSubmit={submit}
        className="p-6 flex items-center justify-center min-h-[calc(100vh-4rem)]"
      >
        <div className="border border-gray-400 rounded-lg p-8 w-96">
          <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>

          <input
            className="border p-2 w-full mb-3"
            placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="number"
            className="border p-2 w-full mb-3"
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <textarea
            className="border p-2 w-full mb-3"
            placeholder="Description"
            rows="3"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            className="border p-2 w-full mb-3"
            placeholder="Category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <div className="mb-4">
            <label className="flex flex-col justify-center border p-2 cursor-pointer">
              <span className="text-gray-500">Choose image</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          {preview && (
            <div className="flex justify-center mb-4">
              <img
                src={preview}
                alt="Preview"
                className="h-32 object-contain rounded"
              />
            </div>
          )}

          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-6 py-2 rounded cursor-pointer">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
