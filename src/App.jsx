import './App.css';
import React,{useState, Fragment,useRef, useEffect} from 'react';
import {ScoreList} from "./components/ScoreList";

export function App(){
  
  const [scoresState, setScores] = useState([]);
  const [order, setOrder] = useState(0);

  const homeTeamRef = useRef();
  const homeTeamScoreRef = useRef();
  const awayTeamRef = useRef();
  const awayTeamScoreRef = useRef();


  useEffect(() => {    
    const storedScores = localStorage.getItem('scores.storage');
    if(storedScores){
      setScores(JSON.parse(storedScores));
    }
  }, []);


    useEffect(()=>{
      localStorage.setItem('scores.storage',JSON.stringify(scoresState))
    }, [scoresState]);  

    function resetForm(){
        homeTeamRef.current.value = "";
        awayTeamRef.current.value = "";
        homeTeamScoreRef.current.value = "";
        awayTeamScoreRef.current.value = "";
    }

    const handleAddScore = () => {
        const homeTeam = homeTeamRef.current.value;
        const awayTeam = awayTeamRef.current.value;
        const scoreHT = homeTeamScoreRef.current.value;
        const scoreAT = awayTeamScoreRef.current.value;
        
        const totalScore = parseInt(scoreHT) + parseInt(scoreAT);

        if(homeTeam === "" || awayTeam === "" || scoreHT === "" || scoreAT === ""){
            alert("Populate all the fields, please");
            return;
        }
        const re = /^[0-9\b]+$/;
        if(!re.test(scoreHT) || !re.test(scoreAT)){
          alert("Score must be a number");
            return;
        }

        setScores((scoresprev)=>{
          setOrder(order+1);
          return [...scoresprev,{homeTeam, scoreHT, awayTeam, scoreAT,totalScore,order}].sort((a,b)=>b['totalScore']-a['totalScore'] || b['order'] - a['order']);
        });

        resetForm();

    }

    return (
      <Fragment>
        <div className="Container">
          <div>
            <h1 className="Title">World Cup Analisys Board</h1>
          </div>
          <div>
            <div className="InputsContainer">
                <input  id="hometeam" className="TeamsInput" ref={homeTeamRef} type="text" placeholder="Home Team"/>
                <input  id="hometeamscore" className="ScoreInput" ref={homeTeamScoreRef} type="text" placeholder="-"/>
                <span> - </span>
                <input  id="awayteamscore" className="ScoreInput" ref={awayTeamScoreRef} type="text" placeholder="-"/>       
                <input  id="awayteams" className="TeamsInput" ref={awayTeamRef} type="text" placeholder="Away Team" placeholder="Away Team"/>       
            </div>          
            <button name="addbutton" className="BotonStyle" onClick={handleAddScore}>Add Score</button>
          </div>
        </div>
        {
          scoresState.length >0 ?
          <ScoreList scores={scoresState}/>
          :
          <h2 className="Subtitle">Add a score</h2>
        }
      </Fragment>
    )   
    
}

