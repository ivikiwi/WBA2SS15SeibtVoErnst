# WBA2, Team 11
## Roman Seibt, Markus Ernst, Phuong Thuy Duong Vo


### Dokumentation

#### Wichtige Notizen zur Benutzung

##### JSON Serie
Eine einzelne Serie auf dem Server enthält folgende Informationen:
(Noch unvollständig, muss noch bearbeitet werden.)
{
	"name": "Name der Serie",
	"description": "Beschreibung der Serie",
	"genre": "Eines oder mehrere Genren der Serie"
}

##### JSON Staffel
Die Anzahl von Staffeln einer Serie wird wie folgt eingetragen:
{
	"episodes": "Anzahl an Episoden der Staffel"
}
Dabei wird auf folgenden Pfad zugegriffen: http://localhost:port/series/:serienid/season
Wie viele Staffeln eine Serie hat, könnte man anhand der Einträge mit dem key series:serienid:season:* auslesen.
