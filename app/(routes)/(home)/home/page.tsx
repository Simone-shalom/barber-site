
import getCurrentUser from '@/actions/get-current-user'
import getListings, { getListingsParams } from '@/actions/get-listing'
import Container from '@/components/Container'
import Empty from '@/components/Empty'
import { HomeAdvert } from '@/components/HomeAdvert'
import CardSlider from '@/components/animations/cardSlidder'
import { PageWrapper } from '@/components/animations/pageWrapper'
import ListingCard from '@/components/listings/ListingCard'
import { ADMIN_ID } from '@/permissions'
import { safeListing } from '@/types/types'


interface HomeProps {
  searchParams: getListingsParams
}


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
    <PageWrapper>
    <div className='pt-52 '>
      {currentUser?.id === ADMIN_ID ? (
        <HomeAdvert admin/>
      ): (
        <HomeAdvert />
      )}
    </div>
     <div className="pt-8 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 2xl:grid-cols-4">
          {listings.map((listing: safeListing, index: number) => (
            <CardSlider index={index} key={listing.id}>
           <ListingCard data={listing} key={listing.id} currentUser={currentUser}/>
           </CardSlider>
        ))}
      </div>
      </PageWrapper>
  </Container>
  )
}
