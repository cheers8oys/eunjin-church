import { google } from "googleapis";

function getAuth() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!key) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set");
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(key),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

function getDrive() {
  return google.drive({ version: "v3", auth: getAuth() });
}

/** 폴더 내 파일 목록 조회 */
export async function listFiles(folderId: string) {
  const drive = getDrive();
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType, modifiedTime, thumbnailLink, webContentLink)",
    orderBy: "modifiedTime desc",
  });
  return res.data.files ?? [];
}

/** 폴더 내 하위 폴더 목록 조회 */
export async function listFolders(folderId: string) {
  const drive = getDrive();
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name, modifiedTime)",
    orderBy: "modifiedTime desc",
  });
  return res.data.files ?? [];
}

/** JSON 파일 읽기 */
export async function readJsonFile<T>(fileId: string): Promise<T> {
  const drive = getDrive();
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "json" }
  );
  return res.data as T;
}

/** 이미지 스트림 가져오기 (API Route 프록시용) */
export async function getFileStream(fileId: string) {
  const drive = getDrive();
  return drive.files.get({ fileId, alt: "media" }, { responseType: "stream" });
}
