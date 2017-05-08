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
    yellowScience: { // High Tech Science Pack
        name: "yellowScience",
        craftTime: 14,
        recipeArray: [[1,"battery"],[3,"blueCircuit"],[1,"speedModule"],[30,"copperCable"]],
        outputQty: 2
    },
    blueCircuit: {
        name: "blueCircuit",
        craftTime: 10,
        recipeArray: [[20,"greenCircuit"],[2,"redCircuit"],[5,"sulfuricAcid"]],
        outputQty: 1
    },
    battery: {
        name: "battery",
        craftTime: 5,
        recipeArray: [[1,"ironPlate"],[1,"copperPlate"],[20,"sulfuricAcid"]],
        outputQty: 1
    },
    speedModule: {
        name: "speedModule",
        craftTime: 15,
        recipeArray: [[5,"greenCircuit"],[5,"redCircuit"]],
        outputQty: 1
    },
    speedModule2: {
        name: "speedModule2",
        craftTime: 30,
        recipeArray: [[4,"speedModule"],[5,"redCircuit"],[5,"blueCircuit"]],
        outputQty: 1
    },
    blueScience: {
        name: "blueScience",
        craftTime: 12,
        recipeArray: [[1,"redCircuit"],[1,"engine"],[1,"assembler1"]],
        outputQty: 1
    },
    assembler1: {
        name: "assembler1",
        craftTime: 0.5,
        recipeArray: [[3,"greenCircuit"],[5,"ironGear"],[9,"ironPlate"]],
        outputQty: 1
    },

    // Raw items, base level ingredients.
    raw : ["ironPlate","copperPlate","coal",
        "stoneBricks","lubricant","water","sulfuricAcid"]
};

items.raw.push("steelPlate");
items.raw.push("greenCircuit");
items.raw.push("redCircuit");
items.raw.push("blueCircuit");
items.raw.push("battery");


// Need to create a "show raw items" function
// Create a validator for the items:
//      make sure the property name (key) == the name property
//      verify that all ingredients pass the items.isValid()