const connectToMongo= require('./db'); 
const cors = require('cors');
const express = require('express')
connectToMongo() ; 
const app = express()
const port = 5000

app.use(express.json()) 
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello Duniya!')
})
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`CloudNote App listening on port ${port}`)
})

