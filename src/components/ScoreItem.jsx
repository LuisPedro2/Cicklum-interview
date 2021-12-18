import React from 'react';
import '../App.css';

export function ScoreItem({score}) {
    
    const {homeTeam, scoreHT, awayTeam, scoreAT} = score;
    return (
        <tr className="Row">{homeTeam} - {awayTeam}: {scoreHT} - {scoreAT}</tr>
    )
}
