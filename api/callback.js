import axios from "axios";

export default async function handler(req,res){

const code=req.query.code;


const resposta = await axios.post(

"https://accounts.spotify.com/api/token",

new URLSearchParams({

grant_type:"authorization_code",

code:code,

redirect_uri:process.env.SPOTIFY_REDIRECT_URI

}),

{

headers:{

"Content-Type":
"application/x-www-form-urlencoded",

Authorization:
"Basic "+
Buffer.from(

process.env.SPOTIFY_CLIENT_ID+
":"+
process.env.SPOTIFY_CLIENT_SECRET

).toString("base64")

}

}

);


const token=resposta.data.access_token;


res.redirect("/?token="+token);


}
