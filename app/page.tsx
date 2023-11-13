import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";

import Container from "@/components/Container/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/Listing/ListingCard";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings();

  if (!listings) {
    return <EmptyState />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {listings.map((item) => (
          <ListingCard key={item.id} data={item} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
}
