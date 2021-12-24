import React from 'react';
import '../App.css';
import {ScoreItem} from "./ScoreItem";

export function ScoreList({scores}) {

    return (
        <div className="tableBox">
            <table className="table">
                <tbody>
                    {scores.map((score)=>(
                        <ScoreItem  key={score.order} score={score}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
