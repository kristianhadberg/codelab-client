import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Collapse, IconButton, IconButtonProps, Typography, styled } from "@mui/material";
import { ITopic } from "../@types/topic";
// import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
    topic: ITopic;
};

// from MUI
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

// from MUI
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function LearningPathTopicCard({ topic }: Props) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ backgroundColor: "#34444D", padding: "30px" }}>
            <Typography variant="h5" color={"white"}>
                {topic.name}
            </Typography>
            <CardActions>
                <ExpandMore expand={expanded} onClick={handleClick}>
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ backgroundColor: "#7692a1", borderRadius: "5px" }}>
                    <Typography variant="h6">Exercises</Typography>
                    {topic.exercises.map((e) => (
                        <Link style={{ color: "black" }} to={`/exercise/${e.id}`}>
                            <Typography color={"white"} variant="h6">
                                {e.name}
                            </Typography>
                        </Link>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
}
