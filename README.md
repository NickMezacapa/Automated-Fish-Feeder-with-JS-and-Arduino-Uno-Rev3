# Automated-Fish-Feeder-with-JS-and-Arduino-Uno-Rev3

### The Problem:

1. I want to travel but it's difficult to find someone to watch and feed my fish - and they certainly can't go without eating. 
2. Sometimes I really don't want to stop what I'm working on to feed the fish.

### The Solution:

I built a system to feed my fish, hands-free, where ever I am at the click of a button. I built a web interface using Vanilla JS that sends messages to an Arduino Uno Rev3 which is used to control a motor that feeds the fish. Using the interface I can also keep track of remote feedings by date and time.

### Quick Summary Of How It Works

An Arduino Uno and a motor are used to spin an auger mechanism that is attached to the top of the aquarium. The web interface sends a request to the Pubnub API, which sends this request to the Arduino. The motor then turns for a predetermined length of time to dispense the fish food.
