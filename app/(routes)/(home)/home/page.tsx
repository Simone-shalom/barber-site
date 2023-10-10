
import getCurrentUser from '@/actions/get-current-user'
import getListings, { getListingsParams } from '@/actions/get-listing'
import Container from '@/components/Container'
import Empty from '@/components/Empty'
import { CardWrapper } from '@/components/animations/cardWrapper'
import ListingCard from '@/components/listings/ListingCard'


interface HomeProps {
  searchParams: getListingsParams
}

export const dynamic = 'force-dynamic' 

export default async function Home({searchParams}: HomeProps) {

  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()


  if(listings.length === 0) {
    return (
      <div className='pt-6'>
          <Empty title='No listings yet' desc=''/>
      </div>

    )
  }


  return (
  <Container>
    <CardWrapper>
     <div className="pt-52 pb-5 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          ld:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
           <ListingCard data={listing} key={listing.id} currentUser={currentUser}/>
        ))}
      </div>
      </CardWrapper>
  </Container>
  )
}
