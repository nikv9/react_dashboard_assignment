import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="p-3 shadow-md flex justify-between items-center h-16">
      <Link to="/" className="font-bold text-lg">
        React Mini Dashboard
      </Link>

      <nav className="space-x-6">
        <Link
          to="/users"
          className={path.startsWith("/users") ? "underline font-semibold" : ""}
        >
          Users
        </Link>

        <Link
          to="/products"
          className={
            path.startsWith("/products") ? "underline font-semibold" : ""
          }
        >
          Products
        </Link>
      </nav>
    </header>
  );
}
