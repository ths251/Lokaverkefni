import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function PlayerAPI(){
    /*
    const sleeper_package = require('sleeper_fantasy');
    const fs = require('fs');

    (async () => {
    const sleeper_instance = new sleeper_package.sleeper();
    await sleeper_instance.players.fetch_all_players();
    //for(var i = 0;i<fetch_all_players.len)
    //console.log(sleeper_instance.players.all_players);
    const players = [];
    
    })();


    //hér verður til þess að stimpla inn league id
    (async () => {
        const sleeper_instance = new sleeper_package.sleeper();
        const league_ids = [`649937441549017088`];

        sleeper_instance.leagues = league_ids;
        

        await sleeper_instance.leagues[league_ids[0]].fetch_rosters();
        //console.log(sleeper_instance.leagues[league_ids[0]].rosters);
        })();
        */
    
    //Vill hafa textfeild þar sem notandi getur sett inn sleeper notendanafn eða id og birtir allar deildir sem hann er í
    //Svo er hægt að smella á deildina til að skoða leikmennina
    //Þarf þá að geyma leikmennina sem id og loopa í gegnum leikmenna query-ið
    //Geyma þá svo sem fylki og mappa það

    const [value, setValue] = useState("");
    const handleChange = e=>{
        //Tengja nafnið við user breytuna
        setValue(e.target.value);
    }

    //var leagues;
    //Sækja deildir eftir ID
    //Pakki fyrir sleeper apann
    const sleeper_package = require('sleeper_fantasy');
    const fs = require('fs');
    var leagues;

    (async () => {
        const sleeper_instance = new sleeper_package.sleeper();
        const usernames = [`${value}`];
        sleeper_instance.users = usernames;
        await Promise.all(sleeper_instance.user_promises);
        
        await sleeper_instance.users[usernames[0]].fetch_leagues(2021);
        //VISTA Í TÖFLU!
        //League tafla sem er með one-to-many tengingu við userinn
        leagues = sleeper_instance.users[usernames[0]].leagues;
        })();

    const handleLeagues = e =>{
        (async () => {
            const sleeper_instance = new sleeper_package.sleeper();
            const usernames = [`${value}`];
            sleeper_instance.users = usernames;
            await Promise.all(sleeper_instance.user_promises);
            
            await sleeper_instance.users[usernames[0]].fetch_leagues(2021);
            //VISTA Í TÖFLU!
            //League tafla sem er með one-to-many tengingu við userinn
            //leagues[0].name nafn á deild t.d
            leagues = sleeper_instance.users[usernames[0]].leagues;
            console.log(leagues[0].name);
        console.log(leagues[1].name);
        console.log(leagues[2].name);
            //console.log(leagues[0].name);
    
            })();
    }




    return(
        <div className = "playerAPI">
            <h3>Hér er ég að prófa API köll frá sleeper fantasy apanum</h3>
            <div className = "textFields">
                    <div className="user_name">
                        <TextField id="outlined-basic" style = {{height: 20}} placeholder ="Sláðu inn Sleeper notendanafn" variant="outlined" value ={value} onChange={handleChange}/>
                        <div className = "button_user">
                            <Button variant="contained" style={{ height: 50, width: 150}}  onClick ={handleLeagues}>Skoða deildir</Button>
                        </div>
                    </div>
            </div>

            {/*Svo hér kemur mapping af deildum*/}
            {/*Skoða leikmenn í deildinni ofl*/}
            {/*Hugsanlega að hafa accordion hérna*/}
        </div>
        
    );
}

export default PlayerAPI;