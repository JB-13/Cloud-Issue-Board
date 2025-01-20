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
Wechsle bitte auf den "main" branch für die Installationsanleitung der Cloud Version.

## Installation Lokale-Version

Klone als erstes das Repository und gehe auf den local branch:

```bash
    git clone https://github.com/JB-13/Cloud-Issue-Board.git
```

Führe anschließend den mvn Befehl aus (sorge dafür, dass das Projekt als Maven Projekt erkannt wird, nutze dafür die pom.xml):

```bash
    mvn clean install -DskipTests
```

Führe den docker Befehl aus (achte darauf, dass Docker Desktop gestartet ist):

```bash
    docker compose up --build -d
```

Gehe auf die Internetadresse: localhost:8080/cib.html
