// Recurssive method for calculating the required raw material rates and number of 
// Assemblers required to generate an item at a given rate.


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
        showOutput("");
        showOutput("******************************");
        showOutput("####### Factory Design #######");
        showOutput("******************************");
        // Summary of Objective
        showOutput("Objective: Produce " + reqItemsPerSecond.toFixed(2) + "  " + itemName + " per second.")
        if(isRounded) { showOutput("Goal rate rounded up to: " + itemsPerSecond.toFixed(2));}
        
        // Was top level rounded up?
        
        
        // Number of assemblers required for each item
        showOutput("")
        showOutput("Required Assemblers:")
        showOutput("------------------------------");
        for (let itemAssembler in requirementsStruct.assemblers) {
            showOutput(requirementsStruct.assemblers[itemAssembler].assemblerQty.toFixed(2) + " " + itemAssembler + 
                " Assemblers");
        } // for itemAssembler in requirementsStruct.assemblers
        
        // itemsPerSecond for each raw material
        showOutput("");
        showOutput("Required Raw Material Rates:")
        showOutput("------------------------------");
        for (let rawItem in requirementsStruct.rawItems) {
            // Only list items with quantity > 0
            if (requirementsStruct.rawItems[rawItem].itemsPerSecond > 0) {
                showOutput( requirementsStruct.rawItems[rawItem].itemsPerSecond.toFixed(2) + 
                    " units/sec of " + rawItem);
            }
        } // for rawItem in requirementsStruct.rawItem
        showOutput("");
    }
   

    return  requirementsStruct;
}