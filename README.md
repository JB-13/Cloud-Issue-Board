# Cloud Issue Board

Ein Cloud-basiertes **Issue Board**, welches Benutzern ermöglicht, sich zu registrieren, anzumelden und Issues zu erstellen, zu bearbeiten und anzusehen. Administratoren haben die zusätzlichen Berechtigungen, Benutzer zu verwalten. Das Projekt besteht aus mehreren Komponenten, die auf Google Cloud gehostet werden, einschließlich einer **Cloud SQL-Datenbank**, einem **Backend-Server** und einem **Frontend-Server**.

## Komponenten

- **Datenbank**: Eine Cloud SQL-Datenbank auf Google Cloud, die alle Nutzerdaten und Issues speichert.
- **Backend**: Ein Server, der in der Cloud ausgeführt wird (Google Cloud Run), der die API bereitstellt und mit der Datenbank kommuniziert.
- **Frontend**: Ein Web-Frontend, das die Benutzeroberfläche für die Interaktion mit dem Issue Board bereitstellt. Es ermöglicht den Benutzern, Issues anzusehen, zu bearbeiten und zu erstellen, sowie Benutzerdaten zu verwalten.

## Funktionen

- **Benutzerregistrierung und Anmeldung**: Benutzer können sich registrieren, um ein Konto zu erstellen, und sich dann anmelden, um das Issue Board zu verwenden.

  <div align="center">
    <img src="https://github.com/user-attachments/assets/0ec00cc9-ac2f-4709-8502-0070c317dba8" alt="Image" width="400">
</div>

#

- **Issues anzeigen, erstellen und bearbeiten**: Benutzer können bestehende Issues ansehen und bearbeiten oder ein neues Issue erstellen.

![Image](https://github.com/user-attachments/assets/837c2d4b-fda2-406e-a656-d37c6820ef31)

<br>
<div align="center">
    <img src="https://github.com/user-attachments/assets/7ae19095-0ad1-42b7-bfcd-56e32ac660f5" alt="Image" width="600">
</div>

<br>

<div align="center">
    <img src="https://github.com/user-attachments/assets/c3ab55ab-cb22-475f-8a80-3676120af22c" alt="Image" width="600">
</div>

#

- **Admin-Funktionen**: Administratoren können in der Admin-Sicht Nutzer verwalten, indem sie ihre Rollen ändern (Zuschauer, Mitarbeiter, Admin).

<div align="center">
    <img src="https://github.com/user-attachments/assets/9cc0617f-f3e3-4fd1-a3ea-47a191ffbc31" alt="Image" width="400">
</div>

#

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

## Sicherheit

- Authentifizierung und Autorisierung sind durch **JWT-Token** für den Login und die Verwaltung der Benutzerrollen implementiert.
