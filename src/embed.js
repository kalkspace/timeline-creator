import { renderTimeline } from "./render.js";

import styles from "d3-milestones/build/d3-milestones.css";

const dataElem = document.getElementById("timeline-data");
const data = JSON.parse(dataElem.textContent);

const styleElem = document.createElement("style");
styleElem.textContent = styles;
document.head.appendChild(styleElem);

const timelineDiv = document.createElement("div");
timelineDiv.id = "timeline";
timelineDiv.style.height = "600px";
document.currentScript.insertAdjacentElement("afterend", timelineDiv);

renderTimeline(data);
