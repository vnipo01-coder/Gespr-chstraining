# LOGOS ATELIER · Version 0.2 — Sprachlexikon und Rhetorik-Coaching

**Stand: 25. November 2026 · direkt in `main` integriert.** Das Projekt befindet sich in einer frühen, fortlaufend erweiterten Entwicklungsphase. Die Veröffentlichung auf GitHub Pages hängt von der Aktivierung von GitHub Actions/Pages im Repository ab; die öffentliche Auslieferung wurde nicht als abgeschlossen bestätigt.

## Ausbau dieser Entwicklungsstufe

**139 Lexikoneinträge:** 18 vorhandene plus **121 neue**: 62 deutsche Kompositionsanalysen, 30 Ableitungen mit Suffix, 12 Präfixanalysen und 17 fachwissenschaftliche Begriffe zu Phonetik, Phonologie und Wortbildung. Alle neuen Beispiele enthalten eine Wortzerlegung, eine Erklärung der fachlichen Regeln und eine Anwendung für die sprachliche Praxis. Die Wortbildungssystematik ist mit konkreten Originalbeiträgen des **Leibniz-Instituts für Deutsche Sprache (grammis)** verknüpft. **Wichtig: Eine synchrone Morphemzerlegung ist nicht automatisch eine historisch nachgewiesene Etymologie.** Die einzelnen Anwendungsbeispiele sind neu verfasst und keine wörtlich übernommenen oder einzeln historisch belegten IDS-Beispiele.

**16 ausführliche Vorlesetexte:** Acht neue mehrabsätzige Sprecheinheiten ergänzen das vorhandene Rhetorikstudio. Themen: Argumente prüfen, freundlicher Widerspruch, komplexe Sachverhalte erklären, schwierige Gespräche strukturieren, Präsentationsanfang, kritische Rückfragen, Fachfallpräsentationen und kompaktes Storytelling. Die Texte sind nach Grundlage, Aufbau, Vertiefung und Transfer filterbar. Sie sind **Übungsvorschläge, keine standardisierten klinischen Programme**.

**Lokale Audio-Reflexion:** Neue freiwillige Mikrofonsitzung mit live visualisiertem Pegelverlauf und grober Schätzung längerer leiser Phasen. Die Implementierung verwendet **getUserMedia + Web Audio AnalyserNode**, nicht MediaRecorder: Das Signal wird im Browser verarbeitet, nicht aufgezeichnet, hochgeladen oder als Rohdaten dauerhaft gespeichert. Alle Tracks werden beim Stoppen und beim Navigieren aus dem Rhetorikstudio beendet. Nach der Zustimmung ist etwa **eine Sekunde Ruhe** zur Umgebungspegel-Kalibrierung sinnvoll.

**Aussagegrenzen:** Eine Pegelmessung kann Hintergrundgeräusche, tatsächliche Sprechpausen, Klarheit, Selbstbewusstsein oder rhetorische Qualität **nicht zuverlässig unterscheiden oder bewerten**. Gemessene Zeitanteile sind heuristische Hinweise, keine validierten Redequalitätswerte. Die bisherige **optionale Browser-Spracherkennung** bleibt unabhängig davon; diese kann je nach Browser einen externen Dienst nutzen. Für rein lokale Pegelanalyse ist eine Spracherkennung nicht nötig.

**Inhaltlich dokumentierte Quellen:**
- [IDS grammis: Komposition](https://grammis.ids-mannheim.de/systematische-grammatik/585)
- [IDS grammis: Derivation](https://grammis.ids-mannheim.de/systematische-grammatik/631)
- [IDS grammis: Fugenelement](https://grammis.ids-mannheim.de/systematische-grammatik/551)
- [IDS grammis: Morphem](https://grammis.ids-mannheim.de/terminologie/482)
- [IDS grammis: Phonem](https://grammis.ids-mannheim.de/terminologie/908)
- [IDS grammis: Intonation](https://grammis.ids-mannheim.de/systematische-grammatik/2336)
- [MDN: Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN: SpeechRecognition und externe Spracherkennungsdienste](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)

## Architektur und Tests

Neue Dateien: `lexicon-v2.js` (lexikalischer Korpus), `rhetoric-v2.js` (Vorlesetexte), `audio-coach.js` (lokale Analyse), `tests/audio-coach.cjs` (Mikrofon-Lebenszyklus). Aktualisiert: `app.js`, `index.html`, `styles.css`, `tests/smoke.cjs`, `.github/workflows/checks.yml`.

Die isolierte Integrationsprüfung bestätigte: **acht Ansichten**, **139 eindeutige Lexikoneinträge**, **16 Sprechübungen**, **20 hinterlegte Quellen**, korrekte Modulladereihenfolge und konsistente Quellenverweise. Die simulierte Audio-Prüfung bestätigte den freiwilligen Start, Echtzeitpegel, Pausenschätzung sowie vollständiges Stoppen der Mikrofonspuren, der AudioContext-Instanz und der Animationsschleife. Die GitHub-Actions-Checks und eine visuelle End-to-End-Prüfung auf realen Browsern und Geräten müssen gesondert bestätigt werden.

---

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

