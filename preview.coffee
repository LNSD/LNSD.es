path = require('path')
express = require('express')
app = express();

build = path.join(__dirname+'/build')
app.set('port', 8080)

console.log('\n\tPreviewing folder: '+build+'\n')

app.use(express.static(build))
app.listen(app.get('port'))