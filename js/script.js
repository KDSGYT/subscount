
const input = document.getElementById("username");
const button = document.querySelector('.submit')
const counts = document.querySelector('.subs');

/**
 * Get data from the api and execute generateHTML() function
 * @param { string } username as entered by the user
 */
async function fetchData(username) {
    const api = "AIzaSyDl5bov83fBW37QXinJvn4bS9cf-czCNxY";
    let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${username}&key=${api}`;
    await fetch(url)
        .then(data => data.json())
        .then(data => {
            try {
                let stat = data.items[0].statistics;
                generateHTML(stat);
            } catch (err) {
                throw new Error(err.message);
            }
        })
        .catch(err => alert(err.message))
        .finally()
}

/**
 * GenerateHTML: outputs html to the DOM using selectors.
 * @param { object } data data received from api
 */
function generateHTML(data) {
    counts.innerHTML = `
        <span>
            Subscriber: <span>${shortNumber(data.subscriberCount)}</span>
            Views: <span>${shortNumber(data.viewCount)}</span>
        </span>`
}

/**
 * Verify the value and get the data
 * @param { string } key when enter pressed call the function to get data 
 */
function getData(key) {
    if (key === "Enter" && input.value !== (null || "" || " ")) {
        // console.log(typeof input.value)
        // let username = input.value.split(" ").join("").toLowerCase().toString()
        // console.log(typeof username);
        fetchData(input.value);
    }
}

/**
 * 
 * @param { number } labelValue the value you to short in M OR K
 */
function shortNumber (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue))).toFixed(2) / 1.0e+6 + "M"
    // Three Zeroes for Thousands
    : (Math.abs(Number(labelValue))) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));

}

// Event Listeners for submit events
document.addEventListener('keyup', (event) => getData(event.key));
// button.addEventListener('click', () => getData("Enter"));