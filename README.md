# GTM Signals Aggregator MCP Server

[![Smithery](https://smithery.ai/badge/mambabuilt/mcp-gtm-signals-aggregator)](https://smithery.ai/servers/mambabuilt/mcp-gtm-signals-aggregator) [![Glama score](https://glama.ai/mcp/servers/mambalabsdev/mcp-gtm-signals-aggregator/badges/score.svg)](https://glama.ai/mcp/servers/mambalabsdev/mcp-gtm-signals-aggregator) [![MCP Registry](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fregistry.modelcontextprotocol.io%2Fv0%2Fservers%3Fsearch%3Dcom.mambabuilt%252Fmcp-gtm-signals-aggregator%26limit%3D1&query=%24.servers%5B0%5D._meta%5B%22io.modelcontextprotocol.registry%2Fofficial%22%5D.status&label=mcp%20registry&color=blue)](https://registry.modelcontextprotocol.io/v0/servers?search=com.mambabuilt/mcp-gtm-signals-aggregator&limit=1) [![npm version](https://img.shields.io/npm/v/@mambalabsdev/mcp-gtm-signals-aggregator)](https://www.npmjs.com/package/@mambalabsdev/mcp-gtm-signals-aggregator) [![npm downloads](https://img.shields.io/npm/dm/@mambalabsdev/mcp-gtm-signals-aggregator)](https://www.npmjs.com/package/@mambalabsdev/mcp-gtm-signals-aggregator) [![license](https://img.shields.io/github/license/mambalabsdev/mcp-gtm-signals-aggregator)](https://github.com/mambalabsdev/mcp-gtm-signals-aggregator/blob/main/LICENSE) [![mcpservers.org](https://img.shields.io/badge/mcpservers.org-listed-blue)](https://mcpservers.org/servers/mambalabsdev/mcp-gtm-signals-aggregator)

An MCP server that rolls a company's go-to-market signals into one composite score. It wraps the Mamba Labs GTM Signals Aggregator actor on Apify and returns a Clay-ready flat JSON row to any MCP client.

## What's Inside

- [What it does](#what-it-does)
- [Quick start](#quick-start)
- [Prerequisites](#prerequisites)
- [Example prompts](#example-prompts)
- [Inputs](#inputs)
- [Output](#output)
- [Example output](#example-output)
- [Features](#features)
- [What this server does and does not do](#what-this-server-does-and-does-not-do)
- [How each call runs](#how-each-call-runs)
- [Full actor documentation](#full-actor-documentation)
- [Mamba Labs GTM Suite](#mamba-labs-gtm-suite)
- [License](#license)

## What it does

Give it a company domain and it runs hiring-signal and tech-stack detection together, then returns a single composite GTM score, a recommended action, and an optional plain-English summary. One call, one row, ready to drop into Clay, a CRM, or an AI agent workflow. All of the analysis runs on Apify. This package is a thin client that calls the actor and hands back the result.

## Quick start

You need Node.js 18 or newer and an Apify account with an API token.

Add this to your Claude Desktop config:

```json
{
  "mcpServers": {
    "mamba-gtm-signals": {
      "command": "npx",
      "args": ["-y", "@mambalabsdev/mcp-gtm-signals-aggregator"],
      "env": {
        "APIFY_TOKEN": "your-apify-token"
      }
    }
  }
}
```

Get your token at https://console.apify.com/account/integrations, paste it in, and restart Claude Desktop. The `aggregate_gtm_signals` tool will be available.

## Prerequisites

- Node.js 18 or newer
- An Apify account with an API token

## Example prompts

- "Give me the overall GTM signal score for stripe.com."
- "How strong a GTM target is openai.com? Aggregate their signals."
- "Score figma.com on hiring and tech stack, and explain why."
- "Pull the composite GTM signal for datadoghq.com with a summary."

## Inputs

Every input the tool accepts, generated from the server's own tool list.

| Input | Type | Required | Description |
| --- | --- | --- | --- |
| `company_domain` | string | yes | Bare company domain without https:// and without a trailing slash. Example: stripe.com |
| `sources` | array of `hiring`, `tech_stack`, `funding`, `events`, `workplace` | no | Which signals to aggregate. Default ["hiring", "tech_stack"], which is what this actor has always run. Each extra source is one more sub actor run on the caller's own Apify account, so this is the cost dial as well as the depth dial. The composite score is normalized over the sources you selected, so a funding only run is scored on its own scale rather than capped by absent sources. |
| `include_summary` | boolean | no | Include a plain-English gtm_signal_summary field in the output. Defaults to the actor's default when omitted. |
| `explain_mode` | boolean | no | If true, gtm_signal_summary becomes a longer, more detailed explanation instead of a 1 to 2 sentence summary. |

## Output

The tool returns the actor's flat JSON row for the scanned company, including the composite GTM score, a recommended action, the underlying hiring and tech-stack signals, and an optional summary. See the Apify Store page for the full output schema.

## Example output

```json
{
  "company_domain": "notion.so",
  "composite_signal": "strong",
  "composite_score": 82,
  "recommended_action": "prioritize",
  "gtm_hiring_signal": true,
  "signal_strength": "high",
  "gtm_role_count": 9,
  "crm_detected": "salesforce",
  "tech_stack_signal": "high",
  "gtm_tool_count": 5,
  "run_date": "2026-05-28"
}
```

## Features

- Combines hiring signals and tech stack detection in a single call
- Flat row with composite_score, composite_signal, and recommended_action
- Optional plain-English gtm_signal_summary
- Designed for AI agent consumption

## What this server does and does not do

- It does one thing: one composite GTM score for one company per call, built from the sources you pick in `sources` (hiring, tech stack, funding, events, workplace).
- Each extra source is one more sub actor run on your own Apify account, so `sources` is both the depth dial and the cost dial.
- It does not return the underlying signals one by one. For those, call the single purpose servers, or install [@mambalabsdev/mcp-gtm-suite](https://www.npmjs.com/package/@mambalabsdev/mcp-gtm-suite), which carries this tool and twenty other account-intelligence tools in one server.
- It reads public company pages only. It writes nothing anywhere.

## How each call runs

Each call starts the actor run, polls it until it finishes, then reads the dataset. The run is allowed 1,800 seconds. If the run is still going when this call stops waiting, the call returns the run id and a console link instead of a timeout, so the result is never lost.

## Full actor documentation

This server is a thin client and holds no analysis logic. For the complete input and output reference, pricing, and run history, see the Apify Store page:

https://apify.com/mambalabs/b2b-buying-signals-hiring-tech-stack-intent-for-clay

---

## Mamba Labs GTM Suite

This server is one of 54 Mamba Labs MCP servers, each backed by a dedicated Apify actor and published under [@mambalabsdev on npm](https://www.npmjs.com/org/mambalabsdev). The ones closest to this server:

| Actor | Immutable Actor ID |
|---|---|
| [GTM Hiring Signal Scraper](https://apify.com/mambalabs/gtm-hiring-signal-scraper) | `D7O1SA2EqwHGsGr1P` |
| [Tech Stack Signal Detector](https://apify.com/mambalabs/gtm-tech-stack-signal-scraper) | `qyd7nNyqFPelQViBx` |
| [GTM Signals Aggregator](https://apify.com/mambalabs/b2b-buying-signals-hiring-tech-stack-intent-for-clay) | `xKdRfnfFNkdMpFuNs` |
| [Job Board Keyword Signal Scanner](https://apify.com/mambalabs/job-board-keyword-signal-scanner) | `4DvqpvhMR74NLcDDY` |
| [Domain to LinkedIn URL Resolver](https://apify.com/mambalabs/domain-to-linkedin-url-resolver) | `3HtnSaqPHOg1Qg5gx` |
| [ICP Fit Scorer](https://apify.com/mambalabs/icp-account-lead-scoring-fit-scorer-0-100-for-clay) | `W161DT8W4kW55dMFh` |
| [Domain Deliverability Checker](https://apify.com/mambalabs/domain-deliverability-checker) | `0tVgxI7A6o9jMlxmc` |
| [Company Firmographic Enricher](https://apify.com/mambalabs/company-firmographic-enricher) | `YlUtLWjfPpqykmB8g` |
| [Company Social Presence Mapper](https://apify.com/mambalabs/company-social-presence-mapper) | `4k6CCemkgBDz18m2h` |
| [Company Identity Resolver](https://apify.com/mambalabs/company-identity-resolver) | `lr8fTRAmZCBZmuwwh` |
| [Company Change Event Feed](https://apify.com/mambalabs/company-change-event-feed) | `oX44rS0fkEJ3rXLWe` |
| [Funding and Press Signal Scanner](https://apify.com/mambalabs/funding-press-signal-scanner) | `FS13X6dhQVgX3XOM6` |

To get twenty one of them in one install, use [@mambalabsdev/mcp-gtm-suite](https://www.npmjs.com/package/@mambalabsdev/mcp-gtm-suite).

> Built by [Mamba Labs](https://mambabuilt.com) | [npm](https://www.npmjs.com/org/mambalabsdev) | [Apify Store](https://apify.com/mambalabs)

## License

MIT

Built by Mamba Labs. https://apify.com/mambalabs
