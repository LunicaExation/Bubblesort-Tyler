
const codeLines = [
  "public class BubbleSort {",
  "    public void sortierenBubbleSort() {",
  "        int i = 0, j = 0, zwischenspeicher = 0, anzahl = 0;",
  "        anzahl = zahl.length;",
  "        for (i = 0; i < anzahl - 1; i++) {",
  "            for (j = 0; j < anzahl - i - 1; j++) {",
  "                if (zahl[j] > zahl[j + 1]) {",
  "                    zwischenspeicher = zahl[j];",
  "                    zahl[j] = zahl[j + 1];",
  "                    zahl[j + 1] = zwischenspeicher;",
  "                }",
  "            }",
  "        }",
  "    }",
  "}"
];

const codeBlock = document.getElementById("codeBlock");
codeLines.forEach((line, i) => {
  const div = document.createElement("div");
  div.textContent = line;
  div.id = "code-line-" + (i + 1);
  codeBlock.appendChild(div);
});

const arr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 900 + 100));
const container = document.getElementById("bubbleContainer");
const bubbles = [];

arr.forEach((val, idx) => {
  const b = document.createElement("div");
  b.className = "bubble";
  b.style.background = ["#e74c3c","#f39c12","#2ecc71","#3498db","#9b59b6"][idx % 5];
  b.style.left = (idx * 70) + "px";
  b.textContent = val;
  container.appendChild(b);
  bubbles.push(b);
});

const val_i = document.getElementById("val_i");
const val_j = document.getElementById("val_j");
const val_temp = document.getElementById("val_temp");
const val_curr = document.getElementById("val_curr");
const val_next = document.getElementById("val_next");

let steps = [], current = 0, timer = null;

function addStep(type, i, j, temp, arrayState) {
  steps.push({ type, i, j, temp, array: [...arrayState] });
}

function generateSteps() {
  let a = [...arr];
  let temp;
  for (let i = 0; i < a.length - 1; i++) {
    addStep("line", i, null, null, a);
    for (let j = 0; j < a.length - i - 1; j++) {
      addStep("compare", i, j, null, a);
      if (a[j] > a[j + 1]) {
        temp = a[j];
        addStep("highlight_temp", i, j, temp, a);
        addStep("highlight_assign1", i, j, temp, a);
        addStep("highlight_assign2", i, j, temp, a);
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        addStep("swap", i, j, temp, a);
      }
    }
  }
}
generateSteps();

function updateStep(step) {
  document.querySelectorAll('.highlight').forEach(e => e.classList.remove('highlight'));

  const lineMap = {
    line: 5,
    compare: 6,
    highlight_temp: 7,
    highlight_assign1: 8,
    highlight_assign2: 9,
    swap: null
  };

  const codeLine = lineMap[step.type];
  if (codeLine !== null) {
    const lineEl = document.getElementById("code-line-" + codeLine);
    if (lineEl) lineEl.classList.add("highlight");
  }

  val_i.textContent = step.i ?? "-";
  val_j.textContent = step.j ?? "-";
  val_temp.textContent = step.temp ?? "-";

  if (step.j != null) {
    if (step.type === "highlight_temp") {
      val_curr.textContent = step.array[step.j];
      val_next.textContent = step.array[step.j + 1];
    } else if (step.type === "highlight_assign1") {
      val_curr.textContent = step.array[step.j + 1];
      val_next.textContent = step.array[step.j + 1];
    } else if (step.type === "highlight_assign2") {
      val_curr.textContent = step.array[step.j + 1];
      val_next.textContent = step.temp;
    } else {
      val_curr.textContent = step.array[step.j];
      val_next.textContent = step.array[step.j + 1];
    }
  } else {
    val_curr.textContent = "-";
    val_next.textContent = "-";
  }

  step.array.forEach((val, i) => {
    bubbles[i].textContent = val;
    bubbles[i].style.left = (i * 70) + "px";
  });

  if (step.type === "swap") {
    const j = step.j;
    const tmp = bubbles[j];
    bubbles[j] = bubbles[j + 1];
    bubbles[j + 1] = tmp;
    bubbles[j].style.left = (j * 70) + "px";
    bubbles[j + 1].style.left = ((j + 1) * 70) + "px";
  }
}

document.getElementById("start").onclick = () => {
  if (timer) return;
  timer = setInterval(() => {
    if (current < steps.length) {
      updateStep(steps[current++]);
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 800);
};

document.getElementById("stop").onclick = () => {
  clearInterval(timer);
  timer = null;
};

document.getElementById("next").onclick = () => {
  if (current < steps.length) {
    updateStep(steps[current++]);
  }
};

document.getElementById("prev").onclick = () => {
  if (current > 0) {
    updateStep(steps[--current]);
  }
};

updateStep(steps[0]);
