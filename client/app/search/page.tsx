import BusinessCard from "@/components/BusinessCard"
import SearchMap from "@/components/SearchMap"

// pass search via params?

export default function Search(){
    const key = 1
    const img = "/assets/fillerimg.png"
    const name = 'Testaurant'
    const rating = 4.5
    const tags = ['food', 'like', 'good', 'nice']
    const highlight = "This restaurant good. Very fast and convenient. I like this place and recommend it."

    return (
        <div>
            <BusinessCard key={key} img={img} name={name} rating={rating} tags={tags} highlight={highlight} />
            <SearchMap />
        </div>
    )
}