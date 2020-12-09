import axios from "axios"

const getForms = async ({filter}) => {


	try {

		const token = process.env.TYPEFORM_TOKEN
		const config = {
			method: 'get',
			url: `https://api.typeform.com/forms?page_size=200&search=${filter}`,
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};

		const axiosRes = await axios(config)

		return axiosRes.data

	} catch (e) {

		throw new Error("An error occurred getting the forms: " + e)

	}
}

export default getForms