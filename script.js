 let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("#voiceSelect");

// Load and show all usable voices (without localService filter)
function loadVoices() {
  voices = window.speechSynthesis.getVoices();

  // Broader filter: include voices even if not localService
  const usableVoices = voices.filter(
    (voice) =>
      voice.lang.startsWith("en") || voice.lang.startsWith("hi")
  );

  voiceSelect.innerHTML = ""; // Clear old options

  usableVoices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  if (usableVoices.length > 0) {
    speech.voice = usableVoices[0];
  }

  voices = usableVoices;
}

window.speechSynthesis.onvoiceschanged = loadVoices;

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  window.speechSynthesis.cancel(); // stop old
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});
