import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/shared/Loader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {users.map((u) => (
        <Link
          key={u.id}
          to={`/users/${u.id}`}
          className="border rounded-lg p-4 shadow-md transform hover:scale-101 hover:shadow-lg"
        >
          <h3 className="font-semibold text-lg mb-1">{u.name}</h3>
          <p className="text-sm text-gray-600">{u.email}</p>
          <p className="text-sm text-blue-600">{u.website}</p>
        </Link>
      ))}
    </div>
  );
}
