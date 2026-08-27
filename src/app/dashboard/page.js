import DashboardHero from "@/components/DashboardComp/DashboardHome/DashboardHero";
import InfoCards from "@/components/DashboardComp/DashboardHome/InfoCards";

const page = () => {

    return (
        <div className='px-6 py-4'>
            <DashboardHero />
            <InfoCards />
        </div>
    );
};

export default page;