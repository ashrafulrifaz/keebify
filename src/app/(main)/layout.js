export default function MainLayout({ children }) {
  return (
    <>
      <main className="min-h-[calc(100vh-397px)]">{children}</main>
    </>
  );
}