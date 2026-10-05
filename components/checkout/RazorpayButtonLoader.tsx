"use client";

import { useEffect, useRef } from "react";

interface RazorpayButtonLoaderProps {
  buttonId: string;
}

export default function RazorpayButtonLoader({ buttonId }: RazorpayButtonLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonId || !containerRef.current) return;

    // Clear previous children
    containerRef.current.innerHTML = "";

    const form = document.createElement("form");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", buttonId);
    script.async = true;

    form.appendChild(script);
    containerRef.current.appendChild(form);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [buttonId]);

  if (!buttonId || buttonId.trim() === "") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: "inline-block",
        minHeight: "45px",
      }}
    />
  );
}
