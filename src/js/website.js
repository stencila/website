document.addEventListener('DOMContentLoaded', function () {
  var $burger = document.querySelector('.navbar-burger')
  var $menu = document.querySelector('.navbar-menu');
  $burger.addEventListener('click', function () {
    $burger.classList.toggle('is-active');
    $menu.classList.toggle('is-active');
  });

  docsearch({
    apiKey: '<API_KEY>',
    indexName: '<INDEX_NAME>',
    inputSelector: '#search'
  });
});
