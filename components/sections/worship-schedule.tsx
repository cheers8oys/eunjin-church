import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

interface WorshipScheduleProps {
  schedules: {
    name: string;
    time: string;
    location: string;
    description?: string;
  }[];
}

export default function WorshipSchedule({ schedules }: WorshipScheduleProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
          예배 안내
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedules.map((s, i) => (
            <Card key={i} role="article" className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary">{s.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={15} className="text-accent shrink-0" />
                  <span>{s.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={15} className="text-accent shrink-0" />
                  <span>{s.location}</span>
                </div>
                {s.description && (
                  <p className="text-xs text-gray-400 pt-1">{s.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
