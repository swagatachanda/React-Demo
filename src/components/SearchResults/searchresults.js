import React from 'react';
import './searchresults.css';

import Tracklist from '../TrackList/Tracklist';

class Searchresults extends React.Component{
    render(){
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist tracks={this.props.SearchResults} onAdd={this.props.onAdd}></Tracklist> 
            </div>
        )
    }
}
export default Searchresults