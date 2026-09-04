import { ImageResponse } from "next/og";
import notoSansRegular from "@expo-google-fonts/noto-sans/400Regular/NotoSans_400Regular.ttf?inline";
import notoSansBold from "@expo-google-fonts/noto-sans/700Bold/NotoSans_700Bold.ttf?inline";
import { getDoc } from "@/lib/docs";

export const alt = "BroadApps iOS — статья документации";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function decodeFont(dataUrl: string) {
  const encoded = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0)).buffer;
}

const fonts = [
  { name: "Noto Sans", data: decodeFont(notoSansRegular), weight: 400 as const, style: "normal" as const },
  { name: "Noto Sans", data: decodeFont(notoSansBold), weight: 700 as const, style: "normal" as const },
];

function titleSize(title: string) {
  if (title.length > 72) return 50;
  if (title.length > 52) return 56;
  return 64;
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  const title = doc?.title ?? "Документация BroadApps iOS";
  const description = doc?.description ?? "Актуальные инструкции для iOS-приложений BroadApps.";
  const group = (doc?.group ?? "Документация").toUpperCase();

  return new ImageResponse(
    <div style={{
      width: "100%",
      height: "100%",
      padding: "62px 70px 54px",
      display: "flex",
      flexDirection: "column",
      color: "#f8fbff",
      backgroundColor: "#07111f",
      backgroundImage: "radial-gradient(circle at 82% 12%, rgba(139,92,246,.32), transparent 30%), radial-gradient(circle at 12% 100%, rgba(37,99,235,.32), transparent 34%), linear-gradient(135deg, #07111f 0%, #0e1b31 62%, #111d35 100%)",
      fontFamily: "Noto Sans",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 54,
            height: 54,
            padding: 10,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            border: "1px solid #334d72",
            borderRadius: 15,
            backgroundColor: "#0c1b30",
          }}>
            {["#4385ff", "#5aa0ff", "#70b7ff", "#2e68db"].map((color) => (
              <span key={color} style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: color }} />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 28, fontWeight: 700 }}>
            BroadApps <span style={{ marginLeft: 7, color: "#64a1ff" }}>iOS</span>
          </div>
        </div>
        <div style={{ display: "flex", color: "#89a0c0", fontSize: 18 }}>PUBLIC DOCS</div>
      </div>

      <div style={{ marginTop: 54, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#61e4a9", boxShadow: "0 0 0 7px rgba(97,228,169,.12)" }} />
        <span style={{ color: "#bfd0e8", fontSize: 18, fontWeight: 700, letterSpacing: ".12em" }}>{group}</span>
      </div>

      <div style={{ marginTop: 30, maxWidth: 1060, display: "flex", fontSize: titleSize(title), lineHeight: 1.04, fontWeight: 700, letterSpacing: "-.04em" }}>
        {title}
      </div>
      <div style={{ marginTop: 24, maxWidth: 1030, display: "flex", color: "#aebed5", fontSize: 25, lineHeight: 1.35 }}>
        {description}
      </div>

      <div style={{ marginTop: "auto", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #2d4362" }}>
        <span style={{ color: "#83a7da", fontSize: 18 }}>/docs/{slug}</span>
        <span style={{ color: "#7e93b1", fontSize: 18 }}>Актуально вместе с GitHub</span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
