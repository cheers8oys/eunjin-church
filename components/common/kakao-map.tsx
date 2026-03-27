"use client";

import { useEffect } from "react";
import { MapPin } from "lucide-react";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (container: HTMLElement, options: object) => unknown;
        Marker: new (options: object) => { setMap: (map: unknown) => void };
      };
    };
  }
}

const LAT = 37.7383;
const LNG = 127.0477;
const ADDRESS = "경기 의정부시 추동로 98";

export default function KakaoMap() {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
    if (!apiKey || typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        if (!container) return;
        const position = new window.kakao.maps.LatLng(LAT, LNG);
        const map = new window.kakao.maps.Map(container, {
          center: position,
          level: 3,
        });
        const marker = new window.kakao.maps.Marker({ position });
        marker.setMap(map);
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="space-y-3">
      <div
        id="kakao-map"
        className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-gray-100"
      />
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <MapPin size={15} className="text-accent shrink-0" />
        <span>{ADDRESS}</span>
      </div>
    </div>
  );
}
