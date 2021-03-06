var outputString = "";
var crlf = "&#013;&#010;";


function main() {

    createRecipeListUI();  
    createRawOptionsUI();
    items.list();
    // items.showRecipe("pumpJack");
    // var reqStruct = items.getRecipeRequirements("blueScience",1);
    // var reqStruct = items.getRecipeRequirements("militaryScience",1);
    // var reqStruct = items.getRecipeRequirements("purpleScience",1);
    // var reqStruct = items.getRecipeRequirements("yellowScience",1);
    
}

main();


function createRecipeListUI(){
    var itemNameListForm = document.getElementById("itemNameList");
    var itemNameArray = items.list();
    var itemListStringHTML = "";
    for (let item in itemNameArray) {
       itemListStringHTML += "<option>" + itemNameArray[item] + "</option>" + crlf; 
    }
    itemNameListForm.innerHTML = itemListStringHTML;
}

function createRawOptionsUI() {
    var rawListControl = document.getElementById("rawList");    
    var rawOptions = items.rawOptional; // simple name for convenience.
    var itemRawOptionsStringHTML = ""; // holds new HTML for raw checkboxes.
    for ( let index in rawOptions) {
        var rawItem = rawOptions[index];
        var checkString = ""; // default to not-checked.
        if (items.isRaw(rawItem)) { checkString = "checked ";}
        itemRawOptionsStringHTML += 
        "<li>" + crlf +
             '<input type="checkbox" ' + checkString + ' class="rawOptions" id="' + 
             rawItem + '" name="' + rawItem  + '" value="' + rawItem + '" onChange="updateViewer();">' + crlf +
            rawItem + crlf +
        "</li>" + crlf;
    } 
    rawListControl.innerHTML = itemRawOptionsStringHTML; // Apply HTML string.
    
}

function updateRawSelection() {
    var rawOptionsCheckboxControlArray = document.getElementsByClassName("rawOptions");
    for (let i = 0; i<rawOptionsCheckboxControlArray.length; ++i) {
        let itemName = rawOptionsCheckboxControlArray[i].value;   
        let isChecked = rawOptionsCheckboxControlArray[i].checked;   

        if(isChecked) { 
            items.addRaw(itemName);
        } else {
            items.removeRaw(itemName);
        }

    }
    
}


function updateViewer() {
    var textBox = document.getElementById("outputText");
    updateRawSelection();

    var itemNameField = document.getElementById("itemNameList");
    var itemName = itemNameField.value;
    
    // Concat previous textbox contents.
    var oldText = textBox.innerHTML;
    textBox.innerHTML = oldText + crlf +  itemName;

    // var reqRate = 1;
    var reqRateField = document.getElementById("requiredItemRate");
    var reqRate = parseFloat(reqRateField.value);
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