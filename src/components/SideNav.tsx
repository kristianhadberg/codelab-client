import React from "react";
import { Link } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RouteIcon from "@mui/icons-material/Route";

const SideNav = () => {
    return (
        <div className="sidenav">
            <nav>
                <ul>
                    <li>
                        <Link to="/topics">
                            <div className="sidenav-link">
                                <MenuBookIcon />
                                <p>Topics</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/learning-path">
                            <div className="sidenav-link">
                                <RouteIcon />
                                <p>Learning Path</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNav;
