import React from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import TopicsPage from "../pages/TopicsPage";
import LearningPathPage from "../pages/LearningPathPage";

const SideNav = () => {
    return (
        <div className="sidenav" style={{ width: "200px", paddingTop: "20px" }}>
            <nav>
                <ul>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    <li>
                        <Link to="/learning-path">Nats</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNav;
