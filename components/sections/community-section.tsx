import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CommunitySectionProps {
  communities?: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    href: string;
  }[];
}

const DEFAULT_COMMUNITIES = [
  {
    id: "adult",
    title: "장년부",
    description: "믿음으로 함께 세워지는 장년 공동체입니다.",
    href: "/community/adult",
  },
  {
    id: "youth",
    title: "청년부",
    description: "청년들이 함께 성장하며 나아가는 공동체입니다.",
    href: "/community/youth",
  },
  {
    id: "next",
    title: "다음세대",
    description: "다음 세대를 세우는 교육 공동체입니다.",
    href: "/community/next",
  },
  {
    id: "sunday",
    title: "주일학교",
    description: "어린이들이 하나님을 알아가는 공동체입니다.",
    href: "/community/sunday",
  },
];

export default function CommunitySection({
  communities,
}: CommunitySectionProps) {
  const list = communities ?? DEFAULT_COMMUNITIES;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            공동체 소개
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            다양한 공동체가 여러분을 기다리고 있습니다
          </p>
          <Button asChild className="mt-6">
            <Link href="/community">공동체 둘러보기</Link>
          </Button>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((community) => (
            <Link key={community.id} href={community.href}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-primary">
                    {community.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{community.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
