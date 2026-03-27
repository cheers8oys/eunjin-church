import Image from "next/image";

interface StaffGridProps {
  staff: { name: string; role: string; imageUrl?: string }[];
}

export default function StaffGrid({ staff }: StaffGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {staff.map((member, i) => (
        <div
          key={i}
          role="article"
          className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-section-warm transition-colors"
        >
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-accent/30 shrink-0">
            {member.imageUrl ? (
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">
                👤
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="font-semibold text-primary text-sm">{member.name}</p>
            <p className="text-xs text-accent mt-0.5">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
