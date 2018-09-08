var product = require('cartesian-product')

module.exports = function (self) {
  self.addEventListener('message', function (ev) {
    self.postMessage(product(ev.data))
  })
}
