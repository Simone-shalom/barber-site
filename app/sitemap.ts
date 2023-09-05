import getListings from "@/actions/get-listing"

export default async function sitemap() {

    const baseUrl = 'http://barber-site.vercel.app'

    const listings = await getListings({})
    const listingUrls = listings.map((listing) =>{
        return {
            url: `${baseUrl}/listings/${listing.id}`,
            lastModified: new Date()
        }
    }) ?? []

    const pages = [
        'visits', 'favourites', 'notifications', 'create', 'myreservations',
         'mylisintgs', 'panel' 
    ]
    const pagesUrls = pages.map((page) => {
        return {
            url: `${baseUrl}/${page}`,
            lastModified: new Date()
        }
    }) ?? [] 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...listingUrls,
    ...pagesUrls
  ]
}