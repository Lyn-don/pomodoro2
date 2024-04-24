import ReactDOM from "react-dom/client";
import React from "react";
import App from "./components/App";
import "./stylesheets/styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	//<React.StrictMode>
	<App />
	//</React.StrictMode>
);
