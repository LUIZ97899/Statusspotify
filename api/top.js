import axios from "axios";

export default async function handler(req,res){

const token=req.query.token;

const headers={
Authorization:`Bearer ${token}`
};


const artistas=await axios.get(
"https://api.spotify.com/v1/me/top/artists?limit=10",
{headers}
);


const musicas=await axios.get(
"https://api.spotify.com/v1/me/top/tracks?limit=10",
{headers}
);


res.json({

artistas:artistas.data.items,

musicas:musicas.data.items

});


}
