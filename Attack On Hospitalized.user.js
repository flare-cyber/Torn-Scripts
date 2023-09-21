// ==UserScript==
// @name         Attack On Hospitalized
// @version      1.0
// @description  Allows you to attempt to start an attack while someone is still in hospital
// @author       flare[2195157]
// @match        https://www.torn.com/loader.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create the blue button
    function createButton() {
        const timeout = setTimeout(() => {
            const targetElement = document.querySelector('#defender > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div');
            const targetElement2 = document.querySelector("#defender > div.playerArea___oG4xu > div.playerWindow___FvmHZ > div.modal___lMj6N.defender___niX1M > div > div > div.title___fOh2J")

            if (targetElement && targetElement.textContent.includes("This person is currently in hospital and cannot be attacked")) {
                const Button = document.createElement('button');
                Button.textContent = 'Attack';
                Button.style.backgroundColor = 'red';
                Button.style.color = 'white';
                Button.style.padding = '20px';
                Button.style.border = 'none';
                Button.style.cursor = 'pointer';
                Button.style.width = '150px';

                Button.style.marginLeft = '42.5px';

                // Add a click event listener to the button
                Button.addEventListener('click', performRequest);

                // Append the button to the target element
                targetElement.appendChild(Button);
            }
        },1500); // Check after 1.5 seconds
    }

    function extractUser2IDFromURL(url) {
        const match = url.match(/user2ID=(\d+)/);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }


    // Function to perform the fetch request
    function performRequest() {
        var url = window.location.href;
        var user2ID = extractUser2IDFromURL(url);

        fetch("https://www.torn.com/loader.php?sid=attackData&mode=json&rfcv=undefined", {
            method: "POST",
            headers: {
                "accept": "*/*",
                "accept-language": "en-CA,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6,uk;q=0.5",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryFkclhK1DpySvGvpE",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
            },
            referrer: "https://www.torn.com/loader.php?sid=attack&user2ID=" + user2ID,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: `------WebKitFormBoundaryFkclhK1DpySvGvpE\r\nContent-Disposition: form-data; name="step"\r\n\r\nstartFight\r\n------WebKitFormBoundaryFkclhK1DpySvGvpE\r\nContent-Disposition: form-data; name="user2ID"\r\n\r\n${user2ID}\r\n------WebKitFormBoundaryFkclhK1DpySvGvpE--\r\n`,
            mode: "cors",
            credentials: "include"
        })
        .then(response => {
            if (response.ok) {
                console.log('Request Success');
                response.json().then(data => {
                    if(data.DB.error == "This person is currently in hospital and cannot be attacked"){
                        console.log("In Hospital");
                    }
                    else{
                        console.log("Good to Go");
                        location.reload();
                    }
                })
                // You can handle the response here if needed
            } else {
                console.error('Request failed');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
    }

    // Run the createBlueButton function when the page is fully loaded
    window.addEventListener('load', createButton);
})();
