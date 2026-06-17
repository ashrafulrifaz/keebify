import Header from "@/components/Header/Header";

export default function MainLayout({ children }) {
  return (
    <>
    <Header />
      <main className="min-h-[calc(100vh-397px)]">{children}</main>
    </>
  );
}