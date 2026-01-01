import Layout from "./Layout";
import FilteredList from "../tests/react_basics/filtered_list";
import Test123 from "../tests/react_basics/test123";
import Landing from "./Landing";

export const routes = [
  {
    id: "layout",
    element: <Layout />,
    children: [
      {
        id: "home",
        path: "/",
        label: "Home",
        handle: { title: "Home" },
        element: <Landing />,
      },
      {  
        id: "filtered-list",
        path: "/filtered-list",
        label: "Filtered List",
        handle: { title: "Filtered List" },
        element: <FilteredList />,
      },
            {  
        id: "test123",
        path: "/test123",
        label: "test123",
        handle: { title: "test123" },
        element: <Test123 />,
      },
    ],
  },
];
