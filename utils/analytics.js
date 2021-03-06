import ReactGA from 'react-ga'

const GA_TRACKING_ID = "UA-99380812-1"
const OPT_CONTAINER_ID = "OPT-5ZLJHVX"

export const initOptimize = (callback) => {

	const script = document.createElement('script');
    script.src = `https://www.googleoptimize.com/optimize.js?id=${OPT_CONTAINER_ID}`
    script.id = 'google-optimize';
	script.onload = callback

	document.body.appendChild(script);
}

export const initGA = () => {
  console.log('GA init')
  ReactGA.initialize(GA_TRACKING_ID)

}
export const logPageView = (url) => {
  console.log(`Logging pageview for ${url}`)
  ReactGA.set({ page: url })
  ReactGA.pageview(url)

}
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}
export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}