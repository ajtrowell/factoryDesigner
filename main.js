


items.list();
items.showRecipe("pumpJack");
var reqStruct = items.getRecipeRequirements("blueScience",1);
var reqStruct = items.getRecipeRequirements("militaryScience",1);
var reqStruct = items.getRecipeRequirements("purpleScience",1);
var reqStruct = items.getRecipeRequirements("yellowScience",1);


    

function show(arg) {
    console.log(arg);
    document.write(arg + "<br>");
}

function showDebug(arg) {
    // show(arg); // temp solution
    console.log(arg);
}

function showError(arg) {
    console.log(arg);
    document.write("<font color='red'>" + arg + "</font><br>");
    alert(arg);
}

// function prototypes
// recipeRate(rawArray, desiredItem, desiredItemsPerSecond)
// returns number of each raw item required per second.

// recipeAssemblers(rawArray, desiredItem, desiredItemsPerSecond)
// returns number of assemblers required for product and 
// each intermediate product, raw item required per second.