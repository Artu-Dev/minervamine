const url = new URL(window.location.href);
const artigo = url.searchParams.get("news");

const noticiaContainer = document.querySelector('.main-article');
const title = document.querySelector('.header-titles h1');
const subtitle = document.querySelector('.header-titles h2');
const headerContainer = document.querySelector(".article-header-container");
const headerInfoContainer = document.querySelector('.header-info');
const headerImg = document.querySelector('#header-image');

fetch(`../../news/${artigo}.json`)
  .then(res => res.json())
  .then(data => PrintData(data))

const html = {
  get(element) {
    return document.querySelector(element)
  }
}

function PrintData(data) {
  document.title = "MinervaCraft | "+data.titulo;
  title.innerHTML = data.titulo;
  subtitle.innerHTML = data.subtitulo;
  headerImg.setAttribute('src', data.imagem)
  headerContainer.classList.add(data.tipo)
  noticiaContainer.innerHTML = "";


  html.get('#info-time').innerText = data.tempo_leitura;
  html.get('#info-date').innerText = data.data_publicacao;
  html.get('#info-author').innerText = data.autor;
  
  for(conteudo of data.texto) {
    if(conteudo.tipo === "paragrafo") PrintParagrafo(conteudo.conteudo);
    if(conteudo.tipo === "imagem") PrintImg(conteudo);
    if(conteudo.tipo === "titulo") PrintTitle(conteudo.conteudo);
  }
}

function PrintParagrafo(content) {
  const paragraph = document.createElement('p');
  paragraph.innerHTML = content;
  noticiaContainer.appendChild(paragraph);
}

function PrintTitle(content) {
  const title = document.createElement('h1');
  title.innerHTML = content;
  noticiaContainer.appendChild(title);
}

function PrintImg(content) {
  const imagem = document.createElement('img');
  imagem.setAttribute('src', content.url);
  imagem.setAttribute('alt', content.legenda);
  imagem.setAttribute('title', content.legenda);
  noticiaContainer.appendChild(imagem);
}



