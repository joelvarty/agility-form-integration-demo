
import { useEffect } from 'react'
//
import { isBrowser } from "agility/utils"
import { PrimaryButton } from "components/misc/Buttons.js";
import { Container, ContentWithPaddingLg } from "components/misc/Layouts";

const TypeFormForm = ({ customData, fields, page}) => {


	const typeFormStr = fields.typeForm
	if (! typeFormStr || typeFormStr === "") return null

	const typeFormObj = JSON.parse(typeFormStr)

	const url = `https://form.typeform.com/to/${typeFormObj.id}`
	const height = parseInt(fields.embeddedFormHeight) || 500
	const formType= fields.formType || "embed"
	const buttonText = fields.buttonText || "Start"

console.log(url)
	let typeFormPopup = null

	useEffect(() => {

		console.log(typeof window)

		if (! isBrowser) return;



		const loadForm = async () => {
console.log("Load form")
			const typeformEmbed = (await import('@typeform/embed'))

console.log({typeformEmbed})
			const options = {
				hideHeaders: true,
				hideFooter: true,
				opacity: 0,
				buttonText,
			}

			if (formType === "embed") {
				const element = document.getElementById("TypeformEmbed")
				typeformEmbed.makeWidget(element, url, options)
			} else {
				const element = document.getElementById("TypeformPopup")
				typeFormPopup = typeformEmbed.makePopup(url, options)
			}
		}

		loadForm()

	}, [])

	const openFormPopup = () => {
		typeFormPopup.open()
	}

	if (formType === "embed") {
		return (
			<section>
				<div id="TypeformEmbed" style={{height: `${height}px`}}></div>
			</section>
		)
	} else {
		return (
			<Container>
			<ContentWithPaddingLg>
					<PrimaryButton onClick={openFormPopup}>{buttonText}</PrimaryButton>
				</ContentWithPaddingLg>
			</Container>
		)
	}

}


export default TypeFormForm