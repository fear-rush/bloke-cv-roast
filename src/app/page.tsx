import { Header } from "@/components/Header";
import { Upload } from "@/components/Upload";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 flex items-center justify-center">
        <Upload />
      </main>
      <Footer />
    </div>
  );
}
