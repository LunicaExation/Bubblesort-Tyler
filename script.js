
const container = document.getElementById("arrayContainer");
const codeDisplay = document.getElementById("javaCode");
const fixedArray = [1510, 143, 14, 29, 327];
let sorting = false;
let currentStep = 0;
let steps = [];

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
    const codeLines = [
        "int i = 0, j = 0, zwischenspeicher = 0, anzahl = 0;",
        "anzahl = zahl.length;",
        "for (i = 0; i < anzahl - 1; i++) {",
        "    for (j = 0; j < anzahl - i - 1; j++) {",
        "        if (zahl[j] > zahl[j + 1]) {",
        "            zwischenspeicher = zahl[j];",
        "            zahl[j] = zahl[j + 1];",
        "            zahl[j + 1] = zwischenspeicher;",
        "        }",
        "    }",
        "}"
    ];
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
    if (sorting) return;
    sorting = true;
    bubbleSortSteps();
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
    const zahl = [...fixedArray];
    let anzahl = zahl.length;

    steps.push(() => { highlightCode(0); renderArray(zahl); updateVarTable(0, 0, "-", "-", "-"); });
    steps.push(() => highlightCode(1));

    for (let i = 0; i < anzahl - 1; i++) {
        steps.push(() => { highlightCode(2); updateVarTable(i, 0); });
        for (let j = 0; j < anzahl - i - 1; j++) {
            steps.push(() => {
                highlightCode(3);
                renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);
                updateVarTable(i, j, "-", zahl[j], zahl[j + 1]);
            });
            steps.push(() => {
                highlightCode(4);  // if-Zeile
                updateVarTable(i, j, "-", zahl[j], zahl[j + 1]);
            });
            if (zahl[j] > zahl[j + 1]) {
                let tmp = zahl[j];
                steps.push(() => {
                    highlightCode(5);  // zwischenspeicher = ...
                    updateVarTable(i, j, tmp, zahl[j], zahl[j + 1]);
                });
                steps.push(() => {
                    highlightCode(6);  // zahl[j] = ...
                    zahl[j] = zahl[j + 1];
                    updateVarTable(i, j, tmp, zahl[j], tmp);
                });
                steps.push(() => {
                    highlightCode(7);  // zahl[j+1] = ...
                    zahl[j + 1] = tmp;
                    updateVarTable(i, j, tmp, zahl[j], zahl[j + 1]);
                });
                steps.push(() => {
                    renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);
                });
            }
        }
    }
    steps.push(() => { highlightCode(10); updateVarTable("-", "-", "-", "-", "-"); });
    steps.push(() => renderArray(zahl, {}, 0));
}

async function playSteps() {
    while (currentStep < steps.length && sorting) {
        steps[currentStep++]();
        await new Promise(r => setTimeout(r, 1000));
    }
}
