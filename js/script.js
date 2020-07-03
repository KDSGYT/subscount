/**
 * you can store data in client cookies to store store history
 *  you can use that history to access the youtube channels
 */
const input = document.getElementById("username");
const button = document.querySelector('.submit')
const counts = document.querySelector('.subs');


async function fetchAndCallback(url,callback, nxtUrl){
    const api = "AIzaSyDl5bov83fBW37QXinJvn4bS9cf-czCNxY";
    await fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            try {
                let item = data.items[0];
                generateHTML(item);
            } catch (err) {
                throw new Error(`${err.message}`);
            }
        })
        .catch(err => {
            console.log(err);
            let url = nxtUrl;
            if(callback){
                callback(url); //callback function
            } else {
                alert(err);
            }
        })
}

/**
 * Get data from the api and execute generateHTML() function
 * @param { string } username as entered by the user
 */
async function fetchDataByUsername(input = "pewdiepie") {
    const api = "AIzaSyDl5bov83fBW37QXinJvn4bS9cf-czCNxY";
    let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${input}&key=${api}`;
    fetchAndCallback(url, fetchDataById, `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${input}&key=${api}` );
}


/**
 * fetchDataUsingId
 * @param { string } url string to fetch data from if the default one doesn't work 
 */
function fetchDataById( url ){
    fetchAndCallback(url);   
}



/**
 * GenerateHTML: outputs html to the DOM using selectors.
 * @param { object } data data received from api
 */
function generateHTML(data) {
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
function getData(key) {
    if (key === "Enter" && input.value !== (null || "" || " ")) {
        fetchDataByUsername(input.value);
    }
}

/**
 * Converts the numbers into 
 * @param { number } labelValue the value you to short in M OR K
 */
function shortNumber (labelValue) {

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