import Image from "next/image";

interface PastorCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export default function PastorCard({ name, role, bio, imageUrl }: PastorCardProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col items-center gap-6 p-8 md:p-12">
        {imageUrl && (
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-accent shrink-0">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
        )}
        <div className="text-center">
          <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-1">
            {role}
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">{name}</h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
