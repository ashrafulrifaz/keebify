import CartContainer from "@/components/CartComponents/CartContainer";
import CheckoutSteps from "@/components/CartComponents/CheckoutSteps";

const page = () => {
    return (
        <div className="px-12 pb-5">
            <CheckoutSteps step={1} />
            <CartContainer />
        </div>
    );
};

export default page;