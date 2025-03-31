const container = document.getElementById("arrayContainer");

function generateArray() {
    const array = [];
    for (let i = 0; i < 5; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
    }
    return array;
}

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
    const zahl = generateArray();
    let i = 0, j = 0, zwischenspeicher = 0, anzahl = zahl.length;

    for (i = 0; i < anzahl - 1; i++) {
        for (j = 0; j < anzahl - i - 1; j++) {
            renderArray(zahl, { [j]: true, [j + 1]: true }, anzahl - i);
            await new Promise(resolve => setTimeout(resolve, 700));

            if (zahl[j] > zahl[j + 1]) {
                zwischenspeicher = zahl[j];
                zahl[j] = zahl[j + 1];
                zahl[j + 1] = zwischenspeicher;
            }
        }
    }

    renderArray(zahl, {}, 0); // final render
}
