import Header from "./components/header";
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { ModalProvider } from "./providers/modalProvider";
import { redirect } from "next/navigation";

export default async function Adresses() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/")
  }

  return (
    <ModalProvider>
      <main className="flex flex-col justify-start min-h-[calc(100vh-90px)] bg-zinc-900">
        <Header />
      </main>
    </ModalProvider>
  );
}
