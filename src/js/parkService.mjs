

const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;
const PARK_CODE = "yell";

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
  } else throw new Error(`API Resonse not ok: ${response.status} ${response.statusText}`);
  return data;
}

export async function getParkData() {
  const url = `parks?parkCode=${PARK_CODE}&api_key=${apiKey}`;
  const parkData = await getJson(url);
  return parkData.data[0];
}

export async function getParkAlerts() {
  const url = `alerts?parkCode=${PARK_CODE}&api_key=${apiKey}`;
  const response = await getJson(url);
  return response.data;
}

