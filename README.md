# LOGOS ATELIER – Sprache verstehen. Präsenz entwickeln.

Eine eigenständige, deutschsprachige, statische Web-App für sprachwissenschaftliche Neugier, systematisches Sprechtraining und optional meditative Selbstreflexion.

## Module
1. **Sprachlabor** – Laut → Morphem → Wort → Satz → Argument → Diskurs. Redaktionell geprüfte Beispielzerlegungen, Querverweise und externe Fachquellen.
2. **Rhetorikstudio** – Sieben geführte Übungen mit vollständigen deutschsprachigen Vorlesetexten, Sprechzeit, Tempo-Messung auf Basis freiwilliger Eingaben und konkreter Selbstreflexion.
3. **Präsenz-Coach** – Training von Gesprächsöffnung, Fragen, Abgrenzung, klarer Argumentation und Auftritt mit kleinen, machbaren Schritten.
4. **Meditation & Traditionen** – sanfte, anpassbare Atemvisualisierung und kontemplative Texte; sieben Chakra-Symbole mit kultureller Einordnung, nicht als medizinische Energielehre.
5. **Meine Praxis** – optionale lokale Fortschrittsnotizen, ohne Benutzerkonto.

## Wissenschaftliche Einordnung
- **Linguistik:** Institut für Deutsche Sprache, grammis (Morpheme, Wortbildung, Derivation, Komposition); DWDS als externes lexikografisches Nachschlagewerk.
- **Rhetorik & Üben:** Toastmasters International, American Psychological Association. Übungen sind eigens formulierte Praxisimpulse, keine klinische Behandlung und kein validiertes Training mit garantierten Wirkungen.
- **Achtsamkeit:** NHS und NIH/NCCIH. Meditation kann hilfreich sein, ist nicht für alle gleich angenehm und ersetzt keine medizinische Versorgung.
- **Chakras:** kulturell-religiöse Symbolsysteme aus unterschiedlichen indischen Traditionen; populäre moderne Sieben-Chakra-Darstellungen sind historisch nicht mit allen Traditionen gleichzusetzen. Eine anatomische Existenz solcher Energiezentren ist nicht wissenschaftlich belegt.

## Datenschutz und Betrieb
Reines HTML, CSS und JavaScript; keine Registrierung, kein Backend und keine Tracker. Übungsfortschritt kann im Browser-localStorage gespeichert werden. Sprachaufnahmen werden nicht automatisch gemacht oder hochgeladen. Optionale Browser-Spracherkennung wird nur nach explizitem Klick und Mikrofonberechtigung gestartet; abhängig vom Browser kann die Verarbeitung über einen externen Dienst erfolgen. Es werden keine Audio- oder Transkriptdateien auf dem Server gespeichert.

## Lokal starten
`python3 -m http.server 8000` und `http://localhost:8000` öffnen. Ein GitHub-Actions-Workflow prüft die App und deployt sie anschliessend über GitHub Pages. Dafür muss im Repository unter **Settings > Pages > Build and deployment > Source: GitHub Actions** gewählt werden. Ohne diese Einstellung ist die Seite möglicherweise noch nicht online. Für Spracherkennung wird ein unterstützter Browser und in der Regel HTTPS oder localhost benötigt.

## Lizenz
Für die eigenen Texte und den Quellcode wurde noch keine Open-Source-Lizenz festgelegt; die Entscheidung darüber liegt beim Repository-Inhaber. Extern verlinkte Inhalte behalten ihre jeweiligen Rechte. Keine Übernahme fremder Fachtexte.

**Version:** 0.1.0 (MVP)

## Demo und Qualitätsstatus

- Repository: https://github.com/vnipo01-coder/Gespr-chstraining
- Voraussichtliche GitHub-Pages-Adresse nach erfolgreicher Aktivierung: https://vnipo01-coder.github.io/Gespr-chstraining/
- Automatisierter Smoke-Test: `node tests/smoke.cjs` (Routing, Daten, Quellenschlüssel, Sicherheitsgrenzen).
- Die Sprachausgabe verwendet die Browserfunktion Speech Synthesis; die optionale Spracherkennung ist browserabhängig und kann Daten an einen externen Anbieter übermitteln. Die Website besitzt keinen eigenen Upload-Endpunkt.
- Geplante Ausbaustufen: grösserer wissenschaftlich belegter Etymologiekatalog, Audioanalysen nur nach ausdrücklicher Zustimmung, adaptiver Lernpfad und weitere Rhetorik- und Meditationstexte.

