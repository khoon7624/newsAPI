let news = [];
let menus = document.querySelectorAll(".menus button");
let url;
const searchBtn = document.querySelector(".input-wrapper button");

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

const getNews = async () => {
  let header = new Headers({
    "x-api-key": "GBw8uygO-AwrHz0PrMP6Vi1R86z5iPTyqy4DnPoYm3o",
  });

  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;

  render();
};

const getLatestNews = () => {
  url = new URL(
    "https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=news&page_size=10"
  );
  getNews();
};

const getNewsByTopic = (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${topic}&countries=KR&page_size=10`
  );
  getNews();
};

const getKeywordSearch = () => {
  const searchInput = document.getElementById("search-input");
  let keyWord = searchInput.value;

  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyWord}&countries=KR&page_size=10`
  );
  getNews();
};

const openNav = () => {
  document.querySelector(".sidenav").style.width = "250px";
};

const closeNav = () => {
  document.querySelector(".sidenav").style.width = "0";
};

const searchHandler = () => {
  document
    .querySelector(".input-wrapper")
    .classList.toggle("input-event-style");
};

const render = () => {
  let newsHTML = "";
  try {
    if (news.length < 1) {
      console.log("에러 발생");
    }
  } catch (error) {
    console.log("d");
    newsHTML = `<div class="alert alert-danger" role="alert">
    No matches for your search.
  </div>`;
    document.getElementById("news-board").innerHTML = newsHTML;
  }
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
          <div class="col-lg-4">
          <img src="${
            item.media ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
          }" class="news-img-size">
        </div>
        <div class="col-lg-8">
        <h2 class="news-title">${item.title}</h2>
        <p class="news-contents">
          ${
            item.summary == null || item.summary == ""
              ? "내용없음"
              : item.summary.length > 200
              ? item.summary.substring(0, 200) + "..."
              : item.summary
          }
        </p>
        <div class="news-date">
          ${item.rights || "no source"} * ${moment(
        item.published_date
      ).fromNow()}
        </div>
      </div>
    </div>`;
    })
    .join(" ");
  document.getElementById("news-board").innerHTML = newsHTML;
};
searchBtn.addEventListener("click", () => getKeywordSearch);
getLatestNews();
