import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">
        Employee Leave System
      </span>

      <button
        className="btn btn-outline-light"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
