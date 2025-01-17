import { Navbar } from "./components/Navbar/Navbar";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import AddExperience from "./components/AddExperience/AddExperience";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ExpreienceDetails from "./components/ExpreienceDetails/ExpreienceDetails";
import EditExperience from "./components/EditSubmission/EditExperience";
import ErrorPage from "./components/Error/ErrorPage"
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />, errorElement: <ErrorPage/>,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/addExperience", element: (<ProtectedRoute><AddExperience/></ProtectedRoute>)},
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/submission/:submissionID", element: (<ProtectedRoute><ExpreienceDetails/></ProtectedRoute>)},
        { path: "/update/:submissionID", element: <EditExperience /> }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
