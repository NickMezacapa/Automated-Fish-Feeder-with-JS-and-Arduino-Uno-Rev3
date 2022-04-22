/* Code using pubnub API to send the "feed" message to Johnny-Five framework to control the arduino. */

require("dotenv").config();
let jfive = require("johnny-five"),
	board,
	motor,
	led;
const express = require("express");
const http = require("http");

// SERVER CONFIG
const PORT = process.env.PORT || 5000;
const app = express();
const server = http
	.createServer(app)
	.listen(PORT, () => console.log(`Listening on ${PORT}`))
	.on("error", (err) => console.log(err));

// Arduino Board Functionality *******

board = new jfive.Board(); // board represents the arduino board

board.on("ready", () => {
	// create new motor hardware isntance
	motor = new jfive.Motor({
		pin: 5, // output pin for the motor
	});
	led = new jfive.Led(13); // led represents the led on the arduino board
});

// Initialized instance for pubnub messaging *******

// Access pubnub subscription and publish keys from .env file
const pn_subscribe_key = process.env.PUBNUB_SUBSCRIBE_KEY;
const pn_publish_key = process.env.PUBNUB_PUBLISH_KEY;

const pubnub = PUBNUB({
	subscribe_key: pn_subscribe_key,
	publish_key: pn_publish_key,
});

pubnub.subscribe({
	channel: "feed",
	callback: function (msg) {
		// spin the motor algorithm
		// if the motor is initalized, and the message is "feed", =>
		// start the motor at speed of 100pwm,
		// allow the motor to run for 1 second.
		if (motor) {
			if (msg.action === "feed") {
				motor.start(100); // motor speed in pwm, 255 max
				// Delay to allow motor to run for 1 second then stop
				board.wait(1000, () => {
					motor.stop(); // stops the motor
				});
			}
		} else {
			// if the motor is not initialized, do nothing and alert user
			alert("Motor not found");
		}
	},
});
