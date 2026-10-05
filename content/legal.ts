import { SITE } from "./site";

export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
}

export function getLegalText(): {
  termsVersion: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  refundPolicy: {
    title: string;
    table: { when: string; outcome: string }[];
    notes: string[];
  };
  deliveryPolicy: {
    title: string;
    sections: LegalSection[];
  };
} {
  const parts1_1: string[] = ["techiitfly"];
  if (SITE.legalEntityType && SITE.legalEntityType.trim()) {
    parts1_1.push(SITE.legalEntityType.trim());
  }
  if (SITE.registeredAddress && SITE.registeredAddress.trim()) {
    parts1_1.push(SITE.registeredAddress.trim());
  }
  parts1_1.push("Pune, Maharashtra, India");
  if (SITE.gstin && SITE.gstin.trim()) {
    parts1_1.push(`GSTIN ${SITE.gstin.trim()}`);
  }
  const entity1_1 = parts1_1.join(", ");

  const parts19_4: string[] = ["techiitfly"];
  if (SITE.registeredAddress && SITE.registeredAddress.trim()) {
    parts19_4.push(SITE.registeredAddress.trim());
  }
  parts19_4.push("Pune, Maharashtra, India");
  const address19_4 = parts19_4.join(", ");

  const sections: LegalSection[] = [
    {
      id: "about",
      number: "1",
      title: "About these Terms",
      paragraphs: [
        `1.1 These Terms & Conditions ("Terms") apply to the website techiitfly.com and techiitfly.vercel.app (the "Website") and to all services and products provided by ${entity1_1} ("techiitfly", "we", "us").`,
        `1.2 By using the Website, booking a consultation, accepting a quote, or paying an advance, you ("Client", "you") agree to these Terms.`,
        `1.3 If a signed quote or project agreement conflicts with these Terms, the signed document applies for that project.`,
      ],
    },
    {
      id: "definitions",
      number: "2",
      title: "Definitions",
      paragraphs: [
        `• Project: the work described in your accepted quote or project agreement.`,
        `• Scope: the pages, features and deliverables listed in writing in that quote or agreement.`,
        `• Content: text, photos, videos, logos, product details, prices and any other material you provide.`,
        `• Access: logins needed for the Project, such as domain, hosting, email or third-party accounts.`,
        `• Kickoff Date: the day we confirm in writing that we have received all Content, Access and the advance payment.`,
        `• Working Demo: a clickable, hosted version showing the agreed core flow of a platform or app. It is not the finished product.`,
        `• Launch: the Project going live on your domain or being handed over to you.`,
      ],
    },
    {
      id: "services-scope",
      number: "3",
      title: "Our services and scope",
      paragraphs: [
        `3.1 We provide website design and development, and other services listed on the Website or in a quote.`,
        `3.2 Prices on the Website are starting prices in INR, excluding GST. Your final price is the one in your written quote.`,
        `3.3 Before work starts, we agree the Scope in writing (by email, WhatsApp or a signed quote). Only items written in the Scope are included.`,
        `3.4 Anything outside the Scope, such as extra pages, new features or a blog, is a change request. It is quoted separately and may change the timeline.`,
        `3.5 You can book a package slot online by paying a booking advance. The final price and Scope are confirmed in writing before the Kickoff Date, and the advance is adjusted against your final invoice. If we cannot agree the Scope, we refund the advance in full.`,
      ],
    },
    {
      id: "delivery-guarantee",
      number: "4",
      title: "7-day website delivery guarantee",
      paragraphs: [
        `4.1 What it covers. The guarantee applies only to websites in our 7-day package: up to 5 pages, within the agreed Scope. We will Launch within 7 days of the Kickoff Date.`,
        `4.2 When the 7 days start. The 7 days start on the Kickoff Date, not on the day you first contact us or pay.`,
        `4.3 Paused days. The 7 days pause, and the delivery date moves by the same number of days, while:`,
        `• we are waiting for your feedback, approval, Content or Access;`,
        `• you request changes beyond the one included round of design changes;`,
        `• a third party (domain registrar, hosting, DNS, payment gateway) delays a step we cannot control;`,
        `• an event under Section 18 (force majeure) applies.`,
        `4.4 Not covered. The guarantee does not apply to: websites over 5 pages; Business and Premium packages (their timelines are estimates); change requests; online payments, login areas, blogs or custom tools; or Projects where you ask us to delay Launch.`,
        `4.5 Remedy. If we miss the guaranteed date for reasons within our control, you receive the first 3 months of website maintenance free (worth ₹2,500 per month as listed on our pricing page). This is your only remedy for a missed date. It is not a refund and cannot be exchanged for cash.`,
        `4.6 Capacity. We start a limited number of 7-day projects each week. Your Kickoff Date depends on available slots, which we confirm in writing.`,
      ],
    },
    {
      id: "platforms-apps",
      number: "5",
      title: "Platforms, apps and MVPs",
      paragraphs: [
        `5.1 Working Demo in 7 days. For platforms, web apps and app MVPs, we aim to share a Working Demo within 7 days of the Kickoff Date. The Working Demo shows the agreed core flow. It is not the finished product and may use sample data.`,
        `5.2 After the demo. We then share progress in regular releases you can test. The full delivery date is the estimate written in your quote.`,
        `5.3 Estimates, not guarantees. Timelines for platforms, apps, MVPs and the Business and Premium website packages are good-faith estimates. They depend on Scope, your feedback speed and third parties such as app stores, payment gateways and APIs.`,
        `5.4 App store approval. Apple and Google decide whether to approve an app and how long review takes. We are not responsible for their decisions or delays, but we will fix issues within the agreed Scope that they report.`,
      ],
    },
    {
      id: "responsibilities",
      number: "6",
      title: "Your responsibilities",
      paragraphs: [
        `6.1 You will provide complete Content and Access on time, and reply to previews and questions within 2 working days.`,
        `6.2 You confirm that you own, or have permission to use, all Content you give us, and that it does not break any law or anyone's rights (copyright, trademarks, privacy).`,
        `6.3 You are responsible for the accuracy of your Content, including prices, claims, medical, legal or financial statements, and offers shown on your website.`,
        `6.4 You are responsible for complying with laws that apply to your business, such as consumer protection, data protection and advertising rules.`,
      ],
    },
    {
      id: "revisions",
      number: "7",
      title: "Revisions and change requests",
      paragraphs: [
        `7.1 The 7-day package and the Starter package include one round of design changes. Business and Premium packages include two rounds.`,
        `7.2 A "round" is one consolidated list of changes sent together. Changes sent separately over several messages count as separate rounds.`,
        `7.3 Extra rounds and change requests are charged at the rates on our pricing page or quoted separately, and may move the delivery date.`,
      ],
    },
    {
      id: "payment",
      number: "8",
      title: "Payment",
      paragraphs: [
        `8.1 Unless your quote says otherwise, you pay 50% in advance to book your slot and start work, and 50% on delivery, before Launch or handover.`,
        `8.2 Monthly services (such as maintenance) are billed monthly in advance.`,
        `8.3 GST is charged where applicable, in addition to the quoted price.`,
        `8.4 If a payment is more than 7 days late, we may pause work, support or hosting we manage until it is paid. Delivery dates move by the paused time.`,
        `8.5 Third-party costs (domain, hosting, paid plugins, app store fees, SMS or payment gateway fees) are paid by you, directly or reimbursed to us, unless your quote includes them.`,
        `8.6 Online payments are processed by our payment partner, Razorpay. We do not see or store your card, UPI or bank details.`,
        `8.7 Before paying online, you must tick the box confirming that you have read and accept these Terms. That confirmation, together with your payment, is your acceptance of these Terms for the Project.`,
      ],
    },
    {
      id: "refunds",
      number: "9",
      title: "Cancellation and refunds",
      paragraphs: [
        `Table of Advance Refund Terms:`,
        `• Before the Kickoff Date: Refunded, minus ₹1,000 booking and planning fee`,
        `• After Kickoff, before the design preview: 50% of the advance refunded`,
        `• After the design preview is shared: Advance not refundable`,
        `• After Launch or handover: No refund; the balance is due`,
        `9.1 If you stop replying or do not provide Content for 30 days, we may treat the Project as cancelled under this table, after one written reminder.`,
        `9.2 If we cancel a Project for reasons within our control, we refund the full amount you paid for work not yet delivered.`,
        `9.3 Refunds are made to the original payment method within 14 working days.`,
        `9.4 Monthly services can be cancelled with 30 days' written notice. Months already paid are not refunded.`,
      ],
    },
    {
      id: "ownership",
      number: "10",
      title: "Ownership and intellectual property",
      paragraphs: [
        `10.1 After full payment, you own the final website or app built for you, including its design files and source code created specifically for your Project.`,
        `10.2 Until full payment, all work remains ours, and we may withhold handover or take down work we host.`,
        `10.3 We keep ownership of our pre-existing tools, templates, components and know-how (our "Starter Kit"). You receive a permanent, non-exclusive licence to use the parts included in your Project.`,
        `10.4 Third-party items (fonts, plugins, stock images, open-source code) remain under their own licences.`,
        `10.5 We may show your Project in our portfolio, case studies and marketing (name, logo, screenshots, link), unless you ask us in writing not to.`,
      ],
    },
    {
      id: "third-party",
      number: "11",
      title: "Third-party services",
      paragraphs: [
        `11.1 Projects may rely on third-party services such as domain registrars, hosting providers, Google, WhatsApp, payment gateways, email services and app stores.`,
        `11.2 Those services are governed by their own terms. We are not responsible for their outages, price changes, policy changes, account suspensions or data loss.`,
        `11.3 Domains and hosting should be registered in your name. If we register them for you, we will transfer them to you on request after full payment.`,
      ],
    },
    {
      id: "support",
      number: "12",
      title: "Support and maintenance",
      paragraphs: [
        `12.1 Each package includes free support for the period on our pricing page (for example, 7, 30 or 90 days from Launch).`,
        `12.2 Free support covers fixing bugs in work we delivered, within the agreed Scope. It does not cover new features, content updates, redesigns, or problems caused by changes made by you or others.`,
        `12.3 After the free period, support is available through a paid maintenance plan or at hourly rates.`,
      ],
    },
    {
      id: "no-results-guarantee",
      number: "13",
      title: "No guarantee of business results",
      paragraphs: [
        `13.1 We build what is agreed in the Scope with reasonable skill and care. We do not guarantee search rankings, traffic, leads, sales, ad performance or any business outcome.`,
        `13.2 Speed and performance scores (such as Google PageSpeed) vary with content, third-party scripts, hosting and Google's own changes, and are not guaranteed after Launch.`,
        `13.3 Free audits, sample scores and examples on the Website are for information only.`,
      ],
    },
    {
      id: "liability",
      number: "14",
      title: "Limitation of liability and indemnity",
      paragraphs: [
        `14.1 To the extent permitted by Indian law, our total liability for any claim relating to a Project is limited to the amount you paid us for that Project.`,
        `14.2 We are not liable for indirect or consequential losses, such as lost profits, lost data, lost business or reputational harm.`,
        `14.3 Nothing in these Terms limits liability that cannot be limited under Indian law, including for fraud.`,
        `14.4 You agree to cover our reasonable losses and costs if a third party makes a claim against us because of your Content, your instructions, or how you use the delivered work.`,
      ],
    },
    {
      id: "confidentiality",
      number: "15",
      title: "Confidentiality and data protection",
      paragraphs: [
        `15.1 We keep your business information, logins and non-public Content confidential and use them only for your Project.`,
        `15.2 Please share logins through a secure method and change passwords after handover.`,
        `15.3 How we handle personal data collected through our Website is described in our Privacy Policy (/privacy).`,
        `15.4 For websites and apps we build, you decide what personal data is collected from your users. You are responsible for your own privacy notice and compliance with India's Digital Personal Data Protection Act, 2023. We process that data only as needed to build and support your Project.`,
      ],
    },
    {
      id: "products",
      number: "16",
      title: "Our products (Mathsy Meet)",
      paragraphs: [
        `16.1 Mathsy Meet is a software product owned by techiitfly. Using it does not transfer ownership of the software to you.`,
        `16.2 Access is licensed, not sold, under a separate subscription or licence agreement that sets out pricing, usage limits, support and data terms. That agreement applies in addition to these Terms.`,
        `16.3 Free demos, trials and walkthroughs are provided as-is and may be changed or ended at any time.`,
      ],
    },
    {
      id: "website-use",
      number: "17",
      title: "Free consultation, free audit and Website use",
      paragraphs: [
        `17.1 Free consultations and free website audits carry no obligation to buy. Advice and estimates given in them are general and become binding only when written into an accepted quote.`,
        `17.2 Prices, packages and offers on the Website may change at any time. Changes do not affect quotes you have already accepted.`,
        `17.3 We try to keep the Website accurate but do not guarantee it is always error-free or available. You must not misuse the Website, copy its content or design for commercial use, or attempt to disrupt it.`,
      ],
    },
    {
      id: "termination",
      number: "18",
      title: "Termination and force majeure",
      paragraphs: [
        `18.1 Either side may end a Project by written notice if the other seriously breaches these Terms and does not fix it within 14 days of being told. Payment for work done up to that point remains due, as set out in Section 9.`,
        `18.2 Neither side is responsible for delays caused by events beyond reasonable control, such as natural disasters, epidemics, internet or power outages, government actions, or major third-party service failures. Affected timelines, including the 7-day guarantee, move by the length of the event.`,
      ],
    },
    {
      id: "disputes-contact",
      number: "19",
      title: "Law, disputes, changes and contact",
      paragraphs: [
        `19.1 These Terms are governed by the laws of India.`,
        `19.2 If a dispute arises, we will first try to resolve it by discussion within 30 days. If that fails, it will be referred to a sole arbitrator in Pune under the Arbitration and Conciliation Act, 1996, in English. Subject to this, courts in Pune, Maharashtra have exclusive jurisdiction.`,
        `19.3 We may update these Terms. The version on the Website on the date you accept a quote applies to that Project.`,
        `19.4 Contact: ${address19_4} · ${SITE.contactEmail} · ${SITE.phone}.`,
      ],
    },
  ];

  return {
    termsVersion: SITE.termsVersion,
    lastUpdated: "5 October 2026",
    intro:
      "These Terms explain how techiitfly works with its customers: what we deliver, when, what it costs, and what happens if something goes wrong. Please read them before booking a project or using our products.",
    sections,
    refundPolicy: {
      title: "Refund & Cancellation Policy",
      table: [
        { when: "Before the Kickoff Date", outcome: "Refunded, minus ₹1,000 booking and planning fee" },
        { when: "After Kickoff, before the design preview", outcome: "50% of the advance refunded" },
        { when: "After the design preview is shared", outcome: "Advance not refundable" },
        { when: "After Launch or handover", outcome: "No refund; the balance is due" },
      ],
      notes: [
        "9.1 If you stop replying or do not provide Content for 30 days, we may treat the Project as cancelled under this table, after one written reminder.",
        "9.2 If we cancel a Project for reasons within our control, we refund the full amount you paid for work not yet delivered.",
        "9.3 Refunds are made to the original payment method within 14 working days.",
        "9.4 Monthly services can be cancelled with 30 days' written notice. Months already paid are not refunded.",
      ],
    },
    deliveryPolicy: {
      title: "Service Delivery Policy",
      sections: [sections[3], sections[4]], // Sections 4 and 5
    },
  };
}
