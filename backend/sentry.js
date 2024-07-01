// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");
require('dotenv').config()

if (process.env.ENVIRONMENT === 'production') {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [Sentry.rewriteFramesIntegration()]
	});
}