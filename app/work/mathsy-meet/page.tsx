"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MathsyMeetWorkRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mathsy-meet");
  }, [router]);

  return (
    <div style={{ padding: "80px 24px", textAlign: "center", fontFamily: "sans-serif" }}>
      <meta httpEquiv="refresh" content="0; url=/mathsy-meet" />
      <p>Redirecting to <a href="/mathsy-meet" style={{ color: "#f59e0b" }}>Mathsy Meet product page</a>...</p>
    </div>
  );
}
