# Cloud Issue Board

Ein Cloud-basiertes **Issue Board**, welches Benutzern ermöglicht, sich zu registrieren, anzumelden und Issues zu erstellen, zu bearbeiten und anzusehen. Administratoren haben die zusätzlichen Berechtigungen, Benutzer zu verwalten. Das Projekt besteht aus mehreren Komponenten, die auf Google Cloud gehostet werden, einschließlich einer **Cloud SQL-Datenbank**, einem **Backend-Server** und einem **Frontend-Server**.

## Komponenten

- **Datenbank**: Eine Cloud SQL-Datenbank auf Google Cloud, die alle Nutzerdaten und Issues speichert.
- **Backend**: Ein Server, der in der Cloud ausgeführt wird (Google Cloud Run), der die API bereitstellt und mit der Datenbank kommuniziert.
- **Frontend**: Ein Web-Frontend, das die Benutzeroberfläche für die Interaktion mit dem Issue Board bereitstellt. Es ermöglicht den Benutzern, Issues anzusehen, zu bearbeiten und zu erstellen, sowie Benutzerdaten zu verwalten.

## Funktionen

- **Benutzerregistrierung und Anmeldung**: Benutzer können sich registrieren, um ein Konto zu erstellen, und sich dann anmelden, um das Issue Board zu verwenden.
- **Issues anzeigen und bearbeiten**: Benutzer können bestehende Issues ansehen und bearbeiten.
- **Admin-Funktionen**: Administratoren können in der Admin-Sicht Nutzer verwalten, indem sie ihre Rollen ändern (Zuschauer, Mitarbeiter, Admin).
- **Authentifizierung und Autorisierung**: Durch Login und Rollenmanagement wird die Nutzung des Boards je nach Benutzerrolle eingeschränkt.

## Cloud oder Lokal
Unsere Anwendung kann entweder lokal oder auf einer Cloud deployed werden.
Für die lokale Version benötigst du Docker Desktop, für die Cloud Version benötigst du die Google Cloud SDK.
Wechsle bitte auf den "local" branch für die Installationsanleitung der lokalen Version.

## Installation Cloud-Version
Bevor du mit der Installation beginnen kannst, musst du dir einen Google Cloud Account erstellen.
Anschließend musst du ein Projekt in der Google Cloud Console anlegen.

Klone als erstes das Repository

```bash
    git clone https://github.com/JB-13/Cloud-Issue-Board.git
```

### 1. Cloud SQL

1. Stelle sicher, dass du eine **Cloud SQL-Instanz** in Google Cloud eingerichtet hast. Gehe dafür oben links auf Navigationsmenü und klicke auf SQL.
2. Drücke auf Instanz erstellen und wähle MySQL aus, tätige nun deine bevorzugten Einstellungen und drücke auf Instanz erstellen, starte anschließend deine Instanz.
3. Gehe nun links auf den Reiter **Datenbanken**. Drücke Datenbank erstellen, mit dem Namen "issue_board"
5. Gehe nun auf den Reiter **Nutzer** und füge ein Nutzerkonto mit beliebigen Namen und Passwort hinzu.
6. Gehe nun auf die **Cloud Shell** oben rechts und führe folgende Befehle aus:
   
    ```bash
    gcloud projects list
    ```
    Kopiere die Project_ID deines Projekts
   ```bash
    gcloud config set project <Project_ID>
    ```
   Verbinde dich mit deiner Datenbank
   ```bash
    gcloud sql connect <Instanz-ID> --user=<username> --quiet
    ```
   Kopiere nun die SQL-Anweisungen aus der **User.sql** aus IssueBoardDB Ordner und füge sie in die Cloud Shell ein.
   Anschließend kann die Shell geschlossen werden.
   
### 2.Voreinstellungen

1. Gehe auf den Reiter **IAM und Verwaltung** auf **IAM** in der Google Cloud Console
2. Drücke **Zugriff gewähren** mit dem Namen backend@<Projekt_ID>.iam.gserviceaccount.com und den Rollen Cloud-SQL-Client und Zugriffsperson für Secret Manager-Secret.
3. Drücke erneut **Zugriff gewähren** mit dem Namen frontend@<Projekt_ID>.iam.gserviceaccount.com und füge keine Rollen hinzu.
4. Gehe links auf den Reiter **Sicherheit** auf **Secret Manager** und erstelle ein Secret mit dem Passwort des Nutzerkontos von der Datenbank als Secret-Wert

### 3. Backend

1. Stelle sicher, dass du das Projekt mit Maven eingerichtet hast, du kannst dafür die pom.xml nutzen.
2. Anschließend den Befehl in die Konsole deiner Entwicklungsumgebung eingeben:
   ```bash
    mvn clean install -DskipTests
    ```
3. Navigiere zum Backend-Verzeichnis:
    ```bash
    cd IssueBoardBackend
    ```
4. Konto wechseln:
   ```bash
    gcloud config set account backend@<Projekt_ID>.iam.gserviceaccount.com
    ```
5. Führe den Befehl aus:
   ```bash
    gcloud builds submit --tag gcr.io/<Projekt_ID>/backend
    ```
6. Deploye das Backend zu Google Cloud Run:
   ```bash
    gcloud run deploy backend                                        
   --image gcr.io/<Projekt_ID>/backend 
   --platform managed   
   --region <region, z.B. europe-west1>
   --allow-unauthenticated 
   --add-cloudsql-instances <cloudsql-instance> 
   --set-env-vars DB_USERNAME=<username> 
   --set-env-vars DB_PASSWORD=$(gcloud secrets versions access latest --secret=<secret-name>) 
   --set-env-vars INSTANCE_CONNECTION_NAME=<instance connection name>
   --set-env-vars DATABASE_NAME=issue_board
    ```
7. Gehe nun zu Google Cloud Console, dort solltest du unter dem Reiter **Cloud Run** deine backend Instanz sehen, klicke darauf und kopiere die URL.

### 4. Frontend

1. Gehe in deiner Entwicklungsordner auf die cib.js im Ordner */IssueBoardWebServer/src/main/resources/static/js*
2. Suche in dem Code mit STRG+F nach "const BackendURL", ersetze rechts den String mit deiner kopierten Backend-URL
3. Anschließend den Befehl in die Konsole deiner Entwicklungsumgebung eingeben:
   ```bash
    mvn clean install -DskipTests
    ```
4. Navigiere zum Frontend-Verzeichnis:
    ```bash
    ls
    cd frontend
    ```
5. Konto wechseln:
   ```bash
    gcloud config set account frontend@<Projekt_ID>.iam.gserviceaccount.com
    ```
6. Führe den Befehl aus:
   ```bash
    gcloud builds submit --tag gcr.io/<Projekt_ID>/frontend
    ```
7. Deploye das Frontend zu Google Cloud Run.
   ```bash
    gcloud run deploy frontend 
    --image gcr.io/<Projekt_ID>/frontend 
    --platform managed 
    --region <region, z.B. europe-west1> 
    --allow-unauthenticated 
    ```
8. Gehe nun zu Google Cloud Console, dort solltest du unter dem Reiter **Cloud Run** deine frontend Instanz sehen, klicke darauf und gehe auf die URL, füge der URL am ende **/cib.html** hinzu um auf die Seite zu gelangen.

## Sicherheit

- Authentifizierung und Autorisierung sind durch **JWT-Token** für den Login und die Verwaltung der Benutzerrollen implementiert.
- Der Zugriff auf die Datenbank ist nur über die Cloud SQL-Verbindung möglich, um eine sichere Kommunikation zu gewährleisten.

## Weitere Hinweise

- Um den Dienst in einer Produktionsumgebung zu betreiben, stelle sicher, dass alle Umgebungsvariablen korrekt gesetzt sind und die Dienste in Google Cloud richtig konfiguriert sind (z. B. Cloud Run, Cloud SQL).
- Alle sensiblen Daten (wie Service Account-Schlüssel) sollten sicher gespeichert und niemals im Repository eingecheckt werden.
