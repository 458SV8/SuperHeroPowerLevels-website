d3.csv("super hero power levels.csv").then(data => {
    const dropdown = d3.select("#heroDropdown");
    const heroName = d3.select("#heroName");
    const heroImage = d3.select("#heroImage");
    const powerGrid = d3.select("#powerGrid");

    data.forEach(hero => {
        dropdown.append("option").text(hero.NAME).attr("value", hero.NAME);
    });

    function updateCard(selectedHero) {
        const hero = data.find(d => d.NAME === selectedHero);

        heroName.text(hero.NAME);
        heroImage.attr("src", hero.images).attr("alt", hero.NAME);

        powerGrid.html("");

        const attributes = ["intelligence", "strength", "speed", "durability", "power"];

        attributes.forEach(attr => {
            const level = Math.round(hero[attr] / 10);
            const powerRow = powerGrid.append("div").attr("class", "power-level");
            powerRow.append("span").text(attr.toUpperCase());

            const cubeContainer = powerRow.append("div").attr("class", "cube-container");
            for (let i = 0; i < 10; i++) {
                cubeContainer.append("div")
                    .attr("class", "cube")
                    .style("background-color", i < level ? "#00aaff" : "#333");
            }
        });
    }

    dropdown.on("change", function () {
        updateCard(dropdown.node().value);
    });

    updateCard(data[0].NAME);
});
