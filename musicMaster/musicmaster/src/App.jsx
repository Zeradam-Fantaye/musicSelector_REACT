import React, {Component} from "react";
import "./App.css";
import {FormGroup, FormControl, InputGroup, Glyphicon} from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: "", 
            artist: null,
            tracks: []
        }
    }

    search(){
        
        // the question mark initializes query parameters to come after
        const BASE_URL = "https://api.spotify.com/v1/search?";
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;   // ` is called the back ticks
        const ALBUM_URL = "https://api.spotify.com/v1/artists/";

        var accessToken = "BQDIEEmJkkeJy8RJqdIiArToPMM_hSt1GTglrwhgq1EW2inISgM0at15mUXn3jTWuLjFeGjmODxKTVkEyLwctti7uHN58YlQhSo7siBgUPPs1jFuY5uk4ucJGaP5o2sLjt1ZEA8hb3liqvHLnvqYjB4rel-7xr6MgnPXUt0iJESucIfePC6aNQ&refresh_token=AQAmyjNTNoSYWEqn5WQpuIz8-yewsUnzOtejUBQsEzzzqEjzUmicRsr3G8yTnrPR01kHb4Xf-QvMR4boT7UVj3DDqYCTPsb_JNT1i8juEUY03UnYyUtupLaBoqoynfBm8_s";
        
        var myOptions = {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
          };
      
        //The fetch method in JavaScript returns a promise. A promise in JavaScript is simply a code returned by a function which represents data that may have availability now, in the future, or never at all. 

        //The .then statement is a callback function. This statement will work on the promise code returned by the fetch function.
        
        //It is when we do response.json() that we will have a file similar to the endpoint search. 

        //=> is the anonymous arrow function. It is ES6 stuff
        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                console.log("json", json);
                const artist = json.artists.items[0]
                this.setState({
                    artist: artist
                });

                //console.log("json.artists.items[0]", json.artists.items[0]);

                FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;

                fetch(FETCH_URL, myOptions)
                    .then(response => response.json())
                    .then(json => {
                        console.log("artist's top tracks: ", json);
                        const {tracks} = json;
                        this.setState({
                            tracks
                        })
                    })

            })

        console.log("FETCH_URL = ", FETCH_URL);
        
    }

    render(){
       return(
           <div className="App">

                <div className="App-title">Music Master</div>

                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"                                     
                            placeholder="Search for an artist ... "
                            value={this.state.query}
                            onChange={event => {this.setState({
                                query: event.target.value
                            })}}
                            onKeyPress={event => {
                                if(event.key === "Enter")
                                    this.search();
                            }}
                        
                        />
                            
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search">  
                            </Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>  
                    
                </FormGroup>


                {/* Here it is must for us to use ternary operator to implement the functionality. We wanted to display only when there is an artist in our state */}

                {
                    (this.state.artist !== null) ?
                    <div>
                        {
                        /* Let's give the Profile some props */
                        }
                        <Profile
                                Prof_artist = {this.state.artist}
                        />

                        <Gallery 
                            tracks={this.state.tracks}
                        
                        />
                    </div>

                    : <div></div>
                
                }
                

           </div>
           
       )
    }
}

export default App;