const axios = require("axios");
const cheerio = require("cheerio");
function buildURL({ country, city = null, state = null }) {
  let url = "https://www.atlasobscura.com/things-to-do/";
  if (city) {
    url = url + city + "-";
  }
  if (state) {
    country = state;
  }
  url = url + country + "/places?";
  return url;
}
function getURL(search) {
  const url = buildURL(search);
  return axios.get(url);
}
function extractData(data) {
  const $ = cheerio.load(data, null, false);
  let attractions = [];
  $("a.Card.--content-card-v2.--content-card-item.Card--flat").each(function(
    i,
    element
  ) {
    const location = $(element)
      .find("div.Card__hat.--place")
      .text().trim();
    const name = $(element)
      .find("h3.Card__heading.--content-card-v2-title")
      .text().trim();
    const description = $(element)
      .find("div.Card__content.js-subtitle-content")
      .text().trim();
    const image = $(element)
      .find("img")
      .attr("data-src");
    let card = { location, name, description, image };
    attractions.push(card);
  });
  return attractions
}
// scrape();
module.exports = { getURL, extractData };