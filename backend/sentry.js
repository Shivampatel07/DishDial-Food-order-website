// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");

Sentry.init({
	dsn: "https://d773c731df0df3356dffd58d1cb6612e@o4507123081412608.ingest.de.sentry.io/4507441037770832",
	integrations: [Sentry.rewriteFramesIntegration()]
});