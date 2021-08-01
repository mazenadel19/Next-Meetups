import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
		address: 'Some address 5, 12345 Some City',
		description: 'This is a first meetup!',
	},
	{
		id: 'm2',
		title: 'A Second Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
		address: 'Some address 10, 12345 Some City',
		description: 'This is a second meetup!',
	},
]

const HomePage = ({ meetups }) => {
	return (
		<>
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

export async function getStaticProps() {
	// fetching data from backend
	return {
		props: {
			meetups: DUMMY_MEETUPS,
		},
		revalidate: 1,
		// regenerates the page every 1 second on the server if we're fetching data
		// useful if we added more data to our database, we no longer need to rebuild our website
		// and redeploy it manually, the website will rerender and fetch this newest data from DB so
		// data on our webiste will never be outdated ....
	}
}

export default HomePage
