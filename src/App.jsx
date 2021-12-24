import './App.css';
import React,{useState, Fragment, useEffect} from 'react';
import { useForm } from "react-hook-form";
import {ScoreList} from "./components/ScoreList";

export function App(){

  const { register, handleSubmit, reset } = useForm();  
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
    
    function formValidation(refs){
      let msgError = "";
      let refs_arr = [
        refs['homeTeam'],
        refs['awayTeam'],
        refs['scoreHT'],
        refs['scoreAT']
      ];

      const re = /^[0-9\b]+$/;

      if(refs_arr.some(ref=>!ref)){
        if(refs['homeTeam']===''){
          msgError +="- Home team field is required\n"
        }
        if(refs['awayTeam']===''){
          msgError +="- Away team field is required\n"
        }
        if(refs['scoreHT']===''){
          msgError +="- Home team score field is required\n"
        }
        if(refs['scoreAT']===''){
          msgError +="- Away team score field is required\n"
        }  
        
      }else if(refs['homeTeam'].toLowerCase() === refs['awayTeam'].toLowerCase()){
        msgError +="- Home team and away team must to be differents\n"
      }else if(!re.test(refs['scoreHT']) || !re.test(refs['scoreAT'])){
        msgError +="- Scores must be an integer number\n"
      }

      if(msgError!==''){
        alert(msgError);
        return false;
      }
      return true;
    }
      

    const onSubmit = (refs) => {

      if(formValidation(refs)){
        const homeTeam = refs['homeTeam'];
        const awayTeam = refs['awayTeam'];
        const scoreHT = refs['scoreHT'];
        const scoreAT = refs['scoreAT'];
        const order = Date.now();

        const totalScore = parseInt(scoreHT) + parseInt(scoreAT);

        // add new item to the state and sort the result by total score first and order.
        setScores((scoresPrev)=>{
          return [...scoresPrev,{homeTeam, scoreHT, awayTeam, scoreAT,totalScore,order}].sort((a,b)=>b['totalScore']-a['totalScore'] || b['order'] - a['order']);
        });

        reset();
      }
      

    }

    return (
      <Fragment>
        <div className="container">
          <div>
            <h1 className="title">World Cup Analisys Board</h1>
          </div>
          <div>
          <form onSubmit={handleSubmit(onSubmit)} className="inputsContainer">
                <input  {...register("homeTeam")} className="teamsInput" type="text" placeholder="Home Team"/>
                <input  {...register("scoreHT")} className="scoreInput" type="text" placeholder="-"/>
                <span> - </span>
                <input  {...register("scoreAT")} className="scoreInput" type="text" placeholder="-"/>       
                <input  {...register("awayTeam")} className="teamsInput" type="text" placeholder="Away Team"/>
                <input className="botonStyle" type="submit" value="Add score"/>
            </form>     
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

