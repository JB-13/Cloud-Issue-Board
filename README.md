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
Für die lokale Version benötigst du Docker Desktop.
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

### 2. Backend

1. Navigiere zum Backend-Verzeichnis in deiner Entwicklungsumgebung:
    ```bash
    cd IssueBoardBackend
    ```
3. Stelle sicher, dass du das Projekt mit Maven eingerichtet hast, du kannst dafür die pom.xml nutzen.
4. Anschließend den Befehl in die Konsole eingeben:
   ```bash
    mvn clean package -DskipTests
    ```

6. Stelle sicher, dass die Umgebungsvariablen für deine Google Cloud SQL-Verbindung korrekt konfiguriert sind, einschließlich des `GOOGLE_APPLICATION_CREDENTIALS` Pfades zum Service Account-Schlüssel.

7. Deploye das Backend zu Google Cloud Run.

### 3. Frontend

1. Navigiere zum Frontend-Verzeichnis:
    ```bash
    cd frontend
    ```
2. Installiere die Abhängigkeiten:
    ```bash
    npm install
    ```
3. Starte das Frontend lokal:
    ```bash
    npm start
    ```

4. Deploye das Frontend zu Google Cloud Run.

## Konfiguration

1. **Backend-Konfiguration**: Die Verbindung zur Cloud SQL-Datenbank erfolgt über Umgebungsvariablen. Stelle sicher, dass du den Service Account-Schlüssel in der Umgebungsvariable `GOOGLE_APPLICATION_CREDENTIALS` angibst.
   
2. **Frontend-Konfiguration**: Stelle sicher, dass die API-URL des Backends in den Frontend-Einstellungen konfiguriert ist.

## Sicherheit

- Authentifizierung und Autorisierung sind durch **JWT-Token** für den Login und die Verwaltung der Benutzerrollen implementiert.
- Der Zugriff auf die Datenbank ist nur über die Cloud SQL-Verbindung möglich, um eine sichere Kommunikation zu gewährleisten.

## Weitere Hinweise

- Um den Dienst in einer Produktionsumgebung zu betreiben, stelle sicher, dass alle Umgebungsvariablen korrekt gesetzt sind und die Dienste in Google Cloud richtig konfiguriert sind (z. B. Cloud Run, Cloud SQL, VPC).
- Alle sensiblen Daten (wie Service Account-Schlüssel) sollten sicher gespeichert und niemals im Repository eingecheckt werden.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Details findest du in der [LICENSE](LICENSE)-Datei.
