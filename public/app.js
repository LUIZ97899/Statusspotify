const token =
new URLSearchParams(location.search)
.get("token");


if(token){

document.getElementById("resultado")
.innerHTML =
"<h2>Spotify conectado!</h2>";

}
