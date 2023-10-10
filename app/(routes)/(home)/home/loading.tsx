import Container from "@/components/Container"
import { Skeleton } from "@/components/ui/skeleton"


const Loading = () => {
  return (
    <Container>
        <div className="pt-52 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          ld:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
        </div>
    </Container>
  )
}

export default Loading