import { google } from "googleapis";
import type { Sermon } from "./types";

function getYoutube() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY is not set");
  return google.youtube({ version: "v3", auth: apiKey });
}

const CATEGORY_KEYWORDS: Record<Sermon["category"] & string, string[]> = {
  주일설교: ["주일", "sunday"],
  수요설교: ["수요", "wednesday"],
  새벽말씀: ["새벽", "dawn"],
  특별집회: ["특별", "집회", "special"],
  기타: [],
};

function detectCategory(title: string): Sermon["category"] {
  const lower = title.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === "기타") continue;
    if (keywords.some((kw) => lower.includes(kw))) {
      return category as Sermon["category"];
    }
  }
  return "기타";
}

/** 채널 최신 영상 목록 조회 */
export async function getSermons(maxResults = 50): Promise<Sermon[]> {
  const youtube = getYoutube();
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!channelId) throw new Error("YOUTUBE_CHANNEL_ID is not set");

  const res = await youtube.search.list({
    channelId,
    part: ["snippet"],
    order: "date",
    maxResults,
    type: ["video"],
  });

  return (res.data.items ?? []).map((item) => ({
    id: item.id?.videoId ?? "",
    title: item.snippet?.title ?? "",
    description: item.snippet?.description ?? "",
    thumbnail:
      item.snippet?.thumbnails?.high?.url ??
      item.snippet?.thumbnails?.default?.url ??
      "",
    publishedAt: item.snippet?.publishedAt ?? "",
    category: detectCategory(item.snippet?.title ?? ""),
  }));
}
