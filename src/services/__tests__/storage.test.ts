import { beforeEach, describe, expect, it } from "vitest";

import {
  createResume,
  deleteResume,
  exportResume,
  getOrInitActiveResume,
  importResume,
  loadIndex,
  loadResume,
  saveResume,
} from "../storage";
import { LEGACY_KEY, migrateLegacyBlob } from "../migrate";
import { DEFAULT_SECTION_ORDER, SCHEMA_VERSION } from "../../types/resume";

beforeEach(() => localStorage.clear());

describe("normalizeResume / migrate", () => {
  it("returns null when there is no legacy blob", () => {
    expect(migrateLegacyBlob()).toBeNull();
  });

  it("returns null for an empty legacy blob", () => {
    localStorage.setItem(LEGACY_KEY, JSON.stringify({ education: [] }));
    expect(migrateLegacyBlob()).toBeNull();
  });

  it("converts a populated legacy blob into a Resume", () => {
    localStorage.setItem(
      LEGACY_KEY,
      JSON.stringify({
        personalDetails: [{ name: "Ada Lovelace" }],
        skills: [{ id: "1", skill: "Math" }],
      })
    );
    const resume = migrateLegacyBlob();
    expect(resume).not.toBeNull();
    expect(resume?.personalDetails[0].name).toBe("Ada Lovelace");
    expect(resume?.schemaVersion).toBe(SCHEMA_VERSION);
    expect(resume?.sectionOrder).toEqual(DEFAULT_SECTION_ORDER);
  });

  it("survives a corrupt legacy blob", () => {
    localStorage.setItem(LEGACY_KEY, "{not json");
    expect(migrateLegacyBlob()).toBeNull();
  });
});

describe("storage service", () => {
  it("seeds a sample resume on first run and persists it", () => {
    const resume = getOrInitActiveResume();
    expect(loadIndex().activeId).toBe(resume.id);
    expect(loadResume(resume.id)?.name).toBe(resume.name);
  });

  it("adopts the legacy blob on first run", () => {
    localStorage.setItem(
      LEGACY_KEY,
      JSON.stringify({ personalDetails: [{ name: "Grace Hopper" }] })
    );
    const resume = getOrInitActiveResume();
    expect(resume.personalDetails[0].name).toBe("Grace Hopper");
  });

  it("round-trips create / save / load", () => {
    const created = createResume("Test");
    saveResume({ ...created, objective: [{ objective: "Ship it" }] });
    expect(loadResume(created.id)?.objective[0].objective).toBe("Ship it");
    expect(loadIndex().resumes).toHaveLength(1);
  });

  it("exports and re-imports as an independent copy", () => {
    const a = createResume("Original");
    saveResume({ ...a, skills: [{ id: "1", skill: "Rust" }] });
    const json = exportResume(a.id)!;
    const b = importResume(json);
    expect(b.id).not.toBe(a.id);
    expect(b.skills[0].skill).toBe("Rust");
    expect(loadIndex().resumes).toHaveLength(2);
  });

  it("deletes a resume and repoints the active id", () => {
    const a = createResume("A");
    const b = createResume("B");
    const index = deleteResume(a.id);
    expect(index.resumes.map((r) => r.id)).toEqual([b.id]);
    expect(loadResume(a.id)).toBeNull();
  });
});
