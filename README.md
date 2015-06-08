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
| /user                  | post    | Fügt einen neuen Benutzer hinzu                                                      |            text/plain        |        application/json            |
| /user/:id              | get     | Gibt Informationen über einen bestimmten User zurück                                 |       text/plain             |          application/json          |
| /user/:id              | put     | Aktualisiert Informationen eines bestimmten Users                                    |      text/plain              |      application/json              |
| /user/:id              | delete  | Löscht einen bestimmten User                                                         |          application/json          |     application/json               |
| /user                  | get     | Gibt alle Benutzer mitsamt relevanter Informationen aus                              |      text/plain              |            application/json        |
| /user/:uid/watched     | post    | Fügt eine "angeschaute" Serie zum jeweiligen Benutzer hinzu                          |        application/json            |         application/json           |
| /user/:uid/watched/:id | get     | Gibt die Informationen einer bestimmten "angeschauten Serie" eines Benutzers zurück  |        text/plain            |         application/json           |
| /user/:uid/watched/:id | put     | Aktualisiert die Informationen einer bestimmten "angeschauten Serie" eines Benutzers |       application/json             |      application/json              |
| /user/:uid/watched/:id | delete  | Löscht eine "angeschaute Serie" eines Benutzers                                      |       application/json             |         application/json           |
| /user/:uid/watched     | get     |                                                                                      |        text/plain            |        application/json            |

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

###Use-Cases

Karl-Heinz schaut in seiner Freizeit neben dem Job gerne die ein oder andere Serie. Da sich Karl-Heinz mit vielen verschiedenen Arbeitskollegen über verschiedene Serien austauscht, schaut er häufig mehrere Serien an einem Tag. Einige seiner Arbeitskollegen lachen manchmal über ihn, weil er dabei häufig durcheinander kommt, und teilweise sogar die spannenden Staffelfinale verpasst, nur weil er dachte er hätte sie schon gesehen.

Karl-Heinz benutzt den von uns angebotenen Service und legt die Serie Game of Thrones an, hier markiert er sich die folgen die er schon gesehen hat. Seit dem kommt er nicht mehr durcheinander. (({{NICHT VOLLSTÄNDIG}}))

Fritz benutzt seit einigen Wochen unseren Service, er steht total auf die Serie „Better Call Saul“, auf dubiosen Wegen besorgt er sich die neue Staffel bereits vor dem offiziellen Release. Ihm fällt auf das die neue Staffel im Programm selbst noch nicht gelistet ist und hat Angst durcheinander zu kommen. Dann entdeckt er, dass er sogar selber neue Staffeln posten kann.

