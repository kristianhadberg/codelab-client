import React from "react";
import "./App.css";
import TopicsPage from "./pages/TopicsPage";
import LearningPathPage from "./pages/LearningPathPage";
import SideNav from "./components/SideNav";
import { Navigate, Route, Routes } from "react-router-dom";
import TopicDetailPage from "./pages/TopicDetailPage";
import ExercisePage from "./pages/ExercisePage";

function App() {
    return (
        <div className="App">
            <SideNav />
            <div className="main">
                <Routes>
                    <Route path="/" element={<Navigate to="/topics" replace={true} />} />
                    <Route path="/topics" element={<TopicsPage />} />
                    <Route path="/topics/:topicId" element={<TopicDetailPage />} />
                    <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
                    <Route path="/learning-path" element={<LearningPathPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
