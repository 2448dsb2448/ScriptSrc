// ==UserScript==
// @name         Footprints Lite Optimized
// @namespace    http://tampermonkey.net/
// @version      2022.03.24
// @icon         http://footprintsprod/MRimg/uni.ico
// @description  Add extra utility to Footprints when creating or editing tickets.
// @author       Scott Brooks
// @match        http://footprintsprod/MRcgi/MRTicketPage.pl*
// @match        http://footprints/MRcgi/MRTicketPage.pl*
// @match        http://helpdesk.comporium.com/MRcgi/MRTicketPage.pl*
// @match        http://footprintsv10/MRcgi/MRTicketPage.pl*
// @grant        none
// @downloadURL  http://scriptsrc.info/Scripts/Footprints_Lite/Footprints_Lite.user.js
// ==/UserScript==

// Sets must be in numerical order to ensure that all functions operate correctly
// Denotes the nature of troubles to display for certain types of tickets
// This can be found by looking at the 'Type' in AccessPoint or the 'Service Type' in FootPrints after entering an account number
const SECURITY_NATURE_OF_TROUBLES  = ["SELECT_", "51_", "52_", "53_", "55_", "56_", "57_", "58_", "59_", "60_", "62_", "63_", "64_", "65_", "66_"];
const INTERNET_NATURE_OF_TROUBLES  = ["SELECT_", "11_", "33_", "35_", "36_", "38_", "39_", "40_", "70_" ,"71_", "75_", "77_", "78_", "91_", "99_", "115_", "116_", "117_", "118_", "119_", "120_", "122_", "125_", "126_", "127_", "129_", "130_"];
const STREAM_NATURE_OF_TROUBLES    = ["SELECT_", "128_"];
const INTERNET_SERVICE_TYPES_CODES = ["BDS", "CMR", "CBC", "CLL", "DRS", "D2F", "DSR", "DSB", "EML", "FTC", "FBC", "FTR", "NZR", "NCR", "NFR", "ZRC", "ZBC"];
const SECURITY_SERVICE_TYPES_CODES = ["AUR", "ADR", "MED"];
const STREAM_SERVICE_TYPES_CODES   = ["STR"];

/**
 * @name ServiceType
 */
class ServiceType {
    static Internet = new ServiceType("Internet");
    static Security = new ServiceType("Security");
    static Stream = new ServiceType("Stream");
    static Unknown = new ServiceType("Unknown");

    constructor(name) {
        this.name = name;
    }
}

// Enum to hold possible ticket status states
class TicketStatus {
    static Open = new TicketStatus(0, "Open");
    static Referred = new TicketStatus(1, "Referred");
    static Dispatched = new TicketStatus(2, "Dispatched");
    static PendingResolved = new TicketStatus(3, "Pending__bResolved");
    static SpiritDomains = new TicketStatus(4, "Spirit__bDomains");
    static BroadbandRequest = new TicketStatus(5, "Broadband__bRequest");
    static Closed = new TicketStatus(6, "Closed");

    constructor(index, value) {
        this.index = index;
        this.value = value;
    }
}

class Button {
    constructor(buttonText, ticketStatusIndex, ticketRolled, emailTech , assignedTechText = null,
                assignedTechValue = null, secondAssignedTechText = null, secondAssignedTechValue = null) {
        this.buttonText = document.createTextNode(buttonText);
        this.ticketStatusIndex = ticketStatusIndex;
        this.ticketRolled = ticketRolled;
        this.emailTech = emailTech;
        this.assignedTechText = assignedTechText;
        this.assignedTechValue = assignedTechValue;
        this.secondAssignedTechText = secondAssignedTechText;
        this.secondAssignedTechValue = secondAssignedTechValue;
    }

    Add_Button() {
        let button = document.createElement("button")

        button.appendChild(this.buttonText);
        button.addEventListener("click", this.Button_On_Click)
        button.id = this.buttonText.textContent.split(" ").join("") + "Button";

        button.setAttribute("ticketStatusIndex", this.ticketStatusIndex);
        button.setAttribute("ticketRolled", this.ticketRolled ? "Yes" : "No" );
        button.setAttribute("emailTech", this.emailTech ? "Yes" : "No" );

        if (this.assignedTechText != null && this.assignedTechValue != null) {
            button.setAttribute("assignedTechText", this.assignedTechText);
            button.setAttribute("assignedTechValue", this.assignedTechValue);
        }

        if (this.secondAssignedTechText != null && this.secondAssignedTechValue != null) {
            button.setAttribute("secondAssignedTechText", this.secondAssignedTechText);
            button.setAttribute("secondAssignedTextValue", this.secondAssignedTechValue);
        }

        return button;
    }

    Button_On_Click(evt) {
        let ticketStatusElement = document.getElementById("status");
        ticketStatusElement.selectedIndex = evt.target.attributes.ticketStatusIndex.value;

        let truckRolledElement = document.getElementById("Truck__bRolled");
        truckRolledElement.value = evt.target.attributes.ticketRolled.value;

        let assignedTechElement = document.getElementById("assgnee");

        if(evt.target.attributes.emailTech.value === "Yes") {
            document.getElementById("emailasgn").checked = true;
        }

        if (assignedTechElement.getElementsByTagName("option")[0] !=null) {
            assignedTechElement.getElementsByTagName("option")[0].remove();
        }

        if (evt.target.hasAttribute("assignedTechText")) {
            let assignedTechOption = document.createElement("option");

            assignedTechOption.text = evt.target.attributes.assignedTechText.value;
            assignedTechOption.value = evt.target.attributes.assignedTechValue.value;
            assignedTechElement.add(assignedTechOption);
        }

        if (evt.target.hasAttribute("secondAssignedTechText")) {
            let secondAssignedTechOption = document.createElement("option");

            secondAssignedTechOption.text = evt.target.attributes.secondAssignedTechText;
            secondAssignedTechOption.value = evt.target.attributes.secondAssignedTechValue;
            assignedTechElement.add(secondAssignedTechOption);
        }
    }
}

window.onload = function () {
    let serviceCode = document.getElementById("Service__bType");
    let serviceType;

    let ticketStatus = Is_New_Ticket()

    if (ticketStatus) {
        serviceCode.onchange = function () {
            serviceType = Determine_Ticket_Type(serviceCode.value);
            if (serviceType === ServiceType.Internet) {
                Internet_Ticket(ticketStatus);
            } else if (serviceType === ServiceType.Security) {
                Security_Ticket(ticketStatus);
            } else if (serviceType === ServiceType.Stream) {
                Stream_Ticket(ticketStatus);
            }
        }
    } else {
        serviceType = Determine_Ticket_Type(serviceCode.value);
        if (serviceType === ServiceType.Internet) {
            Internet_Ticket(ticketStatus);
        } else if (serviceType === ServiceType.Security) {
            Security_Ticket(ticketStatus);
        } else if (serviceType === ServiceType.Stream) {
            Stream_Ticket(ticketStatus);
        }
    }

    /**
     * This is used to reduce/expand the Nature of trouble list based on the list that is passed into it.
     * @param {boolean} showAll - Determines if all Natures Of Troubles should be displayed or a reduced list.
     * @param {Object} serviceType - The type of service
     */
    function Reduce_Nature_Of_Troubles (serviceType, showAll = false) {
        let checkNature = document.getElementById("cmt");

        if(showAll || serviceType === ServiceType.Unknown) {
            for (let i = 0; i < checkNature.length; i++) {
                checkNature[i].style.display = "initial";
            }
        } else {
            let currentSetIndex = 0;
            let setToCheck;

            if (serviceType === ServiceType.Internet) {
                setToCheck = INTERNET_NATURE_OF_TROUBLES;
            } else if (serviceType === ServiceType.Security) {
                setToCheck = SECURITY_NATURE_OF_TROUBLES;
            } else if (serviceType === ServiceType.Stream) {
                setToCheck = STREAM_NATURE_OF_TROUBLES;
            }

            for (let i = 0; i < checkNature.length; i++) {
                let testValue = checkNature.options[i].value

                if (currentSetIndex >= setToCheck.length) {
                    checkNature[i].style.display = "none";
                } else if (testValue.includes(setToCheck[currentSetIndex])) {
                    currentSetIndex++;
                } else {
                    checkNature[i].style.display = "none";
                }
            }
        }
    }

    /**
     * This function checks to see if the ticket is a new ticket or a ticket that you are editing.
     * @return {boolean} - TRUE = new ticket : FALSE = existing ticket
     */
    function Is_New_Ticket () {
        let fieldToCheck = document.getElementsByClassName("dialogTitle")[0].textContent;

        try {
            if (fieldToCheck.includes("New")) {
                console.log("Is_New_Ticket(): This is a new ticket")
                return true;
            } else {
                console.log("Is_New_Ticket(): This is a existing ticket")
                return false;
            }
        } catch (err) {
            console.log("Is_New_Ticket() returned an error of :" + err);
        }
    }

    /**
     *
     * @param {string} serviceCode - The service type code that is passing in from footprints
     * @returns {Object} - Returns the category of service that the ticket is for: Stream, Security, Internet, or Unknown
     */
    function Determine_Ticket_Type (serviceCode) {
        for (const service of INTERNET_SERVICE_TYPES_CODES) {
            if (serviceCode === service) {
                return ServiceType.Internet;
            }
        }
        for (const service of SECURITY_SERVICE_TYPES_CODES) {
            if (serviceCode === service) {
                return ServiceType.Security;
            }
        }
        for (const service of STREAM_SERVICE_TYPES_CODES) {
            if (serviceCode === service) {
               return ServiceType.Stream;
            }
        }
        return ServiceType.Unknown;
    }

    /**
     * Function to be called if the ticket is for an internet trouble. This creates and adds necessary buttons to be
     * added to the page for an internet ticket as well as condense the nature of troubles list to only show what is necessary.
     */
    function Internet_Ticket (newTicket) {
        if (newTicket) {
            if (document.getElementById("assgnee").getElementsByTagName("option")[0] != null) {
                document.getElementById("assgnee").getElementsByTagName("option")[0].remove();
            }
        }

        let elementToAddButtons = document.getElementById("goButton").parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        Reduce_Nature_Of_Troubles(ServiceType.Internet, false);

        let buttonsToAdd = [new Button("Clear Ticket", TicketStatus.Closed.index, false,
                                false, "Broadband Support", ":Broadband__bSupport"),
                            new Button("Roll Ticket", TicketStatus.Open.index, true,
                                false, "Testboard", ":Testboard"),
                            new Button("Brevard Saturday Ticket", TicketStatus.Dispatched.index,
                                true, false, "BVSatTroubles", "BVSatTroubles:"),
                            new Button("Broadband Logged", TicketStatus.Open.index, false,
                                false, "Broadband Support", ":Broadband__bSupport")
        ];

        for (const button of buttonsToAdd) {
            elementToAddButtons.appendChild(button.Add_Button());
        }

        if (!newTicket) {
            elementToAddButtons.getElementsByTagName("td")[4].width = 0;
        }

        document.getElementById("ClearTicketButton").parentElement.getElementsByTagName("td")[2].width = "";
    }

    function Security_Ticket (newTicket) {
        if (newTicket) {
            if (document.getElementById("assgnee").getElementsByTagName("option")[0] != null) {
                document.getElementById("assgnee").getElementsByTagName("option")[0].remove();
            }
        }

        let elementToAddButtons = document.getElementById("goButton").parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        Reduce_Nature_Of_Troubles(ServiceType.Security, false);

        let buttonsToAdd = [new Button("Clear Ticket", TicketStatus.Closed.index, false,
                                false, "Broadband Support", ":Broadband__bSupport",
                                "Tanji Daniels", "twbustyd:"),
                            new Button("Roll Ticket", TicketStatus.Open.index, true,
                                true),
                            new Button("Logged", TicketStatus.Open.index, false,
                                false, "Tanji Daniels", "twbustyd:")
        ];

        for (const button of buttonsToAdd) {
            elementToAddButtons.appendChild(button.Add_Button());
        }

        if (newTicket) {
            elementToAddButtons.getElementsByTagName("td")[4].width = 0;
        }

        document.getElementById("ClearTicketButton").parentElement.getElementsByTagName("td")[2].width = "";
    }

    function Stream_Ticket (newTicket) {
        if (newTicket) {
            if (document.getElementById("assgnee").getElementsByTagName("option")[0] != null) {
                document.getElementById("assgnee").getElementsByTagName("option")[0].remove();
            }
        }

        let elementToAddButtons = document.getElementById("goButton").parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        Reduce_Nature_Of_Troubles(ServiceType.Stream, false);

        let buttonsToAdd = [new Button("Clear Ticket", TicketStatus.Closed.index, false,
            false, "Broadband Support", ":Broadband__bSupport"),
                            new Button("Roll Ticket", TicketStatus.Open.index, true,
                                false, "Testboard", ":Testboard"),
                            new Button("Broadband Logged", TicketStatus.Open.index, false,
                                false, "Broadband Support", ":Broadband__bSupport")
        ];

        for (const button of buttonsToAdd) {
            elementToAddButtons.appendChild(button.Add_Button());
        }

        if (!newTicket) {
            elementToAddButtons.getElementsByTagName("td")[4].width = 0;
        }

        document.getElementById("ClearTicketButton").parentElement.getElementsByTagName("td")[2].width = "";
    }
}; // End of window.onload = function ()
