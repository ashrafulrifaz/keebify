import ProductDetails from "@/components/ProductDetailsPage/ProductPagination/ProductDetails";
import ProductPagination from "@/components/ProductDetailsPage/ProductPagination/ProductPagination";


const page = async ({params}) => {
    const {slug} = await params

    return (
        <div className="px-12 py-6">
            <ProductPagination slug={slug} />
            <ProductDetails slug={slug} />
        </div>
    );
};

export default page;