import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VisionCardsProps {
  visions: { icon?: string; title: string; description: string }[];
}

export default function VisionCards({ visions }: VisionCardsProps) {
  return (
    <section className="py-16 md:py-24 bg-section-warm">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
          비전 &amp; 핵심가치
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visions.map((v, i) => (
            <Card key={i} role="article" className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                {v.icon && (
                  <span className="text-3xl mb-2 block">{v.icon}</span>
                )}
                <CardTitle className="text-lg text-primary">{v.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
