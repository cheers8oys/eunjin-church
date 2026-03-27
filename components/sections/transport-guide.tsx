import { Bus, TrainFront, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TRANSPORTS = [
  {
    icon: Bus,
    title: "버스",
    description: "72번, 138번 버스 승차 후 '은진교회' 정류장 하차.",
  },
  {
    icon: TrainFront,
    title: "지하철",
    description: "1호선 의정부역 1번 출구에서 도보 10분.",
  },
  {
    icon: Car,
    title: "자가용",
    description: "내비게이션에 '은진교회' 검색 후 지하 주차장 이용.",
  },
];

export default function TransportGuide() {
  return (
    <section className="py-16 md:py-24 bg-section-warm">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
          오시는 길
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRANSPORTS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Card key={i} className="border border-gray-100 shadow-sm text-center">
                <CardHeader className="pb-2 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <CardTitle className="text-base text-primary">{t.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
