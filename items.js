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
        name: "electricEngine",
        craftTime: 10,
        recipeArray: [[1,"steelPlate"],[1,"ironGear"],[2,"pipes"]],
        outputQty: 1
    },
    electricFurnace: {
        name: "electricFurnace",
        craftTime: 5,
        recipeArray: [[10,"steelPlate"],[5,"redCircuit"],[10,"stoneBricks"]],
        outputQty: 1
    },
    
};

items.list = function() {
    var keys = Object.keys(this);
    var outputList = [];
    for(let i = 0; i<keys.length; ++i) {
        if( this.isValid(keys[i]) ) { // Only display items, not methods
            show(keys[i]);
            outputList.push(keys[i]);
        }
    }
    return true; // no errors!
}

items.showRecipe = function(itemName) {
    if(this.isValid(itemName)) {
        show("*****************************"); 
        show("Recipe for:  " + this[itemName].name) // Heading
        show(this[itemName].outputQty + "x crafted in " +this[itemName].craftTime + " seconds.")
        if (this[itemName].recipeArray.length > 0) {
            for(let i = 0; i<this[itemName].recipeArray.length; ++i) {
                show( this[itemName].recipeArray[i][0] + "   " + this[itemName].recipeArray[i][1] );
            }
            show("");
            
        }
    }
}

items.isValid = function(itemName) {
    // Verify that itemName is a property, and that it is a valid item.
    return (this[itemName] != undefined) && (this[itemName].craftTime != undefined) 
}



var rawItems = ["ironPlate","copperPlate","steelPlate",
    "greenCircuit","redCircuit",
    "stoneBricks","lubricant"];