import ReviewCard from "@/components/MiniComp/ReviewCard";

const reviews = [
    {
        id: 1,
        name: "Sarah Mitchell",
        text: "Solid build quality and that classic clicky/tactile feel mechanical keyboards are known for. The retro two-tone keycaps look great and the layout feels sturdy with no flex. Took a day to get used to the slightly different key spacing, but typing accuracy and speed both improved once I did. Great value for a full-size mechanical board.",
        image: "/assets/reviewer/user-1.jpg",
        location: "Austin, TX"
    },
    {
        id: 2,
        name: "James Okafor",
        text: "Build feels rock solid and the switches have that satisfying tactile bump mechanical fans love. The cream and black keycaps give it a nice vintage look without feeling cheap. Adjusting to the full-size layout took a little time, but once I did, my typing felt noticeably more precise. Definitely worth it for the price.",
        image: "/assets/reviewer/user-2.jpg",
        location: "Lagos, Nigeria"
    },
    {
        id: 3,
        name: "Priya Sharma",
        text: "This keyboard has a reassuring weight and no creak or flex anywhere on the deck. The clicky switches are loud but genuinely fun to type on, and the two-tone keycaps add a nice retro touch. It took a few days to relearn key placement after switching from a laptop, but it was worth the adjustment. Great pick for daily use.",
        image: "/assets/reviewer/user-3.jpg",
        location: "Bengaluru, India"
    },
    {
        id: 4,
        name: "Daniel Kessler",
        text: "Everything about the build screams durability, from the keycaps to the base. The tactile feedback makes typing feel more deliberate and accurate compared to my old keyboard. The number pad and extra keys took some getting used to, but my speed picked up quickly. A reliable full-size option that doesn't feel overpriced.",
        image: "/assets/reviewer/user-4.jpg",
        location: "Berlin, Germany"
    }
];

const Testimonials = () => {
    return (
        <div className="py-10">
            <h3 className='capitalize text-center text-xl font-medium'>What our customers says</h3>
            <div className="mt-6 grid grid-cols-3 gap-6">
                {
                    reviews?.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                }
            </div>
        </div>
    );
};

export default Testimonials;