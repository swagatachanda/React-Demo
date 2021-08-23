
import env from "react-dotenv";

const clientId = env.CLIENT_ID;
const redirectUri=`http://localhost:3000/`;
var accessToken

const Spotify={
    getaccessToken(){
        if(accessToken){
            return accessToken;
        }
        const accesstokenMatch=window.location.href.match(/access_token=([^&]*)/)
        const expiresinMatch = window.location.href.match(/expires_in=([^&]*)/)
        if(accesstokenMatch && expiresinMatch){
            accessToken=accesstokenMatch[1]
            const expiresIn = Number(expiresinMatch[1])
            window.setTimeout(()=>(accessToken=""),expiresIn*1000)
            window.history.pushState("Access Token", null, "/")
            return accessToken
        }
        else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location=accessUrl
        }
    },
    search(term){
        const accessToken = Spotify.getaccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
        }).then(response=>{
            return response.json()
        })
        // .then((jsonResponse)=>{
        //     return jsonResponse.json()
        // })
        .then(jsonResponse=>{
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map((track)=>({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
                
                }))
        })
    },
    savePlaylist(name, trackUris){
        if(!name || !trackUris.length){
            return;
        }
        const accessToken = Spotify.getaccessToken()
        const headers={
            Authorization: `Bearer ${accessToken}`
        }
        var userId
        return fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then(response=>{
            response.json()
        })
        .then(jsonResponse=>{
            userId=env.USERID
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                headers: headers,
                method: "POST",
                body: JSON.stringify({name: name})
            })
            .then(response=>response.json())
            .then(jsonResponse=>{
                const playlistId = jsonResponse.id
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({uris: trackUris})

                })
            })
        })
    }
}
export default Spotify