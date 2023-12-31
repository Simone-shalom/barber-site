import getCurrentUser from "@/actions/get-current-user";
import getListings, { getListingsParams } from "@/actions/get-listing";
import Container from "@/components/Container";
import Empty from "@/components/Empty";
import { HomeAdvert } from "@/components/HomeAdvert";
import { PageWrapper } from "@/components/animations/pageWrapper";
import ListingCard from "@/components/listings/ListingCard";
import { ADMIN_ID } from "@/permissions";
import { safeListing } from "@/types/types";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: getListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <div className="pt-6">
        <Empty title="No listings yet" desc="" />
      </div>
    );
  }

  return (
    <Container>
      <PageWrapper>
        <div className="pt-52 ">
          {currentUser?.id === ADMIN_ID ? <HomeAdvert admin /> : <HomeAdvert />}
        </div>
        <div
          className="pt-8 pb-5 gap-4 grid grid-cols-1 md:grid-cols-2 
          lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
          {listings.map((listing: safeListing) => (
            <ListingCard
              data={listing}
              key={listing.id}
              currentUser={currentUser}
            />
          ))}
        </div>
      </PageWrapper>
    </Container>
  );
}
