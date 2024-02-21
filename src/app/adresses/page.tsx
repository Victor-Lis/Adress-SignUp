import Header from "./components/header";
import { ModalProvider } from "./providers/modalProvider";

export default function Adresses() {
  return (
    <ModalProvider>
      <main className="flex flex-col justify-start min-h-[calc(100vh-90px)] bg-zinc-900">
        <Header />
      </main>
    </ModalProvider>
  );
}
