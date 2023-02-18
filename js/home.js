const newsContainer = document.querySelector("#news-container");

const printNews = async() => {
  const response = await fetch('./noticias.json');
  const news = await response.json();
  
  news.map((noticia) => {
    newsContainer.innerHTML += `
      <div class="newsCard">
        <div class="newsCard-img"></div>
        <div class="newsTitle">
          <h1>${noticia.titulo}</h1>
        </div>
        <div class="newsDesc">
          <p>${noticia.desc}</p>
        </div>
      </div>
    `;
  })
  
}
printNews()