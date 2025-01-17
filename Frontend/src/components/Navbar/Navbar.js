import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import HomeImg from "./../Data/house.png";
import coustomerImg from "./../Data/rating.png";
import logoutImg from "./../Data/logout.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Navbar() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const fetchToken = async () => {
            const token =  localStorage.getItem('authToken');
            console.log("token", token);
            if (token) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        };
        fetchToken();
    }, []);
    // console.log("isLogin", isLogin)


    // // Log out function
    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     alert("Log Out Successful");
    //     localStorage.removeItem('authToken');
    //     localStorage.removeItem('path');
    //     localStorage.removeItem('loglevel');
    //     navigate("/login");
    // };

    return (
        <>
            <div className={styles.divNavbarContainer}>
                {/* App Name */}
                <Link to="/" className={styles.underlineR}>
                    <span className={styles.appname}>Interview Experience</span>
                </Link>
                <div className={styles.navPageContainer}>
                    {/* Home */}
                    <Link to="/" className={styles.underlineRmv}>
                        <img src={HomeImg} alt="HomeImg" />
                        <span>Home</span>
                    </Link>

                    {/* Add Experiences */}
                    <Link to="/addExperience" className={styles.underlineRmv}>
                        <img src={coustomerImg} alt="coustomerImg" />
                        <span>Add Experiences</span>
                    </Link>

                    {/* Login/Logout */}
                    {!isLogin ? (
                        <Link to="/login" className={styles.underlineRmv}>
                            <img src={logoutImg} alt="logoutImg" />
                            <span>LogIn</span>
                        </Link>
                    ) : ( null
                        // <Link to="/" onClick={handleLogout} className={styles.underlineRmv}>
                        //     <img src={logoutImg} alt="logoutImg" />
                        //     <span>LogOut</span>
                        // </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    );
}
