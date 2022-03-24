<head>
    <title>Script Source</title>


    <style>
        body {
            text-align: center;
        }
    </style>
    <script type="text/javascript">
        function BrowserChange() {
            if (document.getElementById('firefox').checked) {
                document.getElementById('downloadlink').href = "https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/";
                document.getElementById('downloadlink').innerText = "Click here to download TamperMonkey for Firefox";
            } else if (document.getElementById('chrome').checked) {
                document.getElementById('downloadlink').href = "https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en";
                document.getElementById('downloadlink').innerText = "Click here to download TamperMonkey for Chrome";
            }
        }

        function ToggleElement(elementToToggle) {
            let element = document.getElementById(elementToToggle);
            element.hidden = !element.hidden;
        }
    </script>
</head>

<body>
<h1>Step 1 - TamperMonkey install</h1>

<h3>Please select the browser you use for Foootprints, ServAssure, and accessing modems</h3>
<form>
    <input type="radio" id="firefox" name="browser" value="firefox" onchange="BrowserChange()">
    <label for="firefox">Firefox</label><br>
    <input type="radio" id="chrome" name="browser" value="chrome" onchange="BrowserChange()">
    <label for="chrome">Chrome</label><br>
</form>


<a id="downloadlink" target="_blank">Please select your browser above</a>

<h3>Please look in the top right and check if you see <img src="https://addons.cdn.mozilla.net/user-media/addon_icons/683/683490-64.png?modified=1565719090" alt="TamperMonkey Logo"></h3>

<h3>If you do see this icon you have TamperMonkey installed</h3>

<h3>Once you have it downloaded and installed please check the box below.</h3>

<form>
    <input type="checkbox" id="tampermonkeyInstalled" onchange="ToggleElement('scripts_div')">
    <label for="tampermonkeyInstalled">Is TamperMonkey installed?</label><br>
</form>

<div id="scripts_div" hidden="hidden">
    <h1>Step 2 - Install the scripts</h1>

    <h3>Select the script below that you would like to download.</h3>

    <h3>After you click the download link for the script you should see something similar to</h3>

    <img src="src/img/TamperMonkeyScriptInstall.PNG" alt="Script Install">

    <h3>You would click on install on the page above and after that the script should be installed. </h3>

    <h3>Click each of the scripts below that you need to install.</h3>

    <hr/>

    <h4 onclick="ToggleElement('footprints_lite_div')">Footprints Lite Optimized</h4>

    <div id="footprints_lite_Div">
        <a href="Shared/Scripts/Footprints_Lite/Footprints_Lite_Optimize.user.js">Click here to download the script</a>

        <p></p>
    </div>

    <h4 onclick="ToggleElement('arris_3450_password')">Arris 3450 Show Password</h4>

    <div id="arris_3450_password">
        <a href="Shared/Scripts/Arris_3450_Show_Password/Arris_3450_Show_Password_Current.user.js">Click here to download the script</a>

        <p></p>
    </div>

    <h4 onclick="ToggleElement('arris_3450_password')">Arris 3450 Opera Popup Closer</h4>

    <div id="arris_3450_password">
        <a href="Shared/Scripts/Arris_3450_Opera_Popup_Closer/Arris_3450_Opera_Popup_Closer.user.js">Click here to download the script</a>

        <p></p>
    </div>

    <h4 onclick="ToggleElement('arris_3450_password')">TEST SCRIPT</h4>

    <div id="TEST">
        <a href="Shared/Scripts/Improved_Toolbox/Improved_ToolBox.user.js">Click here to download the script</a>

        <p></p>
    </div>

    <hr/>

    <h3>Once you have the scripts installed check the box below to continue</h3>

    <form>
        <input type="checkbox" id="scriptsInstalled" onchange="ToggleElement('verify_div')">
        <label for="scriptsInstalled">Are the scripts installed?</label><br>
    </form>

    <div id="verify_div" hidden>
        <h1>Step 3 - Verify the scripts are installed</h1>

        <h3>After you have installed the scripts left click the icon for TamperMonkey in the top right then click on dashboard</h3>

        <h3>You should now see something similar to this</h3>

        <img src="src/img/verifyInstall.PNG" alt="Verify the scripts are installed">

        <h3>If you see the scripts and the enabled button is green then Congratulations you have successfully installed TamperMonkey and the scripts</h3>
    </div>

</div>
</body>
