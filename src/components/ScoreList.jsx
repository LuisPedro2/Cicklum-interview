import React from 'react';
import '../App.css';
import {ScoreItem} from "./ScoreItem";

export function ScoreList({scores}) {

    return (
        <div className="TableBox">
            <table className="Table">
                <tbody>
                    {scores.map((score)=>(
                        <ScoreItem  score={score}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
