import ProductPagination from "@/components/ProductDetailsPage/ProductPagination/ProductPagination";


const page = async ({params}) => {
    const {slug} = await params

    return (
        <div className="px-12 py-6">
            <ProductPagination slug={slug} />
            
        </div>
    );
};

export default page;