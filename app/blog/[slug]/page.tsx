import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.description, alternates: { canonical: `/blog/${article.slug}` }, openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.published, images: [{ url: article.image, alt: article.alt }] } };
}

function BodywarmerOfTussenjas() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> bij 10 tot 15 graden is een bodywarmer fijn als je actief bent en weinig wind verwacht. Kies een tussenjas wanneer het waait, miezert of je langer stilstaat. Met een dunne trui of hoodie eronder kun je beide opties makkelijk aanpassen.</p>
  <h2>De temperatuur vertelt niet het hele verhaal</h2><p>Vijftien graden in de zon voelt anders dan twaalf graden met wind langs een open kade. Kijk daarom eerst naar drie dingen: wind, neerslag en hoeveel je beweegt. Wie naar de trein fietst, produceert snel warmte. Wie buiten wacht of rustig wandelt, heeft juist baat bij gesloten mouwen.</p>
  <div className="comparison-table" role="region" aria-label="Vergelijking bodywarmer en tussenjas"><table><thead><tr><th>Situatie</th><th>Beste keuze</th><th>Waarom</th></tr></thead><tbody><tr><td>Droog, weinig wind, actief</td><td>Bodywarmer</td><td>Je romp blijft behaaglijk en je armen bewegen vrij.</td></tr><tr><td>Wind of lichte regen</td><td>Tussenjas</td><td>Mouwen en een gesloten buitenlaag geven meer beschutting.</td></tr><tr><td>Wisselende dag</td><td>Bodywarmer + hoodie</td><td>Laagjes zijn makkelijk aan te passen.</td></tr><tr><td>Lang buiten of weinig beweging</td><td>Tussenjas</td><td>Meer dekking rond armen en polsen.</td></tr></tbody></table></div>
  <h2>Wanneer kies je een bodywarmer?</h2><p>Een bodywarmer werkt vooral goed op droge dagen tussen ongeveer 12 en 15 graden. Draag hem over een T-shirt met stevig overshirt, een fijne trui of een hoodie. Zorg dat de armsgaten niet knellen en dat de zoom van je onderlaag niet extreem ver uitsteekt. Vergelijk kleuren en beschikbare maten bij de <Link href="/collections/bodywarmers">bodywarmers voor heren</Link>.</p>
  <h2>Wanneer is een tussenjas slimmer?</h2><p>Een tussenjas is de veiligere keuze als de wind aantrekt. Een licht gewatteerd model houdt meer lucht vast, terwijl een gladde buitenlaag vaak prettiger is bij een korte bui. Controleer wel de productinformatie: “lichtgewicht” zegt niets automatisch over waterdichtheid. In de collectie <Link href="/collections/voorjaarsjassen">tussenjassen voor heren</Link> staat daarom alleen wat uit de productdata te onderbouwen is.</p>
  <h2>Een simpele laagjesformule</h2><ol><li>Begin met een ademend T-shirt.</li><li>Voeg bij 10 tot 12 graden een dunne trui of hoodie toe.</li><li>Kies daarover een bodywarmer bij droog weer of een tussenjas bij wind.</li><li>Neem bij een lange avond een extra lichte laag mee.</li></ol>
  <h2>Veelgestelde vragen</h2><h3>Is 15 graden warm genoeg voor alleen een bodywarmer?</h3><p>Vaak wel als je beweegt en het droog en windstil is. Ben je snel koud, voeg dan een dunne trui toe.</p><h3>Kan een bodywarmer onder een jas?</h3><p>Ja, als beide lagen genoeg ruimte geven. Kies een dun model zodat de mouwen en schouders van je jas niet trekken.</p>
  </>; }

function BodywarmerOverHoodie() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> kies een hoodie die glad onder de bodywarmer valt en laat bij de borst en armsgaten genoeg ruimte. Houd de kleuren rustig: één donkere basis, één lichtere laag en maximaal één accent.</p>
  <h2>Eerst de pasvorm: ruimte zonder volume</h2><p>De combinatie werkt wanneer beide lagen hun vorm houden. Een erg wijde hoodie propt bij de oksels; een te smalle bodywarmer trekt bij de rits. Pas de bodywarmer daarom altijd met de hoodie die je daadwerkelijk wilt dragen. De schouderlijn van de hoodie mag zichtbaar zijn, maar de armsgaten moeten vlak blijven.</p>
  <h2>Combinatie 1: zwart, antraciet en wit</h2><p>Draag een zwarte bodywarmer over een antraciete hoodie. Voeg een rechte zwarte of donkergrijze broek en rustige witte sneakers toe. Het contrast van de schoenen maakt de donkere bovenkant lichter zonder een extra kleur te introduceren. Dit is de meest eenvoudige combinatie voor dagelijks gebruik.</p>
  <h2>Combinatie 2: donkerblauw met warm ecru</h2><p>Een donkerblauwe bodywarmer krijgt meer diepte boven een ecru hoodie. Combineer met een donkerblauwe jeans en suède schoenen in taupe of bruin. Het warme ecru verzacht de technische uitstraling van een gewatteerde laag.</p>
  <h2>Combinatie 3: olijfgroen met grijs</h2><p>Kies een olijfgroene bodywarmer, een middengrijze hoodie en een zwarte broek. Laat andere opvallende details weg; de groene laag is al het accent. Een pet kan, maar kies die in dezelfde donkere basis als de broek.</p>
  <h2>Zo bepaal je de juiste lengte</h2><p>Laat de hoodie enkele centimeters onder de bodywarmer uitkomen. Een veel groter verschil maakt de bovenkant onrustig. De bodywarmer mag dicht kunnen zonder dat de hoodie wordt samengedrukt. Bekijk bij ieder product de maatgegevens; algemene maattabellen zijn alleen een startpunt.</p>
  <aside><p className="eyebrow">Stylingregel</p><p>Herhaal één kleur op twee plekken, bijvoorbeeld zwart in de bodywarmer en broek. Zo blijft de combinatie verbonden.</p></aside>
  <h2>Welke bodywarmer past hierbij?</h2><p>Een model met een rustige horizontale quilting is makkelijk te combineren. Een capuchon op de bodywarmer én een capuchon op de hoodie geeft vaak te veel volume; kies dan liever een bodywarmer zonder capuchon. Bekijk de beschikbare kleuren in de <Link href="/collections/bodywarmers">collectie bodywarmers</Link>.</p>
  </>; }

function WinterjasKopen() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> beoordeel een winterjas op de warmte van de voering, ruimte voor een extra laag, afsluiting bij hals en polsen, een bruikbare capuchon en zakken die echt sluiten. Kies niet alleen op dikte: constructie en pasvorm bepalen hoe comfortabel de jas buiten is.</p>
  <h2>1. Kijk naar de voering en constructie</h2><p>Een gewatteerde voering houdt lucht vast. Hoe gelijkmatiger die isolerende laag verdeeld is, hoe consistenter de jas aanvoelt. Controleer de zichtbare productinformatie op materiaal en eigenschappen. Begrippen als “waterdicht” of een temperatuurbereik zijn alleen nuttig wanneer de fabrikant die onderbouwt; zonder die gegevens doen we daar geen belofte over.</p>
  <h2>2. Pasvorm: test met je normale winterlaag</h2><p>Pas een winterjas over de trui of hoodie die je vaak draagt. Sluit de rits volledig, steek je armen naar voren en ga even zitten. Trekt de jas bij de schouders of kruipt de zoom sterk omhoog, dan is er te weinig ruimte. Te groot is ook niet ideaal: veel open ruimte rond je romp laat warme lucht makkelijker ontsnappen.</p>
  <h2>3. De capuchon moet meebewegen</h2><p>Zet de capuchon op en draai je hoofd naar links en rechts. Je zicht mag niet worden geblokkeerd. Een trekkoord kan helpen om de opening kleiner te maken. Bij de geverifieerde Arctic Hooded Jacket staat een capuchon met trekkoord in de productdata; vergelijk dit met modellen zonder capuchon in de collectie <Link href="/collections/jassen">winterjassen voor heren</Link>.</p>
  <h2>4. Let op hals, manchetten en sluiting</h2><p>Een hoge hals beperkt de open ruimte boven de rits. Manchetten die aansluiten zorgen dat wind minder makkelijk via de mouwen naar binnen komt. Test de rits meerdere keren en kijk of je hem ook met koude handen kunt gebruiken. Een stormflap kan extra afscherming geven, maar neem die eigenschap alleen mee als ze expliciet bij het product staat.</p>
  <h2>5. Zakken moeten passen bij je dag</h2><p>Neem je telefoon, sleutels en handschoenen mee tijdens het passen. Zakken met rits zijn handig op de fiets of in het openbaar vervoer. Controleer ook of de positie natuurlijk is wanneer je je handen erin steekt.</p>
  <div className="checklist"><h2>Checklist in de paskamer</h2><ul><li>De rits sluit zonder spanning over je trui.</li><li>Je kunt je armen voor je lichaam kruisen.</li><li>De capuchon draait mee zonder je zicht te beperken.</li><li>Hals en polsen sluiten comfortabel aan.</li><li>Je dagelijkse spullen passen in de zakken.</li><li>Materiaal- en onderhoudsinformatie zijn duidelijk.</li></ul></div>
  <h2>Is een winterjas onder €100 mogelijk?</h2><p>Ja, in de gecontroleerde Samkill-selectie staan modellen onder €100, waaronder de Alpine Jacket en Arctic Hooded Jacket. Prijs alleen is geen kwaliteitsmaatstaf. Vergelijk de bevestigde details en pasvorm, en controleer de actuele prijs en beschikbaarheid op de productpagina.</p>
  <h2>Veelgestelde vraag: hoe vaak was je een winterjas?</h2><p>Zo min mogelijk en altijd volgens het waslabel. Luchten en plaatselijk reinigen kan vaak volstaan. Gebruik geen algemeen wasadvies als het label van jouw jas iets anders voorschrijft.</p>
  </>; }

function TussenjasKiezen() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> kies een bomberjack voor een rustige stadslook, een licht gewatteerde jas wanneer je extra warmte wilt en een bodywarmer als bewegingsvrijheid belangrijker is dan bedekte armen. Bij wind of een bui is de bevestigde productinformatie doorslaggevend.</p>
  <h2>Begin bij het moment waarop je de jas draagt</h2><p>Een tussenjas moet vooral passen bij je dagelijkse route. Fiets je vroeg in de ochtend, wacht je op een perron of loop je alleen kort van auto naar kantoor? Temperatuur alleen is niet genoeg: wind, neerslag en beweging bepalen hoeveel beschutting prettig voelt.</p>
  <div className="comparison-table" role="region" aria-label="Vergelijking lichte jassen"><table><thead><tr><th>Model</th><th>Sterk in</th><th>Let op</th></tr></thead><tbody><tr><td>Bomberjack</td><td>Veelzijdige, nette casual look</td><td>Controleer per product de voering en materiaalinfo.</td></tr><tr><td>Licht gewatteerd</td><td>Meer warmte zonder zware winterjas</td><td>Gewatteerd betekent niet automatisch waterdicht.</td></tr><tr><td>Bodywarmer</td><td>Bewegen en slim laagjes dragen</td><td>Armen blijven blootgesteld aan wind.</td></tr></tbody></table></div>
  <h2>Kies pas daarna de kleur</h2><p>Donkerblauw, zwart en donkergrijs sluiten makkelijk aan op jeans en een nette broek. Beige en olijfgroen geven een outfit meer contrast. Wie één jas vaak wil dragen, kan het beste eerst kijken naar de kleuren die al in zijn schoenen en broeken terugkomen.</p>
  <h2>Controleer de productpagina</h2><p>Woorden als “softshell”, “lichtgewicht” en “gewatteerd” beschrijven een type, maar zijn geen volledige technische specificatie. Op Samkill tonen we daarom alleen aantoonbare kleur-, maat-, prijs- en voorraadinformatie uit de openbare catalogus. Vergelijk de <Link href="/collections/voorjaarsjassen">voorjaarsjassen</Link> en <Link href="/collections/bodywarmers">bodywarmers</Link> naast elkaar.</p>
  <div className="checklist"><h2>Snelle keuzecheck</h2><ul><li>Je normale tussenlaag past zonder trekken onder de jas.</li><li>Je kunt sturen, bukken en je armen kruisen.</li><li>Het model werkt met minstens twee broeken die je al hebt.</li><li>De productdetails bevestigen de eigenschap die jij nodig hebt.</li></ul></div>
  </>; }

function WinterjasOverTrui() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> een winterjas over een trui zit goed wanneer de schoudernaden op hun plek blijven, de rits zonder spanning sluit en je je armen voor je borst kunt kruisen. De trui mag niet ophopen bij de oksels of uit de mouwen worden getrokken.</p>
  <h2>Pas met je echte winterlaag</h2><p>Een T-shirt geeft geen betrouwbaar beeld als je de jas straks meestal over een dikke trui draagt. Neem je meest gebruikte wintertrui mee en sluit de jas volledig. Zo test je de combinatie, niet alleen de losse jas.</p>
  <h2>Vijf bewegingen die snel duidelijkheid geven</h2><ol><li>Sluit de rits tot bovenaan en haal rustig adem.</li><li>Kruis beide armen voor je borst.</li><li>Reik naar voren alsof je een fietsstuur vasthoudt.</li><li>Ga zitten en controleer of de zoom sterk omhoogkomt.</li><li>Buig beide ellebogen en kijk of de mouwen lang genoeg blijven.</li></ol>
  <h2>Waar hoort de ruimte te zitten?</h2><p>Een beetje bewegingsruimte bij borst, rug en bovenarmen is nuttig. Een grote lege plooi rond de romp is dat meestal niet: de jas oogt dan te ruim en kan onhandig aanvoelen. Kijk ook naar de kraag. Die moet met je trui samenwerken zonder tegen je keel te drukken.</p>
  <aside><p className="eyebrow">Praktische regel</p><p>Twijfel je tussen twee maten? Vergelijk beide over dezelfde trui en kies de maat waarin alle vijf bewegingen lukken zonder overmatig volume.</p></aside>
  <h2>Maatlabels zijn een vertrekpunt</h2><p>Een M van het ene model kan anders vallen dan een M van het andere. Gebruik de <Link href="/pages/maattabel">maattabel</Link> als vertrekpunt en vergelijk daarna de specifieke productinformatie. Bekijk de beschikbare maten in de collectie <Link href="/collections/jassen">herenjassen</Link>.</p>
  </>; }

function GewatteerdOfSoftshell() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> een gewatteerde jas is meestal gekozen voor isolatie; een softshell voor soepel bewegen en bescherming bij actief gebruik. De exacte warmte, wind- en waterbestendigheid verschilt per product en moet uit de productspecificaties blijken.</p>
  <h2>Twee verschillende uitgangspunten</h2><p>Gewatteerde jassen houden lucht vast in de vulling en zijn daardoor een logische keuze wanneer warmte vooropstaat. Softshell is een verzamelnaam voor soepele, dicht geweven buitenlagen die vaak bij beweging worden gedragen. Dat algemene verschil zegt nog niet hoe een specifiek Samkill-model presteert.</p>
  <div className="comparison-table" role="region" aria-label="Vergelijking gewatteerde jas en softshell"><table><thead><tr><th>Vraag</th><th>Gewatteerde jas</th><th>Softshell</th></tr></thead><tbody><tr><td>Belangrijkste doel</td><td>Warmte vasthouden</td><td>Bewegingsvrijheid en buitenlaag</td></tr><tr><td>Voor rustig buiten zijn</td><td>Vaak de logischere richting</td><td>Afhankelijk van laagjes en weer</td></tr><tr><td>Voor actief bewegen</td><td>Kan sneller warm voelen</td><td>Vaak prettiger door soepelheid</td></tr><tr><td>Regen</td><td colSpan={2}>Controleer de bevestigde waterkolom of waterdichtheidsclaim; het modeltype alleen bewijst niets.</td></tr></tbody></table></div>
  <h2>Let op het verschil tussen waterafstotend en waterdicht</h2><p>Een jas kan lichte neerslag tijdelijk afweren zonder waterdicht te zijn. Kijk daarom naar de fabrikantgegevens en nadenconstructie als regenbescherming belangrijk is. Ook algemene softshell-uitleg van <a href="https://www.anwb.nl/wandelen/uitrusting/softshell" rel="noreferrer">ANWB</a> benadrukt dat de eigenschappen per uitvoering verschillen.</p>
  <h2>Zo maak je de keuze</h2><ul><li>Kies richting gewatteerd als je vaak stilstaat of snel koud bent.</li><li>Kies richting softshell als je actief beweegt en laagjes wilt regelen.</li><li>Vergelijk daarna pasvorm, capuchon, zakken en bevestigde materiaalinfo.</li><li>Neem geen onbevestigde prestatieclaim aan op basis van de productnaam.</li></ul>
  <p>Bekijk de <Link href="/products/heren-softshell-jas-zwart">zwarte softshell jas</Link>, vergelijk hem met een <Link href="/products/heren-lichtgewicht-gewatteerde-jas-donkerblauw-2">licht gewatteerde jas</Link> en open de volledige <Link href="/collections/jassen">jassencollectie</Link>.</p>
  </>; }

function BeigeBomberjack() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> een beige bomberjack combineert het makkelijkst met wit, donkerblauw, antraciet en olijfgroen. Houd de rest van de outfit rustig en laat het lichte jack het contrast maken.</p>
  <h2>1. Beige, wit en antraciet</h2><p>Draag het bomberjack over een effen wit T-shirt met een rechte antraciete broek. Zwarte of donkergrijze sneakers houden de onderkant rustig. Dit werkt als eenvoudige stadslook in het voorjaar.</p>
  <h2>2. Beige met donkerblauw</h2><p>Een donkerblauwe fijngebreide trui en donkere jeans geven het lichte jack meer diepte. Bruine of taupekleurige schoenen verbinden de warme tinten zonder dat alles beige wordt.</p>
  <h2>3. Ton-sur-ton met olijfgroen</h2><p>Combineer beige met een gebroken wit shirt en een olijfgroene broek. Het blijft een rustige set omdat alle kleuren gedempt zijn. Vermijd veel kleine contrasten of grote prints wanneer het jack de blikvanger moet blijven.</p>
  <h2>Pasvorm en lengte</h2><p>Een bomberjack eindigt meestal rond de heup. Laat een T-shirt slechts iets onder de zoom uitkomen en controleer of de elastische boord niet omhoog kruipt. Pas het model met de laag die je er echt onder wilt dragen.</p>
  <p>Bekijk het <Link href="/products/naamloos-21apr_12-01">beige bomberjack</Link> en vergelijk de andere kleuren bij de <Link href="/collections/voorjaarsjassen">voorjaarsjassen</Link>.</p>
  </>; }

function MaatHerenset() { return <>
  <p className="article-answer"><strong>Kort antwoord:</strong> kies de maat van een tweedelige set op het kledingstuk dat het nauwst moet aansluiten. Meet borst, taille en heup, vergelijk alle drie met de maattabel en controleer of zowel broek als bovenstuk genoeg bewegingsruimte hebben.</p>
  <h2>Eén maat, twee pasvormen</h2><p>Bij een set worden broek en bovenstuk samen gekozen. Dat is eenvoudig wanneer je boven en onder dezelfde confectiemaat draagt, maar lastiger als je schouders of bovenbenen relatief breder zijn. Baseer je keuze daarom niet alleen op je jeansmaat.</p>
  <h2>Meet zonder extra speling toe te voegen</h2><ol><li>Meet je borst rondom het breedste punt.</li><li>Meet je natuurlijke taille zonder de band strak te trekken.</li><li>Meet je heup rondom het breedste punt.</li><li>Vergelijk de uitkomsten met de <Link href="/pages/maattabel">maattabel</Link>.</li></ol>
  <h2>Doe de zit- en reiktest</h2><p>Ga zitten om de tailleband en bovenbenen te testen. Reik daarna met beide armen naar voren. Trekt het bovenstuk sterk over je rug of snijdt de broek in bij het zitten, dan is de set te klein. Veel overtollige stof bij schouders én taille wijst eerder op een te grote maat.</p>
  <div className="checklist"><h2>Controle voor je kiest</h2><ul><li>Borst, taille en heup vallen binnen de aangegeven maat.</li><li>De broek blijft comfortabel wanneer je zit.</li><li>Het bovenstuk sluit zonder plooien onder spanning.</li><li>De beschikbare variant geldt voor de complete set.</li></ul></div>
  <p>De gecontroleerde Samkill-sets zijn momenteel beschikbaar in varianten van S tot en met XXL, afhankelijk van het model. Controleer de actuele variant op de productpagina en bekijk alle <Link href="/collections/setjes">tweedelige herensets</Link>.</p>
  </>; }

const articleBodies: Record<string, React.ReactNode> = {
  "tussenjas-kiezen": <TussenjasKiezen />,
  "winterjas-over-trui": <WinterjasOverTrui />,
  "bodywarmer-of-tussenjas": <BodywarmerOfTussenjas />,
  "bodywarmer-over-hoodie": <BodywarmerOverHoodie />,
  "winterjas-kopen": <WinterjasKopen />,
  "gewatteerde-jas-of-softshell": <GewatteerdOfSoftshell />,
  "beige-bomberjack-combineren": <BeigeBomberjack />,
  "maat-tweedelige-herenset": <MaatHerenset />,
};

export default async function ArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const content = articleBodies[article.slug];
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, image: `https://samkill.nl${article.image}`, datePublished: article.published, dateModified: article.published, inLanguage: "nl-NL", author: { "@type": "Organization", name: "Samkill" }, publisher: { "@type": "Organization", name: "Samkill" }, mainEntityOfPage: `https://samkill.nl/blog/${article.slug}` };
  return <article className="article-page"><nav className="breadcrumbs" aria-label="Broodkruimels"><Link href="/">Home</Link><span>/</span><Link href="/blog">Journal</Link><span>/</span><span>{article.title}</span></nav><header className="article-header"><p className="eyebrow">{article.category} · {article.readingTime}</p><h1>{article.title}</h1><p>{article.description}</p><time dateTime={article.published}>12 november 2026</time></header><div className="article-cover"><Image src={article.image} alt={article.alt} fill priority sizes="100vw" /></div><div className="article-content">{content}<div className="article-cta"><p className="eyebrow">Verder kijken</p><h2>Vind de juiste laag.</h2><div>{article.links.map((link) => <Link className="button button-dark" key={link} href={link}>Bekijk de collectie</Link>)}</div></div></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></article>;
}
