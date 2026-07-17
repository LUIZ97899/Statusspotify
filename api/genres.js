import axios from "axios";

export default async function handler(req,res){

const token=req.query.token;


const artistas=await axios.get(

"https://api.spotify.com/v1/me/top/artists?limit=50",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


let generos={};


artistas.data.items.forEach(artista=>{

artista.genres.forEach(g=>{

generos[g]=(generos[g]||0)+1;

});

});


const lista=Object.entries(generos)
.sort((a,b)=>b[1]-a[1])
.slice(0,10);


res.json(lista);

}
