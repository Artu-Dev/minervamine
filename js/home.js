const newsContainer = document.querySelector("#news-container");

const printNews = async() => {
  const response = await fetch('./noticias.json');
  const news = await response.json();
  
  news.map((noticia) => {
    newsContainer.innerHTML += `
      <div class="newsCard">
        <div class="newsCard-img">
          <img src="http://lorempixel.com.br/300/300/?${noticia.id}">
        </div>
        <div class="newsCard-text">
          <div class="newsTitle">
            <h1>${noticia.titulo}</h1>
          </div>
          <div class="newsDesc">
            <p>${noticia.desc}</p>
          </div>
        </div>
        <div class="newsCard-date">${noticia.data}</div>
      </div>
    `;
  })
  
}
printNews()