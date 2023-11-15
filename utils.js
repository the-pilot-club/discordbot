const Sentry = require("@sentry/node")

export function sendToSentry(err, locationLabel) {
    Sentry.withScope(function (scope) {
        // group errors together based on their request and response
        scope.setFingerprint([locationLabel, err.toString()]);
        Sentry.captureException(err);
    });
}