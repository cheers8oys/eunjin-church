import Image from "next/image";

interface PastorGreetingProps {
  name: string;
  title: string;
  greeting: string;
  imageUrl?: string;
}

export default function PastorGreeting({
  name,
  title,
  greeting,
  imageUrl,
}: PastorGreetingProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          {imageUrl && (
            <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-accent">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-2">
              {title}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              {name}
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base md:text-lg">
              {greeting}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
