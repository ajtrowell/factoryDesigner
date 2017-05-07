var items = {
    purpleScience: {
        name: "purpleScience",
        craftTime: 14,
        recipeArray: [[1,"pumpJack"],[1,"electricEngine"],[1,"electricFurnace"]],
        outputQty: 2
    },
    pumpJack: {
        name: "pumpJack",
        craftTime: 10,
        recipeArray: [[5,"steelPlate"],[10,"ironGear"],[5,"greenCircuit"]],
        outputQty: 1
    },
    ironGear: {
        name: "ironGear",
        craftTime: 0.5,
        recipeArray: [[2,"ironPlate"]],
        outputQty: 1
    },
    pipe: {
        name: "pipe",
        craftTime: 0.5,
        recipeArray: [[1,"ironPlate"]],
        outputQty: 1
    },
    electricEngine: {
        name: "electricEngine",
        craftTime: 10,
        recipeArray: [[1,"engine"],[2,"greenCircuit"],[15,"lubricant"]],
        outputQty: 1
    },
    engine: {
        name: "engine",
        craftTime: 10,
        recipeArray: [[1,"steelPlate"],[1,"ironGear"],[2,"pipe"]],
        outputQty: 1
    },
    electricFurnace: {
        name: "electricFurnace",
        craftTime: 5,
        recipeArray: [[10,"steelPlate"],[5,"redCircuit"],[10,"stoneBricks"]],
        outputQty: 1
    },
    militaryScience: {
        name: "militaryScience",
        craftTime: 10,
        recipeArray: [[1,"piercingMagazine"],[1,"grenade"],[1,"gunTurret"]],
        outputQty: 2
    },
    piercingMagazine: {
        name: "piercingMagazine",
        craftTime: 3,
        recipeArray: [[1,"magazine"],[1,"steelPlate"],[5,"copperPlate"]],
        outputQty: 1
    },
    magazine: {
        name: "magazine",
        craftTime: 1,
        recipeArray: [[4,"ironPlate"]],
        outputQty: 1
    },
    grenade: {
        name: "grenade",
        craftTime: 8,
        recipeArray: [[5,"ironPlate"],[10,"coal"]],
        outputQty: 1
    },
    gunTurret: {
        name: "gunTurret",
        craftTime: 8,
        recipeArray: [[10,"ironGear"],[10,"copperPlate"],[20,"ironPlate"]],
        outputQty: 1
    },
    redScience: {
        name: "redScience",
        craftTime: 5,
        recipeArray: [[1,"copperPlate"],[1,"ironGear"]],
        outputQty: 1
    },
    greenScience: {
        name: "greenScience",
        craftTime: 6,
        recipeArray: [[1,"inserter"],[1,"yellowBelt"]],
        outputQty: 1
    },
    inserter: {
        name: "inserter",
        craftTime: 0.5,
        recipeArray: [[1,"greenCircuit"],[1,"ironGear"],[1,"ironPlate"]],
        outputQty: 1
    },
    yellowBelt: {
        name: "yellowBelt",
        craftTime: 0.5,
        recipeArray: [[1,"ironPlate"],[1,"ironGear"]],
        outputQty: 2
    },
    redBelt: {
        name: "redBelt",
        craftTime: 0.5,
        recipeArray: [[5,"ironGear"],[1,"yellowBelt"]],
        outputQty: 1
    },
    greenCircuit: {
        name: "greenCircuit",
        craftTime: 0.5,
        recipeArray: [[1,"ironPlate"],[3,"copperCable"]],
        outputQty: 1
    },
    copperCable: {
        name: "copperCable",
        craftTime: 0.5,
        recipeArray: [[1,"copperPlate"]],
        outputQty: 2
    },

    // Raw items, base level ingredients.
    raw : ["ironPlate","copperPlate","coal",
        "stoneBricks","lubricant","water"]
};

items.raw.push("steelPlate");
items.raw.push("greenCircuit");
items.raw.push("redCircuit");


// Need to create a "show raw items" function
// Create a validator for the items:
//      make sure the property name (key) == the name property
//      verify that all ingredients pass the items.isValid()