const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;
export async function getParkData() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  let data = {};
  const response = await fetch(baseUrl + "parks" + "?parkCode=yell", options);
  if (response.ok) {
    data = await response.json();
  } else throw new Error("response not ok")
  return data.data[0];
};


// Export new array
const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: park.images[2].url,
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: park.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: park.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];



async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  let data = {};
  const response = await fetch(baseUrl + url, options);

  if (response.ok) {
    data = await response.json();
  } else throw new Error("response not ok: " + response.statusText);

  return data;
}



export function getInfoLinks(data) {
  const withUpdatedImages = parkInfoLinks.map((item, index) => {
    item.image = data[index + 2].url;
    return item;
  });
  return withUpdatedImages;
}

