
import getCurrentUser from '@/actions/get-current-user'
import getListings, { getListingsParams } from '@/actions/get-listing'
import Container from '@/components/Container'
import Empty from '@/components/Empty'
import { Heading } from '@/components/Heading'
import { HomeAdvert } from '@/components/HomeAdvert'
import CardSlider from '@/components/animations/cardSlidder'
import { PageWrapper } from '@/components/animations/pageWrapper'
import AdvertBlock from '@/components/hero/AdvertBlock'
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
    <PageWrapper>
    <div className='pt-52 '>
   <HomeAdvert />
    </div>
    </PageWrapper>
     <div className="pt-8 pb-5 gap-8 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 2xl:grid-cols-4">
          {listings.map((listing, index) => (
            <CardSlider index={index} key={listing.id}>
           <ListingCard data={listing} key={listing.id} currentUser={currentUser}/>
           </CardSlider>
        ))}
      </div>
  </Container>
  )
}
