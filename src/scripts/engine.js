const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-check input");

const mappedKeys = [];
let audioVolume = 0.5;

const playTune = (key) => {
  const audio = new Audio(`/src/tunes/${key}.wav`);
  audio.volume = audioVolume;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");

  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mappedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if (!mappedKeys.includes(e.key)) return;
  if (e.repeat) return;
  playTune(e.key);
});

const handleVolume = (e) => {
  audioVolume = e.target.value;
  volumeSlider.blur();
};

volumeSlider.addEventListener("input", handleVolume);

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

keysCheckbox.addEventListener("input", () => {
  pianoKeys.forEach((key) => {
    if (!keysCheckbox.checked) {
      key.classList.add("hide");
    } else {
      key.classList.remove("hide");
    }
  });
});
