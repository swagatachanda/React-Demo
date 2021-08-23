import React from 'react';
import './Track.css';
import env from 'react-dotenv'


class Track extends React.Component{
    constructor(props) {
      super(props)
    
      this.state = {
         term:""
      };
      this.addTrack=this.addTrack.bind(this)
      this.removeTrack=this.removeTrack.bind(this)
    };
    
    addTrack(event){
        this.props.onAdd(this.props.track)
    }

    removeTrack(event){
        this.props.onRemove(this.props.track)
    }

    renderAction(){
        if(this.props.isRemoval){
            return(
                <button className="Track-action" onClick={this.removeTrack}>-</button>
            )
        }
        return(
            <button className="Track-action" onClick={this.addTrack}>+</button>
        )
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>
                        {this.props.track.artist} | {this.props.track.album}
                    </p>
                    <iframe 
                        // {/* iframe allows us to very easily inject some content into the page on embedded window */}
                        src={`${env.SPOTIFY_ACCESS}` + this.props.track.id}
                        width="300"
                        height="80"
                        frameborder="0"
                        allowtransperancy="true"
                        allow="encrypted-media"
                        title="preview"
                         />
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track