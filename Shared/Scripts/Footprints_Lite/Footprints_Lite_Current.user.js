// ==UserScript==
// @name         Footprints Lite
// @namespace    http://tampermonkey.net/
// @version      0.3.5
// @icon         http://footprintsprod/MRimg/uni.ico
// @description  try to take over the world!
// @author       You
// @match        http://footprintsprod/MRcgi/MRTicketPage.pl?MAJOR_MODE=CREATE*
// @match        http://footprints/MRcgi/MRTicketPage.pl?MAJOR_MODE=CREATE*
// @grant        none
// @downloadURL  http://scriptsrc.info/Scripts/Footprints_Lite/Footprints_Lite.user.js
// ==/UserScript==

/*
 Version History

 version      0.3.5
 updated      February 10th, 2018

 patch_notes
 + Updated if statements to be better optimized
 + Updated clear and roll button functions to remove anything currently in the Assigned Technicians field
*/

window.onload = function() {
    window.origDesc = "";

    var checkNature = document.getElementById("cmt");

    for (var i = 0; i<checkNature.length;i++){
        getCurrentNature = checkNature.options[i].value;

        if (getCurrentNature.indexOf("SELECT_") !== -1) {
        } else if(getCurrentNature.indexOf("11_") !== -1) {
        } else if(getCurrentNature.indexOf("33_") !== -1) {
        } else if(getCurrentNature.indexOf("35_") !== -1) {
        } else if(getCurrentNature.indexOf("36_") !== -1) {
        } else if(getCurrentNature.indexOf("38_") !== -1) {
        } else if(getCurrentNature.indexOf("39_") !== -1) {
        } else if(getCurrentNature.indexOf("40_") !== -1) {
        } else if(getCurrentNature.indexOf("70_") !== -1) {
        } else if(getCurrentNature.indexOf("70_") !== -1) {
        } else if(getCurrentNature.indexOf("71_") !== -1) {
        } else if(getCurrentNature.indexOf("75_") !== -1) {
        } else if(getCurrentNature.indexOf("77_") !== -1) {
        } else if(getCurrentNature.indexOf("78_") !== -1) {
        } else if(getCurrentNature.indexOf("91_") !== -1) {
        } else if(getCurrentNature.indexOf("99_") !== -1) {
        } else if(getCurrentNature.indexOf("115_") !== -1) {
        } else if(getCurrentNature.indexOf("116_") !== -1) {
        } else if(getCurrentNature.indexOf("117_") !== -1) {
        } else if(getCurrentNature.indexOf("118_") !== -1) {
        } else if(getCurrentNature.indexOf("119_") !== -1) {
        } else if(getCurrentNature.indexOf("120_") !== -1) {
        } else if(getCurrentNature.indexOf("122_") !== -1) {
        } else if(getCurrentNature.indexOf("125_") !== -1) {
        } else if(getCurrentNature.indexOf("126_") !== -1) {
        } else {
            checkNature[i].style.display = "none";
        }
    }

    var natureOfTroubleButton = document.getElementById("{Nature__bof__bTrouble}_label"),
        displayStatus = false;

    natureOfTroubleButton.onclick = function() {
        if (displayStatus === true) {
            displayStatus = false;
            alert("Hiding Unused Natures");

            for (i = 0; i < checkNature.length; i++) {
                getCurrentNature = checkNature.options[i].value;

                if (getCurrentNature.indexOf("SELECT_") !== -1) {
                } else if(getCurrentNature.indexOf("11_") !== -1) {
                } else if(getCurrentNature.indexOf("33_") !== -1) {
                } else if(getCurrentNature.indexOf("35_") !== -1) {
                } else if(getCurrentNature.indexOf("36_") !== -1) {
                } else if(getCurrentNature.indexOf("38_") !== -1) {
                } else if(getCurrentNature.indexOf("39_") !== -1) {
                } else if(getCurrentNature.indexOf("40_") !== -1) {
                } else if(getCurrentNature.indexOf("70_") !== -1) {
                } else if(getCurrentNature.indexOf("70_") !== -1) {
                } else if(getCurrentNature.indexOf("71_") !== -1) {
                } else if(getCurrentNature.indexOf("75_") !== -1) {
                } else if(getCurrentNature.indexOf("77_") !== -1) {
                } else if(getCurrentNature.indexOf("78_") !== -1) {
                } else if(getCurrentNature.indexOf("91_") !== -1) {
                } else if(getCurrentNature.indexOf("99_") !== -1) {
                } else if(getCurrentNature.indexOf("115_") !== -1) {
                } else if(getCurrentNature.indexOf("116_") !== -1) {
                } else if(getCurrentNature.indexOf("117_") !== -1) {
                } else if(getCurrentNature.indexOf("118_") !== -1) {
                } else if(getCurrentNature.indexOf("119_") !== -1) {
                } else if(getCurrentNature.indexOf("120_") !== -1) {
                } else if(getCurrentNature.indexOf("122_") !== -1) {
                } else if(getCurrentNature.indexOf("125_") !== -1) {
                } else if(getCurrentNature.indexOf("126_") !== -1) {
                } else {
                    checkNature[i].style.display = "none";
                }
            }
        } else {
            displayStatus = true;
            alert("Showing Unused Natures");
            for (i = 0; i < checkNature.length; i++) {
                checkNature[i].style.display = "initial";
            }
        }
    };

    var assignedTechElement = document.getElementById("assgnee");
    assignedTechElement.getElementsByTagName("option")[0].remove();

    var elementToAddButtons = document.getElementById("goButton").parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    var clearButton = document.createElement("button");
    var clearText = document.createTextNode("Clear Ticket");

    clearButton.appendChild(clearText);
    clearButton.addEventListener("click", ClearButtonAction);
    clearButton.id = "clearTicketButton";

    var rollButton = document.createElement("button");
    var rollText = document.createTextNode("Roll Ticket");

    rollButton.appendChild(rollText);
    rollButton.addEventListener("click", RollButtonAction);
    rollButton.style.display = "inline-block";

    var versionButton = document.createElement("button");
    var versionText = document.createTextNode("  Version: 0.3.4");

    versionButton.appendChild(versionText);
    versionButton.addEventListener("click", versionTextAction);
    versionButton.style.display = "inline-block";

    elementToAddButtons.appendChild(clearButton);
    elementToAddButtons.appendChild(rollButton);
    elementToAddButtons.appendChild(versionButton);

    clearButton.parentElement.getElementsByTagName("td")[2].width = "";

    function ClearButtonAction () {
        var ticketStatusElement = document.getElementById("status");
        ticketStatusElement.selectedIndex = 6; // Set the value to Cleared

        var truckRolledElement = document.getElementById("Truck__bRolled");
        truckRolledElement.value = "No";

        var assignedTechElement = document.getElementById("assgnee");
        var assignedTechOption = document.createElement("option");

        // Check to see if there is any technicians assigned to the ticket and if there is remove it.
        if(assignedTechElement.getElementsByTagName("option")[0] != null) {
            assignedTechElement.getElementsByTagName("option")[0].remove();
        }

        assignedTechOption.text = "Broadband Support";
        assignedTechOption.value = ":Broadband__bSupport";
        assignedTechElement.add(assignedTechOption);

        console.log("BB Added");
    }

    function RollButtonAction () {
        var ticketStatusElement = document.getElementById("status");
        ticketStatusElement.selectedIndex = 0; // Set the value to Logged

        var truckRolledElement = document.getElementById("Truck__bRolled");
        truckRolledElement.value = "Yes";

        var assignedTechElement = document.getElementById("assgnee");
        var assignedTechOption = document.createElement("option");

        // Check to see if there is any technicians assigned to the ticket and if there is remove it.
        if(assignedTechElement.getElementsByTagName("option")[0] != null) {
            assignedTechElement.getElementsByTagName("option")[0].remove();
        }

        assignedTechOption.text = "Testboard";
        assignedTechOption.value = ":Testboard";
        assignedTechElement.add(assignedTechOption);
    }

    function versionTextAction () {
        alert("version - 0.3.5\nupdated - February 10th, 2018\n\npatch_notes\n+ Updated if statements to be better optimized\n+ Updated clear and save button functions to remove anything currently in the Assigned Technicians field");
    }
};
