import BusinessReviews from "@/components/BusinessReviews";

async function getData(params: { id: string }) {
    const res = await fetch(`http://localhost:4000/biz/${params.id}`, { cache: 'no-store' });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }

    return res.json();
  }

export default async function BusinessDetail({ params }: { params: { id: string } }) {
    const data = await getData(params);

    return (
      <div>
        <span className="text-3xl">{data.name}</span>
        <div className="w-1/6">
          <BusinessReviews data={data}/>
        </div>
      </div>
    )
}