
import { useEffect } from 'react'
import tw from "twin.macro";

import { isBrowser } from "agility/utils"
import { PrimaryButton } from "components/misc/Buttons.js";
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";

const DemoContainer = tw.section`flex justify-center`

const ConsensusDemo = ({ customData, fields, page}) => {

	console.log(fields)
	const demoUrl = fields.demoURL
	const height = `${fields.height}px`
	const width = `${fields.width}px`

	useEffect(() => {

		if (! isBrowser) return;

		const loadForm = async () => {


		}

		loadForm()

	}, [])



		return (
			<Container>
			<DemoContainer>
				<iframe id="ConsensusEmbed" style={{height, width, maxWidth: "100%"}} src={demoUrl}></iframe>
			</DemoContainer>
			</Container>
		)

}


export default ConsensusDemo