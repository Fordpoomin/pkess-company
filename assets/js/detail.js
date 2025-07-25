// assets/js/detail.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  if (title) {
    document.getElementById('page-title').textContent = decodeURIComponent(title);
  }
});
