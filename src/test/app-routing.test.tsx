import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { PROJECTS } from "@/lib/projects";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a detail page for every portfolio project", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const project of PROJECTS) {
      const matches = router.matchRoutes(`/projects/${project.id}`);
      expect(matches.at(-1)?.routeId).toBe("/projects/$projectId");
    }
  });
});
