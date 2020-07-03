/**
 * you can store data in client cookies to store store history
 *  you can use that history to access the youtube channels
 * 
 * 
 * 
 * 
 * First take the keyword and get the username from there and use that to get the subs and views
 * look line 52 for the serach url
 */
const input = document.getElementById("username");
const button = document.querySelector('.submit')
const counts = document.querySelector('.subs');

/**
 *  Fetch data from url if gets error then callback with another url
 * @param { string } url 
 * @param { function } callback 
 * @param { string } nxtUrl 
 */
async function fetchAndCallback(url) {
    const api = "AIzaSyDl5bov83fBW37QXinJvn4bS9cf-czCNxY";
    await fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            try {
                let item = data.items[0];
                // console.log(item);
                generateHTML(item);
            } catch (err) {
                throw new Error(err.message);
            }
        })
        .catch(err => {
            alert(err.message)
        })
}

/**
 * Get data from the api and execute generateHTML() function
 * @param { string } username as entered by the user
 */
async function fetchDataByUsername(input = "pewdiepie") {
    const api = "AIzaSyDl5bov83fBW37QXinJvn4bS9cf-czCNxY";
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${api}`
    await fetch(url)
        .then(data => data.json())
        .then(data => data.items[0].id.channelId)
        .then(async data => {
            console.log(data);
            let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data}&key=${api}`;
            await fetchAndCallback(url)
        })
        .catch(err => console.log(err.message))
}
/**
 * GenerateHTML: outputs html to the DOM using selectors.
 * @param { object } data data received from api
 */
async function generateHTML(data) {
    counts.innerHTML = `
        <span>
            <span>${data.snippet.title}: <span>
            Subscriber: <span>${shortNumber(data.statistics.subscriberCount)}</span>
            Views: <span>${shortNumber(data.statistics.viewCount)}</span>
        </span>`
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
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
            // Three Zeroes for Thousands
            : (Math.abs(Number(labelValue))) >= 1.0e+3

                ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

                : Math.abs(Number(labelValue));

}

// Event Listeners for submit events
document.addEventListener('keyup', (event) => getData(event.key));
// button.addEventListener('click', () => getData("Enter"));

// function calls on page load
fetchDataByUsername();