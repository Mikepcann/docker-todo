import express from 'express'
import  connectDb   from './db.js'
import item from './model/listItem.js'
const app = express()
const port = process.env.port || 4000

// Set all of the middleware to run the application

// Supports URL encoded bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Set the templating engine
app.set('view engine', 'ejs')

// connect to the DB
try {
	await connectDb()
} catch (error) {
	console.log(error.message)
}

app.get('/', async (req, res) => {

    try {
      const listItems = await item.find({}).select({ name: 1 })
	res.render('index', { listItems })  
    } catch (error) {
        console.log('There was an error at /')
		res.render('index', {})
    }
	
})

app.get('/test',async  (req, res) => {
try {
	const listItems = await item.find({}).select({name: 1})
	res.render('index', { listItems })
} catch (error) {
    console.log('There was an error at /test')
    res.render('index', {})
}
})

//Insert an item to the list
app.post('/insert', async (req, res) => {
	const todo = req.body.item
	console.table('This is the Item: ' + todo)
	const newListItem = await item.create({ name: todo })
    await newListItem.save()
	const listItems  = await item.find({}).select({name: 1})  
	res.render('index', { listItems })
})

// delete all items from the list
app.post('/deleteList', async(req, res) => {
	try {
        await item.deleteMany()
        await item.save()

        const listItems = await item.find({}).select({ name: 1 })
		res.render('index', { listItems })
    } catch (error) {
        console.log('There was an error at /delete')
		res.render('index', {})
    }
})

app.all('*', (req, res) => {
	app.render('error', {})
})
// run the server
app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`)
})
