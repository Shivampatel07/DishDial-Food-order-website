const Sentry = require('@sentry/node')

const successResponse = (res, data, message) => {
	return res.json({ success: 1, data: data, message: message });
}

const errorResponse = (res, message, status_code) => {
	Sentry.captureMessage(message)
	return res.json({ success: 0, message: message, status: status_code });
}

const catchResponse = (res, message, error) => {
	Sentry.captureException(error, message)
	console.log(error)
	return res.status(500).json({ success: 0, message: message, error: error, status: 500 });
}

module.exports = { successResponse, errorResponse, catchResponse }