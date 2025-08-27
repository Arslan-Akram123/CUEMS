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
     title: "a.color-nu-dark h5",        // h5 inside the a tag
     link: "a.color-nu-dark",
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
  },
  {
    name: "iub",
    url: "https://www.iub.edu.pk/events",
    pagination: 28, // total pages available
    type: "iub", // new type for IUB university
    selectors: {
      container: ".single-item-wrapper",  // each event card
      title: "h3.item-title a",
      link: "h3.item-title a",
      date: "span:has(i.fa-calendar)", // contains date
      category: "span.label a", // event category
      description: "p.item-content",
      image: ".courses-img-wrapper img"
    }
  }
];

module.exports = { allunverisities };
