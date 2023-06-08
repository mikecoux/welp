import UserReviews from "@/components/UserReviews";

async function getData() {
    const res = await fetch('http://localhost:4000/reviews');

    if (!res.ok) {
    throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Search(){
    const data = await getData()

    return (
        <div className="flex flex-col items-center">
            <UserReviews data={data} />
        </div>
    )
}