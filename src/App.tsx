import React, { useEffect } from "react";
import "./App.css";
import TopicsPage from "./pages/topic/TopicsPage";
import LoginPage from "./pages/login/LoginPage";
import LearningPathPage from "./pages/learningpath/LearningPathPage";
import SideNav from "./components/routing/SideNav";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import TopicDetailPage from "./pages/topic/TopicDetailPage";
import ExercisePage from "./pages/exercise/ExercisePage";
import PrivateRoutes from "./components/routing/PrivateRoute";
import RegisterPage from "./pages/login/RegisterPage";
import LearningPathDetailPage from "./pages/learningpath/LearningPathDetailPage";
import { setUser } from "./redux/auth/auth";
import { useAppDispatch } from "./app/hooks";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            dispatch(setUser(foundUser));
            navigate("/topics");
        }
    }, []);

    return (
        <div className="App">
            <SideNav />
            <div className="main" style={{ width: "100%" }}>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/topics" element={<TopicsPage />} />
                        <Route path="/topics/:topicId" element={<TopicDetailPage />} />
                        <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
                        <Route path="/learning-path" element={<LearningPathPage />} />
                        <Route path="/learning-path/:learningPathId" element={<LearningPathDetailPage />} />
                    </Route>
                    <Route path="/" element={<Navigate to="/login" replace={true} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
