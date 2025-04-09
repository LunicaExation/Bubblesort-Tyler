
// Variablen
let steps = [], currentStep = 0, isPlaying = false, playTimeout = null;
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
const arraySize = 5;
let arr = Array.from({ length: arraySize }, () => randInt(100, 999));

const codeLines = [
  "public class BubbleSort {",
  "    public static void main(String[] args) {",
  `        int[] arr = { ${arr.join(", ")} };`,
  "        bubbleSort(arr);",
  "    }",
  "    public static void bubbleSort(int[] arr) {",
  "        int i, j, temp;",
  "        for (i = 0; i < arr.length - 1; i++) {",
  "            for (j = 0; j < arr.length - i - 1; j++) {",
  "                if (arr[j] > arr[j + 1]) {",
  "                    temp = arr[j];",
  "                    arr[j] = arr[j + 1];",
  "                    arr[j + 1] = temp;",
  "                }",
  "            }",
  "        }",
  "    }",
  "}"
];

const codeBlock = document.getElementById("codeBlock");
codeLines.forEach((line, index) => {
  const lineElem = document.createElement("div");
  lineElem.textContent = line;
  lineElem.id = "code-line-" + (index + 1);
  codeBlock.appendChild(lineElem);
});

const val_i = document.getElementById("val_i");
const val_j = document.getElementById("val_j");
const val_temp = document.getElementById("val_temp");
const val_curr = document.getElementById("val_curr");
const val_next = document.getElementById("val_next");
const bubbleContainer = document.getElementById("bubbleContainer");
const bubbleColors = ["#e74c3c", "#f39c12", "#3498db", "#2ecc71", "#9b59b6"];
let bubbleEls = [];

arr.forEach((value, idx) => {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = value.toString();
  bubble.style.backgroundColor = bubbleColors[idx % bubbleColors.length];
  bubble.style.left = (idx * 60) + "px";
  bubbleContainer.appendChild(bubble);
  bubbleEls[idx] = bubble;
});

function computeSteps(array) {
  const n = array.length;
  let temp;
  steps.push({ codeLine: null, i: null, j: null, temp: null, arr: array.slice() });
  for (let i = 0; i < n - 1; i++) {
    steps.push({ codeLine: 8, i: i, j: null, temp: temp ?? null, arr: array.slice() });
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ codeLine: 9, i: i, j: j, temp: temp ?? null, arr: array.slice() });
      steps.push({ codeLine: 10, i: i, j: j, temp: temp ?? null, arr: array.slice() });
      if (array[j] > array[j + 1]) {
        temp = array[j];
        steps.push({ codeLine: 11, i: i, j: j, temp: temp, arr: array.slice() });
        array[j] = array[j + 1];
        steps.push({ codeLine: 12, i: i, j: j, temp: temp, arr: array.slice() });
        array[j + 1] = temp;
        steps.push({ codeLine: 13, i: i, j: j, temp: temp, arr: array.slice() });
      }
    }
  }
}

function renderState(stepIndex) {
  const state = steps[stepIndex];
  document.querySelectorAll(".highlight").forEach(el => el.classList.remove("highlight"));
  if (state.codeLine) {
    const codeLineElem = document.getElementById("code-line-" + state.codeLine);
    if (codeLineElem) codeLineElem.classList.add("highlight");
  }
  val_i.textContent = state.i ?? "";
  val_j.textContent = state.j ?? "";
  val_temp.textContent = state.temp ?? "";
  val_curr.textContent = state.j !== null ? state.arr[state.j] ?? "" : "";
  val_next.textContent = state.j !== null ? state.arr[state.j + 1] ?? "" : "";

  bubbleEls.forEach(b => b.classList.remove("active"));
  if (state.codeLine === 10 && state.j !== null) {
    bubbleEls[state.j]?.classList.add("active");
    bubbleEls[state.j + 1]?.classList.add("active");
  }
  if (state.codeLine === 13 && state.j !== null) {
    let j = state.j;
    let tempBubble = bubbleEls[j];
    bubbleEls[j] = bubbleEls[j + 1];
    bubbleEls[j + 1] = tempBubble;
    bubbleEls[j].style.left = (j * 60) + "px";
    bubbleEls[j + 1].style.left = ((j + 1) * 60) + "px";
  }
}

computeSteps(arr.slice());
renderState(currentStep);

const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");

function updateButtons() {
  btnPrev.disabled = currentStep <= 0;
  btnNext.disabled = currentStep >= steps.length - 1;
  btnStart.disabled = currentStep >= steps.length - 1;
  btnStop.disabled = !isPlaying;
}
updateButtons();

function playForward() {
  if (!isPlaying) return;
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderState(currentStep);
    updateButtons();
    const state = steps[currentStep];
    let delay = (state.codeLine === 13) ? 1200 : 800;
    playTimeout = setTimeout(playForward, delay);
  } else {
    isPlaying = false;
    updateButtons();
  }
}

btnStart.onclick = () => {
  if (currentStep >= steps.length - 1) return;
  if (!isPlaying) {
    isPlaying = true;
    updateButtons();
    playTimeout = setTimeout(playForward, 0);
  }
};

btnStop.onclick = () => {
  isPlaying = false;
  clearTimeout(playTimeout);
  updateButtons();
};

btnNext.onclick = () => {
  isPlaying = false;
  clearTimeout(playTimeout);
  if (currentStep < steps.length - 1) {
    currentStep++;
    renderState(currentStep);
    updateButtons();
  }
};

btnPrev.onclick = () => {
  isPlaying = false;
  clearTimeout(playTimeout);
  if (currentStep > 0) {
    currentStep--;
    renderState(currentStep);
    updateButtons();
  }
};
