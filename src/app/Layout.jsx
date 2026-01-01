import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="test-projects">
      <h3 style={{ paddingLeft: "24px" }}>React Basics</h3>
      <hr style={{ margin: "12px 0", borderColor: "gray"}} />
        <div className="container">
          <Outlet />
        </div>
    </div>
  );
}
