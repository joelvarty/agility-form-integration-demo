import truncate from 'truncate-html'

import ThreeColSlider from "components/cards/ThreeColSlider"
import React from 'react'
import { load } from '@agility/content-sync'

const ThreeColumnPanel =  ({customData, fields, page}) => {
	const [variant, setVariant] = React.useState(-1)
	const [cards, setCards] = React.useState([])

	React.useEffect(() => {
		if (typeof (window) === undefined) return
		const loadExperiment = () => {

			if (window.google_optimize === undefined) {
				setTimeout(loadExperiment, 50)
				return
			}

			console.log("checking for experiments")
			const variantIndex = window.google_optimize.get(customData.experimentID)
	  		console.log({variantIndex})
			if (variantIndex > 0) {
				const filteredCards = customData.cards.filter(c => c.variant == variantIndex)
				setCards(filteredCards)
			} else {
				setCards(customData.cards)
			}
		}

		setTimeout(loadExperiment, 0)

	}, [])


	if (variant < 0) {
		return <ThreeColSlider title={customData.title} cards={cards}  />
	}
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
				variant: c.fields.variant,
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
			experimentID: item.fields.experimentID || null,
			cards
		}


	} catch (error) {
		if (console) console.error(error);
	}


}

export default ThreeColumnPanel;