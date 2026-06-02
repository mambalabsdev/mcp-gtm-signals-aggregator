# GTM Signals Aggregator MCP Server

[![Smithery](https://smithery.ai/badge/mambabuilt/mcp-gtm-signals-aggregator)](https://smithery.ai/servers/mambabuilt/mcp-gtm-signals-aggregator)

An MCP server that rolls a company's go-to-market signals into one composite score. It wraps the Mamba Labs GTM Signals Aggregator actor on Apify and returns a Clay-ready flat JSON row to any MCP client.

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

## Full actor documentation

This server is a thin client and holds no analysis logic. For the complete input and output reference, pricing, and run history, see the Apify Store page:

https://apify.com/mambalabs/gtm-signals-aggregator

## Mamba Labs GTM Suite

This is one of six actors in the Mamba Labs GTM Suite, covering hiring signals, tech stack detection, signal aggregation, job board keyword scanning, LinkedIn URL resolution, and ICP scoring. See them all at https://apify.com/mambalabs.

## License

MIT

Built by Mamba Labs. https://apify.com/mambalabs
