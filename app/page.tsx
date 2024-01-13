import Image from "next/image";
import Provider from "./Provider";
import LandingPage from "./LandingPage/page";
export default function Home() {
  return (
    <main className="flex min-h-screen bg-black">
      <LandingPage />
    </main>
  );
}
