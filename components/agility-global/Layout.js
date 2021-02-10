import PreviewBar from './PreviewBar'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import tw from "twin.macro"
import ReactHtmlParser from 'react-html-parser'
import { initGA, initOptimize, logPageView } from "utils/analytics"

const MainElem = tw.main`p-8`;

import AnimationRevealPage from "helpers/AnimationRevealPage"
import Error from 'next/error'
import React, { useState, useEffect } from 'react'

function Layout(props) {
	const { page, sitemapNode, dynamicPageItem, notFound } = props

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	const router = useRouter()
	const [isGaLoaded, setIsGaLoaded] = useState(false)
	if (router.isFallback) {
		return <div>Loading page...</div>
	}

	if (notFound === true) {
		return <Error statusCode="404" />
	}

	const AgilityPageTemplate = dynamic(() => import('components/agility-pageTemplates/' + props.pageTemplateName));

	if (dynamicPageItem?.seo?.metaDescription) {
		page.seo.metaDescription = dynamicPageItem.seo.metaDescription
	}

	let metaRawHtml = null
	if (page.seo.metaHTML) {
		metaRawHtml = ReactHtmlParser(page.seo.metaHTML)
	}

	useEffect(() => {
		if (typeof (window) === undefined) return


		if (window.gtag===undefined) {

			window.gtag = function() {
				console.log("GTAG:", arguments)
				window.dataLayer.push(arguments)
			}
		}

		//run the optimize event...
		const activateOptimize = async () => {

			console.log("activate optimize")

			if (window.dataLayer) {
				if (console) console.log("Activating optimize!")

				//catch the event
				window.dataLayer.push({event: 'optimize.callback',
					callback: (w, x, y, z) => {
					 console.log("Optimize callback!", w, x, y, z);
					}
				 });

				 //initialize the experience...
				await window.dataLayer.push({ event: "optimize.activate" });

			}
		}


		const handleRouteChange = (url) => {
			logPageView(url)
			activateOptimize()
		};

		if (! isGaLoaded) {
			initGA()
			initOptimize(activateOptimize)
			setIsGaLoaded(true)
		}

		router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			if (typeof (window) === undefined) return
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	const GA_TRACKING_ID = "UA-99380812-1"
	const OPT_CONTAINER_ID = "OPT-5ZLJHVX"



	return (
		<>
			<Head>
				<title>{sitemapNode?.title} - Forms Integration Demo</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={page.seo.metaDescription} />
				<meta name="generator" content="Agility CMS" />
				<meta name="agility_timestamp" content={new Date().toLocaleString()} />
				{dynamicPageItem?.seo?.ogImage &&
					<meta property="og:image" content={dynamicPageItem.seo.ogImage} />
				}
				<link rel="stylesheet" href="/prose.css" />

				{/* <script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_TRACKING_ID}', {
							page_path: window.location.pathname,
						});`,
					}}
				/> */}
				{/* <script src={`https://www.googleoptimize.com/optimize.js?id=${OPT_CONTAINER_ID}`}></script> */}

				{metaRawHtml}

			</Head>
			<PreviewBar {...props} />

			<MainElem>
				{/* <AnimationRevealPage disabled> */}
				<GlobalHeader {...props} />
				<AgilityPageTemplate {...props} />
				<GlobalFooter {...props} />
				{/* </AnimationRevealPage> */}
			</MainElem>

		</>
	)
}

export default Layout
