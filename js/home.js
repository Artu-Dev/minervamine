const newsContainer = document.querySelector("#news-container");
const serverIP = document.querySelector("#serverIP");
const copyBtn = document.querySelector("#copyIPbtn");

const printNews = async() => {
  const response = await fetch('./noticias.json');
  const news = await response.json();
  
  news.map((noticia) => {
    newsContainer.innerHTML += `
      <div class="newsCard">
        <div class="newsCard-img">
          <img src="${noticia.img}">
          <div class="newsCard-type ${noticia.type}">${noticia.type}</div>
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


copyBtn.addEventListener('click', () => {
  const btnText = copyBtn.querySelector(".ipText");
  serverIP.select();
  document.execCommand('copy');
  btnText.textContent = "Texto copiado";
  copyBtn.classList.add('copiado');
  setTimeout(() => {
    btnText.textContent = "MinervaCraft.MC";
    copyBtn.classList.remove('copiado');
  }, 2000);
})