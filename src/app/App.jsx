import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import Nav from "./Nav";
import "../app.css";

function renderRoutes(routeList) {
  return routeList.map((r) => (
    <Route
      key={r.id ?? r.path}
      path={r.path}
      element={r.element}
      index={r.index}
    >
      {r.children ? renderRoutes(r.children) : null}
    </Route>
  ));
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        {renderRoutes(routes)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
