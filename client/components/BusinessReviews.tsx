'use client'

import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "./ReviewForm";
import { useState } from "react";

export default function BusinessReviews({ data }: { data:any }) {
    const [showForm, setShowForm] = useState<boolean>(false)
    const allReviewCards = data.reviews.map((review:any) => {
        return <ReviewCard
          key={review.id}
          id={review.id}
          username={review.username}
          rating={review.rating}
          description={review.description}
          img={review.img}
          canEdit={false}
        />
    })

    return (
        <div className="space-y-4">
            {!showForm ? 
                <button 
                className="bg-[#DF0906] rounded text-white py-1 px-2 w-full my-1"
                onClick={() => setShowForm(!showForm)}
                >
                Add Review
                </button> 
            : null }
            {showForm ? <ReviewForm showForm={showForm} setShowForm={setShowForm} /> : null}
            {allReviewCards}
        </div>
    )
}