import NewMeetupForm from '../../components/meetups/NewMeetupForm'
const NewMeetupPage = () => {
	const addMeetupHandler = enteredData => {
		console.table(enteredData)
	}
	return (
		<div>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</div>
	)
}
export default NewMeetupPage
