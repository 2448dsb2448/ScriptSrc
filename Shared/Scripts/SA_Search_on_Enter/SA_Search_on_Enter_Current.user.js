// ==UserScript==
// @name         SA Search on Enter
// @namespace    https://comporium.saa.arrisassurance.com/
// @version      0.2.3
// @icon         https://comporium.saa.arrisassurance.com/favicon.ico
// @description  Enable search by pressing enter when in the Account number field.
// @author       Scott Brooks
// @match        https://comporium.saa.arrisassurance.com/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// @downloadURL  http://scriptsrc.info/Scripts/SA_Search_on_Enter/SA_Search_on_Enter_Current.user.js
// ==/UserScript==

$(document).ready(function() {
   console.log("SA_Search_on_Enter loaded from Tampermonkey.");

    // Checks to if the document has changed and hte account element is on screen.
    $(document).bind('DOMSubtreeModified', function () {
        if(document.getElementById("account")) {
            console.log("Element exist");

            var accountNubmerElement = document.getElementById("account");
            accountNubmerElement.onkeydown = function(event) {
                console.log("Search on enter Function call");

                if(event.keyCode == 13) {
                    console.log("Event code entered");

                    document.getElementById('subscriberSearch').submit();
                }
            };

        } else {
            console.log("Element does not exist");
        }
        console.log("Document change");
    });
});
