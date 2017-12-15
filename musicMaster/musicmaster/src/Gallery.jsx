import React, {Component} from "react";
import "./App.css";

class Gallery extends Component{

    playAudio(previewURL){
        let audio = new Audio(previewURL);
        audio.play();
    }

    render(){
        console.log("Gallery props", this.props);
        const {tracks} = this.props; // Now, all the tracks are here

        return (
            <div>
                {
                    tracks.map((track, k) => {
                        console.log("track", track);
                        const trackImg = track.album.images[0].url;
                        return (
                            <div key={k} className="track" onClick={() => this.playAudio(track.preview_url)}>
                                <img src={trackImg} 
                                     alt="track" 
                                     className="track-img"
                                     
                                />
                                <p className="track-text">
                                    {track.name}
                                </p>
                            </div>
                        )
                        
                    })
                }
            </div>
            
        )
        
    }
}

export default Gallery;