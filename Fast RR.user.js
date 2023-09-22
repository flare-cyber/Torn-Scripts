// ==UserScript==
// @name         Fast RR
// @version      1.0
// @description  Allows you to shoot in rr before the animation
// @author       flare[2195157]
// @match        https://www.torn.com/page.php?sid=russianRoulette*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let currentURL = window.location.href; // Store the initial URL

    // Function to create the blue button
    function runScript() {
        const timeout = setTimeout(() => {
            const targetElement = document.querySelector("#react-root > div > div.appWrapper___ArZmW > div.headerWrap___SRCoT > div.bottomSection___uDzzT > div.potWrap___fSdxd")

            if (targetElement) {
                createButton("Shoot Early 1", "1");
                createButton("Shoot Early 2", "2");
                createButton("Shoot Early 3", "3");
            }
        },1000); // Check after 1 seconds
    }

    function createButton(label, shots){
                const targetElement = document.querySelector("#react-root > div > div.appWrapper___ArZmW > div.headerWrap___SRCoT > div.bottomSection___uDzzT > div.potWrap___fSdxd")
                const Button = document.createElement('button');
                Button.textContent = label;
                Button.style.backgroundColor = 'grey';
                Button.style.color = 'white';
                Button.style.padding = '10px';
                Button.style.border = 'none';
                Button.style.cursor = 'pointer';
                Button.style.width = '90px';
                Button.style.height = '44px';

                Button.style.marginLeft = '40px';

                // Add a click event listener to the button
                 Button.addEventListener('click', function () {
                     performRequest(shots);
                 });

                // Append the button to the target element
                targetElement.appendChild(Button);
    }

    // Function to perform the fetch request
    function performRequest(shot) {
        var rfc = getRfcVToken();
        fetch("https://www.torn.com/page.php?sid=russianRouletteData&rfcv=" + rfc, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6,uk;q=0.5",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundarysjciiQrGixS0J6tF",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://www.torn.com/page.php?sid=russianRoulette",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `------WebKitFormBoundarysjciiQrGixS0J6tF\r\nContent-Disposition: form-data; name=\"step\"\r\n\r\nmakeTurn\r\n------WebKitFormBoundarysjciiQrGixS0J6tF\r\nContent-Disposition: form-data; name=\"shotsAmount\"\r\n\r\n${shot}\r\n------WebKitFormBoundarysjciiQrGixS0J6tF--\r\n`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
    }

        // Function to check for URL changes
    function checkURLChange() {
        const newURL = window.location.href;

        // Check if the URL has changed
        if (newURL !== currentURL) {
            currentURL = newURL; // Update the current URL
            runScript(); // Execute your script when the URL changes
        }
    }

        // Function to extract the 'rfc_v' token from the page's cookies
    function getRfcVToken() {
        const cookieString = document.cookie;
        const cookieArray = cookieString.split('; ');

        for (const cookie of cookieArray) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === 'rfc_v') {
                return cookieValue;
            }
        }

        return null; // Return null if 'rfc_v' cookie is not found
    }

    // Initial check
    checkURLChange();

    // Set up an interval to continuously check for URL changes
    setInterval(checkURLChange, 1000);

    // Run the createBlueButton function when the page is fully loaded
    window.addEventListener('load', runScript);;
})();
