// ==UserScript==
// @name         Footprints Mini
// @namespace    http://tampermonkey.net/
// @version      1.0
// @icon         http://footprintsprod/MRimg/uni.ico
// @description  This is for shortening the nature of troubles in Footprints for the common ones used by tech support.
// @author       Scott Brooks
// @match        http://footprintsprod/MRcgi/MRTicketPage.pl?MAJOR_MODE=CREATE*
// @match        http://footprints/MRcgi/MRTicketPage.pl?MAJOR_MODE=CREATE*
// @grant        none
// @downloadURL  http://scriptsrc.info/Shared/Scripts/Footprints_Mini/Footprints_Mini_Current.user.js
// ==/UserScript==

window.onload = function() {
    window.origDesc = "";

    var checkNature = document.getElementById("cmt");

    for (var i = 0; i<checkNature.length;i++) {
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
};
