const token = new URLSearchParams(location.search).get("token");


if(token){

Promise.all([

fetch("/api/perfil?token="+token)
.then(res=>res.json()),

fetch("/api/top?token="+token)
.then(res=>res.json()),

fetch("/api/audio?token="+token)
.then(res=>res.json()),

fetch("/api/genres?token="+token)
.then(res=>res.json())

])


.then(([perfil,top,audio,generos])=>{


let html = `

<div class="card">

<img src="${perfil.images?.[0]?.url || ''}" width="120">

<h2>${perfil.display_name}</h2>

<p>Perfil Musical</p>

</div>


<h2>🔥 Artistas mais ouvidos</h2>

`;


top.artistas.forEach(artista=>{

html += `

<div class="card">

${artista.name}

</div>

`;

});


html += `

<h2>🎵 Músicas favoritas</h2>

`;


top.musicas.forEach(musica=>{

html += `

<div class="card">

<b>${musica.name}</b>

<br>

${musica.artists[0].name}

</div>

`;

});


html += `

<h2>🧬 DNA Musical</h2>

<div class="card">

Energia: ${audio.energia}%<br>

Dança: ${audio.danca}%<br>

Acústico: ${audio.acustico}%

</div>


<h2>🎸 Gêneros principais</h2>

`;


generos.forEach(genero=>{

html += `

<div class="card">

${genero[0]}

</div>

`;

});


document.getElementById("resultado").innerHTML = html;


})


.catch(erro=>{

document.getElementById("resultado").innerHTML =
"Erro ao carregar perfil";

console.log(erro);

});


}
