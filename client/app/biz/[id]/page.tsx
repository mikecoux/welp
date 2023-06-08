
async function getData(params: { id: string }) {
    const res = await fetch(`http://localhost:4000/biz/${params.id}`);
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
        <div>{data.name}</div>
    )
}