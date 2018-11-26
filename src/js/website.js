document.addEventListener('DOMContentLoaded', function () {
  var $burger = document.querySelector('.navbar-burger')
  var $menu = document.querySelector('.navbar-menu');
  $burger.addEventListener('click', function () {
    $burger.classList.toggle('is-active');
    $menu.classList.toggle('is-active');
  });

  /*
  Search temporarily disabled. See issue #2
  docsearch({
    apiKey: '<API_KEY>',
    indexName: '<INDEX_NAME>',
    inputSelector: '#search'
  });
  */

  /**
   * ￼Fix top navbar on scroll
   **/
  var waypoint = new Waypoint({
      element: document.getElementById('body'),
      handler: function(direction) {
          document.getElementById('main-navigation').classList.toggle('is-active');
      },
      offset: -200
  })
});
