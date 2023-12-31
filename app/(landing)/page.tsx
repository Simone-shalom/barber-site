import Container from "@/components/Container";
import { PageWrapper } from "@/components/animations/pageWrapper";
import AdvertBlock from "@/components/hero/AdvertBlock";
import Footer from "@/components/hero/Footer";
import HeroAction from "@/components/hero/HeroAction";
import HeroServices from "@/components/hero/HeroServices";
import HeroTop from "@/components/hero/HeroTop";
import Herobanner from "@/components/hero/Herobanner";
import Testimonials from "@/components/hero/Testimonials";

export const dynamic = "force-dynamic";

export default async function Landing() {
  return (
    <Container>
      <PageWrapper>
        <div className="pt-32">
          <div className="h-1/3 pb-10">
            <HeroTop />
          </div>
          <HeroAction />
          <Herobanner />
          <HeroServices />
          <Testimonials />
          <AdvertBlock />
          <Footer />
        </div>
      </PageWrapper>
    </Container>
  );
}
