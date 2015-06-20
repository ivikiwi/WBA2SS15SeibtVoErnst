# WBA2, Team 11
## Projekt: Viromark
Roman Seibt, Markus Ernst, Phuong Thuy Duong Vo


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
    
    "episode": "4",
    
    "status": "watching, completed, plan-to-watch, on-hold oder dropped",
    
  }
  
Der Pfad zu einer angeschauten Serie: http://localhost:port/user/:userid/watched/:watchedid

##### JSON User
Ein User enthält folgende Informationen:

(noch nicht vollständig)

{

	"name": "username"
	
}

###Use-Cases

1. Karl-Heinz schaut in seiner Freizeit, neben dem Job, gerne die eine oder andere Serie. Da sich Karl-Heinz mit verschiedenen Arbeitskollegen über Serien austauscht, schaut er häufig mehrere Serien an einem Tag. Einige seiner Arbeitskollegen lachen manchmal über ihn, weil er dabei häufig durcheinander kommt, und teilweise sogar die spannenden Staffelfinale verpasst, nur weil er dachte, er hätte sie schon gesehen. Zudem gibt es auch Serien, von denen er gehört hat, dass sie gut seien. Diese will Karl-Heinz sich gerne anschauen, aber er hat momentan keine Zeit dazu. Nach ein paar Wochen hat er längst vergessen, wie die Serien, die er sich noch anschauen wollten, überhaupt hießen. Karl-Heinz benutzt den von uns angebotenen Service und legt die Serie Game of Thrones in seine persönliche Liste an. Hier kann er nun markieren, ob er die Serie entweder schon komplett gesehen hat, sie gerade schaut, sie noch schauen will, gerade eine Pause einlegt, oder die Serie abgebrochen hat. Karl-Heinz wählt den Status aus: "schaue ich gerade". Nun kann er auch markieren, bei welcher Folge er zuletzt war und bei welcher Staffel. Hat er die Serie vollständig beendet, kann er dies anschließend auch markieren. So hat Karl-Heinz eine anschauliche Übersicht und kann so mehrere Serien anschauen, ohne durcheinander zu kommen.

2. Fritz benutzt seit einigen Wochen unseren Service. Er steht total auf die Serie „Better Call Saul“. Auf dubiosen Wegen besorgt er sich die neue Staffel bereits vor dem offiziellen Release. Ihm fällt auf, dass die neue Staffel im Programm selbst noch nicht gelistet ist und hat Angst durcheinander zu kommen. Dann entdeckt er, dass nicht nur Nutzer mit einem Administratoren-Account eine neue Staffel posten kann. Er kann selbst Staffeln mit seinem normalen User-Account hinzufügen.

3. Anna hat alle Serien, die sie bisher angefangen hat, bereits zu Ende geschaut. Nun will sie gerne eine neue Serie anfangen, doch sie weiß nicht recht, was es alles so an Serien aktuell gibt. Auf unserem angebotenen Service kann sie nicht nur alle Serien mitsamt Beschreibung aufgelistet einsehen, sie bekommt auch eine übersichtliche Statistik, in der sie sehen kann, welche Serien in letzter Zeit am meisten geguckt und welche Serien am meisten von Usern abgebrochen wurden. Zudem können User auch eine Bewertung zu den Serien abgeben und sie können angeben, welche Serien sich ähnlich sind.
