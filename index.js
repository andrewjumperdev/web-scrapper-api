const cheerio = require("cheerio");
const request = require("request-promise");

const url = "https://bobochicparis.com/fr/plan-du-site";

async function init() {
  
  const links = []

  const $ = await request({
    uri: url,
    transform: (body) => cheerio.load(body),
  });

  $('a').each(function(i) {
    links[i] = $(this).attr('href')
  })

  links.map((item) => {
      if(/(http|https):\/\/([^\/\r\n]+)(\/[^\r\n]*)?/.test(item)) {
        console.log(item)
      } else {
        console.log(item)
      }
  })
}

function validarURL(miurl) {
  try {
 
    new URL(miurl);
    return true;
 
  } catch (err) {
 
    return false;
 
  }
}
 
init()

