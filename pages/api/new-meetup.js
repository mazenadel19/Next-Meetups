// domain.com/api/new-meetup
const { MongoClient } = require('mongodb')



const handler = async (req, res) => {
	if (req.method === 'POST') {
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
		console.log(result)
		client.close()

		res.status(201).json({ message: 'Meetup inserted!' })

	}
}

export default handler
