const container = document.getElementById("arrayContainer");
const codeDisplay = document.getElementById("javaCode");

const fixedArray = [29, 10, 14, 37, 13];

let sorting = false;
let currentStep = 0;
let steps = [];

function renderArray(array, highlights = {}, sortedIndex = -1) {
    container.innerHTML = "";
    array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = value * 3 + "px";
        bar.textContent = value;

        if (highlights[index]) {
            bar.classList.add("comparing");
        }
        if (index >= sortedIndex) {
            bar.classList.add("sorted");
        }

        container.appendChild(bar);
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
        if (i === line) {
            output += "<span class='highlight'>" + codeLines[i] + "</span>\n";
        } else {
            output += codeLines[i] + "\n";
        }
    }

    codeDisplay.innerHTML = output;
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
    if (currentStep < steps.length) {
        steps[currentStep++]();
    }
}

function stepBack() {
    if (currentStep > 0) {
        currentStep -= 1;
        steps[currentStep]();
    }
}

function bubbleSortSteps() {
    steps = [];
    const zahl = [...fixedArray];
    let anzahl = zahl.length;

    steps.push(() => {
        highlightCode(0);
        renderArray(zahl);
    });
    steps.push(() => highlightCode(1));

    for (let i = 0; i < anzahl - 1; i++) {
        steps.push(() => highlightCode(2));
        for (let j = 0; j < anzahl - i - 1; j++) {
            steps.push(() => {
                highlightCode(3);
                renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);
            });
            steps.push(() => highlightCode(4));
            if (zahl[j] > zahl[j + 1]) {
                steps.push(() => highlightCode(5));
                steps.push(() => highlightCode(6));
                let tmp = zahl[j];
                zahl[j] = zahl[j + 1];
                steps.push(() => highlightCode(7));
                zahl[j + 1] = tmp;
                steps.push(() => renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i));
            }
        }
    }
    steps.push(() => highlightCode(10));
    steps.push(() => renderArray(zahl, {}, 0));
}

async function playSteps() {
    while (currentStep < steps.length && sorting) {
        steps[currentStep++]();
        await new Promise(resolve => setTimeout(resolve, 1200));
    }
}
