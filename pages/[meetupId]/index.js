import MeetupDetail from '../../components/meetups/MeetupDetail'
const MeetupPage = ({ meetupData }) => {
	const { image, title, address, description } = meetupData
	return (
		<MeetupDetail
			image={image}
			title={title}
			address={address}
			description={description}
		/>
	)
}
// you need getStaticPath if you will use getStaticProps in a [dynamic page]
// since my page is created in buildtime and I'm using a path from the url, NEXT need to know all the values that I would create a page with so it would be prepared (in the build process) and deliver the page when I ask for it (deploy)
export const getStaticPaths = async () => {
	return {
		paths: [
			{
				params: { meetupId: 'm1' },
			},
			{
				params: { meetupId: 'm2' },
			},
		],
		fallback: false,
		//false => paths contain all suppported meetupIds, any other id will retur 404
		//true => will try to generete a page with this id
		//the idea is that we will have the most frequently visted pages pregenerated for us
	}
}

export const getStaticProps = async ctx => {
	// const { data } = await fetch('') // your fetch function here
	const meetupId = ctx.params.meetupId // return {meetupId: value_from_the_url }
	return {
		props: {
			meetupData: {
				id: meetupId,
				image:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
				title: 'First Meetup',
				address: 'Some Street 5, Some City',
				description: 'This is a first meetup',
			},
		},
	}
}

export default MeetupPage
