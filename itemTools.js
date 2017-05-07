
items.list = function() {
    var keys = Object.keys(this);
    var outputList = [];
    show("");
    show("Items List:");
    show("*****************************"); 
    for(let i = 0; i<keys.length; ++i) {
        if( this.isValid(keys[i]) ) { // Only display items, not methods
            show(keys[i]);
            outputList.push(keys[i]);
        }
    }
    show("");
    return true; // no errors!
}

items.showRecipe = function(itemName) {
    if(this.isValid(itemName)) {
        show("");
        show("Recipe for:  " + this[itemName].name) // Heading
        show("*****************************"); 
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
    return (typeof this[itemName] != "undefined") && (this[itemName].craftTime != undefined);
}

items.isRaw = function(itemName) {
   // Verify that itemName is an element of the array at items.raw 
   return this.raw.includes(itemName);
}

items.getItemsPerSecond = function(itemName, numAssemblers) {
    // optional numAssemblers argument:
    if(typeof numAssemblers === "undefined") { numAssemblers = 1;} // default value
    
    if (this.isValid(itemName)) { // validate itemName.
       var itemsPerSecond = this[itemName].outputQty * numAssemblers/ this[itemName].craftTime;
       showDebug( numAssemblers + " assembler produces "+ itemsPerSecond.toFixed(2) + " " 
            + this[itemName].name + " per second." );
       return itemsPerSecond;
   } 
}

items.getIngredientsPerSecond = function(itemName, numAssemblers) {
    // optional numAssemblers argument:
    if(typeof numAssemblers === "undefined") { numAssemblers = 1;} // default value
    var ingredientsStruct = {};

    
    if (this.isValid(itemName)) { // validate itemName.
       var itemsPerSecond = this[itemName].outputQty * numAssemblers/ this[itemName].craftTime;

        // Populate ingredientsStruct by multiplying recipeArray
        var recipeArray = this[itemName].recipeArray; // copy for convenience.
        recipeArray.forEach(function(recipe){
            ingredientsStruct[recipe[1]] = {}; // Initialize a sub object
            ingredientsStruct[recipe[1]].name = recipe[1];
            ingredientsStruct[recipe[1]].itemsPerSecond = 
                recipe[0] * numAssemblers / this[itemName].craftTime;
        },this);

        showDebug( numAssemblers + " assembler produces "+ itemsPerSecond.toFixed(2) + " " 
            + this[itemName].name + " per second, and requires:" );
        for (let item in ingredientsStruct) {
            if (ingredientsStruct.hasOwnProperty(item)) {
                showDebug( ingredientsStruct[item].name + " -> " + 
                    ingredientsStruct[item].itemsPerSecond.toFixed(2) + " per second");
            }
        }
            
       return ingredientsStruct;
   } // if valid itemName 
}
