import { Link } from "react-router-dom";
import { routes } from "./routes";

export default function Nav() {
  const navItems = routes.flatMap((r) => r.children ?? []).filter((c) => c.label);

  return (
    <nav className="navigation-bar">
      {navItems.map((r) => (
        <button>
        <Link key={r.path} to={r.path} className={`nav-link nav-link--${r.id}`}>
          {r.label}
        </Link>
        </button>
      ))}
    </nav>
  );
}
