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

    // Raw items, base level ingredients.
    raw : ["ironPlate","copperPlate","coal","steelPlate",
        "greenCircuit","redCircuit",
        "stoneBricks","lubricant","water"]
};

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

items.getRecipeRequirements = function(itemName, reqItemsPerSecond, recursionDepth) {
    // recursionDepth is mainly used for debugging by counting UP as depth increases.
    if(typeof recursionDepth === "undefined") { recursionDepth = 0;} // default value
    
    var isRounded = false; // Indicates if top level was rounded.
    var itemsPerSecond = reqItemsPerSecond; // Holds true rate in the event of rounding up.
    
    // initialize requirementsStruct
    var requirementsStruct = {
        // should assemblers and rawItems be arrays or objects?
        assemblers: {},
        rawItems: {}, 
    };
    // Fill requirementsStruct.rawItems from items.raw
    this.raw.forEach(function(rawItemName){
        requirementsStruct.rawItems[rawItemName] = {}; // Initialize Struct for Item.
        requirementsStruct.rawItems[rawItemName].name = rawItemName; 
        requirementsStruct.rawItems[rawItemName].itemsPerSecond = 0; // Initialize to zero.
    },this);


    // Define Useful functions for summing assemblers and raw rates:
    var sumAssemblers = function(itemName, assemblerQty) {
        if ( typeof requirementsStruct.assemblers[itemName] === "undefined" ) {
            requirementsStruct.assemblers[itemName] = {};
            requirementsStruct.assemblers[itemName].name = itemName;
            requirementsStruct.assemblers[itemName].assemblerQty = 0;
        }
        requirementsStruct.assemblers[itemName].assemblerQty += assemblerQty;
    }
    
    var sumRawItems = function(itemName, itemsPerSecond) {
        if ( typeof requirementsStruct.rawItems[itemName] === "undefined" ) {
            requirementsStruct.rawItems[itemName] = {};
            requirementsStruct.rawItems[itemName].name = itemName;
            requirementsStruct.rawItems[itemName].itemsPerSecond = 0;
        }
        requirementsStruct.rawItems[itemName].itemsPerSecond += itemsPerSecond;
    }


    // Initialization complete. Begin searching for required assemblers and raw ingredient rates.
    // Fractional assemblers are acceptable, and will be summed together, since the fractional 
    // ingredient requirements are accurate.

    // Number of assemblers required to meet reqItemsPerSecond. This will ONLY be rounded up IF 
    // this is the top level, and recursionDepth == 0.  At other levels, fractions are useful.
    // Required assemblers is the ratio of the requiredItemsPerSecond and the single 
    // assembler itemsPerSecond rate.
    var assemblersRequired  = reqItemsPerSecond / this.getItemsPerSecond(itemName,1);
    if(recursionDepth == 0) {
        if( assemblersRequired != Math.ceil(assemblersRequired) ) { // Rounding changed the value
            assemblersRequired = Math.ceil(assemblersRequired); 
            isRounded = true;
            itemsPerSecond = this.getItemsPerSecond(itemName,assemblersRequired);
        }
    }


    // Add current level assemblers required to requirementsStruct:
    sumAssemblers(itemName, assemblersRequired); // Added current level assembler requirement.
    


    // What item rates are required for this item recipie?
    var rateStruct = this.getIngredientsPerSecond(itemName, assemblersRequired);
    var nestedReqStruct = {}; // used for non-raw ingredients. Temp space.

    // Raw ingredients should be summed into requirementsStruct.rawItems
    // Also, non-raw ingredients should recursively be called with this function, 
    // items.getRecipeRequirements(), and the resulting 
    // additional requirementStruct values also added to the assembler and raw 
    // ingredient totals. Recursion stops when all ingredients are raw.

    for (let item in rateStruct) {
        if( this.isRaw(item) ) {
            sumRawItems(item,rateStruct[item].itemsPerSecond);
        } else if( this.isValid(item) ) { // Valid, non-raw item. Recursion time!
            nestedReqStruct = this.getRecipeRequirements(item, 
                rateStruct[item].itemsPerSecond, 1+recursionDepth);
                
            // Now sum nestedReqStruct with requirementsStruct
            // Sum Raw Material rates:
            for (let rawItem in nestedReqStruct.rawItems) {
                sumRawItems(rawItem,nestedReqStruct.rawItems[rawItem].itemsPerSecond);
            } // for rawItem in nestedReqStruct.rawItem
            // Sum Assembler Quantities:
            for (let itemAssembler in nestedReqStruct.assemblers) {
                sumAssemblers(itemAssembler, nestedReqStruct.assemblers[itemAssembler].assemblerQty); 
            } // for itemAssembler in nestedReqStruct.assemblers

            
            
        } else { // Error, invalid item
            showError("A value returned by getIngredientsPerSecond was not a valid item!");
        }
        
    } // for item in rateStruct
    // Display output only if root instance
    if (recursionDepth == 0) {
        show("");
        show("******************************");
        show("####### Factory Design #######");
        show("******************************");
        // Summary of Objective
        show("Objective: Produce " + reqItemsPerSecond.toFixed(2) + "  " + itemName + " per second.")
        if(isRounded) { show("Goal rate rounded up to: " + itemsPerSecond.toFixed(2));}
        
        // Was top level rounded up?
        
        
        // Number of assemblers required for each item
        show("")
        show("Required Assemblers:")
        show("------------------------------");
        for (let itemAssembler in requirementsStruct.assemblers) {
            show(requirementsStruct.assemblers[itemAssembler].assemblerQty.toFixed(2) + " " + itemAssembler + 
                " Assemblers");
        } // for itemAssembler in requirementsStruct.assemblers
        
        // itemsPerSecond for each raw material
        show("");
        show("Required Raw Material Rates:")
        show("------------------------------");
        for (let rawItem in requirementsStruct.rawItems) {
            // Only list items with quantity > 0
            if (requirementsStruct.rawItems[rawItem].itemsPerSecond > 0) {
                show( requirementsStruct.rawItems[rawItem].itemsPerSecond.toFixed(2) + 
                    " units/sec of " + rawItem);
            }
        } // for rawItem in requirementsStruct.rawItem
        show("");
    }
   

    return  requirementsStruct;
}
