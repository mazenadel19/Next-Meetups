// domain.com/api/new-meetup
require('dotenv').config()

const { MongoClient } = require('mongodb')

// const uri =
// 	'mongodb+srv://Mazen:<password>@meetupscluster.xbdq8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// })
// client.connect(err => {
// 	const collection = client.db('test').collection('devices')
// 	// perform actions on the collection object
// 	client.close()
// })

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const data = req.body
		const { title, image, address, description } = data

		const client = await MongoClient.connect(process.env.DB_URL)
		// mongodb.net/Name_Of_Your_DB .. mongo will create a db with that name if it doesn't exist already

		const db = client.db()
		const meetupsCollection = db.collection('meetups') //meetups is the name for my collection table, can be anything

		const result = await meetupsCollection.insertOne({
			title,
			image,
			address,
			description,
		})
		// console.log(result)
		client.close()

		res.send(result)
	}
}

export default handler
