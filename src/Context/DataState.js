import DataContext from './DataContext';
import { useContext, useState } from 'react';
import React from 'react';

const DataState = (props) => {
    const [isSignedIn, setIsSignedIn] = useState(null)
    const [goalId, setGoalId] = useState('')
    const [isWalking, setIsWalking] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [isCycling, setIsCycling] = useState(false)

    return (
        <DataContext.Provider value={{
            NisSignedIn: [isSignedIn, setIsSignedIn],
            NgoalId: [goalId, setGoalId],
            NisWalking: [isWalking, setIsWalking],
            NisRunning: [isRunning, setIsRunning],
            NisCycling: [isCycling, setIsCycling],
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState