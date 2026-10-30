import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/lib/projects";

describe("Portfolio project metadata", () => {
  it("only exposes repository, live-site, and design links for the intended projects", () => {
    expect(
      PROJECTS.filter((project) => project.repositoryHref).map((project) => project.id),
    ).toEqual(["butter-crumb", "lip-velvet", "anatokid", "e-course", "mediva"]);
    expect(PROJECTS.filter((project) => project.liveHref).map((project) => project.id)).toEqual([
      "butter-crumb",
      "lip-velvet",
    ]);
    expect(PROJECTS.filter((project) => project.designHref).map((project) => project.id)).toEqual([
      "alerta",
      "ocean-guardians",
      "learnify",
    ]);
  });

  it("includes the ALERTA artwork and Learnify competition documentation", () => {
    const alerta = PROJECTS.find((project) => project.id === "alerta");
    const learnify = PROJECTS.find((project) => project.id === "learnify");

    expect(alerta?.screenshots.map((screenshot) => screenshot.src)).toContain(
      "/assets/alerta.jpeg",
    );
    expect(learnify?.screenshots.map((screenshot) => screenshot.src)).toContain(
      "/assets/lidm-dokumentasi.jpg",
    );
  });
});
