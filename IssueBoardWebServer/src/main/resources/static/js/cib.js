// Das Modal
let modal = document.getElementById("modal");

// Knopf zum Öffnen vom Modal
let modalOefnenKnopf = document.getElementById("anmeldenKnopf");

// x Knopf zum Schließen
let span = document.getElementById("modalSchliessen");

// Modal öffnen
modalOefnenKnopf.onclick = function() {
	modal.style.display = "flex";
}

// Wenn x (span) gedrückt wird das Fenster schließen
span.onclick = function() {
	modal.style.display = "none";
}

//Wenn außerhalb des Fensters gedrückt wird,das Fenster schließen
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

window.onload = function() {

	// Event-Listener für den Anmelde-Button
	document.getElementById("benutzerAnmeldeButton")
		.addEventListener("click", benutzerAnmelden);
	document.getElementById("benutzerRegistrierungsButton")
		.addEventListener("click", benutzerRegistrieren);
	document.getElementById("anmeldeTab")
		.addEventListener('click', function() { switchTab('anmelden'); });
	document.getElementById("registrierungsTab")
		.addEventListener('click', function() { switchTab('registrieren'); });
		
	// Event-Listener für Enter-Taste in Eingabefeldern
	document.querySelectorAll('input').forEach(eingabefeld => {
		eingabefeld.addEventListener('keypress', function(ereignis) {
			if (ereignis.key === 'Enter') {
				benutzerAnmelden();
			}
		});
	});
	initializeIssueBoard() 
};

// Globale Variablen für die Benutzersitzung
let aktiveBenutzerID = null;
let aktiverBenutzerbenutzername = null;
let  aktiverZugriffsToken = null;


// Initzialisere IssueBoard
function initializeIssueBoard() {
	
 issues = document.querySelectorAll('.issue');
 dropzones = document.querySelectorAll('.dropzone');
 addspalteButton = document.querySelector('.add-spalte');
 board = document.querySelector('.board');

//Dragging für jedes Issue
issues.forEach(issue => {
	issue.addEventListener('dragstart', () => {
		issue.classList.add('dragging');
	});

	issue.addEventListener('dragend', () => {
		issue.classList.remove('dragging');
	});
});

//Drop Plätze für die Issues mit Highlighting
dropzones.forEach(dropzone => {
	dropzone.addEventListener('dragover', (e) => {
		e.preventDefault();
		dropzone.classList.add('dragover');
	});

	dropzone.addEventListener('dragleave', () => {
		dropzone.classList.remove('dragover');
	});

	dropzone.addEventListener('drop', (e) => {
		e.preventDefault();
		const dragging = document.querySelector('.dragging');
		dropzone.appendChild(dragging);
		dropzone.classList.remove('dragover');
	});
});

//Listener für den Add Spalte Button
addspalteButton.addEventListener('click', () => {
	const spalte = document.createElement('div');
	spalte.classList.add('spalte');

	const header = document.createElement('div');
	header.classList.add('spalte-header');
	header.textContent = 'New spalte';
	header.setAttribute('contenteditable', 'true');

	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-spalte');
	deleteButton.textContent = '\u00D7';

	deleteButton.addEventListener('click', () => {
		spalte.remove();
	});

	const dropzone = document.createElement('div');
	dropzone.classList.add('dropzone');

	dropzone.addEventListener('dragover', (e) => {
		e.preventDefault();
		dropzone.classList.add('dragover');
	});

	dropzone.addEventListener('dragleave', () => {
		dropzone.classList.remove('dragover');
	});

	dropzone.addEventListener('drop', (e) => {
		e.preventDefault();
		const dragging = document.querySelector('.dragging');
		dropzone.appendChild(dragging);
		dropzone.classList.remove('dragover');
	});

	spalte.appendChild(header);
	spalte.appendChild(deleteButton);
	spalte.appendChild(dropzone);
	board.appendChild(spalte);
});

// Listener zum Löschen der Dummy Spalten
document.querySelectorAll('.delete-spalte').forEach(deleteButton => {
	deleteButton.addEventListener('click', (e) => {
		const spalte = e.target.closest('.spalte');
		spalte.remove();
	});
});

}


// ***************************************************API-Anfang****************************************************************
// Funktion zum Anmelden eines Benutzers
async function benutzerAnmelden() {
	fehlerMeldungLeeren();

	// Button-Status während der Anmeldung ändern
	const anmeldeButton = document.getElementById('benutzerAnmeldeButton');
	const originalerButtonText = anmeldeButton.textContent;
	anmeldeButton.textContent = 'Anmeldung läuft...';
	anmeldeButton.disabled = true;

	// Benutzereingaben auslesen
	let benutzername = document.getElementById('eingabebenutzername').value;
	let passwort = document.getElementById('eingabePasswort').value;

	// Eingabevalidierung. Bei fehlenden Eingaben wird eine Fehlermeldung angezeigt.
	if (!benutzername || !passwort) {
		fehlerAnzeigen("Bitte füllen Sie alle Felder aus.", "anmeldeFehler");
		buttonZuruecksetzen();
		return;
	}

	// Anmeldedaten zusammenstellen und in JSON-Format umwandeln
	let anmeldeDaten = {
		"username": benutzername,
		"password": passwort
	};

	console.log("Anmeldedaten: ", anmeldeDaten);

	try {
		// API-Anfrage an den Server
		const antwort = await fetch("http://localhost:8081/access", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				
			},
			body: JSON.stringify(anmeldeDaten)
		});


		if (!antwort.ok) {
			throw new Error("Fehler: " + antwort.status);
		}

		const ergebnis = await antwort.json();

		// Erfolgreiche Anmeldung verarbeiten
		aktiveBenutzerID = ergebnis.id;
		aktiverBenutzerbenutzername = ergebnis.username;
		document.getElementById("anmdelungsname").textContent = "Angemeldet als: " + aktiverBenutzerbenutzername;
		aktiverZugriffsToken = ergebnis.credential.accessToken;
		// Modal schließen
		modal.style.display = "none";

		eingabefelderLeeren();
		benutzeroberflaecheAktualisieren();

		// TODO: Anmeldebutton zu Abmeldebutton ändern. Später durch UI-Aktualisierung ersetzen
		modalOefnenKnopf.textContent = 'Abmelden';
		modalOefnenKnopf.removeEventListener('click', benutzerAnmelden);
		modalOefnenKnopf.addEventListener('click', abmelden);

		console.log("Ergebnis: ", ergebnis);

	} catch (fehler) {
		// Fehlerbehandlung
		if (fehler.message.includes("401")) {
			fehlerAnzeigen("benutzername oder Passwort ist falsch.", "anmeldeFehler");
			console.log("Fehler: ", fehler.message, "benutzername oder Passwort ist falsch.");
		} else {
			fehlerAnzeigen(fehler.message, "anmeldeFehler");
		}
	} finally {
		buttonZuruecksetzen();
	}

	function buttonZuruecksetzen() {
		anmeldeButton.textContent = originalerButtonText;
		anmeldeButton.disabled = false;
	}
}

async function abmelden() {
	fehlerMeldungLeeren();
	modal.style.display = "none";
	try {
		const antwort = await fetch("http://localhost:8081/access", {
			method: 'DELETE',
			headers:{
			'Accept': 'application/json',
			credentials: "include",
			'accessToken': aktiverZugriffsToken
			}

		});

		if (!antwort.ok) {
			throw new Error("Fehler: " + antwort.status);
		}

		// Globale Variablen zurücksetzen
		aktiveBenutzerID = null;
		aktiverBenutzerbenutzername = null;
		aktiverZugriffsToken = null;
		document.getElementById("anmdelungsname").textContent = "";
		eingabefelderLeeren();
		benutzeroberflaecheAktualisieren();

		// TODO: Abmeldebutton zu Anmeldebutton ändern. Später durch UI-Aktualisierung ersetzen
		modalOefnenKnopf.textContent = 'Anmelden';
		modalOefnenKnopf.removeEventListener('click', abmelden);
		modalOefnenKnopf.addEventListener('click', function() {
			modal.style.display = "flex";
		});

		console.log("Erfolgreich abgemeldet.");

	} catch (fehler) {
		console.error("Fehler:", fehler.message);
		fehlerAnzeigen(fehler.message, "anmeldeFehler");
	}
}

// Funktion zum Registrieren eines Benutzers
async function benutzerRegistrieren() {
	fehlerMeldungLeeren();

	// Button-Status während der Registrierung ändern
	const registrierenButton = document.getElementById('benutzerRegistrierungsButton');
	const originalerButtonText = registrierenButton.textContent;
	registrierenButton.textContent = 'Registrierung läuft...';
	registrierenButton.disabled = true;

	// Benutzereingaben auslesen
	let benutzername = document.getElementById('eingabeRegistrierungsbenutzername').value;
	let passwort = document.getElementById('eingabeRegistrierungsPasswort').value;

	// Eingabevalidierung. Bei fehlenden Eingaben wird eine Fehlermeldung angezeigt.
	if (!benutzername || !passwort) {
		fehlerAnzeigen("Bitte füllen Sie alle Felder aus.", "registrierungsFehler");
		buttonZuruecksetzen();
		return;
	}

	// RegistrierDaten zusammenstellen und in JSON-Format umwandeln
	let registriereDaten = {
		"username": benutzername,
		"password": passwort,
		"role": "a"
	};

	try {
		// API-Anfrage an den Server
		const antwort = await fetch("http://localhost:8081/user", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registriereDaten)
		});

		const ergebnis = await antwort.json();

		if (!antwort.ok) {
			throw new Error("Fehler: " + antwort.status + " " + ergebnis.message);
		}
		// Erfolgreiche Anmeldung verarbeiten
		aktiveBenutzerID = ergebnis.id;
		aktiverBenutzerbenutzername = ergebnis.username;
		aktiverZugriffsToken = ergebnis.credential.zugriffsToken;
		document.getElementById("anmdelungsname").textContent = "Angemeldet als:" + aktiverBenutzerbenutzername;
		modal.style.display = "none";
		eingabefelderLeeren();
		benutzeroberflaecheAktualisieren();
		alert("Erfolgreich registriert als " + ergebnis.username);

		// TODO: Anmeldebutton zu Abmeldebutton ändern. Später durch UI-Aktualisierung ersetzen
		modalOefnenKnopf.textContent = 'Abmelden';
		modalOefnenKnopf.removeEventListener('click', benutzerAnmelden);
		modalOefnenKnopf.addEventListener('click', abmelden);
		console.log(ergebnis);

	} catch (fehler) {
		// Fehlerbehandlung
		if (fehler.message.includes("403")) {
			fehlerAnzeigen("benutzername ist schon registriert.", "registrierungsFehler");
		} else {
			fehlerAnzeigen(fehler.message, "registrierungsFehler");
		}
	} finally {
		buttonZuruecksetzen();
	}

	function buttonZuruecksetzen() {
		registrierenButton.textContent = originalerButtonText;
		registrierenButton.disabled = false;
	}
}

// ***************************************************API-Ende****************************************************************

function fehlerAnzeigen(nachricht, element) {
	window.scrollTo(0, 0);
	const fehlerElement = document.getElementById(element);
	fehlerElement.textContent = nachricht;
	fehlerElement.style.opacity = '0';
	setTimeout(() => {
		fehlerElement.style.opacity = '1';
	}, 10);
}

function benutzeroberflaecheAktualisieren() {
	// TODO: Implementierung der UI-Aktualisierung nach erfolgreicher Anmeldung
}

function eingabefelderLeeren() {
	document.getElementById('eingabebenutzername').value = '';
	document.getElementById('eingabePasswort').value = '';
	document.getElementById('eingabeRegistrierungsbenutzername').value = '';
	document.getElementById('eingabeRegistrierungsPasswort').value = '';
}

function fehlerMeldungLeeren() {
	document.getElementById('anmeldeFehler').textContent = '';
	document.getElementById('registrierungsFehler').textContent = '';
}
function switchTab(tab) {
	eingabefelderLeeren();
	fehlerMeldungLeeren();
	if (tab === 'anmelden') {
		document.getElementById('benutzerAnmeldeFormular').style.display = 'flex';
		document.getElementById('benutzerRegistrierungsFormular').style.display = 'none';
		anmeldeTab.classList.add('active');
		registrierungsTab.classList.remove('active');
	} else {
		document.getElementById('benutzerAnmeldeFormular').style.display = 'none';
		document.getElementById('benutzerRegistrierungsFormular').style.display = 'flex';
		registrierungsTab.classList.add('active');
		anmeldeTab.classList.remove('active');
	}
}