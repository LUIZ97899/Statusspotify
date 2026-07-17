import axios from "axios";

export default async function handler(req,res){

const token=req.query.token;

const dados=await axios.get(
"https://api.spotify.com/v1/me",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

res.json(dados.data);

}
