const container = document.getElementById("arrayContainer");
const codeDisplay = document.getElementById("javaCode");

const fixedArray = [29, 10, 14, 37, 13];

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

async function startSort() {
    const zahl = [...fixedArray];
    let i = 0, j = 0, zwischenspeicher = 0, anzahl = zahl.length;

    highlightCode(0); await delay(1500);
    highlightCode(1); await delay(1500);

    for (i = 0; i < anzahl - 1; i++) {
        highlightCode(2); await delay(1200);
        for (j = 0; j < anzahl - i - 1; j++) {
            highlightCode(3); await delay(1200);
            renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);
            highlightCode(4); await delay(1500);

            if (zahl[j] > zahl[j + 1]) {
                highlightCode(5); await delay(1200);
                zwischenspeicher = zahl[j];
                highlightCode(6); await delay(1200);
                zahl[j] = zahl[j + 1];
                highlightCode(7); await delay(1200);
                zahl[j + 1] = zwischenspeicher;
                renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);
            }
        }
    }

    renderArray(zahl, {}, 0);
    highlightCode(10);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
