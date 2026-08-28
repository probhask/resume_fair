/* Dev-only: render every template to a PDF for visual review.
   Run: npx tsx scripts/render-templates.tsx [outDir]                     */
import { Document, Font, Page, renderToFile } from "@react-pdf/renderer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import React from "react";

import TEMPLATES, { getTemplate } from "../src/constants/Templates";
import { DEFAULT_SETTINGS, type Resume } from "../src/types/resume";
import { buildStyles } from "../src/components/ResumePDF/buildStyles";
import { pickLayout } from "../src/components/ResumePDF/layouts";

const here = path.dirname(fileURLToPath(import.meta.url));
const fdir = path.join(here, "../src/assets/fonts");

Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(fdir, "Inter-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fdir, "Inter-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fdir, "Inter-Bold.ttf"), fontWeight: 700 },
  ],
});
Font.register({
  family: "Source Serif 4",
  fonts: [
    { src: path.join(fdir, "SourceSerif4-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fdir, "SourceSerif4-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fdir, "SourceSerif4-Bold.ttf"), fontWeight: 700 },
  ],
});
Font.register({
  family: "Roboto Slab",
  fonts: [
    { src: path.join(fdir, "RobotoSlab-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fdir, "RobotoSlab-Bold.ttf"), fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((w) => [w]);

const resume: Resume = {
  id: "demo",
  name: "Alex Carter",
  updatedAt: Date.now(),
  schemaVersion: 1,
  templateId: "1",
  settings: { ...DEFAULT_SETTINGS },
  sectionOrder: [
    "personalDetails",
    "objective",
    "experience",
    "education",
    "skills",
    "projects",
    "languages",
    "references",
  ],
  hiddenSections: [],
  sectionTitles: {},
  customSections: [],
  personalDetails: [
    {
      name: "Alex Carter",
      title: "Full-Stack Developer",
      address: "Austin, TX",
      email: "alex.carter.dev@gmail.com",
      phone: "555 123 4567",
      linkedin: "linkedin.com/in/alexcarterdev",
      github: "github.com/alexcarterdev",
    },
  ],
  objective: [
    {
      objective:
        "Full-stack developer with 2 years shipping production React and Node.js apps. Comfortable across REST APIs, PostgreSQL, testing and cloud deploys; looking to own features end to end.",
    },
  ],
  experience: [
    {
      id: "e1",
      companyName: "Brighttail Technologies",
      jobTitle: "Full-Stack Developer",
      startDate: "Mar 2023",
      endDate: "Present",
      description:
        "Build customer-facing features in a React/TypeScript frontend and Node/Express API serving ~40k monthly users. Cut median page load 35% via code-splitting and query caching. Set up CI (lint, type-check, Jest) and mentor one junior dev.",
    },
    {
      id: "e2",
      companyName: "Freelance / Contract",
      jobTitle: "Web Developer",
      startDate: "Jun 2022",
      endDate: "Feb 2023",
      description:
        "Delivered 6 small-business sites and 2 internal dashboards with Next.js, Tailwind and Supabase; automated preview deploys on Vercel and Netlify.",
    },
  ],
  education: [
    {
      id: "ed1",
      institution: "University of Texas at Austin",
      course: "B.S. Computer Science",
      score: "GPA 3.6/4.0",
      year: "2018 - 2022",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "REST APIs",
    "Docker",
    "AWS",
    "Jest",
  ].map((skill, i) => ({ id: `s${i}`, skill })),
  projects: [
    {
      id: "p1",
      projectTitle: "DevBoard — Real-time Kanban",
      description:
        "React + Socket.IO + PostgreSQL board with drag-and-drop, optimistic updates and RBAC. ~300 GitHub stars.",
    },
    {
      id: "p2",
      projectTitle: "SnipStash — Snippet Manager",
      description:
        "Next.js + Prisma snippet manager with tag search and syntax highlighting.",
    },
  ],
  languages: [
    { id: "l1", languageTitle: "English (native)" },
    { id: "l2", languageTitle: "Spanish (professional)" },
  ],
  references: [
    {
      id: "r1",
      referenceName: "Priya Nair",
      jobTitle: "Engineering Manager",
      companyName: "Brighttail Technologies",
      email: "priya.nair@brighttail.example",
      phone: "555 987 6543",
    },
  ],
};

const outDir = process.argv[2] || path.join(here, "../.template-previews");

const run = async () => {
  const fs = await import("node:fs/promises");
  await fs.mkdir(outDir, { recursive: true });
  for (const t of TEMPLATES) {
    const r = { ...resume, templateId: t.id };
    const template = getTemplate(t.id);
    const s = buildStyles(template, { ...DEFAULT_SETTINGS });
    const Layout = pickLayout(template);
    const doc = (
      <Document>
        <Page size="A4" style={s.page}>
          <Layout resume={r} s={s} template={template} />
        </Page>
      </Document>
    );
    const file = path.join(outDir, `${t.id}-${t.name}.pdf`);
    await renderToFile(doc, file);
    console.log("wrote", file);
  }
};

run();
