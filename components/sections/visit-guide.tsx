import { ParkingSquare, Info, Church } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GUIDES = [
  {
    icon: ParkingSquare,
    title: "주차 안내",
    description: "교회 지하 주차장을 이용하실 수 있습니다. 예배 시간 전후 2시간 무료 주차가 가능합니다.",
  },
  {
    icon: Info,
    title: "안내데스크",
    description: "1층 입구 안내데스크에서 처음 오신 분들을 위한 안내를 받으실 수 있습니다.",
  },
  {
    icon: Church,
    title: "예배 참여",
    description: "예배 시작 10분 전에 입장하시면 좌석 안내를 받으실 수 있습니다.",
  },
];

export default function VisitGuide() {
  return (
    <section className="py-16 md:py-24 bg-section-warm">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
          방문 안내
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUIDES.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <Card key={i} role="article" className="border border-gray-100 shadow-sm text-center">
                <CardHeader className="pb-2 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <CardTitle className="text-base text-primary">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">{guide.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
