'use client'

import ReviewCard from "@/components/ReviewCard";

export default function UserReviews({ data }: { data:any }) {
    const allReviewCards = data.map((review:any) => {
        return <ReviewCard
          key={review.id}
          id={review.id}
          username={review.username}
          rating={review.rating}
          description={review.description}
          img={review.img}
          canEdit={true}
        />
    })

    return (
        <div className="space-y-4 w-1/6">
            <h3 className="text-center text-[#DF0906] font-medium text-2xl">Your Reviews</h3>
            {allReviewCards}
        </div>
    )
}