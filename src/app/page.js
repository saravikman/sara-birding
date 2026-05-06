import { loadBirds } from '@/lib/loadBirds';
import BirdGrid from '@/components/birdGrid';

export default async function Page() {
  const birds = loadBirds();
  const total = birds.length;
  const found = birds.filter((b) => b.found).length;

  return (
    <div className="flex flex-col gap-2 py-20">
      <h1 className="text-5xl md:text-7xl font-display m-auto uppercase tracking-wide text-center">
        Mina fåglar
      </h1>
      <p className="text-3xl md:text-4xl font-display m-auto uppercase tracking-wide">
        {found}/{total}
      </p>
      <BirdGrid birds={birds} />
    </div>
  );
}
