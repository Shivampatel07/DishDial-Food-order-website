const Sentry = require('@sentry/node')
const successResponse = (res, message) => {
	return res.json({ message });
}

const errorResponse = (res, message) => {
	Sentry.captureMessage(message)
	return res.json({ error: message });
}

const catchResponse = (res, message, error) => {
	Sentry.captureException(error, message)
	console.log(error)
	return res.status(500).json({ error: message });
}

module.exports = { successResponse, errorResponse, catchResponse }