import getCurrentUser from "@/actions/get-current-user";
import getListingById from "@/actions/get-listingById";
import getReservations from "@/actions/get-reservations";
import ListingSingle from "@/app/(routes)/(listing)/listings/[listingId]/components/ListingSingle";
import Empty from "@/components/Empty";
import { ADMIN_ID } from "@/permissions";
import { redirect } from "next/navigation";


interface ListingParams {
    listingId?: string;
}

const ListingPage = async({params}:{params: ListingParams}) => {

    const currentUser= await getCurrentUser()
    const listing = await getListingById(params)
    const reservations = await getReservations({})

    if(currentUser?.id === ADMIN_ID){
      redirect('/mylistings')
    }


    if(!listing){
        return (
            <Empty title="No Listings yet" desc=""/>
        )
    }

  return (
    <div>
        <ListingSingle listing={listing} currentUser={currentUser}
          reservations={reservations}/>
    </div>
  )
}

export default ListingPage