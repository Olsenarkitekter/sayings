const rawProverbs = [
  { id: 'better-late-than-never', en: { saying: 'Better late than never', explanation: 'It is better to do something late than not do it at all.' }, dk: { saying: 'Bedre sent end aldrig', explanation: 'Det er bedre at gøre noget sent end slet ikke.' }, fo: { saying: 'Betri seint enn ongantíð', explanation: 'Tað er betri at gera okkurt seint enn als ikki.' } },
  { id: 'actions-speak-louder', en: { saying: 'Actions speak louder than words', explanation: 'What people do matters more than what they say.' }, dk: { saying: 'Handlinger taler højere end ord', explanation: 'Det man gør, betyder mere end det man siger.' }, fo: { saying: 'Gerðir tala hægri enn orð', explanation: 'Tað fólk gera, hevur størri týdning enn tað tey siga.' } },
  { id: 'dont-judge-book', en: { saying: 'Do not judge a book by its cover', explanation: 'Do not judge something only by how it looks.' }, dk: { saying: 'Døm ikke bogen på omslaget', explanation: 'Vurder ikke noget kun ud fra udseendet.' }, fo: { saying: 'Døm ikki bókina eftir permuna', explanation: 'Met ikki um nakað bert eftir útsjóndini.' } },
  { id: 'two-birds-one-stone', en: { saying: 'Kill two birds with one stone', explanation: 'Solve two things with one action.' }, dk: { saying: 'Slå to fluer med ét smæk', explanation: 'Løse to ting med én handling.' }, fo: { saying: 'Sláa tvær flugur við einum smekki', explanation: 'Loysa tvey mál við einari gerð.' } },
  { id: 'elephant-room', en: { saying: 'The elephant in the room', explanation: 'An obvious problem nobody wants to talk about.' }, dk: { saying: 'Elefanten i rummet', explanation: 'Et tydeligt problem, som ingen vil tale om.' }, fo: { saying: 'Elefanturin í rúminum', explanation: 'Ein eyðsýndur trupulleiki, sum eingin vil tosa um.' } },
  { id: 'all-eggs-one-basket', en: { saying: 'Do not put all your eggs in one basket', explanation: 'Do not risk everything on one plan.' }, dk: { saying: 'Læg ikke alle æg i én kurv', explanation: 'Sats ikke alt på én plan.' }, fo: { saying: 'Legg ikki øll eggini í eina kurv', explanation: 'Set ikki alt upp á eina ætlan.' } },
  { id: 'early-bird', en: { saying: 'The early bird catches the worm', explanation: 'People who act early often get the best chances.' }, dk: { saying: 'Morgenstund har guld i mund', explanation: 'Den der er tidligt ude, får ofte de bedste muligheder.' }, fo: { saying: 'Morgunstund hevur gull í munni', explanation: 'Tann sum er tíðliga úti, fær ofta bestu møguleikarnar.' } },
  { id: 'practice-perfect', en: { saying: 'Practice makes perfect', explanation: 'You improve by practicing.' }, dk: { saying: 'Øvelse gør mester', explanation: 'Man bliver bedre ved at øve sig.' }, fo: { saying: 'Venjing ger meistara', explanation: 'Tú verður betri við at venja.' } },
  { id: 'rome-not-built-day', en: { saying: 'Rome was not built in a day', explanation: 'Big things take time.' }, dk: { saying: 'Rom blev ikke bygget på én dag', explanation: 'Store ting tager tid.' }, fo: { saying: 'Róm varð ikki bygdur eftir einum degi', explanation: 'Stór ting taka tíð.' } },
  { id: 'no-smoke-without-fire', en: { saying: 'There is no smoke without fire', explanation: 'Rumors often have a reason behind them.' }, dk: { saying: 'Ingen røg uden ild', explanation: 'Rygter har ofte en årsag bag sig.' }, fo: { saying: 'Eingin roykur uttan eld', explanation: 'Søgur hava ofta eina orsøk aftanfyri seg.' } },
  { id: 'old-habits-die-hard', en: { saying: 'You can’t teach an old dog new tricks', explanation: 'It is difficult to make someone change long-established habits or ways of thinking.' }, dk: { saying: 'Gamle vaner er svære at bryde', explanation: 'Det er svært at ændre vaner.' }, fo: { saying: 'Gamlar vanar eru torførar at bróta', explanation: 'Tað er torført at broyta vanar.' } },
  { id: 'strike-iron-hot', en: { saying: 'Strike while the iron is hot', explanation: 'Act while the opportunity is good.' }, dk: { saying: 'Smed mens jernet er varmt', explanation: 'Handl mens muligheden er god.' }, fo: { saying: 'Smíð meðan jarnið er heitt', explanation: 'Ger nakað meðan møguleikin er góður.' } },
  { id: 'too-many-cooks', en: { saying: 'Too many cooks spoil the broth', explanation: 'Too many people controlling something can make it worse.' }, dk: { saying: 'For mange kokke fordærver maden', explanation: 'For mange der bestemmer, kan gøre resultatet dårligere.' }, fo: { saying: 'Ov nógvir kokkar spilla matin', explanation: 'Ov nógv fólk við stýring kunnu gera úrslitið verri.' } },
  { id: 'look-before-leap', en: { saying: 'Look before you leap', explanation: 'Think before you act.' }, dk: { saying: 'Se dig for, før du springer', explanation: 'Tænk dig om, før du handler.' }, fo: { saying: 'Hygg áðrenn tú leypir', explanation: 'Hugsa teg um, áðrenn tú gert nakað.' } },
  { id: 'many-hands-light-work', en: { saying: 'Many hands make light work', explanation: 'A task is easier when more people help.' }, dk: { saying: 'Mange hænder gør arbejdet let', explanation: 'En opgave bliver lettere, når flere hjælper.' }, fo: { saying: 'Mangar hendur gera arbeiðið lætt', explanation: 'Ein uppgáva verður lættari, tá fleiri hjálpa.' } },
  { id: 'honesty-best-policy', en: { saying: 'Honesty is the best policy', explanation: 'It is usually best to tell the truth.' }, dk: { saying: 'Ærlighed varer længst', explanation: 'Det er som regel bedst at sige sandheden.' }, fo: { saying: 'Ærligheit varir longst', explanation: 'Tað er vanliga best at siga sannleikan.' } },
  { id: 'time-flies', en: { saying: 'Time flies', explanation: 'Time seems to pass very quickly.' }, dk: { saying: 'Tiden flyver', explanation: 'Tiden føles som om den går meget hurtigt.' }, fo: { saying: 'Tíðin flýgur', explanation: 'Tíðin kennist at ganga sera skjótt.' } },
  { id: 'you-live-and-learn', en: { saying: 'You live and you learn', explanation: 'Experience and mistakes teach you.' }, dk: { saying: 'Man lever og lærer', explanation: 'Fejl og oplevelser lærer en noget.' }, fo: { saying: 'Tú livir og lærir', explanation: 'Mistøk og upplivingar læra teg nakað.' } },
  { id: 'easy-come-easy-go', en: { saying: 'Easy come, easy go', explanation: 'Something gained easily can be lost easily.' }, dk: { saying: 'Let kommet, let gået', explanation: 'Noget man nemt får, kan man nemt miste.' }, fo: { saying: 'Lætt komið, lætt farið', explanation: 'Okkurt tú lætt fært, kan tú lætt missa.' } },
  { id: 'no-pain-no-gain', en: { saying: 'No pain, no gain', explanation: 'Progress often requires effort.' }, dk: { saying: 'Ingen smerte, ingen gevinst', explanation: 'Fremskridt kræver ofte indsats.' }, fo: { saying: 'Eingin pína, eingin vinningur', explanation: 'Framgongd krevur ofta stríð.' } },
  { id: 'silence-golden', en: { saying: 'Silence is golden', explanation: 'Sometimes it is best not to speak.' }, dk: { saying: 'Tavshed er guld', explanation: 'Nogle gange er det bedst ikke at sige noget.' }, fo: { saying: 'Tøgn er gull', explanation: 'Onkuntíð er best ikki at siga nakað.' } },
  { id: 'knowledge-power', en: { saying: 'Knowledge is power', explanation: 'Knowing more gives you strength and options.' }, dk: { saying: 'Viden er magt', explanation: 'Mere viden giver styrke og muligheder.' }, fo: { saying: 'Vitan er vald', explanation: 'Meiri vitan gevur styrki og møguleikar.' } },
  { id: 'all-that-glitters', en: { saying: 'All that glitters is not gold', explanation: 'Something attractive is not always valuable.' }, dk: { saying: 'Alt der glimter er ikke guld', explanation: 'Noget der ser godt ud, er ikke altid værdifuldt.' }, fo: { saying: 'Alt sum glitrar er ikki gull', explanation: 'Okkurt sum sær gott út, er ikki altíð virðismikið.' } },
  { id: 'blood-thicker-water', en: { saying: 'Blood is thicker than water', explanation: 'Family ties are often very strong.' }, dk: { saying: 'Blod er tykkere end vand', explanation: 'Familiebånd er ofte meget stærke.' }, fo: { saying: 'Blóð er tjúkkari enn vatn', explanation: 'Familjubond eru ofta sera sterk.' } },
  { id: 'walls-have-ears', en: { saying: 'Walls have ears', explanation: 'Be careful what you say; someone may be listening.' }, dk: { saying: 'Væggene har ører', explanation: 'Pas på hvad du siger; nogen kan lytte med.' }, fo: { saying: 'Veggirnir hava oyru', explanation: 'Ansar eftir hvat tú sigur; onkur kann lurta.' } },
  { id: 'love-blind', en: { saying: 'Love is blind', explanation: 'Love can make people ignore faults.' }, dk: { saying: 'Kærlighed gør blind', explanation: 'Kærlighed kan få folk til at overse fejl.' }, fo: { saying: 'Kærleiki ger blindan', explanation: 'Kærleiki kann fáa fólk at síggja burtur frá brekum.' } },
  { id: 'necessity-invention', en: { saying: 'Necessity is the mother of invention', explanation: 'Need often creates new ideas.' }, dk: { saying: 'Nød lærer nøgen kvinde at spinde', explanation: 'Behov kan få mennesker til at finde nye løsninger.' }, fo: { saying: 'Neyð lærir nakna kvinnu at spinna', explanation: 'Tørvur kann fáa fólk at finna nýggjar loysnir.' } },
  { id: 'where-theres-will', en: { saying: 'Where there is a will, there is a way', explanation: 'Determination can help you find a solution.' }, dk: { saying: 'Hvor der er vilje, er der vej', explanation: 'Vilje kan hjælpe dig med at finde en løsning.' }, fo: { saying: 'Har vilji er, er vegur', explanation: 'Vilji kann hjálpa tær at finna eina loysn.' } },
  { id: 'nothing-ventured', en: { saying: 'Nothing ventured, nothing gained', explanation: 'You must take chances to gain something.' }, dk: { saying: 'Hvo intet vover, intet vinder', explanation: 'Man må tage chancer for at vinde noget.' }, fo: { saying: 'Tann ið einki váðar, einki vinnur', explanation: 'Tú mást váða nakað fyri at vinna nakað.' } },
  { id: 'empty-vessels', en: { saying: 'Empty vessels make the most noise', explanation: 'People with little knowledge can be the loudest.' }, dk: { saying: 'Tomme tønder buldrer mest', explanation: 'Folk med lidt indhold kan larme mest.' }, fo: { saying: 'Tóm íløt ljóða mest', explanation: 'Fólk við lítlari vitan kunnu vera mest harðmælt.' } },
  { id: 'slow-steady', en: { saying: 'Slow and steady wins the race', explanation: 'Patience and consistency often win.' }, dk: { saying: 'Langsomt men sikkert vinder løbet', explanation: 'Tålmodighed og stabilitet vinder ofte.' }, fo: { saying: 'Seint og trygt vinnur kapprenningina', explanation: 'Tol og støðufesti vinna ofta.' } },
  { id: 'every-beginning-hard', en: { saying: 'Every beginning is hard', explanation: 'Starting something new can be difficult.' }, dk: { saying: 'Al begyndelse er svær', explanation: 'Det kan være svært at starte noget nyt.' }, fo: { saying: 'Øll byrjan er torfør', explanation: 'Tað kann vera torført at byrja nakað nýtt.' } },
  { id: 'like-father-son', en: { saying: 'Like father, like son', explanation: 'Children often resemble their parents.' }, dk: { saying: 'Som far, så søn', explanation: 'Børn ligner ofte deres forældre.' }, fo: { saying: 'Sum faðir, so sonur', explanation: 'Børn líkjast ofta foreldrunum.' } },
  { id: 'out-of-sight', en: { saying: 'Out of sight, out of mind', explanation: 'People often forget what they do not see.' }, dk: { saying: 'Ude af øje, ude af sind', explanation: 'Man glemmer ofte det, man ikke ser.' }, fo: { saying: 'Úr eygsjón, úr huga', explanation: 'Fólk gloyma ofta tað, tey ikki síggja.' } },
  { id: 'one-swallow', en: { saying: 'One swallow does not make a summer', explanation: 'One good sign does not prove everything is fine.' }, dk: { saying: 'Én svale gør ingen sommer', explanation: 'Et enkelt godt tegn beviser ikke, at alt er godt.' }, fo: { saying: 'Ein svala ger onga summar', explanation: 'Eitt gott tekin prógvar ikki, at alt er gott.' } },
  { id: 'opposites-attract', en: { saying: 'Opposites attract', explanation: 'Very different people can be drawn to each other.' }, dk: { saying: 'Modsætninger mødes', explanation: 'Meget forskellige mennesker kan tiltrækkes af hinanden.' }, fo: { saying: 'Andsøgnir dragast at hvørjum øðrum', explanation: 'Sera ymisk fólk kunnu dragast at hvørjum øðrum.' } },
  { id: 'patience-virtue', en: { saying: 'Patience is a virtue', explanation: 'Being patient is a good quality.' }, dk: { saying: 'Tålmodighed er en dyd', explanation: 'Det er en god egenskab at være tålmodig.' }, fo: { saying: 'Tol er ein dygd', explanation: 'Tað er ein góð eginleiki at hava tol.' } },
  { id: 'truth-will-out', en: { saying: 'The truth will out', explanation: 'The truth usually becomes known eventually.' }, dk: { saying: 'Sandheden kommer for en dag', explanation: 'Sandheden bliver som regel kendt til sidst.' }, fo: { saying: 'Sannleikin kemur fyri ein dag', explanation: 'Sannleikin kemur vanliga fram at enda.' } },
  { id: 'haste-makes-waste', en: { saying: 'Haste makes waste', explanation: 'Doing things too quickly can create mistakes.' }, dk: { saying: 'Hastværk er lastværk', explanation: 'Hvis man skynder sig for meget, laver man fejl.' }, fo: { saying: 'Skundur er ofta skaði', explanation: 'Ger mann okkurt ov skjótt, koma ofta mistøk.' } },
  { id: 'better-safe-than-sorry', en: { saying: 'Better safe than sorry', explanation: 'It is better to be careful than regret it later.' }, dk: { saying: 'Hellere være på den sikre side', explanation: 'Det er bedre at være forsigtig end at fortryde senere.' }, fo: { saying: 'Betri tryggur enn harmur', explanation: 'Tað er betri at vera varin enn at angra seinni.' } },
  { id: 'birds-feather', en: { saying: 'Birds of a feather flock together', explanation: 'Similar people often spend time together.' }, dk: { saying: 'Lige børn leger bedst', explanation: 'Folk der ligner hinanden, finder ofte sammen.' }, fo: { saying: 'Lík børn spæla best', explanation: 'Fólk sum líkjast, finna ofta saman.' } },
  { id: 'better-one-bird', en: { saying: 'A bird in the hand is worth two in the bush', explanation: 'A sure thing is better than a risky possibility.' }, dk: { saying: 'Hellere én fugl i hånden end ti på taget', explanation: 'Noget sikkert er bedre end en usikker mulighed.' }, fo: { saying: 'Betri ein fuglur í hond enn tíggju á takinum', explanation: 'Okkurt trygt er betri enn ein óvissur møguleiki.' } },
  { id: 'after-rain-sun', en: { saying: 'After rain comes sunshine', explanation: 'Hard times are often followed by better times.' }, dk: { saying: 'Efter regn kommer solskin', explanation: 'Svære tider bliver ofte efterfulgt af bedre tider.' }, fo: { saying: 'Eftir regn kemur sólskin', explanation: 'Eftir torførar tíðir koma ofta betri tíðir.' } },
  { id: 'pick-your-brain', en: { saying: 'Can I pick your brain?', explanation: 'A friendly way to ask someone for advice, ideas, or knowledge.', origin: 'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.' }, dk: { saying: 'Må jeg lige høre din mening?', explanation: 'En venlig måde at spørge nogen om råd, idéer eller viden.', origin: 'Det engelske udtryk betyder bogstaveligt at “plukke” i nogens hjerne, men bruges uformelt og ikke voldsomt.' }, fo: { saying: 'Kann eg hoyra tína meining?', explanation: 'Ein vinarligur máti at spyrja onkran um ráð, hugskot ella vitan.', origin: 'Enska orðingin merkir bókstaviliga at “plukka” í heilanum hjá onkrum, men verður brúkt óformliga.' } },
  { id: 'bone-to-pick', en: { saying: 'I have a bone to pick with you', explanation: 'You have a complaint or disagreement you want to discuss.', origin: 'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.' }, dk: { saying: 'Jeg har noget at tale med dig om', explanation: 'Du har en klage eller uenighed, som du vil tage op.', origin: 'Udtrykket forbindes ofte med to hunde, der slås om det samme ben — altså noget der skal afklares.' }, fo: { saying: 'Eg havi nakað at tosa við teg um', explanation: 'Tú hevur eina klagu ella ósemju, sum tú vilt taka upp.', origin: 'Orðingin verður ofta knýtt at tveimum hundum, sum stríðast um sama bein — nakað má fáast upp á pláss.' } },
  { id: 'break-the-ice', en: { saying: 'Break the ice', explanation: 'To make a first meeting or awkward situation feel easier.', origin: 'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.' }, dk: { saying: 'Bryde isen', explanation: 'At gøre et første møde eller en akavet situation lettere.', origin: 'Skibe måtte bryde is for at åbne en vej. Senere blev det brugt om at åbne en samtale.' }, fo: { saying: 'Bróta ísin', explanation: 'At gera ein fyrsta fund ella eina ótrygga støðu lættari.', origin: 'Skip máttu bróta ís fyri at sleppa fram. Seinni varð tað brúkt um at lata upp fyri samrøðu.' } },
  { id: 'spill-the-beans', en: { saying: 'Spill the beans', explanation: 'To reveal a secret, often by accident.', origin: 'The exact origin is uncertain, but it may come from old voting with beans, where spilling them revealed the result too early.' }, dk: { saying: 'Afsløre hemmeligheden', explanation: 'At røbe en hemmelighed, ofte ved et uheld.', origin: 'Oprindelsen er usikker, men forbindes ofte med gamle afstemninger med bønner, hvor resultatet blev afsløret for tidligt.' }, fo: { saying: 'Avdúka loyndarmálið', explanation: 'At avdúka eitt loyndarmál, ofta av óvart.', origin: 'Upprunin er óvissur, men verður ofta settur í samband við gamlar atkvøður við bønum, har úrslitið kundi síggjast ov tíðliga.' } },
  { id: 'bite-the-bullet', en: { saying: 'Bite the bullet', explanation: 'To accept something painful or difficult and get through it.', origin: 'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.' }, dk: { saying: 'Bide tænderne sammen', explanation: 'At acceptere noget svært eller ubehageligt og komme igennem det.', origin: 'Udtrykket knyttes ofte til soldater, der bed i en kugle under operationer før moderne bedøvelse. Historien er omdiskuteret.' }, fo: { saying: 'Bíta tenninar saman', explanation: 'At taka okkurt trupult ella pínufult á seg og koma ígjøgnum tað.', origin: 'Orðingin verður ofta knýtt at hermonnum, sum bitu í eina kúlu undir skurðviðgerð áðrenn nútímans doyving. Søgan er tó umrødd.' } },
  { id: 'under-the-weather', en: { saying: 'Under the weather', explanation: 'To feel ill, tired, or not quite yourself.', origin: 'Often linked to sailors who went below deck, under the bad weather, when they felt sick.' }, dk: { saying: 'Ikke helt på toppen', explanation: 'At føle sig syg, træt eller ikke helt som sig selv.', origin: 'Udtrykket forbindes ofte med søfolk, der gik under dæk — væk fra vejret — når de blev søsyge.' }, fo: { saying: 'Ikki heilt væl fyri', explanation: 'At kenna seg sjúkan, móðan ella ikki heilt sum vanligt.', origin: 'Orðingin verður ofta knýtt at sjófólki, sum fóru undir dekk — undir veðrinum — tá tey gjørdust sjóverk.' } },
  { id: 'blessing-in-disguise', en: { saying: 'A blessing in disguise', explanation: 'Something that first seems bad but later turns out to be good.', origin: 'The phrase has been used since at least the 1700s and carries a religious idea: good fortune hidden inside trouble.' }, dk: { saying: 'Et held i uheld', explanation: 'Noget der først virker dårligt, men senere viser sig at være godt.', origin: 'Udtrykket har været brugt siden mindst 1700-tallet og bygger på idéen om en skjult velsignelse.' }, fo: { saying: 'Eitt hepni í óhepni', explanation: 'Okkurt sum fyrst tykist ringt, men seinni vísir seg at vera gott.', origin: 'Orðingin hevur verið brúkt í fleiri øldir og ber hugmyndina um eina goymda signing.' } },
  { id: 'good-samaritan', en: { saying: 'A good Samaritan', explanation: 'Someone who helps a stranger or person in need.', origin: 'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.' }, dk: { saying: 'En barmhjertig samaritaner', explanation: 'En person der hjælper en fremmed eller én i nød.', origin: 'Fra Jesu lignelse i Lukasevangeliet, hvor en samaritaner hjælper en såret rejsende.' }, fo: { saying: 'Ein miskunnsamur samverji', explanation: 'Ein persónur sum hjálpir einum fremmandum ella einum í neyð.', origin: 'Úr líknilsi Jesusar í Lukasevangeliinum, har ein samverji hjálpir einum særdum ferðamanni.' } },
  { id: 'forbidden-fruit', en: { saying: 'Forbidden fruit', explanation: 'Something becomes more tempting because it is not allowed.', origin: 'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.' }, dk: { saying: 'Forbuden frugt', explanation: 'Noget bliver mere fristende, fordi det ikke er tilladt.', origin: 'Fra fortællingen om Adam og Eva i Første Mosebog. Bibelen siger ikke, at frugten var et æble.' }, fo: { saying: 'Forboðin frukt', explanation: 'Okkurt verður meira freistandi, tí tað ikki er loyvt.', origin: 'Úr frásøgnini um Ádam og Evu í Fyrstu Mósebók. Bíblian sigur ikki, at fruktin var eitt súrepli.' } },
  { id: 'scapegoat', en: { saying: 'Scapegoat', explanation: 'A person or group blamed for something, often unfairly.', origin: 'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.' }, dk: { saying: 'Syndebuk', explanation: 'En person eller gruppe der får skylden, ofte uretfærdigt.', origin: 'Fra Tredje Mosebog, hvor en buk symbolsk bar folkets synder ud i ørkenen.' }, fo: { saying: 'Syndabukkur', explanation: 'Ein persónur ella bólkur, sum fær skyldina, ofta órættvíst.', origin: 'Úr Triðju Mósebók, har ein bukkur ímyndarliga bar syndir fólksins út í oyðimørkina.' } },
  { id: 'skin-of-teeth', en: { saying: 'By the skin of your teeth', explanation: 'To only just succeed or escape.', origin: 'From the Book of Job. It survives today as a vivid way to say “barely”.' }, dk: { saying: 'Med nød og næppe', explanation: 'At klare noget eller slippe væk lige akkurat.', origin: 'Fra Jobs Bog i Bibelen. Udtrykket lever videre som en stærk måde at sige “kun lige”.' }, fo: { saying: 'Við neyð og deyð', explanation: 'At klára okkurt ella sleppa burtur akkurát.', origin: 'Úr Jobs bók í Bíbliuni. Orðingin livir víðari sum ein sterk mynd fyri “bara akkurát”.' } },
  { id: 'no-brainer', en: { saying: 'A no-brainer', explanation: 'An easy decision that does not need much thought.', origin: 'Modern informal English from the late 1900s, built on the idea that the answer is so obvious it hardly needs a brain.' }, dk: { saying: 'En selvfølge', explanation: 'En nem beslutning, der næsten ikke kræver overvejelse.', origin: 'Moderne uformelt engelsk fra slutningen af 1900-tallet: svaret er så oplagt, at man næsten ikke behøver hjernen.' }, fo: { saying: 'Sjálvsagt', explanation: 'Ein løtt avgerð, sum næstan ikki krevur umhugsan.', origin: 'Nýggjari óformelt enskt mál: svarið er so eyðsýnt, at tú næstan ikki nýtir heilan.' } },
  { id: 'hangry', en: { saying: 'Hangry', explanation: 'Irritable or angry because you are hungry.', origin: 'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.' }, dk: { saying: 'Sulten og sur', explanation: 'Irriteret eller vred, fordi man er sulten.', origin: 'Et moderne slangord sammensat af “hungry” og “angry”, især udbredt online og i hverdagssprog.' }, fo: { saying: 'Svangaður og illur', explanation: 'Irriteraður ella illur, tí tú ert svangur.', origin: 'Eitt nýggjari slangorð úr enskum, sett saman av “hungry” og “angry”.' } },
  { id: 'ghost-someone', en: { saying: 'To ghost someone', explanation: 'To suddenly stop replying to someone without explanation.', origin: 'Modern digital slang: the person disappears from contact like a ghost.' }, dk: { saying: 'At ghoste nogen', explanation: 'Pludselig at stoppe med at svare nogen uden forklaring.', origin: 'Moderne digital slang: personen forsvinder fra kontakten som et spøgelse.' }, fo: { saying: 'At ghosta onkran', explanation: 'Brádliga at gevast at svara onkrum uttan frágreiðing.', origin: 'Nýggjari talgilt slang: persónurin hvørvur sum eitt spøkilsi.' } },
  { id: 'throw-shade', en: { saying: 'Throw shade', explanation: 'To subtly criticize or show disrespect.', origin: 'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.' }, dk: { saying: 'Kaste skygge', explanation: 'At kritisere eller vise mangel på respekt på en indirekte måde.', origin: 'Udbredt gennem Black og LGBTQ+ ballroom-kultur og senere gennem medier og sociale platforme.' }, fo: { saying: 'Kasta skugga', explanation: 'At finnast at ella vísa vanvirðing á ein óbeinleiðis hátt.', origin: 'Vorðið kent gjøgnum Black og LGBTQ+ ballroom-mentan og seinni gjøgnum miðlar og sosialar pallir.' } },
{ id: 'hold-your-horses', en: { saying: 'Hold your horses', explanation: 'Slow down, wait, or think before acting.', origin: 'The phrase comes from literally controlling horses before moving on. It later became a general warning to pause and be patient.' }, dk: { saying: 'Hold lige hestene', explanation: 'Tag det roligt, vent eller tænk dig om før du handler.', origin: 'Udtrykket kommer fra at holde styr på heste, før man kører eller rider videre. Senere blev det brugt om at bremse en beslutning.' }, fo: { saying: 'Halt hestunum aftur', explanation: 'Tak tað róligt, bíða ella hugsa teg um, áðrenn tú gert nakað.', origin: 'Orðingin kemur frá at halda hestunum aftur, áðrenn farið verður víðari. Seinni fekk hon merkingina at bíða og vera varin.' } },
  { id: 'let-cat-out-bag', en: { saying: 'Let the cat out of the bag', explanation: 'To reveal a secret, often accidentally.', origin: 'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.' }, dk: { saying: 'Lukke katten ud af sækken', explanation: 'At afsløre en hemmelighed, ofte ved et uheld.', origin: 'Forbindes ofte med gamle markeder, hvor en uærlig sælger kunne bytte en gris i en sæk ud med en kat. Når sækken blev åbnet, blev bedraget afsløret.' }, fo: { saying: 'Lata ketuna úr sekkinum', explanation: 'At avdúka eitt loyndarmál, ofta av óvart.', origin: 'Verður ofta knýtt at gomlum marknaðum, har ein óerligur seljari kundi lata ein ketu í sekk í staðin fyri ein grís. Tá sekkurin varð latin upp, kom svikið undan kavi.' } },
  { id: 'bull-china-shop', en: { saying: 'A bull in a china shop', explanation: 'Someone clumsy or careless who causes damage or chaos.', origin: 'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.' }, dk: { saying: 'Som en elefant i en glasbutik', explanation: 'En klodset eller uforsigtig person, der skaber kaos.', origin: 'Billedet er enkelt: et stort dyr blandt skrøbelige ting. Derfor bruges det om en person, der ødelægger eller forstyrrer uden finesse.' }, fo: { saying: 'Sum ein tarvur í einum postulínshandli', explanation: 'Ein klombrutur ella óvarin persónur, sum ger skaða ella ruðuleika.', origin: 'Myndin er einføld: eitt stórt dýr millum viðbreknar lutir. Tí verður tað brúkt um klombruta atferð.' } },
  { id: 'turn-blind-eye', en: { saying: 'Turn a blind eye', explanation: 'To deliberately ignore something you know is happening.', origin: 'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.' }, dk: { saying: 'Vende det blinde øje til', explanation: 'Bevidst at ignorere noget, man godt ved sker.', origin: 'Forbindes ofte med admiral Horatio Nelson, der efter sigende ignorerede et signal ved at sætte kikkerten for sit blinde øje.' }, fo: { saying: 'Venda blinda eygað til', explanation: 'Tilvitað at lata sum einki, hóast tú veitst, hvat hendir.', origin: 'Verður ofta knýtt at admiral Horatio Nelson, sum sigst hava latið sum um hann ikki sá eitt merki, tí hann setti kikaran fyri blinda eygað.' } },
  { id: 'beat-around-bush', en: { saying: 'Beat around the bush', explanation: 'To avoid saying the main point directly.', origin: 'From hunting, where people beat bushes to drive birds out before the real action began.' }, dk: { saying: 'Gå som katten om den varme grød', explanation: 'At undgå at sige det vigtigste direkte.', origin: 'Udtrykket forbindes med jagt, hvor man slog i buske for at få fugle frem, før selve jagten kunne begynde.' }, fo: { saying: 'Ganga uttan um kjarnuna', explanation: 'At sleppa undan at siga høvuðspunktið beinleiðis.', origin: 'Orðingin verður knýtt at veiðu, har runnar vórðu slignir fyri at fáa fuglar fram, áðrenn sjálv veiðan byrjaði.' } },
  { id: 'read-riot-act', en: { saying: 'Read the riot act', explanation: 'To strongly warn or scold someone.', origin: 'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.' }, dk: { saying: 'Læse nogen teksten', explanation: 'At give nogen en kraftig advarsel eller skideballe.', origin: 'Fra den britiske Riot Act fra 1714, som blev læst højt for ulovlige forsamlinger, før myndighederne kunne gribe ind.' }, fo: { saying: 'Lesa onkrum lógina', explanation: 'At geva onkrum eina harða ávaring ella skolu.', origin: 'Frá bretsku Riot Act frá 1714, sum varð lisin upp fyri ólógligum mannamúgvum, áðrenn revsing kundi fylgja.' } },
  { id: 'horses-mouth', en: { saying: 'Straight from the horse’s mouth', explanation: 'Information from the most direct or reliable source.', origin: 'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.' }, dk: { saying: 'Direkte fra kilden', explanation: 'Information fra den mest direkte eller troværdige kilde.', origin: 'Kommer fra hestevæddeløb, hvor folk ville have information tæt på hesten selv, før de satsede penge.' }, fo: { saying: 'Beint frá kelduni', explanation: 'Upplýsingar frá beinleiðis ella álítandi keldu.', origin: 'Kemur úr rossakappingum, har fólk vildu hava upplýsingar so nær rossinum sum gjørligt, áðrenn tey settu pengar upp á tað.' } },
  { id: 'put-on-spot', en: { saying: 'Put on the spot', explanation: 'To be forced to answer or act in an awkward situation.', origin: 'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.' }, dk: { saying: 'Blive sat på stedet', explanation: 'At blive tvunget til at svare eller handle i en presset situation.', origin: 'Oprindelsen er omdiskuteret, men udtrykket handler om at blive udpeget og sat under pres.' }, fo: { saying: 'Verða settur á staðið', explanation: 'At verða noyddur at svara ella gera okkurt í einari kroystari støðu.', origin: 'Upprunin er umrøddur, men orðingin merkir at verða peikaður út og settur undir trýst.' } },
  { id: 'wet-blanket', en: { saying: 'A wet blanket', explanation: 'Someone who spoils other people’s fun or enthusiasm.', origin: 'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.' }, dk: { saying: 'En lyseslukker', explanation: 'En person der ødelægger andres glæde eller entusiasme.', origin: 'Et vådt tæppe kan slukke ild. Ilden blev et billede på glæde, og det våde tæppe blev personen, der slukker den.' }, fo: { saying: 'Ein gleðissløkkjari', explanation: 'Ein persónur sum oyðileggur gleðina ella hugan hjá øðrum.', origin: 'Eitt vátt teppi kann sløkkja eld. Eldurin gjørdist mynd fyri gleði, og tað váta teppið fyri tann, sum sløkkir hana.' } },
  { id: 'mad-as-hatter', en: { saying: 'Mad as a hatter', explanation: 'Completely eccentric, strange, or mentally unbalanced.', origin: 'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.' }, dk: { saying: 'Skør som en hattemager', explanation: 'Meget excentrisk, mærkelig eller ude af balance.', origin: 'Hattemagere brugte engang kviksølv i filtproduktion, og kviksølvforgiftning kunne give rystelser, uro og mærkelig adfærd.' }, fo: { saying: 'Ørur sum ein hattamakari', explanation: 'Sera løgin, ørkymlaður ella ójavnur.', origin: 'Hattamakarar brúktu einaferð kyksilvur í filtframleiðslu, og kyksilvureitran kundi geva ristningar, ótta og løgna atferð.' } },
  { id: 'push-envelope', en: { saying: 'Push the envelope', explanation: 'To test or go beyond normal limits.', origin: 'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.' }, dk: { saying: 'Presse grænserne', explanation: 'At teste eller gå ud over normale grænser.', origin: 'Fra luftfart, hvor “flight envelope” beskriver de grænser, et fly sikkert kan operere indenfor.' }, fo: { saying: 'Trýsta mørkini', explanation: 'At royna ella fara út um vanlig mørk.', origin: 'Úr flogvinnu, har “flight envelope” lýsir mørkini fyri, hvat eitt flogfar trygt kann gera.' } },
  { id: 'cat-got-tongue', en: { saying: 'Cat got your tongue?', explanation: 'Said when someone is unusually silent or cannot answer.', origin: 'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.' }, dk: { saying: 'Har katten taget din tunge?', explanation: 'Siges når nogen er usædvanligt tavs eller ikke kan svare.', origin: 'Oprindelsen er usikker. En teori forbinder “cat” med pisken cat-o’-nine-tails, som kunne efterlade folk ude af stand til at tale.' }, fo: { saying: 'Hevur ketan tikið tunguna?', explanation: 'Verður sagt, tá onkur er óvanliga tigandi ella ikki fær svarað.', origin: 'Upprunin er óvissur. Ein teori knýtir “cat” at sjómanapískinum cat-o’-nine-tails, sum kundi gera fólk málleys av pínu.' } },
  { id: 'hair-of-dog', en: { saying: 'Hair of the dog', explanation: 'Drinking more alcohol to ease a hangover.', origin: 'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.' }, dk: { saying: 'En reparationsbajer', explanation: 'At drikke mere alkohol for at dulme tømmermænd.', origin: 'Fra en gammel tro på, at et hundebid kunne behandles med hår fra den samme hund — en kur lavet af årsagen.' }, fo: { saying: 'Hár av hundinum', explanation: 'At drekka meira fyri at linna timburmenn.', origin: 'Frá gamlari trúgv um, at eitt hundabit kundi lekjast við hári frá sama hundi — ein lekidómur úr sjálvari orsøkini.' } },
  { id: 'bury-hatchet', en: { saying: 'Bury the hatchet', explanation: 'To end a conflict and make peace.', origin: 'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.' }, dk: { saying: 'Begrave stridsøksen', explanation: 'At afslutte en konflikt og slutte fred.', origin: 'Forbindes ofte med nordamerikanske fredsskikke, hvor våben blev begravet som tegn på, at kampen var slut.' }, fo: { saying: 'Grava stríðsøksina niður', explanation: 'At enda eina ósemju og gera frið.', origin: 'Verður ofta knýtt at norðuramerikanskum friðarsiðum, har vápn vórðu grivin niður sum tekin um, at stríðið var liðugt.' } },
  { id: 'go-belly-up', en: { saying: 'Go belly up', explanation: 'To fail, collapse, or go bankrupt.', origin: 'From dead animals or fish floating on their backs with their bellies upward.' }, dk: { saying: 'Med maven opad', explanation: 'At mislykkes, bryde sammen eller gå konkurs.', origin: 'Fra døde dyr eller fisk, der ligger eller flyder på ryggen med bugen opad.' }, fo: { saying: 'Við búkinum uppeftir', explanation: 'At miseydnast, detta saman ella fara á húsagang.', origin: 'Frá deyðum djórum ella fiskum, sum liggja ella flóta á rygginum við búkinum uppeftir.' } },
  { id: 'silver-lining', en: { saying: 'Every cloud has a silver lining', explanation: 'Even a bad situation may contain something positive.', origin: 'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.' }, dk: { saying: 'Der er en lys side ved det hele', explanation: 'Selv en dårlig situation kan indeholde noget positivt.', origin: 'Billedet kommer fra sollys langs kanten af en mørk sky og blev berømt brugt af digteren John Milton.' }, fo: { saying: 'Hvørt skýggj hevur eina ljósa rond', explanation: 'Sjálvt ein ring støða kann hava okkurt gott í sær.', origin: 'Myndin kemur frá sólarljósi fram við rondini á einum myrkum skýggi og varð kent brúkt av yrkjaranum John Milton.' } },
  { id: 'bigwig', en: { saying: 'A bigwig', explanation: 'An important or powerful person.', origin: 'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.' }, dk: { saying: 'En vigtig kanon', explanation: 'En vigtig eller magtfuld person.', origin: 'I 1700-tallet bar rige og magtfulde mænd ofte store parykker. Jo større paryk, jo vigtigere virkede personen.' }, fo: { saying: 'Ein stórur maður', explanation: 'Ein týdningarmikil ella máttmikil persónur.', origin: 'Í 1700-talinum bóru ríkir og máttmiklir menn ofta stórar parykkar. Jú størri parykkur, jú týdningarmiklari tyktist maðurin.' } },
  { id: 'earworm', en: { saying: 'Earworm', explanation: 'A song or phrase that gets stuck in your head.', origin: 'The term comes through German and was later used for music that seems to crawl into your ear and stay there.' }, dk: { saying: 'Ørehænger', explanation: 'En sang eller sætning, der sætter sig fast i hovedet.', origin: 'Udtrykket kommer via tysk og blev senere brugt om musik, der føles som om den kravler ind i øret og bliver der.' }, fo: { saying: 'Oyraormur', explanation: 'Ein sangur ella setningur, sum setur seg fastan í høvdinum.', origin: 'Orðingin kemur umvegis týskt og varð seinni brúkt um tónleik, sum tykist krúpa inn í oyrað og verða verandi.' } },
  { id: 'cold-feet', en: { saying: 'Get cold feet', explanation: 'To lose courage or confidence before doing something.', origin: 'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.' }, dk: { saying: 'Få kolde fødder', explanation: 'At miste modet lige før man skal gøre noget.', origin: 'Forbindes ofte med soldater, der bogstaveligt ikke kunne gå frem, fordi deres fødder var frosne eller dårligt beskyttet.' }, fo: { saying: 'Fáa kaldar føtur', explanation: 'At missa dirvið beint áðrenn tú skalt gera okkurt.', origin: 'Verður ofta knýtt at hermonnum, sum bókstaviliga ikki kundu ganga fram, tí føturnir vóru frystir ella illa vardir.' } },
  { id: 'go-bananas', en: { saying: 'Go bananas', explanation: 'To become very excited, angry, or wild.', origin: 'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.' }, dk: { saying: 'Gå helt amok', explanation: 'At blive meget begejstret, vred eller vild.', origin: 'Et moderne slangudtryk fra 1900-tallet, beslægtet med “go ape”, altså at opføre sig vildt.' }, fo: { saying: 'Gerast heilt villur', explanation: 'At gerast sera spentur, illur ella villur.', origin: 'Eitt nýggjari slangorð úr 1900-talinum, í ætt við “go ape”, sum merkir at bera seg villt at.' } },
  { id: 'armed-to-teeth', en: { saying: 'Armed to the teeth', explanation: 'Fully equipped, especially with weapons or tools.', origin: 'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.' }, dk: { saying: 'Bevæbnet til tænderne', explanation: 'Fuldt udstyret, især med våben eller redskaber.', origin: 'Forbindes ofte med pirater, der bar så mange våben som muligt, endda knive mellem tænderne.' }, fo: { saying: 'Vápnaður upp undir tenn', explanation: 'Fullkomiliga útgjørdur, serliga við vápnum ella amboðum.', origin: 'Verður ofta knýtt at sjórænarum, sum bóru so nógv vápn sum gjørligt, enntá knívar millum tenninar.' } },
  { id: 'bite-dust', en: { saying: 'Bite the dust', explanation: 'To fail badly, fall, or die.', origin: 'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.' }, dk: { saying: 'Bide i støvet', explanation: 'At fejle stort, falde eller dø.', origin: 'Udtrykket blev gjort populært af westerns, men billedet af fjender der ender i støvet er langt ældre, også i bibelsk sprog.' }, fo: { saying: 'Bíta í dustið', explanation: 'At miseydnast illa, detta ella doyggja.', origin: 'Orðingin varð kend gjøgnum westernfilmar, men myndin av fíggindum, sum enda í dustinum, er nógv eldri og finst eisini í bíbilskum máli.' } }
];

const categoryById = {
  'better-late-than-never': 'wisdom',
  'actions-speak-louder': 'work',
  'dont-judge-book': 'wisdom',
  'two-birds-one-stone': 'work',
  'elephant-room': 'wisdom',
  'all-eggs-one-basket': 'wisdom',
  'early-bird': 'work',
  'practice-perfect': 'work',
  'rome-not-built-day': 'work',
  'no-smoke-without-fire': 'wisdom',
  'old-habits-die-hard': 'life',
  'strike-iron-hot': 'work',
  'too-many-cooks': 'humour',
  'look-before-leap': 'wisdom',
  'many-hands-light-work': 'work',
  'honesty-best-policy': 'wisdom',
  'time-flies': 'life',
  'you-live-and-learn': 'life',
  'easy-come-easy-go': 'life',
  'no-pain-no-gain': 'work',
  'silence-golden': 'wisdom',
  'knowledge-power': 'wisdom',
  'all-that-glitters': 'wisdom',
  'blood-thicker-water': 'life',
  'walls-have-ears': 'wisdom',
  'love-blind': 'love',
  'necessity-invention': 'work',
  'where-theres-will': 'work',
  'nothing-ventured': 'work',
  'empty-vessels': 'wisdom',
  'slow-steady': 'work',
  'every-beginning-hard': 'life',
  'like-father-son': 'life',
  'out-of-sight': 'love',
  'one-swallow': 'weather',
  'opposites-attract': 'love',
  'patience-virtue': 'wisdom',
  'truth-will-out': 'wisdom',
  'haste-makes-waste': 'work',
  'better-safe-than-sorry': 'wisdom',
  'birds-feather': 'life',
  'better-one-bird': 'sea',
  'after-rain-sun': 'weather',
  'pick-your-brain': 'slang',
  'bone-to-pick': 'slang',
  'break-the-ice': 'life',
  'spill-the-beans': 'slang',
  'bite-the-bullet': 'work',
  'under-the-weather': 'weather',
  'blessing-in-disguise': 'biblical',
  'good-samaritan': 'biblical',
  'forbidden-fruit': 'biblical',
  'scapegoat': 'biblical',
  'skin-of-teeth': 'biblical',
  'no-brainer': 'slang',
  'hangry': 'slang',
  'ghost-someone': 'slang',
  'throw-shade': 'slang',
  'hold-your-horses': 'life',
  'let-cat-out-bag': 'slang',
  'bull-china-shop': 'humour',
  'turn-blind-eye': 'life',
  'beat-around-bush': 'slang',
  'read-riot-act': 'life',
  'horses-mouth': 'life',
  'put-on-spot': 'life',
  'wet-blanket': 'humour',
  'mad-as-hatter': 'humour',
  'push-envelope': 'work',
  'cat-got-tongue': 'slang',
  'hair-of-dog': 'slang',
  'bury-hatchet': 'life',
  'go-belly-up': 'work',
  'silver-lining': 'life',
  'bigwig': 'work',
  'earworm': 'slang',
  'cold-feet': 'life',
  'go-bananas': 'slang',
  'armed-to-teeth': 'work',
  'bite-dust': 'biblical'
};

const removedCategoryFallbacks = {
  wisdom: 'life',
  weather: 'life',
  sea: 'life'
};

function normalizeCategory(category) {
  return removedCategoryFallbacks[category] || category || 'life';
}

const languageEquivalentsById = {
  "elephant-room": {
    "de": { "saying": "Der Elefant im Raum", "country": "Germany", "approxPeriod": "modern calque", "confidence": "medium" },
    "es": { "saying": "El elefante en la habitación", "country": "Spain / Latin America", "approxPeriod": "modern calque", "confidence": "medium" },
    "no": { "saying": "Elefanten i rommet", "country": "Norway", "approxPeriod": "modern calque", "confidence": "medium" },
    "la": { "saying": "Res manifesta, de qua nemo loquitur", "literal": "An obvious matter about which no one speaks", "country": "Modern Latin", "approxPeriod": "constructed equivalent", "confidence": "low" },
    "zh": { "saying": "房间里的大象", "literal": "The elephant in the room", "country": "China", "approxPeriod": "modern calque", "confidence": "medium" },
    "ja": { "saying": "部屋の中の象", "literal": "The elephant in the room", "country": "Japan", "approxPeriod": "modern calque", "confidence": "medium" },
    "it": { "saying": "L’elefante nella stanza", "country": "Italy", "approxPeriod": "modern calque", "confidence": "medium" },
    "hi": { "saying": "कमरे में हाथी", "literal": "The elephant in the room", "country": "India", "approxPeriod": "modern calque", "confidence": "medium" },
    "el": { "saying": "Ο ελέφαντας στο δωμάτιο", "country": "Greece", "approxPeriod": "modern calque", "confidence": "medium" },
    "fr": { "saying": "L’éléphant dans la pièce", "country": "France", "approxPeriod": "modern calque", "confidence": "medium" },
    "ar": { "saying": "الفيل في الغرفة", "country": "Arab world", "approxPeriod": "modern calque", "confidence": "medium" }
  },
  "all-eggs-one-basket": {
    "de": { "saying": "Nicht alles auf eine Karte setzen", "literal": "Do not put everything on one card", "country": "Germany", "approxPeriod": "traditional / modern", "confidence": "high" },
    "es": { "saying": "No poner todos los huevos en la misma cesta", "country": "Spain / Latin America", "approxPeriod": "traditional / modern", "confidence": "high" },
    "no": { "saying": "Ikke legge alle eggene i én kurv", "country": "Norway", "approxPeriod": "traditional / modern", "confidence": "high" },
    "la": { "saying": "Noli omnia ova in uno corbe ponere", "literal": "Do not put all eggs in one basket", "country": "Modern Latin", "approxPeriod": "constructed equivalent", "confidence": "low" },
    "zh": { "saying": "不要把所有鸡蛋放在一个篮子里", "country": "China", "approxPeriod": "modern common equivalent", "confidence": "high" },
    "ja": { "saying": "一つの籠にすべての卵を盛るな", "literal": "Do not put all eggs in one basket", "country": "Japan", "approxPeriod": "modern common equivalent", "confidence": "medium" },
    "it": { "saying": "Non mettere tutte le uova nello stesso paniere", "country": "Italy", "approxPeriod": "traditional / modern", "confidence": "high" },
    "hi": { "saying": "सारे अंडे एक ही टोकरी में मत रखो", "country": "India", "approxPeriod": "modern common equivalent", "confidence": "medium" },
    "el": { "saying": "Μη βάζεις όλα τα αυγά στο ίδιο καλάθι", "country": "Greece", "approxPeriod": "modern common equivalent", "confidence": "high" },
    "fr": { "saying": "Il ne faut pas mettre tous ses œufs dans le même panier", "country": "France", "approxPeriod": "traditional", "confidence": "high" },
    "ar": { "saying": "لا تضع كل البيض في سلة واحدة", "country": "Arab world", "approxPeriod": "modern common equivalent", "confidence": "high" }
  },
  "better-late-than-never": {
    "de": {
      "saying": "Besser spät als nie",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Más vale tarde que nunca",
      "country": "Spain",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Bedre sent enn aldri",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Potius sero quam numquam",
      "country": "Ancient Rome / Europe",
      "approxPeriod": "classical idea, later proverb",
      "confidence": "medium"
    },
    "zh": {
      "saying": "亡羊补牢，未为迟也",
      "literal": "It is not too late to mend the pen after sheep are lost",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "遅くても、しないよりはまし",
      "country": "Japan",
      "approxPeriod": "modern equivalent",
      "confidence": "medium"
    },
    "it": {
      "saying": "Meglio tardi che mai",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "देर आए दुरुस्त आए",
      "literal": "Came late, came right",
      "country": "India",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "el": {
      "saying": "Κάλλιο αργά παρά ποτέ",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Mieux vaut tard que jamais",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "أن تأتي متأخرًا خير من ألا تأتي أبدًا",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    }
  },
  "actions-speak-louder": {
    "de": {
      "saying": "Taten sagen mehr als Worte",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Obras son amores, y no buenas razones",
      "literal": "Deeds are love, not fine words",
      "country": "Spain",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Handling sier mer enn ord",
      "country": "Norway",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "zh": {
      "saying": "事实胜于雄辩",
      "literal": "Facts beat eloquence",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "言うは易く行うは難し",
      "literal": "Saying is easy, doing is hard",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "I fatti contano più delle parole",
      "country": "Italy",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "कर्म शब्दों से अधिक बोलते हैं",
      "country": "India",
      "approxPeriod": "modern equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Οι πράξεις μιλούν δυνατότερα από τα λόγια",
      "country": "Greece",
      "approxPeriod": "modern equivalent",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Les actes valent mieux que les paroles",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الأفعال أبلغ من الأقوال",
      "country": "Arab world",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    }
  },
  "dont-judge-book": {
    "de": {
      "saying": "Man soll ein Buch nicht nach dem Einband beurteilen",
      "country": "Germany",
      "approxPeriod": "modern equivalent",
      "confidence": "medium"
    },
    "es": {
      "saying": "Las apariencias engañan",
      "literal": "Appearances deceive",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Man skal ikke skue hunden på hårene",
      "country": "Norway / Denmark",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "zh": {
      "saying": "人不可貌相",
      "literal": "People cannot be judged by appearance",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "人は見かけによらない",
      "literal": "People are not as they appear",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "L’apparenza inganna",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "ऊँची दुकान, फीका पकवान",
      "literal": "A grand shop, bland food",
      "country": "India",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "el": {
      "saying": "Τα φαινόμενα απατούν",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "L’habit ne fait pas le moine",
      "literal": "The robe does not make the monk",
      "country": "France",
      "approxPeriod": "medieval / traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "المظاهر خداعة",
      "country": "Arab world",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    }
  },
  "two-birds-one-stone": {
    "de": {
      "saying": "Zwei Fliegen mit einer Klappe schlagen",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Matar dos pájaros de un tiro",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Slå to fluer i én smekk",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "一箭双雕",
      "literal": "Two eagles with one arrow",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "一石二鳥",
      "literal": "Two birds with one stone",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Prendere due piccioni con una fava",
      "literal": "Catch two pigeons with one bean",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "एक तीर से दो निशाने",
      "literal": "Two targets with one arrow",
      "country": "India",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "el": {
      "saying": "Μ’ ένα σμπάρο δυο τρυγόνια",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Faire d’une pierre deux coups",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "ضرب عصفورين بحجر واحد",
      "country": "Arab world",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    }
  },
  "early-bird": {
    "de": {
      "saying": "Morgenstund hat Gold im Mund",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "A quien madruga, Dios le ayuda",
      "country": "Spain",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Morgenstund har gull i munn",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "早起的鸟儿有虫吃",
      "country": "China",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "ja": {
      "saying": "早起きは三文の徳",
      "literal": "Early rising is worth three mon",
      "country": "Japan",
      "approxPeriod": "Edo-period / traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Il mattino ha l’oro in bocca",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "जो जागत है सो पावत है",
      "literal": "The one who stays awake obtains",
      "country": "India",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "el": {
      "saying": "Το πρωινό πουλί πιάνει το σκουλήκι",
      "country": "Greece",
      "approxPeriod": "modern equivalent",
      "confidence": "medium"
    },
    "fr": {
      "saying": "L’avenir appartient à ceux qui se lèvent tôt",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "البركة في البكور",
      "literal": "Blessing is in early rising",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "strike-iron-hot": {
    "de": {
      "saying": "Man muss das Eisen schmieden, solange es heiß ist",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Hay que golpear el hierro mientras está caliente",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Man må smi mens jernet er varmt",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "趁热打铁",
      "literal": "Strike the iron while it is hot",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "鉄は熱いうちに打て",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Batti il ferro finché è caldo",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "लोहे को गरम रहते ही पीटो",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Χτύπα το σίδερο όσο είναι ζεστό",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Il faut battre le fer tant qu’il est chaud",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "اطرق الحديد وهو ساخن",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Ferrum dum calet cudendum est",
      "country": "Latin tradition",
      "approxPeriod": "medieval/Neo-Latin",
      "confidence": "high"
    }
  },
  "love-blind": {
    "de": {
      "saying": "Liebe macht blind",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "El amor es ciego",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Kjærlighet gjør blind",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Amor caecus est",
      "literal": "Love is blind",
      "country": "Ancient Rome / Europe",
      "approxPeriod": "classical idea / later Latin form",
      "confidence": "medium"
    },
    "zh": {
      "saying": "情人眼里出西施",
      "literal": "In a lover’s eyes appears Xi Shi",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "恋は盲目",
      "literal": "Love is blindness",
      "country": "Japan",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "it": {
      "saying": "L’amore è cieco",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "प्यार अंधा होता है",
      "literal": "Love is blind",
      "country": "India",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Ο έρωτας είναι τυφλός",
      "literal": "Love is blind",
      "country": "Greece",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "fr": {
      "saying": "L’amour est aveugle",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الحب أعمى",
      "literal": "Love is blind",
      "country": "Arab world",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    }
  },
  "practice-perfect": {
    "de": {
      "saying": "Übung macht den Meister",
      "country": "Germany",
      "approxPeriod": "early modern or older",
      "confidence": "high"
    },
    "es": {
      "saying": "La práctica hace al maestro",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Øvelse gjør mester",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Usus magister est optimus",
      "literal": "Practice is the best teacher",
      "country": "Ancient Rome",
      "approxPeriod": "classical/medieval Latin tradition",
      "confidence": "medium"
    },
    "zh": {
      "saying": "熟能生巧",
      "literal": "Skill comes from familiarity",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "習うより慣れよ",
      "literal": "Rather than study it, get used to it",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "La pratica rende perfetti",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "अभ्यास से ही निपुणता आती है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "el": {
      "saying": "Η εξάσκηση κάνει τον μάστορα",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "C’est en forgeant qu’on devient forgeron",
      "literal": "It is by forging that one becomes a blacksmith",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الممارسة تصنع الإتقان",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    }
  },
  "rome-not-built-day": {
    "de": {
      "saying": "Rom wurde nicht an einem Tag erbaut",
      "country": "Germany",
      "approxPeriod": "medieval/early modern Europe",
      "confidence": "high"
    },
    "es": {
      "saying": "Roma no se hizo en un día",
      "country": "Spain / Latin America",
      "approxPeriod": "medieval/early modern Europe",
      "confidence": "high"
    },
    "no": {
      "saying": "Roma ble ikke bygget på én dag",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Roma uno die non est condita",
      "country": "Neo-Latin / Europe",
      "approxPeriod": "modern Latin rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "罗马不是一天建成的",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "ローマは一日にして成らず",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "it": {
      "saying": "Roma non fu fatta in un giorno",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "रोम एक दिन में नहीं बना था",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Η Ρώμη δεν χτίστηκε σε μια μέρα",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Rome ne s’est pas faite en un jour",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "روما لم تُبنَ في يوم واحد",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    }
  },
  "no-smoke-without-fire": {
    "de": {
      "saying": "Wo Rauch ist, ist auch Feuer",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Cuando el río suena, agua lleva",
      "literal": "When the river makes noise, it carries water",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Ingen røyk uten ild",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Non est fumus absque igne",
      "country": "Medieval/Neo-Latin Europe",
      "approxPeriod": "medieval or later",
      "confidence": "high"
    },
    "zh": {
      "saying": "无风不起浪",
      "literal": "Without wind, waves do not rise",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "火のない所に煙は立たぬ",
      "literal": "Smoke does not rise where there is no fire",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Non c’è fumo senza arrosto",
      "literal": "There is no smoke without roast meat",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "जहाँ धुआँ है, वहाँ आग भी है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Όπου υπάρχει καπνός, υπάρχει και φωτιά",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Il n’y a pas de fumée sans feu",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "لا دخان بلا نار",
      "country": "Arab world",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    }
  },
  "old-habits-die-hard": {
    "de": {
      "saying": "Alte Gewohnheiten legt man schwer ab",
      "country": "Germany",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "es": {
      "saying": "Las viejas costumbres nunca mueren",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Gammel vane er vond å vende",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Difficile est consuetudinem mutare",
      "literal": "It is difficult to change habit",
      "country": "Latin tradition",
      "approxPeriod": "classical/medieval idea",
      "confidence": "medium"
    },
    "zh": {
      "saying": "积习难改",
      "literal": "Long-standing habits are hard to change",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "三つ子の魂百まで",
      "literal": "The soul of a three-year-old lasts to one hundred",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "it": {
      "saying": "Le vecchie abitudini sono dure a morire",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "पुरानी आदतें मुश्किल से जाती हैं",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "el": {
      "saying": "Οι παλιές συνήθειες δύσκολα κόβονται",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Chassez le naturel, il revient au galop",
      "literal": "Drive nature away, it returns at a gallop",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "من شبّ على شيء شاب عليه",
      "literal": "Who grows up with something grows old with it",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "too-many-cooks": {
    "de": {
      "saying": "Viele Köche verderben den Brei",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Muchas manos en un plato hacen mucho garabato",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "no": {
      "saying": "Dess flere kokker, dess mer søl",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Multitudo coquorum pulmentum corrumpit",
      "country": "Neo-Latin / Europe",
      "approxPeriod": "modern Latin rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "厨子多了烧坏汤",
      "literal": "Too many cooks spoil the soup",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "ja": {
      "saying": "船頭多くして船山に上る",
      "literal": "With too many captains, the boat climbs a mountain",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Troppi cuochi guastano la cucina",
      "country": "Italy",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "ज्यादा रसोइये खाना बिगाड़ देते हैं",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "el": {
      "saying": "Όπου λαλούν πολλοί κοκόροι, αργεί να ξημερώσει",
      "literal": "Where many roosters crow, dawn is delayed",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Trop de cuisiniers gâtent la sauce",
      "country": "France",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ar": {
      "saying": "كثرة الطباخين تفسد الطبخة",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    }
  },
  "look-before-leap": {
    "de": {
      "saying": "Erst denken, dann handeln",
      "country": "Germany",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "es": {
      "saying": "Antes de actuar, hay que pensar",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "no": {
      "saying": "Tenk før du handler",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Respice finem",
      "literal": "Consider the end",
      "country": "Latin tradition",
      "approxPeriod": "medieval proverb",
      "confidence": "medium"
    },
    "zh": {
      "saying": "三思而后行",
      "literal": "Think three times, then act",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "石橋を叩いて渡る",
      "literal": "Tap a stone bridge before crossing it",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Guarda prima di saltare",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "कूदने से पहले देखो",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "el": {
      "saying": "Πριν πηδήξεις, κοίτα",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Il faut tourner sept fois sa langue dans sa bouche avant de parler",
      "literal": "Turn your tongue seven times before speaking",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "ar": {
      "saying": "فكّر قبل أن تفعل",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    }
  },
  "many-hands-light-work": {
    "de": {
      "saying": "Viele Hände machen der Arbeit schnell ein Ende",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Muchas manos hacen el trabajo ligero",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "no": {
      "saying": "Mange hender gjør arbeidet lett",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Multae manus onus levant",
      "literal": "Many hands lighten the burden",
      "country": "Neo-Latin / Europe",
      "approxPeriod": "modern Latin rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "人多好办事",
      "literal": "With many people, things are easier to do",
      "country": "China",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "人手が多ければ仕事は楽になる",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "it": {
      "saying": "Molte mani rendono il lavoro leggero",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "hi": {
      "saying": "अनेक हाथ काम को हल्का कर देते हैं",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "el": {
      "saying": "Πολλά χέρια κάνουν τη δουλειά ελαφριά",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Plus on est de fous, plus on rit",
      "literal": "The more mad people, the more laughter",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "low",
      "note": "Natural but closer to “the more the merrier” than shared labor."
    },
    "ar": {
      "saying": "يد واحدة لا تصفق",
      "literal": "One hand does not clap",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "medium"
    }
  },
  "honesty-best-policy": {
    "de": {
      "saying": "Ehrlich währt am längsten",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "La honestidad es la mejor política",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Ærlighet varer lengst",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Honestas optima est ratio",
      "country": "Neo-Latin / Europe",
      "approxPeriod": "modern Latin rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "诚实为上策",
      "literal": "Honesty is the best strategy",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "正直は最善の策",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "it": {
      "saying": "L’onestà è la migliore politica",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "ईमानदारी सबसे अच्छी नीति है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Η ειλικρίνεια είναι η καλύτερη πολιτική",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "L’honnêteté est la meilleure politique",
      "country": "France",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ar": {
      "saying": "الصدق أفضل سياسة",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    }
  },
  "time-flies": {
    "de": {
      "saying": "Die Zeit fliegt",
      "country": "Germany",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "es": {
      "saying": "El tiempo vuela",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Tiden flyr",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Tempus fugit",
      "country": "Ancient Rome / Latin tradition",
      "approxPeriod": "classical/medieval Latin",
      "confidence": "high"
    },
    "zh": {
      "saying": "光阴似箭",
      "literal": "Time is like an arrow",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "光陰矢の如し",
      "literal": "Time is like an arrow",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Il tempo vola",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "समय उड़ता है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Ο χρόνος πετάει",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Le temps file",
      "country": "France",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "ar": {
      "saying": "الوقت يطير",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    }
  },
  "you-live-and-learn": {
    "de": {
      "saying": "Man lernt nie aus",
      "literal": "One never stops learning",
      "country": "Germany",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "es": {
      "saying": "Viviendo se aprende",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Man lærer så lenge man lever",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Vivendo discimus",
      "literal": "By living, we learn",
      "country": "Latin tradition",
      "approxPeriod": "Neo-Latin / maxim tradition",
      "confidence": "high"
    },
    "zh": {
      "saying": "活到老，学到老",
      "literal": "Live until old, learn until old",
      "country": "China",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "生きている限り学ぶ",
      "literal": "As long as one lives, one learns",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "it": {
      "saying": "Non si finisce mai di imparare",
      "literal": "One never finishes learning",
      "country": "Italy",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "इंसान जीते-जी सीखता रहता है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "el": {
      "saying": "Όσο ζεις μαθαίνεις",
      "country": "Greece",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "On apprend tous les jours",
      "country": "France",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ar": {
      "saying": "الإنسان يتعلم ما دام حياً",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    }
  },
  "easy-come-easy-go": {
    "de": {
      "saying": "Wie gewonnen, so zerronnen",
      "literal": "As won, so vanished",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Lo que fácil viene, fácil se va",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Lett kommet, lett gått",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Male parta male dilabuntur",
      "literal": "Ill-gotten things are badly lost",
      "country": "Ancient Rome / Latin tradition",
      "approxPeriod": "classical/medieval",
      "confidence": "medium"
    },
    "zh": {
      "saying": "来得容易，去得快",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "悪銭身につかず",
      "literal": "Bad money does not stay with you",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "it": {
      "saying": "Quel che viene facile, facile se ne va",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "आसानी से आया, आसानी से गया",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Εύκολα έρχονται, εύκολα φεύγουν",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Ce qui vient facilement s’en va facilement",
      "country": "France",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ar": {
      "saying": "ما يأتي بسهولة يذهب بسهولة",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    }
  },
  "no-pain-no-gain": {
    "de": {
      "saying": "Ohne Fleiß kein Preis",
      "literal": "No prize without diligence",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Sin esfuerzo no hay recompensa",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Uten innsats, ingen gevinst",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Per aspera ad astra",
      "literal": "Through hardships to the stars",
      "country": "Latin tradition",
      "approxPeriod": "classical/modern motto tradition",
      "confidence": "medium"
    },
    "zh": {
      "saying": "一分耕耘，一分收获",
      "literal": "One part plowing, one part harvest",
      "country": "China",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "苦労なくして得るものなし",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "it": {
      "saying": "Senza fatica non si ottiene nulla",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "मेहनत के बिना फल नहीं मिलता",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Χωρίς κόπο δεν υπάρχει κέρδος",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "On n’a rien sans rien",
      "literal": "You get nothing without giving something",
      "country": "France",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "ar": {
      "saying": "من جد وجد",
      "literal": "Who strives, finds/succeeds",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "silence-golden": {
    "de": {
      "saying": "Reden ist Silber, Schweigen ist Gold",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "El silencio es oro",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Tale er sølv, taushet er gull",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Silentium est aureum",
      "country": "Neo-Latin / Europe",
      "approxPeriod": "modern Latin rendering",
      "confidence": "high"
    },
    "zh": {
      "saying": "沉默是金",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "沈黙は金",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "it": {
      "saying": "Il silenzio è d’oro",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "मौन सोना है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Η σιωπή είναι χρυσός",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "La parole est d’argent, le silence est d’or",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الصمت من ذهب",
      "country": "Arab world",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    }
  },
  "knowledge-power": {
    "de": {
      "saying": "Wissen ist Macht",
      "country": "Germany",
      "approxPeriod": "early modern/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "El conocimiento es poder",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Kunnskap er makt",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Scientia potentia est",
      "country": "Europe / Latin tradition",
      "approxPeriod": "early modern, associated with Baconian tradition",
      "confidence": "high"
    },
    "zh": {
      "saying": "知识就是力量",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "知識は力なり",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "it": {
      "saying": "Sapere è potere",
      "country": "Italy",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "ज्ञान ही शक्ति है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Η γνώση είναι δύναμη",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Le savoir, c’est le pouvoir",
      "country": "France",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ar": {
      "saying": "المعرفة قوة",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    }
  },
  "all-that-glitters": {
    "de": {
      "saying": "Es ist nicht alles Gold, was glänzt",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "No es oro todo lo que reluce",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Alt som glimrer er ikke gull",
      "country": "Norway",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Non omne quod nitet aurum est",
      "country": "Medieval/Neo-Latin Europe",
      "approxPeriod": "medieval or later",
      "confidence": "high"
    },
    "zh": {
      "saying": "闪光的不都是金子",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "光るもの必ずしも金ならず",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "it": {
      "saying": "Non è tutto oro quel che luccica",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "हर चमकने वाली चीज़ सोना नहीं होती",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Δεν είναι χρυσός ό,τι λάμπει",
      "country": "Greece",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Tout ce qui brille n’est pas or",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "ليس كل ما يلمع ذهباً",
      "country": "Arab world",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    }
  },
  "blood-thicker-water": {
    "de": {
      "saying": "Blut ist dicker als Wasser",
      "country": "Germany",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "es": {
      "saying": "La sangre tira",
      "literal": "Blood pulls",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "no": {
      "saying": "Blod er tykkere enn vann",
      "country": "Norway",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Sanguis aqua densior est",
      "country": "Neo-Latin / Europe",
      "approxPeriod": "modern Latin rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "血浓于水",
      "literal": "Blood is thicker than water",
      "country": "China",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "ja": {
      "saying": "血は水よりも濃い",
      "country": "Japan",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "it": {
      "saying": "Il sangue non è acqua",
      "literal": "Blood is not water",
      "country": "Italy",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "hi": {
      "saying": "खून पानी से गाढ़ा होता है",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Το αίμα νερό δεν γίνεται",
      "literal": "Blood does not become water",
      "country": "Greece",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Les liens du sang sont les plus forts",
      "literal": "Blood ties are the strongest",
      "country": "France",
      "approxPeriod": "modern common usage",
      "confidence": "medium"
    },
    "ar": {
      "saying": "الدم لا يصير ماءً",
      "literal": "Blood does not become water",
      "country": "Arab world",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    }
  },
  "walls-have-ears": {
    "de": {
      "saying": "Wände haben Ohren",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Las paredes oyen",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Veggene har ører",
      "country": "Norway",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "la": {
      "saying": "Parietes aures habent",
      "country": "Latin tradition / Europe",
      "approxPeriod": "medieval/Neo-Latin",
      "confidence": "high"
    },
    "zh": {
      "saying": "隔墙有耳",
      "literal": "There are ears beyond the wall",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "壁に耳あり障子に目あり",
      "literal": "Walls have ears, sliding doors have eyes",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Anche i muri hanno orecchie",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "दीवारों के भी कान होते हैं",
      "country": "India",
      "approxPeriod": "modern common usage",
      "confidence": "high"
    },
    "el": {
      "saying": "Και οι τοίχοι έχουν αυτιά",
      "country": "Greece",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    },
    "fr": {
      "saying": "Les murs ont des oreilles",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "للجدران آذان",
      "country": "Arab world",
      "approxPeriod": "traditional/modern common usage",
      "confidence": "high"
    }
  },
  "necessity-invention": {
    "de": {
      "saying": "Not macht erfinderisch",
      "literal": "Need makes inventive",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "La necesidad es la madre de la invención",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "no": {
      "saying": "Nød lærer naken kvinne å spinne",
      "literal": "Need teaches a naked woman to spin",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Necessitas mater inventionis est",
      "literal": "Necessity is the mother of invention",
      "country": "Europe / Neo-Latin",
      "approxPeriod": "medieval / later proverb form",
      "confidence": "medium"
    },
    "zh": {
      "saying": "需要是发明之母",
      "literal": "Need is the mother of invention",
      "country": "China",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "ja": {
      "saying": "必要は発明の母",
      "literal": "Necessity is the mother of invention",
      "country": "Japan",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "it": {
      "saying": "La necessità aguzza l’ingegno",
      "literal": "Necessity sharpens ingenuity",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "आवश्यकता आविष्कार की जननी है",
      "literal": "Necessity is the mother of invention",
      "country": "India",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "el": {
      "saying": "Η ανάγκη είναι η μητέρα της εφεύρεσης",
      "literal": "Necessity is the mother of invention",
      "country": "Greece",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Nécessité est mère d’invention",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الحاجة أم الاختراع",
      "literal": "Need is the mother of invention",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    }
  },
  "where-theres-will": {
    "de": {
      "saying": "Wo ein Wille ist, ist auch ein Weg",
      "country": "Germany",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "es": {
      "saying": "Querer es poder",
      "literal": "To want is to be able",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Vil man, så får man det til",
      "literal": "If one wants, one manages it",
      "country": "Norway",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "la": {
      "saying": "Ubi voluntas, ibi via",
      "literal": "Where there is will, there is a way",
      "country": "Europe / Neo-Latin",
      "approxPeriod": "later proverb form",
      "confidence": "medium"
    },
    "zh": {
      "saying": "有志者事竟成",
      "literal": "Where there is resolve, the task is finally accomplished",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "精神一到何事か成らざらん",
      "literal": "If spirit is focused, what cannot be achieved?",
      "country": "Japan / Sino-Japanese tradition",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "it": {
      "saying": "Volere è potere",
      "literal": "To want is to be able",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "जहाँ चाह वहाँ राह",
      "literal": "Where there is desire, there is a path",
      "country": "India",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "el": {
      "saying": "Όπου υπάρχει θέληση, υπάρχει και τρόπος",
      "literal": "Where there is will, there is a way",
      "country": "Greece",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "fr": {
      "saying": "Vouloir, c’est pouvoir",
      "literal": "To want is to be able",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "من جد وجد",
      "literal": "Who strives, finds",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "nothing-ventured": {
    "de": {
      "saying": "Wer nicht wagt, der nicht gewinnt",
      "literal": "Who does not dare does not win",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Quien no arriesga, no gana",
      "literal": "Who does not risk does not win",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "no": {
      "saying": "Den som intet våger, intet vinner",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Qui non audet, non vincit",
      "literal": "Who does not dare does not win",
      "country": "Europe / Neo-Latin",
      "approxPeriod": "later proverb form",
      "confidence": "medium"
    },
    "zh": {
      "saying": "不入虎穴，焉得虎子",
      "literal": "If you do not enter the tiger’s den, how can you get its cub?",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "虎穴に入らずんば虎子を得ず",
      "literal": "Without entering the tiger’s den, one cannot get its cub",
      "country": "Japan / Sino-Japanese tradition",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Chi non risica non rosica",
      "literal": "Who does not risk does not nibble",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "जोखिम उठाए बिना लाभ नहीं",
      "literal": "Without taking risk, there is no gain",
      "country": "India",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Όποιος δεν ρισκάρει, δεν κερδίζει",
      "literal": "Who does not risk does not win",
      "country": "Greece",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "fr": {
      "saying": "Qui ne risque rien n’a rien",
      "literal": "Who risks nothing has nothing",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "من لا يخاطر لا يكسب",
      "literal": "Who does not risk does not gain",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    }
  },
  "empty-vessels": {
    "de": {
      "saying": "Leere Fässer klingen hohl",
      "literal": "Empty barrels sound hollow",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Mucho ruido y pocas nueces",
      "literal": "Much noise and few nuts",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Tomme tønner buldrer mest",
      "literal": "Empty barrels rumble most",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Vasa inania plurimum sonant",
      "literal": "Empty vessels sound the most",
      "country": "Medieval / European Latin",
      "approxPeriod": "traditional Latin proverb",
      "confidence": "high"
    },
    "zh": {
      "saying": "满瓶不响，半瓶晃荡",
      "literal": "A full bottle makes no sound; a half bottle sloshes",
      "country": "China",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "ja": {
      "saying": "空き樽は音が高い",
      "literal": "Empty barrels make a loud sound",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "La botte vuota fa più rumore",
      "literal": "The empty barrel makes more noise",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "अधजल गगरी छलकत जाए",
      "literal": "A half-filled pitcher keeps spilling",
      "country": "India",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "el": {
      "saying": "Τα άδεια βαρέλια κάνουν τον περισσότερο θόρυβο",
      "literal": "Empty barrels make the most noise",
      "country": "Greece",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Les tonneaux vides sont ceux qui font le plus de bruit",
      "literal": "Empty barrels make the most noise",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "البرميل الفارغ أكثر ضجيجًا",
      "literal": "The empty barrel is the noisiest",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    }
  },
  "slow-steady": {
    "de": {
      "saying": "Eile mit Weile",
      "literal": "Hurry with leisure",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Sin prisa pero sin pausa",
      "literal": "Without haste but without pause",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "no": {
      "saying": "Langsomt men sikkert",
      "literal": "Slowly but surely",
      "country": "Norway",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "la": {
      "saying": "Festina lente",
      "literal": "Make haste slowly",
      "country": "Ancient Rome",
      "approxPeriod": "classical",
      "confidence": "high"
    },
    "zh": {
      "saying": "稳扎稳打",
      "literal": "Advance steadily and surely",
      "country": "China",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "ja": {
      "saying": "急がば回れ",
      "literal": "If in a hurry, take the roundabout way",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Chi va piano va sano e va lontano",
      "literal": "Who goes slowly goes safely and far",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "धीरे-धीरे रे मना, धीरे सब कुछ होय",
      "literal": "Slowly, slowly, mind; everything happens slowly",
      "country": "India",
      "approxPeriod": "traditional / Kabir-associated",
      "confidence": "high"
    },
    "el": {
      "saying": "Σιγά σιγά γίνεται η αγουρίδα μέλι",
      "literal": "Little by little the sour grape becomes honey",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Qui va doucement va sûrement",
      "literal": "Who goes slowly goes surely",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "في التأني السلامة وفي العجلة الندامة",
      "literal": "In deliberation is safety, in haste is regret",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "every-beginning-hard": {
    "de": {
      "saying": "Aller Anfang ist schwer",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Todos los comienzos son difíciles",
      "literal": "All beginnings are difficult",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "no": {
      "saying": "All begynnelse er vanskelig",
      "country": "Norway",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "la": {
      "saying": "Omne initium difficile est",
      "literal": "Every beginning is difficult",
      "country": "Europe / Latin proverb tradition",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "zh": {
      "saying": "万事开头难",
      "literal": "In all things, the beginning is hard",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "始めは難しい",
      "literal": "The beginning is difficult",
      "country": "Japan",
      "approxPeriod": "modern direct equivalent",
      "confidence": "medium"
    },
    "it": {
      "saying": "Tutti gli inizi sono difficili",
      "literal": "All beginnings are difficult",
      "country": "Italy",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "hi": {
      "saying": "हर शुरुआत कठिन होती है",
      "literal": "Every beginning is difficult",
      "country": "India",
      "approxPeriod": "modern direct equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Κάθε αρχή και δύσκολη",
      "literal": "Every beginning is difficult",
      "country": "Greece",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "fr": {
      "saying": "Il n’y a que le premier pas qui coûte",
      "literal": "Only the first step costs",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "كل بداية صعبة",
      "literal": "Every beginning is difficult",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    }
  },
  "like-father-son": {
    "de": {
      "saying": "Wie der Vater, so der Sohn",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "De tal palo, tal astilla",
      "literal": "From such a stick, such a splinter",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Som far, så sønn",
      "country": "Norway",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "la": {
      "saying": "Qualis pater, talis filius",
      "literal": "As the father, so the son",
      "country": "Europe / Latin proverb tradition",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "有其父必有其子",
      "literal": "If there is such a father, there must be such a son",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "蛙の子は蛙",
      "literal": "A frog’s child is a frog",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Tale padre, tale figlio",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "जैसा बाप वैसा बेटा",
      "literal": "As the father, so the son",
      "country": "India",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "el": {
      "saying": "Το μήλο κάτω από τη μηλιά θα πέσει",
      "literal": "The apple will fall under the apple tree",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Tel père, tel fils",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "هذا الشبل من ذاك الأسد",
      "literal": "This cub is from that lion",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "out-of-sight": {
    "de": {
      "saying": "Aus den Augen, aus dem Sinn",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Ojos que no ven, corazón que no siente",
      "literal": "Eyes that do not see, heart that does not feel",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Ute av syne, ute av sinn",
      "country": "Norway",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "la": {
      "saying": "Ab oculis, ab animo",
      "literal": "Away from the eyes, away from the mind",
      "country": "Europe / Latin proverb tradition",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "zh": {
      "saying": "眼不见，心不烦",
      "literal": "If the eyes do not see, the heart is not troubled",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "去る者は日々に疎し",
      "literal": "Those who leave grow distant day by day",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Lontano dagli occhi, lontano dal cuore",
      "literal": "Far from the eyes, far from the heart",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "नज़र से दूर, दिल से दूर",
      "literal": "Far from sight, far from heart",
      "country": "India",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Μάτια που δεν βλέπονται γρήγορα λησμονιούνται",
      "literal": "Eyes that do not see each other are quickly forgotten",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Loin des yeux, loin du cœur",
      "literal": "Far from the eyes, far from the heart",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "البعيد عن العين بعيد عن القلب",
      "literal": "Far from the eye, far from the heart",
      "country": "Arab world",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    }
  },
  "one-swallow": {
    "de": {
      "saying": "Eine Schwalbe macht noch keinen Sommer",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Una golondrina no hace verano",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Én svale gjør ingen sommer",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Una hirundo non facit ver",
      "literal": "One swallow does not make spring",
      "country": "Ancient Rome / Europe",
      "approxPeriod": "classical / traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "一燕不成夏",
      "literal": "One swallow does not make a summer",
      "country": "China",
      "approxPeriod": "translated proverb / modern equivalent",
      "confidence": "medium"
    },
    "ja": {
      "saying": "一羽の燕が来ても夏にはならない",
      "literal": "One swallow coming does not make summer",
      "country": "Japan",
      "approxPeriod": "translated proverb / modern equivalent",
      "confidence": "medium"
    },
    "it": {
      "saying": "Una rondine non fa primavera",
      "literal": "One swallow does not make spring",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "एक फूल से माला नहीं बनती",
      "literal": "A garland is not made from one flower",
      "country": "India",
      "approxPeriod": "traditional equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Ένα χελιδόνι δεν φέρνει την άνοιξη",
      "literal": "One swallow does not bring spring",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Une hirondelle ne fait pas le printemps",
      "literal": "One swallow does not make spring",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "عصفور واحد لا يصنع الربيع",
      "literal": "One bird does not make spring",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    }
  },
  "opposites-attract": {
    "de": {
      "saying": "Gegensätze ziehen sich an",
      "country": "Germany",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "es": {
      "saying": "Los polos opuestos se atraen",
      "literal": "Opposite poles attract",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "no": {
      "saying": "Motsetninger tiltrekker hverandre",
      "country": "Norway",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "la": {
      "saying": "Contraria contrariis alliciuntur",
      "literal": "Opposites are attracted to opposites",
      "country": "Neo-Latin / coined direct equivalent",
      "approxPeriod": "modern direct equivalent",
      "confidence": "low"
    },
    "zh": {
      "saying": "异性相吸",
      "literal": "Opposites attract",
      "country": "China",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "ja": {
      "saying": "正反対の者同士は惹かれ合う",
      "literal": "Complete opposites are attracted to each other",
      "country": "Japan",
      "approxPeriod": "modern direct equivalent",
      "confidence": "medium"
    },
    "it": {
      "saying": "Gli opposti si attraggono",
      "country": "Italy",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "hi": {
      "saying": "विपरीत चीज़ें आकर्षित करती हैं",
      "literal": "Opposite things attract",
      "country": "India",
      "approxPeriod": "modern direct equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Τα ετερώνυμα έλκονται",
      "literal": "Unlike things attract",
      "country": "Greece",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "fr": {
      "saying": "Les opposés s’attirent",
      "country": "France",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "ar": {
      "saying": "الأضداد تتجاذب",
      "literal": "Opposites attract",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    }
  },
  "patience-virtue": {
    "de": {
      "saying": "Geduld ist eine Tugend",
      "country": "Germany",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "es": {
      "saying": "La paciencia es una virtud",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "no": {
      "saying": "Tålmodighet er en dyd",
      "country": "Norway",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "la": {
      "saying": "Patientia virtus est",
      "literal": "Patience is a virtue",
      "country": "Europe / Latin proverb tradition",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "忍耐是一种美德",
      "literal": "Patience is a virtue",
      "country": "China",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "ja": {
      "saying": "忍耐は美徳である",
      "literal": "Patience is a virtue",
      "country": "Japan",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "it": {
      "saying": "La pazienza è una virtù",
      "country": "Italy",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "hi": {
      "saying": "धैर्य एक गुण है",
      "literal": "Patience is a virtue",
      "country": "India",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Η υπομονή είναι αρετή",
      "literal": "Patience is a virtue",
      "country": "Greece",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "fr": {
      "saying": "La patience est une vertu",
      "country": "France",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "ar": {
      "saying": "الصبر فضيلة",
      "literal": "Patience is a virtue",
      "country": "Arab world",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    }
  },
  "truth-will-out": {
    "de": {
      "saying": "Die Wahrheit kommt ans Licht",
      "literal": "The truth comes to light",
      "country": "Germany",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "es": {
      "saying": "La verdad siempre sale a la luz",
      "literal": "The truth always comes to light",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "no": {
      "saying": "Sannheten kommer for en dag",
      "literal": "The truth comes one day",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Veritas temporis filia",
      "literal": "Truth is the daughter of time",
      "country": "Ancient Rome / Europe",
      "approxPeriod": "classical / traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "真相终会大白",
      "literal": "The truth will eventually become clear",
      "country": "China",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "ja": {
      "saying": "真実はいずれ明らかになる",
      "literal": "The truth will eventually become clear",
      "country": "Japan",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "it": {
      "saying": "La verità viene sempre a galla",
      "literal": "The truth always comes to the surface",
      "country": "Italy",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "hi": {
      "saying": "सत्य कभी छिपता नहीं",
      "literal": "Truth never stays hidden",
      "country": "India",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "el": {
      "saying": "Η αλήθεια βγαίνει πάντα στο φως",
      "literal": "The truth always comes to light",
      "country": "Greece",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "fr": {
      "saying": "La vérité finit toujours par éclater",
      "literal": "The truth always ends up bursting out",
      "country": "France",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "ar": {
      "saying": "الحقيقة تظهر في النهاية",
      "literal": "The truth appears in the end",
      "country": "Arab world",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    }
  },
  "haste-makes-waste": {
    "de": {
      "saying": "Eile mit Weile",
      "literal": "Hurry with leisure",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Vísteme despacio, que tengo prisa",
      "literal": "Dress me slowly, for I am in a hurry",
      "country": "Spain",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Hastverk er lastverk",
      "literal": "Hasty work is faulty work",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Festina lente",
      "literal": "Make haste slowly",
      "country": "Ancient Rome",
      "approxPeriod": "classical",
      "confidence": "high"
    },
    "zh": {
      "saying": "欲速则不达",
      "literal": "Wanting speed means not arriving",
      "country": "China",
      "approxPeriod": "classical / traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "急がば回れ",
      "literal": "If in a hurry, take the roundabout way",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "La gatta frettolosa fece i gattini ciechi",
      "literal": "The hasty cat gave birth to blind kittens",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "जल्दी का काम शैतान का",
      "literal": "Hasty work is the devil’s work",
      "country": "India",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "el": {
      "saying": "Όποιος βιάζεται σκοντάφτει",
      "literal": "Whoever hurries stumbles",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Il ne faut pas confondre vitesse et précipitation",
      "literal": "One must not confuse speed with haste",
      "country": "France",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "ar": {
      "saying": "في العجلة الندامة وفي التأني السلامة",
      "literal": "In haste is regret, in deliberation is safety",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "better-safe-than-sorry": {
    "de": {
      "saying": "Vorsicht ist besser als Nachsicht",
      "literal": "Caution is better than hindsight",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Más vale prevenir que curar",
      "literal": "Better to prevent than to cure",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Det er bedre å være føre var",
      "literal": "It is better to be prepared beforehand",
      "country": "Norway",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "la": {
      "saying": "Melius est praevenire quam curare",
      "literal": "It is better to prevent than to cure",
      "country": "Europe / Latin proverb tradition",
      "approxPeriod": "medieval / later proverb form",
      "confidence": "medium"
    },
    "zh": {
      "saying": "小心驶得万年船",
      "literal": "Carefulness sails a ship for ten thousand years",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "転ばぬ先の杖",
      "literal": "A cane before falling",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Meglio prevenire che curare",
      "literal": "Better to prevent than to cure",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "सावधानी हटी, दुर्घटना घटी",
      "literal": "When caution is gone, an accident happens",
      "country": "India",
      "approxPeriod": "modern common warning proverb",
      "confidence": "medium"
    },
    "el": {
      "saying": "Κάλλιο γαϊδουρόδενε παρά γαϊδουρογύρευε",
      "literal": "Better tie the donkey than search for it",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Mieux vaut prévenir que guérir",
      "literal": "Better to prevent than to cure",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الوقاية خير من العلاج",
      "literal": "Prevention is better than cure",
      "country": "Arab world",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    }
  },
  "birds-feather": {
    "de": {
      "saying": "Gleich und gleich gesellt sich gern",
      "literal": "Like and like gladly associate",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Dios los cría y ellos se juntan",
      "literal": "God raises them and they come together",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Like barn leker best",
      "literal": "Similar children play best",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Pares cum paribus facillime congregantur",
      "literal": "Equals most easily gather with equals",
      "country": "Europe / Latin proverb tradition",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "zh": {
      "saying": "物以类聚，人以群分",
      "literal": "Things gather by kind; people divide into groups",
      "country": "China",
      "approxPeriod": "classical / traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "類は友を呼ぶ",
      "literal": "Kinds call friends",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Chi si somiglia si piglia",
      "literal": "Those who resemble each other take each other",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "चोर-चोर मौसेरे भाई",
      "literal": "Thieves are like maternal cousins",
      "country": "India",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "el": {
      "saying": "Όμοιος ομοίω αεί πελάζει",
      "literal": "Like always approaches like",
      "country": "Ancient Greece / Greece",
      "approxPeriod": "classical / traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Qui se ressemble s’assemble",
      "literal": "Those who resemble each other assemble",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الطيور على أشكالها تقع",
      "literal": "Birds land with those of their own form",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "better-one-bird": {
    "de": {
      "saying": "Besser den Spatz in der Hand als die Taube auf dem Dach",
      "literal": "Better the sparrow in the hand than the dove on the roof",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Más vale pájaro en mano que ciento volando",
      "literal": "A bird in the hand is worth more than a hundred flying",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Bedre med én fugl i hånden enn ti på taket",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Melior est avis in manu quam duae in silva",
      "literal": "Better a bird in the hand than two in the forest",
      "country": "Europe / Latin proverb tradition",
      "approxPeriod": "traditional",
      "confidence": "medium"
    },
    "zh": {
      "saying": "双鸟在林，不如一鸟在手",
      "literal": "Two birds in the forest are not as good as one bird in the hand",
      "country": "China",
      "approxPeriod": "translated / modern common equivalent",
      "confidence": "medium"
    },
    "ja": {
      "saying": "明日の百より今日の五十",
      "literal": "Fifty today is better than a hundred tomorrow",
      "country": "Japan",
      "approxPeriod": "traditional equivalent",
      "confidence": "high"
    },
    "it": {
      "saying": "Meglio un uovo oggi che una gallina domani",
      "literal": "Better an egg today than a hen tomorrow",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "नौ नकद न तेरह उधार",
      "literal": "Nine in cash, not thirteen on credit",
      "country": "India",
      "approxPeriod": "traditional equivalent",
      "confidence": "high"
    },
    "el": {
      "saying": "Κάλλιο πέντε και στο χέρι παρά δέκα και καρτέρει",
      "literal": "Better five in the hand than ten and waiting",
      "country": "Greece",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Un tiens vaut mieux que deux tu l’auras",
      "literal": "One “you hold” is worth more than two “you will have”",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "عصفور في اليد خير من عشرة على الشجرة",
      "literal": "A bird in the hand is better than ten on the tree",
      "country": "Arab world",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    }
  },
  "after-rain-sun": {
    "de": {
      "saying": "Auf Regen folgt Sonnenschein",
      "literal": "Sunshine follows rain",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Después de la tormenta viene la calma",
      "literal": "After the storm comes calm",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Etter regn kommer solskinn",
      "country": "Norway",
      "approxPeriod": "traditional / modern common",
      "confidence": "high"
    },
    "la": {
      "saying": "Post nubila Phoebus",
      "literal": "After clouds, Phoebus/the sun",
      "country": "Europe / Latin motto tradition",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "雨过天晴",
      "literal": "After rain, the sky clears",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "雨降って地固まる",
      "literal": "After rain, the ground hardens",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "medium",
      "note": "Natural Japanese proverb, but emphasizes conflict/adversity leading to a stronger result."
    },
    "it": {
      "saying": "Dopo la pioggia viene il sereno",
      "literal": "After rain comes clear weather",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "हर अँधेरी रात के बाद सवेरा होता है",
      "literal": "After every dark night comes morning",
      "country": "India",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Μετά την μπόρα έρχεται η λιακάδα",
      "literal": "After the storm comes sunshine",
      "country": "Greece",
      "approxPeriod": "modern common equivalent",
      "confidence": "high"
    },
    "fr": {
      "saying": "Après la pluie, le beau temps",
      "literal": "After rain, good weather",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "بعد العسر يسر",
      "literal": "After hardship comes ease",
      "country": "Arab world",
      "approxPeriod": "Quranic / traditional",
      "confidence": "high"
    }
  },
  "pick-your-brain": {
    "de": {
      "saying": "Darf ich dich mal anzapfen?",
      "literal": "May I tap you?",
      "country": "Germany",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "es": {
      "saying": "¿Te puedo pedir consejo?",
      "country": "Spain/Latin America",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Kan jeg få lufte noe med deg?",
      "literal": "Can I air something with you?",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Consilium tuum petere possum?",
      "literal": "May I seek your advice?",
      "country": "Classical/Renaissance Latin",
      "approxPeriod": "classical-style modern rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "能向你请教一下吗？",
      "literal": "May I consult you a bit?",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "ちょっと相談に乗ってもらえる？",
      "literal": "Can you help me with a small consultation?",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Posso chiederti un parere?",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "क्या मैं आपसे थोड़ी सलाह ले सकता हूँ?",
      "literal": "May I take a little advice from you?",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Μπορώ να σου ζητήσω μια γνώμη;",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Je peux te demander ton avis ?",
      "country": "France",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "هل يمكنني أن آخذ رأيك؟",
      "literal": "May I take your opinion?",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "bone-to-pick": {
    "de": {
      "saying": "Ich habe ein Hühnchen mit dir zu rupfen",
      "literal": "I have a little chicken to pluck with you",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Tengo una cuenta pendiente contigo",
      "literal": "I have an unsettled account with you",
      "country": "Spain/Latin America",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Jeg har en høne å plukke med deg",
      "literal": "I have a hen to pluck with you",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Controversia mihi tecum est",
      "literal": "There is a dispute between me and you",
      "country": "Classical/Renaissance Latin",
      "approxPeriod": "classical-style modern rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "我有笔账要跟你算",
      "literal": "I have an account to settle with you",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "君に一言言いたいことがある",
      "literal": "I have something to say to you",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Ho un conto in sospeso con te",
      "literal": "I have an unsettled account with you",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "मुझे तुमसे एक शिकायत है",
      "literal": "I have a complaint with you",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Έχω προηγούμενα μαζί σου",
      "literal": "I have prior issues with you",
      "country": "Greece",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "fr": {
      "saying": "J’ai un compte à régler avec toi",
      "literal": "I have an account to settle with you",
      "country": "France",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "لديّ عتاب معك",
      "literal": "I have a reproach with you",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "break-the-ice": {
    "de": {
      "saying": "Das Eis brechen",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Romper el hielo",
      "country": "Spain/Latin America",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Bryte isen",
      "country": "Norway",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Glaciem frangere",
      "literal": "To break the ice",
      "country": "Neo-Latin",
      "approxPeriod": "modern rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "打破僵局",
      "literal": "Break the deadlock",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "場を和ませる",
      "literal": "Soften the atmosphere",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Rompere il ghiaccio",
      "country": "Italy",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "बर्फ तोड़ना",
      "literal": "Break the ice",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "medium"
    },
    "el": {
      "saying": "Σπάω τον πάγο",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Briser la glace",
      "country": "France",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "يكسر الجليد",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "spill-the-beans": {
    "de": {
      "saying": "Etwas ausplaudern",
      "literal": "To blurt something out",
      "country": "Germany",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Soltar la sopa",
      "literal": "To spill the soup",
      "country": "Latin America",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "no": {
      "saying": "Røpe hemmeligheten",
      "literal": "Reveal the secret",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Arcanum prodere",
      "literal": "To betray a secret",
      "country": "Classical/Renaissance Latin",
      "approxPeriod": "classical-style",
      "confidence": "medium"
    },
    "zh": {
      "saying": "说漏嘴",
      "literal": "Let it slip from the mouth",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "秘密を漏らす",
      "literal": "Leak a secret",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Spifferare tutto",
      "literal": "Blab everything",
      "country": "Italy",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "hi": {
      "saying": "राज़ खोल देना",
      "literal": "Open/reveal the secret",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Τα ξεφουρνίζω όλα",
      "literal": "Bake/blurt it all out",
      "country": "Greece",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "fr": {
      "saying": "Vendre la mèche",
      "literal": "Sell the fuse",
      "country": "France",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "يفشي السر",
      "literal": "Reveal the secret",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "bite-the-bullet": {
    "de": {
      "saying": "In den sauren Apfel beißen",
      "literal": "Bite into the sour apple",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Hacer de tripas corazón",
      "literal": "Make a heart out of guts",
      "country": "Spain/Latin America",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Bite tennene sammen",
      "literal": "Clench/bite the teeth together",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Dura ferre",
      "literal": "To bear hard things",
      "country": "Classical Latin",
      "approxPeriod": "classical",
      "confidence": "medium"
    },
    "zh": {
      "saying": "咬紧牙关",
      "literal": "Clench your teeth",
      "country": "China",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "歯を食いしばる",
      "literal": "Clench one’s teeth",
      "country": "Japan",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Stringere i denti",
      "literal": "Clench the teeth",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "दाँत भींचकर सहना",
      "literal": "Endure with clenched teeth",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Σφίγγω τα δόντια",
      "literal": "Clench the teeth",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Serrer les dents",
      "literal": "Clench the teeth",
      "country": "France",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "يعضّ على أسنانه",
      "literal": "Bite on one’s teeth",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "under-the-weather": {
    "de": {
      "saying": "Nicht ganz auf der Höhe sein",
      "literal": "Not quite at one’s height",
      "country": "Germany",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Estar pachucho",
      "literal": "To feel poorly",
      "country": "Spain",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "no": {
      "saying": "Være litt pjusk",
      "literal": "Be a bit poorly",
      "country": "Norway",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "la": {
      "saying": "Minus valere",
      "literal": "To be less well",
      "country": "Classical Latin",
      "approxPeriod": "classical",
      "confidence": "medium"
    },
    "zh": {
      "saying": "身体不舒服",
      "literal": "The body is not comfortable",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "体調が悪い",
      "literal": "Physical condition is bad",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Non sentirsi bene",
      "literal": "Not feel well",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "तबीयत ठीक नहीं है",
      "literal": "Health/mood is not right",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Είμαι αδιάθετος",
      "literal": "I am indisposed",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Être patraque",
      "literal": "To feel off/poorly",
      "country": "France",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "ar": {
      "saying": "لست على ما يرام",
      "literal": "I am not all right",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "blessing-in-disguise": {
    "de": {
      "saying": "Glück im Unglück",
      "literal": "Luck in misfortune",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "No hay mal que por bien no venga",
      "literal": "There is no bad from which good does not come",
      "country": "Spain/Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Et hell i uhell",
      "literal": "Luck in bad luck",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Malum quod in bonum vertitur",
      "literal": "An evil that turns into good",
      "country": "Neo-Latin",
      "approxPeriod": "modern rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "塞翁失马，焉知非福",
      "literal": "The old man lost his horse; who knows it is not a blessing?",
      "country": "China",
      "approxPeriod": "ancient/modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "怪我の功名",
      "literal": "Good result from an injury/mistake",
      "country": "Japan",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Non tutto il male viene per nuocere",
      "literal": "Not all bad comes to harm",
      "country": "Italy",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "छिपा हुआ वरदान",
      "literal": "A hidden blessing",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "medium"
    },
    "el": {
      "saying": "Ουδέν κακόν αμιγές καλού",
      "literal": "No bad thing is unmixed with good",
      "country": "Greece",
      "approxPeriod": "ancient/modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Un mal pour un bien",
      "literal": "A bad for a good",
      "country": "France",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "رب ضارة نافعة",
      "literal": "Perhaps a harmful thing is beneficial",
      "country": "Arab world",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    }
  },
  "good-samaritan": {
    "de": {
      "saying": "Ein barmherziger Samariter",
      "country": "Germany",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Un buen samaritano",
      "country": "Spain/Latin America",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "En barmhjertig samaritan",
      "country": "Norway",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Samaritanus misericors",
      "literal": "Merciful Samaritan",
      "country": "Christian Latin",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "好撒马利亚人",
      "country": "China",
      "approxPeriod": "biblical/modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "善きサマリア人",
      "country": "Japan",
      "approxPeriod": "biblical/modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Un buon samaritano",
      "country": "Italy",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "नेक सामरी",
      "literal": "Good Samaritan",
      "country": "India",
      "approxPeriod": "biblical/modern",
      "confidence": "medium"
    },
    "el": {
      "saying": "Καλός Σαμαρείτης",
      "country": "Greece",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Un bon Samaritain",
      "country": "France",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "السامري الصالح",
      "country": "Arab world",
      "approxPeriod": "biblical/modern",
      "confidence": "high"
    }
  },
  "forbidden-fruit": {
    "de": {
      "saying": "Verbotene Frucht",
      "country": "Germany",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Fruta prohibida",
      "country": "Spain/Latin America",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Forbuden frukt",
      "country": "Norway",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Fructus vetitus",
      "country": "Christian/Neo-Latin",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "禁果",
      "country": "China",
      "approxPeriod": "biblical/modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "禁断の果実",
      "country": "Japan",
      "approxPeriod": "biblical/modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Frutto proibito",
      "country": "Italy",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "वर्जित फल",
      "country": "India",
      "approxPeriod": "biblical/modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Απαγορευμένος καρπός",
      "country": "Greece",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "Fruit défendu",
      "country": "France",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "الفاكهة المحرمة",
      "country": "Arab world",
      "approxPeriod": "biblical/modern",
      "confidence": "high"
    }
  },
  "scapegoat": {
    "de": {
      "saying": "Sündenbock",
      "literal": "Sin goat",
      "country": "Germany",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Chivo expiatorio",
      "country": "Spain/Latin America",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Syndebukk",
      "literal": "Sin buck/goat",
      "country": "Norway",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Caper emissarius",
      "literal": "Sent-away goat",
      "country": "Biblical Latin",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "zh": {
      "saying": "替罪羊",
      "literal": "Substitute-sin sheep/goat",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "スケープゴート",
      "country": "Japan",
      "approxPeriod": "modern loanword",
      "confidence": "high"
    },
    "it": {
      "saying": "Capro espiatorio",
      "country": "Italy",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "बलि का बकरा",
      "literal": "Sacrificial goat",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Αποδιοπομπαίος τράγος",
      "country": "Greece",
      "approxPeriod": "ancient/biblical",
      "confidence": "high"
    },
    "fr": {
      "saying": "Bouc émissaire",
      "country": "France",
      "approxPeriod": "biblical/traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "كبش فداء",
      "literal": "Ram of sacrifice",
      "country": "Arab world",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    }
  },
  "skin-of-teeth": {
    "de": {
      "saying": "Mit Ach und Krach",
      "literal": "With ache and crash",
      "country": "Germany",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "es": {
      "saying": "Por los pelos",
      "literal": "By the hairs",
      "country": "Spain/Latin America",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "no": {
      "saying": "Med nød og neppe",
      "literal": "With distress and barely",
      "country": "Norway",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Vix evasi",
      "literal": "I barely escaped",
      "country": "Classical Latin",
      "approxPeriod": "classical-style",
      "confidence": "medium"
    },
    "zh": {
      "saying": "侥幸逃脱",
      "literal": "Escape by luck",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "間一髪で",
      "literal": "By a hair’s breadth",
      "country": "Japan",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Per un pelo",
      "literal": "By a hair",
      "country": "Italy",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "hi": {
      "saying": "बाल-बाल बचना",
      "literal": "Escape hair-hair/barely",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Στο τσακ",
      "literal": "At the last instant",
      "country": "Greece",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "fr": {
      "saying": "De justesse",
      "literal": "By narrowness",
      "country": "France",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "بشق الأنفس",
      "literal": "With the splitting of souls",
      "country": "Arab world",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    }
  },
  "no-brainer": {
    "de": {
      "saying": "Das ist ein Selbstläufer",
      "literal": "That runs by itself",
      "country": "Germany",
      "approxPeriod": "modern",
      "confidence": "medium"
    },
    "es": {
      "saying": "No hay que pensárselo",
      "literal": "One doesn’t need to think about it",
      "country": "Spain/Latin America",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Det er en selvfølge",
      "literal": "It is self-evident",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Res manifesta est",
      "literal": "The matter is obvious",
      "country": "Classical Latin",
      "approxPeriod": "classical-style",
      "confidence": "medium"
    },
    "zh": {
      "saying": "不用动脑子",
      "literal": "No need to use your brain",
      "country": "China",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "ja": {
      "saying": "考えるまでもない",
      "literal": "It does not even need thinking",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Non c’è da pensarci",
      "literal": "There’s nothing to think about",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "सोचने की बात ही नहीं है",
      "literal": "It is not even a matter for thinking",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Δεν θέλει σκέψη",
      "literal": "It doesn’t require thought",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Ça tombe sous le sens",
      "literal": "It falls under common sense",
      "country": "France",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "لا تحتاج إلى تفكير",
      "literal": "It does not need thinking",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "hangry": {
    "de": {
      "saying": "Hungrig und schlecht gelaunt",
      "literal": "Hungry and in a bad mood",
      "country": "Germany",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "es": {
      "saying": "De malas por hambre",
      "literal": "In a bad mood from hunger",
      "country": "Latin America",
      "approxPeriod": "modern colloquial",
      "confidence": "medium"
    },
    "no": {
      "saying": "Sulten og sint",
      "literal": "Hungry and angry",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Fame iratus",
      "literal": "Angered by hunger",
      "country": "Neo-Latin",
      "approxPeriod": "modern rendering",
      "confidence": "low"
    },
    "zh": {
      "saying": "饿到发火",
      "literal": "Hungry to the point of getting angry",
      "country": "China",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "ja": {
      "saying": "お腹が空いてイライラする",
      "literal": "Irritated because hungry",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Arrabbiato per la fame",
      "literal": "Angry from hunger",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "भूख से चिड़चिड़ा",
      "literal": "Irritable from hunger",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Πεινάω και είμαι στα νεύρα",
      "literal": "I’m hungry and on edge",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Irritable parce qu’on a faim",
      "literal": "Irritable because hungry",
      "country": "France",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "غاضب من الجوع",
      "literal": "Angry from hunger",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "ghost-someone": {
    "de": {
      "saying": "Jemanden ghosten",
      "country": "Germany",
      "approxPeriod": "modern digital slang",
      "confidence": "high"
    },
    "es": {
      "saying": "Hacer ghosting a alguien",
      "country": "Spain/Latin America",
      "approxPeriod": "modern digital slang",
      "confidence": "high"
    },
    "no": {
      "saying": "Å ghoste noen",
      "country": "Norway",
      "approxPeriod": "modern digital slang",
      "confidence": "high"
    },
    "la": {
      "saying": "Subito tacere atque evanescere",
      "literal": "Suddenly fall silent and disappear",
      "country": "Neo-Latin",
      "approxPeriod": "modern rendering",
      "confidence": "low"
    },
    "zh": {
      "saying": "玩消失",
      "literal": "Play disappearing",
      "country": "China",
      "approxPeriod": "modern digital slang",
      "confidence": "high"
    },
    "ja": {
      "saying": "音信不通になる",
      "literal": "Become unreachable/no-contact",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Ghostare qualcuno",
      "country": "Italy",
      "approxPeriod": "modern digital slang",
      "confidence": "high"
    },
    "hi": {
      "saying": "किसी को घोस्ट करना",
      "country": "India",
      "approxPeriod": "modern Hinglish/digital slang",
      "confidence": "high"
    },
    "el": {
      "saying": "Κάνω ghosting σε κάποιον",
      "country": "Greece",
      "approxPeriod": "modern digital slang",
      "confidence": "high"
    },
    "fr": {
      "saying": "Ghoster quelqu’un",
      "country": "France",
      "approxPeriod": "modern digital slang",
      "confidence": "high"
    },
    "ar": {
      "saying": "يسحب على شخص",
      "literal": "To pull away/ditch someone",
      "country": "Gulf/Arab colloquial",
      "approxPeriod": "modern digital slang",
      "confidence": "medium"
    }
  },
  "throw-shade": {
    "de": {
      "saying": "Einen Seitenhieb verteilen",
      "literal": "Deliver a side blow",
      "country": "Germany",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Lanzar indirectas",
      "literal": "Throw indirect remarks",
      "country": "Spain/Latin America",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Komme med stikk",
      "literal": "Come with jabs",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Oblique maledicere",
      "literal": "To speak ill indirectly",
      "country": "Neo-Latin",
      "approxPeriod": "modern rendering",
      "confidence": "low"
    },
    "zh": {
      "saying": "暗讽",
      "literal": "Mock/satirize covertly",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "嫌味を言う",
      "literal": "Say something snide",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Lanciare frecciatine",
      "literal": "Launch little arrows",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "ताना मारना",
      "literal": "Taunt/jibe",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Ρίχνω μπηχτές",
      "literal": "Throw digs",
      "country": "Greece",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "fr": {
      "saying": "Lancer des piques",
      "literal": "Throw barbs",
      "country": "France",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "يلقي تلميحات ساخرة",
      "literal": "Throw sarcastic hints",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "hold-your-horses": {
    "de": {
      "saying": "Immer langsam mit den jungen Pferden",
      "literal": "Always slowly with the young horses",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Para el carro",
      "literal": "Stop the cart",
      "country": "Spain",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "no": {
      "saying": "Ta det med ro",
      "literal": "Take it calmly",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Tene equos",
      "literal": "Hold the horses",
      "country": "Neo-Latin",
      "approxPeriod": "modern rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "别急",
      "literal": "Don’t rush",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "ちょっと待って",
      "literal": "Wait a moment",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Calma un attimo",
      "literal": "Calm down a moment",
      "country": "Italy",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "ज़रा ठहरो",
      "literal": "Wait a little",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Κράτα τα άλογα",
      "literal": "Hold the horses",
      "country": "Greece",
      "approxPeriod": "modern calque/colloquial",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Doucement les chevaux",
      "literal": "Gently, the horses",
      "country": "France",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "ar": {
      "saying": "تمهّل",
      "literal": "Slow down",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "let-cat-out-bag": {
    "de": {
      "saying": "Die Katze aus dem Sack lassen",
      "literal": "Let the cat out of the sack",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Descubrir el pastel",
      "literal": "Uncover the cake",
      "country": "Spain",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Slippe katten ut av sekken",
      "literal": "Let the cat out of the sack",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Arcanum patefacere",
      "literal": "To make a secret open",
      "country": "Classical/Renaissance Latin",
      "approxPeriod": "classical-style",
      "confidence": "medium"
    },
    "zh": {
      "saying": "露出马脚",
      "literal": "Show the horse’s foot",
      "country": "China",
      "approxPeriod": "traditional/modern",
      "confidence": "medium"
    },
    "ja": {
      "saying": "秘密をばらす",
      "literal": "Expose a secret",
      "country": "Japan",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "it": {
      "saying": "Vuotare il sacco",
      "literal": "Empty the sack",
      "country": "Italy",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "राज़ खोल देना",
      "literal": "Reveal the secret",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Βγάζω τη γάτα από το σακί",
      "literal": "Take the cat out of the sack",
      "country": "Greece",
      "approxPeriod": "modern calque",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Vendre la mèche",
      "literal": "Sell the fuse",
      "country": "France",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "يكشف السر",
      "literal": "Reveal the secret",
      "country": "Arab world",
      "approxPeriod": "modern",
      "confidence": "high"
    }
  },
  "bull-china-shop": {
    "de": {
      "saying": "Wie ein Elefant im Porzellanladen",
      "literal": "Like an elephant in a porcelain shop",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Como un elefante en una cacharrería",
      "literal": "Like an elephant in a crockery shop",
      "country": "Spain",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Som en elefant i en glassbutikk",
      "literal": "Like an elephant in a glass shop",
      "country": "Norway",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Vel bos in officina fictilium",
      "literal": "Like an ox/bull in a pottery shop",
      "country": "Neo-Latin",
      "approxPeriod": "modern rendering",
      "confidence": "medium"
    },
    "zh": {
      "saying": "笨手笨脚",
      "literal": "Clumsy hands and feet",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "medium"
    },
    "ja": {
      "saying": "ガラス細工の店に牛",
      "literal": "A cow/bull in a glasswork shop",
      "country": "Japan",
      "approxPeriod": "modern calque",
      "confidence": "medium"
    },
    "it": {
      "saying": "Come un elefante in una cristalleria",
      "literal": "Like an elephant in a crystal shop",
      "country": "Italy",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "हाथी की तरह काँच की दुकान में",
      "literal": "Like an elephant in a glass shop",
      "country": "India",
      "approxPeriod": "modern calque",
      "confidence": "medium"
    },
    "el": {
      "saying": "Σαν ελέφαντας σε υαλοπωλείο",
      "literal": "Like an elephant in a glass shop",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Comme un éléphant dans un magasin de porcelaine",
      "literal": "Like an elephant in a porcelain shop",
      "country": "France",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "كالفيل في محل خزف",
      "literal": "Like an elephant in a ceramics shop",
      "country": "Arab world",
      "approxPeriod": "modern calque",
      "confidence": "medium"
    }
  },
  "turn-blind-eye": {
    "de": {
      "saying": "Ein Auge zudrücken",
      "literal": "Press one eye shut",
      "country": "Germany",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Hacer la vista gorda",
      "literal": "Make the fat/thick sight",
      "country": "Spain/Latin America",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Se gjennom fingrene med noe",
      "literal": "Look through the fingers at something",
      "country": "Norway",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Oculos claudere",
      "literal": "To close the eyes",
      "country": "Classical Latin",
      "approxPeriod": "classical-style",
      "confidence": "medium"
    },
    "zh": {
      "saying": "睁一只眼闭一只眼",
      "literal": "Open one eye and close one eye",
      "country": "China",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "見て見ぬふりをする",
      "literal": "See and pretend not to see",
      "country": "Japan",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Chiudere un occhio",
      "literal": "Close one eye",
      "country": "Italy",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "आँख मूँद लेना",
      "literal": "Close one’s eyes",
      "country": "India",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Κάνω τα στραβά μάτια",
      "literal": "Make/do crooked eyes",
      "country": "Greece",
      "approxPeriod": "modern",
      "confidence": "high"
    },
    "fr": {
      "saying": "Fermer les yeux sur quelque chose",
      "literal": "Close one’s eyes to something",
      "country": "France",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "يغضّ الطرف",
      "literal": "Lower/avert the gaze",
      "country": "Arab world",
      "approxPeriod": "traditional/modern",
      "confidence": "high"
    }
  },
  "beat-around-bush": {
    "de": {
      "saying": "Um den heißen Brei herumreden",
      "literal": "Talk around the hot porridge",
      "country": "Germany",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Andarse por las ramas",
      "literal": "Go around in the branches",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Gå rundt grøten",
      "literal": "Walk around the porridge",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Rem non attingere",
      "literal": "Not touch the matter",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "constructed equivalent",
      "confidence": "low",
      "note": "Functional Latin phrasing rather than a well-known fixed proverb."
    },
    "zh": {
      "saying": "拐弯抹角",
      "literal": "Turn corners and wipe angles",
      "country": "China",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "遠回しに言う",
      "literal": "Say it in a roundabout way",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "it": {
      "saying": "Girarci intorno",
      "literal": "Go around it",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "घुमा-फिराकर बात करना",
      "literal": "Speak by turning it around",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "el": {
      "saying": "Το φέρνω γύρω γύρω",
      "literal": "Bring it round and round",
      "country": "Greece",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Tourner autour du pot",
      "literal": "Turn around the pot",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "يلف ويدور",
      "literal": "He twists and turns",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    }
  },
  "read-riot-act": {
    "de": {
      "saying": "Jemandem die Leviten lesen",
      "literal": "Read someone the Levites",
      "country": "Germany",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "es": {
      "saying": "Cantarle las cuarenta a alguien",
      "literal": "Sing someone the forty",
      "country": "Spain",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Lese noen teksten",
      "literal": "Read someone the text",
      "country": "Norway",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Acriter obiurgare",
      "literal": "Scold sharply",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical vocabulary",
      "confidence": "medium"
    },
    "zh": {
      "saying": "严厉训斥",
      "literal": "Sternly reprimand",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "ja": {
      "saying": "きつく叱る",
      "literal": "Scold harshly",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "it": {
      "saying": "Fare una ramanzina",
      "literal": "Give a lecture/scolding",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "कड़ी फटकार लगाना",
      "literal": "Give a stern rebuke",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "el": {
      "saying": "Τα ψάλλω σε κάποιον",
      "literal": "Chant/sing at someone",
      "country": "Greece",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "fr": {
      "saying": "Passer un savon à quelqu’un",
      "literal": "Pass someone a soap",
      "country": "France",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "ar": {
      "saying": "وبّخه بشدة",
      "literal": "He rebuked him severely",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    }
  },
  "horses-mouth": {
    "de": {
      "saying": "Aus erster Hand",
      "literal": "From first hand",
      "country": "Germany",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "es": {
      "saying": "De primera mano",
      "literal": "From first hand",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Fra første hånd",
      "literal": "From first hand",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Ex fonte ipso",
      "literal": "From the source itself",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical-style equivalent",
      "confidence": "medium"
    },
    "zh": {
      "saying": "第一手消息",
      "literal": "First-hand information",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ja": {
      "saying": "本人から直接聞く",
      "literal": "Hear it directly from the person concerned",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "it": {
      "saying": "Di prima mano",
      "literal": "From first hand",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "सीधे स्रोत से",
      "literal": "Directly from the source",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "el": {
      "saying": "Από πρώτο χέρι",
      "literal": "From first hand",
      "country": "Greece",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "fr": {
      "saying": "De première main",
      "literal": "From first hand",
      "country": "France",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ar": {
      "saying": "من المصدر مباشرة",
      "literal": "Directly from the source",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    }
  },
  "put-on-spot": {
    "de": {
      "saying": "Jemanden in die Zwickmühle bringen",
      "literal": "Put someone in a pinch-mill",
      "country": "Germany",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "es": {
      "saying": "Poner a alguien en un aprieto",
      "literal": "Put someone in a tight spot",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Sette noen på plass",
      "literal": "Put someone in place",
      "country": "Norway",
      "approxPeriod": "modern expression",
      "confidence": "medium",
      "note": "Can also mean correct/reprimand; context may need “sette noen i en vanskelig situasjon”."
    },
    "la": {
      "saying": "In angustias aliquem adducere",
      "literal": "Lead someone into difficulties",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical-style equivalent",
      "confidence": "medium"
    },
    "zh": {
      "saying": "让人下不来台",
      "literal": "Make someone unable to step down from the stage",
      "country": "China",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "ja": {
      "saying": "窮地に立たせる",
      "literal": "Make someone stand in a tight spot",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "it": {
      "saying": "Mettere qualcuno alle strette",
      "literal": "Put someone in tightness",
      "country": "Italy",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "hi": {
      "saying": "किसी को मुश्किल में डालना",
      "literal": "Put someone in difficulty",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "el": {
      "saying": "Φέρνω κάποιον σε δύσκολη θέση",
      "literal": "Bring someone into a difficult position",
      "country": "Greece",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "fr": {
      "saying": "Mettre quelqu’un sur la sellette",
      "literal": "Put someone on the little saddle/stand",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "وضعه في موقف محرج",
      "literal": "Put him in an embarrassing position",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    }
  },
  "wet-blanket": {
    "de": {
      "saying": "Spaßbremse",
      "literal": "Fun brake",
      "country": "Germany",
      "approxPeriod": "modern slang",
      "confidence": "high"
    },
    "es": {
      "saying": "Aguafiestas",
      "literal": "Party-waterer",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Gledesdreper",
      "literal": "Joy killer",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Gaudii exstinctor",
      "literal": "Extinguisher of joy",
      "country": "Modern Latin",
      "approxPeriod": "constructed equivalent",
      "confidence": "low"
    },
    "zh": {
      "saying": "扫兴的人",
      "literal": "A person who sweeps away enthusiasm",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ja": {
      "saying": "場をしらけさせる人",
      "literal": "A person who makes the mood go cold",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "it": {
      "saying": "Guastafeste",
      "literal": "Party spoiler",
      "country": "Italy",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "रंग में भंग डालने वाला",
      "literal": "One who spoils the colour/fun",
      "country": "India",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Ξενέρωτος",
      "literal": "One who kills the vibe",
      "country": "Greece",
      "approxPeriod": "modern colloquial",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Un rabat-joie",
      "literal": "Joy-beater-down",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "مفسد للفرحة",
      "literal": "Spoiler of joy",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    }
  },
  "mad-as-hatter": {
    "de": {
      "saying": "Nicht ganz dicht sein",
      "literal": "Not quite sealed",
      "country": "Germany",
      "approxPeriod": "modern colloquial",
      "confidence": "medium"
    },
    "es": {
      "saying": "Estar como una cabra",
      "literal": "Be like a goat",
      "country": "Spain",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Gal som en hattemaker",
      "literal": "Mad as a hatter",
      "country": "Norway",
      "approxPeriod": "English-influenced / modern",
      "confidence": "medium"
    },
    "la": {
      "saying": "Insanus velut pilearius",
      "literal": "Mad like a hatter",
      "country": "Modern Latin",
      "approxPeriod": "constructed equivalent",
      "confidence": "low"
    },
    "zh": {
      "saying": "疯疯癫癫",
      "literal": "Mad and deranged",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "ja": {
      "saying": "頭がおかしい",
      "literal": "The head is strange",
      "country": "Japan",
      "approxPeriod": "modern colloquial",
      "confidence": "medium"
    },
    "it": {
      "saying": "Matto come un cavallo",
      "literal": "Mad as a horse",
      "country": "Italy",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "hi": {
      "saying": "एकदम पागल",
      "literal": "Completely mad",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "el": {
      "saying": "Τρελός για δέσιμο",
      "literal": "Crazy enough to be tied up",
      "country": "Greece",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "fr": {
      "saying": "Fou à lier",
      "literal": "Mad enough to tie up",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "مجنون تمامًا",
      "literal": "Completely mad",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    }
  },
  "push-envelope": {
    "de": {
      "saying": "Grenzen ausloten",
      "literal": "Sound out limits",
      "country": "Germany",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "es": {
      "saying": "Llevar algo al límite",
      "literal": "Take something to the limit",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Tøye grensene",
      "literal": "Stretch the limits",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Fines experiri",
      "literal": "Test the boundaries",
      "country": "Modern Latin",
      "approxPeriod": "constructed equivalent",
      "confidence": "low"
    },
    "zh": {
      "saying": "挑战极限",
      "literal": "Challenge the limits",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ja": {
      "saying": "限界に挑む",
      "literal": "Challenge the limits",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "it": {
      "saying": "Spingersi oltre i limiti",
      "literal": "Push oneself beyond the limits",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "हदों को आगे बढ़ाना",
      "literal": "Push the limits forward",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "el": {
      "saying": "Δοκιμάζω τα όρια",
      "literal": "Test the limits",
      "country": "Greece",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "fr": {
      "saying": "Repousser les limites",
      "literal": "Push back the limits",
      "country": "France",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ar": {
      "saying": "يدفع الحدود إلى أبعد مدى",
      "literal": "Push the limits as far as possible",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    }
  },
  "cat-got-tongue": {
    "de": {
      "saying": "Hat es dir die Sprache verschlagen?",
      "literal": "Has it struck away your speech?",
      "country": "Germany",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "es": {
      "saying": "¿Te ha comido la lengua el gato?",
      "literal": "Has the cat eaten your tongue?",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Har du mistet munn og mæle?",
      "literal": "Have you lost mouth and speech?",
      "country": "Norway",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "la": {
      "saying": "Cur taces?",
      "literal": "Why are you silent?",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "functional equivalent",
      "confidence": "low"
    },
    "zh": {
      "saying": "你怎么哑巴了？",
      "literal": "How did you become mute?",
      "country": "China",
      "approxPeriod": "modern colloquial",
      "confidence": "medium"
    },
    "ja": {
      "saying": "どうして黙っているの？",
      "literal": "Why are you silent?",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "it": {
      "saying": "Ti ha mangiato la lingua il gatto?",
      "literal": "Has the cat eaten your tongue?",
      "country": "Italy",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "ज़ुबान क्यों बंद हो गई?",
      "literal": "Why has your tongue shut?",
      "country": "India",
      "approxPeriod": "modern colloquial",
      "confidence": "medium"
    },
    "el": {
      "saying": "Σου έφαγε η γάτα τη γλώσσα;",
      "literal": "Did the cat eat your tongue?",
      "country": "Greece",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "fr": {
      "saying": "Tu as perdu ta langue ?",
      "literal": "Have you lost your tongue?",
      "country": "France",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "ar": {
      "saying": "هل أكل القط لسانك؟",
      "literal": "Did the cat eat your tongue?",
      "country": "Arab world",
      "approxPeriod": "modern calque / common understood",
      "confidence": "medium"
    }
  },
  "hair-of-dog": {
    "de": {
      "saying": "Konterbier",
      "literal": "Counter-beer",
      "country": "Germany",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "es": {
      "saying": "Curar la resaca con más alcohol",
      "literal": "Cure the hangover with more alcohol",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "no": {
      "saying": "Reparasjonsøl",
      "literal": "Repair beer",
      "country": "Norway",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "la": {
      "saying": "Similia similibus curantur",
      "literal": "Like is cured by like",
      "country": "Europe / Latin medical tradition",
      "approxPeriod": "medieval / early modern",
      "confidence": "medium"
    },
    "zh": {
      "saying": "以酒解酒",
      "literal": "Use alcohol to relieve alcohol",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ja": {
      "saying": "迎え酒",
      "literal": "Welcoming alcohol",
      "country": "Japan",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Chiodo scaccia chiodo",
      "literal": "One nail drives out another",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "medium",
      "note": "General “same thing cures same thing”; context needed for hangover."
    },
    "hi": {
      "saying": "नशा उतारने के लिए फिर से पीना",
      "literal": "Drink again to bring down intoxication",
      "country": "India",
      "approxPeriod": "modern descriptive equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Το όμοιο θεραπεύει το όμοιο",
      "literal": "Like cures like",
      "country": "Greece",
      "approxPeriod": "traditional / medical phrase",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Soigner le mal par le mal",
      "literal": "Treat the illness with the illness",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "medium"
    },
    "ar": {
      "saying": "داوِها بالتي كانت هي الداء",
      "literal": "Treat it with that which was the illness",
      "country": "Arab world",
      "approxPeriod": "traditional poetic expression",
      "confidence": "high"
    }
  },
  "bury-hatchet": {
    "de": {
      "saying": "Das Kriegsbeil begraben",
      "literal": "Bury the war axe",
      "country": "Germany",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Enterrar el hacha de guerra",
      "literal": "Bury the war axe",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Begrave stridsøksen",
      "literal": "Bury the battle axe",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Bellum deponere",
      "literal": "Lay down war",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical-style equivalent",
      "confidence": "medium"
    },
    "zh": {
      "saying": "重归于好",
      "literal": "Return again to good relations",
      "country": "China",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "和解する",
      "literal": "Reconcile",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "it": {
      "saying": "Seppellire l’ascia di guerra",
      "literal": "Bury the war axe",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "दुश्मनी भुलाकर सुलह करना",
      "literal": "Forget enmity and reconcile",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "el": {
      "saying": "Θάβω το τσεκούρι του πολέμου",
      "literal": "Bury the axe of war",
      "country": "Greece",
      "approxPeriod": "modern calque / common understood",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Enterrer la hache de guerre",
      "literal": "Bury the war axe",
      "country": "France",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ar": {
      "saying": "يطوي صفحة الخلاف",
      "literal": "Fold the page of disagreement",
      "country": "Arab world",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    }
  },
  "go-belly-up": {
    "de": {
      "saying": "Pleitegehen",
      "literal": "Go broke",
      "country": "Germany",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "es": {
      "saying": "Irse a pique",
      "literal": "Go down/sink",
      "country": "Spain / Latin America",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "no": {
      "saying": "Gå konkurs",
      "literal": "Go bankrupt",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Corruere",
      "literal": "Collapse",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical vocabulary",
      "confidence": "medium"
    },
    "zh": {
      "saying": "倒闭",
      "literal": "Close down / go bankrupt",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ja": {
      "saying": "倒産する",
      "literal": "Go bankrupt",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "it": {
      "saying": "Andare a gambe all’aria",
      "literal": "Go legs in the air",
      "country": "Italy",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "hi": {
      "saying": "दिवालिया हो जाना",
      "literal": "Become bankrupt",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "el": {
      "saying": "Βάζω λουκέτο",
      "literal": "Put on a padlock",
      "country": "Greece",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "fr": {
      "saying": "Mettre la clé sous la porte",
      "literal": "Put the key under the door",
      "country": "France",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "ar": {
      "saying": "أفلس",
      "literal": "Went bankrupt",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    }
  },
  "silver-lining": {
    "de": {
      "saying": "Alles Schlechte hat auch sein Gutes",
      "literal": "Everything bad also has its good side",
      "country": "Germany",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "es": {
      "saying": "No hay mal que por bien no venga",
      "literal": "There is no bad from which good does not come",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "no": {
      "saying": "Det er ikke så galt at det ikke er godt for noe",
      "literal": "It is not so bad that it is not good for something",
      "country": "Norway",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "la": {
      "saying": "Malum aliquod semper boni affert",
      "literal": "Some evil always brings good",
      "country": "Modern Latin",
      "approxPeriod": "constructed equivalent",
      "confidence": "low"
    },
    "zh": {
      "saying": "塞翁失马，焉知非福",
      "literal": "The old man lost his horse; how know it is not fortune?",
      "country": "China",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ja": {
      "saying": "災い転じて福となす",
      "literal": "Turn disaster into fortune",
      "country": "Japan",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "it": {
      "saying": "Non tutto il male viene per nuocere",
      "literal": "Not all bad comes to harm",
      "country": "Italy",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "hi": {
      "saying": "हर बुराई में कुछ अच्छाई होती है",
      "literal": "There is some good in every bad thing",
      "country": "India",
      "approxPeriod": "modern common equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Ουδέν κακόν αμιγές καλού",
      "literal": "No bad thing is unmixed with good",
      "country": "Greece",
      "approxPeriod": "ancient / traditional",
      "confidence": "high"
    },
    "fr": {
      "saying": "À quelque chose malheur est bon",
      "literal": "Misfortune is good for something",
      "country": "France",
      "approxPeriod": "traditional",
      "confidence": "high"
    },
    "ar": {
      "saying": "رب ضارة نافعة",
      "literal": "Perhaps a harmful thing is beneficial",
      "country": "Arab world",
      "approxPeriod": "traditional",
      "confidence": "high"
    }
  },
  "bigwig": {
    "de": {
      "saying": "Ein hohes Tier",
      "literal": "A high animal",
      "country": "Germany",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "es": {
      "saying": "Un pez gordo",
      "literal": "A fat fish",
      "country": "Spain / Latin America",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "no": {
      "saying": "En stor kanon",
      "literal": "A big cannon",
      "country": "Norway",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "la": {
      "saying": "Vir potens",
      "literal": "A powerful man",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical vocabulary",
      "confidence": "medium"
    },
    "zh": {
      "saying": "大人物",
      "literal": "Big person",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ja": {
      "saying": "大物",
      "literal": "Big thing/person",
      "country": "Japan",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "it": {
      "saying": "Un pezzo grosso",
      "literal": "A big piece",
      "country": "Italy",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "hi": {
      "saying": "बड़ा आदमी",
      "literal": "Big person",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "el": {
      "saying": "Μεγάλο κεφάλι",
      "literal": "Big head",
      "country": "Greece",
      "approxPeriod": "modern idiom",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Une grosse légume",
      "literal": "A big vegetable",
      "country": "France",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "ar": {
      "saying": "شخصية كبيرة",
      "literal": "Big figure/personality",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    }
  },
  "earworm": {
    "de": {
      "saying": "Ohrwurm",
      "literal": "Earworm",
      "country": "Germany",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "es": {
      "saying": "Una canción pegadiza",
      "literal": "A sticky/catchy song",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Øreorm",
      "literal": "Earworm",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Canticum in mente haerens",
      "literal": "A song sticking in the mind",
      "country": "Modern Latin",
      "approxPeriod": "constructed equivalent",
      "confidence": "low"
    },
    "zh": {
      "saying": "洗脑神曲",
      "literal": "Brainwashing divine tune",
      "country": "China",
      "approxPeriod": "modern slang",
      "confidence": "medium"
    },
    "ja": {
      "saying": "イヤーワーム",
      "literal": "Earworm",
      "country": "Japan",
      "approxPeriod": "modern loanword",
      "confidence": "medium"
    },
    "it": {
      "saying": "Un tormentone",
      "literal": "A big torment",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "दिमाग में अटक जाने वाला गाना",
      "literal": "A song that gets stuck in the mind",
      "country": "India",
      "approxPeriod": "modern descriptive equivalent",
      "confidence": "medium"
    },
    "el": {
      "saying": "Κόλλησε στο μυαλό μου",
      "literal": "It stuck in my mind",
      "country": "Greece",
      "approxPeriod": "modern common expression",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Un ver d’oreille",
      "literal": "An earworm",
      "country": "France / Canada",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ar": {
      "saying": "أغنية عالقة في الرأس",
      "literal": "A song stuck in the head",
      "country": "Arab world",
      "approxPeriod": "modern descriptive equivalent",
      "confidence": "medium"
    }
  },
  "cold-feet": {
    "de": {
      "saying": "Kalte Füße bekommen",
      "literal": "Get cold feet",
      "country": "Germany",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "es": {
      "saying": "Echarse atrás",
      "literal": "Throw oneself back",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Få kalde føtter",
      "literal": "Get cold feet",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Animum demittere",
      "literal": "Let courage drop",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical-style equivalent",
      "confidence": "medium"
    },
    "zh": {
      "saying": "临阵退缩",
      "literal": "Shrink back before battle",
      "country": "China",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "怖気づく",
      "literal": "Become afraid / lose nerve",
      "country": "Japan",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "it": {
      "saying": "Tirarsi indietro",
      "literal": "Pull oneself back",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "हिम्मत हार जाना",
      "literal": "Lose courage",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "el": {
      "saying": "Κάνω πίσω",
      "literal": "Step back",
      "country": "Greece",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "fr": {
      "saying": "Se dégonfler",
      "literal": "Deflate oneself",
      "country": "France",
      "approxPeriod": "modern colloquial",
      "confidence": "high"
    },
    "ar": {
      "saying": "تراجع في اللحظة الأخيرة",
      "literal": "Backed out at the last moment",
      "country": "Arab world",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    }
  },
  "go-bananas": {
    "de": {
      "saying": "Ausflippen",
      "literal": "Flip out",
      "country": "Germany",
      "approxPeriod": "modern slang",
      "confidence": "high"
    },
    "es": {
      "saying": "Volverse loco",
      "literal": "Go crazy",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Gå bananas",
      "literal": "Go bananas",
      "country": "Norway",
      "approxPeriod": "modern slang / loan idiom",
      "confidence": "high"
    },
    "la": {
      "saying": "Insanire",
      "literal": "Go mad",
      "country": "Ancient Rome / modern Latin",
      "approxPeriod": "classical vocabulary",
      "confidence": "medium"
    },
    "zh": {
      "saying": "抓狂",
      "literal": "Grab madness",
      "country": "China",
      "approxPeriod": "modern slang",
      "confidence": "high"
    },
    "ja": {
      "saying": "キレる",
      "literal": "Snap",
      "country": "Japan",
      "approxPeriod": "modern slang",
      "confidence": "high"
    },
    "it": {
      "saying": "Andare fuori di testa",
      "literal": "Go out of one’s head",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "पागल हो जाना",
      "literal": "Go mad",
      "country": "India",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "el": {
      "saying": "Τα χάνω",
      "literal": "Lose it",
      "country": "Greece",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "fr": {
      "saying": "Péter les plombs",
      "literal": "Blow the fuses",
      "country": "France",
      "approxPeriod": "modern slang",
      "confidence": "high"
    },
    "ar": {
      "saying": "جن جنونه",
      "literal": "His madness went mad",
      "country": "Arab world",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    }
  },
  "armed-to-teeth": {
    "de": {
      "saying": "Bis an die Zähne bewaffnet",
      "literal": "Armed up to the teeth",
      "country": "Germany",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "es": {
      "saying": "Armado hasta los dientes",
      "literal": "Armed to the teeth",
      "country": "Spain / Latin America",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "no": {
      "saying": "Bevæpnet til tennene",
      "literal": "Armed to the teeth",
      "country": "Norway",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "la": {
      "saying": "Usque ad dentes armatus",
      "literal": "Armed all the way to the teeth",
      "country": "Modern Latin",
      "approxPeriod": "constructed / calque",
      "confidence": "low"
    },
    "zh": {
      "saying": "武装到牙齿",
      "literal": "Armed to the teeth",
      "country": "China",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "ja": {
      "saying": "歯の先まで武装している",
      "literal": "Armed to the tips of the teeth",
      "country": "Japan",
      "approxPeriod": "modern calque / understood",
      "confidence": "medium"
    },
    "it": {
      "saying": "Armato fino ai denti",
      "literal": "Armed to the teeth",
      "country": "Italy",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "hi": {
      "saying": "दाँतों तक हथियारबंद",
      "literal": "Armed up to the teeth",
      "country": "India",
      "approxPeriod": "modern calque / understood",
      "confidence": "medium"
    },
    "el": {
      "saying": "Οπλισμένος σαν αστακός",
      "literal": "Armed like a lobster",
      "country": "Greece",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "fr": {
      "saying": "Armé jusqu’aux dents",
      "literal": "Armed to the teeth",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "مدجج بالسلاح",
      "literal": "Heavily loaded with weapons",
      "country": "Arab world",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    }
  },
  "bite-dust": {
    "de": {
      "saying": "Ins Gras beißen",
      "literal": "Bite into the grass",
      "country": "Germany",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "es": {
      "saying": "Morder el polvo",
      "literal": "Bite the dust",
      "country": "Spain / Latin America",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "no": {
      "saying": "Bite i gresset",
      "literal": "Bite the grass",
      "country": "Norway",
      "approxPeriod": "modern idiom",
      "confidence": "high"
    },
    "la": {
      "saying": "Humum mordere",
      "literal": "Bite the ground",
      "country": "Ancient Rome / later Latin",
      "approxPeriod": "classical-style image",
      "confidence": "medium"
    },
    "zh": {
      "saying": "一败涂地",
      "literal": "Defeated and smeared on the ground",
      "country": "China",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ja": {
      "saying": "敗北を喫する",
      "literal": "Suffer defeat",
      "country": "Japan",
      "approxPeriod": "modern formal expression",
      "confidence": "medium"
    },
    "it": {
      "saying": "Mordere la polvere",
      "literal": "Bite the dust",
      "country": "Italy",
      "approxPeriod": "modern common expression",
      "confidence": "high"
    },
    "hi": {
      "saying": "धूल चाटना",
      "literal": "Lick the dust",
      "country": "India",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "el": {
      "saying": "Τρώω τη σκόνη",
      "literal": "Eat the dust",
      "country": "Greece",
      "approxPeriod": "modern idiom",
      "confidence": "medium"
    },
    "fr": {
      "saying": "Mordre la poussière",
      "literal": "Bite the dust",
      "country": "France",
      "approxPeriod": "traditional / modern",
      "confidence": "high"
    },
    "ar": {
      "saying": "خرّ صريعًا",
      "literal": "Fell struck down",
      "country": "Arab world",
      "approxPeriod": "traditional / literary",
      "confidence": "medium"
    }
  }
};

function makeOriginText(variant = {}) {
  return variant.origin || '';
}

function makeFallbackOriginText(variant = {}, fallbackExplanation = '') {
  return fallbackExplanation ? `Origin unknown. ${fallbackExplanation}` : 'Origin unknown.';
}

function migrateVariant(variant, fallbackExplanation = '') {
  if (!variant) return null;
  return {
    ...variant,
    explanation: variant.explanation || fallbackExplanation,
    origin: makeOriginText(variant),
    originMeta: {
      country: variant.country || 'Unknown',
      approxPeriod: variant.approxPeriod || 'traditional / unknown',
      confidence: variant.confidence || 'low',
      note: variant.note || ''
    }
  };
}

export const categories = [
  { key: 'all', label: 'All' },
  { key: 'life', label: 'Life' },
  { key: 'love', label: 'Love' },
  { key: 'work', label: 'Work' },
  { key: 'biblical', label: 'Biblical' },
  { key: 'slang', label: 'Slang' },
  { key: 'humour', label: 'Humour' }
];

export const languages = [
  { key: 'en', label: 'EN', name: 'English' },
  { key: 'de', label: 'DE', name: 'Deutsch' },
  { key: 'es', label: 'ES', name: 'Español' },
  { key: 'no', label: 'NO', name: 'Norsk' },
  { key: 'la', label: 'LA', name: 'Latin' },
  { key: 'zh', label: 'ZH', name: '中文' },
  { key: 'ja', label: 'JA', name: '日本語' },
  { key: 'it', label: 'IT', name: 'Italiano' },
  { key: 'hi', label: 'HI', name: 'Hindi' },
  { key: 'el', label: 'EL', name: 'Ελληνικά' },
  { key: 'fr', label: 'FR', name: 'Français' },
  { key: 'ar', label: 'AR', name: 'العربية' },
  { key: 'fo', label: 'FO', name: 'Føroyskt' }
];

const languageKeys = languages.map((item) => item.key);

export const proverbs = rawProverbs.map((proverb) => {
  const category = normalizeCategory(categoryById[proverb.id]);
  const meaning = {
    en: proverb.en?.explanation || '',
    fo: proverb.fo?.explanation || proverb.en?.explanation || ''
  };
  const cultural = languageEquivalentsById[proverb.id] || {};
  const variants = Object.fromEntries(
    languageKeys
      .map((language) => {
        const source = language === 'en' ? proverb.en : language === 'fo' ? proverb.fo : cultural[language];
        const variant = migrateVariant(source, meaning.en);
        return variant ? [language, variant] : null;
      })
      .filter(Boolean)
  );
  const englishVariant = variants.en || migrateVariant(proverb.en, meaning.en);
  const englishOrigin = englishVariant?.origin || makeFallbackOriginText(englishVariant || proverb.en, meaning.en);
  if (variants.en) variants.en.origin = englishOrigin;

  languageKeys.forEach((language) => {
    if (!variants[language] && englishVariant) variants[language] = { ...englishVariant, origin: englishOrigin };
    if (variants[language] && !variants[language].origin) variants[language].origin = englishOrigin;
  });

  return {
    ...proverb,
    category,
    meaning,
    variants
  };
});

export function getProverbVariant(proverb, language = 'en') {
  return proverb?.variants?.[language] || proverb?.variants?.en || proverb?.en || { saying: '', explanation: '' };
}

export function getLanguageLabel(language = 'en') {
  return languages.find((item) => item.key === language)?.label || 'EN';
}

export function getLanguageName(language = 'en') {
  return languages.find((item) => item.key === language)?.name || 'English';
}
