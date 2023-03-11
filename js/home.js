const newsContainer = document.querySelector("#news-container");
const serverIP = document.querySelector("#serverIP");
const copyBtn = document.querySelector("#copyIPbtn");

const url = new URL(window.location.href);
let urlPage = url.searchParams.get("page");

async function getNews()  {
  const response = await fetch('./noticias.json');
  let news = await response.json();
  return news;
}

getNews()
  .then(items =>{
    const controlsContainer = document.querySelector('#paginate-numbers');
    const html = {
      get(element) {
        return controlsContainer.querySelector(element)
      }
    }

    const itemsPerPage = 6;
    const state = {
      page: (urlPage||1),
      itemsPerPage,
      totalPages: Math.ceil(items.length / itemsPerPage),
      maxNumbers: 5,
    };

    const controls = {
      next() {
        if(state.page < state.totalPages) {
          state.page++;
        }
        update();
      },
      prev() {
        state.page--;
        if(state.page < 1) state.page = 1;
        update();
      },
      goTo(page) {
        if(page > 0 && page <= state.totalPages) {
          state.page = page;
        }
        update();
      },
      addEvents() {
        html.get('.first').addEventListener('click',() => controls.goTo(1));
        html.get('.prev').addEventListener('click',() => controls.prev());
        html.get('.next').addEventListener('click',() => controls.next());
        html.get('.last').addEventListener('click',() => controls.goTo(state.totalPages));
      },
    };

    const numbers = {
      create(page) {
        const div = document.createElement('div');
        div.innerText = page;
        div.addEventListener('click', () => controls.goTo(page));
        if(page === state.page) div.classList.add('active');

        html.get('#Numbers').appendChild(div);
      },
      update() {
        html.get('#Numbers').innerHTML = "";
        
        const {maxBack, maxFront} = numbers.calculateNumbers();
        for (let i = maxBack; i < maxFront+1; i++) {
          numbers.create(i)
        }
      },
      calculateNumbers() {
        let maxFront = state.page +Math.floor(state.maxNumbers/2);
        let maxBack = state.page -Math.floor(state.maxNumbers/2);
        
        if(maxBack < 1) {
          maxBack = 1;
          maxFront = state.maxNumbers;
        }
        if(maxFront > state.totalPages) {
          maxFront = state.totalPages;
          maxBack = maxFront - state.maxNumbers+1;
          if(maxBack < 1) maxBack = 1;
        }

        return {maxBack, maxFront}
        
      }

    }

    function printNews(news) {
      newsContainer.innerHTML='';
      news.map((noticia) => {
        newsContainer.innerHTML += `
          <a class="newsCard" href="${noticia.link}">
            <div class="newsCard-img">
              <img src="${noticia.img}" loading="lazy" alt="${noticia.titulo}">
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
          </a>
        `;
      })
    }

    function print() {
      const pageNews = [];
      
      for(let i = state.page*itemsPerPage; i < itemsPerPage*(state.page+1); i++) {
        if(items[i-itemsPerPage]){
          pageNews.push(items[i-itemsPerPage]);
        }
      }
      printNews(pageNews);
    }

    function update() {
      print()
      numbers.update();
      //console.log("pagina: "+state.page)
      history.pushState(null, null, "?page="+state.page)
      window.scrollTo({top: 0, behavior: "smooth"})
    }

    function urlVerify() {
      if (urlPage >= state.totalPages) state.page = state.totalPages;
      if (urlPage <= 1 ) state.page = 1; 
    }

    function init() {
      urlVerify()
      controls.addEvents()
      update();
    }
    init()
  })
  .catch((err) => alert("Erro ao carregar as noticias!"));

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