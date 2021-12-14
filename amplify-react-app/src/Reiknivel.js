import React from 'react'
//Tölfræði pakkar sem ég er að testa
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import {API, graphqlOperation} from 'aws-amplify';
import {listPlayers} from './graphql/queries';
import {Button, Box} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Reiknivel(){
    //Stig til að greina trade
    var totalPoints1, totalPoints2;
    var points1, points2,points3,points4,points5,points6;
    var texti;
    //Fylki af players hlutum sem ég þarf fyrir Select boxið mitt
    var playersTrade = [];

    
    //Breytur fyrir players gögnin mín
    const [players, setPlayers] = useState([]);

    useEffect(() =>{
        fetchPlayers();
      }, []);


      const fetchPlayers = async () => {
        try{
          const playerData = await API.graphql(graphqlOperation(listPlayers))
          const playerList = playerData.data.listPlayers.items;
          setPlayers(playerList);
        }catch(err){
          console.log('error on fetching players', err);
        }
      }

      //Constructor fyrir player hlutinn minn
      function Player(descr){
        for(var property in descr){
            this[property] = descr[property];
        }
    }
      
    //Mappa í gegnum gögnin mín og "pusha" player hlut í fylkið mitt sem er með breytunum label og value
    //label og value inniheldur þá hluti sem ég þarf fyrir reiknivélina(label = nafn, value = stig)
      players.map(value =>{
        var player = new Player({
            label: value.name,
            value: value.points  
        })
        playersTrade.push(player); 
      })

      console.log(playersTrade);
      //þar sem ég er með 6 Select list þá þarf 6 instance af þessum handler (svo það sé ekki að hafa áhrif á hina)

      //Select 1
      const [result1, value1] = useState(playersTrade.label);
      const playerHandler1 = e =>{
          value1(e.value);
          
      }

      //Select 2
      const [result2, value2] = useState(playersTrade.label);
      const playerHandler2 = e =>{
          value2(e.value);
      }

      //Select 3
      const [result3, value3] = useState(playersTrade.label);
      const playerHandler3 = e =>{
          value3(e.value)
      }

      //Select 4
      const [result4, value4] = useState(playersTrade.label);
      const playerHandler4 = e =>{
          value4(e.value)
      }

      //Select 5
      const [result5, value5] = useState(playersTrade.label);
      const playerHandler5 = e =>{
          value5(e.value)
      }

      //Select 6
      const [result6, value6] = useState(playersTrade.label);
      const playerHandler6 = e =>{
          value6(e.value)
      }

    //"Naive" lausn á þessu
    if(result1 === undefined){
        points1 = 0;
    }else{
        points1 = result1;
    }

    if(result2 === undefined){
        points2 = 0;
    }else{
        points2 = result2;
    }

    if(result3 === undefined){
        points3 = 0;
    }else{
        points3 = result3;
    }

    if(result4 === undefined){
        points4 = 0;
    }else{
        points4 = result4;
    }

    if(result5 === undefined){
        points5 = 0;
    }else{
        points5 = result5;
    }

    if(result6 === undefined){
        points6 = 0;
    }else{
        points6 = result6;
    }

    totalPoints1 = points1+points2+points3;
    totalPoints2 = points4+points5+points6;

    var pointsFylki1 = [points1, points2, points3];
    var pointsFylki2 = [points4, points5, points6];

    //Fall til að reikna aukastig sem leikmaður fær t.d að vera með "besta leikmannin" og hvort eitthvað sé ójafnt
    //Frekar tvö fylki
    function aukastig(points1, points2){
        var mestuStig1 = 0;
        var mestuStig2 = 0;
        var counter1 = 0;
        var counter2 = 0;

        //Loopa í gegnum bæði fylkin og finna mestu stigin hjá báðum liðum
        //...og hversu marga leikmenn bæði lið er að trade-a fyrir
        for(var i = 0; i<points1.length; i++){
            if(mestuStig1<points1[i]){
                mestuStig1 = points1[i];
            }
            if(points1[i] > 0){
                counter1++;
            }
        }

        for(var j = 0; j<points2.length; j++){
            if(mestuStig2<points2[j]){
                mestuStig2 = points2[j];
            }

            if(points2[j]>0){
                counter2++;
            }
        }

        if(mestuStig1>mestuStig2){
            totalPoints1+=500;
        }

        if(mestuStig2>mestuStig1){
            totalPoints2+=500;
        }

        if(counter1>counter2 && counter2!=0){
            var mismunur = counter1-counter2;
            totalPoints2+=mismunur*500
        }

        if(counter2>counter1 && counter1!=0){
            var mismunur = counter2-counter1;
            totalPoints2+=mismunur*500
        }
    }

    aukastig(pointsFylki1,pointsFylki2);

    //Hlutur fyrir grafið
    const trade = [
        {
            name: 'Trade',
            Leikmaður1: totalPoints1,
            Leikmaður2: totalPoints2,
        },
    ];

    
    var litur = '#c0bfc9';

    //Skilar mismunin
    function mismunur(a,b){
        if(a>b){
            return a-b;
        }else if(a<b){
            return b-a;
        }else{
            return 0;
        }
    }

    var heildarMismunur = mismunur(totalPoints1, totalPoints2);

    if(heildarMismunur === 0){
        litur = '#c0bfc9';
        texti = "Bættu við leikmönnum hjá báðum liðum";
    }

    if(totalPoints1> totalPoints2){
        //bara að prófa þetta
        litur = '#bbb8ff';
        texti = "Lið 1 vinnur skiptin með "+heildarMismunur+ " stigum";
    }

    if(totalPoints2> totalPoints1){
        litur = '#8be6ac';
        texti = "Lið 2 vinnur skiptin með "+heildarMismunur+ " stigum";
    }

    if(totalPoints1!=0 && heildarMismunur<1000){
        //litur ='#3c9dd1';
        litur = '#84d4ff';
        texti = "Jöfn skipti"
    }

    //Breytur fyrir box component sem ég sæki frá pakkanum material-ui
    const commonStyles = {
        //Hafa þetta frekar sem litur sem breytist dynamically eftir hvaða lið er að vinna trade-ið
        bgcolor: litur,
        borderColor: 'text.primary',
        m: 1,
        width: '70%',
        height: '4rem',
      };

    //Fylki fyrir leikmenn sem jafna út skiptin
    var playersEven = [];

    players.map(value =>{
        var player = new Player({
            label: value.name,
            value: value.points
        })

        //Bara mæla með 4 leikmönnum
        if(heildarMismunur != 0){
            if(mismunur(heildarMismunur, player.value) <= 500 && playersEven.length <5  && heildarMismunur-500 != player.value){
                playersEven.push(player);    
            }
        }
    })

    const evenItemsRow = playersEven.map((player, index) =>
        <tr key = {index}>
               <td> {player.label} </td>
               <td> {player.value} </td>
        </tr>
    );


    //Þetta er mjög messy, frekar breyta þessu í fall
    const resetPlayer1 = e =>{
        value1();
    }
    const resetPlayer2 = e =>{
        value2();
    }
    const resetPlayer3 = e =>{
        value3();
    }
    const resetPlayer4 = e =>{
        value4();
    }
    const resetPlayer5 = e =>{
        value5();
    }
    const resetPlayer6 = e =>{
        value6();
    }

    const resetAll = e=>{
        value1();
        value2();
        value3();
        value4();
        value5();
        value6();
    }


    //Smá test fyrir sleeper api
    

    //Renderar mismunandi icon eftir því hver er að vinna trade-ið
    function renderBox(){  
        if(heildarMismunur === 0){
        return(
            <Box sx={{ ...commonStyles, borderRadius: '8px'}}><div className = "borderTexti"> <div className="icon"><AddBoxIcon /> </div> {texti} </div></Box>
            );
        }
        if(totalPoints1>totalPoints2){
            return(
                <Box sx={{ ...commonStyles, borderRadius: '8px'}}><div className = "borderTexti"> <div className="icon"><ArrowBackIosIcon /> </div> {texti} </div></Box>
            );
        }
        if(totalPoints1<totalPoints2){
            return(
                <Box sx={{ ...commonStyles, borderRadius: '8px'}}><div className = "borderTexti"> <div className="icon"><KeyboardArrowRightIcon /> </div> {texti} </div></Box>
            );
        }
    }


    function renderTradeTable(){
        if(heildarMismunur != 0){
            return(
                <div className = "playersEven">
            <h4>Leikmenn til að jafna skiptin </h4>
            <table id ="players_even">
                    <tr>
                        <th>Leikmaður</th>
                        <th>Stig</th>
                    </tr>
                    {evenItemsRow}                  
            </table>
        </div>   
            );
            }
        }

    function renderTradeTol(){
        if(heildarMismunur != 0){
            return(
                <ResponsiveContainer width="50%" height={250}>
        <BarChart 
            width={500}
            height={500}
            data={trade}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Leikmaður1" fill="#8884d8" />
        <Bar dataKey="Leikmaður2" fill="#82ca9d" />                   
    </BarChart>
    </ResponsiveContainer>
            );
        }
    }

    function renderButtons(){
        if(heildarMismunur != 0){
            return(
                <div className = "ButtonsTrade">
                    <Button variant = "contained" onClick = {resetAll}>Hreinsa</Button>
                    <Button variant = "contained">Nánari greining</Button>
                </div>
            );
        }
    }
        
   

    return(
        <div className = "reiknivel">
        <div className = "teamColumn">
            <div className = "team1">
                {/*Hér er efnið sem er vinstra megin, allt fyrir lið 1*/}
                {/*Þarf þá að raða eftir row*/}

                <div className="team1Header"> <h3>Lið 1</h3> </div>
                {/*Setja þetta svo sem row, einn select list og einn text field sem heldur utan um stigið á leikmanni*/}
                <div className = "rowSelect">
                <IconButton onClick = {resetPlayer1}>
                    <ClearIcon />
                </IconButton>
                <div style={{width: '300px'}}>  <Select  options = {playersTrade} onChange= {playerHandler1} placeholder ="Leikmaður 1" value= {playersTrade.label}/>  </div>
                    <p>stig: {result1}</p>
                </div>

                <div className = "rowSelect">
                <IconButton onClick = {resetPlayer2}>
                    <ClearIcon />
                </IconButton>
                    <div style = {{width: '300px'}}><Select options = {playersTrade} onChange={playerHandler2} placeholder = "Leikmaður 2"/> </div>
                    <p>stig: {result2}</p>
                </div>

                <div className = "rowSelect">
                <IconButton onClick = {resetPlayer3}>
                    <ClearIcon />
                </IconButton>
                    <div style = {{width: '300px'}}> <Select options = {playersTrade} onChange = {playerHandler3} placeholder = "Leikmaður 3"/></div>
                    <p>stig: {result3}</p>
                </div> 
                {/*<p>Heildar stig: {totalPoints1}</p>*/}                       
            </div>
  
            <div className = "team2">
                {/*Hér er efnið sem er hægra megin, allt fyrir lið 2*/}
                <h3>Lið 2</h3>

                <div className = "rowSelect">
                <IconButton onClick = {resetPlayer4}>
                    <ClearIcon />
                </IconButton>
                    <div style={{width: '300px'}}> <Select options = {playersTrade} onChange = {playerHandler4} placeholder = "Leikmaður 1"/> </div>
                    <p>Stig: {result4}</p>
                </div>

                <div className = "rowSelect">
                <IconButton onClick = {resetPlayer5}>
                    <ClearIcon />
                </IconButton>
                    <div style= {{width: '300px'}}> <Select options = {playersTrade} onChange = {playerHandler5} placeholder = "Leikmaður 2"/></div>
                    <p>Stig: {result5}</p>
                </div>

                <div className = "rowSelect">
                <IconButton onClick = {resetPlayer6}>
                    <ClearIcon />
                </IconButton>
                    <div style = {{width: '300px'}}> <Select options = {playersTrade} onChange = {playerHandler6} placeholder = "Leikmaður 3"/> </div>
                    <p>Stig: {result6}</p>
                </div>
            </div>
        </div>

        <div className ="Trade_texti">
            {renderBox()}
            
        </div>
        <div className ="Trade_eval">
        {renderTradeTable()} 
        {renderTradeTol()}
              
        </div>
        
        {renderButtons()}
    </div>
    
    );
}

//export default Reiknivel;