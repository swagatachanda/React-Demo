import React from 'react';
import './playlist.css';

import Tracklist from '../TrackList/Tracklist';

class Playlist extends React.Component{
    constructor(props) {
      super(props)
        
      this.handlenamechange = this.handlenamechange.bind(this)
    //   this.state = {
         
    //   };
    };
    handlenamechange(event){
        this.props.onNamechange(event.target.value)
    }
    
    render(){
        return(
            <div className="Playlist">
               <input onChange={this.handlenamechange} defaultValue={"New Playlist"}></input>
               <Tracklist tracks={this.props.PlaylistTracks} isRemoval={true} onRemove={this.props.onRemove}></Tracklist>
               <button className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</button>
            </div>
        )
    }
}
export default Playlist