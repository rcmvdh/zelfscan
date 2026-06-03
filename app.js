// ─── ROLLEN ────────────────────────────────────────────────────────────────
const ROLES = {
  OP:  { name:'Onderwijzend Personeel',          desc:'Docenten, instructeurs, praktijkbegeleiders, SLB\'ers', color:'#1E6E0F', icon:'📚' },
  DOP: { name:'Direct Onderwijsondersteunend',   desc:'Onderwijsassistenten, OLC-medewerkers',                color:'#0D6E73', icon:'🤝' },
  IOP: { name:'Indirect Onderwijsondersteunend', desc:'HR, financiën, facilitair, communicatie, ICT',        color:'#7B4F0C', icon:'⚙️' },
  MAN: { name:'Directie & Management',           desc:'Afdelingshoofden, teamleiders, directieleden',        color:'#8B1A1A', icon:'🏛️' },
};

// ─── 6 DOMEINEN ────────────────────────────────────────────────────────────
// ped & student labels worden per rol overschreven in DOM_LABELS
const DOMAINS_BASE = {
  houding:      { icon:'🧠', color:'#1A73E8', light:'#E8F0FE' },
  vaardigheden: { icon:'💻', color:'#1E8E3E', light:'#E6F4EA' },
  kennis:       { icon:'📖', color:'#B45309', light:'#FEF3C7' },
  ethiek:       { icon:'⚖️', color:'#7B3F9E', light:'#F5F0FF' },
  ped:          { icon:'🎓', color:'#C5221F', light:'#FCE8E6' },
  student:      { icon:'🌱', color:'#0D6E73', light:'#E1F5EE' },
};

const DOM_LABELS = {
  OP:  { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Pedagogisch-Didactisch Handelen', student:'Digitale Groei van Studenten' },
  DOP: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Begeleidend Handelen',              student:'Zelfredzaamheid van Studenten' },
  IOP: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan Digitale Ontwikkeling' },
  MAN: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Leiderschapshandelen',               student:'Teamontwikkeling & Beleid' },
};

const LEVELS = ['A1','A2','B1','B2','C1','C2'];

const LEVEL_INFO = {
  A1: { name:'Beginner',   color:'#5B8DB8', pct:15 },
  A2: { name:'Ontdekker',  color:'#3A7BAD', pct:30 },
  B1: { name:'Toepasser',  color:'#1B5E8A', pct:50 },
  B2: { name:'Deskundige', color:'#134671', pct:70 },
  C1: { name:'Kartrekker', color:'#0B2B4E', pct:85 },
  C2: { name:'Pionier',    color:'#030D1A', pct:100 },
};

// ─── VRAGEN ────────────────────────────────────────────────────────────────
// lv = niveau (A1/A2/B1/B2), inv altijd false (alle stellingen positief geformuleerd)
// aiGate:true → als antwoord 'no', sla ai:true vragen over (auto-A1)
// 30 vragen per rol: 5 per domein, verdeeld over niveaus A1(×2), A2, B1, B2

const Q = {

// ══════════════════════════════════════════════════════
// ONDERWIJZEND PERSONEEL (OP)
// ══════════════════════════════════════════════════════
OP: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor het gebruik van digitale tools in mijn werk als docent.' },
    { lv:'A1', inv:false, t:'Ik houd goed bij wat er digitaal verandert in het onderwijs.' },
    { lv:'A2', inv:false, t:'Als er een nieuwe digitale tool beschikbaar komt, probeer ik die zelf eens uit.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale vaardigheden bij te houden, ook buiten verplichte scholing.' },
    { lv:'B2', inv:false, t:'Ik inspireer collega\'s actief door mijn enthousiasme voor digitale vernieuwing te delen.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief voor digitale vernieuwing in mijn team en coach collega\'s actief in hun digitale ontwikkeling.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met nieuwe digitale en AI-toepassingen in het onderwijs en deel mijn bevindingen op schoolniveau of breder.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met de digitale tools die op school beschikbaar zijn, zoals Teams of Moodle.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot zelfstandig openen en er een duidelijke vraag aan stellen.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik Copilot om mijn werk te ondersteunen, bijvoorbeeld bij het schrijven of samenvatten van teksten.' },
    { lv:'B1', inv:false, t:'Ik kies bewust een digitale tool die past bij het leerdoel van mijn les en pas mijn keuze aan als iets beter werkt.' },
    { lv:'B2', inv:false, t:'Ik gebruik data of digitale tools om mijn lessen te evalueren en structureel te verbeteren.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s in het effectief gebruik van Copilot en andere digitale tools en deel concrete werkwijzen die ik zelf heb ontwikkeld.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel nieuwe digitale leerconcepten of lesontwerpen die door collega\'s of de school worden overgenomen en toegepast.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet wat Copilot is en begrijp globaal hoe AI-tools werken.' },
    { lv:'A1', inv:false, t:'Ik weet wat de AVG betekent voor het gebruik van studentgegevens in digitale tools.' },
    { lv:'A2', inv:false, ai:true, t:'Ik weet welke AI-tools mijn studenten gebruiken bij het maken van opdrachten.' },
    { lv:'B1', inv:false, t:'Ik weet welke digitale tools door de school zijn goedgekeurd voor gebruik met studentdata.' },
    { lv:'B2', inv:false, ai:true, t:'Ik volg actuele ontwikkelingen op het gebied van AI in het onderwijs goed genoeg om mee te praten over schoolbeleid.' },
    { lv:'C1', inv:false, t:'Ik heb voldoende kennis van AI-beleidskaders zoals de EU AI Act om een inhoudelijke bijdrage te leveren aan het digitale beleid van de school.' },
    { lv:'C2', inv:false, t:'Ik volg internationale ontwikkelingen op het gebied van AI in het onderwijs en vertaal deze naar concrete aanbevelingen voor de organisatie.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik voer geen persoonsgegevens van studenten in bij Copilot of andere externe AI-tools.' },
    { lv:'A1', inv:false, t:'Als Copilot een antwoord geeft, controleer ik dit altijd op juistheid voordat ik het gebruik.' },
    { lv:'A2', inv:false, t:'Ik bespreek met studenten wat de schoolregels zijn rondom het gebruik van AI bij opdrachten.' },
    { lv:'B1', inv:false, t:'Ik overweeg bewust ethische aspecten zoals bias, auteursrecht en privacy als ik AI inzet in mijn lessen.' },
    { lv:'B2', inv:false, t:'Ik neem actief deel aan het opstellen van afspraken over verantwoord AI-gebruik, ook als docent.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het opstellen van ethische richtlijnen voor AI-gebruik binnen mijn team of op schoolniveau.' },
    { lv:'C2', inv:false, t:'Ik draag actief bij aan het schoolbrede ethische AI-beleid en adviseer leidinggevenden over verantwoorde implementatie.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik denk na over hoe een digitale tool het leerproces van studenten kan verbeteren, voordat ik hem gebruik.' },
    { lv:'A1', inv:false, t:'Ik kies digitale tools in de les bewust, gericht op het concrete leereffect voor studenten.' },
    { lv:'A2', inv:false, t:'Ik pas mijn instructie en werkvorm aan op de digitale tools die ik gebruik in de les.' },
    { lv:'B1', inv:false, t:'Ik gebruik formatieve data, zoals quizresultaten of voortgangsrapportages, om mijn lessen bij te sturen.' },
    { lv:'B2', inv:false, t:'Ik ontwerp opdrachten waarbij studenten zelf actief en creatief met digitale tools aan de slag gaan.' },
    { lv:'C1', inv:false, t:'Ik ontwerp stelselmatig rijke, digitaal verrijkte leertrajecten en help collega\'s om dit ook te doen.' },
    { lv:'C2', inv:false, t:'Ik lever een bijdrage aan onderwijsontwikkeling op schoolniveau op het gebied van digitale didactiek en AI-integratie.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een student Copilot of een andere AI-tool verkeerd inzet, spreek ik hem of haar daarop aan.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak als docent om studenten te helpen digitaal vaardiger te worden.' },
    { lv:'A2', inv:false, t:'Ik leer studenten hoe ze online bronnen kunnen beoordelen op betrouwbaarheid.' },
    { lv:'B1', inv:false, t:'Ik bouw in mijn lessen bewust momenten in waarbij studenten digitale vaardigheden oefenen.' },
    { lv:'B2', inv:false, t:'Ik bereid studenten gericht voor op de digitale werkelijkheid van hun beroep, inclusief verantwoord gebruik van AI.' },
    { lv:'C1', inv:false, t:'Ik ontwikkel bewust leeractiviteiten die studenten voorbereiden op de digitale beroepspraktijk, inclusief ethisch en kritisch AI-gebruik, en deel deze met collega\'s.' },
    { lv:'C2', inv:false, t:'Ik fungeer als expertbron voor collega\'s bij het ontwerpen van beroepsrelevante digitale leerroutes en draag hieraan bij op organisatieniveau.' },
  ],
},

// ══════════════════════════════════════════════════════
// DIRECT ONDERWIJSONDERSTEUNEND (DOP)
// ══════════════════════════════════════════════════════
DOP: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor het gebruik van digitale tools om studenten beter te begeleiden.' },
    { lv:'A1', inv:false, t:'Ik houd bij welke digitale tools studenten en docenten op school gebruiken.' },
    { lv:'A2', inv:false, t:'Als ik een nieuwe digitale tool tegenkom die de begeleiding kan verbeteren, probeer ik die zelf uit.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn verantwoordelijkheid om mijn digitale vaardigheden bij te houden voor mijn begeleidingsrol.' },
    { lv:'B2', inv:false, t:'Ik deel mijn ervaringen met digitale tools actief met collega\'s om samen beter te worden.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief in mijn team op het gebied van digitale werkwijzen en coach collega\'s actief in hun digitale ontwikkeling.' },
    { lv:'C2', inv:false, t:'Ik experimenteer actief met nieuwe digitale tools voor begeleiding en deel mijn inzichten structureel met het bredere team of de school.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met de digitale begeleidingssystemen van de school, zoals Teams, Moodle of Osiris.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot inzetten voor taken in mijn begeleidingswerk.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik Copilot om begeleidingsteksten te schrijven of informatie snel op te zoeken.' },
    { lv:'B1', inv:false, t:'Ik gebruik digitale tools gericht om begeleidingsgesprekken voor te bereiden of voortgang te monitoren.' },
    { lv:'B2', inv:false, t:'Ik gebruik data uit Osiris structureel om de begeleiding van studenten te verbeteren.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s in het gebruik van digitale begeleidingssystemen en help hen effectiever te werken met tools zoals Osiris en Copilot.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel nieuwe digitale begeleidingsconcepten of werkwijzen die breed worden toegepast binnen de organisatie.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet wat Copilot is en begrijp globaal hoe AI-tools werken.' },
    { lv:'A1', inv:false, t:'Ik weet wat de AVG betekent voor het gebruik van studentgegevens in mijn begeleidingswerk.' },
    { lv:'A2', inv:false, ai:true, t:'Ik weet welke digitale tools studenten en docenten op onze school gebruiken.' },
    { lv:'B1', inv:false, t:'Ik weet welke digitale systemen zijn goedgekeurd voor gebruik met studentdata.' },
    { lv:'B2', inv:false, ai:true, t:'Ik ken de actuele ontwikkelingen in digitale begeleiding goed genoeg om collega\'s te informeren.' },
    { lv:'C1', inv:false, t:'Ik heb diepgaande kennis van digitale ontwikkelingen in studentbegeleiding en word door collega\'s als vraagbaak gezien.' },
    { lv:'C2', inv:false, t:'Ik volg landelijke en internationale trends in digitale begeleiding en vertaal die naar concrete verbetervoorstellen voor de organisatie.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik voer geen persoonsgegevens van studenten in bij Copilot of andere externe AI-tools.' },
    { lv:'A1', inv:false, t:'Als een AI-tool mij iets adviseert over een student, weeg ik dit altijd kritisch af met mijn eigen oordeel.' },
    { lv:'A2', inv:false, t:'Ik weet hoe ik veilig en privacyvriendelijk omga met studentgegevens in digitale systemen.' },
    { lv:'B1', inv:false, t:'Ik overweeg bewust de privacy en ethische aspecten als ik AI of data gebruik in de begeleiding.' },
    { lv:'B2', inv:false, t:'Ik draag actief bij aan afspraken over veilig datagebruik, ook in mijn begeleidingsrol.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het formuleren van richtlijnen voor verantwoord datagebruik in de begeleiding.' },
    { lv:'C2', inv:false, t:'Ik draag actief bij aan schoolbrede privacybeleid en adviseer over ethisch gebruik van digitale data in begeleidingsprocessen.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik denk na over hoe een digitale tool de begeleiding van studenten concreet kan verbeteren.' },
    { lv:'A1', inv:false, t:'Ik denk bewust na over het effect van digitale systemen voordat ik ze inzet in mijn begeleiding.' },
    { lv:'A2', inv:false, t:'Ik pas mijn begeleidingsaanpak aan op de digitale behoeften van de individuele student.' },
    { lv:'B1', inv:false, t:'Ik gebruik voortgangsdata om gerichte begeleiding te geven die aansluit bij de actuele situatie van de student.' },
    { lv:'B2', inv:false, t:'Ik ontwerp begeleidingsstructuren waarbij studenten tegelijk digitale zelfredzaamheid ontwikkelen.' },
    { lv:'C1', inv:false, t:'Ik ontwerp structureel begeleidingsaanpakken die digitale zelfredzaamheid van studenten bevorderen en help collega\'s dit te implementeren.' },
    { lv:'C2', inv:false, t:'Ik draag bij aan de ontwikkeling van organisatiebrede digitale begeleidingsstandaarden en best practices.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een student vastloopt met een digitaal systeem of tool, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om studenten digitaal zelfredzamer te maken.' },
    { lv:'A2', inv:false, t:'Ik stimuleer studenten om zelf oplossingen te zoeken bij digitale problemen, in plaats van het over te nemen.' },
    { lv:'B1', inv:false, t:'Ik bouw in mijn begeleiding bewust momenten in waarbij studenten digitale vaardigheden oefenen.' },
    { lv:'B2', inv:false, t:'Ik bereid studenten voor op de digitale werkpraktijk van hun toekomstige beroep.' },
    { lv:'C1', inv:false, t:'Ik ontwikkel gerichte programma\'s of interventies die studenten structureel voorbereiden op digitale zelfredzaamheid in hun beroep.' },
    { lv:'C2', inv:false, t:'Ik fungeer als expertbron voor de organisatie op het gebied van digitale zelfredzaamheid van studenten en draag bij aan beleid en scholing.' },
  ],
},

// ══════════════════════════════════════════════════════
// INDIRECT ONDERWIJSONDERSTEUNEND (IOP)
// ══════════════════════════════════════════════════════
IOP: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor nieuwe digitale tools en systemen die mijn werk kunnen verbeteren.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij wat er digitaal verandert in mijn vakgebied.' },
    { lv:'A2', inv:false, t:'Als de school een nieuw digitaal systeem introduceert, ga ik er zelf actief mee aan de slag.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale vaardigheden bij te houden, ook buiten verplichte training.' },
    { lv:'B2', inv:false, t:'Ik deel mijn digitale kennis actief met collega\'s om samen efficiënter te werken.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij digitale vernieuwing in mijn afdeling en coach collega\'s actief bij hun digitale ontwikkeling.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met nieuwe digitale werkwijzen en AI-toepassingen en deel mijn inzichten actief met de organisatie.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met de digitale systemen die voor mijn functie beschikbaar zijn.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot gebruiken voor administratieve of ondersteunende taken.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik Copilot om terugkerende taken sneller te doen, zoals teksten schrijven of samenvatten.' },
    { lv:'B1', inv:false, t:'Ik automatiseer terugkerende digitale taken om mijn werk efficiënter te maken.' },
    { lv:'B2', inv:false, t:'Ik bouw rapportages of dashboards om mijn werkresultaten inzichtelijk te maken voor collega\'s of leidinggevenden.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s in efficiënt gebruik van digitale tools en help processen te optimaliseren door mijn kennis actief te delen.' },
    { lv:'C2', inv:false, t:'Ik ontwerp nieuwe digitale werkprocessen of automatiseringen die organisatiebreed worden ingezet.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet dat Copilot en andere AI-tools bestaan en begrijp globaal wat ze doen.' },
    { lv:'A1', inv:false, t:'Ik weet welke gegevens ik wel en niet mag invoeren in AI-tools zoals Copilot.' },
    { lv:'A2', inv:false, t:'Ik weet wat phishing is en hoe ik een verdachte e-mail herken.' },
    { lv:'B1', inv:false, t:'Ik ken het privacybeleid van de school goed genoeg om veilig met gevoelige gegevens te werken.' },
    { lv:'B2', inv:false, t:'Ik ken de relevante wet- en regelgeving, zoals de AVG en NIS2, die van toepassing is op mijn werk.' },
    { lv:'C1', inv:false, t:'Ik ben voor mijn team de inhoudelijke vraagbaak op het gebied van relevante wet- en regelgeving zoals AVG en NIS2.' },
    { lv:'C2', inv:false, t:'Ik volg actief nationale en Europese beleidsontwikkelingen op digitaal gebied en vertaal die naar strategisch advies voor de organisatie.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik gebruik sterke, unieke wachtwoorden voor mijn werkaccounts.' },
    { lv:'A1', inv:false, t:'Ik voer nooit vertrouwelijke organisatiegegevens in bij Copilot of andere gratis AI-tools.' },
    { lv:'A2', inv:false, t:'Ik gebruik tweestapsverificatie (2FA) op mijn werkaccounts.' },
    { lv:'B1', inv:false, t:'Ik denk bewust na over de privacy-implicaties voordat ik gegevens deel of invoer in een digitaal systeem.' },
    { lv:'B2', inv:false, t:'Ik adviseer collega\'s actief over veilig en ethisch gebruik van digitale tools en AI.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw in mijn team bij het opstellen en implementeren van richtlijnen voor digitale veiligheid en privacy.' },
    { lv:'C2', inv:false, t:'Ik lever een structurele bijdrage aan het organisatiebrede beleid voor digitale veiligheid, privacy en ethisch AI-gebruik.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik digitale tools actief om mijn werkprocessen te ondersteunen en te verbeteren.' },
    { lv:'A1', inv:false, t:'Ik sta open voor het aanpassen van mijn werkwijze als digitale tools mijn werk verbeteren.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in een digitaal werkproces, deel ik die met mijn leidinggevende of collega\'s.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van digitale werkprocessen in mijn team of afdeling.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer verbeterprojecten op het gebied van digitale systemen of werkprocessen.' },
    { lv:'C1', inv:false, t:'Ik leid verbeterprojecten op digitaal gebied en coach collega\'s bij de implementatie van nieuwe digitale werkwijzen.' },
    { lv:'C2', inv:false, t:'Ik ontwerp en implementeer strategische digitale verbetertrajecten die een duurzame impact hebben op de organisatie.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een collega vastloopt met een digitaal systeem, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om collega\'s te helpen bij het gebruik van digitale tools.' },
    { lv:'A2', inv:false, t:'Ik deel handige digitale werkwijzen en tips actief met collega\'s.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale ontwikkeling van mijn team of afdeling.' },
    { lv:'B2', inv:false, t:'Ik vertaal digitale inzichten en data naar concrete verbetervoorstellen voor de organisatie.' },
    { lv:'C1', inv:false, t:'Ik fungeer als vraagbaak voor collega\'s op het gebied van digitale werkwijzen en initieer structureel kennis- en leermomenten in het team.' },
    { lv:'C2', inv:false, t:'Ik lever een bijdrage aan de digitale visie en strategie van de organisatie door inzichten te vertalen naar beleid en concrete acties.' },
  ],
},

// ══════════════════════════════════════════════════════
// DIRECTIE & MANAGEMENT (MAN)
// ══════════════════════════════════════════════════════
MAN: {
  houding: [
    { lv:'A1', inv:false, t:'Ik zie digitale en AI-ontwikkelingen als een kans voor mijn team en organisatie.' },
    { lv:'A1', inv:false, t:'Ik houd goed bij wat AI-ontwikkelingen concreet betekenen voor mijn team.' },
    { lv:'A2', inv:false, t:'Ik ben zelf nieuwsgierig naar de digitale mogelijkheden die voor mijn team beschikbaar zijn.' },
    { lv:'B1', inv:false, t:'Ik zet mij actief in voor digitale professionalisering binnen mijn team.' },
    { lv:'B2', inv:false, t:'Ik creëer een cultuur waarin medewerkers worden gestimuleerd om digitaal te groeien en te experimenteren.' },
    { lv:'C1', inv:false, t:'Ik zet mij actief in voor een cultuur van digitaal leren en experimenteren in mijn team en draag dit uit naar de bredere organisatie.' },
    { lv:'C2', inv:false, t:'Ik ben een drijvende kracht achter de digitale transformatie van de organisatie en inspireer andere leidinggevenden door mijn voorbeeldgedrag.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met de digitale management- en communicatietools van de school.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot gebruiken voor managementtaken zoals beleidsteksten of vergadervoorbereiding.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik Copilot om managementtaken te ondersteunen, bijvoorbeeld bij het schrijven van beleids- of rapportageteksten.' },
    { lv:'B1', inv:false, t:'Ik gebruik data en rapportages structureel om beslissingen te onderbouwen.' },
    { lv:'B2', inv:false, t:'Ik maak gebruik van digitale dashboards of analyses om de voortgang en het welzijn van mijn team te monitoren.' },
    { lv:'C1', inv:false, t:'Ik gebruik geavanceerde digitale dashboards en analyses structureel om strategische beslissingen te onderbouwen en het team bij te sturen.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel en implementeer digitale strategieën die de gehele organisatie raken en koppel deze aan concrete kwaliteitsverbeteringen.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet welke AI-tools zoals Copilot, ChatGPT of Claude zijn en begrijp globaal hoe ze werken.' },
    { lv:'A1', inv:false, t:'Ik weet wat de EU AI Act concreet inhoudt voor onze organisatie.' },
    { lv:'A2', inv:false, t:'Ik weet wat de NIS2-richtlijn van onze organisatie verplicht op het gebied van digitale veiligheid.' },
    { lv:'B1', inv:false, ai:true, t:'Ik weet welke AI-systemen als \'hoog risico\' worden geclassificeerd onder de EU AI Act en wat dit van ons vraagt.' },
    { lv:'B2', inv:false, ai:true, t:'Ik ken de actuele digitale en AI-beleidskaders goed genoeg om strategische keuzes te onderbouwen.' },
    { lv:'C1', inv:false, t:'Ik heb diepgaande kennis van de EU AI Act, NIS2 en het nationale beleidskader AI in het MBO en gebruik deze kennis om strategische keuzes te onderbouwen.' },
    { lv:'C2', inv:false, t:'Ik lever een actieve bijdrage aan het sectorale of nationale debat over AI in het onderwijs en fungeer als expert voor de organisatie.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik ben me bewust van de digitale risico\'s, zoals datalekken of phishing, die onze organisatie raken.' },
    { lv:'A1', inv:false, t:'Ik neem mede verantwoordelijkheid voor digitale veiligheid in mijn team, ook naast de ICT-afdeling.' },
    { lv:'A2', inv:false, t:'Ik zorg dat cybersecurity en privacybescherming geborgd zijn in het beleid en de afspraken van mijn team.' },
    { lv:'B1', inv:false, t:'Ik bespreek digitale veiligheidsincidenten en risico\'s structureel met mijn team.' },
    { lv:'B2', inv:false, t:'Ik veranker ethische richtlijnen voor AI-gebruik in het beleid van mijn afdeling.' },
    { lv:'C1', inv:false, t:'Ik draag zorg voor een integrale ethische aanpak van AI en digitalisering in mijn afdeling, verankerd in beleid en werkafspraken.' },
    { lv:'C2', inv:false, t:'Ik positioneer de organisatie als verantwoorde AI-gebruiker door intern en extern een toonaangevende rol te spelen in ethisch AI-beleid.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik stimuleer medewerkers actief om digitale tools en Copilot te leren gebruiken.' },
    { lv:'A1', inv:false, t:'Ik neem zelf het initiatief voor digitale scholing in mijn team, zonder af te wachten wat de organisatie aanbiedt.' },
    { lv:'A2', inv:false, t:'Ik creëer ruimte in het werkschema voor medewerkers om digitale vaardigheden te ontwikkelen.' },
    { lv:'B1', inv:false, t:'Ik begeleid digitale verandering in mijn team en verbind dit aan de professionele cultuur en het vakmanschap van medewerkers.' },
    { lv:'B2', inv:false, t:'Ik leg in mijn jaarplan verantwoording af over digitale strategie, AI-governance en medewerkerswelzijn.' },
    { lv:'C1', inv:false, t:'Ik begeleid meerdere digitale verandertrajecten tegelijkertijd en verbind deze aan de strategische ambities van de organisatie.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel en implementeer een meerjarige digitale strategie voor mijn afdeling, inclusief governance, talentontwikkeling en innovatiebeleid.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Ik ben op de hoogte van de digitale werkdruk in mijn team en bespreek dit in overleggen.' },
    { lv:'A1', inv:false, t:'Ik bespreek digitale werkdruk en AI-gebruik structureel in functioneringsgesprekken.' },
    { lv:'A2', inv:false, t:'Ik evalueer structureel welke digitale tools mijn team gebruikt en of ze daadwerkelijk bijdragen.' },
    { lv:'B1', inv:false, t:'Ik betrek medewerkers actief bij het verbeteren van digitale werkprocessen in mijn team.' },
    { lv:'B2', inv:false, t:'Ik gebruik HR-data en leerdata structureel om het beleid voor mijn team te verbeteren en bij te sturen.' },
    { lv:'C1', inv:false, t:'Ik gebruik HR- en leerdata structureel om gerichte interventies te ontwerpen die de digitale ontwikkeling van het team versnellen.' },
    { lv:'C2', inv:false, t:'Ik draag bij aan de organisatiebrede digitale HR-strategie en lever input voor de langetermijnvisie op digitale talentontwikkeling.' },
  ],
},
}; // einde Q

// ─── KENNISCHECK (adaptief: 1 vraag per niveau per domein, 4 niveaus) ────────
// Structuur: KQ[rol][domein][0..3] voor A1, A2, B1, B2
// Trapsgewijs: goed → volgend niveau; fout → volgend domein
const KQ = {

// ══════════════════════════════════════════════════════
// ONDERWIJZEND PERSONEEL (OP)
// ══════════════════════════════════════════════════════
OP: {
  houding: [
    { lv:'A1', q:'Wat is een praktisch voordeel van Copilot bij lesvoorbereiding?',
      opts:['Je hoeft dan minder na te denken over de inhoud','Het genereert een starttekst of idee dat je kritisch beoordeelt en aanpast','De output is altijd direct klaar voor gebruik','Copilot maakt je volledige lesvoorbereiding overbodig'],
      c:1, exp:'✓ Copilot is een startpunt, geen eindproduct. De docent blijft verantwoordelijk: beoordelen, aanpassen en aansluiten bij je studenten.' },
    { lv:'A2', q:'Waarom is een open houding ten opzichte van digitale tools waardevol als docent?',
      opts:['Omdat de school dat verplicht stelt','Omdat digitale tools het onderwijs kunnen verrijken en je als docent het goede voorbeeld geeft aan studenten','Omdat studenten verwachten dat je altijd de nieuwste tools gebruikt','Omdat digitale tools het lesgeven makkelijker maken'],
      c:1, exp:'✓ Docenten zijn rolmodel. Een open, lerende houding inspireert studenten en collega\'s en draagt bij aan een digitale leercultuur.' },
    { lv:'B1', q:'Hoe toon je als docent eigen verantwoordelijkheid voor je digitale professionalisering?',
      opts:['Afwachten totdat de school een cursus aanbiedt','Zelf actief op zoek gaan naar leermogelijkheden, ook buiten verplichte scholing','Collega\'s vragen om jou bij te spijkeren','Digitale ontwikkeling overlaten aan de ICT-afdeling'],
      c:1, exp:'✓ Eigen regie over professionele ontwikkeling is een kenmerk van vakmanschap. Je wacht niet af, maar neemt het initiatief.' },
    { lv:'B2', q:'Hoe draag je als docent actief bij aan een digitale leercultuur in je team?',
      opts:['Door altijd de nieuwste tools te gebruiken, ook als het leereffect onduidelijk is','Door digitale vernieuwingen te mijden totdat de rest ze ook gebruikt','Door ervaringen en inzichten actief te delen, collega\'s te inspireren en initiatieven te nemen','Door studenten meer digitale huiswerkopdrachten te geven'],
      c:2, exp:'✓ Cultuurdragers delen kennis en inspireren anderen. Op B2-niveau ben jij de katalysator voor digitale groei in je team.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke digitale leeromgeving(en) gebruikt Mondriaan?',
      opts:['Google Classroom en Zoom','Microsoft Teams en bij sommige scholen Moodle','Blackboard en Skype','Canvas en Webex'],
      c:1, exp:'✓ Mondriaan werkt met Microsoft Teams als hoofdplatform. Bij sommige scholen is Moodle als leeromgeving in gebruik.' },
    { lv:'A2', q:'Wat is een goede manier om Copilot in te zetten als docent?',
      opts:['Een tentamen laten opstellen en dat ongewijzigd gebruiken','Een lesonderdeel laten genereren en dit daarna kritisch beoordelen en bijwerken','Studenten laten inloggen met jouw Copilot-account','Alle lesvoorbereiding volledig automatiseren via Copilot'],
      c:1, exp:'✓ Copilot is een startpunt, geen eindproduct. Controleer en pas altijd aan zodat de output aansluit bij jouw lesdoelen.' },
    { lv:'B1', q:'Wanneer maak je een bewuste digitale toolkeuze voor een les?',
      opts:['Als de school de tool heeft aanbevolen','Als collega\'s de tool ook gebruiken','Als je hebt nagedacht over hoe de tool het leerproces concreet ondersteunt bij het leerdoel','Als de tool gratis beschikbaar is voor studenten'],
      c:2, exp:'✓ Bewuste toolkeuze koppelt het digitale middel aan het pedagogische doel. Dat onderscheidt professioneel gebruik van toevallig gebruik.' },
    { lv:'B2', q:'Hoe gebruik je digitale data om je onderwijs structureel te verbeteren?',
      opts:['Je bekijkt de data eenmalig aan het einde van het schooljaar','Je verzamelt en analyseert data regelmatig en gebruikt die om je aanpak bij te sturen','Je stuurt de data door naar de teamleider zonder zelf conclusies te trekken','Data-analyse is een taak voor de onderwijskundige, niet voor de docent'],
      c:1, exp:'✓ Structureel data-gebruik betekent: regelmatig kijken, conclusies trekken en je aanpak aanpassen.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een digitaal betalingssysteem voor scholen','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een plagiaatchecker voor studentopdrachten','Een videoconferentietool'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het genereert tekst, beantwoordt vragen en ondersteunt taken op basis van je invoer.' },
    { lv:'A2', q:'Wat zegt de AVG over het invoeren van studentgegevens in externe AI-tools?',
      opts:['Dat is toegestaan zolang het voor onderwijsdoelen is','Persoonsgegevens mogen niet zonder passende verwerkersovereenkomst worden ingevoerd in externe AI-tools','De AVG geldt alleen voor zorginstellingen','Studenten moeten zelf toestemming geven in de tool'],
      c:1, exp:'✓ De AVG beschermt persoonsgegevens. Invoer in externe AI-tools zonder verwerkersovereenkomst is een privacyschending.' },
    { lv:'B1', q:'Welk systeem gebruikt Mondriaan als studentvolgsysteem?',
      opts:['Magister','SOMtoday','Osiris','ParnasSys'],
      c:2, exp:'✓ Mondriaan gebruikt Osiris voor het volgen van voortgang, resultaten en studieloopbaangegevens van studenten.' },
    { lv:'B2', q:'Welke AI-ontwikkeling is op dit moment relevant voor het MBO-onderwijs?',
      opts:['De opkomst van AI-tutors en de auteursrechtdiscussie rondom AI-gegenereerd lesmateriaal','De introductie van nieuwe digitale schoolborden','Het gebruik van QR-codes in lesmateriaal','De overstap van papieren naar digitale roosters'],
      c:0, exp:'✓ AI-tutors en auteursrechtdiscussies zijn actuele thema\'s die invloed hebben op didactische keuzes en schoolbeleid.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen studentgegevens invoeren in de gratis versie van Copilot?',
      opts:['Omdat de tool dan trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor persoonsgegevens onbedoeld worden gedeeld','Omdat Microsoft dit technisch heeft geblokkeerd','Omdat studenten dat vervelend vinden'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor verdere training. Persoonsgegevens invoeren is een schending van de AVG.' },
    { lv:'A2', q:'Hoe voer je een goed gesprek met studenten over verantwoord AI-gebruik?',
      opts:['Je legt uit dat AI altijd betrouwbare antwoorden geeft','Je legt de schoolafspraken uit en oefent samen het kritisch beoordelen van AI-output','Je verbiedt elk gebruik van Copilot bij opdrachten','Je delegeert dit gesprek aan de studiebegeleider'],
      c:1, exp:'✓ Studenten leren verantwoord AI-gebruik door het te bespreken, te oefenen en te reflecteren. Dat is een vakinhoudelijke taak van de docent.' },
    { lv:'B1', q:'Welke ethische aspecten zijn relevant bij AI-inzet in het onderwijs?',
      opts:['Alleen of de tool genoeg functies heeft','Privacy, bias in AI-uitkomsten, auteursrecht van gegenereerde content en impact op het leerproces','Of de leverancier een Nederlands bedrijf is','Alleen of de tool gratis is voor studenten'],
      c:1, exp:'✓ Privacy, bias, auteursrecht en leerimpact zijn alle relevante ethische factoren bij verantwoord AI-gebruik in de les.' },
    { lv:'B2', q:'Hoe draag je bij aan een ethische AI-cultuur op schoolniveau?',
      opts:['Door zelf geen AI te gebruiken als voorbeeld voor studenten','Door mee te schrijven aan richtlijnen, collega\'s te informeren en het gesprek over verantwoord gebruik actief aan te gaan','Door uitsluitend te vertrouwen op wat de ICT-afdeling communiceert','Door studenten te beoordelen op AI-gebruik zonder schoolbrede afspraken'],
      c:1, exp:'✓ Een ethische digitale cultuur vereist actieve inzet van iedereen: richtlijnen opstellen, kennis delen en het gesprek voeren.' },
  ],
  ped: [
    { lv:'A1', q:'Wanneer is het zinvol om een digitale tool in te zetten in de les?',
      opts:['Als er tijd over is na de reguliere les','Als de tool het leerproces concreet ondersteunt en aansluit bij het leerdoel','Als studenten erom vragen','Als de leverancier een gratis proefperiode aanbiedt'],
      c:1, exp:'✓ Digitale tools zijn middelen, geen doel op zich. De koppeling aan het leerdoel staat altijd centraal.' },
    { lv:'A2', q:'Hoe pas je je instructie aan als je een digitale tool gebruikt?',
      opts:['Je geeft dezelfde instructie als altijd, maar toont die op het scherm','Je denkt vooraf na over hoe de tool het leerproces ondersteunt en past je werkvorm en uitleg daarop aan','Je laat de tool zelf de instructie verzorgen','Je geeft geen instructie; studenten ontdekken de tool zelf'],
      c:1, exp:'✓ Bewuste aanpassing van instructie en werkvorm is de kern van pedagogisch-didactisch handelen met digitale tools.' },
    { lv:'B1', q:'Wat is formatieve evaluatie met digitale tools?',
      opts:['Een eindtoets die digitaal wordt afgenomen','Het gebruik van quizresultaten of voortgangsdata tijdens het leerproces om je les bij te sturen','Een digitale portfolio aan het einde van het schooljaar','Een schriftelijk verslag over digitaal leren'],
      c:1, exp:'✓ Formatieve evaluatie draait om bijsturen tijdens het leren. Digitale data helpen je snel en gericht te handelen.' },
    { lv:'B2', q:'Wat kenmerkt een rijke digitale leeropdracht?',
      opts:['Studenten kijken een instructievideo en vullen daarna een digitaal formulier in','Studenten werken actief en creatief met digitale tools om een authentiek probleem op te lossen','Studenten gebruiken een tool die de docent aanraadt','Studenten beantwoorden automatisch nagekeken meerkeuzevragen'],
      c:1, exp:'✓ Rijke digitale opdrachten activeren hogere denkvaardigheden: creëren, analyseren en samenwerken via digitale tools.' },
  ],
  student: [
    { lv:'A1', q:'Hoe reageer je als een student AI-tools ongeoorloofd inzet bij een opdracht?',
      opts:['Je negeert het, want het is moeilijk te bewijzen','Je spreekt de student aan en voert een gesprek over hoe de opdracht tot stand is gekomen','Je geeft direct een onvoldoende','Je informeert de ICT-afdeling en doet verder niets'],
      c:1, exp:'✓ Een open gesprek is het vertrekpunt. Zo ontdek je het leerproces en kun je samen afspreken hoe AI verantwoord wordt ingezet.' },
    { lv:'A2', q:'Hoe leer je studenten online bronnen kritisch te beoordelen?',
      opts:['Je vertelt ze dat Wikipedia altijd klopt','Je oefent samen: studenten analyseren bronnen op auteur, datum, doel en vergelijken meerdere bronnen','Je geeft een lijst van goedgekeurde websites','Je vraagt de bibliotheek om dit te verzorgen'],
      c:1, exp:'✓ Kritisch brongebruik is een vaardigheid die je oefent door bronnen actief te analyseren, vergelijken en beargumenteren.' },
    { lv:'B1', q:'Hoe integreer je digitale vaardigheidsontwikkeling bewust in je lessen?',
      opts:['Door elke les een digitale tool toe te voegen, ongeacht het leerdoel','Door vooraf te bepalen welke digitale vaardigheid je wilt oefenen en dit te koppelen aan het vakinhoudelijke leerdoel','Door studenten vrij te laten in hun toolkeuze','Door digitale vaardigheden als apart vak te behandelen'],
      c:1, exp:'✓ Bewuste integratie betekent: digitale vaardigheden koppelen aan vakinhoud en er expliciet op reflecteren.' },
    { lv:'B2', q:'Hoe bereid je studenten voor op de digitale eisen van hun toekomstige beroep?',
      opts:['Door ze altijd de nieuwste tools te laten gebruiken, ongeacht de beroepsrelevantie','Door te onderzoeken welke digitale vaardigheden echt nodig zijn in het beroep en dit bewust te trainen, inclusief verantwoord AI-gebruik','Door ze een digitaal portfolio bij te laten houden','Door vrijblijvend kennis te laten maken met AI-tools'],
      c:1, exp:'✓ Beroepsrelevante digitale voorbereiding vraagt inzicht in de beroepspraktijk en bewuste keuzes in wat en hoe je oefent.' },
  ],
},

// ══════════════════════════════════════════════════════
// DIRECT ONDERWIJSONDERSTEUNEND (DOP)
// ══════════════════════════════════════════════════════
DOP: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot als onderwijsondersteuner het beste inzetten?',
      opts:['Voor het zelfstandig voeren van begeleidingsgesprekken','Voor het schrijven van begeleidingsteksten of snel opzoeken van informatie','AI-tools zijn alleen nuttig voor docenten, niet voor begeleiders','Om studentdossiers automatisch bij te werken'],
      c:1, exp:'✓ Copilot ondersteunt schrijf- en informatietaken. De begeleider blijft verantwoordelijk voor het contact met de student.' },
    { lv:'A2', q:'Waarom is digitale kennis nuttig voor jouw werk als onderwijsondersteuner?',
      opts:['Zodat je studenten kunt begeleiden bij digitale vragen en digitale tools kunt benutten in je werk','Omdat het verplicht is gesteld door de school','Zodat je docenten kunt vervangen in de les','Dat is niet direct nuttig in een ondersteuningsrol'],
      c:0, exp:'✓ Digitale kennis maakt je effectiever: je begrijpt de digitale context van studenten en kunt hen gerichter ondersteunen.' },
    { lv:'B1', q:'Hoe toon je verantwoordelijkheid voor je eigen digitale ontwikkeling als begeleider?',
      opts:['Je wacht op een scholingsaanbod van de school','Je zoekt zelf naar leermogelijkheden en leert ook van collega\'s en studenten, zonder verplichte training af te wachten','Je vraagt studenten om jou bij te leren over digitale tools','Je laat digitale ontwikkeling over aan de ICT-afdeling'],
      c:1, exp:'✓ Eigen regie over professionele ontwikkeling is een teken van vakmanschap. Je wacht niet af, maar neemt zelf het initiatief.' },
    { lv:'B2', q:'Hoe draag jij actief bij aan een digitale leercultuur in je team?',
      opts:['Door het goede voorbeeld te geven maar niets te delen','Door ervaringen en tips actief te delen, collega\'s te betrekken en initiatieven te stimuleren','Door te wachten totdat collega\'s zelf om hulp vragen','Door digitale tools zoveel mogelijk te vermijden'],
      c:1, exp:'✓ Cultuurdragers delen kennis actief en betrekken anderen. Op B2-niveau ben jij een drijvende kracht in de digitale ontwikkeling van je team.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke digitale systemen gebruikt Mondriaan voor begeleidingswerk?',
      opts:['Google Workspace en Zoom','Microsoft Teams en Osiris','Blackboard en SOMtoday','Canvas en Magister'],
      c:1, exp:'✓ Bij Mondriaan werk je met Microsoft Teams voor communicatie en begeleiding. Osiris is het studentvolgsysteem.' },
    { lv:'A2', q:'Hoe kun je Copilot zinvol inzetten in je begeleidingswerk?',
      opts:['Door studentspecifieke adviezen te genereren op basis van hun persoonsgegevens','Door Copilot te gebruiken voor het schrijven van begeleidingsteksten of het snel opzoeken van informatie','Door in te loggen op het Copilot-account van een student','Door Copilot persoonlijke begeleidingsgesprekken te laten voeren'],
      c:1, exp:'✓ Copilot kan helpen bij schrijf- en informatietaken. Voer nooit persoonsgegevens in en controleer altijd de output.' },
    { lv:'B1', q:'Wat kenmerkt gericht gebruik van digitale tools in de begeleiding?',
      opts:['Je gebruikt altijd dezelfde tools, ongeacht de begeleidingsvraag','Je kiest bewust een tool die aansluit bij de specifieke begeleidingsvraag en de behoeften van de student','Je gebruikt tools alleen als studenten erom vragen','Je overlegt altijd met ICT voordat je een tool inzet'],
      c:1, exp:'✓ Gericht gebruik betekent: de begeleidingsvraag centraal stellen en de tool kiezen die daarbij het best past.' },
    { lv:'B2', q:'Hoe gebruik je Osiris structureel in de begeleiding van studenten?',
      opts:['Je kijkt eenmalig aan het begin van het schooljaar in Osiris','Je raadpleegt Osiris regelmatig om voortgang te monitoren en je begeleiding bij te sturen op basis van actuele data','Je vertrouwt op wat studenten zelf vertellen over hun voortgang','Je vraagt docenten om de relevante data door te geven'],
      c:1, exp:'✓ Structureel gebruik van Osiris geeft je een feitelijk beeld van de studentvoortgang, zodat je gericht en tijdig kunt bijsturen.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een digitaal betalingssysteem voor scholen','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een plagiaatchecker voor studentopdrachten','Een videoconferentietool'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het genereert tekst, beantwoordt vragen en ondersteunt taken op basis van je invoer.' },
    { lv:'A2', q:'Wat geldt voor het gebruik van studentgegevens in digitale begeleidingssystemen?',
      opts:['Studentgegevens mogen vrij worden gedeeld als het de begeleiding ten goede komt','Je werkt uitsluitend in de daarvoor goedgekeurde systemen en deelt nooit persoonsgegevens via onbeveiligde kanalen','De AVG geldt niet voor begeleidingsgesprekken','Studenten moeten altijd schriftelijk toestemming geven'],
      c:1, exp:'✓ De AVG verplicht je om zorgvuldig om te gaan met studentgegevens. Gebruik alleen goedgekeurde systemen en beveiligde kanalen.' },
    { lv:'B1', q:'Welk systeem gebruikt Mondriaan als studentvolgsysteem?',
      opts:['Magister','SOMtoday','Osiris','ParnasSys'],
      c:2, exp:'✓ Mondriaan gebruikt Osiris voor het volgen van voortgang, resultaten en studieloopbaangegevens van studenten.' },
    { lv:'B2', q:'Welke digitale ontwikkeling is op dit moment relevant voor begeleidingswerk in het MBO?',
      opts:['AI-tools die studenten ondersteunen bij zelfstudie en uitdagingen rondom digitale zelfredzaamheid','Nieuwe digitale roosters','QR-codes in begeleidingsgesprekken','Digitale vergadertools voor personeelsvergaderingen'],
      c:0, exp:'✓ AI-tutors en digitale zelfredzaamheid van studenten zijn actuele thema\'s die direct raken aan jouw begeleidingsrol.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen persoonsgegevens van studenten invoeren in de gratis versie van Copilot?',
      opts:['Omdat de tool dan trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor persoonsgegevens onbedoeld worden gedeeld','Omdat Microsoft dit technisch heeft geblokkeerd','Omdat studenten dat vervelend vinden'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor verdere training. Persoonsgegevens invoeren is een schending van de AVG.' },
    { lv:'A2', q:'Hoe ga je veilig om met studentgegevens in jouw werk?',
      opts:['Je deelt voortgangsgegevens via WhatsApp omdat dat sneller is','Je werkt uitsluitend in de goedgekeurde systemen en deelt geen persoonsgegevens via onbeveiligde kanalen','Je slaat studentgegevens op in een gratis cloud-app voor gemak','Je volgt wat collega\'s doen zonder zelf te controleren of het veilig is'],
      c:1, exp:'✓ Veilig werken met studentgegevens betekent: alleen goedgekeurde systemen gebruiken en geen gegevens delen via niet-beveiligde kanalen.' },
    { lv:'B1', q:'Welke ethische aspecten zijn van belang bij het gebruik van data in de begeleiding?',
      opts:['Alleen of de data klopt','Privacy van de student, doelmatigheid van datagebruik en of AI-advies menselijk oordeel vervangt of aanvult','Of de data makkelijk te exporteren is','Alleen of studenten toestemming hebben gegeven via een pop-up'],
      c:1, exp:'✓ Privacy, doelmatigheid en de balans tussen AI-advies en menselijk oordeel zijn centrale ethische overwegingen in de begeleiding.' },
    { lv:'B2', q:'Hoe draag je bij aan een ethische digitale cultuur in je team?',
      opts:['Door zelf geen digitale tools te gebruiken als voorbeeld','Door collega\'s te informeren over verantwoord datagebruik en mee te denken over richtlijnen voor jouw afdeling','Door te vertrouwen op wat de ICT-afdeling communiceert','Door individueel te handelen zonder overleg met anderen'],
      c:1, exp:'✓ Een ethische digitale cultuur vraagt actieve bijdrage van iedereen: kennis delen, richtlijnen ondersteunen en het gesprek aangaan.' },
  ],
  ped: [
    { lv:'A1', q:'Wanneer zet je een digitale tool in tijdens een begeleidingsactiviteit?',
      opts:['Als er tijd over is aan het einde van het gesprek','Als de tool de begeleidingsvraag van de student concreet ondersteunt','Als de student erom vraagt','Als de tool door de school is aanbevolen'],
      c:1, exp:'✓ Digitale tools zijn middelen. Ze zijn zinvol als ze de begeleidingsvraag concreet ondersteunen.' },
    { lv:'A2', q:'Hoe sluit je in je begeleiding aan op de digitale situatie van een student?',
      opts:['Je geeft altijd dezelfde begeleiding, want digitale tools veranderen niets','Je onderzoekt welke tools en systemen de student gebruikt en sluit aan bij diens digitale context','Je vraagt ICT om uitleg te geven aan de student','Je stuurt de student altijd door naar een docent voor digitale vragen'],
      c:1, exp:'✓ Effectieve begeleiding houdt rekening met de digitale context van de student. Aansluiten bij diens situatie maakt de begeleiding relevanter.' },
    { lv:'B1', q:'Wat is het voordeel van Osiris-data bij de begeleiding van studenten?',
      opts:['Je hoeft dan minder gesprekken te voeren','Je krijgt een feitelijk beeld van de voortgang van de student, zodat je gericht kunt bijsturen en het gesprek beter kunt voorbereiden','Je kunt studenten automatisch doorsturen naar hulpverlening','Data is minder betrouwbaar dan wat studenten zelf vertellen'],
      c:1, exp:'✓ Osiris-data biedt een objectief beeld van de studentvoortgang, waarmee je gerichter en feitelijk kunt begeleiden.' },
    { lv:'B2', q:'Hoe richt je begeleiding in die ook de digitale zelfredzaamheid van studenten bevordert?',
      opts:['Door studenten altijd direct te helpen als ze ergens niet uitkomen','Door begeleiding zo in te richten dat studenten zelf leren omgaan met digitale tools en problemen','Door digitale zelfredzaamheid als aparte competentie in het portfolio te benoemen','Door studenten een digitale tool te laten kiezen zonder verdere ondersteuning'],
      c:1, exp:'✓ Zelfredzaamheidsgericht begeleiden betekent: niet het probleem overnemen, maar de student leren zelf te navigeren.' },
  ],
  student: [
    { lv:'A1', q:'Hoe help je een student die vastloopt met een digitaal systeem?',
      opts:['Je lost het probleem direct voor de student op zodat hij snel verder kan','Je helpt de student stap voor stap op weg en legt uit wat je doet, zodat hij het volgende keer zelf kan','Je stuurt de student direct door naar de ICT-helpdesk','Je geeft aan dat digitale problemen buiten jouw taak vallen'],
      c:1, exp:'✓ Stap-voor-stap begeleiden bouwt digitale zelfredzaamheid op. De student leert het probleem de volgende keer zelf te herkennen en op te lossen.' },
    { lv:'A2', q:'Hoe stimuleer je digitale zelfredzaamheid bij studenten?',
      opts:['Door digitale problemen altijd voor hen op te lossen','Door studenten te begeleiden bij het zelf vinden van oplossingen voor digitale obstakels','Door te verwachten dat ICT dit verzorgt','Door docenten te vragen studenten hierin te helpen'],
      c:1, exp:'✓ Zelfredzaamheid groeit door te doen en te leren van fouten, niet door het altijd voor iemand op te lossen.' },
    { lv:'B1', q:'Hoe integreer je digitale vaardigheidsontwikkeling bewust in je begeleidingswerk?',
      opts:['Je benoemt digitale vaardigheden alleen als studenten er zelf over beginnen','Je bouwt bewust momenten in waarbij studenten een digitale vaardigheid oefenen, gekoppeld aan hun begeleidingsdoel','Je laat digitale vaardigheidsontwikkeling over aan docenten','Je geeft aparte digitale trainingen naast de reguliere begeleiding'],
      c:1, exp:'✓ Bewuste integratie betekent: digitale vaardigheidsontwikkeling verbinden met de begeleidingsdoelen en er expliciet aandacht voor vragen.' },
    { lv:'B2', q:'Hoe bereid je studenten voor op de digitale eisen van de beroepspraktijk?',
      opts:['Door vrijblijvend kennis te laten maken met digitale tools','Door te onderzoeken welke digitale vaardigheden nodig zijn in het beroep en dit bewust te integreren in de begeleiding','Door een digitaal portfolio bij te laten houden','Door studenten de nieuwste tools te laten testen zonder koppeling aan het beroep'],
      c:1, exp:'✓ Beroepsrelevante digitale voorbereiding vraagt inzicht in de beroepspraktijk en bewuste keuzes in wat je oefent.' },
  ],
},

// ══════════════════════════════════════════════════════
// INDIRECT ONDERWIJSONDERSTEUNEND (IOP)
// ══════════════════════════════════════════════════════
IOP: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot het beste inzetten in een ondersteunende functie?',
      opts:['Voor het automatisch nemen van besluiten over personeelszaken','Voor het schrijven van teksten, samenvatten van documenten of opstellen van e-mails','Copilot is niet nuttig in een ondersteunende functie','Voor het beheren van financiële administratie zonder menselijk toezicht'],
      c:1, exp:'✓ Copilot verlicht schrijf- en samenvattingstaken. Controleer altijd de output en voer nooit vertrouwelijke gegevens in.' },
    { lv:'A2', q:'Waarom zijn digitale vaardigheden relevant in een ondersteunende functie?',
      opts:['Omdat alle systemen nu digitaal zijn en digitale vaardigheden je werk efficiënter, nauwkeuriger en toekomstbestendiger maken','Omdat de school het verplicht stelt','Alleen voor collega\'s die veel met studenten werken','Digitale vaardigheden zijn alleen relevant voor ICT-medewerkers'],
      c:0, exp:'✓ In een ondersteunende functie bepalen digitale vaardigheden hoe efficiënt en nauwkeurig je kunt werken. Het is een basisvereiste, geen luxe.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je digitale professionalisering?',
      opts:['Je wacht op scholingsaanbod van de school','Je zoekt zelf naar nieuwe tools en werkwijzen die jouw werk effectiever maken, ook buiten verplichte training','Je vraagt de ICT-afdeling om je bij te spijkeren','Je vindt het voldoende om bij te blijven met wat je al kunt'],
      c:1, exp:'✓ Eigen regie over je professionele ontwikkeling is een kenmerk van vakmanschap, ook voor ondersteunend personeel.' },
    { lv:'B2', q:'Hoe deel je je digitale kennis actief met collega\'s?',
      opts:['Door te wachten totdat collega\'s je iets vragen','Door tips, werkwijzen en tools spontaan te delen via overleg, e-mail of een korte demo','Door je kennis voor jezelf te houden zodat je een voordeel behoudt','Door alleen te delen als er een training voor georganiseerd wordt'],
      c:1, exp:'✓ Actief kennisdelen maakt teams sterker. Op B2-niveau ben jij een bron van digitale kennis voor collega\'s.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke digitale communicatietool gebruikt Mondriaan primair voor intern overleg?',
      opts:['Google Meet','Microsoft Teams','Skype','Zoom'],
      c:1, exp:'✓ Mondriaan gebruikt Microsoft Teams als primaire tool voor interne communicatie, vergaderingen en samenwerking.' },
    { lv:'A2', q:'Voor welke taken kun je Copilot zinvol inzetten in een ondersteunende functie?',
      opts:['Voor het automatisch verwerken van persoonsgegevens van medewerkers','Voor het schrijven van teksten, samenvatten van documenten of opstellen van e-mails','Voor het nemen van beslissingen over personeelszaken','Voor het beheren van de financiële administratie zonder menselijk toezicht'],
      c:1, exp:'✓ Copilot is handig bij schrijf- en samenvattingstaken. Controleer altijd de output en voer nooit vertrouwelijke of persoonsgebonden gegevens in.' },
    { lv:'B1', q:'Hoe maak je terugkerende digitale werkprocessen efficiënter?',
      opts:['Door ze altijd handmatig uit te voeren voor maximale controle','Door te onderzoeken welke stappen geautomatiseerd of vereenvoudigd kunnen worden en dit in te richten','Door deze taken te delegeren aan een studentassistent','Door altijd toestemming te vragen aan je leidinggevende voordat je iets aanpast'],
      c:1, exp:'✓ Procesinzicht en automatisering zijn kernvaardigheden van een B1-professional. Zoek actief naar slimmere werkwijzen.' },
    { lv:'B2', q:'Wat is het doel van het bouwen van dashboards of rapportages in jouw werk?',
      opts:['Indruk maken op leidinggevenden','Werkresultaten zichtbaar en bespreekbaar maken zodat er onderbouwde keuzes gemaakt kunnen worden','Het vermijden van directe verantwoording','Voldoen aan een formele verplichting'],
      c:1, exp:'✓ Dashboards en rapportages maken werk inzichtelijk. Ze ondersteunen onderbouwde beslissingen en verbeteren de communicatie met leidinggevenden.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een digitaal betalingssysteem voor scholen','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een plagiaatchecker','Een videoconferentietool'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het genereert tekst, beantwoordt vragen en ondersteunt taken op basis van je invoer.' },
    { lv:'A2', q:'Welke gegevens mag je NIET invoeren in een gratis AI-tool zoals Copilot?',
      opts:['Je eigen naam','Persoonsgegevens van medewerkers, studenten of de organisatie','Een vraag over digitale tools','Een tekst zonder persoonsgegevens die je wilt laten controleren'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor training. Voer nooit persoonsgegevens, financiële of vertrouwelijke organisatiegegevens in.' },
    { lv:'B1', q:'Waarom is kennis van het privacybeleid van de school belangrijk in een ondersteunende functie?',
      opts:['Het is interessant maar niet nodig voor dagelijkse werkzaamheden','Het stelt je in staat om veilig en correct om te gaan met gevoelige gegevens van medewerkers, studenten en de organisatie','Dat is uitsluitend de verantwoordelijkheid van HR of ICT','Alleen directieleden hoeven het privacybeleid te kennen'],
      c:1, exp:'✓ Als je dagelijks werkt met gevoelige gegevens, is kennis van het privacybeleid essentieel om fouten en overtredingen te voorkomen.' },
    { lv:'B2', q:'Wat verplicht de NIS2-richtlijn onderwijsinstellingen te doen?',
      opts:['Alle AI-tools verbieden','Cybersecurity serieus nemen: risico\'s beheren, incidenten melden en medewerkers trainen','Jaarlijks rapporteren aan de Europese Commissie','Uitsluitend gebruik maken van Europese software'],
      c:1, exp:'✓ NIS2 verplicht organisaties, ook onderwijsinstellingen, om cybersecurity structureel aan te pakken en digitale incidenten te melden.' },
  ],
  ethiek: [
    { lv:'A1', q:'Wat is een sterk wachtwoord?',
      opts:['Je naam gevolgd door je geboortejaar','Het woord "Wachtwoord!" met een uitroepteken','Een unieke combinatie van minimaal 12 tekens: letters, cijfers en symbolen','Hetzelfde wachtwoord overal gebruiken zodat je het niet vergeet'],
      c:2, exp:'✓ Een sterk wachtwoord is lang (12+), uniek per account en bevat een mix van tekens. Een wachtwoordmanager helpt je ze te beheren.' },
    { lv:'A2', q:'Wat is tweestapsverificatie (2FA)?',
      opts:['Je wachtwoord twee keer invoeren','Een extra verificatiestap naast je wachtwoord, zoals een app-code of sms-code','Twee wachtwoorden aanmaken voor één account','Je account delen met een vertrouwde collega als backup'],
      c:1, exp:'✓ 2FA voegt een extra beveiligingslaag toe. Zelfs als iemand je wachtwoord kent, kan hij zonder de tweede factor niet inloggen.' },
    { lv:'B1', q:'Wat doe je voordat je gegevens deelt of invoert in een digitaal systeem?',
      opts:['Je gaat ervan uit dat het mag tenzij iemand het verbiedt','Je denkt bewust na: zijn deze gegevens noodzakelijk, is het systeem goedgekeurd en mag ik ze verwerken?','Je vraagt altijd toestemming aan de ICT-afdeling','Je deelt alleen gegevens als je leidinggevende het expliciet vraagt'],
      c:1, exp:'✓ Bewust nadenken over datadeling is een kerncompetentie op B1-niveau. Privacy by design begint bij jou.' },
    { lv:'B2', q:'Hoe adviseer je collega\'s over veilig gebruik van digitale tools?',
      opts:['Door ze een lijst van verboden tools te sturen','Door actief te signaleren als je onveilig gedrag ziet en collega\'s praktisch te helpen met veilige alternatieven','Door het door te geven aan ICT en zelf niets te doen','Door een werkgroep te starten maar zelf geen standpunt in te nemen'],
      c:1, exp:'✓ Actief adviseren over veiligheid is een B2-competentie. Je combineert kennis met de bereidheid om anderen te helpen veiliger te werken.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je digitale tools actief om je werkprocessen te verbeteren?',
      opts:['Je gebruikt alleen de tools die je al kende toen je begon','Je onderzoekt welke tools jouw werk efficiënter of beter maken en zet ze gericht in','Je vermijdt nieuwe tools om fouten te voorkomen','Je vraagt ICT om tools te selecteren en in te richten'],
      c:1, exp:'✓ Proactief digitaal werken betekent: tools inzetten die jouw werk concreet verbeteren, niet vasthouden aan wat je al kent.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in een digitaal werkproces?',
      opts:['Je houdt het voor jezelf om geen problemen te veroorzaken','Je deelt het verbeterpunt met je leidinggevende of collega\'s en denkt mee over een oplossing','Je past het zelf aan zonder anderen te informeren','Je wacht totdat iemand anders het opmerkt'],
      c:1, exp:'✓ Verbeterpunten signaleren en delen is een professionele bijdrage. Op A2-niveau heb je het initiatief om dit te doen.' },
    { lv:'B1', q:'Hoe neem je initiatief bij het verbeteren van digitale werkprocessen in je team?',
      opts:['Je werkt mee als anderen het initiatief nemen','Je signaleert knelpunten, brengt verbetervoorstellen in en trekt mee aan de uitvoering','Je overlegt eerst met alle betrokkenen voordat je ook maar één stap zet','Je wacht op instructie van je leidinggevende'],
      c:1, exp:'✓ Initiatief nemen in procesverbetering is een kenmerk van B1-professioneel handelen: je signaleert, denkt mee en handelt.' },
    { lv:'B2', q:'Wat kenmerkt het leiden of coördineren van een digitaal verbeterproject?',
      opts:['Je delegeert alles aan collega\'s en bewaakt de voortgang op afstand','Je brengt structuur aan, verbindt mensen met verschillende expertise, bewaakt de voortgang en rapporteert aan betrokkenen','Je voert het project volledig zelfstandig uit zonder anderen te betrekken','Je zorgt dat alle betrokkenen het eens zijn voordat er iets wordt besloten'],
      c:1, exp:'✓ Projectleiderschap vraagt structuur, verbinding en communicatie. Op B2 ben je degene die het geheel overziet en stuurt.' },
  ],
  student: [
    { lv:'A1', q:'Hoe reageer je als een collega vastloopt met een digitaal systeem?',
      opts:['Je geeft aan dat dat niet jouw verantwoordelijkheid is','Je helpt de collega op weg en legt uit wat je doet, zodat hij het volgende keer zelf kan','Je lost het altijd direct voor de collega op','Je stuurt de collega direct door naar de ICT-helpdesk'],
      c:1, exp:'✓ Collega\'s helpen bij digitale problemen is een basisvorm van bijdragen aan de digitale ontwikkeling van het team.' },
    { lv:'A2', q:'Hoe deel je handige digitale werkwijzen actief met collega\'s?',
      opts:['Alleen als er een formele kennisdeelsessie is gepland','Via een informeel bericht, een korte demo of een tip in een overleg als je iets nuttigs ontdekt','Alleen als collega\'s er specifiek naar vragen','Door een handleiding te maken maar die niet actief te verspreiden'],
      c:1, exp:'✓ Actief kennisdelen hoeft niet formeel te zijn. Een korte tip of demo in een overleg kan al heel effectief zijn.' },
    { lv:'B1', q:'Hoe draag je structureel bij aan de digitale ontwikkeling van je team?',
      opts:['Door eenmalig een training te geven','Door continu te signaleren waar digitale kennis of tools ontbreken en hier actief op in te spelen','Door te wachten totdat een leidinggevende een ontwikkelplan maakt','Door alleen je eigen vaardigheden te verbeteren'],
      c:1, exp:'✓ Structurele bijdrage betekent: blijven signaleren, verbinden en initiëren, niet eenmalig actie ondernemen.' },
    { lv:'B2', q:'Hoe vertaal je digitale inzichten naar concrete verbetervoorstellen voor de organisatie?',
      opts:['Door inzichten te verzamelen maar ze voor jezelf te houden','Door patronen en knelpunten te analyseren en dit te vertalen naar heldere, uitvoerbare voorstellen voor leidinggevenden of beleidsmakers','Door alles door te sturen naar ICT','Door verbetervoorstellen op te schrijven maar ze niet te delen'],
      c:1, exp:'✓ Inzichten omzetten naar verbetervoorstellen vraagt analyse, heldere communicatie en moed om het gesprek aan te gaan.' },
  ],
},

// ══════════════════════════════════════════════════════
// DIRECTIE & MANAGEMENT (MAN)
// ══════════════════════════════════════════════════════
MAN: {
  houding: [
    { lv:'A1', q:'Hoe kan een leidinggevende Copilot praktisch inzetten?',
      opts:['Voor het automatisch beoordelen van medewerkers','Voor het schrijven van beleidsteksten, samenvatten van rapporten of voorbereiden van vergaderingen','Voor het nemen van personele beslissingen','Copilot is alleen nuttig voor docenten in de klas'],
      c:1, exp:'✓ Copilot ondersteunt tekst- en samenvattingstaken. Als leidinggevende gebruik je het als hulpmiddel, niet als beslisser.' },
    { lv:'A2', q:'Wat houdt een open houding ten opzichte van digitale ontwikkeling in voor een leidinggevende?',
      opts:['Altijd de nieuwste technologie aanschaffen voor het team','Actief nieuwsgierig zijn naar digitale mogelijkheden en je team uitnodigen om te verkennen en te experimenteren','Afwachten welke tools de markt aandraagt','Digitale ontwikkeling uitsluitend overlaten aan de ICT-afdeling'],
      c:1, exp:'✓ Als leidinggevende geef je het voorbeeld. Een open, nieuwsgierige houding inspireert je team om ook te blijven leren.' },
    { lv:'B1', q:'Hoe zet je je actief in voor digitale professionalisering van je team?',
      opts:['Je verstuurt een nieuwsbrief over beschikbare cursussen','Je creëert ruimte en middelen voor leren, bespreekt digitale ontwikkeling structureel en verbindt het aan teamdoelen','Je verwacht dat medewerkers zelf actie nemen als ze willen groeien','Je bestelt een e-learningpakket en laat het daarvoor zorgen'],
      c:1, exp:'✓ Actieve inzet voor professionalisering vraagt structurele aandacht: ruimte bieden, het gesprek aangaan en koppelen aan teamambities.' },
    { lv:'B2', q:'Hoe creëer je als leidinggevende een cultuur van digitaal leren en experimenteren?',
      opts:['Door perfecte resultaten te eisen voordat nieuwe tools ingevoerd worden','Door experimenten te stimuleren, fouten te normaliseren als leerkansen en digitale groei zichtbaar te belonen','Door te wachten totdat de organisatie een digitale strategie heeft vastgesteld','Door zelf altijd te bepalen welke tools het team gebruikt'],
      c:1, exp:'✓ Een leercultuur vraagt psychologische veiligheid: fouten maken mag, experimenteren wordt gestimuleerd en groei wordt gewaardeerd.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke tool van Microsoft ondersteunt managementtaken zoals vergaderen, beleidsteksten en teamcommunicatie?',
      opts:['OneDrive','Microsoft Teams','Excel','SharePoint'],
      c:1, exp:'✓ Microsoft Teams is de centrale hub voor communicatie, vergaderen en samenwerken bij Mondriaan.' },
    { lv:'A2', q:'Hoe zet je Copilot zinvol in voor managementtaken?',
      opts:['Voor het automatisch nemen van beslissingen over personeel','Voor het schrijven van beleids- of rapportageteksten, samenvattingen van vergaderingen of voorbereiding van gesprekken','Voor het inloggen namens medewerkers op systemen','Voor het genereren van functioneringsbeoordelingen zonder menselijk oordeel'],
      c:1, exp:'✓ Copilot ondersteunt schrijf- en samenvattingstaken. Controleer altijd de output en gebruik het als hulpmiddel, niet als beslisser.' },
    { lv:'B1', q:'Hoe onderbouw je beslissingen met data als leidinggevende?',
      opts:['Je vertrouwt op je ervaring en intuïtie','Je verzamelt relevante data, analyseert deze en gebruikt de inzichten om beslissingen te onderbouwen en transparant te maken','Je vraagt de ICT-afdeling om rapporten te maken','Je gebruikt data alleen bij conflicten'],
      c:1, exp:'✓ Data-gedreven leiderschap betekent: feiten combineren met inzicht en beslissingen transparant onderbouwen.' },
    { lv:'B2', q:'Waarvoor gebruik je digitale dashboards of analyses als leidinggevende?',
      opts:['Om medewerkers te controleren','Om de voortgang, werkdruk en het welzijn van het team te monitoren en tijdig bij te sturen','Om indruk te maken op het bestuur','Alleen voor het jaarverslag'],
      c:1, exp:'✓ Dashboards geven je als leidinggevende inzicht om proactief te handelen, niet reactief. Ze ondersteunen goed leiderschap.' },
  ],
  kennis: [
    { lv:'A1', q:'Waarom is het als leidinggevende relevant om te weten welke AI-tools medewerkers en studenten gebruiken?',
      opts:['Zodat je ze kunt verbieden','Zodat je bewuste keuzes kunt maken over beleid, risico\'s kunt inschatten en gericht kunt ondersteunen','Dat is niet relevant voor een leidinggevende','Alleen om te rapporteren aan het bestuur'],
      c:1, exp:'✓ Inzicht in toolgebruik stelt je in staat om beleid te onderbouwen, risico\'s te beheersen en medewerkers effectief te ondersteunen.' },
    { lv:'A2', q:'Wat verplicht de NIS2-richtlijn organisaties in de onderwijssector?',
      opts:['Alle AI-tools direct te verbieden','Cybersecurity te borgen: risico\'s beheren, incidenten melden en medewerkers trainen in digitale veiligheid','Alleen gebruik te maken van Europese software','Jaarlijks een digitale audit uit te laten voeren door een extern bureau'],
      c:1, exp:'✓ NIS2 verplicht organisaties, ook onderwijsinstellingen, om cybersecurity structureel te borgen en digitale incidenten te melden.' },
    { lv:'B1', q:'Wat betekent het voor een MBO als een AI-systeem als hoog-risico wordt geclassificeerd onder de EU AI Act?',
      opts:['Niets, de wet geldt alleen voor AI-ontwikkelaars','Je moet als organisatie menselijk toezicht waarborgen, documentatie bijhouden en een verantwoordelijke aanwijzen','Je moet de AI-tool direct verwijderen','Je moet wachten op instructies van het ministerie'],
      c:1, exp:'✓ De EU AI Act legt verplichtingen op aan organisaties die hoog-risico AI inzetten: toezicht, documentatie en accountability zijn wettelijk vereist.' },
    { lv:'B2', q:'Welk beleidskader is relevant voor strategische beslissingen over AI in het onderwijs?',
      opts:['Alleen het schoolreglement','De EU AI Act en het nationale beleidskader AI in het MBO, aangevuld met de NIS2-richtlijn voor digitale veiligheid','Alleen wat de leverancier van de AI-tool aangeeft','Het ICT-beheerplan van de school'],
      c:1, exp:'✓ Strategische AI-beslissingen vereisen kennis van meerdere beleidskaders: EU AI Act, NIS2 en nationaal onderwijsbeleid rondom AI.' },
  ],
  ethiek: [
    { lv:'A1', q:'Welke digitale risico\'s moet een leidinggevende kennen?',
      opts:['Alleen technische storingen','Datalekken, phishing, ransomware en risico\'s van onverantwoord AI-gebruik door medewerkers of studenten','Alleen risico\'s die ICT heeft gemeld','Risico\'s zijn uitsluitend de verantwoordelijkheid van de ICT-afdeling'],
      c:1, exp:'✓ Als leidinggevende ben jij verantwoordelijk voor de digitale veiligheid van je team. Kennis van risico\'s is daarvoor een vereiste.' },
    { lv:'A2', q:'Hoe borg je cybersecurity en privacybescherming in het beleid van je team?',
      opts:['Door het volledig te delegeren aan de ICT-afdeling','Door concrete afspraken te maken, bewustwording te stimuleren en cybersecurity structureel op de agenda te zetten','Door alleen te reageren als er incidenten zijn','Door medewerkers individueel verantwoordelijk te stellen'],
      c:1, exp:'✓ Borging vraagt structurele aandacht: afspraken, bewustwording en een cultuur waarbij digitale veiligheid serieus wordt genomen.' },
    { lv:'B1', q:'Hoe bespreek je digitale veiligheidsrisico\'s structureel met je team?',
      opts:['Alleen als er een groot incident is geweest','Structureel in overleggen, op basis van actuele signalen en geleerde lessen, zodat het team blijft leren','Door incidenten te rapporteren aan ICT maar er intern niet over te spreken','Door medewerkers individueel aan te spreken zonder teamdiscussie'],
      c:1, exp:'✓ Structurele bespreking van risico\'s bouwt bewustwording op en creëert een cultuur waarin problemen veilig gemeld worden.' },
    { lv:'B2', q:'Hoe verankert een leidinggevende ethische richtlijnen voor AI-gebruik in het beleid van de afdeling?',
      opts:['Door een lijst van verboden AI-tools te publiceren','Door samen met het team richtlijnen op te stellen, deze te integreren in werkafspraken en het gesprek over ethisch gebruik te blijven voeren','Door te wachten op schoolbrede richtlijnen van het bestuur','Door medewerkers te verplichten een externe AI-cursus te volgen'],
      c:1, exp:'✓ Ethische richtlijnen verankeren vraagt co-creatie, integratie in werkprocessen en een cultuur van reflectie op AI-gebruik.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe stimuleer je medewerkers actief om digitale tools te leren gebruiken?',
      opts:['Door te verwachten dat ze dit zelf regelen','Door het goede voorbeeld te geven, ruimte te bieden en digitale groei te benoemen als teamdoelstelling','Door een verplichte cursus te laten plannen en dit als afgedaan te beschouwen','Door medewerkers die digitale tools vermijden te berispen'],
      c:1, exp:'✓ Stimulerend leiderschap combineert voorbeeldgedrag, ruimte bieden en digitale groei zichtbaar maken als collectieve ambitie.' },
    { lv:'A2', q:'Hoe creëer je ruimte voor medewerkers om digitale vaardigheden te ontwikkelen?',
      opts:['Door te verwijzen naar beschikbare e-learnings in eigen tijd','Door ontwikkeltijd te reserveren in het werkschema en dit te beschermen als een serieuze investering','Door te wachten totdat medewerkers zelf om tijd vragen','Door een jaarlijkse dag te plannen voor digitale scholing'],
      c:1, exp:'✓ Ruimte creëren betekent: ontwikkeltijd structureel inplannen, beschermen en als leidinggevende het belang ervan actief uitdragen.' },
    { lv:'B1', q:'Hoe begeleid je een digitale verandering in je team op een manier die aansluit bij de professionele cultuur?',
      opts:['Door de verandering top-down op te leggen en te verwachten dat iedereen volgt','Door de verandering te verbinden aan de professionele waarden van het team en medewerkers actief te betrekken bij de implementatie','Door te wachten totdat de weerstand vanzelf verdwijnt','Door medewerkers die weerstand bieden over te plaatsen'],
      c:1, exp:'✓ Succesvolle digitale verandering verbindt technologie met professionele identiteit en cultuur. Dat vraagt dialoog, geduld en betrokkenheid.' },
    { lv:'B2', q:'Wat hoort er in een jaarplan over digitale strategie en AI-governance?',
      opts:['Alleen de aanschaf van nieuwe digitale tools','Verantwoording over digitale strategie, AI-beleid, medewerkerswelzijn en het vervolg van de digitale ontwikkeling van het team','Alleen de resultaten van verplichte trainingen','Een beschrijving van welke AI-tools verboden zijn'],
      c:1, exp:'✓ Een sterk jaarplan verankert digitale strategie in het bredere team- en organisatiebeleid, inclusief governance, welzijn en groeidoelstellingen.' },
  ],
  student: [
    { lv:'A1', q:'Hoe toon je als leidinggevende dat je de digitale werkdruk in je team serieus neemt?',
      opts:['Door te veronderstellen dat medewerkers dat zelf aangeven als het een probleem is','Door actief te vragen naar werkbeleving en signalen van overbelasting te bespreken in overleggen en serieus op te pakken','Door medewerkers te adviseren minder e-mails te versturen','Door de ICT-afdeling te vragen minder systemen te beheren'],
      c:1, exp:'✓ Digitale werkdruk is een leiderschapsthema. Actieve aandacht, bespreekbaarheid en concrete opvolging zijn daarvoor essentieel.' },
    { lv:'A2', q:'Waarom is het belangrijk om structureel te evalueren welke digitale tools je team gebruikt?',
      opts:['Om de kosten van digitale tools te verlagen','Om te beoordelen of tools daadwerkelijk bijdragen aan de teamdoelen en of ze veilig en efficiënt worden gebruikt','Om een verantwoording te kunnen opstellen voor het bestuur','Om te zorgen dat iedereen dezelfde tools gebruikt'],
      c:1, exp:'✓ Evaluatie van toolgebruik helpt je bewuste keuzes te maken over welke tools zinvol zijn en welke je kunt afbouwen.' },
    { lv:'B1', q:'Hoe betrek je medewerkers actief bij het verbeteren van digitale werkprocessen?',
      opts:['Door zelf alle verbeteringen te initiëren en medewerkers te informeren over de uitkomst','Door medewerkers te betrekken bij het signaleren van knelpunten, het ontwerpen van oplossingen en de implementatie','Door een digitale werkgroep in te stellen maar er zelf niet in te participeren','Door te wachten totdat medewerkers zelf met verbetervoorstellen komen'],
      c:1, exp:'✓ Medewerkersbetrokkenheid vergroot draagvlak, benut praktijkkennis en leidt tot duurzamere verbeteringen.' },
    { lv:'B2', q:'Hoe gebruik je HR-data en leerdata structureel om het beleid voor je team te verbeteren?',
      opts:['Je gebruikt data alleen bij functioneringsgesprekken','Je analyseert HR- en leerdata regelmatig om trends te herkennen, beleid bij te stellen en onderbouwde keuzes te maken over teamontwikkeling','Je geeft de data door aan HR zonder er zelf conclusies uit te trekken','Data is te gevoelig om in beleidsdiscussies te gebruiken'],
      c:1, exp:'✓ Structureel data-gebruik stelt je in staat om beleid te funderen op feiten in plaats van aannames, en tijdig bij te sturen.' },
  ],
},

}; // einde KQ

// ─── NIVEAUTEKSTEN ─────────────────────────────────────────────────────────
const GROWTH = {
  A1:'Je staat aan het begin van een waardevol leertraject. Dat is een goed startpunt! De stap die je nu zet door bewust na te denken over je digitale vaardigheden is al heel belangrijk. Digitale vaardigheden zijn voor iedereen te ontwikkelen, ongeacht achtergrond of werkervaring.',
  A2:'Jij bent al een actieve ontdekker! Je hebt digitale basiskennis opgedaan en durft te experimenteren. Die nieuwsgierigheid is de beste leermotor die er is. Elke stap brengt je verder in het groeipad.',
  B1:'Jij past digitale vaardigheden al doelgericht toe en denkt bewust na over het waarom achter je keuzes. Dat is een teken van professionele groei. Je bent een waardevolle schakel voor collega\'s om je heen.',
  B2:'Indrukwekkend. Jij bent een echte digitale professional! Je deelt je kennis met anderen en draagt actief bij aan de digitale kwaliteit in je team. Een drijvende kracht in de organisatie.',
  C1:'Jij bent een kartrekker op het digitale vlak. Je verbindt mensen, beleid en technologie en maakt daarmee het verschil voor de hele organisatie. Jouw bijdrage reikt verder dan je eigen afdeling.',
  C2:'Uitzonderlijk. Jij bent een digitale pionier. Je creëert nieuwe mogelijkheden, zet de koers voor anderen en draagt bij aan de digitale toekomst van onderwijs en organisatie. Jouw expertise heeft impact ver buiten je eigen domein.',
};

const D_DESC = {
  houding:{A1:'Je staat open voor digitale ontwikkeling. Dat is het fundament voor alles dat volgt.',A2:'Je bent nieuwsgierig en durft te experimenteren. Heel goed!',B1:'Je neemt zelf verantwoordelijkheid voor je digitale groei. Professioneel!',B2:'Je inspireert anderen. Een echte digitale cultuurdrager.',C1:'Je coacht en karttrekt. Jouw houding zet de toon voor het hele team.',C2:'Je bent een pionier. Je vernieuwt, deelt en hebt organisatiebrede impact.'},
  vaardigheden:{A1:'Je beheerst de basistools van je werk. Goed fundament!',A2:'Je gebruikt Copilot en andere AI-tools actief in je werk.',B1:'Je maakt bewuste, doelgerichte keuzes in je digitale toolkit.',B2:'Je gebruikt data en digitale tools om structureel te verbeteren.',C1:'Je deelt je expertise actief en helpt collega\'s beter worden.',C2:'Je ontwikkelt nieuwe digitale concepten die anderen overnemen.'},
  kennis:{A1:'Je kent de basics van Copilot en AI. Een goed vertrekpunt.',A2:'Je weet wat er speelt op school en in het onderwijs rond AI.',B1:'Je kennis is up-to-date genoeg om veilig en verantwoord te werken.',B2:'Je volgt ontwikkelingen goed genoeg om mee te praten over beleid.',C1:'Je kennis is diepgaand genoeg om beleid te voeden en anderen te adviseren.',C2:'Je bent een toonaangevende expert op het gebied van AI en digitalisering.'},
  ethiek:{A1:'Je handelt bewust op het gebied van veiligheid en privacy. Goed!',A2:'Je bespreekt en bewaakt verantwoord gebruik in je omgeving.',B1:'Je overweegt actief de ethische kant van digitale en AI-keuzes.',B2:'Je draagt bij aan een ethische digitale cultuur in je team.',C1:'Je neemt het voortouw in ethische richtlijnen en draagt die actief uit.',C2:'Je bent architect van de ethische digitale cultuur van de organisatie.'},
  ped:{A1:'Je denkt na over het effect van digitale tools op jouw werk.',A2:'Je past je aanpak aan op de digitale context. Bewust en effectief.',B1:'Je maakt data en voortgang leidend in je handelen.',B2:'Je ontwerpt structureel rijke digitale werk- en leerprocessen.',C1:'Je ontwerpt én deelt rijke digitale aanpakken — ook voor en met collega\'s.',C2:'Je levert een bijdrage aan de digitale kwaliteitsvisie van de organisatie.'},
  student:{A1:'Je bent aanspreekbaar op digitale kwesties voor studenten of collega\'s.',A2:'Je stimuleert zelfredzaamheid actief. Waardevol!',B1:'Je integreert digitale vaardigheidsontwikkeling bewust in je werk.',B2:'Je bereidt anderen voor op de digitale toekomst van hun beroep.',C1:'Je ontwikkelt gerichte programma\'s voor digitale groei van anderen.',C2:'Je bent organisatiebrede expertbron voor digitale talentontwikkeling.'},
};

const D_NEXT = {
  houding:{A1:'Bespreek eens met een collega welke digitale tool hij of zij echt handig vindt. Laat je inspireren.',A2:'Zoek een collega die verder is op het digitale vlak en kijk een uurtje mee.',B1:'Deel je aanpak in een team- of werkoverleg. Andere collega\'s leren van jouw houding.',B2:'Neem het initiatief voor een digitale inspiratiemiddag of kennisdeelsessie in je team.',C1:'Organiseer een leernetwerk of intervisiegroep rondom digitale ontwikkeling in jouw school of sector.',C2:'Presenteer je aanpak op een congres, schrijf een artikel of draag bij aan een sectorinitiatief over digitale vaardigheden.'},
  vaardigheden:{A1:'Probeer deze week één taak te doen met Copilot, bijv. een e-mail schrijven of een tekst samenvatten.',A2:'Verken hoe je Copilot nog slimmer kunt inzetten: stel followup-vragen en vergelijk uitkomsten.',B1:'Experimenteer met een nieuw digitaal hulpmiddel dat je werk nog effectiever maakt.',B2:'Deel een concrete werkwijze of tool met je team via een korte demo of instructie.',C1:'Bied een collega een concrete coachingssessie aan rondom Copilot of een ander digitaal instrument.',C2:'Documenteer jouw werkwijze als best practice en deel deze actief met de organisatie of sector.'},
  kennis:{A1:'Lees de privacyregels van je school over het gebruik van AI-tools. Vijf minuten, grote winst.',A2:'Zet een Google Alert op "AI onderwijs" of "Copilot MBO" om makkelijk bij te blijven.',B1:'Verdiep je in de EU AI Act. Zoek een korte uitleg online of vraag de ICT-afdeling om een briefing.',B2:'Schrijf mee aan een beleidsnota of geef input bij de ontwikkeling van digitale kaders op school.',C1:'Schrijf mee aan een beleidsdocument of geef input bij digitale kaders op school of sectorniveau.',C2:'Engageer je in een sectoraal netwerk of expertgroep rond AI in het onderwijs.'},
  ethiek:{A1:'Controleer of jij 2FA aan hebt staan op je werkaccounts. Duurt twee minuten.',A2:'Stel een collega de vraag: "Weet jij wat wij wel en niet in Copilot mogen invoeren?" Gebruik het als gespreksstarter.',B1:'Neem het voortouw bij het opstellen of actualiseren van AI-gebruiksafspraken voor jouw team.',B2:'Schrijf mee aan de ethische richtlijnen voor AI-gebruik op schoolniveau.',C1:'Neem het initiatief voor een schoolbrede sessie over verantwoord AI-gebruik en stel concrete afspraken op.',C2:'Draag actief bij aan de ontwikkeling van nationale of sectorale richtlijnen voor AI-gebruik in het onderwijs.'},
  ped:{A1:'Koppel je volgende keuze voor een digitale werkvorm bewust aan een leerdoel. Schrijf het op.',A2:'Vraag studenten of collega\'s om feedback op jouw digitale aanpak. Gebruik die input.',B1:'Stel een concrete data-gedreven vraag: wat zegt de voortgang van studenten over jouw aanpak?',B2:'Ontwerp een werkvorm waarbij anderen actief en creatief met digitale tools aan de slag gaan.',C1:'Ontwikkel een methodiek of aanpak en deel die structureel met collega\'s via een leernetwerk.',C2:'Publiceer je aanpak of presenteer het extern als voorbeeld van digitaal vakmanschap.'},
  student:{A1:'Vraag eens aan een student welke digitale tools hij of zij gebruikt en waarom. Leer van hun perspectief.',A2:'Voeg één concrete oefening toe aan je werk waarbij anderen zelf een digitaal probleem oplossen.',B1:'Maak het expliciet: benoem welke digitale vaardigheid je wilt helpen ontwikkelen en hoe.',B2:'Verbind jouw aanpak aan de beroepspraktijk: wat moeten studenten of medewerkers echt kunnen?',C1:'Ontwikkel een programma of interventie gericht op beroepsrelevante digitale vaardigheden en deel dat met collega\'s.',C2:'Lever input aan de organisatie over digitale beroepsvoorbereiding als onderdeel van beleid of curriculumontwikkeling.'},
};

// ─── STATE ─────────────────────────────────────────────────────────────────
let S = { role:null, flatQ:[], ans:[], qIdx:0, kqDomIdx:0, kqLvlIdx:0, kqLastOk:false, kqTotal:0, kqOk:0, kqResults:{}, kqDone:false };

// ─── OPBOUW VRAGEN ─────────────────────────────────────────────────────────
function buildQ(role) {
  // Volgorde: aiGate eerst, dan de rest per niveau (A1×2, A2, B1, B2)
  const doms = Object.keys(Q[role]);
  const out = [];
  // aiGate als allereerste vraag zodat de AI-skip logica goed werkt
  doms.forEach(d => { const q = Q[role][d].find(q=>q.aiGate); if(q) out.push({dom:d,...q}); });
  // Overige A1 vragen (zonder aiGate, die al bovenaan staat)
  doms.forEach(d => { const qs = Q[role][d].filter(q=>q.lv==='A1'&&!q.aiGate); qs.forEach(q => out.push({dom:d,...q})); });
  // Groep A2
  doms.forEach(d => { const q = Q[role][d].find(q=>q.lv==='A2'); if(q) out.push({dom:d,...q}); });
  // Groep B1
  doms.forEach(d => { const q = Q[role][d].find(q=>q.lv==='B1'); if(q) out.push({dom:d,...q}); });
  // Groep B2
  doms.forEach(d => { const q = Q[role][d].find(q=>q.lv==='B2'); if(q) out.push({dom:d,...q}); });
  // Groep C1
  doms.forEach(d => { const q = Q[role][d].find(q=>q.lv==='C1'); if(q) out.push({dom:d,...q}); });
  // Groep C2
  doms.forEach(d => { const q = Q[role][d].find(q=>q.lv==='C2'); if(q) out.push({dom:d,...q}); });
  return out; // 1 + 11 + 6 + 6 + 6 + 6 + 6 = 42
}

// ─── DOMAIN TINTS ──────────────────────────────────────────────────────────
const DOM_TINTS = { houding:'#B48CC8', vaardigheden:'#46C891', kennis:'#FFF09B', ethiek:'#B9DCFF', ped:'#FFB4BE', student:'#CCFBF1' };
const DOM_DESCS = {
  houding:      'Jouw houding tegenover digitale tools, AI en verandering in het werk.',
  vaardigheden: 'Werken met Teams, Copilot en andere digitale tools in jouw functie.',
  kennis:       'Kennis van AI-tools, privacy, Osiris en actuele ontwikkelingen.',
  ethiek:       'Veilig en verantwoord omgaan met data, wachtwoorden en AI-uitkomsten.',
  ped:          'Hoe jij digitale tools inzet in jouw werkwijze of begeleiding.',
  student:      'Bijdragen aan de digitale ontwikkeling van studenten of collega\'s.',
};

// ─── NAVIGATIE ─────────────────────────────────────────────────────────────
function goTo(id) {
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
  updateTopbar(id);
  window.scrollTo({top:0,behavior:'smooth'});
}

function updateTopbar(id) {
  const center = document.getElementById('tbCenter');
  const end    = document.getElementById('tbEnd');
  if (id === 'question' && S.flatQ.length) {
    const dom = S.flatQ[S.qIdx]?.dom || '';
    const p   = (S.qIdx / S.flatQ.length * 100).toFixed(1);
    const lbl = dom && S.role ? DOM_LABELS[S.role][dom] : '';
    center.innerHTML = `
      <span class="tb-counter"><span class="tb-counter-current">${S.qIdx+1}</span><span style="color:var(--ink-faint);margin:0 3px">/</span><span>${S.flatQ.length}</span></span>
      <div class="tb-progress"><div class="tb-progress-fill" id="tbFill" style="width:${p}%"></div></div>
      <span class="tb-theme">${lbl}</span>`;
    end.innerHTML = `<button class="ghost-btn" onclick="restart()">Opnieuw</button>`;
  } else if (id === 'kq') {
    const doms = S.role ? Object.keys(Q[S.role]) : [];
    const p    = doms.length ? (S.kqDomIdx / doms.length * 100).toFixed(1) : 0;
    center.innerHTML = `<span class="tb-label">Kennischeck</span>
      <div class="tb-progress"><div class="tb-progress-fill" style="width:${p}%"></div></div>`;
    end.innerHTML = `<button class="ghost-btn" onclick="restart()">Opnieuw</button>`;
  } else if (id === 'report') {
    center.innerHTML = `<span class="tb-label">Jouw rapport</span>`;
    end.innerHTML    = `<button class="ghost-btn" onclick="restart()">Opnieuw</button>`;
  } else if (id === 'role') {
    center.innerHTML = `<span class="tb-label">Stap 1: Kies je rol</span>`;
    end.innerHTML    = '';
  } else {
    center.innerHTML = '';
    end.innerHTML    = '';
  }
}

// ─── ROLLEN ─────────────────────────────────────────────────────────────────
function renderRoles() {
  document.getElementById('rolesGrid').innerHTML = Object.entries(ROLES).map(([k,r])=>`
    <div class="role-card" id="rc-${k}" onclick="pickRole('${k}')">
      <div class="rc-code">${k}</div>
      <div class="rc-name">${r.name}</div>
      <div class="rc-desc">${r.desc}</div>
    </div>`).join('');
}

function renderWelcomeThemes() {
  const doms = Object.keys(DOMAINS_BASE);
  const labels = DOM_LABELS['OP'];
  document.getElementById('themeGrid').innerHTML = doms.map((d,i)=>`
    <div class="theme-card" style="--theme-tint:${DOM_TINTS[d]}">
      <div class="theme-card-num">${String(i+1).padStart(2,'0')}</div>
      <div class="theme-card-name">${labels[d]}</div>
      <div class="theme-card-desc">${DOM_DESCS[d]}</div>
    </div>`).join('');
}

function pickRole(role) {
  S.role=role;
  document.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));
  document.getElementById('rc-'+role).classList.add('selected');
  document.getElementById('btnNext').disabled=false;
}

function startScan() {
  if(!S.role) return;
  S.flatQ=buildQ(S.role); S.ans=new Array(S.flatQ.length).fill(null);
  S.kqDomIdx=0; S.kqLvlIdx=0; S.kqLastOk=false;
  S.kqTotal=0; S.kqOk=0; S.kqResults={}; S.kqDone=false; S.qIdx=0;
  S.noAI=false; S.kqSkipped=false;
  goTo('question'); renderQ();
}

// ─── VRAGEN ─────────────────────────────────────────────────────────────────
const DOM_COLORS = { houding:'#1A73E8', vaardigheden:'#1E8E3E', kennis:'#B45309', ethiek:'#7B3F9E', ped:'#C5221F', student:'#0D6E73' };
const DOM_LIGHTS  = { houding:'#E8F0FE', vaardigheden:'#E6F4EA', kennis:'#FEF3C7', ethiek:'#F5F0FF', ped:'#FCE8E6', student:'#E1F5EE' };
const DOM_ICONS   = { houding:'🧠', vaardigheden:'💻', kennis:'📖', ethiek:'⚖️', ped:'🎓', student:'🌱' };

function renderQ() {
  const q    = S.flatQ[S.qIdx];
  const doms = Object.keys(Q[S.role]);
  const domIdx = doms.indexOf(q.dom);
  const tint = DOM_TINTS[q.dom] || '#B48CC8';

  // Theme tag
  const tag = document.getElementById('qThemeTag');
  tag.style.setProperty('--theme-tint', tint);
  document.getElementById('qThemeNum').textContent  = String(domIdx+1).padStart(2,'0');
  document.getElementById('qThemeName').textContent = DOM_LABELS[S.role][q.dom];

  // Domain dots (6 dots, one per domain)
  document.getElementById('qDomainDots').innerHTML = doms.map((d,i)=>{
    const cls = i===domIdx?'is-current':i<domIdx?'is-done':'';
    return `<span class="theme-dot ${cls}" title="${DOM_LABELS[S.role][d]}"></span>`;
  }).join('');

  document.getElementById('qText').textContent = q.t;
  document.getElementById('btnBack').style.visibility = S.qIdx===0?'hidden':'visible';

  // Clear choice selection state
  ['choiceNee','choiceMisschien','choiceJa'].forEach(id=>{
    const el=document.getElementById(id);
    el.classList.remove('is-selected');
    el.disabled=false;
  });

  updateTopbar('question');
}

function doAnswer(val) {
  // Disable all choices immediately
  ['choiceNee','choiceMisschien','choiceJa'].forEach(id=>{ document.getElementById(id).disabled=true; });
  // Highlight selection
  const choiceMap = {no:'choiceNee', maybe:'choiceMisschien', yes:'choiceJa'};
  document.getElementById(choiceMap[val])?.classList.add('is-selected');
  S.ans[S.qIdx]=val;

  // AI-gateway: als iemand 'Nee' antwoordt op de aiGate-vraag, sla ai:true vragen over
  const curQ = S.flatQ[S.qIdx];
  if(curQ.aiGate && val==='no') S.noAI=true;

  setTimeout(()=>{
    S.qIdx++;
    // Skip ai:true vragen als noAI=true
    while(S.noAI && S.qIdx<S.flatQ.length && S.flatQ[S.qIdx].ai) {
      S.ans[S.qIdx]='no'; // auto-antwoord: nee = A1
      S.qIdx++;
    }
    if(S.qIdx<S.flatQ.length){renderQ();}
    else{goTo('kq');renderKQ();}
  },180);
}

function prevQ() { if(S.qIdx>0){S.qIdx--;renderQ();} }

// ─── TOETSENBORDBEDIENING ──────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const scr = document.querySelector('.screen.active');
  if(!scr) return;
  if(scr.id==='screen-question') {
    if(e.key==='ArrowRight') { e.preventDefault(); doAnswer('yes'); }
    else if(e.key==='ArrowLeft')  { e.preventDefault(); doAnswer('no'); }
    else if(e.key==='ArrowDown')  { e.preventDefault(); doAnswer('maybe'); }
    else if(e.key==='ArrowUp')    { e.preventDefault(); prevQ(); }
  }
});

// ─── KENNISCHECK (adaptief) ──────────────────────────────────────────────────
function renderKQ() {
  const doms=Object.keys(Q[S.role]);
  const dom=doms[S.kqDomIdx];
  const kq=KQ[S.role][dom][S.kqLvlIdx];
  document.getElementById('kqDomIcon').textContent=DOM_ICONS[dom];
  document.getElementById('kqDomName').textContent=DOM_LABELS[S.role][dom];
  document.getElementById('kqLevelBadge').textContent=['A1','A2','B1','B2'][S.kqLvlIdx];
  document.getElementById('kqDomDots').innerHTML=doms.map((d,i)=>{
    const cl=i<S.kqDomIdx?'done':i===S.kqDomIdx?'active':'';
    return `<div class="kq-dom-dot ${cl}" title="${DOM_LABELS[S.role][d]}"></div>`;
  }).join('');
  document.getElementById('kqText').textContent=kq.q;
  document.getElementById('kqExp').style.display='none';
  document.getElementById('btnKqNext').style.display='none';
  document.getElementById('kqOpts').innerHTML=kq.opts.map((o,i)=>
    `<button class="kq-opt" onclick="ansKQ(${i})">${o}</button>`).join('');
  updateTopbar('kq');
}

function ansKQ(idx) {
  const doms=Object.keys(Q[S.role]);
  const dom=doms[S.kqDomIdx];
  const kq=KQ[S.role][dom][S.kqLvlIdx];
  const ok=idx===kq.c;
  S.kqLastOk=ok; S.kqTotal++;
  if(ok){S.kqOk++;S.kqResults[dom]=['A1','A2','B1','B2'][S.kqLvlIdx];}
  document.querySelectorAll('.kq-opt').forEach((b,i)=>{
    b.disabled=true;
    if(i===kq.c) b.classList.add(idx===i?'correct':'reveal');
    else if(i===idx) b.classList.add('wrong');
  });
  const exp=document.getElementById('kqExp');
  exp.innerHTML=`<div class="kq-exp ${ok?'good':'bad'}">${kq.exp}</div>`;
  exp.style.display='block';
  const btn=document.getElementById('btnKqNext');
  btn.style.display='block';
  const hasNextLv=ok&&S.kqLvlIdx<3;
  const hasNextDom=S.kqDomIdx<doms.length-1;
  btn.textContent=hasNextLv?'Volgend niveau →':hasNextDom?'Volgend thema →':'Bekijk mijn rapport →';
}

function nextKQ(){
  if(S.kqLastOk&&S.kqLvlIdx<3){S.kqLvlIdx++;}
  else{S.kqDomIdx++;S.kqLvlIdx=0;}
  const doms=Object.keys(Q[S.role]);
  if(S.kqDomIdx>=doms.length){S.kqDone=true;buildReport();goTo('report');}
  else{renderKQ();}
}

function skipKQ(){S.kqDone=false;S.kqSkipped=true;buildReport();goTo('report');}
function doKQLater(){S.kqSkipped=false;S.kqDomIdx=0;S.kqLvlIdx=0;S.kqLastOk=false;S.kqTotal=0;S.kqOk=0;S.kqResults={};goTo('kq');renderKQ();}

// ─── SCORING ────────────────────────────────────────────────────────────────
// inv:true → NEE is het positieve antwoord
function scoreQ(a, inv) {
  if(!inv) return a==='yes'?1 : a==='maybe'?0.5 : 0;
  return a==='no'?1 : a==='maybe'?0.5 : 0;
}

function domLevel(dom) {
  const qs = S.flatQ.map((q,i)=>({...q,a:S.ans[i]})).filter(q=>q.dom===dom);
  let lv=null;
  for(const l of LEVELS) {
    const lvQs = qs.filter(q=>q.lv===l);
    if(!lvQs.length) break;
    const avg = lvQs.reduce((s,q)=>s+scoreQ(q.a,q.inv),0)/lvQs.length;
    if(avg>=0.5) lv=l; else break;
  }
  return lv||'A1';
}

function overallLevel(levels) {
  const nums = Object.values(levels).map(l=>LEVELS.indexOf(l)).sort((a,b)=>a-b);
  return LEVELS[nums[Math.floor(nums.length/2)]]||'A1';
}

// ─── RAPPORT ────────────────────────────────────────────────────────────────
function buildReport() {
  const dLv={};
  Object.keys(Q[S.role]).forEach(d=>dLv[d]=domLevel(d));
  const overall=overallLevel(dLv);
  const li=LEVEL_INFO[overall];
  const role=ROLES[S.role];
  const doms=Object.keys(Q[S.role]);

  // Strongest / weakest domain
  const sorted=[...doms].sort((a,b)=>LEVELS.indexOf(dLv[a])-LEVELS.indexOf(dLv[b]));
  const weakest=DOM_LABELS[S.role][sorted[0]];
  const strongest=DOM_LABELS[S.role][sorted[sorted.length-1]];

  document.getElementById('rHero').innerHTML=`
    <div class="pre-title">Jouw resultaat</div>
    <h1 class="result-title">${overall} &middot; ${li.name}</h1>
    <p class="result-lead">${GROWTH[overall]}</p>
    <div class="score-card">
      <div class="score-main">
        <div class="score-num">${li.pct}</div>
        <div class="score-of">/100</div>
      </div>
      <div class="score-bar"><div class="score-bar-fill" id="scoreBarFill" style="width:0%"></div></div>
      <div class="score-meta">
        <div class="score-meta-item">
          <div class="score-meta-label">Sterkste thema</div>
          <div class="score-meta-val">${strongest}</div>
        </div>
        <div class="score-meta-divider"></div>
        <div class="score-meta-item">
          <div class="score-meta-label">Meeste groeiruimte</div>
          <div class="score-meta-val">${weakest}</div>
        </div>
      </div>
    </div>`;

  // Animate score bar
  requestAnimationFrame(()=>setTimeout(()=>{
    const f=document.getElementById('scoreBarFill');
    if(f) f.style.width=li.pct+'%';
  },150));

  // KQ result sectie
  const kqEl=document.getElementById('rKq');
  const kqSub=document.getElementById('rKqSub');
  if(S.kqSkipped){
    kqSub.textContent='Je hebt de kennischeck overgeslagen.';
    kqEl.innerHTML=`<div class="kq-skipped-msg">
      <span>Geen kennischeck gedaan</span>
      <button class="ghost-btn" onclick="doKQLater()">Alsnog doen</button>
    </div>`;
  } else if(S.kqDone){
    const pct=S.kqTotal>0?Math.round((S.kqOk/S.kqTotal)*100):0;
    const ringBg=pct>=67?'#46C891':pct>=33?'#FFF09B':'#FFB4BE';
    const msg=pct===100?'Alle kennisvragen goed — jouw zelfbeoordeling is solide onderbouwd!'
      :pct>=67?'Goed gescoord. Jouw inschatting klopt goed.'
      :pct>=33?'Redelijk gescoord. Verdiep je in de thema\'s waarbij je twijfelde.'
      :'De kennischeck laat groeikansen zien in basiskennis — precies wat de zelfscan inzichtelijk maakt!';
    kqSub.textContent=`${S.kqOk} van de ${S.kqTotal} kennisvragen goed beantwoord.`;
    // Per-domain KQ breakdown
    const kqDomCards=doms.map((k,i)=>{
      const highest=S.kqResults[k]||'niet bereikt';
      const tint=DOM_TINTS[k]||'#B48CC8';
      const label=DOM_LABELS[S.role][k];
      return `<div class="kq-dom-result" style="--theme-tint:${tint}">
        <span class="kq-dom-result-num">${String(i+1).padStart(2,'0')}</span>
        <span class="kq-dom-result-name">${label}</span>
        <span class="kq-dom-result-lv">${highest}</span>
      </div>`;
    }).join('');
    kqEl.innerHTML=`
      <div class="kq-result-summary">
        <div class="kq-ring" style="background:${ringBg}">${S.kqOk}/${S.kqTotal}</div>
        <div class="kq-result-text"><strong>${pct}% correct</strong> — ${msg}</div>
      </div>
      <div class="kq-dom-results">${kqDomCards}</div>`;
  }

  // Domain cards
  document.getElementById('rDomains').innerHTML=doms.map((k,i)=>{
    const lv=dLv[k]; const li2=LEVEL_INFO[lv];
    const label=DOM_LABELS[S.role][k];
    const tint=DOM_TINTS[k]||'#B48CC8';
    return `<div class="result-theme" style="--theme-tint:${tint}">
      <div class="result-theme-head">
        <div class="result-theme-name">
          <span class="result-theme-num">${String(i+1).padStart(2,'0')}</span>
          ${label}
        </div>
        <div class="result-theme-badge">${lv} &middot; ${li2.name}</div>
      </div>
      <div class="result-theme-bar"><div class="result-theme-bar-fill" style="width:0%" data-pct="${li2.pct}"></div></div>
      <p class="result-theme-advice">${D_DESC[k][lv]||''}</p>
      <div class="result-theme-next">
        <div class="result-theme-next-lbl">Volgende stap</div>
        <div class="result-theme-next-text">${D_NEXT[k][lv]||''}</div>
      </div>
    </div>`;
  }).join('');

  requestAnimationFrame(()=>setTimeout(()=>{
    document.querySelectorAll('.result-theme-bar-fill').forEach(b=>b.style.width=b.dataset.pct+'%');
  },150));
}

// ─── RESTART ────────────────────────────────────────────────────────────────
function restart(){
  S={role:null,flatQ:[],ans:[],qIdx:0,kqDomIdx:0,kqLvlIdx:0,kqLastOk:false,kqTotal:0,kqOk:0,kqResults:{},kqDone:false,kqSkipped:false,noAI:false};
  document.getElementById('btnNext').disabled=true;
  document.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));
  document.getElementById('rKq').innerHTML='';
  document.getElementById('rKqSub').textContent='';
  goTo('welcome');
}

renderRoles();
renderWelcomeThemes();
