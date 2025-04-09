
const container = document.getElementById("arrayContainer");
const codeDisplay = document.getElementById("javaCode");
let zahl = [];
let sorting = false;
let currentStep = 0;
let steps = [];

function generateNewArray() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 900 + 100));
}

function renderArray(array, highlights = {}, sortedIndex = -1) {
    container.innerHTML = "";
    array.forEach((value, index) => {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = value;
        if (highlights[index]) bubble.classList.add("comparing");
        if (index >= sortedIndex) bubble.classList.add("sorted");
        container.appendChild(bubble);
    });
}

function highlightCode(line) {
    const codeLines = ["public class Sortierer {"
"    public void sortierenBubbleSort(int[] zahl) {"
"        int i = 0, j = 0, zwischenspeicher = 0, anzahl = 0;"
"        anzahl = zahl.length;"
"        for(i = 0; i < anzahl - 1; i++) {"
"            for(j = 0; j < anzahl - i - 1; j++) {"
"                if (zahl[j] > zahl[j + 1]) {"
"                    zwischenspeicher = zahl[j];"
"                    zahl[j] = zahl[j + 1];"
"                    zahl[j + 1] = zwischenspeicher;"
"                }"
"            }"
"        }"
"    }"
"}"];
    let output = "";
    for (let i = 0; i < codeLines.length; i++) {
        output += (i === line ? "<span class='highlight'>" : "") +
                  codeLines[i] +
                  (i === line ? "</span>" : "") + "\n";
    }
    codeDisplay.innerHTML = output;
}

function updateVarTable(i, j, zw, valJ, valJ1) {
    const table = `
        <table class='var-table'>
            <tr><th>i</th><th>j</th><th>zwischenspeicher</th><th>zahl[j]</th><th>zahl[j+1]</th></tr>
            <tr>
                <td>${i ?? "-"}</td>
                <td>${j ?? "-"}</td>
                <td>${zw ?? "-"}</td>
                <td>${valJ ?? "-"}</td>
                <td>${valJ1 ?? "-"}</td>
            </tr>
        </table>
    `;
    document.getElementById("varTableContainer").innerHTML = table;
}

function startSort() {
    stopSort();
    zahl = generateNewArray();
    renderArray(zahl);
    highlightCode(2);
    updateVarTable(0, 0, "-", "-", "-");
    bubbleSortSteps();
    currentStep = 0;
    sorting = true;
    playSteps();
}

function stopSort() {
    sorting = false;
}

function stepForward() {
    if (currentStep < steps.length) steps[currentStep++]();
}

function stepBack() {
    if (currentStep > 0) steps[--currentStep]();
}

function bubbleSortSteps() {
    steps = [];
    let arr = [...zahl];
    let anzahl = arr.length;

    steps.push(() => { highlightCode(2); renderArray(arr); updateVarTable(0, 0, "-", "-", "-"); });
    steps.push(() => highlightCode(3));

    for (let i = 0; i < anzahl - 1; i++) {
        steps.push(() => { highlightCode(4); updateVarTable(i, 0); });
        for (let j = 0; j < anzahl - i - 1; j++) {
            steps.push(() => {
                highlightCode(5);
                renderArray(arr, { [j]: true, [j + 1]: true });
                updateVarTable(i, j, "-", arr[j], arr[j + 1]);
            });
            steps.push(() => {
                highlightCode(6);
                updateVarTable(i, j, "-", arr[j], arr[j + 1]);
            });
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                steps.push(() => {
                    highlightCode(7);
                    updateVarTable(i, j, tmp, arr[j], arr[j + 1]);
                });
                steps.push(() => {
                    highlightCode(8);
                    arr[j] = arr[j + 1];
                    updateVarTable(i, j, tmp, arr[j], tmp);
                });
                steps.push(() => {
                    highlightCode(9);
                    arr[j + 1] = tmp;
                    updateVarTable(i, j, tmp, arr[j], arr[j + 1]);
                });
                steps.push(() => renderArray(arr, { [j]: true, [j + 1]: true }));
            }
        }
    }
    steps.push(() => renderArray(arr, {}, 0));
}

async function playSteps() {
    while (currentStep < steps.length && sorting) {
        steps[currentStep++]();
        await new Promise(r => setTimeout(r, 1000));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    zahl = generateNewArray();
    renderArray(zahl);
    highlightCode(2);
    updateVarTable(0, 0, "-", "-", "-");
    bubbleSortSteps();
});
