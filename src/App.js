import React, { useEffect, useState, useMemo } from "react";
import milestones from "d3-milestones";
import "d3-milestones/build/d3-milestones.css";
import Papa from "papaparse";

import "./App.css";

const DUMMY = `Datum,Titel,Beschreibung
16.07.2018,Idee und Namesfindung,"Name gefunden, Domain gekauft, Webseite gebaut, Twitter und Instagram geklickt während eines einzigen Mittagessens von Penny, Mop, Marcus und Christine"
05.09.2018,Erster Newsletter raus,
24.10.2018,Erster Mittwoch im Trash Chic,"Und von da an jeden Mittwoch für lange, lange Zeit"
16.11.2018,Erste Immobilie besichtigt,Die Erste von vielen…
23.11.2018,Merch,Was braucht der Coworking Space vor einer Immobilie? Einen Merch-Shop.
19.12.2018,Gründungsversammlung Verein,Stilvollste Gründungsversammlung im Trash Chic
08.01.2019,Umzug Stammtisch ins Hopla,Aufgrund der Akustik sind wir dann ins Hopla umgezogen. Und wegen der Kornschorle.
18.02.2019,Erstkontakt mit dem Kulturhof,Kennengelernt beim Bürgerforum der Stadt.
13.03.2019,1. Mitgliedsversammlung im Hopla,
18.04.2019,Immobilie Gießener Straße fällt flach,Big sad. Da hatten wir schon die Tische reingetragen.
22.08.2019,Chaos Communication Camp,Zwei Wochen in Staub und Funkloch
23.08.2019,Vertrag Immobilie unterschrieben,
11.09.2019,Erster Mittwoch im Space,
28.09.2019,Eröffnung,`;

function transformData(csv) {
  const eventData = Papa.parse(csv, { skipEmptyLines: true }).data.slice(1);
  const transformedEventData = eventData.map((data) => ({
    date: data[0],
    title: data[1],
  }));
  return transformedEventData;
}

function App() {
  const [csv, setCSV] = useState(DUMMY);
  const data = useMemo(() => transformData(csv), [csv]);

  useEffect(() => {
    milestones("#timeline")
      .orientation("vertical")
      .mapping({
        timestamp: "date",
        text: "title",
      })
      .parseTime("%d.%m.%Y")
      .labelFormat("%d.%m.%Y")
      .autoResize(true)
      .optimize(false) // does not work reliably
      .render(data);
  }, [data]);

  return (
    <div className="App">
      <div className="content">
        <header>
          <h1>Time of my ... </h1>
          <h2>Mach eine Timeline aus deinen Daten</h2>
          <p>Hier Daten im .csv-Format eingeben: Datum, Titel</p>
        </header>
        <textarea
          className="csv-import"
          rows="10"
          value={csv}
          onChange={(e) => setCSV(e.target.value)}
        ></textarea>
      </div>
      <div id="timeline"></div>
    </div>
  );
}

export default App;
