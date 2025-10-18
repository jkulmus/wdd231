// CSS Imports
import "../css/style.css";
import "../css/conditions.css";

// Data Imports
import { 
    getParkData,
    getParkAlerts,
    getVisitorCenters,
 } from "./parkService.mjs";

 // Template Import
 import {
    activityListTemplate,
    alertTemplate,
    visitorCenterTemplate
 } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

// Functions
function setAlerts(alerts) {
    const alertsContainer = document.querySelector(".alerts > ul");
    alertsContainer.innerHTML = "";
    const html = alerts.map(alertTemplate);
    alertsContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

function setVisitorCenters(centers) {
    const centersContainer = document.querySelector("#visitor-centers-list");
    centersContainer.innerHTML ="";
    const html = centers.map(visitorCenterTemplate);
    centersContainer.insertAdjacentHTML("afterbegin", html.join(""));
}

function setActivities(activities) {
    const activitiesContainer = document.querySelector("#activities-list");
    activitiesContainer.innerHTML = "";
    const html = activityListTemplate(activities);
    activitiesContainer.insertAdjacentHTML("afterbegin", html);
}

// Initialize

async function init() {
    const parkData = await getParkData();
    const alerts = await getParkAlerts(parkData.parkCode);
    const visitorCenters = await getVisitorCenters(parkData.parkCode);
    setHeaderFooter(parkData);
    setAlerts(alerts);
    setVisitorCenters(visitorCenters);
    setActivities(parkData.activities);
}

init ();