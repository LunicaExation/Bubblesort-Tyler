const container = document.getElementById("arrayContainer");

const fixedArray = [29, 10, 14, 37, 13]; // feste Zahlen wie im Java-Code

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

async function startSort() {
    const zahl = [...fixedArray]; // kopieren, um Original zu behalten
    let i = 0, j = 0, zwischenspeicher = 0, anzahl = zahl.length;

    for (i = 0; i < anzahl - 1; i++) {
        for (j = 0; j < anzahl - i - 1; j++) {
            renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);
            await new Promise(resolve => setTimeout(resolve, 1200));

            if (zahl[j] > zahl[j + 1]) {
                zwischenspeicher = zahl[j];
                zahl[j] = zahl[j + 1];
                zahl[j + 1] = zwischenspeicher;
            }
        }
    }

    renderArray(zahl, {}, 0); // final render
}
