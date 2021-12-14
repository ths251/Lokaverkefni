import React from 'react'
import { useEffect, useState } from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {listPlayers} from './graphql/queries';
import {Paper} from '@mui/material';

function Rankings(){

    const [players, setPlayers] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() =>{
        fetchPlayers();
      }, []);

      const fetchPlayers = async () => {
        try{
          const playerData = await API.graphql(graphqlOperation(listPlayers));
          const playerList = playerData.data.listPlayers.items;
          setPlayers(playerList);
        }catch(err){
          console.log('error on fetching players', err);
        }
      }
      console.log(players);


      const [sortType, setSortType] = useState();

      useEffect(() => {
        const sortArray = type => {
          const types = {
            name: 'name',
            position: 'position',
            team: 'team',
            points: 'points',
          };
          const sortProperty = types[type];
          //ef að það er strengur þá raða eftir streng
          if(sortProperty ==='name' || sortProperty ==='position' || sortProperty ==='team'){
            const sortedStrengur = [...players].sort((a, b) => a[sortProperty].localeCompare(b[sortProperty]));
            setPlayers(sortedStrengur);
            
          }else{
            //annars er það heiltala
            const sortedInt = [...players].sort((a, b) => b[sortProperty] - a[sortProperty]);
            setPlayers(sortedInt);
            
          }
        }
    
        sortArray(sortType);
        }, [sortType]);

    return(
        <div className = "App">
            {/*Fellilisti til þess að raða eftir dálkum*/}
            <div className = "header_option">
            <h5>Velja leikmann eftir:</h5>
                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="name">Nafni</option>
                    <option value="position">Stöðu</option>
                    <option value="team">liði </option>
                    <option value="points">Stigum</option>
                </select>
            <input 
                type ="text" 
                placeholder = "leita eftir leikmanni"
                onChange = {(event) =>
                    setSearchTerm(event.target.value)}
            /> 
            </div>

        {/*Filtera leikmenn og tengja við leitar gluggan*/}
        <div className= "playerList">
            {players.filter((value) => {
            if(searchTerm ===""){
                return value;
            }else if(value.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return value;
            }

        
         }).map((value,idx) =>{
        {/*Mappa alla leikmenn*/}
          return (
            <Paper variant="outlined" elevation={0} key={`value${idx}`}>  
              <div className="playerCard">
                
                  <div className="playerName">{value.name}</div>
                  <div className="playerPosition">{value.position}</div>
                  <div className="playerTeam">{value.team}</div>
                  <div className="playerPoints">{value.points}</div>
                  <img src = {process.env.PUBLIC_URL + "/img/"+value.picture}  width = "80px"/>
                 
              </div>
            </Paper>
          )
        })}
      </div>
    </div>
    );
}

export default Rankings;