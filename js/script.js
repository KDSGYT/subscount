
const input = document.getElementById("username");
const button = document.querySelector('.submit')

/**
 * Get data from the api and execute generateHTML() function
 * @param { string }-username as entered by the user
 */
async function fetchData(username) {
    const api = "AIzaSyDl5bov83fBW37QXinJvn4bS9cf-czCNxY";
    let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${username}&key=${api}`;

    await fetch(url)
        // .then(data => console.log(data))
        .then(data => data.json())
        .then(data => {
            try{
                let stat = data.items[0].statistics;
                console.log(stat);
                generateHTML(stat);
            } catch (err) {
                throw new Error("Result not found");
            }
        })
        .catch(err => console.error(err.message))
}

/**
 * GenerateHTML: outputs html to the DOM using selectors.
 * @param { object }-data data received from api
 */
function generateHTML(){
    
}


function getData(key){
    if (key === "Enter" && input.value !== null) {
        fetchData(input.value);
    }
}


// Event Listeners for submit events
document.addEventListener('keyup',  (event) => getData(event.key));
button.addEventListener('click', () => getData("Enter"));