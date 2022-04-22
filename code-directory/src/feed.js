// Below is all code for front-end:

const feed = document.querySelector("#feed");
const feedings_container = document.querySelector(".feedings");
const feedings_zero = document.querySelector("#feedings-zero");
const clearAllFeedings = document.querySelector("#clear-all");
const clearFeedingEntry = document.querySelector("#clear-entry");
const feedingBtnCta = document.querySelector(".feeding-btn-cta");
const learnMore = document.querySelector("#learn-more");
const feedingsTitle = document.querySelector(".feedings-title");

// Add event listener to feed button
// If the zero feedings message is displayed, remove it
// Otherwise, add a new feeding entry with the date and time of that feeding
feed.addEventListener("click", () => {
	// Code for feed recording functionality *******
	if (feedings_container.contains(feedings_zero)) {
		feedings_container.removeChild(feedings_zero);
	}
	// Create a new feeding entry
	const feedings_list = document.createElement("ul");
	feedings_list.style.color = "#fff";
	feedings_container.appendChild(feedings_list);
	// Get date and time
	const date = new Date();
	const time = date.toLocaleTimeString();
	const date_time = `${time}, ${date.toLocaleDateString()}`;
	const feeding_entry = document.createElement("li");
	feeding_entry.textContent = date_time;
	feedings_list.appendChild(feeding_entry);
	// Every time there is a successful call to the arduino board, display a success message for 2 seconds
	const success_message = document.createElement("p");
	success_message.textContent = "Successfully fed";
	success_message.style.color = "#00ff00";
	success_message.style.fontSize = "1rem";
	success_message.style.marginTop = "2rem";
	feedings_container.appendChild(success_message);
	setTimeout(() => {
		success_message.remove(); // removing after 2 seconds
	}, 2000);
	// When the feed button is clicked, we need to send the feed message to the arduino
	pubnub.publish({
		channel: "feeder",
		message: { action: "feed" },
	});
});

// add an event listener to the clear all button so that when it is clicked, all the feedings are removed
clearAllFeedings.addEventListener("click", () => {
	feedings_container.innerHTML = "";
	feedings_container.appendChild(feedings_zero);
	feedings_container.appendChild(feedingBtnCta);
});
// add an event listener to the clear entry button so that every time it is clicked, the last feed recording is removed
clearFeedingEntry.addEventListener("click", () => {
	const last_element = feedings_container.lastElementChild;
	if (last_element.tagName === "UL") {
		last_element.remove();
	} else {
		last_element.remove();
	}
	// after removing an entry, if there are no more feedings in the list, append the feedings_zero div
	if (feedings_container.children.length === 1) {
		feedings_container.appendChild(feedings_zero);
	}
});

// add event listener to the learn more button to display a paragraph about how it works
learnMore.addEventListener("click", () => {
	feedings_container.innerHTML = "";
	feedingsTitle.innerHTML = "How it works:";
	const paragraph = document.createElement("p");
	paragraph.style.width = "300px";
	paragraph.textContent =
		"An Arduino Uno and a motor are used to spin an auger mechanism that is attached to the top of the aquarium. The web interface sends a request to the Pubnub API, which sends this request to the Arduino. The motor then turns for a predetermined length of time to dispense the fish food.";
	paragraph.style.color = "#fff";
	paragraph.style.fontSize = "1rem";
	paragraph.style.marginTop = "-2rem";
	paragraph.style.textAlign = "center";
	feedings_container.appendChild(paragraph);
	// create a back button inside the feedings container div to bring user back to recordings
	// Add an event listener so that when it is clicked, the paragraph is removed and the feedings_zero div is appended.
	const back_button = document.createElement("button");
	back_button.textContent = "Back";
	back_button.style.color = "#1d1d1f";
	back_button.style.fontSize = "1rem";
	back_button.style.marginTop = "2rem";
	back_button.style.textAlign = "center";
	back_button.style.padding = "10px 12px";
	back_button.style.borderRadius = "12px";
	back_button.style.cursor = "pointer";
	feedings_container.appendChild(back_button);
	back_button.addEventListener("click", () => {
		feedings_container.innerHTML = "";
		feedingsTitle.innerHTML = "Logged Feedings:";
		feedings_container.appendChild(feedings_zero);
		feedings_container.appendChild(feedingBtnCta);
	});
});
