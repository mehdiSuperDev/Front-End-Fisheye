export function sortMedia(type) {
    const articles = Array.from(document.querySelectorAll(".medias_section__body article"));
    let sortedArticles;
    
    switch(type) {
      case "popularité":
        sortedArticles = articles.sort((a, b) => b.getAttribute("likes") - a.getAttribute("likes"));
        break;
      case "titre":
        sortedArticles = articles.sort((a, b) => {
          const titleA = a.getAttribute("title").toUpperCase();
          const titleB = b.getAttribute("title").toUpperCase();
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        });
        break;
      case "date":
      default:
        sortedArticles = articles.sort((a, b) => b.getAttribute("likes") - a.getAttribute("likes"));
    }
    
    const mediaSection = document.querySelector(".medias_section__body");
    sortedArticles.forEach(article => mediaSection.appendChild(article));
}

function listenSelectedOptionMenu() {
    const menu = document.getElementById("menu");
    menu.addEventListener("change", () => {
        const selectedOption = menu.value;
        sortMedia(selectedOption);
    });
}

export function listenMenuEvent() {
    listenSelectedOptionMenu();
}