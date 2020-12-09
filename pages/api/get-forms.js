// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getForms from "typeform-api/get-forms"

export default async (req, res) => {

	const filter = req.query.filter ?? ""

	const forms = await getForms({filter})

  res.statusCode = 200
  res.json(forms)
}
