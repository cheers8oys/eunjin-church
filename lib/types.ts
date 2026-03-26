// ── 설교/미디어 ──────────────────────────────────────
export interface Sermon {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  category?: "주일설교" | "수요설교" | "새벽말씀" | "특별집회" | "기타";
}

// ── 주보 ──────────────────────────────────────────────
export interface Bulletin {
  id: string;
  name: string;          // 파일명 (주보_YYYY-MM-DD.pdf)
  date: string;          // YYYY-MM-DD
  fileId: string;        // Drive file ID
  webContentLink: string;
}

// ── 갤러리 ────────────────────────────────────────────
export interface Photo {
  id: string;
  name: string;
  thumbnailLink: string;
  webContentLink: string;
}

export interface Album {
  id: string;            // Drive folder ID
  name: string;          // YYYY-MM-DD_행사명
  date: string;          // YYYY-MM-DD
  coverImage?: string;   // 첫 번째 사진 thumbnailLink
  photoCount: number;
}

// ── 스태프 ────────────────────────────────────────────
export interface StaffMember {
  name: string;
  role: string;          // 직분 (담임목사, 부목사 등)
  ministry?: string;     // 담당사역
  photoUrl?: string;
  bio?: string;          // 약력 (담임목사만)
  greeting?: string;     // 인사말 (담임목사만)
}

// ── 공동체 ────────────────────────────────────────────
export type CommunityType = "senior" | "youth" | "nextgen" | "sunday-school";

export interface Community {
  type: CommunityType;
  name: string;
  description: string;
  schedule: string;      // 모임 일정 텍스트
  leader?: string;       // 담당자
  photoUrl?: string;
  gallery?: Photo[];
}

// ── 히어로 설정 ───────────────────────────────────────
export interface HeroConfig {
  sermonTitle: string;
  bibleVerse: string;    // 성경 본문 (예: "요한계시록 22:6-20")
  backgroundImageId?: string; // Drive 배경 이미지 ID
}

// ── API 응답 래퍼 ─────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  error?: string;
}
