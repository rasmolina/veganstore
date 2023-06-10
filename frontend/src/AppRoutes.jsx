import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutUs";
import Customers from "./components/Customers";
import Products from "./components/Products";
import Orders from "./components/Orders";
import { AuthProvider } from "./contexts/auth";


function AppRoutes() {
    return (
        <Router>
            <AuthProvider />
            <Routes >
                <Route path="/login" index element={<LoginPage />}></Route>
                <Route path="/home" index element={<HomePage />}></Route>
                <Route path="/" index element={<AboutPage />}></Route>
                <Route path="/customer" index element={<Customers />}></Route>
                <Route path="/product" index element={<Products />}></Route>
                <Route path="/order" index element={<Orders />}></Route>
            </Routes>
            <AuthProvider />
        </Router>
    )
}

export default AppRoutes;