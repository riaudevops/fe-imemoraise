import "./index.css";
import router from "./routers/main";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<div>
		<RouterProvider router={router} />
	</div>
);
