import Header from '@/components/common/header';
import HeroSection from '@/components/home/hero-section';

export default async function Home() {
  return (
    <main className="w-full">
      <Header />
      <HeroSection />
    </main>
  );
}
