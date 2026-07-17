const token = new URLSearchParams(location.search).get("token");


if(token){

Promise.all([

fetch("/api/perfil?token="+token)
.then(res=>res.json()),

fetch("/api/top?token="+token)
.then(res=>res.json())

])


.then(([perfil,top])=>{


let html = `

<div class="card">

<img width="120" src="${perfil.images?.[0]?.url || ''}">

<h2>${perfil.display_name}</h2>

<p>Seu Perfil Musical</p>

</div>


<h2>🔥 Artistas mais ouvidos</h2>

`;


top.artistas.forEach(a=>{

html += `

<div class="card">

${a.name}

</div>

`;

});


html += `

<h2>🎵 Músicas favoritas</h2>

`;


top.musicas.forEach(m=>{

html += `

<div class="card">

<b>${m.name}</b>

<br>

${m.artists[0].name}

</div>

`;

});


document.getElementById("resultado").innerHTML = html;


})


.catch(erro=>{

console.log(erro);

document.getElementById("resultado").innerHTML =
"Erro ao carregar perfil";

});


}
