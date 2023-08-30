import getCurrentUser from "@/actions/get-current-user";
import getListingById from "@/actions/get-listingById";
import ListingSingle from "@/app/(routes)/(listing)/listings/[listingId]/components/ListingSingle";


interface ListingParams {
    listingId?: string;
}

const ListingPage = async({params}:{params: ListingParams}) => {

    const currentUser= await getCurrentUser()
    const listing = await getListingById(params)


    if (!currentUser) {
        return (
          <div>
            Unauthenticated
          </div>
        );
      }

    if(!listing){
        return (
            <div>
            No listings found
            </div>
        )
    }

  return (
    <div>
        <ListingSingle listing={listing} currentUser={currentUser}/>
    </div>
  )
}

export default ListingPage