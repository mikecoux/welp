import BusinessCard from "@/components/BusinessCard"

export default function Search(){
    const img = "/assets/fillerimg.png"
    const name = 'Testaurant'
    const rating = '4.5'
    const tags = ['food', 'like', 'good', 'nice']
    const highlight = "This restaurant good. Very fast and convenient. I like this place and recommend it."

    return (
        <div>
            <BusinessCard img={img} name={name} rating={rating} tags={tags} highlight={highlight} />
        </div>
    )
}