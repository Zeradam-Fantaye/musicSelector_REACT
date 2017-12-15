import React, {Component} from "react";
import "./App.css";

class Profile extends Component{
    render(){

        let artist_prof = {
            name: "",
            followers: {
                total: 0
            },
            images: [{
                url: ""
            }],
            genres: []
        };

        if (this.props.Prof_artist !== null){
            //console.log("this.props.Prof_artist", this.props.Prof_artist);
            artist_prof = this.props.Prof_artist;
        }

        return (
            
            <div className="Profile">
                <img src={artist_prof.images[0].url}   
                     alt="Profile"
                     className="profile-img"
                /> 

                <div className="profile-info">

                    <div className="profile-name">{artist_prof.name}</div>
                    <div className="profile-followers">{artist_prof.followers.total} followers</div>
                    <div className="profile-genres">
                        {
                            artist_prof.genres.map((genre, k) => {

                                if (genre === artist_prof.genres[artist_prof.genres.length - 1]){
                                    genre = ` &${genre}`;
                                }else{
                                    genre = `${genre}, `;
                                }

                                return (
                                    <span key={k}>{genre}</span>
                                )
                            })

                        }
                    </div>

                </div>
            </div>
        )
    }
        
}

export default Profile;

