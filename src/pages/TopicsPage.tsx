import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTopics } from "../redux/slices/topics";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../redux/store";

export default function TopicsPage() {
    const dispatch = useAppDispatch();

    const { topics, isLoading } = useSelector((state: RootState) => state.topics);

    useEffect(() => {
        dispatch(getTopics());
    }, [dispatch]);

    return (
        <>
            <h1>Topics</h1>
            {topics.map((t) => {
                return <span key={t.id}>{t.name}</span>;
            })}
        </>
    );
}
