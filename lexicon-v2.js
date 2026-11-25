/* LOGOS ATELIER 0.2 — Wortbildungs-Korpus und rhetorische Fachsprache.
 * 103 neue Beispiele: Wortbildungsanalyse ist KEINE Behauptung über historische Etymologie.
 * Fachregeln aus dem IDS; Einzelbeispiele als eigenständige, nachvollziehbare Analysen.
 */
(()=>{"use strict";
const D=window.LOGOS_DATA;if(!D?.lexicon||!D?.sources)throw Error("Lexikondaten fehlen");
Object.assign(D.sources,{
 idskomposition:{name:"IDS grammis: Komposition (ausführliche Systematische Grammatik)",url:"https://grammis.ids-mannheim.de/systematische-grammatik/585",type:"Primärquelle · Morphologie"},
 idsderivation:{name:"IDS grammis: Derivation und Konversion",url:"https://grammis.ids-mannheim.de/systematische-grammatik/631",type:"Primärquelle · Morphologie"},
 idsfuge:{name:"IDS grammis: Das Kompositionsfugenelement",url:"https://grammis.ids-mannheim.de/systematische-grammatik/551",type:"Primärquelle · Morphologie"},
 idsphonem:{name:"IDS grammis: Phonem – wissenschaftliche Terminologie",url:"https://grammis.ids-mannheim.de/terminologie/908",type:"Primärquelle · Phonologie"},
 idsintonation:{name:"IDS grammis: Intonation",url:"https://grammis.ids-mannheim.de/systematische-grammatik/2336",type:"Primärquelle · Phonetik/Prosodie"},
 idsmorphem:{name:"IDS grammis: Morphem",url:"https://grammis.ids-mannheim.de/terminologie/482",type:"Primärquelle · Morphologie"},
 idswortbildung:{name:"IDS grammis: Wortbildung",url:"https://grammis.ids-mannheim.de/terminologie/297",type:"Primärquelle · Wortbildung"}
});
const known=new Set(D.lexicon.map(x=>x.id));
const add=x=>{if(known.has(x.id))throw Error("Doppelte Lexikon-ID: "+x.id);if(!x.source.every(id=>D.sources[id]))throw Error("Unbekannte Quellen-ID "+x.word);known.add(x.id);D.lexicon.push(x)};
const slug=w=>w.toLocaleLowerCase("de-CH").replace(/[^a-zäöüß0-9]+/g,"-");
function compound(word,left,join,right,meaning,usage){
 const exact=(left+join+right).toLocaleLowerCase("de-CH")===word.toLocaleLowerCase("de-CH");
 if(!exact)throw Error("Formfehler im Kompositum: "+word+" vs "+left+join+right);
 const parts=[{t:left,d:"Bestimmungswort: grenzt die Bedeutung ein"}];
 if(join)parts.push({t:join,d:"Verbindungsbestandteil (Fuge); nicht automatisch bedeutungstragend"});
 parts.push({t:right,d:"Grundwort: bestimmt in der Regel Wortart und grammatische Eigenschaften"});
 add({id:"wb-"+slug(word),word,kind:"Komposition · synchron analysiert",area:"Wortbildung",parts,
 intro:meaning+" Das Wort gehört zu den zusammengesetzten Ausdrücken des Deutschen. Bei solchen Bildungen legt das Grundwort rechts die Kategorie und in vielen Fällen das Genus fest; der linke Teil bestimmt, worauf sich die Bezeichnung näher bezieht.",
 history:"Diese Darstellung ist eine Analyse der heutigen Wortbildungsstruktur, keine vollständige Herkunftsgeschichte. "+(join?"Der Verbindungsbestandteil «"+join+"» ist eine Kompositionsfuge; ihre Form allein beweist keine bestimmte historische Kasus- oder Pluralbedeutung. ":"Hier stehen die unmittelbaren Bestandteile ohne zusätzlich sichtbare Kompositionsfuge nebeneinander. ")+"Ein historischer Einzelnachweis würde datierte Sprachbelege und etymologische Wörterbücher erfordern.",
 use:usage+" Achte beim Sprechen darauf, ob dein Gegenüber die Zusammensetzung ohne weitere Erklärung versteht. Bei Unklarheit ersetze das komplexe Wort durch einen kurzen erläuternden Satz.",
 source:join?["idskomposition","idsfuge"]:["idskomposition"]});
}
const compounds=[
["Gesprächsführung","Gespräch","s","Führung","Gesprächsführung bezeichnet die bewusste Strukturierung eines Austauschs.","«Ich eröffne das Gespräch, stelle eine Frage und fasse den nächsten Schritt zusammen.»"],
["Gesprächsstruktur","Gespräch","s","Struktur","Gesprächsstruktur meint die erkennbare Ordnung einzelner Redephasen.","«Zuerst klären wir das Anliegen; danach sammeln wir mögliche Lösungen.»"],
["Gesprächspartner","Gespräch","s","Partner","Ein Gesprächspartner ist eine beteiligte Person im wechselseitigen Austausch.","«Ich gebe meinem Gesprächspartner Raum zum Antworten.»"],
["Gesprächssituation","Gespräch","s","Situation","Die Gesprächssituation umfasst Anlass, Beteiligte und soziale Bedingungen einer Äusserung.","«In dieser Gesprächssituation kläre ich zuerst die Zuständigkeit.»"],
["Selbstwirksamkeit","Selbst","","Wirksamkeit","Selbstwirksamkeit wird psychologisch für die Erwartung verwendet, durch eigenes Handeln bestimmte Anforderungen bewältigen zu können.","«Ich kann einen kleinen Handlungsschritt selbst beginnen.»"],
["Selbstreflexion","Selbst","","Reflexion","Selbstreflexion bezeichnet die bewusste Prüfung der eigenen Perspektiven und Verhaltensweisen.","«Ich prüfe, welche Annahme meine Reaktion bestimmt hat.»"],
["Selbstbild","Selbst","","Bild","Selbstbild ist eine zusammenfassende Bezeichnung für Vorstellungen über die eigene Person.","«Mein Selbstbild darf sich durch neue Erfahrungen verändern.»"],
["Selbstachtung","Selbst","","Achtung","Selbstachtung verweist auf einen respektvollen Umgang mit dem eigenen Wert.","«Ein Fehler beschreibt eine Handlung, nicht meinen gesamten Wert.»"],
["Selbstgespräch","Selbst","","Gespräch","Ein Selbstgespräch ist sprachliches oder inneres Sprechen mit sich selbst.","«Ich formuliere eine hilfreiche nächste Handlung.»"],
["Selbstregulation","Selbst","","Regulation","Selbstregulation fasst die Steuerung eigener Handlungen und Reaktionen zusammen.","«Ich unterbreche kurz und entscheide danach, wie ich antworten möchte.»"],
["Selbstsicherheit","Selbst","","Sicherheit","Selbstsicherheit bezeichnet Zuversicht und Stabilität im eigenen Auftreten.","«Ich kann meine Unsicherheit benennen und trotzdem sachlich sprechen.»"],
["Selbstkontrolle","Selbst","","Kontrolle","Selbstkontrolle bezeichnet die Regulation von Handlungsimpulsen unter bestimmten Anforderungen.","«Ich höre erst zu und antworte dann.»"],
["Eigenverantwortung","Eigen","","Verantwortung","Eigenverantwortung bezeichnet die Zuständigkeit für einen eigenen Entscheidungs- oder Handlungsbereich.","«Ich übernehme den Teil, den ich beeinflussen kann.»"],
["Fremdwahrnehmung","Fremd","","Wahrnehmung","Fremdwahrnehmung bezeichnet die Sichtweisen anderer auf eine Person oder Situation.","«Ich weiss nicht automatisch, wie ich auf andere wirke.»"],
["Wahrnehmungsfehler","Wahrnehmung","s","Fehler","Wahrnehmungsfehler benennt eine mögliche Abweichung zwischen Eindruck und überprüfbarer Beobachtung.","«Ich trenne meinen Eindruck von den vorhandenen Fakten.»"],
["Informationsverarbeitung","Information","s","Verarbeitung","Informationsverarbeitung bezeichnet die Aufnahme und Bearbeitung von Informationen.","«Ich bearbeite zuerst die wichtigste Information.»"],
["Sprachkompetenz","Sprach","","Kompetenz","Sprachkompetenz verweist auf sprachbezogene Fähigkeiten in einem bestimmten Kontext.","«Ich übe, das Anliegen verständlich zu erklären.»"],
["Sprachgefühl","Sprach","","Gefühl","Sprachgefühl meint die intuitive Vertrautheit mit sprachlichen Mustern.","«Ich prüfe mein Sprachgefühl bei Unsicherheit an einer Quelle.»"],
["Sprachbewusstsein","Sprach","","Bewusstsein","Sprachbewusstsein bezeichnet die reflektierte Aufmerksamkeit für sprachliche Formen und Wirkungen.","«Ich wähle meine Formulierung bewusst.»"],
["Wortwahl","Wort","","Wahl","Wortwahl bezeichnet die Auswahl sprachlicher Ausdrücke für eine Äusserung.","«Ich sage konkret, was ich beobachtet habe.»"],
["Wortbildung","Wort","","Bildung","Wortbildung ist die Bildung komplexer Wörter aus sprachlichem Material.","«Ich erkenne den Stamm und das Ableitungsmuster.»"],
["Wortbedeutung","Wort","","Bedeutung","Wortbedeutung bezeichnet die konventionelle semantische Funktion eines Ausdrucks.","«Ich kläre zuerst, was wir unter diesem Begriff verstehen.»"],
["Wortgeschichte","Wort","","Geschichte","Wortgeschichte betrachtet Veränderungen von Form und Bedeutung über die Zeit.","«Ich trenne die heutige Bedeutung von der historischen.»"],
["Wortfamilie","Wort","","Familie","Eine Wortfamilie umfasst nach gemeinsamen Wurzeln oder Stämmen verwandte Wörter.","«Die Wortfamilie kann helfen, Bedeutungsbezüge zu erkennen.»"],
["Wortschatz","Wort","","Schatz","Wortschatz bezeichnet die Gesamtheit verfügbarer Wörter eines Sprachsystems oder einer Person.","«Ich erweitere meinen Wortschatz durch Beispiele im Kontext.»"],
["Satzbau","Satz","","Bau","Satzbau bezeichnet die syntaktische Anordnung von Satzteilen.","«Ich stelle den Hauptgedanken an eine gut verständliche Stelle.»"],
["Satzstruktur","Satz","","Struktur","Satzstruktur bezeichnet die grammatische Gliederung eines Satzes.","«Ich formuliere erst den Hauptsatz und dann die Ergänzung.»"],
["Redekunst","Rede","","Kunst","Redekunst bezeichnet die bewusste Gestaltung einer Rede für ein Publikum.","«Ich gestalte die Rede passend zum Thema und zu den Zuhörenden.»"],
["Redefluss","Rede","","Fluss","Redefluss beschreibt die wahrgenommene Fortsetzung einer Rede über die Zeit.","«Ich darf bewusst pausieren und danach fortfahren.»"],
["Redepause","Rede","","Pause","Eine Redepause ist eine Unterbrechung des gesprochenen Ausdrucks.","«Nach meinem wichtigsten Gedanken lasse ich eine Pause.»"],
["Redebeitrag","Rede","","Beitrag","Ein Redebeitrag ist ein Abschnitt, mit dem jemand an einem Gespräch oder einer Diskussion teilnimmt.","«Ich halte meinen Beitrag kurz und verständlich.»"],
["Gegenargument","Gegen","","Argument","Ein Gegenargument ist ein Grund gegen eine vorgebrachte These oder Schlussfolgerung.","«Ich benenne zuerst das stärkste Gegenargument.»"],
["Argumentationsstruktur","Argumentation","s","Struktur","Argumentationsstruktur bezeichnet die Ordnung von Behauptungen, Gründen und Stützungen.","«Zuerst die These, dann der Grund, danach ein Beispiel.»"],
["Beweisführung","Beweis","","Führung","Beweisführung bezeichnet eine Abfolge von Schritten, die eine Schlussfolgerung stützen sollen.","«Ich sage, welcher Beleg meine Behauptung stützt.»"],
["Quellenkritik","Quellen","","Kritik","Quellenkritik ist die systematische Prüfung der Herkunft und Tragfähigkeit von Aussagen.","«Ich öffne die Originalstudie und prüfe ihre Methode.»"],
["Faktenlage","Fakten","","Lage","Faktenlage bezeichnet den aktuell belegbaren Sachstand zu einem Thema.","«Meine Schlussfolgerung richtet sich nach der Faktenlage.»"],
["Kontextanalyse","Kontext","","Analyse","Kontextanalyse untersucht die Bedingungen, in denen eine Aussage oder Handlung steht.","«Ich analysiere, wer beteiligt ist und welche Regeln gelten.»"],
["Forschungsfrage","Forschung","s","Frage","Eine Forschungsfrage macht deutlich, was untersucht und erklärt werden soll.","«Ich formuliere eine prüfbare Frage statt einer Vermutung.»"],
["Forschungsstand","Forschung","s","Stand","Forschungsstand bezeichnet die verfügbare wissenschaftliche Kenntnis zu einem Thema.","«Ich unterscheide gesicherte Befunde von offenen Fragen.»"],
["Sprechtempo","Sprech","","Tempo","Sprechtempo bezeichnet die Geschwindigkeit des gesprochenen Ausdrucks.","«Ich spreche einen wichtigen Gedanken bewusst langsamer.»"],
["Sprechangst","Sprech","","Angst","Sprechangst ist eine alltagssprachliche Bezeichnung für Angst oder starke Anspannung beim Sprechen.","«Eine Vorbereitung kann den nächsten Sprechversuch erleichtern.»"],
["Sprechübung","Sprech","","Übung","Eine Sprechübung ist eine gezielte Wiederholung sprachlicher Handlungen.","«Ich übe eine verständliche Frage zunächst laut für mich.»"],
["Perspektivenwechsel","Perspektive","n","Wechsel","Perspektivenwechsel bezeichnet die gedankliche Übernahme eines anderen Betrachtungsstandpunkts.","«Ich prüfe, wie die andere Person die Situation erlebt.»"],
["Interpretationsspielraum","Interpretation","s","Spielraum","Interpretationsspielraum bezeichnet den Bereich vertretbarer Deutungen eines Sachverhalts.","«Ich unterscheide eine Tatsache von meiner Deutung.»"],
["Entscheidungsspielraum","Entscheidung","s","Spielraum","Entscheidungsspielraum bezeichnet zulässige Alternativen bei einer Entscheidung.","«Ich prüfe zuerst, welche Alternativen tatsächlich offenstehen.»"],
["Handlungsfähigkeit","Handlung","s","Fähigkeit","Handlungsfähigkeit beschreibt Möglichkeiten, in einer Situation zielgerichtet tätig zu werden.","«Ich identifiziere eine konkrete Handlung, die möglich ist.»"],
["Handlungsraum","Handlung","s","Raum","Handlungsraum bezeichnet den durch Bedingungen und Regeln eröffneten Bereich möglicher Handlungen.","«Ich erkenne den Rahmen und die nächste Entscheidung.»"],
["Lernprozess","Lern","","Prozess","Lernprozess bezeichnet Veränderungen von Wissen oder Können über die Zeit.","«Ich überprüfe meine Fortschritte anhand einzelner Aufgaben.»"],
["Lernumgebung","Lern","","Umgebung","Lernumgebung umfasst Bedingungen, Hilfen und Anforderungen beim Lernen.","«Ich reduziere Ablenkungen für den nächsten Lernschritt.»"],
["Lernstrategie","Lern","","Strategie","Lernstrategie bezeichnet ein absichtsvoll verwendetes Vorgehen beim Lernen.","«Ich wiederhole den schwierigen Satz mit einer anderen Betonung.»"],
["Kommunikationsziel","Kommunikation","s","Ziel","Ein Kommunikationsziel beschreibt, was mit einer Äusserung erreicht werden soll.","«Ich möchte eine Entscheidung verständlich erklären.»"],
["Kommunikationsmittel","Kommunikation","s","Mittel","Kommunikationsmittel bezeichnet ein Medium oder ein Vorgehen zur Verständigung.","«Ich wähle ein verständliches Medium für die Situation.»"],
["Kommunikationsmodell","Kommunikation","s","Modell","Ein Kommunikationsmodell vereinfacht Aspekte sprachlicher Verständigung zu Analysezwecken.","«Ein Modell hilft zu denken, ersetzt aber nicht die konkrete Situation.»"],
["Sozialarbeit","Sozial","","Arbeit","Sozialarbeit bezeichnet einen Teilbereich professionellen sozialen Handelns.","«Ich kläre die fachliche und institutionelle Aufgabe.»"],
["Sozialhilfe","Sozial","","Hilfe","Sozialhilfe bezeichnet materielle und persönliche Unterstützung nach jeweils geltender Rechtsordnung.","«Ich trenne wissenschaftliche Argumente von Rechtsansprüchen.»"],
["Sozialversicherung","Sozial","","Versicherung","Sozialversicherung bezeichnet Systeme gesetzlich geregelter Absicherung definierter Risiken.","«Ich prüfe die zuständige Versicherungsleistung.»"],
["Rechtssicherheit","Recht","s","Sicherheit","Rechtssicherheit bezeichnet die Vorhersehbarkeit und Verlässlichkeit rechtlicher Ordnung.","«Ich begründe den Entscheid anhand einer überprüfbaren Rechtsgrundlage.»"],
["Sachverhalt","Sach","","Verhalt","Sachverhalt ist der für eine Fragestellung erhebliche Tatsachenzusammenhang.","«Ich dokumentiere, was bekannt und was noch ungeklärt ist.»"],
["Lebenslage","Leben","s","Lage","Lebenslage bezeichnet die konkrete Kombination von Ressourcen und Einschränkungen einer Person.","«Ich frage nach Wohnen, Arbeit und verfügbaren Beziehungen.»"],
["Lebenslauf","Leben","s","Lauf","Lebenslauf bezeichnet den zeitlichen Verlauf von Lebensereignissen oder eine biografische Darstellung.","«Ich ordne die wichtigsten Schritte chronologisch.»"],
["Zuständigkeitsbereich","Zuständigkeit","s","Bereich","Ein Zuständigkeitsbereich benennt abgegrenzte institutionelle Aufgaben.","«Ich frage, wer für diesen Teil verantwortlich ist.»"],
["Schulungsangebot","Schulung","s","Angebot","Schulungsangebot bezeichnet eine organisierte Möglichkeit zur Weiterbildung.","«Ich wähle ein Angebot, das zu meinem Lernziel passt.»"]
];
for(const x of compounds)compound(...x);
function derivative(word,stem,suffix,meaning,usage){
if((stem+suffix).toLocaleLowerCase("de-CH")!==word.toLocaleLowerCase("de-CH"))throw Error("Ableitung stimmt nicht "+word);
const pre=suffix==="heit"||suffix==="keit"||suffix==="schaft"?"Das Suffix bildet hier ein Substantiv.":suffix==="ung"?"Das Suffix bildet hier ein Substantiv zu einem verbalen Stamm.":"Das Wort ist durch ein Suffix gebildet.";
add({id:"ab-"+slug(word),word,kind:"Derivation · synchron analysiert",area:"Wortbildung",parts:[{t:stem,d:"sichtbarer Wortstamm oder komplexe Basis"},{t:"-"+suffix,d:"wortbildendes Suffix"}],
intro:meaning+" "+pre+" Dabei unterscheiden wir das Wortbildungsprodukt von der grammatischen Flexion: Ein neues Lexem entsteht nicht schon durch jede veränderte Wortform.",
history:"Die Segmentierung «"+stem+" + -"+suffix+"» dient der Darstellung eines heutigen Wortbildungsmusters. Sie beweist nicht, dass das Wort zu einer bestimmten Zeit erstmals aus genau diesen zwei Formen entstand. Manche Basen sind selbst komplex. Eine belastbare Etymologie erfordert historische Textbelege.",
use:usage+" Beim Vorlesen kannst du die Wortfamilie und die Funktion des Suffixes miteinander vergleichen.",
source:["idsderivation","idswortbildung"]});
}
const derivatives=[
["Freiheit","frei","heit","Freiheit benennt eine Lage oder Möglichkeit des freien Handelns.","«Ich prüfe, welche Freiheit ich in dieser Entscheidung habe.»"],
["Klarheit","klar","heit","Klarheit benennt den Zustand sprachlicher oder sachlicher Verständlichkeit.","«Mein Ziel ist eine klare, prüfbare Aussage.»"],
["Offenheit","offen","heit","Offenheit bezeichnet die Eigenschaft, Perspektiven oder Informationen zugänglich zu machen.","«Ich kann offen nachfragen und dennoch kritisch denken.»"],
["Sicherheit","sicher","heit","Sicherheit benennt einen Zustand von Schutz, Stabilität oder Gewissheit.","«Ich unterscheide meine gefühlte Sicherheit von tatsächlichen Fakten.»"],
["Gelassenheit","gelassen","heit","Gelassenheit beschreibt eine ruhige Haltung gegenüber Belastungen.","«Ich kann ruhig bleiben und trotzdem entschlossen handeln.»"],
["Wahrheit","wahr","heit","Wahrheit bezeichnet in der Sprache die Eigenschaft einer zutreffenden Aussage.","«Eine überzeugende Behauptung ist noch nicht automatisch wahr.»"],
["Wirksamkeit","wirksam","keit","Wirksamkeit bezeichnet den Grad, in dem eine Massnahme die beabsichtigte Wirkung erzielt.","«Ich prüfe, ob die Massnahme das Ziel wirklich erreicht.»"],
["Sichtbarkeit","sichtbar","keit","Sichtbarkeit beschreibt, ob etwas wahrgenommen werden kann.","«Ich mache die zentrale Aussage im Gespräch sichtbar.»"],
["Höflichkeit","höflich","keit","Höflichkeit bezeichnet sozial erwartete Formen respektvollen Umgangs.","«Ich kann freundlich und zugleich bestimmt sprechen.»"],
["Ehrlichkeit","ehrlich","keit","Ehrlichkeit bezeichnet die Orientierung an wahrhaftiger Darstellung.","«Ich benenne offen, was ich noch nicht weiss.»"],
["Achtsamkeit","achtsam","keit","Achtsamkeit beschreibt eine Form aufmerksamer Wahrnehmung des gegenwärtigen Erlebens.","«Ich bemerke meine Gedanken, ohne sie sofort zu bewerten.»"],
["Beständigkeit","beständig","keit","Beständigkeit bezeichnet das Fortbestehen über eine gewisse Zeit.","«Ich übe in kleinen, regelmässigen Schritten.»"],
["Freundschaft","Freund","schaft","Freundschaft bezeichnet eine soziale Beziehung gegenseitiger Zugewandtheit.","«Ich höre meinem Freund aufmerksam zu.»"],
["Partnerschaft","Partner","schaft","Partnerschaft bezeichnet eine Form wechselseitiger Verbindung oder Zusammenarbeit.","«Wir klären gemeinsam unsere Erwartungen.»"],
["Gemeinschaft","Gemein","schaft","Gemeinschaft bezeichnet eine Verbindung von Menschen mit gemeinsamem Bezug.","«Eine Gemeinschaft braucht nachvollziehbare Gesprächsregeln.»"],
["Bereitschaft","bereit","schaft","Bereitschaft bezeichnet die Haltung oder Möglichkeit, eine Handlung aufzunehmen.","«Ich bin bereit, einen neuen Versuch zu unternehmen.»"],
["Verantwortung","verantwort","ung","Verantwortung bezeichnet die Zuschreibung von Zuständigkeit für Entscheidungen oder Folgen.","«Ich übernehme Verantwortung für meinen nächsten Schritt.»"],
["Entscheidung","entscheid","ung","Entscheidung bezeichnet die Auswahl zwischen möglichen Handlungsoptionen.","«Ich formuliere meine Entscheidung mit einem Grund.»"],
["Bedeutung","bedeut","ung","Bedeutung bezeichnet die semantische Funktion eines Ausdrucks oder dessen Relevanz.","«Wir prüfen, was dieses Wort im Kontext bedeutet.»"],
["Forschung","forsch","ung","Forschung bezeichnet systematisches, methodisch kontrolliertes Erarbeiten von Wissen.","«Ich unterscheide eine Forschungsfrage von einer Behauptung.»"],
["Bildung","bild","ung","Bildung bezeichnet je nach Kontext Lernprozess, Bildungsstand oder Bildungsinstitutionen.","«Ich entwickle meine Kenntnisse in konkreten Schritten.»"],
["Erkennung","erkenn","ung","Erkennung bezeichnet die Feststellung oder Identifikation eines Musters.","«Spracherkennung ist nicht dasselbe wie ein Urteil über Redequalität.»"],
["Wirkung","wirk","ung","Wirkung bezeichnet eine Folge, die einer Ursache zugeschrieben werden kann.","«Ich prüfe, welche Wirkung mein Argument nachweislich besitzt.»"],
["Leitung","leit","ung","Leitung bezeichnet Führung oder Steuerung von Abläufen.","«Ich leite die Besprechung mit einer klaren Frage ein.»"],
["Haltung","halt","ung","Haltung bezeichnet körperliche Ausrichtung oder eine wertbezogene Position.","«Ich begründe meine Haltung sachlich.»"],
["Beobachtung","beobacht","ung","Beobachtung bezeichnet die gezielte Wahrnehmung oder Dokumentation von Ereignissen.","«Ich trenne die Beobachtung von der Interpretation.»"],
["Betreuung","betreu","ung","Betreuung bezeichnet unterstützende Begleitung oder Versorgung.","«Ich kläre, welche Betreuung benötigt wird.»"],
["Besprechung","besprech","ung","Besprechung bezeichnet ein zweckgerichtetes Gespräch zu einem Thema.","«Wir beginnen die Besprechung mit dem Ziel.»"],
["Planung","plan","ung","Planung bezeichnet die vorbereitende Ordnung zukünftiger Handlungen.","«Ich teile das Vorhaben in nachvollziehbare Schritte.»"],
["Zustimmung","zustimm","ung","Zustimmung bezeichnet das Einverständnis mit einer Aussage oder Handlung.","«Ich frage nach, ob die Zustimmung tatsächlich vorliegt.»"]
];
for(const x of derivatives)derivative(...x);
function negation(word,prefix,stem,meaning,usage){
 if((prefix+stem).toLocaleLowerCase("de-CH")!==word.toLocaleLowerCase("de-CH"))throw Error("Präfixanalyse fehlerhaft: "+word);
 add({id:"pr-"+slug(word),word,kind:"Präfixbildung · synchron analysiert",area:"Wortbildung",parts:[{t:prefix+"-",d:prefix==="un"?"negierendes Präfix":prefix==="miss"?"Präfix mit negativer Bewertung":"verstärkendes oder historisch intensivierendes Präfix"},{t:stem,d:"Wortbasis"}],
 intro:meaning+" Das vorangestellte Element verändert die Bedeutung der Basis. Für eine saubere Wortanalyse reicht es nicht, allein die ersten Buchstaben zu erkennen; die Wortbildungsfunktion muss passen.",
 history:"Die gezeigte Struktur ist synchron. Die historische Entstehung, etwa Bedeutungsverschiebungen von Präfixen, lässt sich nicht aus der heutigen Schreibweise datieren oder vollständig erklären.",
 use:usage+" Vergleiche den Satz einmal mit und einmal ohne Präfix, um die semantische Veränderung hörbar zu machen.",
 source:["idsderivation"]});
}
const prefixes=[
["Unruhe","un","Ruhe","Unruhe bezeichnet den Zustand fehlender Ruhe oder innerer Bewegung.","«Ich darf Unruhe bemerken, ohne mich dafür zu bewerten.»"],
["Unklarheit","un","Klarheit","Unklarheit bezeichnet einen Mangel an Klarheit und Verständlichkeit.","«Bei einer Unklarheit frage ich nach.»"],
["Unsicherheit","un","Sicherheit","Unsicherheit bezeichnet fehlende Gewissheit oder subjektive Stabilität.","«Ich kann bei Unsicherheit einen überprüfbaren Schritt wählen.»"],
["Unhöflichkeit","un","Höflichkeit","Unhöflichkeit bezeichnet einen Verstoss gegen erwartete Umgangsformen.","«Ich benenne konkretes Verhalten statt die Person abzuwerten.»"],
["Ungeduld","un","Geduld","Ungeduld bezeichnet Schwierigkeiten mit dem Warten oder der Verzögerung.","«Ich prüfe, ob die Eile wirklich notwendig ist.»"],
["Unverständnis","un","Verständnis","Unverständnis bezeichnet fehlendes Verstehen oder eine ablehnende Reaktion.","«Ich frage, welcher Teil noch unverständlich ist.»"],
["Unabhängigkeit","un","Abhängigkeit","Unabhängigkeit bezeichnet das Nichtgebundensein an eine bestimmte Abhängigkeit.","«Ich kläre, wo ich frei entscheiden kann.»"],
["Unwirksamkeit","un","Wirksamkeit","Unwirksamkeit bezeichnet das Fehlen der beabsichtigten Wirkung.","«Ich untersuche, weshalb die Massnahme nicht wie geplant wirkt.»"],
["Missverständnis","Miss","verständnis","Missverständnis bezeichnet eine fehlerhafte Deutung einer Äusserung.","«Ich fasse noch einmal zusammen, was ich verstanden habe.»"],
["Missachtung","Miss","achtung","Missachtung bezeichnet fehlende gebotene Beachtung oder Respekt.","«Ich beschreibe eine konkrete Missachtung statt pauschal zu urteilen.»"],
["Missdeutung","Miss","deutung","Missdeutung bezeichnet eine unzutreffende Interpretation.","«Ich prüfe alternative Lesarten, bevor ich antworte.»"],
["Missbrauch","Miss","brauch","Missbrauch bezeichnet eine zweckwidrige oder schädigende Verwendung.","«Ich nutze das Wort nur bei klar definiertem Sachverhalt.»"]
];
// Die Präfixanalyse kann bei komplexen Wörtern verschiedene Hierarchien zulassen; nur transparente Bildung zulassen.
for(const [word,prefix,stem,meaning,use] of prefixes)negation(word,prefix,stem,meaning,use);
const terms=[
["Phonem","Phonologie","Abstrakte, bedeutungsunterscheidende lautliche Einheit eines Sprachsystems.","Beobachte, dass ein Laut in verschiedenen Umgebungen unterschiedlich klingen kann, ohne ein anderes Phonem zu bilden.","idsphonem"],
["Phon","Phonetik","Tatsächlich produziertes und akustisch beobachtbares Sprachereignis.","Sprich denselben Vokal mehrmals und vergleiche die hörbare Variation.","idsphonem"],
["Allophon","Phonologie","Lautvariante eines Phonems, die in einer Sprache keine andere Wortbedeutung erzeugt.","Unterscheide Lautvariante und bedeutungsunterscheidenden Gegensatz.","idsphonem"],
["Phonologie","Sprachstruktur","Wissenschaftliche Untersuchung der Funktion und Organisation von Sprachlauten in Sprachsystemen.","Frage, welche Lautgegensätze Wörter in einer Sprache unterscheiden.","idsphonem"],
["Phonetik","Sprachstruktur","Untersuchung von Lautbildung, Schallstruktur und Wahrnehmung gesprochener Sprache.","Beobachte Lippen, Zunge und Atemführung, ohne aus dem Eindruck eine Diagnose abzuleiten.","idsphonem"],
["Intonation","Prosodie","Tonhöhenverlauf und melodische Gestaltung einer Äusserung.","Sprich denselben Satz einmal als Aussage, einmal als Frage.","idsintonation"],
["Prosodie","Prosodie","Übergreifende Gestaltung von Rhythmus, Akzent, Dauer und Tonverlauf gesprochener Sprache.","Markiere Pausen und betonte Wörter in deinem Übungstext.","idsintonation"],
["Betonung","Prosodie","Hervorhebung einer sprachlichen Einheit durch prosodische Merkmale.","Betone jeweils ein anderes Wort und beobachte die Bedeutungsverschiebung.","idsintonation"],
["Sprechmelodie","Prosodie","Alltagssprachlicher Ausdruck für den Verlauf der Tonhöhe in einer Äusserung.","Achte auf den Unterschied zwischen Sprechmelodie und Sprechlautstärke.","idsintonation"],
["Silbe","Lautstruktur","Prosodische Gliederungseinheit eines Wortes, die nicht mit einem Morphem gleichzusetzen ist.","Vergleiche Silben und Morphemgrenzen in Unklarheit.","idsmorphem"],
["Komposition","Wortbildung","Wortbildung durch Verbindung mindestens zweier wortfähiger Einheiten oder Konfixe.","Zerlege Gesprächsführung in Bestimmungswort und Grundwort.","idskomposition"],
["Derivation","Wortbildung","Bildung eines neuen Wortes durch Ableitung, häufig mit Wortbildungsaffixen.","Vergleiche klar und Klarheit.","idsderivation"],
["Konversion","Wortbildung","Wortartwechsel ohne ein zusätzliches Wortbildungsaffix.","Vergleiche das Verb laufen mit dem substantivierten Laufen.","idsderivation"],
["Fugenelement","Wortbildung","Verbindendes Element innerhalb bestimmter komplexer Wortbildungen.","Untersuche das s in Gesprächsführung, ohne ihm eine eigene lexikalische Bedeutung zuzuschreiben.","idsfuge"],
["Wortstamm","Wortbildung","Lexikalischer Ausgangsbestandteil, an dem weitere Wortbildung oder Flexion ansetzen kann.","Suche den Stamm in entscheid-en und Entscheid-ung.","idswortbildung"],
["Affix","Wortbildung","Gebundenes sprachliches Element, das an eine Basis angefügt werden kann.","Unterscheide Präfix, Suffix und andere Affixtypen.","idsderivation"],
["Flexion","Grammatik","Formenbildung von Wörtern zur Markierung grammatischer Merkmale.","Vergleiche Wortbildung mit den Formen spreche und sprichst.","idswortbildung"]
];
for(const [word,area,meaning,use,src] of terms){
add({id:"fach-"+slug(word),word,kind:"Sprachwissenschaftlicher Fachbegriff",area,parts:[{t:word,d:"Fachbegriff / keine behauptete historische Morphemzerlegung"}],
intro:meaning+" Der Terminus bezeichnet eine analytische Ebene und darf nicht unbesehen auf andere Beschreibungsmodelle übertragen werden.",
history:"Dieser Eintrag gibt die fachliche Bedeutung wieder. Eine historische Etymologie wäre eine gesonderte Untersuchung; die Form des modernen Terminus ist hier kein Beleg für eine bestimmte Entwicklungsgeschichte.",
use:use+" Beziehe deine Beobachtung immer auf einen konkreten sprachlichen Kontext und prüfe die Fachdefinition im verlinkten Original.",
source:[src]});
}
window.LOGOS_LEXICON_V2={added:known.size-(known.size-(compounds.length+derivatives.length+prefixes.length+terms.length)),count:()=>D.lexicon.length,modules:{compounds:compounds.length,derivatives:derivatives.length,prefixes:prefixes.length,terms:terms.length},method:"Synchrone Wortbildung und wissenschaftliche Terminologie; keine pauschale historische Etymologie."};
})();