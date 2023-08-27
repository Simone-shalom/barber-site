
import getListings from '@/actions/get-listing'
import Container from '@/components/Container'
import ListingCard from '@/components/listings/ListingCard'
import Image from 'next/image'

export const revalidate = 0

export default async function Home() {

  const listings = await getListings()


  if(listings.length === 0) {
    return (
      <div>
        Empty 
      </div>
    )
  }


  return (
  <Container>
     <div className="pt-48 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          ld:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
           <ListingCard data={listing} key={listing.id}/>
        ))}
      </div>
  </Container>
  )
}
