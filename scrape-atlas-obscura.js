const axios = require('axios');
const cheerio = require('cheerio');
let url = 'https://www.atlasobscura.com/things-to-do/';

function scrape() {
function buildURL(country, city = null, state = null) {
  if (city) {
    url = url + city + "-";
  };
  if (state) {
    country = state;
  };
  url = url + country + "/places?";
};
buildURL("belgium");
console.log(url);

axios.get(url)
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data, null, false);
    let attractions = [];
    $('a.Card.--content-card-v2.--content-card-item.Card--flat').each(function (i, element) {
      const location = $(element).find('div.Card__hat.--place').text();
      const name = $(element).find('h3.Card__heading.--content-card-v2-title').text();
      const description = $(element).find('div.Card__content.js-subtitle-content').text();
      const image = $(element).find('img').attr('data-src');

      let card = { location, name, description, image };
      attractions.push(card);
    })
    console.log(attractions);
  });
};

// scrape();
module.exports = scrape();