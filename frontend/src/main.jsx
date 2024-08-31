import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Protected } from "./components/index.js";
import {
    Login,
    Register,
    CreatePlan,
    Trips,
    Profile,
    NotFoundPage,
    Landing,
    UserTrip,
} from "./pages/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "*",
                element: <NotFoundPage />,
            },
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/login",
                element: (
                    <Protected isAuthenticated={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: "/register",
                element: (
                    <Protected isAuthenticated={false}>
                        <Register />
                    </Protected>
                ),
            },
            {
                path: "/create-plan",
                element: (
                    <Protected isAuthenticated>
                        <CreatePlan />
                    </Protected>
                ),
            },
            {
                path: "/trips",
                element: (
                    <Protected isAuthenticated>
                        <Trips />
                    </Protected>
                ),
            },
            {
                path: "/trips/:tripId",
                element: (
                    <Protected isAuthenticated>
                        <UserTrip />
                    </Protected>
                ),
            },
            {
                path: "/profile",
                element: (
                    <Protected isAuthenticated>
                        <Profile />
                    </Protected>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
