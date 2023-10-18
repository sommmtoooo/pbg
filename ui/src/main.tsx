import ReactDOM from "react-dom/client";
import "./assets/styles/main.css";
import Dashboard from "./containers/dashboard";
import Layout from "./layouts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Layout Component={Dashboard} />,
);
