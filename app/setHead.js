export default function setHead(title, description, url, image) {
  document.title = title;
  document.querySelector('meta[property="og:title"]').setAttribute('content', title);
  document.querySelector('meta[name="description"]').setAttribute('content', description);
  document.querySelector('meta[property="og:description"]').setAttribute('content', description);
  document.querySelector('meta[property="og:url"]').setAttribute('content', url);
  document.querySelector('meta[property="og:image"]').setAttribute('content', image);
}
