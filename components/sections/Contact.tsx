"use client";

import { useState, FormEvent } from "react";
import { SITE, getConsultUrl } from "@/content/site";
import { getWhatsAppHref, trackEvent } from "@/lib/tracking";

export default function Contact() {
  const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    phone: string;
    projectType: string;
    message: string;
    botcheck: boolean;
  }>({
    name: "",
    email: "",
    phone: "",
    projectType: "EdTech Platform",
    message: "",
    botcheck: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formState.botcheck) {
      return;
    }

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage("Please complete all required fields.");
      setStatus("error");
      return;
    }

    if (!web3formsKey) {
      setErrorMessage("Contact key not configured. Please contact directly via WhatsApp or Email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          projectType: formState.projectType,
          message: formState.message,
          from_name: "techiitfly Portfolio Enquiry",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send message. Please contact via WhatsApp or Email directly.");
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "var(--surface)",
        padding: "100px 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <span className="section-label">START A PROJECT</span>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text)",
              marginTop: "12px",
              marginBottom: "16px",
            }}
          >
            Tell us what you need. Get a fixed quote today.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Whether you need a full learning platform with live video, or a high-converting school site, let&apos;s talk about your requirements.
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: SITE.contactEmail ? "repeat(auto-fit, minmax(320px, 1fr))" : "1fr",
            maxWidth: SITE.contactEmail ? "1040px" : "680px",
            margin: "0 auto",
            gap: "24px",
            marginBottom: web3formsKey ? "48px" : "0",
          }}
        >
          {/* Primary Contact Card: WhatsApp + Consultation + Direct Call */}
          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-lg)",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 10px 30px rgba(245,158,11,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "0.75rem",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                }}
              >
                FASTEST RESPONSE · WHATSAPP &amp; CALL
              </span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1.25rem", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>
                WhatsApp &amp; Direct Call
              </h3>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.82rem", color: "var(--accent)", marginBottom: "6px" }}>
                ● {SITE.replyHours}
              </p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.5 }}>
                Direct line to founder Aditya Chavhan:
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
              {/* Option 1: Free Consultation (First Option as requested in Section H) */}
              <a
                href={getConsultUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("consult_click", "contact")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "6px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  transition: "all 0.15s ease",
                }}
              >
                <div>
                  <span style={{ display: "block", color: "var(--accent)", fontWeight: 700 }}>
                    ★ Free 15-Minute Consultation
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                    Discuss project scope &amp; feasibility over a direct call
                  </span>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "1.1rem" }}>↗</span>
              </a>

              {/* Option 2: Project Discussion */}
              <a
                href={getWhatsAppHref("Hi techiitfly, I'd like to discuss a website/platform project.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "contact_project")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "6px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  transition: "all 0.15s ease",
                }}
              >
                <div>
                  <span style={{ display: "block", color: "var(--text)", fontWeight: 600 }}>Discuss a Project</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>Website or custom platform design &amp; dev</span>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "1rem" }}>→</span>
              </a>

              {/* Option 3: Coaching Institute Demo */}
              <a
                href={SITE.whatsappInstituteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "contact_institute")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "6px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  transition: "all 0.15s ease",
                }}
              >
                <div>
                  <span style={{ display: "block", color: "var(--text)", fontWeight: 600 }}>Coaching Institute Demo</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>Mathsy 4-portal system for your academy</span>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "1rem" }}>→</span>
              </a>

              {/* Option 4: Mathsy Meet for Tutors */}
              <a
                href={SITE.whatsappTutorUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", "contact_tutor")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: "6px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  transition: "all 0.15s ease",
                }}
              >
                <div>
                  <span style={{ display: "block", color: "var(--text)", fontWeight: 600 }}>Mathsy Meet for Tutors</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>Live online math classroom &amp; geometric tools</span>
                </div>
                <span style={{ color: "var(--accent)", fontSize: "1rem" }}>→</span>
              </a>

              {/* Tap to Call Link (Section I requirement) */}
              <a
                href={`tel:${SITE.phoneRaw}`}
                onClick={() => trackEvent("call_click", "contact_card")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "11px 16px",
                  borderRadius: "6px",
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  transition: "all 0.15s ease",
                  marginTop: "4px",
                }}
              >
                <span>📞 Call directly: {SITE.phone}</span>
              </a>
            </div>
          </div>

          {/* Email Card (Secondary contact option, subject "Project enquiry — techiitfly") */}
          {SITE.contactEmail && (
            <a
              href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Project enquiry — techiitfly")}`}
              onClick={() => trackEvent("email_click", "contact_card")}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "32px 28px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  DIRECT INBOX
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth={2}>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-geist-sans)", fontSize: "1.3rem", fontWeight: 600, color: "var(--text)" }}>
                Send an Email
              </h3>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.5 }}>
                For formal requirements, RFPs, or scopes of work.
              </p>
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  color: "var(--accent)",
                  marginTop: "auto",
                }}
              >
                {SITE.contactEmail} →
              </span>
            </a>
          )}
        </div>

        {/* Optional Web3Forms Contact Form (Rendered only if key is configured) */}
        {web3formsKey && (
          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "40px 32px",
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "var(--text)",
                marginBottom: "24px",
              }}
            >
              Or leave a message here:
            </h3>

            {status === "success" ? (
              <div
                style={{
                  padding: "24px",
                  borderRadius: "8px",
                  background: "rgba(22,163,74,0.1)",
                  border: "1px solid rgba(22,163,74,0.3)",
                  color: "#22c55e",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "0.95rem",
                  textAlign: "center",
                }}
              >
                ✓ Message received! Aditya will get back to you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: "none" }}
                  checked={formState.botcheck}
                  onChange={(e) => setFormState({ ...formState, botcheck: e.target.checked })}
                />

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        marginBottom: "6px",
                      }}
                    >
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        marginBottom: "6px",
                      }}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="rahul@example.com"
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        marginBottom: "6px",
                      }}
                    >
                      WHATSAPP / PHONE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91..."
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "0.75rem",
                        color: "var(--muted)",
                        marginBottom: "6px",
                      }}
                    >
                      PROJECT TYPE
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--text)",
                        fontFamily: "var(--font-geist-sans)",
                        fontSize: "0.9rem",
                      }}
                    >
                      <option value="EdTech Platform">EdTech / Learning Platform</option>
                      <option value="Course / Retreat Website">Course / Wellness Website</option>
                      <option value="Speed & Architecture Audit">Speed & Architecture Remediation</option>
                      <option value="Custom Project">Other Custom Software</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      marginBottom: "6px",
                    }}
                  >
                    HOW CAN WE HELP? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about what you want to build, current challenges, and target timeline..."
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      color: "var(--text)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "0.9rem",
                      resize: "vertical",
                    }}
                  />
                </div>

                {errorMessage && (
                  <p style={{ color: "#ef4444", fontSize: "0.85rem", fontFamily: "var(--font-geist-sans)" }}>
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    padding: "14px 28px",
                    borderRadius: "8px",
                    background: "var(--accent)",
                    color: "#0e0d0b",
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    border: "none",
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                    alignSelf: "flex-start",
                  }}
                >
                  {status === "submitting" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Studio Location Footer Note */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <p
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.8rem",
              color: "var(--muted)",
              letterSpacing: "0.05em",
            }}
          >
            {SITE.name} · Founder {SITE.founder} · {SITE.location}
          </p>
        </div>
      </div>
    </section>
  );
}
