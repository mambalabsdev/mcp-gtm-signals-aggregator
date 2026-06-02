#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(join(here, "..", "package.json"), "utf8"),
) as { version: string; name: string };

// Distinctive UA so Apify run meta.userAgent marks MCP-originated runs.
const USER_AGENT = `mambalabs-mcp ${pkg.name}@${pkg.version}`;

const APIFY_TOKEN = process.env.APIFY_TOKEN;

// The tilde between the org name and the actor name is Apify's required separator.
const ACTOR_ENDPOINT =
  "https://api.apify.com/v2/acts/mambalabs~gtm-signals-aggregator/run-sync-get-dataset-items?timeout=300";

const server = new McpServer({
  name: "mamba-gtm-signals-aggregator",
  version: pkg.version,
});

server.tool(
  "aggregate_gtm_signals",
  "Aggregate a company's GTM signals into one composite score. Runs hiring-signal and tech-stack detection in a single call and returns a flat, Clay-ready JSON row with a composite GTM score, a recommended action, and an optional plain-English summary.",
  {
    company_domain: z
      .string()
      .describe(
        "Bare company domain without https:// and without a trailing slash. Example: stripe.com",
      ),
    include_summary: z
      .boolean()
      .optional()
      .describe(
        "Include a plain-English gtm_signal_summary field in the output. Defaults to the actor's default when omitted.",
      ),
    explain_mode: z
      .boolean()
      .optional()
      .describe(
        "If true, gtm_signal_summary becomes a longer, more detailed explanation instead of a 1 to 2 sentence summary.",
      ),
  },
  async ({ company_domain, include_summary, explain_mode }) => {
    if (!APIFY_TOKEN) {
      return { isError: true, content: [{ type: "text", text: "APIFY_TOKEN is not set. Create a token at https://console.apify.com/account/integrations and set it as the APIFY_TOKEN environment variable." }] };
    }

    const input: Record<string, unknown> = { company_domain };
    if (include_summary !== undefined) input.include_summary = include_summary;
    if (explain_mode !== undefined) input.explain_mode = explain_mode;

    let response: Response;
    try {
      response = await fetch(ACTOR_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${APIFY_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": USER_AGENT,
        },
        body: JSON.stringify(input),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        isError: true,
        content: [{ type: "text", text: `Could not reach the Apify API: ${message}` }],
      };
    }

    if (!response.ok) {
      let detail = "";
      try {
        const body = (await response.json()) as { error?: { message?: string } };
        if (body?.error?.message) detail = ` ${body.error.message}`;
      } catch {
        detail = "";
      }

      let message: string;
      switch (response.status) {
        case 401:
          message = "Invalid Apify token. Check your APIFY_TOKEN environment variable.";
          break;
        case 402:
          message =
            "Insufficient Apify credits. Check your account balance at https://console.apify.com/billing";
          break;
        case 408:
          message =
            "Actor run timed out after 300 seconds. Try again, or run the actor on Apify directly for longer jobs.";
          break;
        default:
          message = `Apify request failed with status ${response.status}.${detail}`;
      }
      return { isError: true, content: [{ type: "text", text: message }] };
    }

    const items = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
