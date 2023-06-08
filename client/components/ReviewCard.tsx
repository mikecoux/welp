import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ReviewCard(
    { id, username, rating, description, img, canEdit }: { id:number, username:string, rating:number, description:string, img:string, canEdit:boolean }
) {
    const [showEditForm, setShowEditForm] = useState<number>(0)

    return (
        <div className="h-fit hover:shadow-lg p-4">
            <h3 className="font-medium text-xl">{username}</h3>
            {
                {
                    0: <Review 
                        rating={rating} 
                        description={description} 
                        img={img} canEdit={canEdit} 
                        setShowEditForm={setShowEditForm}
                        />,
                    1: <ReviewEditForm 
                        rating={rating} 
                        description={description} 
                        img={img} 
                        setShowEditForm={setShowEditForm}
                        />
                } [showEditForm]
            }
        </div> 
    )
}

function ReviewEditForm (
    { rating, description, img, setShowEditForm }:
    { rating:number, description:string, img:string, setShowEditForm:any }
): JSX.Element {
    const methods = useForm({
        mode: "onSubmit",
        defaultValues: {
            rating: rating,
            description: description,
        }
    })

    const onSubmit = () => {
        console.log(methods.getValues())
        setShowEditForm(0)
    }

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-1">
            <input {...methods.register('rating')} type="text" name="rating" className="rounded outline-offset-1 w-full"/>
            <input {...methods.register('description')} type="text" name="description" className="rounded outline-offset-1 w-full"/>
            <div className="m-4 p-2">
                <Image src={img} width={200} height={200} alt="test img" />
            </div>
            <div className="flex flex-row space-x-2 h-[10%] items-center">
                <button 
                    type="submit"
                    className="bg-white rounded hover:bg-neutral-200 py-1 px-2 outline outline-1 -outline-offset-1 text-black w-[48.5%] my-1"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

function Review(
    { rating, description, img, canEdit, setShowEditForm }: 
    { rating:number, description:string, img:string, canEdit:boolean, setShowEditForm:any }
): JSX.Element {

    function deleteReview(){
        console.log('deleted')
    }

    return (
        <div className="space-y-1">
            <h5>{rating}</h5>
            <p>{description}</p>
            <div className="m-4 p-2">
                <Image src={img} width={200} height={200} alt="test img" />
            </div>
            {canEdit ?
                <div className="flex flex-row space-x-2 h-[10%] items-center">
                    <button 
                        className="bg-white rounded hover:bg-neutral-200 py-1 px-2 outline outline-1 -outline-offset-1 text-black w-1/2 h-fit"
                        onClick={() => setShowEditForm(1)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-[#DF0906] rounded text-white py-1 px-2 w-1/2 my-1 h-fit"
                        onClick={() => deleteReview()}
                    >
                        Delete
                    </button>
                </div>             
            : null
            }
        </div>
    )
}