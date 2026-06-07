async function fetchFromQuery(rssUrl) {
  const cb = Date.now();
  const encoded = encodeURIComponent(rssUrl);
  console.log("Fetching", `https://api.rss2json.com/v1/api.json?rss_url=${encoded}&_=${cb}`);
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encoded}&_=${cb}`);
  console.log(res.status, res.statusText);
  const data = await res.json();
  console.log(data.status);
}
fetchFromQuery("https://news.google.com/rss/search?q=Kenya+court+ruling+legal+when:3d&hl=en-KE&gl=KE&ceid=KE:en").catch(console.error);
