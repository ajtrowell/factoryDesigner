var outputString = "";
var crlf = "&#013;&#010;";


function main() {

    createRecipeListBox();  
    items.list();
    // items.showRecipe("pumpJack");
    // var reqStruct = items.getRecipeRequirements("blueScience",1);
    // var reqStruct = items.getRecipeRequirements("militaryScience",1);
    // var reqStruct = items.getRecipeRequirements("purpleScience",1);
    // var reqStruct = items.getRecipeRequirements("yellowScience",1);
    
}

main();


function createRecipeListBox(){
    var itemNameListForm = document.getElementById("itemNameList");
    var itemNameArray = items.list();
    var itemListStringHTML = "";
    for (let item in itemNameArray) {
       itemListStringHTML += "<option>" + itemNameArray[item] + "</option>" + crlf; 
    }
    itemNameListForm.innerHTML = itemListStringHTML;
}

function updateViewer() {
    var textBox = document.getElementById("outputText");
    textBox.innerText = "This is a test \n of the emergency update system.";

    var itemNameField = document.getElementById("itemNameBox");
    var itemName = itemNameField.value;
    
    // Concat previous textbox contents.
    var oldText = textBox.innerHTML;
    textBox.innerHTML = oldText + crlf +  itemName;

    // var reqRate = 1;
    var reqRateField = document.getElementById("requiredItemRate");
    var reqRate = parseInt(reqRateField.value);
    outputReset();
    items.getRecipeRequirements(itemName,reqRate);
    var output = outputGet();
    textBox.innerHTML = output;

}
    

function show(arg) {
    console.log(arg);
    document.write(arg + "<br>");
    outputAddLine(arg);
}

function showDebug(arg) {
    console.log(arg);
}

function showOutput(arg) {
    console.log(arg);
    outputAddLine(arg);
}

function showError(arg) {
    console.log(arg);
    document.write("<font color='red'>" + arg + "</font><br>");
    alert(arg);
}


function outputReset() {
    outputString = "";
}

function outputGet() {
    return outputString;
}

function outputAddLine(lineString) {
    outputString = outputString + crlf + lineString;
}

// function prototypes
// recipeRate(rawArray, desiredItem, desiredItemsPerSecond)
// returns number of each raw item required per second.

// recipeAssemblers(rawArray, desiredItem, desiredItemsPerSecond)
// returns number of assemblers required for product and 
// each intermediate product, raw item required per second.