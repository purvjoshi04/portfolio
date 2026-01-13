import FooterBar from "./components/FooterBar";
import { MainContent } from "./components/MainContent";

export default function Home() {
  return (
    <main className="w-ful">
      <section className="min-h-screen bg-linear-to-t from-neutral-900 to-transparent">
        <div className="flex items-center justify-center px-5 gap2 pt-15 pb-30">
          <MainContent />
        </div>
        <FooterBar />
      </section>
    </main>
  );
}