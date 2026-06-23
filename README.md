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

- `company_domain` (required): the bare company domain, no `https://` and no trailing slash. Example: `stripe.com`
- `include_summary` (optional): include a plain-English `gtm_signal_summary` in the output.
- `explain_mode` (optional): if true, the summary becomes a longer, more detailed explanation.

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

## Full actor documentation

This server is a thin client and holds no analysis logic. For the complete input and output reference, pricing, and run history, see the Apify Store page:

https://apify.com/mambalabs/b2b-buying-signals-hiring-tech-stack-intent-for-clay

---

## Mamba Labs GTM Suite

This server is part of the **Mamba Labs GTM Suite**, a fleet of twelve specialized MCP servers for go-to-market signal intelligence, each backed by a dedicated Apify actor.

| Actor | Immutable Actor ID |
|---|---|
| [GTM Hiring Signal Scraper](https://console.apify.com/actors/D7O1SA2EqwHGsGr1P) | `D7O1SA2EqwHGsGr1P` |
| [GTM Tech Stack Signal Enrichment](https://console.apify.com/actors/qyd7nNyqFPelQViBx) | `qyd7nNyqFPelQViBx` |
| [GTM Signals Aggregator](https://console.apify.com/actors/xKdRfnfFNkdMpFuNs) | `xKdRfnfFNkdMpFuNs` |
| [Job Board Keyword Signal Scanner](https://console.apify.com/actors/4DvqpvhMR74NLcDDY) | `4DvqpvhMR74NLcDDY` |
| [Domain to LinkedIn URL Resolver](https://console.apify.com/actors/3HtnSaqPHOg1Qg5gx) | `3HtnSaqPHOg1Qg5gx` |
| [ICP Fit Scorer](https://console.apify.com/actors/W161DT8W4kW55dMFh) | `W161DT8W4kW55dMFh` |
| [Domain Deliverability Checker](https://console.apify.com/actors/0tVgxI7A6o9jMlxmc) | `0tVgxI7A6o9jMlxmc` |
| [Company Firmographic Enricher](https://console.apify.com/actors/YlUtLWjfPpqykmB8g) | `YlUtLWjfPpqykmB8g` |
| [Company Social Presence Mapper](https://console.apify.com/actors/4k6CCemkgBDz18m2h) | `4k6CCemkgBDz18m2h` |
| [Company Identity Resolver](https://console.apify.com/actors/lr8fTRAmZCBZmuwwh) | `lr8fTRAmZCBZmuwwh` |
| [Company Change-Event Feed](https://console.apify.com/actors/oX44rS0fkEJ3rXLWe) | `oX44rS0fkEJ3rXLWe` |
| [Funding & Press Signal Scanner](https://console.apify.com/actors/FS13X6dhQVgX3XOM6) | `FS13X6dhQVgX3XOM6` |

> Built by [Mamba Labs](https://github.com/mambalabsdev) | [npm](https://www.npmjs.com/org/mambalabsdev) | [Apify Store](https://apify.com/mambalabs)

## License

MIT

Built by Mamba Labs. https://apify.com/mambalabs
