import './App.css';
import React,{useState, Fragment, useEffect} from 'react';
import { useForm } from "react-hook-form";
import {ScoreList} from "./components/ScoreList";
import { ErrorMessage } from '@hookform/error-message';

export function App(){

  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    criteriaMode: "all"
  });
  const [scoresState, setScores] = useState([]);
  

  useEffect(() => {    
    const storedScores = localStorage.getItem('scores.storage');
    if(storedScores){
      setScores(JSON.parse(storedScores));
    }
  }, []);


    useEffect(()=>{
      localStorage.setItem('scores.storage',JSON.stringify(scoresState))
    }, [scoresState]);      

    const onSubmit = (refs) => {
     
      const homeTeam = refs['homeTeam'];
      const awayTeam = refs['awayTeam'];
      const scoreHT = refs['scoreHT'];
      const scoreAT = refs['scoreAT'];
      const order = Date.now();
      const totalScore = parseInt(scoreHT) + parseInt(scoreAT);

      if(homeTeam.toLowerCase() === awayTeam.toLowerCase()){
        alert(homeTeam.toUpperCase()+" can´t play against themselves, please correct it");
        return;
      }
     
        // add new item to the state and sort the result by total score first and order.
        setScores((scoresPrev)=>{
          return [...scoresPrev,{homeTeam, scoreHT, awayTeam, scoreAT,totalScore,order}].sort((a,b)=>b['totalScore']-a['totalScore'] || b['order'] - a['order']);
        });
        reset();
    }

    return (
      <Fragment>
        <div className="container">
          <div>
            <h1 className="title">World Cup Analisys Board</h1>
          </div>
          <div>
          <form onSubmit={handleSubmit(onSubmit)} className="inputsContainer">
                <input  {...register("homeTeam",{required:'- Home team field is required'})} className="teamsInput" type="text" placeholder="Home Team"/>
                <input  {...register("scoreHT",
                  {required:'- Home team score field is required',
                  pattern:{value:/^[0-9\b]+$/, message:"- Home team score must be an integer number"}})} className="scoreInput" type="text" placeholder="-"/>
                <span> - </span>
                <input  {...register("scoreAT",
                  {required:'- Away team score field is required',
                  pattern:{value:/^[0-9\b]+$/, message:"- Away team score must be an integer number"}})} className="scoreInput" type="text" placeholder="-"/>
                <input  {...register("awayTeam",{required:'- Away team field is required'})} className="teamsInput" type="text" placeholder="Away Team"/>
                <input className="botonStyle" type="submit" value="Add score"/>  
            </form>
            <ErrorMessage
                  errors={errors}
                  name="homeTeam"
                  render={({ message }) => <p className="errorMessage">{message}</p>}
                />
                <ErrorMessage
                  errors={errors}
                  name="scoreHT"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p className="errorMessage">{message}</p>
                    ))
                  }
                />
                <ErrorMessage
                  errors={errors}
                  name="scoreAT"
                  render={({ message }) => <p className="errorMessage">{message}</p>}
                />
                <ErrorMessage
                  errors={errors}
                  name="awayTeam"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p className="errorMessage">{message}</p>
                    ))
                  }
                />
          </div>
        </div>
        {
          scoresState.length > 0 ?
            <ScoreList scores={scoresState}/>
            :
            <h2 className="subtitle">Add a score</h2>
        }
      </Fragment>
    )   
    
}

