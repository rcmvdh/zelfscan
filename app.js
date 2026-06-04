// ─── ROLLEN ────────────────────────────────────────────────────────────────
const ROLES = {
  OP:  { name:'Onderwijzend Personeel',           desc:'Docenten, instructeurs, praktijkbegeleiders, SLB\'ers',          group:'onderwijs'  },
  OOP: { name:'Onderwijsondersteunend Personeel', desc:'Onderwijsassistenten, OLC-medewerkers, begeleiders',             group:'onderwijs'  },
  BST: { name:'Bestuursbureau',                   desc:'Bestuurssecretariaat, beleid en organisatieondersteuning',       group:'diensten'   },
  MRK: { name:'Marketing & Communicatie',         desc:'Communicatie, marketing, voorlichting en evenementen',          group:'diensten'   },
  FAC: { name:'Facilitair Bedrijf',               desc:'Facilitaire dienstverlening, gebouwenbeheer en hospitality',    group:'diensten'   },
  OOA: { name:'Onderwijsondersteuning & Advies',  desc:'Onderwijskunde, kwaliteitszorg en leermateriaalondersteuning',  group:'diensten'   },
  FIN: { name:'Financiën & Control',              desc:'Financiële administratie, control en bekostiging',              group:'diensten'   },
  HRM: { name:'Human Resource Management',        desc:'HR-beleid, recruitment, personeelsontwikkeling en verzuim',     group:'diensten'   },
  ICT: { name:'Informatievoorziening & ICT',      desc:'ICT-beheer, informatiebeveiliging en applicatiebeheer',         group:'diensten'   },
  MAN: { name:'Directie & Management',            desc:'Afdelingshoofden, teamleiders, directieleden',                  group:'management' },
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
  OP:  { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Pedagogisch-Didactisch Handelen', student:'Digitale Groei van Studenten'            },
  OOP: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Begeleidend Handelen',              student:'Zelfredzaamheid van Studenten'           },
  BST: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan de Organisatie'             },
  MRK: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan Digitale Communicatie'      },
  FAC: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan Digitale Werkplek'          },
  OOA: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan Onderwijskwaliteit'         },
  FIN: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan Financiële Transparantie'   },
  HRM: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan Medewerkerswelzijn'         },
  ICT: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Professioneel Handelen',             student:'Bijdrage aan Digitale Infrastructuur'    },
  MAN: { houding:'Houding & Mindset', vaardigheden:'Digitale Vaardigheden', kennis:'Kennis & Bewustzijn', ethiek:'Ethiek & Verantwoord Gebruik', ped:'Leiderschapshandelen',               student:'Teamontwikkeling & Beleid'               },
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
// ONDERWIJSONDERSTEUNEND PERSONEEL (OOP)
// ══════════════════════════════════════════════════════
OOP: {
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
// BESTUURSBUREAU (BST)
// ══════════════════════════════════════════════════════
BST: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor digitale tools die mijn bestuurlijke en beleidsmatige werk verbeteren.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij welke digitale ontwikkelingen relevant zijn voor bestuurlijke ondersteuning.' },
    { lv:'A2', inv:false, t:'Als de organisatie een nieuw digitaal systeem introduceert, ga ik er zelf actief mee aan de slag.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale vaardigheden bij te houden, ook buiten verplichte training.' },
    { lv:'B2', inv:false, t:'Ik deel mijn digitale kennis actief met collega\'s op het bestuursbureau om samen beter te werken.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij digitale vernieuwing in mijn team en coach collega\'s actief in hun digitale ontwikkeling.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met nieuwe digitale werkwijzen voor bestuurlijke processen en deel mijn inzichten met de organisatie.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met Teams en SharePoint voor bestuurlijke communicatie en documentbeheer.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot gebruiken voor het opstellen of samenvatten van bestuurlijke documenten en vergadernotulen.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik Copilot actief om beleidsnotities te verbeteren of vergaderverslagen samen te vatten.' },
    { lv:'B1', inv:false, t:'Ik beheer bestuurlijke documenten en vergaderdossiers op een overzichtelijke en traceerbare manier via SharePoint.' },
    { lv:'B2', inv:false, t:'Ik gebruik digitale tools om bestuurlijke informatiestromen te optimaliseren en de kwaliteit van documentbeheer te verbeteren.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s in het efficiënt gebruik van digitale systemen voor bestuurlijke ondersteuning.' },
    { lv:'C2', inv:false, t:'Ik ontwerp en implementeer verbeterde digitale werkprocessen voor de informatiehuishouding van het bestuursbureau.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet dat Copilot en andere AI-tools bestaan en begrijp globaal wat ze doen.' },
    { lv:'A1', inv:false, t:'Ik weet welke vertrouwelijkheidsniveaus gelden voor bestuursdocumenten en hoe ik daar digitaal correct mee omga.' },
    { lv:'A2', inv:false, t:'Ik weet wat de AVG betekent voor het verwerken van bestuurlijke en organisatiegebonden persoonsgegevens.' },
    { lv:'B1', inv:false, t:'Ik ken het informatiebeveiligingsbeleid van de school goed genoeg om dagelijks correct te handelen.' },
    { lv:'B2', inv:false, t:'Ik ken de relevante wet- en regelgeving, zoals de AVG en Archiefwet, die van toepassing is op bestuurlijke documentverwerking.' },
    { lv:'C1', inv:false, t:'Ik ben voor mijn team de inhoudelijke vraagbaak op het gebied van digitale bestuurlijke documentatie en informatiebeveiliging.' },
    { lv:'C2', inv:false, t:'Ik volg ontwikkelingen in digitale informatiehuishouding en governance en vertaal die naar advies voor de organisatie.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik behandel vertrouwelijke bestuursdocumenten uitsluitend via de daarvoor goedgekeurde beveiligde systemen.' },
    { lv:'A1', inv:false, t:'Ik voer geen vertrouwelijke organisatiegegevens in bij externe AI-tools zoals de gratis versie van Copilot.' },
    { lv:'A2', inv:false, t:'Ik gebruik tweestapsverificatie (2FA) op alle werkaccounts waarmee ik toegang heb tot gevoelige systemen.' },
    { lv:'B1', inv:false, t:'Ik denk bewust na over de privacy-implicaties voordat ik bestuurlijke documenten deel of opsla in digitale systemen.' },
    { lv:'B2', inv:false, t:'Ik adviseer collega\'s actief over veilig omgaan met vertrouwelijke bestuursinformatie in digitale omgevingen.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het opstellen van richtlijnen voor veilig omgaan met vertrouwelijke digitale informatie.' },
    { lv:'C2', inv:false, t:'Ik lever een structurele bijdrage aan het organisatiebrede beleid voor informatiebeveiliging en vertrouwelijkheid.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik digitale tools actief om bestuurlijke processen te ondersteunen en efficiënter te maken.' },
    { lv:'A1', inv:false, t:'Ik sta open voor het aanpassen van mijn werkwijze als digitale tools mijn bestuurlijke ondersteuning verbeteren.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in een digitaal bestuurlijk werkproces, deel ik die met mijn leidinggevende of collega\'s.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van digitale werkprocessen voor bestuurlijke ondersteuning en documentbeheer.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer verbeterinitiatieven op het gebied van digitale informatiestromen in bestuurlijke processen.' },
    { lv:'C1', inv:false, t:'Ik leid verbeterprojecten voor bestuurlijke digitale processen en coach collega\'s bij de implementatie.' },
    { lv:'C2', inv:false, t:'Ik ontwerp en implementeer strategische verbeteringen in de digitale informatiehuishouding van de organisatie.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een collega vastloopt met een digitaal systeem, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om collega\'s te helpen bij het gebruik van digitale tools op het bestuursbureau.' },
    { lv:'A2', inv:false, t:'Ik deel handige digitale werkwijzen en tips actief met collega\'s op het bestuursbureau.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale kwaliteit van bestuurlijke processen en documentstromen.' },
    { lv:'B2', inv:false, t:'Ik vertaal digitale inzichten naar concrete verbetervoorstellen voor de informatiehuishouding van de organisatie.' },
    { lv:'C1', inv:false, t:'Ik fungeer als vraagbaak voor collega\'s op het gebied van digitale bestuurlijke processen en initieer kennis- en leermomenten.' },
    { lv:'C2', inv:false, t:'Ik lever een bijdrage aan de digitale visie van de organisatie vanuit bestuurlijk-administratief perspectief.' },
  ],
},

// ══════════════════════════════════════════════════════
// MARKETING & COMMUNICATIE (MRK)
// ══════════════════════════════════════════════════════
MRK: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor nieuwe digitale en AI-tools die mijn communicatiewerk verbeteren of versnellen.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij welke digitale communicatietools en -trends relevant zijn voor mijn werk.' },
    { lv:'A2', inv:false, t:'Als er een nieuw digitaal communicatiemiddel beschikbaar komt, probeer ik dat zelf eens uit.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale communicatievaardigheden bij te houden.' },
    { lv:'B2', inv:false, t:'Ik inspireer collega\'s in mijn team actief met nieuwe digitale en AI-toepassingen voor communicatie.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij digitale innovatie in mijn communicatieteam en coach collega\'s bij nieuwe werkwijzen.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met opkomende digitale communicatietechnieken en AI-toepassingen en deel mijn bevindingen organisatiebreed.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met het CMS, social media kanalen en de designtools die voor mijn communicatiefunctie beschikbaar zijn.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot of andere AI-tools gebruiken om communicatieteksten, social media berichten of persberichten te genereren of te verbeteren.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik AI-tools structureel om communicatieworkflows te versnellen, zoals het maken van content voor meerdere kanalen of doelgroepen.' },
    { lv:'B1', inv:false, t:'Ik kies bewust welke digitale tools en kanalen ik inzet op basis van de communicatiedoelstellingen en de doelgroep.' },
    { lv:'B2', inv:false, t:'Ik gebruik data en analytics structureel om de effectiviteit van digitale communicatie te meten en mijn aanpak te verbeteren.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s in het effectief gebruik van digitale communicatietools en AI-ondersteunde contentcreatie.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel nieuwe digitale communicatieconcepten of werkwijzen die breed worden toegepast in de organisatie.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet dat AI-tools zoals Copilot bestaan en begrijp globaal hoe ze ingezet worden voor contentcreatie.' },
    { lv:'A1', inv:false, t:'Ik weet wat de AVG betekent voor het gebruik van persoonsgegevens in marketing- en communicatiecampagnes.' },
    { lv:'A2', inv:false, t:'Ik weet wat de auteursrechtregels zijn voor AI-gegenereerde content en beeldmateriaal in externe communicatie.' },
    { lv:'B1', inv:false, t:'Ik ken het communicatiebeleid en de sociale mediarichtlijnen van de school goed genoeg om er dagelijks naar te handelen.' },
    { lv:'B2', inv:false, t:'Ik volg actuele ontwikkelingen op het gebied van AI in contentcreatie en digitale marketing goed genoeg om bij te dragen aan beleid.' },
    { lv:'C1', inv:false, t:'Ik heb diepgaande kennis van digitale communicatietrends en AI in marketing en fungeer als vraagbaak voor mijn team.' },
    { lv:'C2', inv:false, t:'Ik volg internationale ontwikkelingen in digitale communicatie en AI-contentcreatie en vertaal die naar aanbevelingen voor de organisatie.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik gebruik persoonsgegevens van studenten, alumni en medewerkers in marketinguitingen alleen conform de AVG en met toestemming.' },
    { lv:'A1', inv:false, t:'Ik voer geen vertrouwelijke communicatiedata of persoonsgegevens in bij externe AI-tools.' },
    { lv:'A2', inv:false, t:'Ik label AI-gegenereerde content transparant wanneer dit relevant is voor de ontvanger of vereist door schoolbeleid.' },
    { lv:'B1', inv:false, t:'Ik overweeg bewust de ethische aspecten van AI-contentcreatie, zoals auteursrecht, authenticiteit en mogelijke bias.' },
    { lv:'B2', inv:false, t:'Ik draag actief bij aan richtlijnen voor verantwoord gebruik van AI in de communicatie van de school.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het opstellen van ethische richtlijnen voor AI-gebruik in externe communicatie en marketing.' },
    { lv:'C2', inv:false, t:'Ik positioneer de school als verantwoorde communicator door een voorbeeldrol te spelen in ethisch AI-gebruik in communicatie.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik digitale tools actief om mijn communicatiewerk efficiënter en effectiever te maken.' },
    { lv:'A1', inv:false, t:'Ik sta open voor nieuwe digitale communicatiemethoden en experimenteer actief met AI-ondersteunde contentcreatie.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in digitale communicatieprocessen, deel ik die met mijn team of leidinggevende.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van digitale communicatiewerkprocessen en contentproductie in mijn team.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer innovatieprojecten op het gebied van digitale communicatiemiddelen en -processen.' },
    { lv:'C1', inv:false, t:'Ik leid communicatie-innovatieprojecten en coach collega\'s bij nieuwe digitale werkwijzen.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel en implementeer een digitale communicatiestrategie die structureel bijdraagt aan de doelstellingen van de organisatie.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een collega vastloopt met een communicatietool of het CMS, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om de digitale communicatievaardigheden van mijn team te versterken.' },
    { lv:'A2', inv:false, t:'Ik deel kennis over nieuwe digitale communicatietechnieken en AI-tools actief met collega\'s.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale communicatievaardigheidsontwikkeling van mijn team.' },
    { lv:'B2', inv:false, t:'Ik vertaal digitale communicatie-inzichten naar concrete aanbevelingen voor de externe communicatie van de organisatie.' },
    { lv:'C1', inv:false, t:'Ik ontwikkel richtlijnen en best practices voor AI-gebruik in de externe communicatie van de school.' },
    { lv:'C2', inv:false, t:'Ik positioneer de school als digitaal sterke communicator door innovatieve digitale concepten te ontwikkelen en te implementeren.' },
  ],
},

// ══════════════════════════════════════════════════════
// FACILITAIR BEDRIJF (FAC)
// ══════════════════════════════════════════════════════
FAC: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor digitale tools en systemen die mijn facilitaire werkzaamheden verbeteren of vereenvoudigen.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij welke digitale ontwikkelingen relevant zijn voor facilitaire dienstverlening.' },
    { lv:'A2', inv:false, t:'Als de organisatie een nieuw digitaal facilitair systeem introduceert, ga ik er zelf actief mee aan de slag.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale vaardigheden bij te houden, ook buiten verplichte training.' },
    { lv:'B2', inv:false, t:'Ik deel mijn digitale kennis actief met collega\'s in de facilitaire dienst om samen efficiënter te werken.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij digitale vernieuwing in mijn team en coach collega\'s actief in hun digitale ontwikkeling.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met nieuwe digitale werkwijzen voor facilitaire processen en deel mijn inzichten met de organisatie.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met het werkordersysteem, het gebouwbeheersysteem en andere digitale facilitaire tools.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot gebruiken voor facilitaire taken, zoals het opstellen van rapportages, inkoopomschrijvingen of werkinstructies.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik digitale tools actief om facilitaire werkorders, planning en voorraadbeheer efficiënter te maken.' },
    { lv:'B1', inv:false, t:'Ik gebruik digitale facilitaire systemen gericht om processen te plannen, te monitoren en te rapporteren.' },
    { lv:'B2', inv:false, t:'Ik gebruik data en rapportages uit facilitaire systemen om de dienstverlening structureel te verbeteren.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s in het efficiënt gebruik van digitale facilitaire systemen.' },
    { lv:'C2', inv:false, t:'Ik ontwerp en implementeer verbeterde digitale werkprocessen voor de facilitaire dienstverlening van de organisatie.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet dat digitale tools zoals Copilot bestaan en begrijp globaal wat ze kunnen betekenen voor facilitair werk.' },
    { lv:'A1', inv:false, t:'Ik weet welke privacyregels gelden voor toegangs- en camerabeveiligingssystemen in het gebouw.' },
    { lv:'A2', inv:false, t:'Ik weet wat de AVG betekent voor het verwerken van gegevens uit toegangs- en veiligheidssystemen.' },
    { lv:'B1', inv:false, t:'Ik ken de digitale veiligheidssystemen van het gebouw goed genoeg om correct te handelen bij storingen of incidenten.' },
    { lv:'B2', inv:false, t:'Ik ken de relevante wet- en regelgeving voor gebouwbeheer en facilitaire dienstverlening in relatie tot digitale systemen.' },
    { lv:'C1', inv:false, t:'Ik ben voor mijn team de vraagbaak op het gebied van digitale facilitaire systemen en gebouwbeheer.' },
    { lv:'C2', inv:false, t:'Ik volg ontwikkelingen op het gebied van slimme gebouwen en digitalisering van facilitaire diensten en vertaal die naar advies.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik behandel gegevens uit toegangs- en camerasystemen vertrouwelijk en overeenkomstig de privacyregels.' },
    { lv:'A1', inv:false, t:'Ik voer geen persoonsgegevens van medewerkers of studenten in bij externe AI-tools.' },
    { lv:'A2', inv:false, t:'Ik gebruik tweestapsverificatie (2FA) op mijn werkaccounts en beveilig mijn toegang tot gebouwsystemen.' },
    { lv:'B1', inv:false, t:'Ik denk bewust na over de privacy-implicaties bij het gebruik van camera-, toegangs- en monitoringsystemen.' },
    { lv:'B2', inv:false, t:'Ik adviseer collega\'s actief over veilig en privacybewust omgaan met digitale facilitaire systemen.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het opstellen van richtlijnen voor veilig omgaan met data uit facilitaire digitale systemen.' },
    { lv:'C2', inv:false, t:'Ik lever een structurele bijdrage aan het organisatiebrede beleid voor informatiebeveiliging in facilitaire omgevingen.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik digitale tools actief om facilitaire processen te ondersteunen en te verbeteren.' },
    { lv:'A1', inv:false, t:'Ik sta open voor het aanpassen van mijn werkwijze als digitale tools mijn facilitaire dienstverlening verbeteren.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in een digitaal facilitair werkproces, deel ik die met mijn leidinggevende of collega\'s.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van digitale werkprocessen in de facilitaire dienst.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer verbeterinitiatieven op het gebied van digitale facilitaire systemen en processen.' },
    { lv:'C1', inv:false, t:'Ik leid digitale verbeterprojecten in de facilitaire dienst en coach collega\'s bij de implementatie.' },
    { lv:'C2', inv:false, t:'Ik ontwerp en implementeer strategische digitale verbeteringen in de facilitaire dienstverlening van de organisatie.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een collega of gebruiker vastloopt met een digitaal systeem in het gebouw, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om bij te dragen aan een goed werkende digitale werkomgeving voor iedereen.' },
    { lv:'A2', inv:false, t:'Ik deel kennis over digitale facilitaire werkwijzen actief met collega\'s in mijn team.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale kwaliteit van de facilitaire dienstverlening.' },
    { lv:'B2', inv:false, t:'Ik vertaal digitale facilitaire inzichten naar concrete verbetervoorstellen voor de werkomgeving.' },
    { lv:'C1', inv:false, t:'Ik fungeer als vraagbaak voor de organisatie op het gebied van digitale facilitaire systemen.' },
    { lv:'C2', inv:false, t:'Ik lever een bijdrage aan de digitale visie op de werkplek en de slimme gebouwomgeving van de organisatie.' },
  ],
},

// ══════════════════════════════════════════════════════
// ONDERWIJSONDERSTEUNING & ADVIES (OOA)
// ══════════════════════════════════════════════════════
OOA: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor digitale en AI-tools die mijn werk in onderwijsondersteuning en kwaliteitszorg verbeteren.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij welke digitale ontwikkelingen relevant zijn voor onderwijskwaliteit en educatieve technologie.' },
    { lv:'A2', inv:false, t:'Als er een nieuw digitaal instrument voor onderwijsondersteuning beschikbaar komt, probeer ik dat zelf uit.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale vaardigheden bij te houden, ook op het gebied van EdTech.' },
    { lv:'B2', inv:false, t:'Ik inspireer collega\'s en docenten actief met digitale mogelijkheden voor onderwijsontwikkeling en kwaliteitsverbetering.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij digitale innovatie in onderwijsondersteuning en coach collega\'s en docenten actief.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met nieuwe digitale methoden voor kwaliteitszorg en onderwijsondersteuning en deel mijn inzichten.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met de systemen voor kwaliteitszorg en onderwijsondersteuning, zoals het LMS en kwaliteitsmanagementsysteem.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot gebruiken voor onderwijsondersteunende taken, zoals het samenvatten van feedbackrapporten of het schrijven van beleidsteksten.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik AI-tools om onderwijsdata te analyseren of ondersteuningsmateriaal te ontwikkelen en te verbeteren.' },
    { lv:'B1', inv:false, t:'Ik gebruik digitale tools gericht om onderwijskwaliteitsprocessen te monitoren, te evalueren en te rapporteren.' },
    { lv:'B2', inv:false, t:'Ik gebruik data-analyses om onderwijskwaliteitsprocessen structureel te beoordelen en verbetersuggesties te onderbouwen.' },
    { lv:'C1', inv:false, t:'Ik coach docenten en collega\'s in het gebruik van digitale tools voor onderwijsontwikkeling en kwaliteitsverbetering.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel digitale ondersteuningsconcepten voor onderwijskwaliteit die breed worden toegepast in de organisatie.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet dat AI-tools bestaan en begrijp globaal hoe ze kunnen bijdragen aan onderwijsondersteuning en kwaliteitszorg.' },
    { lv:'A1', inv:false, t:'Ik weet welke regels gelden voor het gebruik van onderwijsdata en studentresultaten in kwaliteitssystemen.' },
    { lv:'A2', inv:false, t:'Ik weet welke kwaliteitsstandaarden en accreditatievereisten van toepassing zijn op mijn werk in de organisatie.' },
    { lv:'B1', inv:false, t:'Ik ken de relevante onderwijswetgeving en kwaliteitskaders goed genoeg om adviseurs en docenten daarin te ondersteunen.' },
    { lv:'B2', inv:false, t:'Ik volg actuele ontwikkelingen in onderwijskwaliteit en educatieve technologie goed genoeg om strategische adviezen te onderbouwen.' },
    { lv:'C1', inv:false, t:'Ik heb diepgaande kennis van onderwijskwaliteitsprocessen en EdTech en ben voor de organisatie de vraagbaak op dit gebied.' },
    { lv:'C2', inv:false, t:'Ik volg internationale ontwikkelingen in EdTech en onderwijskwaliteit en vertaal die naar concrete aanbevelingen voor de organisatie.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik ga zorgvuldig om met onderwijsdata en studentresultaten en verwerk die alleen in de daarvoor goedgekeurde systemen.' },
    { lv:'A1', inv:false, t:'Ik voer geen persoonsgegevens van studenten of medewerkers in bij externe AI-tools.' },
    { lv:'A2', inv:false, t:'Ik overweeg bewust de privacy-implicaties bij het gebruik van studentdata in kwaliteitsanalyses.' },
    { lv:'B1', inv:false, t:'Ik denk bewust na over de ethische aspecten van data-gedreven onderwijsontwikkeling, zoals bias in toetsdata en studieadvisering.' },
    { lv:'B2', inv:false, t:'Ik draag actief bij aan richtlijnen voor verantwoord gebruik van onderwijsdata en EdTech in de organisatie.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het opstellen van ethische richtlijnen voor gebruik van onderwijsdata en AI in kwaliteitszorg.' },
    { lv:'C2', inv:false, t:'Ik lever een structurele bijdrage aan het organisatiebrede beleid voor verantwoord datagebruik in onderwijs en kwaliteitszorg.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik digitale tools actief om mijn ondersteunings- en advieswerk efficiënter en effectiever te maken.' },
    { lv:'A1', inv:false, t:'Ik sta open voor nieuwe digitale methoden die onderwijskwaliteitsprocessen verbeteren.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in digitale onderwijsondersteuningsprocessen, deel ik die met docenten of leidinggevenden.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van digitale ondersteunings- en kwaliteitszorgprocessen.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer verbeterinitiatieven op het gebied van digitale onderwijsondersteuning en kwaliteitszorg.' },
    { lv:'C1', inv:false, t:'Ik leid verbeterprojecten voor digitale onderwijskwaliteitsprocessen en coach betrokkenen bij de implementatie.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel en implementeer een strategie voor digitale onderwijsondersteuning die organisatiebreed wordt toegepast.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een docent of collega vastloopt met een digitaal systeem voor onderwijs of kwaliteitszorg, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om de digitale ondersteuning van docenten bij onderwijsontwikkeling te versterken.' },
    { lv:'A2', inv:false, t:'Ik deel kennis over digitale onderwijsmethoden en kwaliteitstools actief met docenten en collega\'s.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale kwaliteitsontwikkeling van het onderwijs door gerichte ondersteuning en advies.' },
    { lv:'B2', inv:false, t:'Ik vertaal onderwijsdata en kwaliteitsinzichten naar concrete aanbevelingen voor verbetering van het onderwijs.' },
    { lv:'C1', inv:false, t:'Ik ontwikkel structurele programma\'s voor digitale onderwijsontwikkeling en help docenten bij de implementatie.' },
    { lv:'C2', inv:false, t:'Ik fungeer als expertbron voor de organisatie op het gebied van EdTech en digitale onderwijskwaliteit.' },
  ],
},

// ══════════════════════════════════════════════════════
// FINANCIËN & CONTROL (FIN)
// ══════════════════════════════════════════════════════
FIN: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor digitale tools en systemen die mijn financiële werkzaamheden verbeteren of automatiseren.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij welke digitale ontwikkelingen relevant zijn voor financiële administratie en control.' },
    { lv:'A2', inv:false, t:'Als de organisatie een nieuw financieel digitaal systeem introduceert, ga ik er zelf actief mee aan de slag.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale vaardigheden bij te houden, ook op het gebied van data-analyse.' },
    { lv:'B2', inv:false, t:'Ik deel mijn digitale kennis actief met collega\'s in finance om samen efficiënter en betrouwbaarder te werken.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij digitale vernieuwing in mijn team en coach collega\'s actief in hun digitale ontwikkeling.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met nieuwe digitale financiële werkwijzen en analysemethoden en deel mijn inzichten.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met het financiële systeem (zoals AFAS) en de applicaties die voor mijn financiële functie beschikbaar zijn.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot gebruiken voor financiële ondersteunende taken, zoals het samenvatten van rapportages of het opstellen van toelichtende teksten.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik digitale tools zoals Excel of Power BI om financiële analyses te maken en inzichtelijk te presenteren.' },
    { lv:'B1', inv:false, t:'Ik gebruik het financiële systeem gericht om budgetvoortgang te monitoren en financiële rapportages op te stellen.' },
    { lv:'B2', inv:false, t:'Ik gebruik data-analyses en financiële dashboards om de financiële positie en risico\'s inzichtelijk en bespreekbaar te maken.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s in het effectief gebruik van financiële systemen en analysehulpmiddelen.' },
    { lv:'C2', inv:false, t:'Ik ontwerp nieuwe digitale financiële rapportageprocessen of dashboards die organisatiebreed worden ingezet.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet dat AI-tools zoals Copilot bestaan en begrijp globaal wat ze kunnen doen in een financiële context.' },
    { lv:'A1', inv:false, t:'Ik weet welke gegevens ik wel en niet mag verwerken in AI-tools gezien de vertrouwelijkheid van financiële data.' },
    { lv:'A2', inv:false, t:'Ik weet wat de AVG en interne richtlijnen betekenen voor het verwerken van financiële en persoonsgebonden gegevens.' },
    { lv:'B1', inv:false, t:'Ik ken de interne controleprocessen en auditverplichtingen goed genoeg om digitale werkprocessen daarmee in lijn te houden.' },
    { lv:'B2', inv:false, t:'Ik ken de relevante wet- en regelgeving, zoals de AVG, BBV/WHW en bekostigingsregels, die van toepassing is op financiële informatievoorziening.' },
    { lv:'C1', inv:false, t:'Ik ben voor mijn team de vraagbaak op het gebied van digitale financiële systemen en wet- en regelgeving.' },
    { lv:'C2', inv:false, t:'Ik lever actief input aan de ontwikkeling van financieel beleid en digitale informatiestrategieën.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik behandel financiële gegevens uitsluitend via de daarvoor goedgekeurde beveiligde systemen en nooit via onbeveiligde kanalen.' },
    { lv:'A1', inv:false, t:'Ik voer geen financiële data of vertrouwelijke organisatiegegevens in bij externe AI-tools.' },
    { lv:'A2', inv:false, t:'Ik gebruik tweestapsverificatie (2FA) op alle accounts waarmee ik toegang heb tot financiële systemen.' },
    { lv:'B1', inv:false, t:'Ik denk bewust na over de privacy-implicaties voordat ik financiële of persoonsgerelateerde gegevens deel via digitale kanalen.' },
    { lv:'B2', inv:false, t:'Ik adviseer collega\'s actief over veilig en integer omgaan met financiële data in digitale systemen.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het opstellen van richtlijnen voor veilig omgaan met financiële digitale informatie.' },
    { lv:'C2', inv:false, t:'Ik lever een structurele bijdrage aan het organisatiebrede beleid voor financiële informatiebeveiliging en integriteit.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik digitale tools actief om financiële werkprocessen efficiënter en betrouwbaarder te maken.' },
    { lv:'A1', inv:false, t:'Ik sta open voor automatisering en digitalisering van terugkerende financiële taken.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in een digitaal financieel werkproces, deel ik die met mijn leidinggevende of collega\'s.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van digitale financiële werkprocessen en rapportagestructuren.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer verbeterprojecten op het gebied van financiële digitalisering en procesautomatisering.' },
    { lv:'C1', inv:false, t:'Ik leid digitale verbeterprojecten in finance en coach collega\'s bij de implementatie van nieuwe werkwijzen.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel en implementeer een digitale financiële strategie die de betrouwbaarheid en transparantie van de financiële informatievoorziening structureel verbetert.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een collega vastloopt met een financieel digitaal systeem, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om collega\'s te ondersteunen bij het gebruik van financiële digitale tools.' },
    { lv:'A2', inv:false, t:'Ik deel kennis over digitale financiële werkwijzen en analyses actief met collega\'s.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale kwaliteit van financiële informatiestromen in de organisatie.' },
    { lv:'B2', inv:false, t:'Ik vertaal financiële data en digitale inzichten naar concrete verbetervoorstellen voor management en bestuur.' },
    { lv:'C1', inv:false, t:'Ik fungeer als vraagbaak voor de organisatie op het gebied van digitale financiële systemen en analyses.' },
    { lv:'C2', inv:false, t:'Ik lever een bijdrage aan de digitale financiële visie van de organisatie door data te koppelen aan strategische inzichten.' },
  ],
},

// ══════════════════════════════════════════════════════
// HUMAN RESOURCE MANAGEMENT (HRM)
// ══════════════════════════════════════════════════════
HRM: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta open voor digitale tools en systemen die HR-processen verbeteren of professionaliseren.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij welke digitale HR-trends en -tools relevant zijn voor mijn werk.' },
    { lv:'A2', inv:false, t:'Als de organisatie een nieuw digitaal HR-instrument introduceert, ga ik er zelf actief mee aan de slag.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn digitale vaardigheden bij te houden, ook op het gebied van HR-analytics.' },
    { lv:'B2', inv:false, t:'Ik deel mijn digitale HR-kennis actief met collega\'s en leidinggevenden om HR-processen te professionaliseren.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij digitale vernieuwing in HR en coach collega\'s actief in hun digitale ontwikkeling.' },
    { lv:'C2', inv:false, t:'Ik experimenteer structureel met nieuwe digitale HR-methoden en AI-toepassingen en deel mijn inzichten organisatiebreed.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met het HR-informatiesysteem (zoals AFAS) en de digitale HR-tools die voor mijn functie beschikbaar zijn.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan Copilot gebruiken voor HR-communicatietaken, zoals het opstellen van vacatureteksten, beleidsnotities of brieven.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik Copilot of andere AI-tools om HR-rapporten samen te vatten of HR-correspondentie te ondersteunen.' },
    { lv:'B1', inv:false, t:'Ik gebruik het HR-systeem gericht om personeelsdata te beheren, te analyseren en te rapporteren aan management.' },
    { lv:'B2', inv:false, t:'Ik gebruik HR-data en -analytics structureel om personeelsbeleid te onderbouwen en bijsturing tijdig te signaleren.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s en leidinggevenden in het effectief gebruik van digitale HR-systemen en analysehulpmiddelen.' },
    { lv:'C2', inv:false, t:'Ik ontwerp nieuwe digitale HR-processen of dashboards voor personeelsontwikkeling die organisatiebreed worden ingezet.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik weet dat AI-tools zoals Copilot bestaan en begrijp globaal hoe ze ingezet kunnen worden in HR-processen.' },
    { lv:'A1', inv:false, t:'Ik weet welke bijzondere privacyregels gelden voor de verwerking van persoonsgegevens van medewerkers in het HR-systeem.' },
    { lv:'A2', inv:false, t:'Ik weet wat de AVG zegt over het verwerken van gevoelige persoonsgegevens zoals gezondheidsdata, verzuimgegevens en salarisinfo.' },
    { lv:'B1', inv:false, t:'Ik ken de privacywetgeving en interne richtlijnen voor medewerkersgerelateerde data goed genoeg om er dagelijks correct naar te handelen.' },
    { lv:'B2', inv:false, t:'Ik ken de risico\'s van AI-gebruik in HR-processen, zoals bias in recruitment en profilering van medewerkers, en pas dit toe in mijn werk.' },
    { lv:'C1', inv:false, t:'Ik ben voor de organisatie de vraagbaak op het gebied van digitale HR-systemen, HR-analytics en AVG-compliance voor medewerkersgerelateerde data.' },
    { lv:'C2', inv:false, t:'Ik volg actuele ontwikkelingen in HR-technologie en AI in HR en lever actief input aan organisatiebreed HR-beleid.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik behandel persoonsgegevens van medewerkers, zoals salarisdata en verzuiminformatie, uitsluitend via de daarvoor goedgekeurde systemen.' },
    { lv:'A1', inv:false, t:'Ik voer geen persoonsgegevens of gevoelige medewerkersdata in bij externe AI-tools.' },
    { lv:'A2', inv:false, t:'Ik gebruik tweestapsverificatie (2FA) en sterke wachtwoorden op alle accounts waarmee ik toegang heb tot medewerkersdata.' },
    { lv:'B1', inv:false, t:'Ik denk bewust na over de privacyimplicaties bij het gebruik van medewerkersdata voor analyses en rapportages.' },
    { lv:'B2', inv:false, t:'Ik adviseer leidinggevenden actief over verantwoord en ethisch gebruik van HR-data en AI-tools in personeelsbeheer.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het opstellen van richtlijnen voor ethisch en privacyconform gebruik van digitale HR-systemen en AI in HR.' },
    { lv:'C2', inv:false, t:'Ik lever een structurele bijdrage aan het organisatiebrede beleid voor verantwoord gebruik van medewerkersdata en AI in personeelsmanagement.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik digitale HR-tools actief om HR-processen efficiënter en betrouwbaarder te maken.' },
    { lv:'A1', inv:false, t:'Ik sta open voor digitalisering van HR-processen als dat de kwaliteit en effectiviteit verbetert.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in digitale HR-werkprocessen, deel ik die met mijn leidinggevende of collega\'s.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van digitale HR-werkprocessen en de datakwaliteit van het HR-systeem.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer verbeterprojecten op het gebied van digitale HR-processen en personeelsinformatievoorziening.' },
    { lv:'C1', inv:false, t:'Ik leid verbeterprojecten voor digitale HR-processen en coach collega\'s bij de implementatie.' },
    { lv:'C2', inv:false, t:'Ik ontwikkel en implementeer een digitale HR-strategie die de kwaliteit van personeelsbeheer en -ontwikkeling structureel verbetert.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als een collega of leidinggevende vastloopt met een digitaal HR-systeem, help ik hem of haar op weg.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om medewerkers en leidinggevenden te ondersteunen bij het gebruik van digitale HR-tools.' },
    { lv:'A2', inv:false, t:'Ik deel kennis over digitale HR-processen en tools actief met collega\'s en leidinggevenden.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale ontwikkeling van HR-processen die medewerkerswelzijn ondersteunen.' },
    { lv:'B2', inv:false, t:'Ik vertaal HR-data en digitale inzichten naar concrete aanbevelingen voor personeelsontwikkeling en medewerkerswelzijn.' },
    { lv:'C1', inv:false, t:'Ik fungeer als expertbron voor de organisatie op het gebied van digitale HR-systemen en medewerkerswelzijn.' },
    { lv:'C2', inv:false, t:'Ik lever een bijdrage aan de organisatiebrede digitale HR-visie en langetermijnstrategie voor medewerkerswelzijn en -ontwikkeling.' },
  ],
},

// ══════════════════════════════════════════════════════
// INFORMATIEVOORZIENING & ICT (ICT)
// ══════════════════════════════════════════════════════
ICT: {
  houding: [
    { lv:'A1', inv:false, t:'Ik sta proactief open voor nieuwe technologieën en digitale ontwikkelingen die de IT-dienstverlening verbeteren.' },
    { lv:'A1', inv:false, t:'Ik houd actief bij welke technologische ontwikkelingen relevant zijn voor de IT-infrastructuur en informatiebeveiliging van de school.' },
    { lv:'A2', inv:false, t:'Als er een nieuwe technologie of beveiligingsontwikkeling relevant is voor ons werk, verken ik die actief.' },
    { lv:'B1', inv:false, t:'Ik zie het als mijn eigen verantwoordelijkheid om mijn technische en digitale vaardigheden structureel bij te houden.' },
    { lv:'B2', inv:false, t:'Ik deel mijn technische kennis actief met collega\'s en gebruikers om de digitale rijpheid van de organisatie te verhogen.' },
    { lv:'C1', inv:false, t:'Ik neem het initiatief bij technologische vernieuwing in het ICT-team en coach collega\'s bij het implementeren van nieuwe methoden.' },
    { lv:'C2', inv:false, t:'Ik ben een drijvende kracht achter de digitale transformatie van de organisatie en inspireer collega\'s en leidinggevenden door mijn expertise.' },
  ],
  vaardigheden: [
    { lv:'A1', inv:false, t:'Ik kan zelfstandig werken met de IT-managementtools, het ticketingsysteem en de systemen voor netwerk- en systeembeheer.' },
    { lv:'A1', inv:false, ai:true, t:'Ik kan AI-tools inzetten voor IT-ondersteunende taken, zoals het opstellen van technische documentatie, scripts of het analyseren van logbestanden.' },
    { lv:'A2', inv:false, ai:true, t:'Ik gebruik AI-tools om terugkerende IT-taken te automatiseren of technische analyses te versnellen en te verbeteren.' },
    { lv:'B1', inv:false, t:'Ik gebruik IT-managementtools en monitoring gericht om de beschikbaarheid, prestaties en veiligheid van systemen te bewaken.' },
    { lv:'B2', inv:false, t:'Ik gebruik data en analyses uit IT-systemen om de digitale infrastructuur structureel te verbeteren en risico\'s proactief te beheersen.' },
    { lv:'C1', inv:false, t:'Ik coach collega\'s en gebruikers in het effectief gebruik van digitale systemen en draag bij aan de IT-volwassenheid van de organisatie.' },
    { lv:'C2', inv:false, t:'Ik ontwerp en implementeer nieuwe IT-architectuur, beveiligingsmaatregelen of digitale diensten die de organisatie structureel versterken.' },
  ],
  kennis: [
    { lv:'A1', inv:false, aiGate:true, t:'Ik begrijp hoe AI-tools zoals Copilot technisch werken en ken de implicaties voor de IT-infrastructuur en informatiebeveiliging van de school.' },
    { lv:'A1', inv:false, t:'Ik weet welke informatiebeveiligingsstandaarden van toepassing zijn op de IT-omgeving van de school.' },
    { lv:'A2', inv:false, t:'Ik weet wat de NIS2-richtlijn van de organisatie verplicht op het gebied van cybersecurity, incidentmelding en risicobeheer.' },
    { lv:'B1', inv:false, t:'Ik ken de relevante wet- en regelgeving, zoals AVG, NIS2 en BIO, goed genoeg om er dagelijks naar te handelen.' },
    { lv:'B2', inv:false, t:'Ik volg actuele ontwikkelingen op het gebied van cybersecurity, cloud en AI-technologie goed genoeg om strategische IT-keuzes te onderbouwen.' },
    { lv:'C1', inv:false, t:'Ik ben voor de organisatie de inhoudelijke vraagbaak op het gebied van informatiebeveiliging, IT-architectuur en digitale transformatie.' },
    { lv:'C2', inv:false, t:'Ik lever actief input aan het digitale beleid en de IT-strategie van de organisatie en fungeer als expert op sectoraal of nationaal niveau.' },
  ],
  ethiek: [
    { lv:'A1', inv:false, t:'Ik handel als beheerder van IT-systemen altijd conform het principe van minimale toegangsrechten en zorgvuldig logbeheer.' },
    { lv:'A1', inv:false, t:'Ik gebruik mijn beheerderstoegang uitsluitend voor geautoriseerde taken en documenteer mijn handelingen traceerbaar.' },
    { lv:'A2', inv:false, t:'Ik gebruik tweestapsverificatie en sterke wachtwoorden op alle werkaccounts en stel dit standaard in voor alle beheerde systemen.' },
    { lv:'B1', inv:false, t:'Ik denk bewust na over de privacy-implicaties van IT-keuzes en draag privacy by design actief uit in systeemontwikkeling en -beheer.' },
    { lv:'B2', inv:false, t:'Ik adviseer de organisatie actief over veilige en ethisch verantwoorde implementatie van digitale systemen en AI-tools.' },
    { lv:'C1', inv:false, t:'Ik neem het voortouw bij het ontwikkelen en implementeren van informatiebeveiligingsbeleid en ethische richtlijnen voor digitale systemen.' },
    { lv:'C2', inv:false, t:'Ik lever een structurele bijdrage aan het organisatiebrede informatiebeveiligingsbeleid en de digitale ethische governance van de school.' },
  ],
  ped: [
    { lv:'A1', inv:false, t:'Ik gebruik mijn ICT-expertise actief om de digitale werkprocessen van de organisatie te ondersteunen en te verbeteren.' },
    { lv:'A1', inv:false, t:'Ik sta open voor nieuwe technologieën en methoden die de IT-dienstverlening aan de organisatie verbeteren.' },
    { lv:'A2', inv:false, t:'Als ik verbeterpunten zie in IT-processen of -systemen, maak ik een concreet voorstel en bespreek dit met betrokkenen.' },
    { lv:'B1', inv:false, t:'Ik neem initiatief bij het verbeteren van IT-processen en draag actief bij aan de IT-governance van de organisatie.' },
    { lv:'B2', inv:false, t:'Ik leid of coördineer IT-verbeterprojecten en draag bij aan de digitale strategie van de organisatie.' },
    { lv:'C1', inv:false, t:'Ik leid strategische IT-projecten en coach collega\'s bij de implementatie van nieuwe technologieën.' },
    { lv:'C2', inv:false, t:'Ik ontwerp en implementeer de digitale strategie van de organisatie en verbind IT-beslissingen aan de organisatiedoelstellingen.' },
  ],
  student: [
    { lv:'A1', inv:false, t:'Als medewerkers vastlopen met een digitaal systeem, help ik hen snel en effectief verder.' },
    { lv:'A1', inv:false, t:'Ik zie het als mijn taak om de digitale vaardigheidsontwikkeling van de organisatie te ondersteunen vanuit mijn IT-expertise.' },
    { lv:'A2', inv:false, t:'Ik deel technische kennis en digitale werkwijzen actief met collega\'s en gebruikers in de organisatie.' },
    { lv:'B1', inv:false, t:'Ik draag actief bij aan de digitale rijpheid van de organisatie door gerichte kennisoverdracht en ondersteuning.' },
    { lv:'B2', inv:false, t:'Ik vertaal IT-inzichten en data naar concrete verbetervoorstellen voor de digitale organisatiestrategie.' },
    { lv:'C1', inv:false, t:'Ik fungeer als expertbron voor de organisatie op het gebied van IT, cybersecurity en digitale transformatie.' },
    { lv:'C2', inv:false, t:'Ik lever een bijdrage aan de digitale visie en IT-strategie van de organisatie op organisatorisch of sectoraal niveau.' },
  ],
},

// ══════════════════════════════════════════════════════
// INDIRECT ONDERWIJSONDERSTEUNEND (IOP) — legacy, wordt niet getoond
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
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met woordenboeken en woordenlijsten','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een zoekmachine die het internet doorzoekt op trefwoorden','Een vertaalprogramma dat meerdere talen ondersteunt'],
      c:1, exp:'✓ LLM staat voor Large Language Model. Tools als Copilot en ChatGPT zijn gebouwd op LLMs. Ze genereren tekst op basis van statistische patronen — niet op basis van echte "kennis" of feitelijke verificatie. Controleer de output altijd.' },
    { lv:'B1', q:'Welk systeem gebruikt Mondriaan als studentvolgsysteem?',
      opts:['Magister','SOMtoday','Osiris','ParnasSys'],
      c:2, exp:'✓ Mondriaan gebruikt Osiris voor het volgen van voortgang, resultaten en studieloopbaangegevens van studenten.' },
    { lv:'B2', q:'Wat betekent \'bias\' in de context van AI-systemen?',
      opts:['Een technische programmeerfout die het systeem trager maakt','Systematische vertekening in AI-uitkomsten doordat het model is getraind op eenzijdige of onvolledige data','De voorkeur van een gebruiker voor een bepaalde AI-tool','De hoeveelheid rekenkracht die een AI-systeem verbruikt'],
      c:1, exp:'✓ Bias in AI ontstaat wanneer trainingsdata bepaalde groepen of perspectieven over- of ondervertegenwoordigt. Dit kan leiden tot discriminerende of onjuiste uitkomsten — ook bij tools die je dagelijks gebruikt in de klas.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen studentgegevens invoeren in de gratis versie van Copilot?',
      opts:['Omdat de tool dan trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor persoonsgegevens onbedoeld worden gedeeld','Omdat Microsoft dit technisch heeft geblokkeerd','Omdat studenten dat vervelend vinden'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor verdere training. Persoonsgegevens invoeren is een schending van de AVG.' },
    { lv:'A2', q:'Wat is \'social engineering\' in de context van cyberveiligheid?',
      opts:['Het inzetten van sociale media voor marketingdoeleinden','Het psychologisch manipuleren van mensen om vertrouwelijke informatie te delen of onveilige acties te ondernemen','Een methode om teamcultuur te verbeteren via groepsoefeningen','Het automatisch analyseren van gebruikersgedrag op een platform'],
      c:1, exp:'✓ Social engineering richt zich op mensen, niet op technische systemen. Phishing is de bekendste vorm: via nep-e-mails of -berichten worden mensen verleid wachtwoorden of gegevens te delen. Bewustwording is de beste verdediging.' },
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
// ONDERWIJSONDERSTEUNEND PERSONEEL (OOP)
// ══════════════════════════════════════════════════════
OOP: {
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
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met woordenboeken en woordenlijsten','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een zoekmachine die het internet doorzoekt op trefwoorden','Een vertaalprogramma dat meerdere talen ondersteunt'],
      c:1, exp:'✓ LLM staat voor Large Language Model. Tools als Copilot en ChatGPT zijn gebouwd op LLMs. Ze genereren tekst op basis van statistische patronen — niet op basis van echte "kennis". Controleer de output altijd kritisch.' },
    { lv:'B1', q:'Welk systeem gebruikt Mondriaan als studentvolgsysteem?',
      opts:['Magister','SOMtoday','Osiris','ParnasSys'],
      c:2, exp:'✓ Mondriaan gebruikt Osiris voor het volgen van voortgang, resultaten en studieloopbaangegevens van studenten.' },
    { lv:'B2', q:'Wat betekent \'bias\' in de context van AI-systemen?',
      opts:['Een technische programmeerfout die het systeem trager maakt','Systematische vertekening in AI-uitkomsten doordat het model is getraind op eenzijdige of onvolledige data','De voorkeur van een gebruiker voor een bepaalde AI-tool','De hoeveelheid rekenkracht die een AI-systeem verbruikt'],
      c:1, exp:'✓ Bias in AI ontstaat wanneer trainingsdata bepaalde groepen of perspectieven over- of ondervertegenwoordigt. Dit kan leiden tot discriminerende of onjuiste adviezen — ook in begeleidingstools.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen persoonsgegevens van studenten invoeren in de gratis versie van Copilot?',
      opts:['Omdat de tool dan trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor persoonsgegevens onbedoeld worden gedeeld','Omdat Microsoft dit technisch heeft geblokkeerd','Omdat studenten dat vervelend vinden'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor verdere training. Persoonsgegevens invoeren is een schending van de AVG.' },
    { lv:'A2', q:'Wat is phishing en hoe herken je het?',
      opts:['Software die automatisch virussen opspoort op je computer','Een aanvalsmethode waarbij nep-berichten of -websites worden gebruikt om inloggegevens of persoonlijke informatie te stelen','Een methode om zwakke wachtwoorden automatisch te raden','Een beveiligingsprotocol om data te versleutelen tijdens verzending'],
      c:1, exp:'✓ Phishing is de meest voorkomende cyberaanval. Herkenningspunten: onverwachte urgentie, vreemde afzendersadressen, verdachte links of bijlagen. Twijfel je? Klik niet en meld het bij ICT.' },
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
// KQ: BESTUURSBUREAU (BST) — gebaseerd op IOP KQ met BST-specifieke vaardigheden
// ══════════════════════════════════════════════════════
BST: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot het beste inzetten op het bestuursbureau?',
      opts:['Voor het automatisch nemen van bestuurlijke beslissingen','Voor het schrijven van beleidsnotities, samenvatten van vergaderstukken of opstellen van correspondentie','Copilot is niet nuttig voor bestuurlijke ondersteuning','Voor het automatisch archiveren van alle documenten'],
      c:1, exp:'✓ Copilot ondersteunt schrijf- en samenvattingstaken op het bestuursbureau. Voer nooit vertrouwelijke gegevens in en controleer altijd de output.' },
    { lv:'A2', q:'Waarom zijn digitale vaardigheden relevant voor werk op het bestuursbureau?',
      opts:['Omdat alle systemen nu digitaal zijn en digitale vaardigheden je werk efficiënter, nauwkeuriger en toekomstbestendiger maken','Omdat de school het verplicht stelt','Alleen voor collega\'s die veel met studenten werken','Dat is niet relevant in een bestuurlijke ondersteuningsrol'],
      c:0, exp:'✓ Digitale vaardigheden bepalen hoe efficiënt en nauwkeurig je kunt werken. Het is een basisvereiste, geen luxe.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je digitale professionalisering?',
      opts:['Je wacht op scholingsaanbod van de school','Je zoekt zelf naar nieuwe tools en werkwijzen die jouw werk effectiever maken, ook buiten verplichte training','Je vraagt de ICT-afdeling om je bij te spijkeren','Je vindt het voldoende om bij te blijven met wat je al kunt'],
      c:1, exp:'✓ Eigen regie over je professionele ontwikkeling is een kenmerk van vakmanschap.' },
    { lv:'B2', q:'Hoe deel je je digitale kennis actief met collega\'s?',
      opts:['Door te wachten totdat collega\'s je iets vragen','Door tips, werkwijzen en tools spontaan te delen via overleg, e-mail of een korte demo','Door je kennis voor jezelf te houden','Door alleen te delen als er een training voor georganiseerd wordt'],
      c:1, exp:'✓ Actief kennisdelen maakt teams sterker. Op B2-niveau ben jij een bron van digitale kennis voor collega\'s.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke digitale tool van Microsoft gebruikt Mondriaan primair voor documentopslag en samenwerking?',
      opts:['Google Drive','SharePoint (via Microsoft 365)','Dropbox','OneDrive persoonlijk'],
      c:1, exp:'✓ Mondriaan werkt met Microsoft 365, waarvan SharePoint de centrale plek is voor documentopslag en -samenwerking.' },
    { lv:'A2', q:'Voor welke taken kun je Copilot zinvol inzetten op het bestuursbureau?',
      opts:['Voor het automatisch nemen van bestuurlijke beslissingen','Voor het schrijven van beleidsnotities, samenvatten van vergaderstukken en opstellen van correspondentie','Voor het beheren van toegangsrechten tot systemen','Voor het archiveren van documenten zonder menselijk toezicht'],
      c:1, exp:'✓ Copilot is handig bij schrijf- en samenvattingstaken. Controleer altijd de output en voer nooit vertrouwelijke gegevens in.' },
    { lv:'B1', q:'Wat wordt bedoeld met een \'hallucination\' bij een AI-tool zoals Copilot?',
      opts:['De AI werkt tijdelijk niet door een technische storing','De AI genereert feitelijk onjuiste of verzonnen informatie met groot zelfvertrouwen','De AI reageert traag door overbelasting','De AI begrijpt de vraag niet en vraagt om verduidelijking'],
      c:1, exp:'✓ Hallucination is een bekend AI-risico. Controleer AI-output altijd kritisch, zeker bij vertrouwelijke bestuurlijke documenten.' },
    { lv:'B2', q:'Wat betekent \'bias\' in de context van AI-systemen?',
      opts:['Een technische programmeerfout die het systeem trager maakt','Systematische vertekening in AI-uitkomsten doordat het model is getraind op eenzijdige data','De voorkeur van een gebruiker voor een bepaalde AI-tool','De hoeveelheid rekenkracht die een AI-systeem verbruikt'],
      c:1, exp:'✓ Bias in AI kan leiden tot discriminerende of onjuiste uitkomsten. Wees bewust van dit risico bij AI-gegenereerde beleids- of communicatieteksten.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een digitaal archiefsysteem','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een vergadertool','Een videoconferentiesysteem'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het ondersteunt schrijf- en samenvattingstaken op basis van je invoer.' },
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met woordenboeken en woordenlijsten','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een zoekmachine die het internet doorzoekt','Een vertaalprogramma dat meerdere talen ondersteunt'],
      c:1, exp:'✓ LLM staat voor Large Language Model. Tools als Copilot zijn gebouwd op LLMs. Ze genereren tekst op basis van patronen, niet op feiten. Controleer altijd.' },
    { lv:'B1', q:'Waarom is kennis van het informatiebeveiligingsbeleid van de school belangrijk voor bestuursbureau-medewerkers?',
      opts:['Het is interessant maar niet nodig voor dagelijkse werkzaamheden','Het stelt je in staat om veilig en correct om te gaan met gevoelige en vertrouwelijke bestuursdocumenten','Dat is uitsluitend de verantwoordelijkheid van ICT','Alleen directieleden hoeven het beveiligingsbeleid te kennen'],
      c:1, exp:'✓ Op het bestuursbureau werk je dagelijks met vertrouwelijke informatie. Kennis van het beveiligingsbeleid is essentieel.' },
    { lv:'B2', q:'Wat verplicht de AVG ten aanzien van het bewaren van bestuursdocumenten met persoonsgegevens?',
      opts:['Alles onbeperkt bewaren','Persoonsgegevens bewaren zo lang als nodig voor het doel en daarna verwijderen conform bewaarbeleid','Alleen bestuursdocumenten bewaren met toestemming van alle betrokkenen','Alle documenten automatisch na 1 jaar verwijderen'],
      c:1, exp:'✓ De AVG hanteert het principe van opslagbeperking: bewaar persoonsgegevens niet langer dan noodzakelijk voor het doel.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen vertrouwelijke bestuursinformatie invoeren in een gratis AI-tool?',
      opts:['Omdat de tool dan trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor vertrouwelijke informatie onbedoeld wordt gedeeld','Omdat Microsoft dit technisch heeft geblokkeerd','Omdat collega\'s dat vervelend vinden'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor verdere training. Vertrouwelijke bestuursinformatie invoeren is een ernstig datalek-risico.' },
    { lv:'A2', q:'Wat is \'social engineering\' in de context van cyberveiligheid?',
      opts:['Het inzetten van sociale media voor interne communicatie','Het psychologisch manipuleren van mensen om vertrouwelijke informatie te delen of onveilige acties te ondernemen','Een methode om teamdynamiek te verbeteren','Het automatisch analyseren van gebruikersgedrag'],
      c:1, exp:'✓ Social engineering richt zich op mensen, niet op systemen. Medewerkers op het bestuursbureau zijn een aantrekkelijk doelwit vanwege toegang tot vertrouwelijke informatie.' },
    { lv:'B1', q:'Wat doe je voordat je bestuursdocumenten deelt via digitale kanalen?',
      opts:['Je gaat ervan uit dat het mag tenzij iemand het verbiedt','Je controleert het vertrouwelijkheidsniveau van het document, of het kanaal beveiligd is en of de ontvanger geautoriseerd is','Je vraagt altijd toestemming aan de ICT-afdeling','Je deelt alleen als je leidinggevende het expliciet vraagt'],
      c:1, exp:'✓ Bewust nadenken over informatiedeling is essentieel op het bestuursbureau. Privacy by design begint bij jou.' },
    { lv:'B2', q:'Hoe adviseer je collega\'s over veilig gebruik van digitale communicatiemiddelen?',
      opts:['Door ze een lijst van verboden tools te sturen','Door actief te signaleren als je onveilig gedrag ziet en collega\'s praktisch te helpen met veilige alternatieven','Door het door te geven aan ICT en zelf niets te doen','Door een werkgroep te starten maar zelf geen standpunt in te nemen'],
      c:1, exp:'✓ Actief adviseren over veiligheid is een B2-competentie: je combineert kennis met de bereidheid om anderen veiliger te laten werken.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je digitale tools om bestuurlijke processen te verbeteren?',
      opts:['Je gebruikt alleen de tools die je al kende toen je begon','Je onderzoekt welke tools jouw werk efficiënter of beter maken en zet ze gericht in','Je vermijdt nieuwe tools om fouten te voorkomen','Je vraagt ICT om tools te selecteren'],
      c:1, exp:'✓ Proactief digitaal werken betekent: tools inzetten die jouw werk concreet verbeteren.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in een digitaal werkproces?',
      opts:['Je houdt het voor jezelf','Je deelt het verbeterpunt met je leidinggevende of collega\'s en denkt mee over een oplossing','Je past het zelf aan zonder anderen te informeren','Je wacht totdat iemand anders het opmerkt'],
      c:1, exp:'✓ Verbeterpunten signaleren en delen is een professionele bijdrage. Op A2-niveau heb je het initiatief om dit te doen.' },
    { lv:'B1', q:'Hoe neem je initiatief bij het verbeteren van digitale werkprocessen?',
      opts:['Je werkt mee als anderen het initiatief nemen','Je signaleert knelpunten, brengt verbetervoorstellen in en trekt mee aan de uitvoering','Je overlegt eerst met alle betrokkenen','Je wacht op instructie van je leidinggevende'],
      c:1, exp:'✓ Initiatief nemen in procesverbetering is een kenmerk van B1-professioneel handelen.' },
    { lv:'B2', q:'Wat kenmerkt het leiden van een digitaal verbeterproject?',
      opts:['Je delegeert alles aan collega\'s en bewaakt de voortgang op afstand','Je brengt structuur aan, verbindt mensen, bewaakt voortgang en rapporteert aan betrokkenen','Je voert het project volledig zelfstandig uit','Je zorgt dat alle betrokkenen het eens zijn voordat er iets wordt besloten'],
      c:1, exp:'✓ Projectleiderschap vraagt structuur, verbinding en communicatie. Op B2 ben je degene die het geheel overziet en stuurt.' },
  ],
  student: [
    { lv:'A1', q:'Hoe reageer je als een collega vastloopt met een digitaal systeem?',
      opts:['Je geeft aan dat dat niet jouw verantwoordelijkheid is','Je helpt de collega op weg en legt uit wat je doet, zodat hij het volgende keer zelf kan','Je lost het altijd direct op voor de collega','Je stuurt de collega door naar ICT'],
      c:1, exp:'✓ Collega\'s helpen bij digitale problemen is een basisvorm van bijdragen aan de digitale ontwikkeling van het team.' },
    { lv:'A2', q:'Hoe deel je handige digitale werkwijzen met collega\'s?',
      opts:['Alleen als er een formele kennisdeelsessie is gepland','Via een informeel bericht, een korte demo of een tip in een overleg als je iets nuttigs ontdekt','Alleen als collega\'s er specifiek naar vragen','Door een handleiding te maken maar die niet actief te verspreiden'],
      c:1, exp:'✓ Actief kennisdelen hoeft niet formeel te zijn. Een korte tip of demo kan al heel effectief zijn.' },
    { lv:'B1', q:'Hoe draag je structureel bij aan de digitale ontwikkeling van je team?',
      opts:['Door eenmalig een training te geven','Door continu te signaleren waar digitale kennis ontbreekt en hier actief op in te spelen','Door te wachten totdat een leidinggevende een ontwikkelplan maakt','Door alleen je eigen vaardigheden te verbeteren'],
      c:1, exp:'✓ Structurele bijdrage betekent: blijven signaleren, verbinden en initiëren.' },
    { lv:'B2', q:'Hoe vertaal je digitale inzichten naar verbetervoorstellen?',
      opts:['Door inzichten te verzamelen maar ze voor jezelf te houden','Door patronen te analyseren en te vertalen naar heldere voorstellen voor leidinggevenden','Door alles door te sturen naar ICT','Door voorstellen op te schrijven maar niet te delen'],
      c:1, exp:'✓ Inzichten omzetten naar verbetervoorstellen vraagt analyse, heldere communicatie en moed om het gesprek aan te gaan.' },
  ],
},

// KQ voor MRK — deelt structuur met BST, tool-specifieke A1 vaardigheidsvraag
MRK: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot het beste inzetten in communicatiewerk?',
      opts:['Voor het automatisch publiceren van berichten op social media','Voor het schrijven van communicatieteksten, social media content of persberichten die je daarna kritisch beoordeelt','AI-tools zijn niet nuttig voor communicatiewerk','Voor het automatisch reageren op berichten van studenten'],
      c:1, exp:'✓ Copilot is een startpunt, geen eindproduct. Jij als communicatieprofessional bepaalt de toon, stijl en correctheid.' },
    { lv:'A2', q:'Waarom zijn digitale vaardigheden essentieel voor communicatieprofessionals?',
      opts:['Omdat alle communicatietools nu digitaal zijn en digitale vaardigheden je werk effectiever en toekomstbestendiger maken','Omdat de school het verplicht stelt','Alleen voor collega\'s die social media beheren','Dat is niet relevant voor interne communicatie'],
      c:0, exp:'✓ Digitale vaardigheden bepalen hoe effectief je communiceert. Tools als CMS, design- en analysetools zijn onmisbaar.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je digitale professionalisering als communicatieprofessional?',
      opts:['Je wacht op scholingsaanbod van de school','Je volgt zelf nieuwe digitale communicatietrends en experimenteert actief, ook buiten verplichte training','Je vraagt de ICT-afdeling om je bij te spijkeren','Je vindt het voldoende om bij te blijven met wat je al kunt'],
      c:1, exp:'✓ Eigen regie over je professionele ontwikkeling is essentieel in een vakgebied dat zo snel verandert als digitale communicatie.' },
    { lv:'B2', q:'Hoe inspireer je collega\'s met nieuwe digitale communicatiemogelijkheden?',
      opts:['Door te wachten totdat collega\'s je iets vragen','Door ervaringen, nieuwe tools en creatieve toepassingen actief te delen en voor te doen','Door je kennis voor jezelf te houden','Door alleen te delen als er een training voor georganiseerd wordt'],
      c:1, exp:'✓ Als communicatieprofessional ben jij een smaakmaker op B2-niveau: je inspireert en trekt anderen mee.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke digitale tools gebruikt Mondriaan primair voor communicatie en samenwerking?',
      opts:['Google Workspace en Canva','Microsoft Teams en Microsoft 365','Slack en Figma','Zoom en Adobe Suite'],
      c:1, exp:'✓ Mondriaan werkt met Microsoft Teams en Microsoft 365 als centrale tools voor communicatie en samenwerking.' },
    { lv:'A2', q:'Wat moet je controleren bij AI-gegenereerde communicatieteksten voordat je ze publiceert?',
      opts:['Niets, AI-teksten zijn altijd correct','Feitelijke juistheid, toon passend bij de doelgroep, auteursrechtelijke issues en conformiteit aan schoolbeleid','Alleen de spelfouten','Of de tekst lang genoeg is'],
      c:1, exp:'✓ AI-gegenereerde content is een startpunt. Als communicatieprofessional ben jij verantwoordelijk voor de kwaliteit, juistheid en toon.' },
    { lv:'B1', q:'Wat wordt bedoeld met een \'hallucination\' bij een AI-tool?',
      opts:['De AI werkt tijdelijk niet door een technische storing','De AI genereert feitelijk onjuiste of verzonnen informatie met groot zelfvertrouwen','De AI reageert traag door overbelasting','De AI begrijpt de vraag niet'],
      c:1, exp:'✓ Hallucination is een kritiek AI-risico voor communicatieprofessionals: publiceer nooit AI-content zonder factcheck.' },
    { lv:'B2', q:'Wat zijn de auteursrechtregels voor AI-gegenereerde beelden in externe communicatie?',
      opts:['AI-beelden zijn altijd vrij van auteursrecht','De auteursrechtelijke status van AI-beelden is complex en varieert per land en tool; controleer altijd de gebruiksvoorwaarden','Je mag AI-beelden altijd commercieel gebruiken','AI-beelden vallen altijd onder Creative Commons'],
      c:1, exp:'✓ AI-beelden kennen een complex auteursrechtelijk landschap. Controleer altijd de gebruiksvoorwaarden van je tool voordat je publiceert.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een designtool voor marketingmateriaal','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een social media schedulingtool','Een CMS voor websitebeheer'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het ondersteunt schrijf- en samenvattingstaken op basis van je invoer.' },
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met schrijfsjablonen','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een algoritme dat social media posts analyseert op bereik','Een vertaalprogramma'],
      c:1, exp:'✓ LLM staat voor Large Language Model — de basis van tools als Copilot. Ze genereren tekst op basis van patronen, niet op feiten.' },
    { lv:'B1', q:'Wat zegt de AVG over het gebruik van studentfoto\'s in marketingcampagnes?',
      opts:['Studentfoto\'s zijn altijd vrij te gebruiken voor schoolcommunicatie','Studentfoto\'s zijn persoonsgegevens: gebruik vereist expliciete en geïnformeerde toestemming van de student','Toestemming van de opleiding is voldoende','Je mag foto\'s gebruiken zolang de student ingeschreven is'],
      c:1, exp:'✓ Foto\'s zijn persoonsgegevens. Voor gebruik in marketingmateriaal is explicite toestemming vereist conform de AVG.' },
    { lv:'B2', q:'Wat betekent \'bias\' in AI-gegenereerde content voor communicatieprofessionals?',
      opts:['Een technische fout waardoor de tool trager werkt','AI-content kan systematisch bepaalde groepen over- of ondervertegenwoordigen door eenzijdige trainingsdata','De voorkeur van de gebruiker voor een bepaalde schrijfstijl','De hoeveelheid rekenkracht die het systeem verbruikt'],
      c:1, exp:'✓ Bias in AI-content kan leiden tot onbedoelde uitsluiting of stereotypering. Bekijk AI-content altijd kritisch op representatie.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen persoonsgegevens van studenten invoeren in gratis AI-tools voor marketingteksten?',
      opts:['Omdat de tool dan trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor training, waardoor persoonsgegevens onbedoeld worden gedeeld','Omdat Microsoft dit technisch heeft geblokkeerd','Omdat studenten dat vervelend vinden'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor verdere training. Persoonsgegevens invoeren is een schending van de AVG.' },
    { lv:'A2', q:'Wanneer moet je AI-gegenereerde content labelen als AI-generated?',
      opts:['Nooit, want AI is slechts een hulpmiddel','Wanneer het schoolbeleid, sectorrichtlijnen of de context (bijv. journalistiek) dit vereist of wanneer het voor de ontvanger relevant is','Altijd, bij elk AI-gebruik','Alleen bij woordelijke AI-teksten, niet bij beelden'],
      c:1, exp:'✓ Transparantie over AI-gebruik is een groeiende ethische norm. Volg schoolbeleid en wees proactief bij twijfel.' },
    { lv:'B1', q:'Welke ethische aspecten zijn relevant bij AI-gebruik in marketingcommunicatie?',
      opts:['Alleen of de tool genoeg functies heeft','Auteursrecht van AI-content, privacy van afgebeelde personen, authenticiteit van de boodschap en mogelijke bias','Of de leverancier een Nederlands bedrijf is','Alleen of de tool gratis is'],
      c:1, exp:'✓ Auteursrecht, privacy, authenticiteit en bias zijn allemaal relevante ethische factoren bij AI in communicatie.' },
    { lv:'B2', q:'Hoe draag je bij aan een ethische communicatiecultuur bij de school?',
      opts:['Door zelf geen AI te gebruiken als voorbeeld voor collega\'s','Door mee te schrijven aan richtlijnen, collega\'s te informeren en het gesprek over verantwoord AI-gebruik in communicatie actief aan te gaan','Door uitsluitend te vertrouwen op wat de ICT-afdeling communiceert','Door extern bureau alle AI-content te laten beoordelen'],
      c:1, exp:'✓ Een ethische communicatiecultuur vereist actieve inzet: richtlijnen opstellen, kennis delen en het gesprek voeren.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je digitale tools actief om communicatiewerk te verbeteren?',
      opts:['Je gebruikt alleen de tools die je al kende','Je onderzoekt welke tools jouw communicatiewerk efficiënter of creatiever maken en zet ze gericht in','Je vermijdt nieuwe tools om fouten te voorkomen','Je vraagt ICT om tools te selecteren'],
      c:1, exp:'✓ Proactief digitaal werken in communicatie betekent: tools inzetten die jouw creativiteit en effectiviteit vergroten.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in digitale communicatieprocessen?',
      opts:['Je houdt het voor jezelf','Je deelt het verbeterpunt met je team of leidinggevende en denkt mee over een oplossing','Je past het zelf aan zonder anderen te informeren','Je wacht totdat iemand anders het opmerkt'],
      c:1, exp:'✓ Verbeterpunten signaleren en delen is professioneel gedrag in een snelveranderend digitaal communicatievak.' },
    { lv:'B1', q:'Hoe neem je initiatief bij het verbeteren van digitale communicatieprocessen?',
      opts:['Je werkt mee als anderen het initiatief nemen','Je signaleert kansen, brengt verbetervoorstellen in en trekt mee aan de uitvoering','Je overlegt eerst met alle betrokkenen','Je wacht op instructie'],
      c:1, exp:'✓ Initiatief nemen in procesverbetering is een kenmerk van B1-professioneel handelen.' },
    { lv:'B2', q:'Wat kenmerkt het leiden van een digitaal communicatie-innovatieproject?',
      opts:['Je delegeert alles en bewaakt op afstand','Je brengt structuur aan, verbindt mensen met expertise, bewaakt voortgang en rapporteert aan betrokkenen','Je voert het volledig zelfstandig uit','Je zorgt dat iedereen het eens is voordat er iets wordt besloten'],
      c:1, exp:'✓ Projectleiderschap in communicatie vraagt creativiteit, structuur en samenwerking.' },
  ],
  student: [
    { lv:'A1', q:'Hoe help je een collega die vastloopt met een communicatietool of CMS?',
      opts:['Je geeft aan dat dat niet jouw verantwoordelijkheid is','Je helpt de collega op weg en legt uit wat je doet, zodat hij het volgende keer zelf kan','Je lost het altijd direct op','Je stuurt de collega door naar ICT'],
      c:1, exp:'✓ Collega\'s helpen bij digitale tools is een basisvorm van bijdragen aan de digitale kwaliteit van het team.' },
    { lv:'A2', q:'Hoe deel je kennis over nieuwe digitale communicatietools met collega\'s?',
      opts:['Alleen als er een formele kennisdeelsessie is gepland','Via een informeel bericht, een korte demo of een tip in een overleg','Alleen als collega\'s er specifiek naar vragen','Door een handleiding te maken maar die niet te verspreiden'],
      c:1, exp:'✓ Kennisdelen in communicatieteams verhoogt de collectieve kwaliteit. Een korte demo kan al heel effectief zijn.' },
    { lv:'B1', q:'Hoe draag je structureel bij aan de digitale communicatieontwikkeling van je team?',
      opts:['Door eenmalig een training te geven','Door continu te signaleren waar digitale kennis of skills ontbreken en hier actief op in te spelen','Door te wachten op een ontwikkelplan van de leidinggevende','Door alleen je eigen vaardigheden te verbeteren'],
      c:1, exp:'✓ Structurele bijdrage betekent: blijven signaleren, inspireren en verbinden.' },
    { lv:'B2', q:'Hoe vertaal je communicatie-inzichten naar verbetervoorstellen voor de organisatie?',
      opts:['Door inzichten te verzamelen maar ze voor jezelf te houden','Door trends en resultaten te analyseren en te vertalen naar heldere aanbevelingen voor leidinggevenden','Door alles door te sturen naar de directie','Door voorstellen op te schrijven maar ze niet actief te delen'],
      c:1, exp:'✓ Inzichten omzetten naar verbetervoorstellen vraagt analyse, heldere communicatie en een actieve houding.' },
  ],
},

// KQ voor FAC — deelt structuur, facilitair-specifieke A1 vaardigheidsvraag
FAC: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot het beste inzetten in facilitair werk?',
      opts:['Voor het automatisch plannen van werkorders','Voor het schrijven van rapportages, werkinstructies of correspondentie die je daarna kritisch beoordeelt','AI-tools zijn niet nuttig voor facilitair werk','Voor het automatisch beheren van voorraden'],
      c:1, exp:'✓ Copilot ondersteunt schrijf- en samenvattingstaken. Als facilitair professional blijf jij verantwoordelijk voor de inhoud en uitvoering.' },
    { lv:'A2', q:'Waarom zijn digitale vaardigheden relevant voor facilitair personeel?',
      opts:['Omdat alle facilitaire systemen nu digitaal zijn en digitale vaardigheden je werk efficiënter maken','Omdat de school het verplicht stelt','Alleen voor collega\'s die ICT-taken uitvoeren','Dat is niet relevant voor praktisch werk'],
      c:0, exp:'✓ Digitale vaardigheden zijn ook in facilitair werk essentieel: werkordersystemen, gebouwbeheer en rapportages zijn allemaal digitaal.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je digitale professionalisering?',
      opts:['Je wacht op scholingsaanbod van de school','Je zoekt zelf naar nieuwe tools en werkwijzen die jouw werk effectiever maken, ook buiten verplichte training','Je vraagt de ICT-afdeling om je bij te spijkeren','Je vindt het voldoende om bij te blijven met wat je al kunt'],
      c:1, exp:'✓ Eigen regie over je professionele ontwikkeling is een kenmerk van vakmanschap, ook in de facilitaire dienst.' },
    { lv:'B2', q:'Hoe deel je digitale kennis actief met collega\'s in de facilitaire dienst?',
      opts:['Door te wachten totdat collega\'s je iets vragen','Door tips, werkwijzen en tools spontaan te delen via overleg of een korte demo','Door je kennis voor jezelf te houden','Door alleen te delen als er een training voor georganiseerd wordt'],
      c:1, exp:'✓ Actief kennisdelen maakt teams sterker, ook in de facilitaire dienst.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke digitale communicatietool gebruikt Mondriaan primair voor intern overleg?',
      opts:['Google Meet','Microsoft Teams','Skype','Zoom'],
      c:1, exp:'✓ Mondriaan gebruikt Microsoft Teams als primaire tool voor interne communicatie, vergaderingen en samenwerking.' },
    { lv:'A2', q:'Voor welke taken kun je Copilot zinvol inzetten in facilitair werk?',
      opts:['Voor het automatisch plannen van onderhoud zonder menselijk toezicht','Voor het schrijven van rapportages, werkinstructies of correspondentie','Voor het beheren van toegangsrechten tot gebouwen','Voor het bestellen van materialen zonder goedkeuring'],
      c:1, exp:'✓ Copilot is handig bij schrijf- en samenvattingstaken in de facilitaire dienst. Controleer altijd de output en voer geen privacygevoelige data in.' },
    { lv:'B1', q:'Wat wordt bedoeld met een \'hallucination\' bij een AI-tool?',
      opts:['De AI werkt tijdelijk niet','De AI genereert feitelijk onjuiste informatie met groot zelfvertrouwen','De AI reageert traag','De AI begrijpt de vraag niet'],
      c:1, exp:'✓ Hallucination is een AI-risico: controleer kritisch, ook bij AI-ondersteuning bij facilitaire rapportages.' },
    { lv:'B2', q:'Wat betekent \'bias\' in de context van AI-systemen?',
      opts:['Een technische fout','Systematische vertekening in AI-uitkomsten door eenzijdige trainingsdata','De voorkeur van de gebruiker','De verwerkingssnelheid'],
      c:1, exp:'✓ Bias in AI kan leiden tot onjuiste uitkomsten. Wees bewust van dit risico bij AI-ondersteuning in facilitaire planning en rapportages.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een digitaal werkordersysteem','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een gebouwbeheersysteem','Een planningsapplicatie'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het ondersteunt schrijf- en samenvattingstaken op basis van je invoer.' },
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met facilitaire handleidingen','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een planningsalgoritme voor roosterindeling','Een vertaalprogramma'],
      c:1, exp:'✓ LLM staat voor Large Language Model. Tools als Copilot zijn gebouwd op LLMs. Ze genereren tekst op basis van patronen, niet op feiten.' },
    { lv:'B1', q:'Wat zijn de privacyregels voor camera- en toegangsdata in schoolgebouwen?',
      opts:['Camera- en toegangsdata mogen onbeperkt worden bewaard','Camera- en toegangsdata zijn persoonsgegevens: bewaar ze zo kort als nodig en geef alleen geautoriseerde medewerkers toegang','Iedereen in de facilitaire dienst mag altijd camerabeelden bekijken','Toestemming van de directie volstaat voor elk gebruik'],
      c:1, exp:'✓ Camera- en toegangsdata zijn persoonsgegevens en vallen onder de AVG. Bewaar alleen zo lang als nodig en beperk toegang.' },
    { lv:'B2', q:'Wat verplicht de AVG ten aanzien van cameratoezicht in schoolgebouwen?',
      opts:['Er zijn geen regels voor cameratoezicht in onderwijsinstellingen','Cameratoezicht moet een legitiem doel hebben, proportioneel zijn en er moet een privacyverklaring zijn voor bezoekers en medewerkers','Cameratoezicht is altijd toegestaan voor veiligheid','Alleen de directeur mag beslissen over cameraplaatsing'],
      c:1, exp:'✓ Cameratoezicht valt onder de AVG: legitiem doel, proportionaliteit en transparantie zijn verplicht.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom behandel je gegevens uit toegangssystemen vertrouwelijk?',
      opts:['Omdat het systeem anders trager wordt','Omdat toegangsdata persoonsgegevens zijn die alleen gebruikt mogen worden voor het doel waarvoor ze zijn verzameld','Omdat de ICT-afdeling dit heeft gevraagd','Omdat studenten dat vervelend vinden'],
      c:1, exp:'✓ Toegangsdata zijn persoonsgegevens. Ze mogen alleen gebruikt worden voor veiligheids- en toegangsbeheer, niet voor andere doeleinden.' },
    { lv:'A2', q:'Wat is phishing en hoe herken je het?',
      opts:['Software die automatisch virussen opspoort','Een aanvalsmethode waarbij nep-berichten worden gebruikt om inloggegevens te stelen','Een methode om wachtwoorden te raden','Een beveiligingsprotocol'],
      c:1, exp:'✓ Phishing is de meest voorkomende cyberaanval. Herkenningspunten: onverwachte urgentie, vreemde afzender, verdachte links. Klik niet, meld bij ICT.' },
    { lv:'B1', q:'Wat doe je als je vermoedt dat een digitaal toegangssysteem gehackt is of misbruikt wordt?',
      opts:['Je lost het zelf op door de instellingen aan te passen','Je meldt het direct bij ICT en je leidinggevende en logt geen onnodige handelingen in het systeem','Je wacht af of het vanzelf opgelost wordt','Je informeert alleen de beveiligingsdienst'],
      c:1, exp:'✓ Bij vermoedens van misbruik of inbraak meld je direct. Facilitaire systemen zijn cruciaal voor de veiligheid van het gebouw.' },
    { lv:'B2', q:'Hoe adviseer je collega\'s over veilig omgaan met facilitaire digitale systemen?',
      opts:['Door ze een lijst van verboden handelingen te sturen','Door actief te signaleren als je onveilig gedrag ziet en collega\'s praktisch te helpen','Door het door te geven aan ICT','Door een werkgroep te starten maar zelf geen standpunt in te nemen'],
      c:1, exp:'✓ Actief adviseren over veiligheid is een B2-competentie voor facilitaire medewerkers.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je digitale tools om facilitaire processen te verbeteren?',
      opts:['Je gebruikt alleen de tools die je al kende','Je onderzoekt welke tools jouw werk efficiënter of beter maken en zet ze gericht in','Je vermijdt nieuwe tools','Je vraagt ICT om tools te selecteren'],
      c:1, exp:'✓ Proactief digitaal werken betekent: tools inzetten die facilitaire processen concreet verbeteren.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in een digitaal facilitair werkproces?',
      opts:['Je houdt het voor jezelf','Je deelt het verbeterpunt met je leidinggevende of collega\'s','Je past het zelf aan','Je wacht totdat iemand anders het opmerkt'],
      c:1, exp:'✓ Verbeterpunten signaleren en delen is professioneel gedrag.' },
    { lv:'B1', q:'Hoe neem je initiatief bij het verbeteren van digitale facilitaire werkprocessen?',
      opts:['Je werkt mee als anderen het initiatief nemen','Je signaleert knelpunten, brengt verbetervoorstellen in en trekt mee aan de uitvoering','Je overlegt eerst met alle betrokkenen','Je wacht op instructie'],
      c:1, exp:'✓ Initiatief nemen in procesverbetering is een kenmerk van B1-professioneel handelen.' },
    { lv:'B2', q:'Wat kenmerkt het leiden van een digitaal verbeterproject in de facilitaire dienst?',
      opts:['Je delegeert alles','Je brengt structuur aan, verbindt mensen, bewaakt voortgang en rapporteert','Je voert alles zelf uit','Je wacht op consensus'],
      c:1, exp:'✓ Projectleiderschap in de facilitaire dienst vraagt structuur, samenwerking en resultaatgerichtheid.' },
  ],
  student: [
    { lv:'A1', q:'Hoe help je een collega die vastloopt met een digitaal facilitair systeem?',
      opts:['Je geeft aan dat dat niet jouw taak is','Je helpt de collega op weg en legt uit wat je doet','Je lost het altijd direct op','Je stuurt de collega door naar ICT'],
      c:1, exp:'✓ Collega\'s helpen bij digitale systemen draagt bij aan de digitale kwaliteit van het team.' },
    { lv:'A2', q:'Hoe deel je kennis over digitale facilitaire werkwijzen met collega\'s?',
      opts:['Alleen als er een formele sessie is gepland','Via een informeel bericht, demo of tip in een overleg','Alleen als collega\'s er specifiek naar vragen','Door een handleiding te maken maar niet te delen'],
      c:1, exp:'✓ Informeel kennisdelen is in de facilitaire dienst net zo waardevol als formele training.' },
    { lv:'B1', q:'Hoe draag je structureel bij aan de digitale kwaliteit van de facilitaire dienst?',
      opts:['Door eenmalig een training te geven','Door continu te signaleren waar digitale kennis ontbreekt en hier actief op in te spelen','Door te wachten op een ontwikkelplan','Door alleen je eigen vaardigheden te verbeteren'],
      c:1, exp:'✓ Structurele bijdrage betekent: blijven signaleren en initiëren.' },
    { lv:'B2', q:'Hoe vertaal je facilitaire inzichten naar verbetervoorstellen?',
      opts:['Door inzichten voor jezelf te houden','Door trends te analyseren en te vertalen naar heldere voorstellen','Door alles door te sturen naar ICT','Door voorstellen op te schrijven maar niet te delen'],
      c:1, exp:'✓ Inzichten omzetten naar verbetervoorstellen vraagt analyse en communicatief vermogen.' },
  ],
},

// KQ voor OOA — deels gebaseerd op OOP KQ, met kwaliteitszorg-specifieke aanpassingen
OOA: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot inzetten in onderwijsondersteuning en kwaliteitszorg?',
      opts:['Voor het automatisch beoordelen van studenten','Voor het schrijven van kwaliteitsrapporten, beleidsteksten of feedbacksamenvatting die je kritisch beoordeelt','AI-tools zijn alleen nuttig voor docenten','Voor het automatisch genereren van accreditatiedossiers'],
      c:1, exp:'✓ Copilot ondersteunt schrijf- en analyseselecties. In kwaliteitszorg blijft menselijk oordeel essentieel.' },
    { lv:'A2', q:'Waarom zijn digitale vaardigheden relevant voor medewerkers OOA?',
      opts:['Omdat data-analyse en EdTech je werk effectiever en toekomstbestendiger maken','Omdat de school het verplicht stelt','Alleen voor collega\'s die LMS-systemen beheren','Dat is niet relevant in een adviesrol'],
      c:0, exp:'✓ Data-analyse, EdTech-kennis en digitale communicatie zijn kernvaardigheden voor ondersteuning en advies in het onderwijs.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je digitale professionalisering als OOA-medewerker?',
      opts:['Je wacht op scholingsaanbod','Je volgt actief nieuwe EdTech-ontwikkelingen en experimenteert zelf, ook buiten verplichte training','Je vraagt ICT om advies','Je vindt het voldoende om bij te blijven'],
      c:1, exp:'✓ In onderwijsondersteuning en -advies vraagt eigen regie ook het bijhouden van EdTech en onderwijsinnovatietrends.' },
    { lv:'B2', q:'Hoe inspireer je docenten en collega\'s met nieuwe digitale mogelijkheden voor onderwijs?',
      opts:['Door te wachten totdat collega\'s vragen stellen','Door ervaringen en nieuwe digitale onderwijsmethoden actief te delen en te laten zien','Door je kennis voor jezelf te houden','Door alleen te delen in formele scholing'],
      c:1, exp:'✓ Als OOA-medewerker op B2-niveau ben je een actieve verspreider van digitale kennis in het onderwijs.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke digitale leeromgeving(en) gebruikt Mondriaan?',
      opts:['Google Classroom en Zoom','Microsoft Teams en bij sommige scholen Moodle','Blackboard en Skype','Canvas en Webex'],
      c:1, exp:'✓ Mondriaan werkt met Microsoft Teams als hoofdplatform. Bij sommige scholen is Moodle als leeromgeving in gebruik.' },
    { lv:'A2', q:'Hoe kun je Copilot zinvol inzetten in kwaliteitszorg en onderwijsadvies?',
      opts:['Door accreditatiedossiers volledig door Copilot te laten genereren','Door Copilot te gebruiken als ondersteuning bij het schrijven van rapporten, samenvatten van feedback of analyseren van data-uitkomsten','Door studenten te laten communiceren via Copilot','Door Copilot onderwijskundige adviezen te laten geven'],
      c:1, exp:'✓ Copilot is een ondersteunend instrument. Het onderwijskundige oordeel en de kwaliteitsverantwoordelijkheid blijven bij jou.' },
    { lv:'B1', q:'Wat wordt bedoeld met een \'hallucination\' bij een AI-tool?',
      opts:['De AI werkt tijdelijk niet','De AI genereert feitelijk onjuiste informatie met groot zelfvertrouwen','De AI reageert traag','De AI begrijpt de vraag niet'],
      c:1, exp:'✓ Hallucination is een kritiek AI-risico in kwaliteitszorg: publiceer of gebruik nooit AI-output zonder kritische controle.' },
    { lv:'B2', q:'Wat betekent \'bias\' in AI-systemen bij gebruik in onderwijsanalyse?',
      opts:['Een technische fout','Systematische vertekening door eenzijdige trainingsdata, die onterecht bepaalde studentgroepen kan benadelen','De voorkeur van de gebruiker','De verwerkingssnelheid'],
      c:1, exp:'✓ Bias in AI-analyses kan onderwijsongelijkheid vergroten. Kijk kritisch op representatie en eerlijkheid bij data-gedreven kwaliteitszorg.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een kwaliteitsmanagementsysteem','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt','Een LMS voor studenten','Een accreditatietool'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het ondersteunt schrijf- en samenvattingstaken op basis van je invoer.' },
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met onderwijsstandaarden','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een algoritme dat leeruitkomsten berekent','Een vertaalprogramma'],
      c:1, exp:'✓ LLM staat voor Large Language Model — de basis van tools als Copilot. Ze genereren op basis van patronen, niet op feiten.' },
    { lv:'B1', q:'Wat zegt de AVG over het gebruik van studentresultaten in kwaliteitsanalyses?',
      opts:['Resultaten mogen vrij worden gedeeld als het de onderwijskwaliteit verbetert','Studentresultaten zijn persoonsgegevens: gebruik ze alleen voor het doel waarvoor ze verzameld zijn en werk met geanonimiseerde data waar mogelijk','De AVG geldt niet voor onderwijskundige analyses','Toestemming van de opleiding is voldoende'],
      c:1, exp:'✓ Studentresultaten zijn persoonsgegevens. Anonimiseer data voor analyses en gebruik ze alleen voor het doel waarvoor ze verzameld zijn.' },
    { lv:'B2', q:'Wat betekent \'bias\' in de context van AI-gestuurde studieadvisering?',
      opts:['Een programmeerfout in het adviessysteem','AI-adviessystemen kunnen structureel bepaalde studentgroepen benadelen door eenzijdige trainingsdata','De voorkeur van de adviseur voor bepaalde studierichtingen','De snelheid waarmee het systeem advies geeft'],
      c:1, exp:'✓ Bias in AI-gestuurde advisering kan onderwijsongelijkheid vergroten. Kwaliteitszorgprofessionals moeten dit actief monitoren.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen studentgegevens invoeren in gratis AI-tools?',
      opts:['Omdat de tool trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor persoonsgegevens onbedoeld worden gedeeld','Omdat Microsoft dit technisch geblokkeerd heeft','Omdat studenten dat vervelend vinden'],
      c:1, exp:'✓ Gratis AI-tools kunnen jouw invoer gebruiken voor verdere training. Studentgegevens invoeren is een AVG-schending.' },
    { lv:'A2', q:'Hoe ga je ethisch om met onderwijsdata in kwaliteitsanalyses?',
      opts:['Je deelt onderwijsdata vrij als het de kwaliteit verbetert','Je werkt met geanonimiseerde data waar mogelijk, deelt alleen via goedgekeurde systemen en gebruikt data alleen voor het analyse-doel','De AVG geldt niet voor interne analyses','Je vraagt ICT om dit te regelen'],
      c:1, exp:'✓ Verantwoord gebruik van onderwijsdata betekent: minimale data, geanonimiseerd waar mogelijk, goedgekeurde systemen.' },
    { lv:'B1', q:'Welke ethische aspecten zijn relevant bij data-gedreven onderwijsontwikkeling?',
      opts:['Alleen of de data correct is','Privacy van studenten, mogelijke bias in data-uitkomsten, transparantie over welke data gebruikt wordt en het effect op studenten','Of de data makkelijk te exporteren is','Alleen of studenten toestemming hebben gegeven via een pop-up'],
      c:1, exp:'✓ Privacy, bias, transparantie en studentbelang zijn alle relevante ethische factoren bij data-gedreven kwaliteitszorg.' },
    { lv:'B2', q:'Hoe draag je bij aan ethisch verantwoord gebruik van EdTech?',
      opts:['Door zelf geen EdTech te gebruiken','Door mee te schrijven aan richtlijnen, docenten te informeren en het gesprek over verantwoord EdTech-gebruik aan te gaan','Door te vertrouwen op wat de leverancier communiceert','Door individueel te handelen zonder overleg'],
      c:1, exp:'✓ Ethisch EdTech-gebruik vereist actieve inzet van OOA-professionals: richtlijnen, kennisdeling en dialoog.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je digitale tools om onderwijsondersteuning te verbeteren?',
      opts:['Je gebruikt alleen de tools die je al kende','Je onderzoekt welke tools jouw ondersteuningswerk efficiënter of kwalitatiever maken','Je vermijdt nieuwe tools','Je vraagt ICT om tools te selecteren'],
      c:1, exp:'✓ Proactief digitaal werken in onderwijsondersteuning betekent: tools inzetten die de kwaliteit van ondersteuning verhogen.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in digitale onderwijsondersteuningsprocessen?',
      opts:['Je houdt het voor jezelf','Je deelt het verbeterpunt met docenten of leidinggevenden en denkt mee','Je past het zelf aan','Je wacht totdat iemand anders het opmerkt'],
      c:1, exp:'✓ Verbeterpunten signaleren en delen is een kerncompetentie van een goed onderwijsadviseur.' },
    { lv:'B1', q:'Hoe neem je initiatief bij het verbeteren van digitale kwaliteitszorgprocessen?',
      opts:['Je werkt mee als anderen het initiatief nemen','Je signaleert kansen, brengt verbetervoorstellen in en trekt mee aan de uitvoering','Je overlegt eerst met iedereen','Je wacht op instructie'],
      c:1, exp:'✓ Initiatief nemen is een kernkenmerk van B1-professioneel handelen in onderwijsondersteuning.' },
    { lv:'B2', q:'Wat kenmerkt het leiden van een project voor digitale onderwijskwaliteitsverbetering?',
      opts:['Je delegeert alles','Je brengt structuur aan, verbindt betrokkenen, bewaakt voortgang en rapporteert','Je voert alles zelfstandig uit','Je zorgt dat iedereen het eens is voor je begint'],
      c:1, exp:'✓ Projectleiderschap in kwaliteitszorg vraagt structuur, samenwerking en inhoudelijk overzicht.' },
  ],
  student: [
    { lv:'A1', q:'Hoe help je een docent die vastloopt met een digitaal systeem voor onderwijs of kwaliteitszorg?',
      opts:['Je geeft aan dat dat niet jouw taak is','Je helpt de docent stap voor stap op weg en legt uit wat je doet','Je lost het altijd direct op','Je stuurt de docent door naar ICT'],
      c:1, exp:'✓ Docenten ondersteunen bij digitale problemen is een basisvorm van OOA-bijdrage aan onderwijskwaliteit.' },
    { lv:'A2', q:'Hoe deel je kennis over digitale onderwijsmethoden met docenten?',
      opts:['Alleen als er een formele kennisdeelsessie is gepland','Via informeel contact, een demonstratie of een tip in een overleg','Alleen als docenten er zelf om vragen','Door een handleiding te maken maar die niet actief te verspreiden'],
      c:1, exp:'✓ Informeel kennisdelen met docenten is in onderwijsondersteuning net zo waardevol als formele training.' },
    { lv:'B1', q:'Hoe draag je structureel bij aan de digitale kwaliteitsontwikkeling van het onderwijs?',
      opts:['Door eenmalig een training te geven','Door continu te signaleren waar digitale kansen of knelpunten zijn en hier actief op in te spelen','Door te wachten op een ontwikkelplan','Door alleen je eigen vaardigheden te verbeteren'],
      c:1, exp:'✓ Structurele bijdrage aan onderwijskwaliteit betekent: blijven signaleren, adviseren en verbinden.' },
    { lv:'B2', q:'Hoe vertaal je onderwijsdata en -inzichten naar verbetervoorstellen?',
      opts:['Door inzichten voor jezelf te houden','Door data en trends te analyseren en te vertalen naar heldere aanbevelingen voor docenten en management','Door alles door te sturen naar de kwaliteitscoördinator','Door voorstellen op te schrijven maar ze niet actief te delen'],
      c:1, exp:'✓ Inzichten vertalen naar verbetervoorstellen is een kerncompetentie van een goed onderwijsadviseur.' },
  ],
},

// KQ voor FIN — financieel-specifieke aanpassingen
FIN: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot het beste inzetten in financieel werk?',
      opts:['Voor het automatisch boeken van financiële transacties','Voor het samenvatten van rapportages, schrijven van toelichtende teksten of opstellen van beleidsnotities','AI-tools zijn niet nuttig voor financieel werk','Voor het automatisch genereren van jaarrekeningen'],
      c:1, exp:'✓ Copilot ondersteunt schrijf- en samenvattingstaken. Financiële beslissingen en controle blijven altijd menselijk werk.' },
    { lv:'A2', q:'Waarom zijn digitale vaardigheden relevant voor financieel personeel?',
      opts:['Omdat alle financiële systemen digitaal zijn en digitale vaardigheden je werk efficiënter en betrouwbaarder maken','Omdat de school het verplicht stelt','Alleen voor collega\'s die rapportages maken','Dat is niet relevant voor routinematig financieel werk'],
      c:0, exp:'✓ Digitale vaardigheden zijn in financiën essentieel: systemen, data-analyse en rapportage zijn volledig digitaal.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je digitale professionalisering in finance?',
      opts:['Je wacht op scholingsaanbod','Je zoekt zelf naar nieuwe tools en werkwijzen die jouw werk effectiever maken, ook buiten verplichte training','Je vraagt ICT om advies','Je vindt het voldoende om bij te blijven'],
      c:1, exp:'✓ Eigen regie over je professionele ontwikkeling is een kenmerk van vakmanschap, ook in de financiële functie.' },
    { lv:'B2', q:'Hoe deel je digitale kennis actief met collega\'s in finance?',
      opts:['Door te wachten totdat collega\'s je iets vragen','Door tips, werkwijzen en tools spontaan te delen via overleg of een korte demo','Door je kennis voor jezelf te houden','Door alleen te delen als er een training voor georganiseerd wordt'],
      c:1, exp:'✓ Actief kennisdelen in finance maakt teams sterker en verhoogt de kwaliteit van financiële informatievoorziening.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welk financieel administratiesysteem gebruikt Mondriaan?',
      opts:['SAP en Google Sheets','AFAS','Oracle Financials','Exact Online'],
      c:1, exp:'✓ Mondriaan gebruikt AFAS als financieel systeem voor boekhouding, administratie en financiële rapportage.' },
    { lv:'A2', q:'Voor welke taken kun je Copilot zinvol inzetten in financieel werk?',
      opts:['Voor het automatisch verwerken van facturen zonder controle','Voor het schrijven van toelichtende teksten bij rapportages en het samenvatten van financiële data','Voor het nemen van financiële beslissingen','Voor het beheren van banktransacties zonder menselijk toezicht'],
      c:1, exp:'✓ Copilot is handig bij schrijf- en samenvattingstaken. Voer nooit financiële of vertrouwelijke data in en controleer altijd de output.' },
    { lv:'B1', q:'Wat wordt bedoeld met een \'hallucination\' bij een AI-tool?',
      opts:['De AI werkt tijdelijk niet','De AI genereert feitelijk onjuiste informatie met groot zelfvertrouwen','De AI reageert traag','De AI begrijpt de vraag niet'],
      c:1, exp:'✓ Hallucination is een ernstig AI-risico in financieel werk: verifieer alle AI-output aan brondata voordat je het gebruikt.' },
    { lv:'B2', q:'Wat betekent \'bias\' in AI bij financiële analyses?',
      opts:['Een technische fout','Systematische vertekening door eenzijdige trainingsdata, waardoor analyses onterecht bepaalde eenheden benadelen','De voorkeur van de gebruiker','De verwerkingssnelheid'],
      c:1, exp:'✓ Bias in financiële AI-analyses kan leiden tot onjuiste conclusies. Kritisch controleren is in finance altijd verplicht.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een financieel boekhoudprogramma','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een rapportagesysteem','Een dashboardtool'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het ondersteunt schrijf- en samenvattingstaken op basis van je invoer.' },
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met financiële regels','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een algoritme dat financiële risico\'s berekent','Een vertaalprogramma'],
      c:1, exp:'✓ LLM staat voor Large Language Model — de basis van tools als Copilot. Ze genereren op basis van patronen, niet op feiten.' },
    { lv:'B1', q:'Welke verplichtingen stelt de AVG aan het verwerken van financieel-gerelateerde persoonsgegevens?',
      opts:['Financiële gegevens zijn geen persoonsgegevens en vallen niet onder de AVG','Salarisgegevens en declaraties zijn persoonsgegevens: verwerk ze alleen via goedgekeurde systemen en bewaar ze niet langer dan nodig','De AVG geldt alleen voor externe partijen','Alleen de directeur beslist over verwerking van financiële persoonsgegevens'],
      c:1, exp:'✓ Salarisgegevens en declaraties zijn persoonsgegevens. Verwerk ze zorgvuldig conform de AVG.' },
    { lv:'B2', q:'Wat verplicht de NIS2-richtlijn voor financiële systemen van onderwijsinstellingen?',
      opts:['Alle financiële systemen verbieden','Cybersecurity borgen: risico\'s beheren, incidenten melden en medewerkers trainen in digitale veiligheid','Alleen gebruik maken van Europese software','Jaarlijks een externe audit uitvoeren'],
      c:1, exp:'✓ NIS2 verplicht onderwijsinstellingen om cybersecurity structureel te borgen, ook voor financiële informatiesystemen.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen financiële data invoeren in een gratis AI-tool?',
      opts:['Omdat de tool dan trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor vertrouwelijke financiële informatie onbedoeld wordt gedeeld','Omdat Microsoft dit technisch heeft geblokkeerd','Omdat collega\'s dat vervelend vinden'],
      c:1, exp:'✓ Financiële data is vertrouwelijk. Invoer in gratis AI-tools is een ernstig veiligheids- en integriteitsrisico.' },
    { lv:'A2', q:'Wat is tweestapsverificatie (2FA) en waarom is het cruciaal voor financiële systemen?',
      opts:['Je wachtwoord twee keer invoeren','Een extra verificatiestap naast je wachtwoord, zoals een app-code — cruciaal voor financiële systemen omdat een gecompromitteerd account tot fraude kan leiden','Twee wachtwoorden aanmaken voor één account','Je account delen met een collega als backup'],
      c:1, exp:'✓ 2FA is de minimale beveiligingsstandaard voor financiële systemen. Zelfs als je wachtwoord gestolen is, beschermt 2FA je account.' },
    { lv:'B1', q:'Hoe zorg je voor scheiding van taken (functiescheiding) in digitale financiële processen?',
      opts:['Één persoon voert alle financiële handelingen uit voor maximale efficiëntie','Je zorgt dat kritische handelingen zoals aanmaken, goedkeuren en betalen door verschillende personen worden uitgevoerd, ook in digitale systemen','Functiescheiding is alleen nodig bij grote bedragen','De controller regelt dit; andere medewerkers hoeven het niet te weten'],
      c:1, exp:'✓ Functiescheiding in digitale systemen is een fundamentele interne controle maatregel die fraude en fouten voorkomt.' },
    { lv:'B2', q:'Hoe adviseer je collega\'s over veilig omgaan met financiële digitale systemen?',
      opts:['Door ze een lijst van verboden handelingen te sturen','Door actief te signaleren als je onveilig gedrag ziet en collega\'s praktisch te helpen met veilige werkwijzen','Door het door te geven aan ICT','Door een werkgroep te starten maar zelf geen standpunt in te nemen'],
      c:1, exp:'✓ Actief adviseren over financiële informatieveiligheid is een B2-competentie.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je digitale tools om financiële werkprocessen te verbeteren?',
      opts:['Je gebruikt alleen de tools die je al kende','Je onderzoekt welke tools jouw werk efficiënter of betrouwbaarder maken','Je vermijdt nieuwe tools','Je vraagt ICT om tools te selecteren'],
      c:1, exp:'✓ Proactief digitaal werken in finance betekent: tools inzetten die processen concreet verbeteren.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in een digitaal financieel werkproces?',
      opts:['Je houdt het voor jezelf','Je deelt het verbeterpunt met je leidinggevende of collega\'s','Je past het zelf aan','Je wacht totdat iemand anders het opmerkt'],
      c:1, exp:'✓ Verbeterpunten signaleren en delen is professioneel gedrag in finance.' },
    { lv:'B1', q:'Hoe neem je initiatief bij het verbeteren van digitale financiële processen?',
      opts:['Je werkt mee als anderen het initiatief nemen','Je signaleert knelpunten, brengt verbetervoorstellen in en trekt mee aan de uitvoering','Je overlegt eerst met alle betrokkenen','Je wacht op instructie'],
      c:1, exp:'✓ Initiatief nemen in procesverbetering is een kenmerk van B1-professioneel handelen in finance.' },
    { lv:'B2', q:'Wat kenmerkt het leiden van een digitaal verbeterproject in financiën?',
      opts:['Je delegeert alles','Je brengt structuur aan, verbindt expertise, bewaakt voortgang en rapporteert','Je voert alles zelf uit','Je wacht op consensus'],
      c:1, exp:'✓ Projectleiderschap in financiën vraagt structuur, inhoudelijke expertise en communicatie.' },
  ],
  student: [
    { lv:'A1', q:'Hoe help je een collega die vastloopt met een financieel digitaal systeem?',
      opts:['Je geeft aan dat dat niet jouw taak is','Je helpt de collega op weg en legt uit wat je doet','Je lost het altijd direct op','Je stuurt de collega door naar ICT'],
      c:1, exp:'✓ Collega\'s helpen bij financiële digitale systemen draagt bij aan de kwaliteit van de financiële informatievoorziening.' },
    { lv:'A2', q:'Hoe deel je kennis over digitale financiële werkwijzen?',
      opts:['Alleen als er een formele kennisdeelsessie is gepland','Via een informeel bericht, demo of tip in een overleg','Alleen als collega\'s er specifiek naar vragen','Door een handleiding te maken maar niet te verspreiden'],
      c:1, exp:'✓ Informeel kennisdelen in finance verhoogt de digitale kwaliteit van het team.' },
    { lv:'B1', q:'Hoe draag je structureel bij aan de digitale kwaliteit van financiële informatiestromen?',
      opts:['Door eenmalig een training te geven','Door continu te signaleren waar digitale kansen of knelpunten zijn','Door te wachten op een ontwikkelplan','Door alleen je eigen vaardigheden te verbeteren'],
      c:1, exp:'✓ Structurele bijdrage in finance betekent: blijven signaleren en verbeteren.' },
    { lv:'B2', q:'Hoe vertaal je financiële inzichten naar verbetervoorstellen?',
      opts:['Door inzichten voor jezelf te houden','Door data te analyseren en te vertalen naar heldere voorstellen voor management','Door alles door te sturen naar de controller','Door voorstellen op te schrijven maar niet te delen'],
      c:1, exp:'✓ Inzichten omzetten naar verbetervoorstellen is een kerncompetentie in finance op B2-niveau.' },
  ],
},

// KQ voor HRM — HR-specifieke aanpassingen, extra aandacht voor gevoelige data
HRM: {
  houding: [
    { lv:'A1', q:'Waarvoor kun je Copilot het beste inzetten in HR-werk?',
      opts:['Voor het automatisch nemen van HR-beslissingen','Voor het schrijven van vacatureteksten, beleidsnotities of brieven die je daarna kritisch beoordeelt','AI-tools zijn niet nuttig voor HR','Voor het automatisch genereren van functioneringsbeoordelingen'],
      c:1, exp:'✓ Copilot ondersteunt schrijf- en samenvattingstaken. HR-beslissingen en beoordelingen blijven altijd menselijk werk.' },
    { lv:'A2', q:'Waarom zijn digitale vaardigheden relevant voor HR-professionals?',
      opts:['Omdat alle HR-systemen digitaal zijn en digitale vaardigheden je werk effectiever en toekomstbestendiger maken','Omdat de school het verplicht stelt','Alleen voor collega\'s die HR-analytics doen','Dat is niet relevant voor dagelijkse HR-taken'],
      c:0, exp:'✓ Digitale vaardigheden zijn in HR essentieel: HR-informatiesystemen, data-analyse en digitale communicatie zijn kerntools.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je digitale professionalisering als HR-professional?',
      opts:['Je wacht op scholingsaanbod','Je volgt zelf nieuwe HR-tech ontwikkelingen en experimenteert actief, ook buiten verplichte training','Je vraagt ICT om advies','Je vindt het voldoende om bij te blijven'],
      c:1, exp:'✓ Eigen regie over je professionele ontwikkeling is essentieel in een vakgebied dat zo snel digitaliseert als HR.' },
    { lv:'B2', q:'Hoe inspireer je collega\'s en leidinggevenden met digitale HR-mogelijkheden?',
      opts:['Door te wachten totdat collega\'s vragen stellen','Door ervaringen en nieuwe digitale HR-methoden actief te delen en te demonstreren','Door je kennis voor jezelf te houden','Door alleen in formele scholing te delen'],
      c:1, exp:'✓ Als HR-professional op B2-niveau ben je een actieve verspreider van digitale kennis in de organisatie.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welk HR-informatiesysteem gebruikt Mondriaan?',
      opts:['Workday','AFAS','SAP SuccessFactors','PeopleSoft'],
      c:1, exp:'✓ Mondriaan gebruikt AFAS als HR-informatiesysteem voor personeelsadministratie, verlofregistratie en arbeidscontracten.' },
    { lv:'A2', q:'Voor welke HR-taken kun je Copilot zinvol inzetten?',
      opts:['Voor het automatisch beoordelen van sollicitanten op basis van hun cv','Voor het schrijven van vacatureteksten, beleidsnotities en HR-correspondentie die je daarna beoordeelt','Voor het nemen van beslissingen over promoties','Voor het genereren van functioneringsbeoordelingen zonder gesprek'],
      c:1, exp:'✓ Copilot is handig bij schrijftaken in HR. Voer nooit persoonsgegevens van medewerkers in en controleer altijd de output.' },
    { lv:'B1', q:'Wat wordt bedoeld met \'hallucination\' bij een AI-tool?',
      opts:['De AI werkt tijdelijk niet','De AI genereert feitelijk onjuiste informatie met groot zelfvertrouwen','De AI reageert traag','De AI begrijpt de vraag niet'],
      c:1, exp:'✓ Hallucination is een ernstig AI-risico in HR: controleer alle AI-output kritisch voordat je het gebruikt in HR-communicatie.' },
    { lv:'B2', q:'Wat zijn de risico\'s van AI in HR-processen zoals recruitment?',
      opts:['Er zijn geen risico\'s als AI goed geconfigureerd is','Bias in trainingsdata kan leiden tot discriminatie van bepaalde groepen; AI-beslissingen vereisen altijd menselijk toezicht','AI-recruitment is altijd objectiever dan menselijk oordeel','De enige risico\'s zijn technische storingen'],
      c:1, exp:'✓ AI in recruitment kan bestaande discriminatiepatronen versterken door bias in trainingsdata. Menselijk toezicht en kritische evaluatie zijn verplicht.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot?',
      opts:['Een HR-informatiesysteem','Een AI-assistent van Microsoft die tekst genereert en vragen beantwoordt op basis van kunstmatige intelligentie','Een recruitment-applicatie','Een loonverwerkingssysteem'],
      c:1, exp:'✓ Copilot is een AI-assistent van Microsoft. Het ondersteunt schrijf- en samenvattingstaken op basis van je invoer.' },
    { lv:'A2', q:'Waarom valt salarisdata onder bijzondere AVG-bescherming?',
      opts:['Salarisdata valt niet onder de AVG','Salarisdata is persoonsgebonden en financieel gevoelig: de AVG vereist strikte toegangscontrole, doelbinding en minimale bewaring','Salarisdata mag vrij gedeeld worden tussen afdelingen','Alleen de directeur hoeft AVG-compliant te werken met salarisdata'],
      c:1, exp:'✓ Salarisdata is financieel gevoelige persoonsinformatie. Strikte AVG-compliance is verplicht: doelbinding, toegangsbeperking en opslagbeperking.' },
    { lv:'B1', q:'Wat zegt de AVG over het gebruik van gezondheidsdata van medewerkers?',
      opts:['Gezondheidsdata mag vrij gebruikt worden voor verzuimanalyse','Gezondheidsdata is bijzondere categorie persoonsgegevens: verwerking is aan strikte regels gebonden en vereist sterke rechtsgrond','De bedrijfsarts regelt dit; HR hoeft het niet te weten','Toestemming van de medewerker is altijd voldoende'],
      c:1, exp:'✓ Gezondheidsdata is bijzondere categoriepersoonsgegevens onder de AVG: extra bescherming, minimale verwerking en strikte rechtsgrond zijn vereist.' },
    { lv:'B2', q:'Wat zijn de ethische risico\'s van AI-gebruik bij personeelsbeoordelingen?',
      opts:['Geen, AI is objectiever dan mensen','Algoritmische bias kan bepaalde groepen systematisch benadelen, en gebrek aan transparantie ondermijnt vertrouwen van medewerkers','Alleen technische storingen vormen een risico','De enige risico is als medewerkers er niet van weten'],
      c:1, exp:'✓ Algoritmische bias en gebrek aan transparantie zijn serieuze ethische risico\'s bij AI in HR. Menselijk toezicht en uitlegbaarheid zijn verplicht.' },
  ],
  ethiek: [
    { lv:'A1', q:'Waarom mag je geen persoonsgegevens van medewerkers invoeren in externe AI-tools?',
      opts:['Omdat de tool trager wordt','Gratis AI-tools kunnen ingevoerde data gebruiken voor trainingsmodellen, waardoor privacygevoelige HR-data onbedoeld wordt gedeeld','Omdat Microsoft dit technisch geblokkeerd heeft','Omdat medewerkers dat vervelend vinden'],
      c:1, exp:'✓ Personeelsdata is bijzonder privacygevoelig. Invoer in externe AI-tools is een AVG-schending met grote gevolgen voor medewerkers.' },
    { lv:'A2', q:'Hoe ga je veilig om met medewerkersdata in HR-systemen?',
      opts:['Je deelt HR-data via WhatsApp omdat dat sneller is','Je werkt uitsluitend in de daarvoor goedgekeurde systemen en deelt nooit persoonsgegevens via onbeveiligde kanalen','Je slaat medewerkersdata op in een persoonlijk cloud-account voor gemak','Je volgt wat collega\'s doen'],
      c:1, exp:'✓ Veilig werken met medewerkersdata betekent: alleen goedgekeurde systemen, nooit via onbeveiligde kanalen.' },
    { lv:'B1', q:'Welke ethische aspecten zijn relevant bij gebruik van data in HR?',
      opts:['Alleen of de data correct is','Privacy van medewerkers, doelbinding van datagebruik, mogelijke bias in analyses en transparantie richting medewerkers','Of de data makkelijk te exporteren is','Alleen of medewerkers via een pop-up toestemming hebben gegeven'],
      c:1, exp:'✓ Privacy, doelbinding, bias en transparantie zijn alle relevante ethische aspecten van HR-datagebruik.' },
    { lv:'B2', q:'Hoe adviseer je leidinggevenden over ethisch gebruik van HR-data en AI?',
      opts:['Door ze een lijst van verboden handelingen te sturen','Door actief te informeren over risico\'s, richtlijnen uit te leggen en praktisch te helpen met verantwoorde alternatieven','Door het door te geven aan ICT','Door een werkgroep te starten maar zelf geen standpunt in te nemen'],
      c:1, exp:'✓ Actief adviseren over ethisch HR-datagebruik is een B2-kerncompetentie voor HR-professionals.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je digitale HR-tools om HR-processen te verbeteren?',
      opts:['Je gebruikt alleen de tools die je al kende','Je onderzoekt welke tools jouw HR-werk effectiever of betrouwbaarder maken','Je vermijdt nieuwe tools','Je vraagt ICT om tools te selecteren'],
      c:1, exp:'✓ Proactief digitaal werken in HR betekent: tools inzetten die processen concreet verbeteren.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in een digitaal HR-werkproces?',
      opts:['Je houdt het voor jezelf','Je deelt het verbeterpunt met je leidinggevende of collega\'s','Je past het zelf aan','Je wacht totdat iemand anders het opmerkt'],
      c:1, exp:'✓ Verbeterpunten signaleren en delen is professioneel gedrag in HR.' },
    { lv:'B1', q:'Hoe neem je initiatief bij het verbeteren van digitale HR-werkprocessen?',
      opts:['Je werkt mee als anderen het initiatief nemen','Je signaleert knelpunten, brengt verbetervoorstellen in en trekt mee aan de uitvoering','Je overlegt eerst met alle betrokkenen','Je wacht op instructie'],
      c:1, exp:'✓ Initiatief nemen in HR-procesverbetering is een kenmerk van B1-professioneel handelen.' },
    { lv:'B2', q:'Wat kenmerkt het leiden van een digitaal HR-verbeterproject?',
      opts:['Je delegeert alles','Je brengt structuur aan, verbindt HR-expertise, bewaakt voortgang en rapporteert','Je voert alles zelf uit','Je zorgt dat iedereen het eens is'],
      c:1, exp:'✓ Projectleiderschap in HR vraagt structuur, mensenkennis en communicatief vermogen.' },
  ],
  student: [
    { lv:'A1', q:'Hoe help je een leidinggevende die vastloopt met een digitaal HR-systeem?',
      opts:['Je geeft aan dat dat niet jouw taak is','Je helpt de leidinggevende op weg en legt uit wat je doet','Je lost het altijd direct op','Je stuurt door naar ICT'],
      c:1, exp:'✓ Leidinggevenden ondersteunen bij HR-systemen is een basisvorm van HR-dienstverlening.' },
    { lv:'A2', q:'Hoe deel je kennis over digitale HR-processen met collega\'s en leidinggevenden?',
      opts:['Alleen als er een formele sessie is gepland','Via een informeel gesprek, demo of tip','Alleen als ze er zelf om vragen','Door een handleiding te maken maar niet te verspreiden'],
      c:1, exp:'✓ Informeel kennisdelen verhoogt de digitale HR-kwaliteit in de hele organisatie.' },
    { lv:'B1', q:'Hoe draag je structureel bij aan de digitale ontwikkeling van HR-processen?',
      opts:['Door eenmalig een training te geven','Door continu te signaleren waar digitale kansen of knelpunten zijn','Door te wachten op een ontwikkelplan','Door alleen je eigen vaardigheden te verbeteren'],
      c:1, exp:'✓ Structurele bijdrage in HR betekent: blijven signaleren en initiëren.' },
    { lv:'B2', q:'Hoe vertaal je HR-data naar verbetervoorstellen voor medewerkerswelzijn?',
      opts:['Door inzichten voor jezelf te houden','Door data en trends te analyseren en te vertalen naar aanbevelingen voor management','Door alles door te sturen naar de directeur HRM','Door voorstellen op te schrijven maar niet te delen'],
      c:1, exp:'✓ HR-inzichten omzetten naar verbetervoorstellen voor medewerkerswelzijn is een kerncompetentie op B2.' },
  ],
},

// KQ voor ICT — geavanceerde IT-vragen, hogere baseline
ICT: {
  houding: [
    { lv:'A1', q:'Hoe kan een ICT-medewerker AI-tools zoals Copilot zinvol inzetten?',
      opts:['Voor het automatisch configureren van servers zonder controle','Voor het schrijven van technische documentatie, scripten en analyseren van logbestanden','AI-tools zijn alleen nuttig voor niet-technisch personeel','Voor het automatisch oplossen van beveiligingsincidenten'],
      c:1, exp:'✓ AI-tools ondersteunen technische schrijf-, analyse- en automatiseringstaken. Kritische controle blijft essentieel, ook voor ICT-professionals.' },
    { lv:'A2', q:'Waarom is een proactieve leerhouding extra belangrijk voor ICT-medewerkers?',
      opts:['Omdat ICT-functies weinig veranderen','Omdat technologie zo snel verandert dat je zonder proactief leren snel achterop raakt in je vakkennis','Omdat de school het verplicht stelt','Alleen voor collega\'s in cybersecurity'],
      c:1, exp:'✓ ICT is het snelst veranderende vakgebied. Proactief leren is geen keuze maar een beroepsvereiste.' },
    { lv:'B1', q:'Hoe toon je eigen verantwoordelijkheid voor je technische professionalisering?',
      opts:['Je wacht op scholingsaanbod','Je volgt actief nieuwe technologische ontwikkelingen, experimenteert en bouwt kennis op, ook buiten verplichte training','Je vraagt collega\'s om je bij te spijkeren','Je vindt het voldoende om bij te blijven met bestaande kennis'],
      c:1, exp:'✓ Eigen regie over professionele ontwikkeling is voor ICT-professionals een absolute vereiste in een snel veranderend vakgebied.' },
    { lv:'B2', q:'Hoe draag je bij aan de digitale rijpheid van de organisatie?',
      opts:['Door je eigen werk zo goed mogelijk te doen en anderen niet te storen','Door technische kennis actief te delen, gebruikers te ondersteunen en bij te dragen aan de digitale strategie','Door alleen interne ICT-documentatie bij te houden','Door te wachten totdat management om advies vraagt'],
      c:1, exp:'✓ ICT-professionals op B2-niveau zijn niet alleen technici maar ook digitale coaches en adviseurs voor de organisatie.' },
  ],
  vaardigheden: [
    { lv:'A1', q:'Welke informatiebeveiligingsstandaard is richtinggevend voor onderwijsinstellingen in Nederland?',
      opts:['ISO 27001 aangevuld met de BIO (Baseline Informatiebeveiliging Overheid)','GDPR Framework','CIS Controls Level 1','NIST Cybersecurity Framework'],
      c:0, exp:'✓ Onderwijsinstellingen werken met de BIO als verplicht kader, aangevuld met ISO 27001. Als ICT-medewerker is kennis hiervan essentieel.' },
    { lv:'A2', q:'Voor welke IT-taken kun je AI-tools zinvol inzetten?',
      opts:['Voor het automatisch uitvoeren van kritische systeemwijzigingen','Voor het schrijven van technische documentatie, genereren van scripts of analyseren van logbestanden','Voor het nemen van beslissingen over IT-architectuur','Voor het volledig automatiseren van beveiligingsincidentrespons'],
      c:1, exp:'✓ AI-tools zijn krachtig als hulpmiddel voor technische taken. Kritische besluiten en systeemwijzigingen vereisen altijd menselijk toezicht.' },
    { lv:'B1', q:'Wat wordt bedoeld met een \'hallucination\' bij een AI-tool?',
      opts:['Een technische storing in het AI-systeem','De AI genereert feitelijk onjuiste informatie met groot zelfvertrouwen','Overbelasting van het systeem','De AI interpreteert de vraag verkeerd'],
      c:1, exp:'✓ Hallucination is een kritiek AI-risico. In IT-context kan dit leiden tot onjuiste scripts of configuraties. Verifieer altijd aan technische bronnen.' },
    { lv:'B2', q:'Wat is het verschil tussen machine learning en traditionele software?',
      opts:['Machine learning gebruikt meer rekenkracht maar werkt hetzelfde','Bij traditionele software worden regels expliciet geprogrammeerd; machine learning leert patronen uit data zonder expliciete programmering','Er is geen fundamenteel verschil','Machine learning is alleen voor grote organisaties'],
      c:1, exp:'✓ Machine learning leert van data in plaats van expliciete regels te volgen. Dit heeft fundamentele implicaties voor IT-architectuur, beveiliging en beheer.' },
  ],
  kennis: [
    { lv:'A1', q:'Wat is Copilot en hoe werkt het technisch?',
      opts:['Een klassiek programma dat regels uitvoert die vooraf zijn geprogrammeerd','Een op LLM-gebaseerde AI-assistent van Microsoft die taal verwerkt via neurale netwerken getraind op grote hoeveelheden tekst','Een zoekmachine die het internet doorzoekt','Een vertaalprogramma op basis van woordenboeken'],
      c:1, exp:'✓ Copilot is gebouwd op een Large Language Model (LLM). Als ICT-professional is het belangrijk de technische basis te begrijpen voor beheer, beveiliging en advies.' },
    { lv:'A2', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met regelsets voor tekstverwerking','Een neuraal netwerk getraind op grote hoeveelheden tekst dat taal verwerkt en genereert via statistische patronen','Een zoekmachine-index','Een klassiek vertaalprogramma'],
      c:1, exp:'✓ LLMs zijn de technische basis van generatieve AI. Begrijpen hoe ze werken is essentieel voor ICT-beheer, beveiliging en architectuurkeuzes.' },
    { lv:'B1', q:'Wat verplicht de NIS2-richtlijn van ICT-afdelingen in onderwijsinstellingen?',
      opts:['Alle AI-tools verbieden','Cybersecurity-risico\'s systematisch beheren, beveiligingsincidenten melden en medewerkers trainen in digitale veiligheid','Alleen gebruik maken van Europese software','Jaarlijks een externe penetratietest uitvoeren'],
      c:1, exp:'✓ NIS2 verplicht onderwijsinstellingen cybersecurity structureel te borgen. ICT draagt hierin een centrale verantwoordelijkheid.' },
    { lv:'B2', q:'Wat is het principe van \'privacy by design\' in IT-systemen?',
      opts:['Privacy-instellingen achteraf toevoegen als gebruikers erom vragen','Privacy-waarborgen inbouwen als standaard onderdeel van het ontwerp en de architectuur van systemen, niet als latere toevoeging','Privacy is de verantwoordelijkheid van de gebruiker, niet van de systeemontwerper','Privacy by design betekent alle data versleutelen'],
      c:1, exp:'✓ Privacy by design (een AVG-verplichting) betekent: privacybescherming vanaf de eerste ontwerpfase inbouwen, niet achteraf.' },
  ],
  ethiek: [
    { lv:'A1', q:'Wat betekent het principe van \'minimale toegangsrechten\' voor IT-beheerders?',
      opts:['IT-beheerders krijgen toegang tot alle systemen voor maximale efficiency','Medewerkers en systemen krijgen alleen de toegangsrechten die strikt noodzakelijk zijn voor hun functie','Iedereen heeft dezelfde toegangsrechten voor eenvoud','Minimale toegangsrechten gelden alleen voor externe partijen'],
      c:1, exp:'✓ Het principe van minimale toegangsrechten (least privilege) is een fundamentele beveiligingsmaatregel die misbruik en datalekken beperkt.' },
    { lv:'A2', q:'Wat is social engineering en waarom zijn ICT-medewerkers een bijzonder doelwit?',
      opts:['Sociale media voor interne communicatie','Het psychologisch manipuleren van mensen om toegang te krijgen tot systemen of informatie — ICT-medewerkers zijn een doelwit vanwege hun systeemtoegang','Een methode om teamdynamiek te verbeteren','Automatische analyse van gebruikersgedrag'],
      c:1, exp:'✓ ICT-medewerkers zijn een primair doelwit voor social engineering vanwege hun beheerderstoegang. Bewustzijn en procedures zijn essentieel.' },
    { lv:'B1', q:'Wat is \'privacy by design\' en hoe implementeer je het als ICT-professional?',
      opts:['Privacy-instellingen achteraf toevoegen','Privacy-bescherming integreren in het ontwerp van systemen als standaard: versleuteling, minimale dataopslag, toegangscontrole en logging','Privacy is de verantwoordelijkheid van de gebruiker','Privacy by design betekent alle systemen op slot zetten'],
      c:1, exp:'✓ Privacy by design is een wettelijke AVG-verplichting. Als ICT-professional bouw je dit vanaf de eerste ontwerpfase in.' },
    { lv:'B2', q:'Hoe adviseer je de organisatie over ethisch verantwoorde implementatie van AI-systemen?',
      opts:['Door alle AI-implementaties te blokkeren totdat ze 100% veilig zijn','Door transparant te zijn over mogelijkheden en risico\'s, richtlijnen voor menselijk toezicht op te stellen en governance te adviseren','Door AI-implementatie volledig over te laten aan leveranciers','Door alleen de technische specificaties te beoordelen'],
      c:1, exp:'✓ Verantwoord AI-advies betekent: transparantie over risico\'s, menselijk toezicht borgen en governance frameworks adviseren.' },
  ],
  ped: [
    { lv:'A1', q:'Hoe gebruik je je ICT-expertise om de organisatie digitaal te verbeteren?',
      opts:['Je focust alleen op je eigen technische taken','Je signaleert actief waar IT-verbeteringen de organisatie helpen en neemt initiatief','Je wacht op verzoeken van gebruikers','Je beheert systemen en laat verbetering over aan management'],
      c:1, exp:'✓ ICT-professionals voegen het meeste waarde toe als ze proactief kansen signaleren, niet alleen reactief problemen oplossen.' },
    { lv:'A2', q:'Wat doe je als je een verbeterpunt ziet in een IT-proces of systeem?',
      opts:['Je lost het zelf stil op','Je maakt een concreet voorstel, beschrijft de impact en bespreekt dit met betrokkenen','Je wacht totdat gebruikers klagen','Je stuurt een e-mail naar management zonder verdere actie'],
      c:1, exp:'✓ Proactief verbetervoorstellen doen, inclusief business impact en technische haalbaarheid, is een B2-competentie.' },
    { lv:'B1', q:'Hoe draag je bij aan IT-governance in de organisatie?',
      opts:['Door te doen wat management vraagt zonder eigen inbreng','Door actief mee te denken over IT-beleid, risico\'s te signaleren en bij te dragen aan standaarden en procedures','Door alleen operationele IT-taken uit te voeren','Door te wachten op een formeel governancetraject'],
      c:1, exp:'✓ IT-governance is niet alleen een managementtaak. ICT-professionals dragen bij door kennis in te brengen en risico\'s te signaleren.' },
    { lv:'B2', q:'Wat kenmerkt het leiden van een strategisch IT-project?',
      opts:['Je implementeert de technische oplossing en laat communicatie over aan management','Je verbindt technische expertise met organisatiedoelen, communiceert met alle stakeholders en bewaakt zowel technische als businesskwaliteit','Je delegeert alle niet-technische taken','Je wacht op formele projectgoedkeuring voor je begint'],
      c:1, exp:'✓ Strategisch IT-projectleiderschap vraagt T-shaped vaardigheden: diepe technische kennis gecombineerd met brede organisatorische communicatie.' },
  ],
  student: [
    { lv:'A1', q:'Hoe help je een medewerker die vastloopt met een digitaal systeem?',
      opts:['Je lost het direct voor hen op zonder uitleg','Je helpt de medewerker stap voor stap en legt uit wat je doet, zodat ze het volgende keer zelf kunnen','Je stuurt ze naar de helpdesk','Je geeft aan dat zelfhulpartikelen beschikbaar zijn'],
      c:1, exp:'✓ ICT-ondersteuning die gebruikers helpt begrijpen verhoogt de digitale rijpheid van de organisatie structureel.' },
    { lv:'A2', q:'Hoe deel je technische kennis met niet-ICT collega\'s?',
      opts:['Alleen in formele IT-trainingen','Via toegankelijke uitleg, demo\'s of tips in overleggen, afgestemd op het niveau van de ontvanger','Alleen als ze er specifiek om vragen','Door technische documentatie te sturen zonder uitleg'],
      c:1, exp:'✓ Kennis vertalen naar het niveau van de ontvanger is een kernvaardigheid voor ICT-professionals die de organisatie echt willen helpen.' },
    { lv:'B1', q:'Hoe draag je bij aan de digitale rijpheid van de organisatie?',
      opts:['Door alle IT-problemen zelf op te lossen','Door gericht te signaleren waar digitale kennis ontbreekt en proactief bij te dragen aan kennisoverdracht en capaciteitsopbouw','Door te wachten op een digitaal strategie-initiatief','Door alleen je eigen technische kennis bij te houden'],
      c:1, exp:'✓ Digitale rijpheid opbouwen vraagt meer dan problemen oplossen: het vraagt structurele kennisoverdracht en capaciteitsopbouw.' },
    { lv:'B2', q:'Hoe vertaal je IT-inzichten naar strategische verbetervoorstellen?',
      opts:['Door technische rapporten te sturen naar management','Door data, incidenten en trends te analyseren en te vertalen naar heldere, businessgerichte aanbevelingen die de organisatie begrijpt','Door alles door te sturen naar de CIO','Door verbetervoorstellen op te schrijven maar ze niet actief te presenteren'],
      c:1, exp:'✓ Strategische IT-inzichten vertalen naar organisatiebegrijpelijke voorstellen is een kerncompetentie op B2 voor ICT-professionals.' },
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
    { lv:'B1', q:'Wat wordt bedoeld met een \'hallucination\' bij een AI-tool zoals Copilot?',
      opts:['De AI werkt tijdelijk niet door een technische storing','De AI genereert feitelijk onjuiste of verzonnen informatie met groot zelfvertrouwen','De AI reageert traag door overbelasting van het systeem','De AI begrijpt de vraag niet en vraagt om verduidelijking'],
      c:1, exp:'✓ Hallucination is een bekend AI-risico: het systeem presenteert verzonnen of onjuiste informatie alsof het feiten zijn. Gebruik AI-output nooit zonder kritische controle, zeker niet bij gevoelige of feitelijke informatie.' },
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
    { lv:'B1', q:'Wat is ransomware?',
      opts:['Software die automatisch bestanden sorteert en opruimt','Kwaadaardige software die systemen of bestanden versleutelt en losgeld eist om de toegang te herstellen','Een tool om databases te beveiligen tegen ongeautoriseerde toegang','Programma\'s die verouderde software automatisch verwijderen'],
      c:1, exp:'✓ Ransomware is een ernstige cyberdreiging waarbij criminelen systemen gijzelen totdat er losgeld wordt betaald. Onderwijsinstellingen zijn een populair doelwit. Klik nooit op verdachte bijlagen en meld vermoedens direct bij ICT.' },
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
    { lv:'A1', q:'Wat is een Large Language Model (LLM)?',
      opts:['Een grote database met woordenboeken en beleidsregels','Een AI-systeem dat taal verwerkt en genereert op basis van patronen in enorme hoeveelheden tekst','Een zoekmachine die het internet doorzoekt op trefwoorden','Een vertaalprogramma dat meerdere talen ondersteunt'],
      c:1, exp:'✓ LLM staat voor Large Language Model. Tools als Copilot en ChatGPT zijn gebouwd op LLMs. Als leidinggevende is het essentieel om te begrijpen wat dit zijn, zodat je bewuste beslissingen kunt nemen over gebruik, risico\'s en beleid.' },
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
    { lv:'A1', q:'Wat is phishing en waarom vormt het een risico voor jouw organisatie?',
      opts:['Het monitoren van internetgedrag door externe softwarepakketten','Een aanvalsmethode waarbij via nep-berichten of -websites inloggegevens of gevoelige informatie worden gestolen','Software die automatisch wachtwoorden kraakt door ze systematisch te raden','Een techniek waarbij criminelen fysiek toegang zoeken tot kantoorruimtes'],
      c:1, exp:'✓ Phishing is de meest voorkomende cyberaanval. Als leidinggevende draag je de verantwoordelijkheid om je team bewust te maken. Eén klik op een phishing-link kan leiden tot een datalek of ransomware-aanval die de hele organisatie raakt.' },
    { lv:'A2', q:'Wat is \'social engineering\' en waarom is het gevaarlijker dan puur technische aanvallen?',
      opts:['Het gebruik van sociale media om medewerkers te motiveren','Het psychologisch manipuleren van mensen om vertrouwelijke informatie te delen of onveilige acties te ondernemen','Een methode om teamdynamiek en samenwerking te verbeteren','Het automatisch analyseren van communicatiepatronen in de organisatie'],
      c:1, exp:'✓ Social engineering omzeilt technische beveiliging door mensen te manipuleren. Phishing, CEO-fraude en nep-helpdeskcalls zijn bekende vormen. Als leidinggevende ben jij een aantrekkelijk doelwit vanwege je toegang en autoriteit.' },
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
  const groups = {
    onderwijs:  { label:'Onderwijs',  roles:[] },
    diensten:   { label:'Diensten',   roles:[] },
    management: { label:'Management', roles:[] },
  };
  Object.entries(ROLES).forEach(([k,r]) => groups[r.group].roles.push([k,r]));

  document.getElementById('rolesGrid').innerHTML = Object.entries(groups).map(([gk,g]) => `
    <div class="role-group">
      <div class="role-group-label">${g.label}</div>
      <div class="role-group-cards">
        ${g.roles.map(([k,r]) => `
          <div class="role-card" id="rc-${k}" onclick="pickRole('${k}')">
            <div class="rc-code">${k}</div>
            <div class="rc-name">${r.name}</div>
            <div class="rc-desc">${r.desc}</div>
          </div>`).join('')}
      </div>
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

// ─── JSON EXPORT ────────────────────────────────────────────────────────────
function exportJSON() {
  const now = new Date();
  const pad = n => String(n).padStart(2,'0');
  const datum    = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
  const tijdstip = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const dLv = {};
  Object.keys(Q[S.role]).forEach(d => dLv[d] = domLevel(d));
  const overall  = overallLevel(dLv);
  const li       = LEVEL_INFO[overall];
  const doms     = Object.keys(Q[S.role]);

  const data = {
    exportDatum:    datum,
    exportTijdstip: tijdstip,
    versie:         '1.0',
    rol: {
      code: S.role,
      naam: ROLES[S.role].name,
    },
    zelfscan: {
      niveauOverall: overall,
      naamOverall:   li.name,
      score:         li.pct,
      perThema: doms.map(d => ({
        thema:  d,
        label:  DOM_LABELS[S.role][d],
        niveau: dLv[d],
        naam:   LEVEL_INFO[dLv[d]].name,
        score:  LEVEL_INFO[dLv[d]].pct,
      })),
      vragen: S.flatQ.map((q, i) => ({
        nr:         i + 1,
        thema:      q.dom,
        themaLabel: DOM_LABELS[S.role][q.dom],
        niveau:     q.lv,
        stelling:   q.t,
        antwoord:   S.ans[i],
        ...(q.aiGate ? { aiGate: true } : {}),
        ...(q.ai     ? { aiAfhankelijk: true } : {}),
        ...(S.noAI && q.ai && S.ans[i] === 'no' ? { autoOvergeslagen: true } : {}),
      })),
    },
    kennischeck: S.kqSkipped
      ? { gedaan: false, overgeslagen: true }
      : S.kqDone
        ? {
            gedaan:            true,
            overgeslagen:      false,
            aantalGoed:        S.kqOk,
            aantalTotaal:      S.kqTotal,
            percentageCorrect: S.kqTotal > 0 ? Math.round((S.kqOk / S.kqTotal) * 100) : 0,
            perThema: doms.map(d => ({
              thema:         d,
              label:         DOM_LABELS[S.role][d],
              hoogsteNiveau: S.kqResults[d] || 'niet bereikt',
            })),
          }
        : { gedaan: false, overgeslagen: false },
  };

  const json  = JSON.stringify(data, null, 2);
  const blob  = new Blob([json], { type: 'application/json' });
  const url   = URL.createObjectURL(blob);
  const a     = document.createElement('a');
  a.href      = url;
  a.download  = `MondriAI-Zelfscan-${S.role}-${datum}.json`;
  a.click();
  URL.revokeObjectURL(url);
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
