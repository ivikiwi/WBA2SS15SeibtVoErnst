# WBA2, Team 11
## Roman Seibt, Markus Ernst, Phuong Thuy Duong Vo


### Dokumentation

#### REST-Spezifikationen (Routes)

##### Serien

| Resource                | Methode | Semantik                                                                                    | Content-Type (req) | Content-Type (res) |
|-------------------------|---------|---------------------------------------------------------------------------------------------|--------------------|--------------------|
| /series                 | post    | Fügt eine neue Serie in die Datenbank ein                                                   |           application/json         |            application/json        |
| /series/:id             | get     | Gibt die Informationen einer Serie zurück                                                   |     text/plain               |        application/json            |
| /series/:id             | put     | Aktualisiert die Informationen einer Serie                                                  |     text/plain               |        application/json            |
| /series/:id             | delete  | Löscht eine Serie aus der Datenbank                                                         |        application/json            |        application/json            |
| /series                 | get     | Gibt alle Serien mitsamt relevanten Informationen zurück                                    |        text/plain            |          application/json          |
| /series/name/:id        | get     | Gibt nur den Namen einer bestimmten Serie zurück                                            |          text/plain          |           application/json         |
| /series/description/:id | get     | Gibt nur die Beschreibung einer bestimmten Serie zurück                                     |        text/plain            |           application/json         |
| /series/:sid/season     | post    | Fügt einer bestimmten Serie mithilfe der Serienid eine Staffel hinzu                        |       application/json             |        application/json            |
| /series/:sid/season/:id | get     | Gibt die Informationen einer bestimmten Staffel mithilfe der Serienid und der Staffelid aus |       text/plain             |             application/json       |
| /series/:sid/season/:id | put     | Aktualisiert die Informationen einer bestimmten Staffel                                     |        application/json            |        application/json            |
| /series/:sid/season/:id | delete  | Löscht eine bestimmte Staffel                                                               |         application/json           |        application/json            |
| /series/:sid/season     | get     |                                                                                             |        text/plain            |         application/json           |


##### User

| Ressource              | Methode | Semantik                                                                             | Content-Type (req) | Content-Type (res) |
|------------------------|---------|--------------------------------------------------------------------------------------|--------------------|--------------------|
| /user                  | post    | Fügt einen neuen Benutzer hinzu                                                      |                    |                    |
| /user/:id              | get     | Gibt Informationen über einen bestimmten User zurück                                 |                    |                    |
| /user/:id              | put     | Aktualisiert Informationen eines bestimmten Users                                    |                    |                    |
| /user/:id              | delete  | Löscht einen bestimmten User                                                         |                    |                    |
| /user                  | get     | Gibt alle Benutzer mitsamt relevanter Informationen aus                              |                    |                    |
| /user/:uid/watched     | post    | Fügt eine "angeschaute" Serie zum jeweiligen Benutzer hinzu                          |                    |                    |
| /user/:uid/watched/:id | get     | Gibt die Informationen einer bestimmten "angeschauten Serie" eines Benutzers zurück  |                    |                    |
| /user/:uid/watched/:id | put     | Aktualisiert die Informationen einer bestimmten "angeschauten Serie" eines Benutzers |                    |                    |
| /user/:uid/watched/:id | delete  | Löscht eine "angeschaute Serie" eines Benutzers                                      |                    |                    |
| /user/:uid/watched     | get     |                                                                                      |                    |                    |

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

