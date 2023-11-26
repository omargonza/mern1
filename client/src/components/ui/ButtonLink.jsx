import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="custom-link btn btn-outline-secondary">
    {children}
  </Link>
);
