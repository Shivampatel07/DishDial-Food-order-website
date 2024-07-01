const Sentry = require('@sentry/node')

const successResponse = (res, data, message) => {
	return res.json({ success: 1, data: data, message: message });
}

const errorResponse = (res, message, status_code) => {
	sendSentryMessage(message)
	return res.json({ success: 0, message: message, status: status_code });
}

const catchResponse = (res, message, error) => {
	sendSentryException(error, message)
	return res.status(500).json({ success: 0, message: message, error: error, status: 500 });
}

const sendSentryMessage = (message) => {
	if (process.env.ENVIRONMENT === 'production') {
		Sentry.captureMessage(message)
	}
	else {
		console.log(message)
	}
}

const sendSentryException = (error, message) => {
	if (process.env.ENVIRONMENT === 'production') {
		Sentry.captureException(error, message)
	}
	else {
		console.log(error)
	}
}

module.exports = { successResponse, errorResponse, catchResponse }