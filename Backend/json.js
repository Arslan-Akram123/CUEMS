const allunverisities = [
  {
    name: "mul",
    url: "https://www.mul.edu.pk/en/news-events",
    pagination: 13,
    type: "page" // standard pagination
  },
  {
    name: "fast",
    url: "https://lhr.nu.edu.pk/news/",
    type: "fast", // new type for FAST university
    selectors: {
      container: ".card-body",  // each news/event card
      title: "h5",
      link: "h5 a",
      description: "p",
      image: "img.newsImage",
      date: null // FAST doesn't show dates in the card view
    }
  },
  {
    name: "ucp",
    url: "https://ucp.edu.pk/ucp-today/",
    type: "single", // single page with all events
    selectors: {
      container: ".grid-item.ucp-today-box",  // each event block
      title: "h3 a",
      link: "h3 a",
      dateTime: ".ucp-today-metas span",
      image: "img",
      description: "p" // optional, might be empty in some events
    }
  }
];

module.exports = { allunverisities };
