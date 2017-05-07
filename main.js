// Some objects are uncreated "prime" objects, such as ironField or waterPool.
// Temporarily, I will treate ironPlate and steelPlate as "prime," to 
// help create a useful structure more quickly.  This is a 
// temporary hack to help with the proof of concept


// Store factory info as objects
var gameItems =[]; // Object containing game items as properties

function GameItem(name, craftTime, recipeArray, outputQty) {
    // name is a string
    // craftTime is a number
    // recipeArray contains n sub arrays, each with a quantity (number) and a 
    // name (string)
    // outputQty (number) is the yield of the recipe.
    this.name = name;
    this.craftTime = craftTime;
    this.recipeArray = recipeArray; // (should do error checking to verify format)
        if (this.recipeArray.length == 0) { 
            showError("Error, recipeArray cannot be empty.");
        }
        for(let i = 0; i<this.recipeArray.length; ++i) {
            if (this.recipeArray[i].length != 2) {
               showError("Error, recipeArray not formed correctly.");
            }
        }

    
    if (typeof outputQty === undefined) // handle optional argument outputQty
        { this.outputQty = 1;} // default value
    else 
        {this.outputQty = outputQty;}
    
}

function show(arg) {
    console.log(arg);
    document.write(arg + "<br>");
}

function showError(arg) {
    show(arg); // temp solution
}

// function prototypes
// recipeRate(rawArray, desiredItem, desiredItemsPerSecond)
// returns number of each raw item required per second.

// recipeAssemblers(rawArray, desiredItem, desiredItemsPerSecond)
// returns number of assemblers required for product and 
// each intermediate product, raw item required per second.