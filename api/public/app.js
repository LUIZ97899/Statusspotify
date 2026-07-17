const token =
new URLSearchParams(location.search)
.get("token");


if(token){


Promise.all([

fetch("/api/perfil?token="+token)
.then(r=>r.json()),

fetch("/api/top?token="+token)
.then(r=>r.json()),

fetch("/api/audio?token="+token)
.then(r=>r.json()),

fetch("/api/genres?token="+token)
.then(r=>r.json())

])

.then(([perfil,top,audio,generos])=>{


let html=`

<h2>${perfil.display_name}</h2>

<img width="100" src="${perfil.images?.[0]?.url || ''}">


<h2>🔥 Top artistas</h2>

`;


top.artistas.forEach(a=>{

html+=`<p>${a.name}</p>`;

});


html+=`

<h2>🎵 Top músicas</h2>

`;


top.musicas.forEach(m=>{

html+=`<p>${m.name} - ${m.artists[0].name}</p>`;

});


html+=`

<h2>🧬 DNA musical</h2>

<p>Energia: ${audio.energia}%</p>

<p>Dança: ${audio.danca}%</p>

<p>Acústico: ${audio.acustico}%</p>


<h2>🎸 Gêneros</h2>

`;


generos.forEach(g=>{

html+=`<p>${g[0]}</p>`;

});


document.getElementById("resultado")
.innerHTML=html;


});


}
