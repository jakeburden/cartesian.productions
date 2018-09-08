var html = require('choo/html')
var CsvFileDrop = require('../components/csv-file-drop.js')

var TITLE = 'cartesian.productions'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var csvdrop = new CsvFileDrop()

  return html`
    <body class="sans-serif lh-copy">
      <main class="pa3 ph4-l pv5-l">
        <div class="flex flex-column flex-row-l justify-around-l">
          <header class="w-100 w-25-l">
            <h1 class="code f2 fw1 lh-title bt bw2 mt0">Cartesian Productions</h1>
            <h2 class="f3 fw1 lh-title mid-gray">Just a hyperfocused tool to derive the <a class='link underline' href="https://en.wikipedia.org/wiki/Cartesian_product">Cartesian Product</a> (every combination of every item) from a set of data.</h2>
          </header>
          <section class='flex flex-column flex-row-ns justify-between-l'>
            <div class='mh3-m mh3-l w-50'>
              ${csvdrop.render(handleFiles)}
              <div class='w-100 mv4'>
                <input id='fileInput' type="file" accept=".csv" class="dn" onchange=${handleFiles}>
                <button class="f6 ba bw1 ph3 pv2 mb2 dib black bg-white b--black pointer w-100 tracked hover-bg-black hover-white" onclick=${tiggerUpload}>Click To Upload CSV</button>
              </div>
            </div>
            <div>
              <h3 class="f4 fw3 mv0">Why <a class='link underline' href='https://en.wikipedia.org/wiki/Comma-separated_values'>CSV</a>?</h3>
              <p class='lh-copy measure'>
                Most spreadsheet software such as Excel, Numbers, and Google Sheets allow you export to CSV.  This website only accepts CSV becasue it is easier for computers to work with.
                Here is an example of a CSV file where <code>drinks</code> and <code>foods</code> are headers:
                <br />
                <pre class="h-50 mv0"><code>
  drinks,foods
  coffee,avocado
  tea,burrito
                </code></pre>
              </p>
            </div>
          </section>
        </div>
        <div>
          ${renderTable(state)}
        </div>
      </main>
    </body>
  `

  function handleFiles (files) {
    if (files.target && files.target.id === 'fileInput') {
      return emit('files', files.target.files)
    }
    emit('files', files)
  }
}

function tiggerUpload () {
  var fileInput = document.getElementById('fileInput')
  fileInput.click()
}

function renderTable (state) {
  if (!state.product) return
  var results = state.product
  var table = results.map(function (product) {
    return html`
      <tr class="stripe-dark">
        ${product.map(renderItem)}
      </tr>
    `
  })

  function renderItem (item) {
    return html`
      <td class="pa3">${item}</td>
    `
  }

  function renderHeaders (header) {
    return html`<th class="fw6 tl pa3 bg-white">${header}</th>`
  }

  return html`
    <div class="overflow-auto">
      <table class="f6 w-100 mw8 center" cellspacing="0">
        <thead>
          <tr class="stripe-dark">
            ${state.headers.map(renderHeaders)}
          </tr>
        </thead>
        <tbody class="lh-copy">
          ${table}
        </tbody>
      </table>
      <h3 class="f4 fw3 mv0">Raw:</h3>
      <pre>
        <code>
${state.headers.join()}
  ${state.product.map(rows => '\n' + rows.join())}
        </code>
      </pre>
    </div>
  `
}
