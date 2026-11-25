// Latest headlines from Tuttosport's public RSS feed.
// Shows the first 3 titles in the top-left corner; clicking one opens the article.

const NEWS_FEED = "https://www.tuttosport.com/rss/calcio";
const NEWS_COUNT = 3;

// Removes any HTML tags from a title and keeps only the text.
function plainText(text) {
  return new DOMParser().parseFromString(text, "text/html").body.textContent.trim();
}

function loadNews() {
  fetch(NEWS_FEED)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("News request failed");
      }
      return response.text(); // the feed is XML text, not JSON
    })
    .then(function (xmlText) {
      // Read the XML and find the articles (<item> elements).
      const xml = new DOMParser().parseFromString(xmlText, "text/xml");
      const items = xml.querySelectorAll("item");

      const list = document.getElementById("news-list");
      list.replaceChildren();

      for (let i = 0; i < items.length && list.children.length < NEWS_COUNT; i++) {
        const title = plainText(items[i].querySelector("title").textContent);
        const link = items[i].querySelector("link").textContent.trim();

        // Safety check: only accept links to Tuttosport articles.
        if (!link.startsWith("https://www.tuttosport.com/")) {
          continue;
        }

        const item = document.createElement("li");
        const a = document.createElement("a");
        a.href = link;
        a.textContent = title; // plain text, never run as code
        item.append(a);
        list.append(item);
      }

      document.getElementById("news").hidden = list.children.length === 0;
    })
    .catch(function () {
      // No internet or feed unavailable: keep the box hidden.
      document.getElementById("news").hidden = true;
    });
}

// Load now, then refresh every 30 minutes.
loadNews();
setInterval(loadNews, 30 * 60 * 1000);
