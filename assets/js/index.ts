const onReady = (cb) => {
  if (document.readyState !== 'loading') {
    cb(event)
  } else {
    document.addEventListener('DOMContentLoaded', cb)
  }
}

onReady(() => {
  console.log('we goooood')
})
