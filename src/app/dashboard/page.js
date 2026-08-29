import DashboardHero from "@/components/DashboardComp/DashboardHome/DashboardHero";
import InfoCards from "@/components/DashboardComp/DashboardHome/InfoCards";
import PerformanceCard from "@/components/DashboardComp/DashboardHome/PerformanceCard";
import RecentOrders from "@/components/DashboardComp/DashboardHome/RecentOrders";

const page = () => {

    return (
        <div className='px-6 py-4'>
            <DashboardHero />
            <InfoCards />
            <div className="grid grid-cols-3 gap-5 mt-5">
                <PerformanceCard />
                <RecentOrders />
            </div>
        </div>
    );
};

export default page;