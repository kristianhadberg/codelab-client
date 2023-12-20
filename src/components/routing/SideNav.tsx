import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RouteIcon from "@mui/icons-material/Route";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../redux/auth/auth";

const SideNav = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="sidenav">
            <Typography variant="h4" style={{ paddingTop: "10px" }}>
                Code Lab
            </Typography>
            {user.user && (
                <nav style={{ paddingTop: "20px" }}>
                    <p>Hi, {user.user.firstName}</p>
                    <ul>
                        <li>
                            <NavLink
                                to="topics"
                                style={({ isActive }) => ({
                                    color: isActive ? "#1976d2" : "",
                                })}
                            >
                                <div className="sidenav-link">
                                    <MenuBookIcon />
                                    <p style={{ marginLeft: "10px" }}>Topics</p>
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="learning-path"
                                style={({ isActive }) => ({
                                    color: isActive ? "#1976d2" : "",
                                })}
                            >
                                <div className="sidenav-link">
                                    <RouteIcon />
                                    <p style={{ marginLeft: "10px" }}>Learning Path</p>
                                </div>
                            </NavLink>
                        </li>

                        <li>
                            <div onClick={handleLogout} style={{ cursor: "pointer" }} className="sidenav-link logout">
                                <p>Log out</p>
                            </div>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default SideNav;
