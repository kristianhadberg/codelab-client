import React from "react";
import "./App.css";
import TopicsPage from "./pages/TopicsPage";
import LoginPage from "./pages/LoginPage";
import LearningPathPage from "./pages/LearningPathPage";
import SideNav from "./components/SideNav";
import { Navigate, Route, Routes } from "react-router-dom";
import TopicDetailPage from "./pages/TopicDetailPage";
import ExercisePage from "./pages/ExercisePage";
import PrivateRoutes from "./components/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";

function App() {
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
