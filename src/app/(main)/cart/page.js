import CartItems from "@/components/CartComponents/CartItems";
import CartOrderSummary from "@/components/CartComponents/CartOrderSummary";
import CheckoutSteps from "@/components/CartComponents/CheckoutSteps";

const page = () => {
    return (
        <div className="px-12 pb-5">
            <CheckoutSteps step={1} />
            <div className="grid grid-cols-3 gap-5">
                <CartItems />
                <CartOrderSummary />
            </div>
        </div>
    );
};

export default page;