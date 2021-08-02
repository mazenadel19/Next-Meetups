import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
	const router = useRouter()

	const addMeetupHandler = async enteredData => {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		console.log('data', data)
		router.push('/')
	}
	return (
		<>
			<Head>
				<title>Add new Meetup</title>
				<meta
					name='description'
					content='Add your own meetup to our list of amazing events'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	)
}
export default NewMeetupPage
