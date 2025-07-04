import { Admin, Groups, SignIn, SignUp, Student, Teacher } from "@pages";
import { lazy } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
const App = lazy(() => import("../App"));
const Router = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<App />}>
					<Route index element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
					{/* ADMIN */}
					<Route path="admin" element={<Admin />}>
						<Route path="groups" element={<Groups />} />
					</Route>
					{/* STUDENT */}
					<Route path="student" element={<Student />}></Route>
					{/* Teacher */}
					<Route path="teacher" element={<Teacher />}></Route>
					<Route path="*" element={<h1>404 Page Not Found</h1>} />
				</Route>
			</>
		)
	);
	return <RouterProvider router={router} />;
};
export default Router;
