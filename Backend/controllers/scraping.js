const ScrappedEventSchema = require("../models/scraping");
const axios = require("axios");
const cheerio = require("cheerio");
const {allunverisities} = require("../json");

const generalScraping = async () => {
  for (const uni of allunverisities) {
    console.log(`Scraping ${uni.name}...`);
    await ScrappedEventSchema.deleteMany({ name: uni.name });
    let events = [];

    if (uni.type === "page") {
      // MUL style
      for (let page = 1; page <= uni.pagination; page++) {
        const pageUrl = page === 1 ? uni.url : `${uni.url}/page/${page}`;
        try {
          const { data: html } = await axios.get(pageUrl);
          const $ = cheerio.load(html);
          $(".rbt-card.event-list-card").each((i, el) => {
            events.push({
              name: uni.name,
              title: $(el).find(".rbt-card-title a").text().trim() || null,
              link: $(el).find(".rbt-card-title a").attr("href") || null,
              date: $(el).find(".rbt-meta li").first().text().trim() || null,
              description: $(el).find("p").text().trim() || null,
              image: $(el).find(".rbt-card-img img").attr("src") || null
            });
          });
        } catch (err) {
          console.error(`Error fetching ${pageUrl}:`, err.message);
        }
      }

    } else if (uni.type === "fast") {
  // FAST/NU style
  try {
    const { data: html } = await axios.get(uni.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(html);
    
    $(uni.selectors.container).each((i, el) => {
      const $el = $(el);
      
      // Handle relative image URLs
      let imgSrc = $el.find(uni.selectors.image).attr('src');
      if (imgSrc && !imgSrc.startsWith('http')) {
        imgSrc = new URL(imgSrc, uni.url).href;
      }
      
      // Extract date from description (since it's not in a separate element)
      const description = $el.find(uni.selectors.description).text().trim();
      const dateMatch = description.match(/On (\w+, \w+ \d+, \d+)/i);
      const extractedDate = dateMatch ? dateMatch[1] : null;
      
      events.push({
        name: uni.name,
        title: $el.find(uni.selectors.title).text().trim() || null,
        link: $el.find(uni.selectors.link).attr('href') ? 
              new URL($el.find(uni.selectors.link).attr('href'), uni.url).href : 
              null,
        date: extractedDate || null,
        description: description || null,
        image: imgSrc || null
      });
    });
  } catch (err) {
    console.error(`Error fetching ${uni.url}:`, err.message);
  }
}else if (uni.type === "single") {
  // UCP style
  try {
    const { data: html } = await axios.get(uni.url);
    const $ = cheerio.load(html);
    $(uni.selectors.container).each((i, el) => {
      const $el = $(el);
      const $img = $el.find(uni.selectors.image);
      
      
      const imgSrc = 
        $img.attr('data-lazy-src') || 
        $img.attr('data-src') ||      
        $img.attr('srcset')?.split(' ')[0] || 
        $img.attr('src') ||           
        null;
      
      events.push({
        name: uni.name,
        title: $el.find(uni.selectors.title).text().trim() || null,
        link: $el.find(uni.selectors.link).attr("href") || null,
        date: $el.find(uni.selectors.dateTime).text().trim() || null,
        description: $el.find(uni.selectors.description).text().trim() || null,
        image: imgSrc
      });
    });
  } catch (err) {
    console.error(`Error fetching ${uni.url}:`, err.message);
  }
}

    if (events.length) {
      await ScrappedEventSchema.insertMany(events);
      console.log(`${events.length} events saved for ${uni.name}`);
    } else {
      console.log(`No events found for ${uni.name}`);
    }
  }
};



async function getsepcificEvents(req, res) {
    const {uniname}=req.params;
    console.log(uniname);
  try {
    // convert uniname to lowercase and schema name to lowercase
    const events = await ScrappedEventSchema.find({ name: uniname.toLowerCase() });
    // console.log(events);
    return res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching Mul events:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = { getsepcificEvents,generalScraping };