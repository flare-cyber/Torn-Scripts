// ==UserScript==
// @name         Battle Stats Guestimator
// @namespace    flare.inc
// @version      0.1
// @description  Uses yata's api to display a battle stat estimate
// @author       flare [2195157]
// @match        https://www.torn.com/profiles.php*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract the target ID from the current URL
    function getTargetIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('XID');
    }

    // Replace with the same api key you use for yata
    const apiKey = 'your key';

    // Get the target ID from the URL
    const targetId = getTargetIdFromUrl();

    if (!targetId) {
        console.error('Target ID not found in the URL.');
        return;
    }

    // API URL
    const apiUrl = `https://yata.yt/api/v1/bs/${targetId}?key=${apiKey}`;

    // XPath to the element where you want to display the results
    const resultXPath = '//*[@id="profileroot"]/div/div/div/div[1]/div[2]/div[1]/div/div[2]/div/div/div[3]';

    // Function to format a number with commas every 3 digits
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Function to make the API call and display specific fields
    function makeApiCall() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if required
            },
            onload: function(response) {
                try {
                    const jsonResponse = JSON.parse(response.responseText);
                    console.log(jsonResponse);

                    // Check if the response structure is as expected
                    if (jsonResponse && jsonResponse[targetId]) {
                        const { total, type } = jsonResponse[targetId];
                        const formattedTotal = formatNumberWithCommas(total);
                        const resultElement = document.evaluate(resultXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                        // Check if the result element exists before updating its content
                        if (resultElement) {
                            // Apply custom styling with spacing and formatted total
                            resultElement.innerHTML = `<div style="font-size: 18px; font-weight: bold; text-align: center;">Total: ${formattedTotal} &nbsp;|&nbsp; Type: ${type}</div>`;
                        } else {
                            console.error('Result element not found. Check the XPath.');
                        }
                    } else {
                        console.error('Unexpected API response structure.');
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            },
            onerror: function(error) {
                console.error('API Error:', error);
                // Handle the API error here
            },
        });
    }

    // Call the API function
    makeApiCall();
})();
