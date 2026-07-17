import axios from "axios";

export default async function handler(req,res){

const token=req.query.token;


const headers={
Authorization:`Bearer ${token}`
};


const tracks=await axios.get(
"https://api.spotify.com/v1/me/top/tracks?limit=20",
{headers}
);


const ids=tracks.data.items
.map(t=>t.id)
.join(",");


const audio=await axios.get(
`https://api.spotify.com/v1/audio-features?ids=${ids}`,
{headers}
);


let energia=0;
let danca=0;
let acustico=0;


audio.data.audio_features.forEach(a=>{

energia+=a.energy;
danca+=a.danceability;
acustico+=a.acousticness;

});


let total=audio.data.audio_features.length;


res.json({

energia:Math.round(energia/total*100),

danca:Math.round(danca/total*100),

acustico:Math.round(acustico/total*100)

});


}
