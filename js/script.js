/**
 * you can store data in client cookies to store store history
 *  you can use that history to access the youtube channels
 * 
 * 
 * add a search button for those who cannot see press enter line on smartphones
 */

console.warn("Make sure you know what you are doing");
console.warn("Made by KDSG (Karan Pal Singh) \n Search: KDSGYT (Google it )");

const input = document.getElementById("username");
const button = document.querySelector(".submit");
const counts = document.querySelector(".subs");
const card = document.querySelector(".card");
const channelBanner = document.querySelector('.banner');
const error = document.querySelector('.error');

const channelProfileImage = card.querySelector(".card-circle");

/**
 *  Fetch data from url if gets error then callback with another url
 * @param { string } url
 */
async function fetchData(url) {
    await fetch(url)
        .then((data) => data.json())
        .then((data) => {
            try {
                console.log(data);

                let item = data.items[0];
                generateHTML(item);
            } catch (err) {
                throw new Error(err.message);
            }
        })
        .catch((err) => {
            alert(err.message)
            // console.error(err.message);
        });
}

/**
 * Get data from the api and execute generateHTML() function
 * @param { string } input as entered by the user
 */
async function fetchDataByUsername(input = "pewdiepie") {
    const api = "AIzaSyC1UlcFjhhMckBnExrm8K1UyVMJyxgWT5c";
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${api}`;
    await fetch(url)
        .then((data) => data.json())
        .then((data) => {
            try {
                
                return data.items[0].id.channelId;
            } catch {
                errorHandler(data);
            }
        })
        .then(async (data) => {
            console.log(data);
            let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics%2CbrandingSettings&id=${data}&key=${api}`;
            await fetchData(url);
        })
        .catch((err) => console.log(err));
}

/**
 * GenerateHTML: outputs html to the DOM using selectors.
 * @param { object } data data received from api
 */
async function generateHTML(data) {
    const thumbnails = data.snippet.thumbnails;
    // const banner = `https://yt3.ggpht.com/wuqXYCeCdttO0TcwBJR2yy0uJP2hPwTPdrDQpjD00t0Xd_81t6dYeLdVMR24ArD4kuIpWO4hWg=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`;
    const banner = data.brandingSettings.image;
    console.log(data.brandingSettings);
    if (!data.message) {
        let width = window.screen.width;
        if ( width < 600) updateImages(thumbnails.default.url, banner.bannerMobileHdImageUrl);
        if (width >= 600) updateImages (thumbnails.medium.url, banner.bannerMobileExtraHdImageUrl);
        counts.innerHTML = `
        <span>
            <span class="channelTitle"><h2>${data.snippet.title}</h2></span>
            <div class="stats">
                <span class="channelSubs">Subs: ${shortNumber(
            data.statistics.subscriberCount
        )}</span>
                <span class="channelViews"> Views: ${shortNumber(
            data.statistics.viewCount
        )}</span>
            </div>
        </span>`;
    } else {
        counts.innerHTML = `Error: ${data.message}`;
    }
}

/**
 * Update images everytime this function is called with something new. 
 * @param { string } url url for the thumbnail
 * @param { string } banner url for the channel banner
 */
function updateImages(url, banner) {
    // channelProfileImage.style.backgroundImage = `url(${url})`;
    channelProfileImage.setAttribute("src", url);

    channelBanner.setAttribute("src", banner);
}

/**
 * Verify the value and get the data
 * @param { string } key when enter pressed call the function to get data
 */
async function getData(key) {
    if (key === "Enter" && input.value !== (null || "" || " ")) {
        await fetchDataByUsername(input.value.split(" ").join(""));
        input.value = "";
    }
}

/**
 * Converts the numbers into
 * @param { number } labelValue the value you to short in M OR K
 */
function shortNumber(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
            ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
            : // Three Zeroes for Thousands
            Math.abs(Number(labelValue)) >= 1.0e3
                ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
                : Math.abs(Number(labelValue));
}


function errorHandler(err) {
    console.log(err.error);
    error.innerHTML = err.error;
}

// Event Listeners for submit events
document.addEventListener("keyup", (event) => getData(event.key));

// function calls on page load
fetchDataByUsername();
