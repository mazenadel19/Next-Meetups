import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupPage = ({ meetupData }) => {
	const { image, title, address, description } = meetupData
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
			</Head>
			<MeetupDetail
				image={image}
				title={title}
				address={address}
				description={description}
			/>
		</>
	)
}
// you need getStaticPath if you will use getStaticProps in a [dynamic page]
// since my page is created in buildtime and I'm using a path from the url, NEXT need to know all the values that I would create a page with so it would be prepared (in the build process) and deliver the page when I ask for it (deploy)
export const getStaticPaths = async () => {
	const client = await MongoClient.connect(process.env.DB_URL)

	const db = client.db()
	const meetupsCollection = db.collection('meetups')

	const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray() // returns only _id field
	client.close()
	return {
		paths: meetups.map(meetup => ({
			params: { meetupId: meetup._id.toString() },
		})),
		fallback: 'blocking',
		//false => paths contain all suppported meetupIds, any other id will retur 404
		//true/blocking => will try to generete a page with this id
		//the idea is that we will have the most frequently visted pages pregenerated for us
		// true generates empty page then add content once it's done
		// blocking wait till everything is surved and ready then show content to the user
	}
}

export const getStaticProps = async ctx => {
	// const { data } = await fetch('') // your fetch function here
	const meetupId = ctx.params.meetupId // return {meetupId: value_from_the_url }

	const client = await MongoClient.connect(process.env.DB_URL)
	const db = client.db()

	const meetupsCollection = db.collection('meetups')

	// const selectedMeetup = await meetupsCollection.find().toArray()
	const selectedMeetup = await meetupsCollection.findOne({
		_id: ObjectId(meetupId),
	})

	console.log(selectedMeetup)
	client.close()

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				address: selectedMeetup.address,
				image: selectedMeetup.image,
				description: selectedMeetup.description,
			},
		},
	}
}

export default MeetupPage
