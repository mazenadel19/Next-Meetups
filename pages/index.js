import { MongoClient } from 'mongodb'
import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'

const HomePage = ({ meetups }) => {
	return (
		<>
			<Head>
				<title>Next Meetup</title>
				<meta
					name='description'
					content='Browse a huge list of highly active React meetups'
				/>
			</Head>

			<MeetupList meetups={meetups} />
		</>
	)
}

/**
 * by default NEXT generate your website statically (static generation) when u build your application
 * for production so you'll have all the markup in your html not just that of the first render like
 * in case of development which is good for SEO
 * in case you need to fetch data after page is generated you will need to use `getStaticProps()`
 * in files inside of your pages folder. NEXT will wait unitl `getStaticProps` is done before
 * returning your JSX
 * the code in getStaticProps won't show up in the client side cuz it's excuted during build process
 */

// getStaticProps fetches data on when you build your website.
export async function getStaticProps() {
	// fetching data from backend

	const client = await MongoClient.connect(process.env.DB_URL)

	const db = client.db()
	const meetupsCollection = db.collection('meetups')

	const meetups = await meetupsCollection.find().toArray()

	client.close()

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.title,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
		// regenerates the page every 1 second on the server if we're fetching data
		// useful if we added more data to our database, we no longer need to rebuild our website
		// and redeploy it manually, the website will rerender and fetch this newest data from DB so
		// data on our webiste will never be outdated ....
	}
}

export default HomePage
