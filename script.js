const container = document.getElementById("arrayContainer");
const codeDisplay = document.getElementById("javaCode");

const fixedArray = [29, 10, 14, 37, 13];

function renderArray(array, highlights = {}, sortedIndex = -1) {
    container.innerHTML = "";
    array.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
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

function highlightCode(line, replacements = {}) {
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
        let lineText = codeLines[i];
        if (i === line) {
            output += "<span class='highlight'>" + lineText + "</span>\n";
        } else {
            output += lineText + "\n";
        }
    }

    for (const key in replacements) {
        const value = replacements[key];
        const regex = new RegExp(key, "g");
        output = output.replace(regex, value);
    }

    codeDisplay.innerHTML = output;
}

async function startSort() {
    const zahl = [...fixedArray];
    let i = 0, j = 0, zwischenspeicher = 0, anzahl = zahl.length;

    highlightCode(0); await delay(1500);
    highlightCode(1); await delay(1500);

    for (i = 0; i < anzahl - 1; i++) {
        highlightCode(2, { "i": i }); await delay(1500);
        for (j = 0; j < anzahl - i - 1; j++) {
            highlightCode(3, { "j": j }); await delay(1500);
            renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);

            highlightCode(4, { "zahl[j]": zahl[j], "zahl[j + 1]": zahl[j + 1] }); await delay(2000);

            if (zahl[j] > zahl[j + 1]) {
                highlightCode(5, { "zwischenspeicher": "⟶ " + zahl[j] }); await delay(1500);
                zwischenspeicher = zahl[j];
                highlightCode(6, { "zahl[j]": "⟶ " + zahl[j + 1] }); await delay(1500);
                zahl[j] = zahl[j + 1];
                highlightCode(7, { "zahl[j + 1]": "⟶ " + zwischenspeicher }); await delay(1500);
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
