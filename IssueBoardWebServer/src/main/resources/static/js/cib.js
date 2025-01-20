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
	initializeEditIssueForm();
	initializeIssueBoard();
	initializeCreateIssueForm();
	initializeAdminView();


};

// Globale Variablen für die Benutzersitzung
let aktiveBenutzerID = null;
let aktiverBenutzerbenutzername = null;
let aktiverZugriffsToken = null;


let vorhandeneIssues = new Set();

//Globale Variablen für das letzte angeklickte Issue
let letzteIssueId = null;


// Initzialisere IssueBoard
function initializeIssueBoard() {

	issues = document.querySelectorAll('.issue');
	dropzones = document.querySelectorAll('.dropzone');
	addspalteButton = document.querySelector('.add-spalte');
	createIssueButton = document.querySelector('.create-issue-button');
	board = document.querySelector('.board');
	akutalisiereIssuesButton = document.getElementById('aktualisereIssues');
	adminViewButton = document.getElementById('adminViewButton');


	adminViewButton.addEventListener('click', (e) => {
		board.style.display = "none";
		document.getElementById('issue-form').style.display = "none";
		createIssueButton.style.display = "none";
		akutalisiereIssuesButton.style.display = "none";
		document.getElementById("adminView").style.display = "block";
		issueForm.style.display = "none"
		document.getElementById("edit-issue-container").style.display = "none";


		ladeVerfuegbareBenutzer();


	});

	akutalisiereIssuesButton.addEventListener('click', (e) => {
		ladeVerfuegbareIssues();
		ladeVerfuegbareEnwtickler();


	});


	createIssueButton.addEventListener('click', (e) => {
		board.style.display = "none";
		document.getElementById('issue-form').style.display = "block";
		createIssueButton.style.display = "none";
		akutalisiereIssuesButton.style.display = "none";
		document.getElementById("adminView").style.display = "none";;
		ladeVerfuegbareEnwtickler();


	});

}

//initialisiere Create Issue Form
function initializeCreateIssueForm() {
	issueForm = document.getElementById('issue-form');
	titel = document.getElementById('issue-title');
	decription = document.getElementById('issue-description');
	assignee = document.getElementById('issue-assignee');
	confirm = document.getElementById('confirm-issue');
	cancel = document.getElementById('cancel-issue');

	//Listener für bestätigen
	confirm.addEventListener('click', (e) => {
		issueErstellen();
		document.getElementById('boardId').style.display = "flex";
		issueForm.style.display = "none";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		document.getElementById("edit-issue-container").style.display = "none";
		titel.value = '';
		decription.value = '';
		assignee.value = '';
		setTimeout(ladeVerfuegbareIssues, 200);


	});
	//Listener für Abbrechen
	cancel.addEventListener('click', (e) => {
		document.getElementById('boardId').style.display = "flex";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		document.getElementById("edit-issue-container").style.display = "none";
		issueForm.style.display = "none";
	});



}
//initialisiere Admin View
function initializeAdminView() {
	let adminView = document.getElementById("adminView");
	userDropdown = document.getElementById("userDropdown");
	confirmAdmin = document.getElementById("confirmButton");
	cancelAdmin = document.getElementById("cancelButton");


	//Listener für bestätigen
	confirmAdmin.addEventListener('click', (e) => {
		document.getElementById('boardId').style.display = "flex";
		document.getElementById('issue-form').style.display = "none";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		document.getElementById("edit-issue-container").style.display = "none";
		adminView.style.display = "none";
		updateUser();
		userDropdown.value = '';
		setTimeout(ladeVerfuegbareIssues, 200);
		setTimeout(ladeVerfuegbareEnwtickler, 200);



	});
	//Listener für Abbrechen
	cancelAdmin.addEventListener('click', (e) => {
		document.getElementById('boardId').style.display = "flex";
		document.getElementById('issue-form').style.display = "none";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		document.getElementById("edit-issue-container").style.display = "none";
		adminView.style.display = "none";
	});


}

//initialisiere Edit Issue
function initializeEditIssueForm() {
	editIssueContainer = document.getElementById("edit-issue-container");
	titelEdit = document.getElementById("edit-title");
	descriptionEdit = document.getElementById("edit-description");
	assigneeEdit = document.getElementById("edit-edit-assignee");
	statusEdit = document.getElementById("edit-column");
	confirmEditButton = document.getElementById("save-issue");
	cancelEditButton = document.getElementById("cancel-edit");
	deleteIssueButton = document.getElementById("delete-issue");


	//Listener für bestätigen
	confirmEditButton.addEventListener('click', (e) => {
		document.getElementById('boardId').style.display = "flex";
		document.getElementById('issue-form').style.display = "none";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		document.getElementById("adminView").style.display = "none";
		editIssueContainer.style.display = "none";
		updateIssue();
		setTimeout(ladeVerfuegbareIssues, 200);


	});
	//Listener für Abbrechen
	cancelEditButton.addEventListener('click', (e) => {
		document.getElementById('boardId').style.display = "flex";
		document.getElementById('issue-form').style.display = "none";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		document.getElementById("adminView").style.display = "none";
		editIssueContainer.style.display = "none";
		setTimeout(ladeVerfuegbareIssues, 200);
	});

	//Listener für Löschen
	deleteIssueButton.addEventListener('click', (e) => {
		document.getElementById('boardId').style.display = "flex";
		document.getElementById('issue-form').style.display = "none";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		document.getElementById("adminView").style.display = "none";
		editIssueContainer.style.display = "none";
		deleteIssue();

		setTimeout(ladeVerfuegbareIssues, 200);
	});





}


// ***************************************************API-Anfang****************************************************************
async function checkAdmin() {

	try {
		console.log('Lade Benutzer');
		const response = await fetch(`http://localhost:8081/user/${aktiveBenutzerID}`, {
			method: 'GET',
			headers: {
				'accessToken': aktiverZugriffsToken
			}
		});

		if (!response.ok) throw new Error('Fehler beim Laden des Benutzer');

		const benutzer = await response.json();
		console.log('Geladene benutzer:', benutzer);


		if (benutzer.role === "Admin") {
			document.getElementById('adminViewButton').style.display = "block";
		} else {
			document.getElementById('adminViewButton').style.display = "none";
		}

	} catch (error) {
		console.error('Fehler beim Laden der Entwickler:', error);

	}
}


// Funktion zum Anmelden eines Benutzers
async function benutzerAnmelden() {
	fehlerMeldungLeeren();

	// Button-Status während der Anmeldung ändern
	const anmeldeButton = document.getElementById('benutzerAnmeldeButton');
	const originalerButtonText = anmeldeButton.textContent;
	anmeldeButton.textContent = 'Anmeldung läuft...';
	anmeldeButton.disabled = true;
	adminViewButton = document.getElementById('adminViewButton');

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
		aktiveBenutzerID = ergebnis.userId;
		aktiverBenutzerbenutzername = ergebnis.username;
		document.getElementById("anmdelungsname").textContent = "Angemeldet als: " + aktiverBenutzerbenutzername;
		aktiverZugriffsToken = ergebnis.credential.accessToken;
		// Modal schließen
		modal.style.display = "none";

		eingabefelderLeeren();
		benutzeroberflaecheAktualisieren();

		modalOefnenKnopf.textContent = 'Abmelden';
		modalOefnenKnopf.removeEventListener('click', benutzerAnmelden);
		modalOefnenKnopf.addEventListener('click', abmelden);

		console.log("Ergebnis: ", ergebnis);
		document.getElementById('boardId').style.display = "flex";
		document.querySelector('.create-issue-button').style.display = "block";
		document.getElementById('aktualisereIssues').style.display = "block";
		ladeVerfuegbareIssues();
		ladeVerfuegbareEnwtickler();
		setTimeout(checkAdmin, 200);

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
			headers: {
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
		//default view
		document.getElementById('boardId').style.display = "none";
		document.querySelector('.create-issue-button').style.display = "none";
		document.getElementById('aktualisereIssues').style.display = "none";
		document.getElementById("adminView").style.display = "none";
		document.getElementById("edit-issue-container").style.display = "none";
		document.getElementById('issue-form').style.display = "none";;


		modalOefnenKnopf.textContent = 'Anmelden';
		modalOefnenKnopf.removeEventListener('click', abmelden);
		modalOefnenKnopf.addEventListener('click', function() {
			modal.style.display = "flex";
		});

		console.log("Erfolgreich abgemeldet.");
		document.getElementById('adminViewButton').style.display = "none";

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


		eingabefelderLeeren();
		benutzeroberflaecheAktualisieren();
		alert("Erfolgreich registriert als " + ergebnis.username);
		modal.style.display = "none";
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


// Funktion zum Laden verfügbarer Haltestellen für das Dropdown
async function ladeVerfuegbareIssues() {
	try {
		console.log('Lade verfügbare Issues');
		const response = await fetch('http://localhost:8081/user/issue', {
			method: 'GET',
			headers: {
				'accessToken': aktiverZugriffsToken

			}
		});

		if (!response.ok) throw new Error('Fehler beim Laden der Issues');

		const issues = await response.json();
		console.log('Geladene issues:', issues);

		// Alle Spalten referenzieren
		const spalten = {
			"open": document.getElementById('spalteOffen'),
			"inprogress": document.getElementById('spalteInBearbeitung'),
			"closed": document.getElementById('spalteGeschlossen')
		};



		issues.forEach(issue => {
			// Status normalisieren und prüfen
			if (!issue.status || typeof issue.status !== "string") {
				issue.status = "open"; // Standardwert
			}
			issue.status = issue.status.trim().toLowerCase(); // Standardisieren

			// Falls das Issue bereits existiert, aus der aktuellen Spalte entfernen
			if (vorhandeneIssues.has(issue.id)) {
				const bestehendesIssueElement = document.querySelector(`[data-issue-id="${issue.id}"]`);
				if (bestehendesIssueElement) {
					bestehendesIssueElement.remove(); // Entferne altes DOM-Element
				}
			} else {
				vorhandeneIssues.add(issue.id); // Neue Issue-ID hinzufügen
			}

			// Neues Issue-Element erstellen
			const issueElement = document.createElement('div');
			issueElement.className = 'issue'; // Klasse für Styling
			issueElement.setAttribute('data-issue-id', issue.id); // Issue-ID im DOM-Attribut speichern
			issueElement.innerHTML = `
        <h4 class="issue-title">${issue.titel}</h4>
        <p>${issue.description}</p>
    `;

			// Issue in die richtige Spalte einfügen
			const zielSpalte = spalten[issue.status] || spalten["open"]; // Standard-Spalte
			zielSpalte.appendChild(issueElement);

			// Event-Listener für das Bearbeitungsfenster hinzufügen
			issueElement.onclick = () => {
				// Ins Bearbeitungsfenster navigieren
				document.getElementById("edit-issue-container").style.display = "block";
				document.getElementById('boardId').style.display = "none";
				document.getElementById('issue-form').style.display = "none";
				document.querySelector('.create-issue-button').style.display = "none";
				document.getElementById('aktualisereIssues').style.display = "none";
				document.getElementById("adminView").style.display = "none";
				letzteIssueId = issue.id;

				// Setzen der Elemente
				titelEdit = document.getElementById("edit-title").value = issue.titel;
				descriptionEdit = document.getElementById("edit-description").value = issue.description;
				assigneeEdit = document.getElementById("edit-assignee");
				statusEdit = document.getElementById("edit-column");

				if (assigneeEdit) {
					const assignedTo = issue.assignedTo || ""; // Standardwert, falls null
					assigneeEdit.value = assignedTo;
				}
				const statusEditValue = issue.status || "open"; // Standardwert
				statusEdit.value = statusEditValue;
			};
		});


	} catch (error) {
		console.error('Fehler beim Aktualisieren:', error);
	}
}

//Issue laden für edit Issue
async function updateIssue() {

	titelEdit = document.getElementById("edit-title").value
	descriptionEdit = document.getElementById("edit-description").value
	assigneeEdit = document.getElementById("edit-assignee").value;
	statusEdit = document.getElementById("edit-column").value;



	// Eingabevalidierung. Bei fehlenden Eingaben wird eine Fehlermeldung angezeigt.
	if (!titel) {
		alert("Titel notwendig")
		return;
	}

	let neueIssueDaten = {
		"titel": titelEdit,
		"description": descriptionEdit,
		"status": statusEdit,
		"assignedTo": assigneeEdit
	};

	try {
		console.log('Update das Issue');
		const response = await fetch(`http://localhost:8081/user/${aktiveBenutzerID}/issue/${letzteIssueId}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'accessToken': aktiverZugriffsToken
			},
			body: JSON.stringify(neueIssueDaten)


		});

		if (!response.ok) throw new Error('Fehler beim Laden des Issue');

		const issue = await response.json();
		console.log('geupdatetes Issue:', issue);


	} catch (error) {
		console.error('Fehler beim Updaten der Issues:', error);

	}

}



// Funktion zum Laden verfügbarer Entwickler für das Dropdown in Issues Erstellen/Issue Bearbeiten

async function ladeVerfuegbareEnwtickler() {
	try {
		console.log('Lade verfügbare Enwtickler');
		const response = await fetch('http://localhost:8081/user', {
			method: 'GET',
			headers: {
				'accessToken': aktiverZugriffsToken
			}
		});

		if (!response.ok) throw new Error('Fehler beim Laden der Entwickler');

		const entwickler = await response.json();
		console.log('Geladene Entwickler:', entwickler);

		const gefilterteEntwickler = entwickler.filter(e => e.role === 'Mitarbeiter' || e.role === 'Admin');
		// Dropdown befüllen
		const select = document.getElementById('issue-assignee');
		select.innerHTML = gefilterteEntwickler.map(e => `
                <option value="${e.userId}">${e.username}</option>
            `).join('');

		editSelect = document.getElementById('edit-assignee');
		editSelect.innerHTML = gefilterteEntwickler.map(e => `
                <option value="${e.userId}">${e.username}</option>
            `).join('');


	} catch (error) {
		console.error('Fehler beim Laden der Entwickler:', error);

	}
}


async function ladeVerfuegbareBenutzer() {
	try {
		console.log('Lade verfügbare Benutzer');
		const response = await fetch('http://localhost:8081/user', {
			method: 'GET',
			headers: {
				'accessToken': aktiverZugriffsToken
			}
		});

		if (!response.ok) throw new Error('Fehler beim Laden der Benutzer');

		const benutzer = await response.json();
		console.log('Geladene Benutzer:', benutzer);


		const gefilterteBenutzer = benutzer.filter(e => e.role != "Admin");
		// Dropdown befüllen
		const select = document.getElementById('userDropdown');
		select.innerHTML = gefilterteBenutzer.map(e => `
                <option value="${e.userId}">${e.username}</option>
            `).join('');


	} catch (error) {
		console.error('Fehler beim Laden der Benutzer:', error);

	}
}



async function issueErstellen() {

	// Benutzereingaben auslesen
	titel = document.getElementById('issue-title').value;
	decription = document.getElementById('issue-description').value;
	assignee = document.getElementById('issue-assignee').value;
	confirm = document.getElementById('confirm-issue');


	// Eingabevalidierung. Bei fehlenden Eingaben wird eine Fehlermeldung angezeigt.
	if (!titel) {
		alert("Titel notwendig")
		return;
	}

	let neueIssueDaten = {
		"titel": titel,
		"description": decription,
		"status": "open",
		"createdAt": "",
		"updatedAt": "",
		"createdBy": aktiveBenutzerID,
		"assignedTo": assignee
	};

	try {
		const response = await fetch(
			`http://localhost:8081/user/${aktiveBenutzerID}/issue`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'accessToken': aktiverZugriffsToken
				},
				body: JSON.stringify(neueIssueDaten)
			}
		);

		if (response.ok) {
			const responseData = await response.json();
			console.log('Issue erfolgreich erstellt:', responseData);
		} else {
			console.error('Fehler beim Erstellen des Issues:', response.status, await response.text());
		}

	} catch (error) {
		console.error('Fehler bei Erstellung des Issues', error);

	}
}


async function updateUser() {

	// Admin auslesen
	benutzer = document.getElementById('userDropdown').value;
	role = document.getElementById('permissionDropdown').value;


	// RegistrierDaten zusammenstellen und in JSON-Format umwandeln
	let updateDaten = {
		"id": benutzer,
		"role": role
	};

	try {
		// API-Anfrage an den Server
		const response = await fetch(`http://localhost:8081/user/${aktiveBenutzerID}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'accessToken': aktiverZugriffsToken
			},
			body: JSON.stringify(updateDaten)
		});

		if (!response.ok) throw new Error('Fehler beim Updaten des Benutzers:');

		const responseData = await response.json();
		console.log('geupdateter Benutzer:', responseData);

	} catch (error) {
		console.error('Fehler beim Updaten des Benutzers:', error);

	}

}


async function deleteIssue() {

	try {
		const antwort = await fetch(`http://localhost:8081/user/${aktiveBenutzerID}/issue/${letzteIssueId}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				credentials: "include",
				'accessToken': aktiverZugriffsToken
			}

		});

		if (!antwort.ok) {
			throw new Error("Fehler: " + antwort.status);
		}

		const issueElement = document.querySelector(`[data-issue-id="${letzteIssueId}"]`);
		if (issueElement) {
			issueElement.remove();
			console.log(`Issue mit ID ${letzteIssueId} aus dem Frontend entfernt.`);
		}

	} catch (fehler) {
		console.error("Fehler:", fehler.message);
		fehlerAnzeigen(fehler.message, "anmeldeFehler");
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