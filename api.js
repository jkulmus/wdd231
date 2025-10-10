const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
    const apiKey = "AFRCm85m9AzlhHJLGpI7BVFo0yEYYfVKLvzNMMba";
    // construct the url: baseUrl + endpoint + parameters
    const url = baseUrl + endpoint;
    // set the options. The important one here is the X-Api-Key
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": apiKey
        }
    }
    // make the request
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    return data;
}

getJson('alerts?parkCode=acad,dena');