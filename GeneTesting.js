// comments look like this if they are one line
/*Comments look like this if you want to
spread them out over several lines for some
reason*/

// unsure how data is gonna get passed here but for now I'll just have it check a text string that's just regular text
//example string 
// [C] [SO] [LL] [BBDD4] [YNTT] [YN7P] [??] [??]
// [C] [S?] [LL] [?BDD4] [Y?TT] [Y?7P] [??] [??]
// [C] [N?] [S?] [?????] [????] [Y?10P] [??] [??] 
// [C] [NO] [LL] [BODD2] [YNTM] [NN6C] [??] [??]
 
//used for now since I don't have the program auto sending data over, for testing I just temp have this
function checkTextGeneString() {
    let textBoxEntry = document.querySelector(".testTextBox").value
    console.log(textBoxEntry)
    let catgenecode = document.querySelector("#genecodefull")
    catgenecode.textContent = textBoxEntry 
    let sections = make1darray(textBoxEntry)
    console.log(sections)
    let newsections = make2darray(sections)
    console.log(newsections)
    initialGenesSetup(newsections)
    let testList = checkWhatTestsAreNeeded(newsections)
    changeSelectText(testList)
    
    // do a function that changes the "select test" options to all of those
    // then figure out how to get the page to react when they select a test and add in the info needed
    // 3 arrays (testtypes (already done), testlookingfor (what the looking for text should display), and testexamples (image links))
    // when a test type is selected, use those 3 arrays to fill in the data with whatever test type matches the currently selected one
}


function changeExisting(ID, value) {
    let idarray = ["#wind-1", "#wind-2", "#fur-1", "#fur-2", "#color-1", "#color-2", "#dilute-1", "#dilute-2", "#density", "#pattern-yes-no-1", "#pattern-yes-no-2", "#pattern-1", "#pattern-2", "#white-yes-no-1", "#white-yes-no-2", "#white-level", "#white-type"]
    let positionarray = [5, 6, 10, 11, 15, 16, 17, 18, 19, 23, 24, 25, 26, 30, 31, 32, 33]
    let genecodefull = document.getElementById("genecodefull")
    let genecodetext = genecodefull.innerText
    let changeid = document.getElementById(ID)
    changeGenes(ID, value)
    for (let i = 0; i<idarray.length; i++) {
        if (idarray[i] == ID) {
            console.log(genecodetext)
            genecodetext = replaceAt(genecodetext, positionarray[i], value)
            console.log(genecodetext)
            genecodefull.innerText = genecodetext
            break
        }
    }
    //gotta check for albino since it messes with the length
    console.log(ID + " Change Existing: " + value)
    let sections = make1darray(genecodetext)
    let newsections = make2darray(sections)
    let testList = checkWhatTestsAreNeeded(newsections)
    changeSelectText(testList)

}

function replaceAt(string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + replacement.length);
}

function make1darray(textgenes) {
    let sections = textgenes.split("]")
    for (let i=0; i<sections.length-1; i++) {
        sections[i] = sections[i].split("[")[1]
    }
    sections.pop()
    let temp = sections.length
    if (temp < 8) {
        for (let i = 6; i < 8; i++) {
            sections[i] = "??"
        }
    }
    return sections
}

function make2darray(sections) {
    let newsectionsstart = ["C"]
    let array1 = arrayensmallen(sections[1])
    let array2 = arrayensmallen(sections[2])
    let array3 = arrayensmallen(sections[3])
    let array4 = arrayensmallen(sections[4])
    let array5 = arrayensmallen(sections[5], true)
    let newsections = [newsectionsstart, array1, array2, array3, array4, array5]
    return newsections
}

function arrayensmallen(gene, check) {
    let arraything = []
    let albinocheck = false
    if (check == true) {
        if (gene.length > 4) {
            albinocheck = true
        }
    }
    for (let i = 0; i < gene.length; i++) {
        arraything[i] = gene[i]
    }
    if (albinocheck == true) {
        arraything[2] = "10"
        arraything.splice(3, 1)
    }
    console.log(arraything)
    return arraything
}

function checkWhatTestsAreNeeded(array) {
    let testsneededstring = ""
    console.log(array)
    console.log("\n\n\n\n\n")
    if (array[1][0] == "O") {
        alert("This cat is null and cannot be gene tested! If you want to know its hidden genes, you have to use a Family Tree on the cat")
        return // don't run tests, the cat is null it cannot breed
    }
    if (array[1][1] == "?") {
        // Wind test needed
        testsneededstring += "Recessive Wind Check(" + array[1][0] +")|" 
    }
    if (array[2][1] == "?") {
        // Fur length test needed
        testsneededstring += "Recessive Fur Length Check|" 
    }

    // albino check we moving on from
    if (array[5][2] == "10") {
        // cat is albino
        //SEPARATE THESE GUYS OUT INTO INDIVIDUAL CHECKS FOR THEIR RESPECTIVE GENE CODE SLOT LATER! WHEN I ACTUALLY HAVE THE THINGS WORKING
        testsneededstring += "Albino Hidden Colors Check|Albino Hidden Dilutes Check|Albino Hidden Densities Check|"
    }
    // albino unknown pattern
    if (array[4][2] == "?") {
        testsneededstring += "Hidden Pattern Check|"
    }
    if (array[3][3] == "?") {
        // Dilute test needed
        testsneededstring += "Recessive Dilute Check|"
    }
    if (array[3][0] == "?") {
        // color gene 1 missing
        let othercolor = array[3][1]
        if (othercolor == "O") {
            testsneededstring += "Hidden Color Check(orange)(1)|"
        }
        if (othercolor == "B") {
            testsneededstring += "Hidden Color Check(black)(1)|"
        }
    } 
    if (array[3][1] == "?") {
        // color gene 2 missing
        let othercolor = array[3][0]
        if (othercolor == "O") {
            testsneededstring += "Hidden Color Check(orange)(2)|"
        }
        if (othercolor == "B") {
            testsneededstring += "Hidden Color Check(black)(2)|"
        }
    }
    if (array[5][0] == "?") {
        //cat displays no white 
        testsneededstring += "0 White Possibility Check|"
    } 
    else {
        if (array[5][1] == "?") {
            //unknown recessive white gene
            testsneededstring += "Recessive No-White Check|"
        }
    }
    if (array[5][3] == "?") {
        // unknown white type
        testsneededstring += "Hidden White Type Check|"
    }
    if (array[5][2] == "?") {
        testsneededstring += "Hidden White Level Check|"
    }
    
    console.log(testsneededstring)
    let testsNeeded = testsneededstring.split("|")
    testsNeeded.pop()
    return testsNeeded
}

// value needs to be ".classname" or "#idname" when the function is called
function changeGenes(ID, value) {
    let finddiv = document.querySelector(ID)
    finddiv.textContent = value
    if (value == "?") {
        changeDescText(ID, "Unknown")
    }
    switch(ID) {
        case "#wind-1":
        case "#wind-2":
            switch(value) {
                case "N":
                    changeDescText(ID, "North")
                    break;
                case "S": 
                    changeDescText(ID, "South")
                    break;
                case "O":
                    changeDescText(ID, "Null")
                    break;
            }
            break
        case "#fur-1":
        case "#fur-2":
            switch(value) {
                case "S":
                    changeDescText(ID, "Shorthair")
                    break; 
                case "L":
                    changeDescText(ID, "Longhair")
                    break; 
            }
            break
        case "#color-1":
        case "#color-2":
            switch(value) {
                case "O":
                    changeDescText(ID, "Orange")
                    break; 
                case "B":
                    changeDescText(ID, "Black")
                    break; 
            }
            break
        case "#dilute-1":
        case "#dilute-2":
            switch(value) {
                case "F":
                    changeDescText(ID, "Full")
                    break; 
                case "D":
                    changeDescText(ID, "Dilute")
                    break; 
            }
            break
        case "#density":
            // for some reason trying to simplify this to just value + "/4 Color Density" completely breaks the rest of the program and it thinks the rest of the IDs are all density?? so manual way Ig
            changeDescText(ID, value+ "/4 Color Density")
            break
        case "#pattern-yes-no-1":
        case "#pattern-yes-no-2":
            switch(value) {
                case "Y":
                    changeDescText(ID, "Yes Pattern")
                    break; 
                case "N":
                    changeDescText(ID, "No Pattern")
                    break; 
            }
            break
        case "#pattern-1":
        case "#pattern-2":
            switch(value) {
                case "T":
                    changeDescText(ID, "Stripe")
                    break; 
                case "S":
                    changeDescText(ID, "Spot")
                    break; 
                case "M":
                    changeDescText(ID, "Marble")
                    break; 
                case "P":
                    changeDescText(ID, "Point")
                    break; 
            }
            break
        case "#white-yes-no-1":
        case "#white-yes-no-2":
            switch(value) {
                case "Y":
                    changeDescText(ID, "Yes White")
                    break; 
                case "N":
                    changeDescText(ID, "No White")
                    break; 
            }
            break
        case "#white-level":
            changeDescText(ID, value+ "/10 White Level")
            break
        case "#white-type":
            switch(value) {
                case "C":
                    changeDescText(ID, "Classic")
                    break; 
                case "P":
                    changeDescText(ID, "Piebald")
                    break; 
                case "L":
                    changeDescText(ID, "Left")
                    break; 
                case "R":
                    changeDescText(ID, "Right")
                    break; 
                case "I":
                    changeDescText(ID, "Inverse")
                    break; 
            }
            break
    }
}

function changeDescText(ID, value) {
    let newID = ID + "-desc"
    let finddiv = document.querySelector(newID)
    finddiv.textContent = value
    return
}

function initialGenesSetup(genes) {
    console.log(genes)
    //skipping species for now bc it's always not-cat
    changeGenes("#wind-1", genes[1][0])
    changeGenes("#wind-2", genes[1][1])
    changeGenes("#fur-1", genes[2][0])
    changeGenes("#fur-2", genes[2][1])
    changeGenes("#color-1", genes[3][0])
    changeGenes("#color-2", genes[3][1])
    changeGenes("#dilute-1", genes[3][2])
    changeGenes("#dilute-2", genes[3][3])
    changeGenes("#density", genes[3][4])
    changeGenes("#pattern-yes-no-1", genes[4][0])
    changeGenes("#pattern-yes-no-2", genes[4][1])
    changeGenes("#pattern-1", genes[4][2])
    changeGenes("#pattern-2", genes[4][3])
    changeGenes("#white-yes-no-1", genes[5][0])
    changeGenes("#white-yes-no-2", genes[5][1])
    changeGenes("#white-level", genes[5][2])
    changeGenes("#white-type", genes[5][3])
}

function changeSelectText(alltests) {
    let currentselect = document.getElementById("testquestion-select")
    currentselect.innerHTML = '\n<option>Select Test</option>'
    let currenttest = ""
    for (let i = 0; i < alltests.length; i++) {
        if (alltests[i].includes("(")) {
            // test specifier for which cat is needed for the test
            let tempcolor = ""
            
            if (alltests[i].includes("(black)")) {
                tempcolor = `"Hidden Color Check (black)` + alltests[i].split("(black)")[1] + `"`
            }
            if (alltests[i].includes("(orange)")) {
                tempcolor = `"Hidden Color Check (orange)` + alltests[i].split("(orange)")[1] + `"`
            }
            if (alltests[i].includes("(N)")||alltests[i].includes("(S)")) {
                tempcolor = `"Recessive Wind Check (` + alltests[i].split("(")[1] + `"`
            }
            // all these set a value for the option along with the regular option name for special cases where we need to keep some hidden data
            currenttest = " value = " + tempcolor + ">" + alltests[i].split("(")[0]
        }
        else {
            currenttest = ">" + alltests[i]
        }
        currentselect.innerHTML += '\n<option' + currenttest + '</option>'
    }
}

function changeTestCatID(ID) {
    let testcatdiv = document.getElementById("testCatID")
    testcatdiv.innerText = ID
}

function changeButtons() {
    let testTypesArray = ["Recessive Wind Check", "Recessive Fur Length Check", "Recessive Dilute Check", "Recessive Solid Check", "Hidden Color Check", "Hidden Pattern Check", "Recessive No-White Check", "0 White Possibility Check", "Hidden White Type Check", "Hidden White Level Check", "Albino Hidden Colors Check", "Albino Hidden Dilutes Check", "Albino Hidden Densities Check"]
    let lookingForArray = ["Any Null cats", "Any Longhair cats", "Any Dilute cats", "Any Solid cats", ["Any Black cats", "Any Orange cats"], "Check off seen patterns", "Any No-white cats", "Select how many cats are no-white", "Select white type from reference", "Mark highest white level found", "(hidden albino colors)", "Check what percentage of offspring are dilutes", "Select the highest value density found"]
    let buttonsTextArray = [["Nulls Found", "No Nulls Found"], ["Longhairs Found", "No Longhairs Found"], ["Dilutes Found", "No Dilutes Found"], ["Solids Found", "No Solids Found"], ["Orange Cats Found", "No Orange Cats Found", "Black Cats Found", "No Black Cats Found"], ["Mackerel (TT)", "Classic (TM)", "Broken (TS)", "Lynxpoint (TP)"], ["No-whites found", "All cats have white"], ["No White Marks Found", "55% of cats have No White Marks", "9% of cats have No White Marks"], ["Classic Only", "Right and Classic", "Left and Classic", "Piebald and Classic", "Inverse and Classic"],["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], ["Black and Orange", "Orange Only", "Black Only"], ["All Dilutes", "Half Dilutes", "No Dilutes"], ["1", "2", "3", "4"]] 
    let idsArray = ["Skip (wind)", "#fur-2", "#dilute-2", "#pattern-yes-no-2", "Skip (hidden color check)", "Skip (HIDDEN PATTERN CHECK)", "#white-yes-no-2", "SKIP (0 WHITE POSSIBILITY CHECK)", "#white-type", "#white-level", "Skip (albino hidden colors check)", "Skip (albino hidden dilutes check)", "Skip (albino hidden densities check)"]
    let valuesArray = ["Skip (wind)", ["L", "S"], ["D", "F"], ["N", "Y"], "Skip (hidden color)", "Skip (hidden pattern check)", ["N", "Y"], ["NN", "YN", "YY"], ["C", "R", "L", "P", "I"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "Skip", "skip", "skip"]
    let testCatIDArray = ["skip", "983", "983", "983", "skip", "skip", "983", "skip", "1348", "15075", "skip (albino hidden colors)", "983", "355847"]
    let examplesArray = ["NullsReference", "LonghairReference", ["Dilutes-BlackGroupReference", "Dilutes-OrangeGroupReference"], "SolidsReference", ["BlackGroupCatsReference", "OrangeGroupCatsReference"], "PatternsReference", "No-WhiteVSWhiteReference", "No-WhiteVSWhiteReference", "WhiteLevel2Reference"]

    let currentselect = document.getElementById("testquestion-select")

    let answersection = document.getElementById('answer-section')
    let buttonsection = document.getElementById('button-section')
    let examplesbox = document.getElementById("examplesbox")
    let currentselectvalue = currentselect.value
    buttonsection.innerHTML = ""
    answersection.innerHTML = ""
    examplesbox.innerHTML = ""

    let resultFoundButton = document.createElement('button');
    let resultNotFoundButton = document.createElement('button');
    resultFoundButton.textContent = "Result Found" 
    resultNotFoundButton.textContent = "Result Not Found"
    if (currentselectvalue == "Select Test") {
        buttonsection.innerHTML = "Select a test to start"
    }
    else {
        for (let i = 0; i < testTypesArray.length; i++) {
            if (currentselectvalue.includes(testTypesArray[i])) {
                console.log(currentselectvalue)
                // checking if it's hidden color or recessive wind since they change different values depending on input
                // hidden pattern type needs its own entry because it has buttons to checkbox and THEN confirm, not just 1 click
                if (currentselectvalue.includes("Hidden Color Check") || currentselectvalue.includes("Recessive Wind Check") || currentselectvalue.includes("0 White Possibility Check") || currentselectvalue.includes("Hidden Pattern Check") || currentselectvalue.includes("Albino Hidden Colors Check")) {
                    if (currentselectvalue.includes("Hidden Color Check")) {
                        if (currentselectvalue.includes("(black)")) {
                            answersection.innerHTML = "Looking for: " + lookingForArray[i][1]
                            changeTestCatID("3038")
                            resultFoundButton.textContent = buttonsTextArray[i][0]
                            resultNotFoundButton.textContent = buttonsTextArray[i][1]
                            if (currentselectvalue.includes("(1)")) {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'O')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'B')")
                            }
                            else {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'O')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'B')")
                            }
                            }
                        if (currentselectvalue.includes("(orange)")) {
                            changeTestCatID("983")
                            answersection.innerHTML = "Looking for: " + lookingForArray[i][0] + "\n"
                            resultFoundButton.textContent = buttonsTextArray[i][2]
                            resultNotFoundButton.textContent = buttonsTextArray[i][3]
                            if (currentselectvalue.includes("(1)")) {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'B')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-1', 'O')")
                            }
                            else {
                                resultFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'B')")
                                resultNotFoundButton.setAttribute("onclick", "changeExisting('#color-2', 'O')")
                            }
                            }
                        buttonsection.appendChild(resultFoundButton);
                        buttonsection.appendChild(resultNotFoundButton);
                    }
                    if (currentselectvalue.includes("Recessive Wind Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        resultFoundButton.textContent = "Nulls Found" 
                        resultNotFoundButton.textContent = "Nulls Not Found"
                        if (currentselectvalue.includes("(S)")) {
                            changeTestCatID("9753")
                            resultFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'O')")
                            resultNotFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'S')")
                        }
                        if (currentselectvalue.includes("(N)")) {
                            changeTestCatID("4168")
                            resultFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'O')")
                            resultNotFoundButton.setAttribute("onclick", "changeExisting('#wind-2', 'N')")
                        }
                        buttonsection.appendChild(resultFoundButton);
                        buttonsection.appendChild(resultNotFoundButton);
                    }
                    if (currentselectvalue.includes("0 White Possibility Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        changeTestCatID("43107")
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let button = document.createElement('button');
                            button.textContent = buttonsTextArray[i][j]
                            let changeString = "zeroWhiteCheckChanges('" + valuesArray[i][j] + "')"
                            button.setAttribute("onclick", changeString)
                            buttonsection.appendChild(button)
                        }
                    }
                    if (currentselectvalue.includes("Hidden Pattern Check")) {
                        answersection.innerHTML = "Looking for: " + lookingForArray[i]
                        changeTestCatID("2534")
                        for (let j = 0; j < buttonsTextArray[i].length; j++) {
                            let outerdiv = document.createElement('div')
                            outerdiv.id = "outerdiv"
                            let checkbox = document.createElement('input')
                            checkbox.type = "checkbox"
                            checkbox.id = "idthing"
                            checkbox.classList.add("checkboxes")
                            let label = document.createElement('label')
                            labelFor = "idthing"
                            label.appendChild(document.createTextNode(buttonsTextArray[i][j]))
                            outerdiv.appendChild(checkbox)
                            outerdiv.appendChild(label)
                            buttonsection.appendChild(outerdiv)
                        }
                        let button = document.createElement('button');
                        button.textContent = "Submit"
                        button.setAttribute("onclick", "patternSubmit()")
                        button.id = "submitHiddenPattern"
                        buttonsection.appendChild(button)
                        
                    }
                }
                else {
                    answersection.innerHTML = "Looking for: " + lookingForArray[i]
                    if (currentselectvalue == "Hidden White Level Check") {
                        let whitereferencearray = ["P", "L", "R", "I"]
                        let whiteResultArray = ["PiebaldWhiteTypeFullReference", "LeftWhiteTypeFullReference", "RightWhiteTypeFullReference", "InverseWhiteTypeFullReference"]
                        let whitetype = document.getElementById("white-type").innerText
                        let whitefound = false
                        if (whitetype == "?") {
                            alert("It's recommended to do the White Type test before this test!")
                            whitefound = false
                        }
                        else {
                            for (let i = 0; i < whitereferencearray.length; i++) {
                                if (whitetype == whitereferencearray[i]) {
                                    let examplediv = document.createElement('div')
                                    examplediv.innerHTML = whiteResultArray[i] // CHANGE THIS TO BE THE FILE ITSELF THAT THE ARRAY IS REFERENCING SO IT ACTUALLY CHANGES TO THE EXAMPLES
                                    examplesbox.appendChild(examplediv)
                                    whitefound = true
                                }
                            }
                        }
                        let classicexamplediv = document.createElement("div")
                        classicexamplediv.innerHTML = "ClassicWhiteTypeFullReference"
                        examplesbox.appendChild(classicexamplediv)
                        console.log(whitefound)
                        if (whitefound == false) {
                            for (let i = 0; i < whiteResultArray.length; i++) {
                                let examplediv = document.createElement('div')
                                examplediv.innerHTML = whiteResultArray[i]
                                examplesbox.appendChild(examplediv)
                            }
                        }
                        
                    }
                    else {
                        changeExamples(examplesArray[i])
                    }
                    changeTestCatID(testCatIDArray[i])
                    for (let j = 0; j < buttonsTextArray[i].length; j++) {
                        let button = document.createElement('button');
                        button.textContent = buttonsTextArray[i][j]
                        let changeString = "changeExisting('" + idsArray[i] + "', '" + valuesArray[i][j] + "')"
                        button.setAttribute("onclick", changeString)
                        buttonsection.appendChild(button)
                    }
                }
                break
            }
        }
    }
}
    
function patternSubmit() {
    let buttonsection = document.getElementById('button-section')
    let answersection = document.getElementById('answer-section')
    let checkboxes = document.querySelectorAll(".checkboxes")
    let count = 0;
    let oopsdivcheck = document.getElementById("oopsdiv")
    let hiddenPatternTypeArray = ["T", "M", "S", "P"]
    let twogenes = ""
    for (let i = 0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked == true) {
            console.log("TRUE")
            count = count+1
            twogenes += hiddenPatternTypeArray[i]
        }
    }
    console.log(twogenes)
    if (count > 2) {
        if (!oopsdivcheck) {
            let oopsdiv = document.createElement('div')
            oopsdiv.id = "oopsdiv"
            oopsdiv.innerText = "You should have a maximum of 2 boxes selected! Double check your answers and submit again"
            let submitbutton = document.getElementById('submitHiddenPattern')
            buttonsection.insertBefore(oopsdiv, submitbutton)

        }
    }
    else {
        if (count == 1) {
            //twogenes is applied for both pattern 1 and 2
            changeExisting("#pattern-1", twogenes)
            changeExisting("#pattern-2", twogenes)
        }
        if (count == 2) {
            //twogenes[0] is pattern 1, twogenes[1] is pattern 2
            changeExisting("#pattern-1", twogenes[0])
            changeExisting("#pattern-2", twogenes[1])

        }
    }
    console.log(count)

}

// rn it's specific to just the 0 white check
function zeroWhiteCheckChanges(answer) {
    console.log(answer[0])
    console.log(answer[1])
    changeExisting("#white-yes-no-1", answer[0])
    changeExisting("#white-yes-no-2", answer[1])
}


function changeExamples(example) {
    let examplesbox = document.getElementById("examplesbox")
    examplesbox.innerHTML = ""
    console.log(example)
    console.log("PISS")
    if (Array.isArray(example)) {
        for (let i = 0; i<example.length;i++) {
            let examplesearch = document.querySelector("."+example[i])
            examplesbox.appendChild(examplesearch)
        }
    } 
    else {
        let examplesearch = document.querySelector("."+example)
        examplesbox.appendChild(examplesearch)
    }
}

function exampleHTMLholder() {
    let 
}