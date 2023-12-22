import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ITopic } from "../../@types/topic";

type Props = {
    topic: ITopic;
};

const TopicCard = ({ topic }: Props) => {
    return (
        <Card variant="outlined" sx={{ minWidth: 275, padding: 1, margin: "10px 10px 10px 0", backgroundColor: "#34444D", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <CardContent>
                <Typography sx={{ fontSize: 16 }} fontWeight={"bold"} color={"white"}>
                    {topic.name}
                </Typography>
                <Typography variant="body2" fontWeight={"100"} color={"white"}>
                    Learn more about {topic.name.toLowerCase()}.
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/topics/${topic.id}`}>
                    <Button size="small">Learn More</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default TopicCard;
