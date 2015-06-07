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
Dabei wird auf folgenden Pfad zugegriffen: http://localhost:port/series/:serienid/season/:seasonid
Wie viele Staffeln eine Serie hat, könnte man anhand der Einträge mit dem key series:serienid:season:* auslesen.


##### JSON watched Serie
Eine angeschaute Serie wird wie folgt eingetragen:
{
    "seriesid": "6",
    "season": "2",
    "episode": "4"
  }
Der Pfad zu einer angeschauten Serie: http://localhost:port/user/:userid/watched/:watchedid

##### JSON User
Ein User enthält folgende Informationen:
(noch nicht vollständig)
{
	"name": "username"
}
