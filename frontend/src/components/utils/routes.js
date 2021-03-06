import Home from "../home";
import Register from "../register"
import Login from "../login"

const routes = [
    {
        path: "/",
        component: Home,
        protected: true,
    },
    {
        path: "/login",
        component: Login,
        protected: false,
    },
    {
        path: "/register",
        component: Register,
        protected: false,
    },
]

export { routes }