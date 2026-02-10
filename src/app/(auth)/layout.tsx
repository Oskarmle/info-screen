export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen" suppressHydrationWarning>
      <main className="w-full flex  h-auto bg-background rounded-lg">
        {children}
      </main>
    </div>
  );
}
