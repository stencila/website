const onReady = (cb) => {
  if (document.readyState !== 'loading') {
    cb(event)
  } else {
    document.addEventListener('DOMContentLoaded', cb)
  }
}

const toggleMobileMenu = () => {
  const toggle = document.getElementById('mobile-menu-toggle')
  const menu = document.getElementById('navbar-menu')

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('is-active')
    })
  }
}

onReady(() => {
  console.log('we goooood')
  toggleMobileMenu()
})
