import React, {Component} from "react";
import "./App.css";

class Gallery extends Component{

    constructor(props){
        super(props);

        this.state = {
            playingUrl: "",
            audio: null,
            playing: false

        }
    }

    playAudio(previewURL){
        let audio = new Audio(previewURL);
        
        if (!this.state.playing){
            audio.play();
            this.setState({
                playing: true,
                playingUrl: previewURL,
                audio
            });
        }
        else{
            if (this.state.playingUrl === previewURL){
                this.state.audio.pause();
                this.setState({
                    plaing: false
                });
            }
            else{
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewURL,
                    audio
                });
            }
        }



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

                                <div className="track-play">
                                    <div className="track-play-inner">
                                        {/* this is the play button symbol */}
                                        
                                        {
                                            this.state.playingUrl === track.preview_url
                                                ? <span>| |</span>
                                                : <span>&#9654;</span>
                                        }
                                    </div>

                                </div>


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