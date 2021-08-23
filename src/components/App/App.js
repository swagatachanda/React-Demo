// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Playlist from '../Playlist/playlist.js';
import Searchbar from '../Searchbar/searchbar.js'
import Searchresults from '../SearchResults/searchresults.js';
import Spotify from '../../util/Spotify';
// import { render } from '@testing-library/react';
// import { map } from 'async';




class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       SearchResults: [],
       PlaylistName: "New Playlist",
       PlaylistTracks: []
    };
  
    this.search = this.search.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.removeTrackSearch = this.removeTrackSearch.bind(this)
    this.doThese = this.doThese.bind(this)
  };


  search(term){
    Spotify.search(term).then(SearchResults => {
      this.setState({SearchResults: SearchResults})
    })
  }


  addTrack(track){
    let tracks = this.state.PlaylistTracks
    if(tracks.find(savedTrack => 
      savedTrack.id === track.id
    ))
    {
      return
    }
    tracks.push(track)
    this.setState({PlaylistTracks: tracks})
  }


  removeTrack(track){
    let tracks = this.state.PlaylistTracks
    let Searchtrack = this.state.SearchResults
    tracks=tracks.filter(currentTrack => currentTrack.id !== track.id)
    Searchtrack.unshift(track)
    this.setState({PlaylistTracks: tracks})
  }


  removeTrackSearch(track){
    let tracks = this.state.SearchResults
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({SearchResults: tracks})
  }

  doThese(track){
    this.addTrack(track)
    this.removeTrackSearch(track)
  }

  updatePlaylistName(name){
    this.setState({updatePlaylistName: name})
  }

  savePlaylist(){
    const trackUris = this.state.PlaylistTracks.map(item=>item.uri)
    Spotify.savePlaylist(this.state.PlaylistName, trackUris).then(()=>{
      this.setState({
        updatePlaylistName: "New Playlist",
        PlaylistTracks:[]
      })
    })
  }

  render(){
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div>
        <h1>
          <a href="https://spotify.herokuapp.com/">Musicophile</a>
        </h1>
        <div className="App">
          <Searchbar onSearch={this.search}/>
          <div className="App-playlist">
            <Searchresults SearchResults={this.state.SearchResults} onAdd={this.doThese}/>
            <Playlist PlaylistTracks={this.state.PlaylistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

}

// function App() {
  
  
// }

export default App;
