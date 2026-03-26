import { NextResponse } from "next/server";
import { listFiles, listFolders, readJsonFile } from "@/lib/google-drive";
import type { HeroConfig, StaffMember } from "@/lib/types";

const FOLDERS = {
  bulletins:  process.env.DRIVE_BULLETIN_FOLDER_ID!,
  gallery:    process.env.DRIVE_GALLERY_FOLDER_ID!,
  staff:      process.env.DRIVE_STAFF_FOLDER_ID!,
  community:  process.env.DRIVE_COMMUNITY_FOLDER_ID!,
  hero:       process.env.DRIVE_HERO_FOLDER_ID!,
};

const CACHE = "s-maxage=3600, stale-while-revalidate=86400";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const [type, ...rest] = path;

  try {
    switch (type) {
      case "bulletins": {
        const files = await listFiles(FOLDERS.bulletins);
        const bulletins = files.map((f) => ({
          id: f.id,
          name: f.name,
          date: f.name?.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? "",
          fileId: f.id,
          webContentLink: f.webContentLink,
        }));
        return NextResponse.json({ bulletins }, { headers: { "Cache-Control": CACHE } });
      }

      case "gallery": {
        if (rest[0]) {
          // 특정 앨범 사진 목록
          const photos = await listFiles(rest[0]);
          return NextResponse.json({ photos }, { headers: { "Cache-Control": CACHE } });
        }
        // 앨범 목록
        const folders = await listFolders(FOLDERS.gallery);
        const albums = await Promise.all(
          folders.map(async (folder) => {
            const photos = await listFiles(folder.id!);
            const dateMatch = folder.name?.match(/^(\d{4}-\d{2}-\d{2})/);
            return {
              id: folder.id,
              name: folder.name,
              date: dateMatch?.[1] ?? "",
              coverImage: photos[0]?.thumbnailLink ?? null,
              photoCount: photos.length,
            };
          })
        );
        return NextResponse.json({ albums }, { headers: { "Cache-Control": CACHE } });
      }

      case "staff": {
        const files = await listFiles(FOLDERS.staff);
        const jsonFile = files.find((f) => f.name === "staff.json");
        if (!jsonFile?.id) return NextResponse.json({ staff: [] });
        const staff = await readJsonFile<StaffMember[]>(jsonFile.id);
        return NextResponse.json({ staff }, { headers: { "Cache-Control": CACHE } });
      }

      case "community": {
        const communityType = rest[0]; // senior | youth | nextgen | sunday-school
        const files = await listFiles(FOLDERS.community);
        const jsonFile = files.find(
          (f) => f.name === `${communityType}.json` || f.name === "info.json"
        );
        if (!jsonFile?.id) return NextResponse.json({ community: null });
        const community = await readJsonFile(jsonFile.id);
        return NextResponse.json({ community }, { headers: { "Cache-Control": CACHE } });
      }

      case "hero": {
        const files = await listFiles(FOLDERS.hero);
        const jsonFile = files.find((f) => f.name === "hero-config.json");
        if (!jsonFile?.id) {
          return NextResponse.json<{ hero: HeroConfig }>({
            hero: { sermonTitle: "", bibleVerse: "" },
          });
        }
        const hero = await readJsonFile<HeroConfig>(jsonFile.id);
        return NextResponse.json({ hero }, { headers: { "Cache-Control": CACHE } });
      }

      default:
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("[drive API]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
