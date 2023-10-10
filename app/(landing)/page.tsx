
import getCurrentUser from '@/actions/get-current-user'
import Container from '@/components/Container'
import Footer from '@/components/hero/Footer'
import HeroAction from '@/components/hero/HeroAction'
import HeroTop from '@/components/hero/HeroTop'
import Herobanner from '@/components/hero/Herobanner'
import Testimonials from '@/components/hero/Testimonials'


export const dynamic = 'force-dynamic' 

export default async function Landing() {

  const currentUser = await getCurrentUser()




  return (
  <Container>
    <div className='pt-28'>
    <HeroTop />
    <HeroAction />
    <Herobanner />
    <Testimonials />
    <Footer />
    </div>
  </Container>
  )
}
