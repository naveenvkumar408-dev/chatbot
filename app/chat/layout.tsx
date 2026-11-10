import { SessionRevalidation } from "@/features/auth/components/session-revalidator";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionRevalidation />
      {children}
    </>
  );
}