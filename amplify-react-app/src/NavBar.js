import React from 'react';
import {Link} from 'react-router-dom';

function NavBar(){
    return(
        
        <div className = "pages">
            <div className = "rankings">
                <Link to = "/">Rankings</Link>
            </div>
            <div className = "reiknivel">
                <Link to = "/reiknivel">Trade reiknivél</Link>
            </div>

            <div className = "playerAPI">
                <Link to = "/playerAPI">API köll</Link>
            </div>
        </div>
    );
}

export default NavBar;