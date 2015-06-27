express = require 'express'
app = express()
site = __dirname+'/build'

app.set 'port', 8080
app.use express.static(site)

# Handle 404
app.use (req, res) ->
  res.status(400)
  res.sendFile(site+'/404.html')

console.log('\n\tPreviewing folder: '+site+'\n')

app.listen app.get('port')
