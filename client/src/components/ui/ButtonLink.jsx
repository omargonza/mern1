import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to}  style={{ textDecoration:"none", color: "#585857", borderColor: "#007bff", marginRight: '10px' }}>
    {children}
  </Link>
);
