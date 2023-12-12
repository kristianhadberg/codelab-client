import { Typography } from "@mui/material";
import { ITestCase } from "../@types/testCase";

type Props = {
    testCases: ITestCase[];
};

const TestCases = ({ testCases }: Props) => {
    return (
        <div style={{ marginTop: "50px" }}>
            {testCases.map((testCase, index) => (
                <div key={index}>
                    <Typography variant="h6" style={{ marginTop: "20px" }}>
                        Test case {index + 1}:
                    </Typography>
                    <code style={{ padding: "10px", display: "block", backgroundColor: "#3c4d57", borderRadius: "5px" }}>
                        <div style={{ display: "flex" }}>
                            <Typography fontWeight="bold">Input: &nbsp;</Typography>
                            <Typography sx={{ fontWeight: "100" }}>{testCase.input}</Typography>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Typography fontWeight="bold">Expected output: &nbsp;</Typography>
                            <Typography sx={{ fontWeight: "100" }}>{testCase.expectedOutput}</Typography>
                        </div>
                    </code>
                </div>
            ))}
        </div>
    );
};

export default TestCases;
