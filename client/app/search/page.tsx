import BusinessCard from "@/components/BusinessCard"
import SearchMap from "@/components/SearchMap"

async function getData() {
    const res = await fetch('http://localhost:4000/biz');

    if (!res.ok) {
    throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Search(){
    const data = await getData()

    const allBizCards = data.map((biz: any) => {
        return <BusinessCard 
                    key={biz.id} 
                    id={biz.id} 
                    img={biz.img} 
                    name={biz.name} 
                    rating={biz.rating} 
                    tags={biz.tags} 
                    highlight={biz.highlight} 
                />
    })

    return (
        <div className="flex flex-row justify-end space-x-12">
            <div className="flex flex-col w-[60%] space-y-4">
                {allBizCards}
            </div>
            <SearchMap />
        </div>
    )
}