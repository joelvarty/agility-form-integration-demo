import truncate from 'truncate-html'

import ThreeColSlider from "components/cards/ThreeColSlider"
import React from 'react'

const ThreeColumnPanel =  ({customData, fields, page}) => {

	React.useEffect(() => {
		gtag('event', 'optimize.callback', {
			callback: (combination, experimentId, containerId) => {

			 console.log({combination, experimentId, containerId});
			 const ret = google_optimize.get(experimentId, (cbRet) => {
				 console.log("cbRet", cbRet)
			 });
			 console.log("ret", ret)
			}
		 });
	}, [])


	// const cards = [
	// 	{
	// 	  imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
	// 	  title: "Wyatt Residency",
	// 	  description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
	// 	  locationText: "Rome, Italy",
	// 	  pricingText: "USD 39/Day",
	// 	  rating: "4.8",
	// 	},
	// 	{
	// 	  imageSrc: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
	// 	  title: "Soho Paradise",
	// 	  description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
	// 	  locationText: "Ibiza, Spain",
	// 	  pricingText: "USD 50/Day",
	// 	  rating: 4.9,
	// 	},
	// 	{
	// 	  imageSrc: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
	// 	  title: "Hotel Baja",
	// 	  description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
	// 	  locationText: "Palo Alto, CA",
	// 	  pricingText: "USD 19/Day",
	// 	  rating: "5.0",
	// 	},
	// 	{
	// 	  imageSrc: "https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80",
	// 	  title: "Hudak Homes",
	// 	  description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
	// 	  locationText: "Arizona, RAK",
	// 	  pricingText: "USD 99/Day",
	// 	  rating: 4.5,
	// 	},
	//   ]

	return <ThreeColSlider { ... customData}   />
}


ThreeColumnPanel.getCustomInitialProps = async function ({agility, item, channelName, languageCode}) {


	try {

		//then get our posts
		const api = agility;

		//then get our posts
		let cardsContentList = await api.getContentList({ referenceName: item.fields.cards.referencename, languageCode });


		let cards = cardsContentList.map(c => {
			return {
				id: c.contentID,
				title: c.fields.title,
				regionTarget: c.fields.regionTarget,
				description: c.fields.description,
				imageSrc: `${c.fields.image.url}?w=400&h=400` ,
				locationText: c.fields.tagDescription,
				pricingText: c.fields.pricingText,
				rating: c.fields.rating
			}
		})

		return {
			title: item.fields.title,
			cards
		}


	} catch (error) {
		if (console) console.error(error);
	}


}

export default ThreeColumnPanel;