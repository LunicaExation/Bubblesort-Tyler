
const codeLines = ['public class BubbleSort {', '    public void sortierenBubbleSort() {', '        int i = 0, j = 0, zwischenspeicher = 0, anzahl = 0;', '        anzahl = zahl.length;', '        for (i = 0; i < anzahl - 1; i++) {', '            for (j = 0; j < anzahl - i - 1; j++) {', '                if (zahl[j] > zahl[j + 1]) {', '                    zwischenspeicher = zahl[j];', '                    zahl[j] = zahl[j + 1];', '                    zahl[j + 1] = zwischenspeicher;', '                }', '            }', '        }', '    }', '}'];
const codeBlock = document.getElementById("codeBlock");
codeLines.forEach((line, i) => {
  const div = document.createElement("div");
  div.textContent = line;
  div.id = "code-line-" + (i + 1);
  codeBlock.appendChild(div);
});
const arr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 500 + 100));
const container = document.getElementById("bubbleContainer");
const bubbles = [];
arr.forEach((val, idx) => {
  const b = document.createElement("div");
  b.className = "bubble";
  b.style.background = ["#e74c3c","#f39c12","#2ecc71","#3498db","#9b59b6"][idx % 5];
  b.textContent = val;
  container.appendChild(b);
  bubbles.push(b);
});
const tableVals = {
  i: document.getElementById("val_i"),
  j: document.getElementById("val_j"),
  temp: document.getElementById("val_temp"),
  curr: document.getElementById("val_curr"),
  next: document.getElementById("val_next"),
};
let steps = [], current = 0;
function addStep(line, i, j, temp, a) {
  steps.push({ line, i, j, temp, a: [...a] });
}
function generateSteps() {
  let a = [...arr], n = a.length, temp;
  for (let i = 0; i < n - 1; i++) {
    addStep(5, i);
    for (let j = 0; j < n - i - 1; j++) {
      addStep(6, i, j);
      if (a[j] > a[j + 1]) {
        temp = a[j]; addStep(7, i, j, temp);
        a[j] = a[j + 1]; addStep(8, i, j, temp);
        a[j + 1] = temp; addStep(9, i, j, temp);
      }
    }
  }
} generateSteps();
function update() {
  document.querySelectorAll('.highlight').forEach(e => e.classList.remove('highlight'));
  const s = steps[current];
  document.getElementById("code-line-" + s.line)?.classList.add("highlight");
  tableVals.i.textContent = s.i ?? "-";
  tableVals.j.textContent = s.j ?? "-";
  tableVals.temp.textContent = s.temp ?? "-";
  tableVals.curr.textContent = s.j != null ? s.a[s.j] : "-";
  tableVals.next.textContent = s.j != null ? s.a[s.j+1] : "-";
  s.a.forEach((v, i) => bubbles[i].textContent = v);
}
document.getElementById("next").onclick = () => {
  if (current < steps.length - 1) { current++; update(); }
};
document.getElementById("prev").onclick = () => {
  if (current > 0) { current--; update(); }
};
let timer = null;
document.getElementById("start").onclick = () => {
  if (timer) return;
  timer = setInterval(() => {
    if (current < steps.length - 1) { current++; update(); }
    else clearInterval(timer);
  }, 700);
};
document.getElementById("stop").onclick = () => {
  clearInterval(timer);
  timer = null;
};
update();
