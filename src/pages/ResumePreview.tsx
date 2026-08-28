import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import { Link, useNavigate, useParams } from "react-router-dom";
import ResumePDF from "@components/ResumePDF/ResumePDF";
import TEMPLATES, { getTemplate } from "@constants/Templates";
import { useResumeStore } from "../store/useResumeStore";

const ACCENTS = [
  "#1f2937",
  "#2563eb",
  "#0d9488",
  "#7c2d12",
  "#c0392b",
  "#7c3aed",
  "#be185d",
  "#047857",
];
const DEFAULT_ACCENT = "#404040";

const Stepper = ({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min: number;
  max: number;
}) => (
  <div className="flex items-center justify-between gap-2 text-sm">
    <span className="text-neutral-400">{label}</span>
    <div className="flex items-center overflow-hidden rounded-md border border-neutral-700 bg-neutral-800">
      <button
        type="button"
        className="px-2.5 py-1 text-neutral-300 hover:bg-neutral-700 hover:text-white"
        onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))}
        aria-label={`decrease ${label}`}
      >
        −
      </button>
      <span className="w-9 text-center tabular-nums">{value}</span>
      <button
        type="button"
        className="px-2.5 py-1 text-neutral-300 hover:bg-neutral-700 hover:text-white"
        onClick={() => onChange(Math.min(max, +(value + step).toFixed(2)))}
        aria-label={`increase ${label}`}
      >
        +
      </button>
    </div>
  </div>
);

const ResumePreview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const resume = useResumeStore((s) => s.resume);
  const init = useResumeStore((s) => s.init);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const updateSettings = useResumeStore((s) => s.updateSettings);
  const [mobilePanel, setMobilePanel] = useState<"none" | "design" | "templates">(
    "none"
  );

  useEffect(() => {
    if (!resume) init();
  }, [resume, init]);

  useEffect(() => {
    if (resume && templateId && templateId !== resume.templateId) {
      setTemplate(templateId);
    }
  }, [resume, templateId, setTemplate]);

  if (!resume) return null;

  const template = getTemplate(resume.templateId);
  const settings = resume.settings;
  const usingDefaultAccent =
    !settings.accentColor || settings.accentColor === DEFAULT_ACCENT;
  const effectiveAccent = usingDefaultAccent
    ? template.accent
    : settings.accentColor;
  const doc = <ResumePDF resume={resume} />;

  const chooseTemplate = (id: string) => {
    setTemplate(id);
    navigate(`/resume/${id}`, { replace: true });
    setMobilePanel("none");
  };

  const designControls = (
    <div className="space-y-3">
      <div>
        <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
          Accent
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => updateSettings({ accentColor: c })}
              className={`h-6 w-6 rounded-full border-2 transition ${
                effectiveAccent === c
                  ? "border-white"
                  : "border-transparent hover:border-neutral-500"
              }`}
              style={{ backgroundColor: c }}
              aria-label={`accent ${c}`}
            />
          ))}
          <label className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-neutral-600">
            <input
              type="color"
              value={effectiveAccent}
              onChange={(e) => updateSettings({ accentColor: e.target.value })}
              className="absolute -left-1 -top-1 h-9 w-9 cursor-pointer bg-transparent p-0"
              aria-label="custom accent color"
            />
          </label>
        </div>
      </div>
      <Stepper
        label="Font size"
        value={settings.fontSize}
        onChange={(v) => updateSettings({ fontSize: v })}
        min={8}
        max={13}
        step={0.5}
      />
      <Stepper
        label="Margin"
        value={settings.pageMargin}
        onChange={(v) => updateSettings({ pageMargin: v })}
        min={6}
        max={30}
      />
      <Stepper
        label="Line height"
        value={settings.lineHeight}
        onChange={(v) => updateSettings({ lineHeight: v })}
        min={1}
        max={1.8}
        step={0.05}
      />
    </div>
  );

  const templateGrid = (
    <div className="grid grid-cols-2 gap-2">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => chooseTemplate(t.id)}
          className={`overflow-hidden rounded-md border text-left transition ${
            t.id === resume.templateId
              ? "border-blue-500 ring-1 ring-blue-500"
              : "border-neutral-700 hover:border-neutral-500"
          }`}
        >
          <img
            src={`/template/${t.id}.png`}
            alt={`${t.name} preview`}
            loading="lazy"
            className="aspect-[3/4] w-full bg-neutral-200 object-cover object-top"
          />
          <span className="flex items-center gap-1.5 px-1.5 py-1 text-xs">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: t.accent }}
            />
            <span className="truncate">{t.name}</span>
          </span>
        </button>
      ))}
    </div>
  );

  const Sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
        <span className="truncate font-semibold">{resume.name || "Resume"}</span>
      </div>
      <div className="flex gap-2 border-b border-neutral-800 px-4 py-3">
        <Link
          to="/forms"
          className="flex-1 rounded-md bg-green-700 py-2 text-center text-sm transition hover:bg-green-600"
        >
          Edit
        </Link>
        <PDFDownloadLink
          document={doc}
          fileName={`${resume.name || "resume"}.pdf`}
          className="flex-1 rounded-md bg-blue-600 py-2 text-center text-sm transition hover:bg-blue-500"
        >
          {({ loading }) => (loading ? "Generating…" : "Download PDF")}
        </PDFDownloadLink>
      </div>
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
        <section>
          <h2 className="mb-2 text-sm font-semibold text-neutral-300">Design</h2>
          {designControls}
        </section>
        <section>
          <h2 className="mb-2 text-sm font-semibold text-neutral-300">
            Template
          </h2>
          {templateGrid}
        </section>
      </div>
    </div>
  );

  return (
    <div className="flex h-[100svh] flex-col bg-neutral-900 text-white lg:flex-row">
      {/* mobile top bar */}
      <div className="flex items-center gap-2 border-b border-neutral-800 px-3 py-2 lg:hidden">
        <span className="mr-auto truncate text-sm font-semibold">
          {resume.name || "Resume"}
        </span>
        <button
          type="button"
          onClick={() =>
            setMobilePanel((p) => (p === "design" ? "none" : "design"))
          }
          className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs"
        >
          Design
        </button>
        <button
          type="button"
          onClick={() =>
            setMobilePanel((p) => (p === "templates" ? "none" : "templates"))
          }
          className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs"
        >
          Templates
        </button>
        <PDFDownloadLink
          document={doc}
          fileName={`${resume.name || "resume"}.pdf`}
          className="rounded-md bg-blue-600 px-2.5 py-1 text-xs"
        >
          {({ loading }) => (loading ? "…" : "PDF")}
        </PDFDownloadLink>
      </div>

      {mobilePanel !== "none" && (
        <div className="max-h-[45vh] overflow-y-auto border-b border-neutral-800 bg-neutral-950 px-4 py-3 lg:hidden">
          {mobilePanel === "design" ? designControls : templateGrid}
        </div>
      )}

      {/* desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-neutral-800 bg-neutral-950 lg:block">
        {Sidebar}
      </aside>

      {/* preview */}
      <main className="min-h-0 flex-1">
        <ErrorBoundary>
          <PDFViewer
            key={`${template.id}|${effectiveAccent}|${settings.fontSize}|${settings.pageMargin}|${settings.lineHeight}`}
            style={{ width: "100%", height: "100%", border: "none" }}
            showToolbar={false}
          >
            {doc}
          </PDFViewer>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default ResumePreview;
