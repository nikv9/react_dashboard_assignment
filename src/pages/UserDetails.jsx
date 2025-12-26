import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/shared/Loader";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(res.data);
      } catch {
        setError("Failed to load user");
      }
    };

    fetchUser();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!user) return <Loader />;

  return (
    <div className="p-6 flex justify-center">
      <div className="max-w-3xl w-full border rounded-lg shadow-md p-6 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-4 hover:underline cursor-pointer"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6">{user.name}</h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mb-3">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Website:</span> {user.website}
            </p>
          </div>

          <div>
            <p className="mb-3">
              <span className="font-semibold">City:</span> {user.address.city}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Company:</span>{" "}
              {user.company.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
