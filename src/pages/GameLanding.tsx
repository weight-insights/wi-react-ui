import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

export function GameLanding(): ReactElement {
    const isWeightGoalSet = useSelector((state: RootState) => state.members.currentMember.weightGoal);
    return ( 
        isWeightGoalSet ?
        <text>Greetings</text> : <Navigate to="/set-weight-goal" />
    );
}
