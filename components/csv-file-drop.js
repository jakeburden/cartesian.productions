var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var drop = require('drag-and-drop-files')

class CsvFileDrop extends Nanocomponent {
  createElement (cb) {
    this.cb = cb
    return html`
      <div class='mw5 mw7-ns center bg-light-gray pa3 ph5-l ma0 tc grow'>
        <p class='f1 lh-copy measure mv0'>📥</p>
        <p class='f4 lh-copy measure center'>Drop your CSV file here.</p>
      </div>
    `
  }

  update () {
    return false
  }

  load () {
    drop(this.element, function (files) {
      if (typeof this.cb === 'function') return this.cb(files)
    }.bind(this))
  }
}

module.exports = CsvFileDrop
