let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("#voiceSelect");

// Function to load voices into select
function loadVoices() {
  voices = window.speechSynthesis.getVoices();

  // Filter voices (Hindi and English)
  const usableVoices = voices.filter(
    (voice) =>
      voice.lang.startsWith("en") || voice.lang.startsWith("hi")
  );

  voiceSelect.innerHTML = ""; // Clear any previous/default options

  usableVoices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  // Default voice
  if (usableVoices.length > 0) {
    speech.voice = usableVoices[0];
  }

  voices = usableVoices; // Save for later use
}

// ✅ Load voices when browser fires the event
window.speechSynthesis.onvoiceschanged = loadVoices;

// ✅ Extra fallback load for mobile browsers
setTimeout(loadVoices, 200);

// ✅ Change voice when user selects from dropdown
voiceSelect.addEventListener("change", () => {
  const selectedIndex = voiceSelect.value;
  speech.voice = voices[selectedIndex];
});

// ✅ Speak text on button click
document.querySelector("button").addEventListener("click", () => {
  window.speechSynthesis.cancel(); // Stop any current speech

  const selectedIndex = voiceSelect.value;
  speech.voice = voices[selectedIndex]; // Set selected voice
  speech.text = document.querySelector("textarea").value;

  // ✅ Give browser a small delay to apply voice properly
  setTimeout(() => {
    window.speechSynthesis.speak(speech);
  }, 100);
});
