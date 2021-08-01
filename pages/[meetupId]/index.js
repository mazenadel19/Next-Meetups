import { useRouter } from 'next/dist/client/router'

const MeetupPage = () => {
	const router = useRouter()
	const meetupId = router.query.meetupId

	return <>{meetupId}</>
}

export default MeetupPage
