import React from 'react';
import './tracklist.css';

import Track from '../Track/Track';

class Tracklist extends React.Component{
    render(){
        return(
            <div className="Tracklist">
                {this.props.tracks.map((item)=>{
                    return(
                        <Track 
                        track={item}
                        key={item.id}
                        onAdd={this.props.onAdd}
                        isRemoval={this.props.isRemoval}
                        onRemove={this.props.onRemove}></Track>
                    )
                })}
            </div>
        )
    }
}
export default Tracklist
