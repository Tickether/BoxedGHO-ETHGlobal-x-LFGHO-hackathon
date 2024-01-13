import Image from "next/image";
import LandingPage from "./LandingPage/page";
export default function Home() {
  return (
    <main className="flex min-h-screen bg-black">
      <LandingPage />
    </main>
  );
}
