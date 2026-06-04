-- Add localized category labels and per-language story/origin text to Visay proverbs.
-- Recreates the table so story columns sit after each language description
-- and localized category columns sit at the end of the table.

begin;

lock table public.proverbs in access exclusive mode;

alter table public.proverbs rename to proverbs_before_category_story_columns;

drop index if exists public.proverbs_created_at_idx;
drop index if exists public.proverbs_category_idx;

create table public.proverbs (
  id text primary key default (gen_random_uuid())::text,
  category text,
  quote_en text,
  description_en text,
  story_en text,
  quote_da text,
  description_da text,
  story_da text,
  quote_de text,
  description_de text,
  story_de text,
  quote_es text,
  description_es text,
  story_es text,
  quote_no text,
  description_no text,
  story_no text,
  quote_la text,
  description_la text,
  story_la text,
  quote_it text,
  description_it text,
  story_it text,
  quote_fr text,
  description_fr text,
  story_fr text,
  quote_fo text,
  description_fo text,
  story_fo text,
  image_url text,
  favorite_count integer not null default 0 check (favorite_count >= 0),
  created_at timestamptz not null default now(),
  category_da text,
  category_de text,
  category_es text,
  category_no text,
  category_la text,
  category_it text,
  category_fr text,
  category_fo text
);

insert into public.proverbs (
  id,
  category,
  quote_en,
  description_en,
  story_en,
  quote_da,
  description_da,
  story_da,
  quote_de,
  description_de,
  story_de,
  quote_es,
  description_es,
  story_es,
  quote_no,
  description_no,
  story_no,
  quote_la,
  description_la,
  story_la,
  quote_it,
  description_it,
  story_it,
  quote_fr,
  description_fr,
  story_fr,
  quote_fo,
  description_fo,
  story_fo,
  image_url,
  favorite_count,
  created_at,
  category_da,
  category_de,
  category_es,
  category_no,
  category_la,
  category_it,
  category_fr,
  category_fo
)
select
    p.id,
    p.category,
    p.quote_en,
    p.description_en,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'From farming: hay had to be cut and dried in dry weather before rain spoiled it.'
      when E'falling-knife' then E'Used literally as kitchen safety advice and metaphorically in finance: do not try to catch a fast-falling price before it stabilizes.'
      when E'hell-keep-going' then E'Often attributed to Winston Churchill, but firm evidence for the exact wording is weak; best treated as a modern motivational saying.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Widely attributed to Benjamin Franklin, though often circulated without a precise primary source.'
      when E'opportunity-overalls' then E'Widely attributed to Thomas Edison, but the exact attribution is debated; similar sayings circulated before clear Edison attribution.'
      when E'perfect-enemy-good' then E'Commonly linked to Voltaire’s French line “Le mieux est l’ennemi du bien” from the 1700s.'
      when E'wish-in-one-hand' then E'A blunt folk saying, especially common in American English; exact origin unknown.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'From hunting, where people beat bushes to drive birds out before the real action began.'
      when E'horses-mouth' then E'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.'
      when E'turn-blind-eye' then E'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.'
      when E'not-my-circus' then E'A modern English version of Polish “Nie mój cyrk, nie moje małpy”. It is often called old, but seems to have spread widely quite recently.'
      when E'fool-experience' then E'Often misattributed to Mark Twain; best treated as a modern popular saying with uncertain authorship.'
      when E'grudge-poison' then E'Often misattributed to famous figures such as Nelson Mandela; similar resentment sayings spread through recovery and spiritual traditions.'
      when E'judge-insides-outsides' then E'A modern self-help and recovery saying; authorship is uncertain.'
      when E'hurt-people-hurt-people' then E'A modern therapeutic saying; exact authorship is uncertain.'
      when E'compassion-self-friend' then E'A modern self-compassion idea associated with contemporary psychology rather than a traditional proverb.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.'
      when E'cold-feet' then E'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.'
      when E'put-on-spot' then E'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.'
      when E'running-from-to-why' then E'Adapted from James Thurber’s fable “The Shore and the Sea” in “Further Fables for Our Time” (1956).'
      when E'go-bananas' then E'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.'
      when E'hangry' then E'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.'
      when E'ghost-someone' then E'Modern digital slang: the person disappears from contact like a ghost.'
      when E'throw-shade' then E'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.'
      when E'earworm' then E'The term comes through German and was later used for music that seems to crawl into your ear and stay there.'
      when E'hair-of-dog' then E'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.'
      when E'mad-as-hatter' then E'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.'
      when E'wet-blanket' then E'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.'
      when E'time-wounds-heels' then E'A pun on “time heals all wounds”; used in American humor by the 1930s and later often linked to Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.'
      when E'good-samaritan' then E'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.'
      when E'forbidden-fruit' then E'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.'
      when E'scapegoat' then E'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.'
      when E'skin-of-teeth' then E'From the Book of Job. It survives today as a vivid way to say “barely”.'
      when E'read-riot-act' then E'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.'
      when E'bury-hatchet' then E'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.'
      when E'bigwig' then E'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.'
      when E'armed-to-teeth' then E'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.'
      when E'silver-lining' then E'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.'
      when E'break-the-ice' then E'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.'
      when E'let-cat-out-bag' then E'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.'
      when E'bite-dust' then E'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.'
      else null
    end) as story_en,
    p.quote_da,
    p.description_da,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'Fra landbrug: hø skulle slås og tørres i godt vejr, før regn ødelagde det.'
      when E'falling-knife' then E'Udtrykket kendes både som praktisk køkkenråd og som finansielt billede: grib ikke en aktie eller situation i frit fald, før den er stabil.'
      when E'hell-keep-going' then E'Ofte tilskrevet Winston Churchill, men sikker dokumentation for den præcise formulering er svag; bedst behandlet som et moderne motivationsord.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Ofte tilskrevet Benjamin Franklin, men cirkulerer mange steder uden én entydig primærkilde.'
      when E'opportunity-overalls' then E'Ofte tilskrevet Thomas Edison, men den præcise tilskrivning er omdiskuteret; lignende formuleringer cirkulerede tidligere.'
      when E'perfect-enemy-good' then E'Knyttes ofte til Voltaires franske formulering “Le mieux est l’ennemi du bien” fra 1700-tallet.'
      when E'wish-in-one-hand' then E'Et groft folkeligt ordsprog, især kendt fra amerikansk engelsk, med ukendt præcis oprindelse.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'Fra luftfart, hvor “flight envelope” beskriver de grænser, et fly sikkert kan operere indenfor.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'Udtrykket forbindes med jagt, hvor man slog i buske for at få fugle frem, før selve jagten kunne begynde.'
      when E'horses-mouth' then E'Kommer fra hestevæddeløb, hvor folk ville have information tæt på hesten selv — helt ind i munden — før de satsede penge.'
      when E'turn-blind-eye' then E'Forbindes ofte med admiral Horatio Nelson, der efter sigende ignorerede et signal ved at sætte kikkerten for sit blinde øje.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'Oprindelsen er usikker. En teori forbinder “cat” med pisken cat-o’-nine-tails, som kunne efterlade folk ude af stand til at tale.'
      when E'not-my-circus' then E'En moderne engelsk version af polsk “Nie mój cyrk, nie moje małpy”. Den kaldes ofte gammel, men ser ud til især at være blevet udbredt i nyere tid.'
      when E'fool-experience' then E'Ofte fejlagtigt tilskrevet Mark Twain; bør behandles som et moderne, populært ordsprog med usikker ophavsmand.'
      when E'grudge-poison' then E'Ofte fejlagtigt tilskrevet kendte personer som Nelson Mandela; lignende formuleringer findes i recovery- og spirituelle traditioner.'
      when E'judge-insides-outsides' then E'Et moderne selvhjælps- og recovery-ordsprog med usikker ophavsmand.'
      when E'hurt-people-hurt-people' then E'Et moderne terapeutisk ordsprog med usikker ophavsmand.'
      when E'compassion-self-friend' then E'En moderne selvomsorgstanke forbundet med nutidig psykologi snarere end et traditionelt ordsprog.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Udtrykket knyttes ofte til soldater, der bed i en kugle under operationer før moderne bedøvelse. Historien er omdiskuteret.'
      when E'cold-feet' then E'Forbindes ofte med soldater, der bogstaveligt ikke kunne gå frem, fordi deres fødder var frosne eller dårligt beskyttet.'
      when E'put-on-spot' then E'Oprindelsen er omdiskuteret, men udtrykket handler om at blive udpeget og sat under pres.'
      when E'running-from-to-why' then E'Bearbejdet fra James Thurbers fabel “The Shore and the Sea” i “Further Fables for Our Time” fra 1956.'
      when E'go-bananas' then E'Et moderne slangudtryk fra 1900-tallet, beslægtet med “go ape”, altså at opføre sig vildt.'
      when E'hangry' then E'Et moderne slangord sammensat af “hungry” og “angry”, især udbredt online og i hverdagssprog.'
      when E'ghost-someone' then E'Moderne digital slang: personen forsvinder fra kontakten som et spøgelse.'
      when E'throw-shade' then E'Udbredt gennem Black og LGBTQ+ ballroom-kultur og senere gennem medier og sociale platforme.'
      when E'earworm' then E'Udtrykket kommer via tysk og blev senere brugt om musik, der føles som om den kravler ind i øret og bliver der.'
      when E'hair-of-dog' then E'Fra en gammel tro på, at et hundebid kunne behandles med hår fra den samme hund — en kur lavet af årsagen.'
      when E'mad-as-hatter' then E'Hattemagere brugte engang kviksølv i filtproduktion, og kviksølvforgiftning kunne give rystelser, uro og mærkelig adfærd.'
      when E'wet-blanket' then E'Et vådt tæppe kan slukke ild. Ilden blev et billede på glæde, og det våde tæppe blev personen, der slukker den.'
      when E'time-wounds-heels' then E'Et ordspil på “time heals all wounds”. Det findes i amerikansk humor i 1930’erne og forbindes senere ofte med Groucho Marx.'
      when E'under-the-weather' then E'Udtrykket forbindes ofte med søfolk, der gik under dæk — væk fra vejret — når de blev søsyge.'
      when E'bull-china-shop' then E'Billedet er enkelt: et stort dyr blandt skrøbelige ting. Derfor bruges det om en person, der ødelægger eller forstyrrer uden finesse.'
      when E'good-samaritan' then E'Fra Jesu lignelse i Lukasevangeliet, hvor en samaritaner hjælper en såret rejsende.'
      when E'forbidden-fruit' then E'Fra fortællingen om Adam og Eva i Første Mosebog. Bibelen siger ikke, at frugten var et æble.'
      when E'scapegoat' then E'Fra Tredje Mosebog, hvor en buk symbolsk bar folkets synder ud i ørkenen.'
      when E'skin-of-teeth' then E'Fra Jobs Bog i Bibelen. Udtrykket lever videre som en stærk måde at sige “kun lige”.'
      when E'read-riot-act' then E'Fra den britiske Riot Act fra 1714, som blev læst højt for ulovlige forsamlinger, før myndighederne kunne gribe ind.'
      when E'bury-hatchet' then E'Forbindes ofte med nordamerikanske fredsskikke, hvor våben blev begravet som tegn på, at kampen var slut.'
      when E'bigwig' then E'I 1700-tallet bar rige og magtfulde mænd ofte store parykker. Jo større paryk, jo vigtigere virkede personen.'
      when E'armed-to-teeth' then E'Forbindes ofte med pirater, der bar så mange våben som muligt, endda knive mellem tænderne.'
      when E'silver-lining' then E'Billedet kommer fra sollys langs kanten af en mørk sky og blev berømt brugt af digteren John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'Det engelske udtryk betyder bogstaveligt at “plukke” i nogens hjerne, men bruges uformelt og ikke voldsomt.'
      when E'bone-to-pick' then E'Udtrykket forbindes ofte med to hunde, der slås om det samme ben — altså noget der skal afklares.'
      when E'break-the-ice' then E'Skibe måtte bryde is for at åbne en vej. Senere blev det brugt om at åbne en samtale.'
      when E'let-cat-out-bag' then E'Forbindes ofte med gamle markeder, hvor en uærlig sælger kunne bytte en gris i en sæk ud med en kat. Når sækken blev åbnet, blev bedraget afsløret.'
      when E'bite-dust' then E'Udtrykket blev gjort populært af westerns, men billedet af fjender der ender i støvet er langt ældre, også i bibelsk sprog.'
      else null
    end) as story_da,
    p.quote_de,
    p.description_de,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'From farming: hay had to be cut and dried in dry weather before rain spoiled it.'
      when E'falling-knife' then E'Used literally as kitchen safety advice and metaphorically in finance: do not try to catch a fast-falling price before it stabilizes.'
      when E'hell-keep-going' then E'Often attributed to Winston Churchill, but firm evidence for the exact wording is weak; best treated as a modern motivational saying.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Widely attributed to Benjamin Franklin, though often circulated without a precise primary source.'
      when E'opportunity-overalls' then E'Widely attributed to Thomas Edison, but the exact attribution is debated; similar sayings circulated before clear Edison attribution.'
      when E'perfect-enemy-good' then E'Commonly linked to Voltaire’s French line “Le mieux est l’ennemi du bien” from the 1700s.'
      when E'wish-in-one-hand' then E'A blunt folk saying, especially common in American English; exact origin unknown.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'From hunting, where people beat bushes to drive birds out before the real action began.'
      when E'horses-mouth' then E'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.'
      when E'turn-blind-eye' then E'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.'
      when E'not-my-circus' then E'A modern English version of Polish “Nie mój cyrk, nie moje małpy”. It is often called old, but seems to have spread widely quite recently.'
      when E'fool-experience' then E'Often misattributed to Mark Twain; best treated as a modern popular saying with uncertain authorship.'
      when E'grudge-poison' then E'Often misattributed to famous figures such as Nelson Mandela; similar resentment sayings spread through recovery and spiritual traditions.'
      when E'judge-insides-outsides' then E'A modern self-help and recovery saying; authorship is uncertain.'
      when E'hurt-people-hurt-people' then E'A modern therapeutic saying; exact authorship is uncertain.'
      when E'compassion-self-friend' then E'A modern self-compassion idea associated with contemporary psychology rather than a traditional proverb.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.'
      when E'cold-feet' then E'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.'
      when E'put-on-spot' then E'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.'
      when E'running-from-to-why' then E'Adapted from James Thurber’s fable “The Shore and the Sea” in “Further Fables for Our Time” (1956).'
      when E'go-bananas' then E'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.'
      when E'hangry' then E'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.'
      when E'ghost-someone' then E'Modern digital slang: the person disappears from contact like a ghost.'
      when E'throw-shade' then E'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.'
      when E'earworm' then E'The term comes through German and was later used for music that seems to crawl into your ear and stay there.'
      when E'hair-of-dog' then E'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.'
      when E'mad-as-hatter' then E'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.'
      when E'wet-blanket' then E'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.'
      when E'time-wounds-heels' then E'A pun on “time heals all wounds”; used in American humor by the 1930s and later often linked to Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.'
      when E'good-samaritan' then E'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.'
      when E'forbidden-fruit' then E'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.'
      when E'scapegoat' then E'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.'
      when E'skin-of-teeth' then E'From the Book of Job. It survives today as a vivid way to say “barely”.'
      when E'read-riot-act' then E'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.'
      when E'bury-hatchet' then E'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.'
      when E'bigwig' then E'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.'
      when E'armed-to-teeth' then E'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.'
      when E'silver-lining' then E'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.'
      when E'break-the-ice' then E'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.'
      when E'let-cat-out-bag' then E'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.'
      when E'bite-dust' then E'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.'
      else null
    end) as story_de,
    p.quote_es,
    p.description_es,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'From farming: hay had to be cut and dried in dry weather before rain spoiled it.'
      when E'falling-knife' then E'Used literally as kitchen safety advice and metaphorically in finance: do not try to catch a fast-falling price before it stabilizes.'
      when E'hell-keep-going' then E'Often attributed to Winston Churchill, but firm evidence for the exact wording is weak; best treated as a modern motivational saying.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Widely attributed to Benjamin Franklin, though often circulated without a precise primary source.'
      when E'opportunity-overalls' then E'Widely attributed to Thomas Edison, but the exact attribution is debated; similar sayings circulated before clear Edison attribution.'
      when E'perfect-enemy-good' then E'Commonly linked to Voltaire’s French line “Le mieux est l’ennemi du bien” from the 1700s.'
      when E'wish-in-one-hand' then E'A blunt folk saying, especially common in American English; exact origin unknown.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'From hunting, where people beat bushes to drive birds out before the real action began.'
      when E'horses-mouth' then E'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.'
      when E'turn-blind-eye' then E'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.'
      when E'not-my-circus' then E'A modern English version of Polish “Nie mój cyrk, nie moje małpy”. It is often called old, but seems to have spread widely quite recently.'
      when E'fool-experience' then E'Often misattributed to Mark Twain; best treated as a modern popular saying with uncertain authorship.'
      when E'grudge-poison' then E'Often misattributed to famous figures such as Nelson Mandela; similar resentment sayings spread through recovery and spiritual traditions.'
      when E'judge-insides-outsides' then E'A modern self-help and recovery saying; authorship is uncertain.'
      when E'hurt-people-hurt-people' then E'A modern therapeutic saying; exact authorship is uncertain.'
      when E'compassion-self-friend' then E'A modern self-compassion idea associated with contemporary psychology rather than a traditional proverb.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.'
      when E'cold-feet' then E'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.'
      when E'put-on-spot' then E'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.'
      when E'running-from-to-why' then E'Adapted from James Thurber’s fable “The Shore and the Sea” in “Further Fables for Our Time” (1956).'
      when E'go-bananas' then E'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.'
      when E'hangry' then E'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.'
      when E'ghost-someone' then E'Modern digital slang: the person disappears from contact like a ghost.'
      when E'throw-shade' then E'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.'
      when E'earworm' then E'The term comes through German and was later used for music that seems to crawl into your ear and stay there.'
      when E'hair-of-dog' then E'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.'
      when E'mad-as-hatter' then E'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.'
      when E'wet-blanket' then E'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.'
      when E'time-wounds-heels' then E'A pun on “time heals all wounds”; used in American humor by the 1930s and later often linked to Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.'
      when E'good-samaritan' then E'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.'
      when E'forbidden-fruit' then E'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.'
      when E'scapegoat' then E'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.'
      when E'skin-of-teeth' then E'From the Book of Job. It survives today as a vivid way to say “barely”.'
      when E'read-riot-act' then E'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.'
      when E'bury-hatchet' then E'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.'
      when E'bigwig' then E'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.'
      when E'armed-to-teeth' then E'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.'
      when E'silver-lining' then E'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.'
      when E'break-the-ice' then E'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.'
      when E'let-cat-out-bag' then E'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.'
      when E'bite-dust' then E'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.'
      else null
    end) as story_es,
    p.quote_no,
    p.description_no,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'From farming: hay had to be cut and dried in dry weather before rain spoiled it.'
      when E'falling-knife' then E'Used literally as kitchen safety advice and metaphorically in finance: do not try to catch a fast-falling price before it stabilizes.'
      when E'hell-keep-going' then E'Often attributed to Winston Churchill, but firm evidence for the exact wording is weak; best treated as a modern motivational saying.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Widely attributed to Benjamin Franklin, though often circulated without a precise primary source.'
      when E'opportunity-overalls' then E'Widely attributed to Thomas Edison, but the exact attribution is debated; similar sayings circulated before clear Edison attribution.'
      when E'perfect-enemy-good' then E'Commonly linked to Voltaire’s French line “Le mieux est l’ennemi du bien” from the 1700s.'
      when E'wish-in-one-hand' then E'A blunt folk saying, especially common in American English; exact origin unknown.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'From hunting, where people beat bushes to drive birds out before the real action began.'
      when E'horses-mouth' then E'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.'
      when E'turn-blind-eye' then E'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.'
      when E'not-my-circus' then E'A modern English version of Polish “Nie mój cyrk, nie moje małpy”. It is often called old, but seems to have spread widely quite recently.'
      when E'fool-experience' then E'Often misattributed to Mark Twain; best treated as a modern popular saying with uncertain authorship.'
      when E'grudge-poison' then E'Often misattributed to famous figures such as Nelson Mandela; similar resentment sayings spread through recovery and spiritual traditions.'
      when E'judge-insides-outsides' then E'A modern self-help and recovery saying; authorship is uncertain.'
      when E'hurt-people-hurt-people' then E'A modern therapeutic saying; exact authorship is uncertain.'
      when E'compassion-self-friend' then E'A modern self-compassion idea associated with contemporary psychology rather than a traditional proverb.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.'
      when E'cold-feet' then E'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.'
      when E'put-on-spot' then E'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.'
      when E'running-from-to-why' then E'Adapted from James Thurber’s fable “The Shore and the Sea” in “Further Fables for Our Time” (1956).'
      when E'go-bananas' then E'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.'
      when E'hangry' then E'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.'
      when E'ghost-someone' then E'Modern digital slang: the person disappears from contact like a ghost.'
      when E'throw-shade' then E'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.'
      when E'earworm' then E'The term comes through German and was later used for music that seems to crawl into your ear and stay there.'
      when E'hair-of-dog' then E'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.'
      when E'mad-as-hatter' then E'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.'
      when E'wet-blanket' then E'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.'
      when E'time-wounds-heels' then E'A pun on “time heals all wounds”; used in American humor by the 1930s and later often linked to Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.'
      when E'good-samaritan' then E'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.'
      when E'forbidden-fruit' then E'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.'
      when E'scapegoat' then E'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.'
      when E'skin-of-teeth' then E'From the Book of Job. It survives today as a vivid way to say “barely”.'
      when E'read-riot-act' then E'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.'
      when E'bury-hatchet' then E'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.'
      when E'bigwig' then E'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.'
      when E'armed-to-teeth' then E'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.'
      when E'silver-lining' then E'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.'
      when E'break-the-ice' then E'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.'
      when E'let-cat-out-bag' then E'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.'
      when E'bite-dust' then E'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.'
      else null
    end) as story_no,
    p.quote_la,
    p.description_la,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'From farming: hay had to be cut and dried in dry weather before rain spoiled it.'
      when E'falling-knife' then E'Used literally as kitchen safety advice and metaphorically in finance: do not try to catch a fast-falling price before it stabilizes.'
      when E'hell-keep-going' then E'Often attributed to Winston Churchill, but firm evidence for the exact wording is weak; best treated as a modern motivational saying.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Widely attributed to Benjamin Franklin, though often circulated without a precise primary source.'
      when E'opportunity-overalls' then E'Widely attributed to Thomas Edison, but the exact attribution is debated; similar sayings circulated before clear Edison attribution.'
      when E'perfect-enemy-good' then E'Commonly linked to Voltaire’s French line “Le mieux est l’ennemi du bien” from the 1700s.'
      when E'wish-in-one-hand' then E'A blunt folk saying, especially common in American English; exact origin unknown.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'From hunting, where people beat bushes to drive birds out before the real action began.'
      when E'horses-mouth' then E'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.'
      when E'turn-blind-eye' then E'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.'
      when E'not-my-circus' then E'A modern English version of Polish “Nie mój cyrk, nie moje małpy”. It is often called old, but seems to have spread widely quite recently.'
      when E'fool-experience' then E'Often misattributed to Mark Twain; best treated as a modern popular saying with uncertain authorship.'
      when E'grudge-poison' then E'Often misattributed to famous figures such as Nelson Mandela; similar resentment sayings spread through recovery and spiritual traditions.'
      when E'judge-insides-outsides' then E'A modern self-help and recovery saying; authorship is uncertain.'
      when E'hurt-people-hurt-people' then E'A modern therapeutic saying; exact authorship is uncertain.'
      when E'compassion-self-friend' then E'A modern self-compassion idea associated with contemporary psychology rather than a traditional proverb.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.'
      when E'cold-feet' then E'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.'
      when E'put-on-spot' then E'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.'
      when E'running-from-to-why' then E'Adapted from James Thurber’s fable “The Shore and the Sea” in “Further Fables for Our Time” (1956).'
      when E'go-bananas' then E'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.'
      when E'hangry' then E'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.'
      when E'ghost-someone' then E'Modern digital slang: the person disappears from contact like a ghost.'
      when E'throw-shade' then E'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.'
      when E'earworm' then E'The term comes through German and was later used for music that seems to crawl into your ear and stay there.'
      when E'hair-of-dog' then E'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.'
      when E'mad-as-hatter' then E'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.'
      when E'wet-blanket' then E'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.'
      when E'time-wounds-heels' then E'A pun on “time heals all wounds”; used in American humor by the 1930s and later often linked to Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.'
      when E'good-samaritan' then E'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.'
      when E'forbidden-fruit' then E'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.'
      when E'scapegoat' then E'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.'
      when E'skin-of-teeth' then E'From the Book of Job. It survives today as a vivid way to say “barely”.'
      when E'read-riot-act' then E'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.'
      when E'bury-hatchet' then E'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.'
      when E'bigwig' then E'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.'
      when E'armed-to-teeth' then E'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.'
      when E'silver-lining' then E'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.'
      when E'break-the-ice' then E'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.'
      when E'let-cat-out-bag' then E'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.'
      when E'bite-dust' then E'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.'
      else null
    end) as story_la,
    p.quote_it,
    p.description_it,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'From farming: hay had to be cut and dried in dry weather before rain spoiled it.'
      when E'falling-knife' then E'Used literally as kitchen safety advice and metaphorically in finance: do not try to catch a fast-falling price before it stabilizes.'
      when E'hell-keep-going' then E'Often attributed to Winston Churchill, but firm evidence for the exact wording is weak; best treated as a modern motivational saying.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Widely attributed to Benjamin Franklin, though often circulated without a precise primary source.'
      when E'opportunity-overalls' then E'Widely attributed to Thomas Edison, but the exact attribution is debated; similar sayings circulated before clear Edison attribution.'
      when E'perfect-enemy-good' then E'Commonly linked to Voltaire’s French line “Le mieux est l’ennemi du bien” from the 1700s.'
      when E'wish-in-one-hand' then E'A blunt folk saying, especially common in American English; exact origin unknown.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'From hunting, where people beat bushes to drive birds out before the real action began.'
      when E'horses-mouth' then E'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.'
      when E'turn-blind-eye' then E'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.'
      when E'not-my-circus' then E'A modern English version of Polish “Nie mój cyrk, nie moje małpy”. It is often called old, but seems to have spread widely quite recently.'
      when E'fool-experience' then E'Often misattributed to Mark Twain; best treated as a modern popular saying with uncertain authorship.'
      when E'grudge-poison' then E'Often misattributed to famous figures such as Nelson Mandela; similar resentment sayings spread through recovery and spiritual traditions.'
      when E'judge-insides-outsides' then E'A modern self-help and recovery saying; authorship is uncertain.'
      when E'hurt-people-hurt-people' then E'A modern therapeutic saying; exact authorship is uncertain.'
      when E'compassion-self-friend' then E'A modern self-compassion idea associated with contemporary psychology rather than a traditional proverb.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.'
      when E'cold-feet' then E'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.'
      when E'put-on-spot' then E'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.'
      when E'running-from-to-why' then E'Adapted from James Thurber’s fable “The Shore and the Sea” in “Further Fables for Our Time” (1956).'
      when E'go-bananas' then E'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.'
      when E'hangry' then E'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.'
      when E'ghost-someone' then E'Modern digital slang: the person disappears from contact like a ghost.'
      when E'throw-shade' then E'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.'
      when E'earworm' then E'The term comes through German and was later used for music that seems to crawl into your ear and stay there.'
      when E'hair-of-dog' then E'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.'
      when E'mad-as-hatter' then E'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.'
      when E'wet-blanket' then E'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.'
      when E'time-wounds-heels' then E'A pun on “time heals all wounds”; used in American humor by the 1930s and later often linked to Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.'
      when E'good-samaritan' then E'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.'
      when E'forbidden-fruit' then E'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.'
      when E'scapegoat' then E'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.'
      when E'skin-of-teeth' then E'From the Book of Job. It survives today as a vivid way to say “barely”.'
      when E'read-riot-act' then E'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.'
      when E'bury-hatchet' then E'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.'
      when E'bigwig' then E'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.'
      when E'armed-to-teeth' then E'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.'
      when E'silver-lining' then E'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.'
      when E'break-the-ice' then E'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.'
      when E'let-cat-out-bag' then E'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.'
      when E'bite-dust' then E'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.'
      else null
    end) as story_it,
    p.quote_fr,
    p.description_fr,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'From farming: hay had to be cut and dried in dry weather before rain spoiled it.'
      when E'falling-knife' then E'Used literally as kitchen safety advice and metaphorically in finance: do not try to catch a fast-falling price before it stabilizes.'
      when E'hell-keep-going' then E'Often attributed to Winston Churchill, but firm evidence for the exact wording is weak; best treated as a modern motivational saying.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Widely attributed to Benjamin Franklin, though often circulated without a precise primary source.'
      when E'opportunity-overalls' then E'Widely attributed to Thomas Edison, but the exact attribution is debated; similar sayings circulated before clear Edison attribution.'
      when E'perfect-enemy-good' then E'Commonly linked to Voltaire’s French line “Le mieux est l’ennemi du bien” from the 1700s.'
      when E'wish-in-one-hand' then E'A blunt folk saying, especially common in American English; exact origin unknown.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'From aviation, where the “flight envelope” describes the limits within which an aircraft can safely perform.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'From hunting, where people beat bushes to drive birds out before the real action began.'
      when E'horses-mouth' then E'From horse racing, where people checked a horse’s condition closely — even its mouth — before betting.'
      when E'turn-blind-eye' then E'Often linked to Admiral Horatio Nelson, who supposedly ignored a signal by putting the telescope to his blind eye.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'The exact origin is uncertain. One common theory links “cat” to the cat-o’-nine-tails whip used at sea, leaving victims unable to speak.'
      when E'not-my-circus' then E'A modern English version of Polish “Nie mój cyrk, nie moje małpy”. It is often called old, but seems to have spread widely quite recently.'
      when E'fool-experience' then E'Often misattributed to Mark Twain; best treated as a modern popular saying with uncertain authorship.'
      when E'grudge-poison' then E'Often misattributed to famous figures such as Nelson Mandela; similar resentment sayings spread through recovery and spiritual traditions.'
      when E'judge-insides-outsides' then E'A modern self-help and recovery saying; authorship is uncertain.'
      when E'hurt-people-hurt-people' then E'A modern therapeutic saying; exact authorship is uncertain.'
      when E'compassion-self-friend' then E'A modern self-compassion idea associated with contemporary psychology rather than a traditional proverb.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Before modern anaesthetic, soldiers were sometimes said to bite on a bullet during surgery. The history is debated, but the meaning survived.'
      when E'cold-feet' then E'Often linked to soldiers who literally could not move forward because their feet were frozen or badly protected.'
      when E'put-on-spot' then E'The origin is debated, but the phrase became tied to being marked out for pressure, danger, or public attention.'
      when E'running-from-to-why' then E'Adapted from James Thurber’s fable “The Shore and the Sea” in “Further Fables for Our Time” (1956).'
      when E'go-bananas' then E'A modern slang phrase from the 1900s, related to “go ape”, meaning to act wildly.'
      when E'hangry' then E'A modern blend of “hungry” and “angry”. It became widely used online and in casual speech.'
      when E'ghost-someone' then E'Modern digital slang: the person disappears from contact like a ghost.'
      when E'throw-shade' then E'Popularized through Black and LGBTQ+ ballroom culture, then spread widely through media and social platforms.'
      when E'earworm' then E'The term comes through German and was later used for music that seems to crawl into your ear and stay there.'
      when E'hair-of-dog' then E'From an old belief that a dog bite could be treated with hair from the same dog — a cure made from the cause.'
      when E'mad-as-hatter' then E'Hat makers once used mercury in felt production, and mercury poisoning could cause tremors, anxiety, and strange behaviour.'
      when E'wet-blanket' then E'A wet blanket can put out a fire. The fire became a metaphor for joy, and the wet blanket became the person who kills it.'
      when E'time-wounds-heels' then E'A pun on “time heals all wounds”; used in American humor by the 1930s and later often linked to Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'The image is simple: a large bull surrounded by fragile china. It has been used for centuries to describe destructive clumsiness.'
      when E'good-samaritan' then E'From Jesus’ parable in the Gospel of Luke, where a Samaritan helps a wounded traveller when others pass by.'
      when E'forbidden-fruit' then E'From the story of Adam and Eve in Genesis. The fruit is not named as an apple in the Bible, though art often shows it that way.'
      when E'scapegoat' then E'From Leviticus, where a goat symbolically carried the community’s sins into the wilderness.'
      when E'skin-of-teeth' then E'From the Book of Job. It survives today as a vivid way to say “barely”.'
      when E'read-riot-act' then E'From the British Riot Act of 1714, which was read aloud to unlawful crowds before punishment could follow.'
      when E'bury-hatchet' then E'Often linked to Indigenous North American peace customs, where weapons could be buried as a sign that fighting had ended.'
      when E'bigwig' then E'In the 1700s, wealthy and powerful men often wore large wigs. The bigger the wig, the more important the man appeared.'
      when E'armed-to-teeth' then E'Often linked to pirates carrying as many weapons as possible, even knives held in their teeth.'
      when E'silver-lining' then E'The image comes from sunlight glowing around the edge of a dark cloud, famously used by the poet John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'It likely comes from two dogs fighting over the same bone, so today it means there is an issue to settle.'
      when E'break-the-ice' then E'Ships once had to break ice to open a route. The phrase later became social: opening the way for conversation.'
      when E'let-cat-out-bag' then E'Often linked to old markets, where a dishonest seller might swap a pig in a bag for a cat. Opening the bag exposed the trick.'
      when E'bite-dust' then E'The wording was popularized by Westerns, but similar images of enemies licking or falling into dust are much older, including biblical language.'
      else null
    end) as story_fr,
    p.quote_fo,
    p.description_fo,
    (case p.id
      when E'better-late-than-never' then E'Origin unknown. It is better to do something late than not do it at all.'
      when E'early-bird' then E'Origin unknown. People who act early often get the best chances.'
      when E'time-flies' then E'Origin unknown. Time seems to pass very quickly.'
      when E'slow-steady' then E'Origin unknown. Patience and consistency often win.'
      when E'haste-makes-waste' then E'Origin unknown. Doing things too quickly can create mistakes.'
      when E'make-hay-sun-shines' then E'Úr landbúnaði: hoyggj mátti sláast og turkast í góðum veðri, áðrenn regn oyðilegði tað.'
      when E'falling-knife' then E'Orðingin verður brúkt bæði sum køksráð og sum fíggjarlig mynd: royn ikki at taka ímóti nøkrum í fríum falli, fyrr enn tað er støðugt.'
      when E'hell-keep-going' then E'Ofta tillutað Winston Churchill, men trygg prógv fyri júst hesi orðing eru veik; best at síggja sum nútímans eggjandi orð.'
      when E'actions-speak-louder' then E'Origin unknown. What people do matters more than what they say.'
      when E'practice-perfect' then E'Origin unknown. You improve by practicing.'
      when E'motion-not-action' then E'Ofta tillutað Benjamin Franklin, men verður ofta endurgivið uttan eina greiða frumkeldu.'
      when E'opportunity-overalls' then E'Ofta tillutað Thomas Edison, men nágreiniliga tilskrivingin er umrødd; líknandi orðingar hava verið í umferð fyrr.'
      when E'perfect-enemy-good' then E'Verður ofta knýtt at fronsku orðingini hjá Voltaire “Le mieux est l’ennemi du bien” frá 1700-talinum.'
      when E'wish-in-one-hand' then E'Eitt rátt fólksligt orðatak, serliga kent úr amerikanskum enskum, við óvissum uppruna.'
      when E'nothing-ventured' then E'Origin unknown. You must take chances to gain something.'
      when E'rome-not-built-day' then E'Origin unknown. Big things take time.'
      when E'push-envelope' then E'Úr flogvinnu, har “flight envelope” lýsir mørkini fyri, hvat eitt flogfar trygt kann gera.'
      when E'honesty-best-policy' then E'Origin unknown. It is usually best to tell the truth.'
      when E'truth-will-out' then E'Origin unknown. The truth usually becomes known eventually.'
      when E'no-smoke-without-fire' then E'Origin unknown. Rumors often have a reason behind them.'
      when E'elephant-room' then E'Origin unknown. An obvious problem nobody wants to talk about.'
      when E'beat-around-bush' then E'Orðingin verður knýtt at veiðu, har runnar vórðu slignir fyri at fáa fuglar fram, áðrenn sjálv veiðan byrjaði.'
      when E'horses-mouth' then E'Kemur úr rossakappingum, har fólk vildu hava upplýsingar so nær rossinum sum gjørligt — heilt úr munninum — áðrenn tey settu pengar upp á tað.'
      when E'turn-blind-eye' then E'Verður ofta knýtt at admiral Horatio Nelson, sum sigst hava latið sum um hann ikki sá eitt merki, tí hann setti kikaran fyri blinda eygað.'
      when E'walls-have-ears' then E'Origin unknown. Be careful what you say; someone may be listening.'
      when E'cat-got-tongue' then E'Upprunin er óvissur. Ein teori knýtir “cat” at sjómanapískinum cat-o’-nine-tails, sum kundi gera fólk málleys av pínu.'
      when E'not-my-circus' then E'Ein nútímans ensk útgáva av pólskum “Nie mój cyrk, nie moje małpy”. Hon verður ofta kallað gomul, men tykist serliga vera vorðin útbreidd í nýggjari tíð.'
      when E'fool-experience' then E'Ofta skeivt tillutað Mark Twain; eigur at verða sæð sum eitt nútímans fólksligt orðatak við óvissum uppruna.'
      when E'grudge-poison' then E'Ofta skeivt knýtt at kendum persónum sum Nelson Mandela; líknandi orðingar finnast í andaligum og recovery-samanhangi.'
      when E'judge-insides-outsides' then E'Eitt nútímans sjálvhjálpar- og recovery-orðatak við óvissum uppruna.'
      when E'hurt-people-hurt-people' then E'Eitt nútímans terapeutiskt orðatak við óvissum uppruna.'
      when E'compassion-self-friend' then E'Ein nútímans sjálvumsorganarhugsan knýtt at sálarfrøði heldur enn eitt siðbundið orðatak.'
      when E'blood-thicker-water' then E'Origin unknown. Family ties are often very strong.'
      when E'birds-feather' then E'Origin unknown. Similar people often spend time together.'
      when E'opposites-attract' then E'Origin unknown. Very different people can be drawn to each other.'
      when E'love-blind' then E'Origin unknown. Love can make people ignore faults.'
      when E'all-eggs-one-basket' then E'Origin unknown. Do not risk everything on one plan.'
      when E'look-before-leap' then E'Origin unknown. Think before you act.'
      when E'better-one-bird' then E'Origin unknown. A sure thing is better than a risky possibility.'
      when E'bite-the-bullet' then E'Orðingin verður ofta knýtt at hermonnum, sum bitu í eina kúlu undir skurðviðgerð áðrenn nútímans doyving. Søgan er tó umrødd.'
      when E'cold-feet' then E'Verður ofta knýtt at hermonnum, sum bókstaviliga ikki kundu ganga fram, tí føturnir vóru frystir ella illa vardir.'
      when E'put-on-spot' then E'Upprunin er umrøddur, men orðingin merkir at verða peikaður út og settur undir trýst.'
      when E'running-from-to-why' then E'Tillagað frá fábli hjá James Thurber, “The Shore and the Sea”, í “Further Fables for Our Time” frá 1956.'
      when E'go-bananas' then E'Eitt nýggjari slangorð úr 1900-talinum, í ætt við “go ape”, sum merkir at bera seg villt at.'
      when E'hangry' then E'Eitt nýggjari slangorð úr enskum, sett saman av “hungry” og “angry”.'
      when E'ghost-someone' then E'Nýggjari talgilt slang: persónurin hvørvur sum eitt spøkilsi.'
      when E'throw-shade' then E'Vorðið kent gjøgnum Black og LGBTQ+ ballroom-mentan og seinni gjøgnum miðlar og sosialar pallir.'
      when E'earworm' then E'Orðingin kemur umvegis týskt og varð seinni brúkt um tónleik, sum tykist krúpa inn í oyrað og verða verandi.'
      when E'hair-of-dog' then E'Frá gamlari trúgv um, at eitt hundabit kundi lekjast við hári frá sama hundi — ein lekidómur úr sjálvari orsøkini.'
      when E'mad-as-hatter' then E'Hattamakarar brúktu einaferð kyksilvur í filtframleiðslu, og kyksilvureitran kundi geva ristningar, ótta og løgna atferð.'
      when E'wet-blanket' then E'Eitt vátt teppi kann sløkkja eld. Eldurin gjørdist mynd fyri gleði, og tað váta teppið fyri tann, sum sløkkir hana.'
      when E'time-wounds-heels' then E'Eitt orðaspæl upp á “time heals all wounds”. Tað sæst í amerikanskum skemti í 1930’unum og verður seinni ofta knýtt at Groucho Marx.'
      when E'under-the-weather' then E'Often linked to sailors who went below deck, under the bad weather, when they felt sick.'
      when E'bull-china-shop' then E'Myndin er einføld: eitt stórt dýr millum viðbreknar lutir. Tí verður tað brúkt um klombruta atferð.'
      when E'good-samaritan' then E'Úr líknilsi Jesusar í Lukasevangeliinum, har ein samverji hjálpir einum særdum ferðamanni.'
      when E'forbidden-fruit' then E'Úr frásøgnini um Ádam og Evu í Fyrstu Mósebók. Bíblian sigur ikki, at fruktin var eitt súrepli.'
      when E'scapegoat' then E'Úr Triðju Mósebók, har ein bukkur ímyndarliga bar syndir fólksins út í oyðimørkina.'
      when E'skin-of-teeth' then E'Úr Jobs bók í Bíbliuni. Orðingin livir víðari sum ein sterk mynd fyri “bara akkurát”.'
      when E'read-riot-act' then E'Frá bretsku Riot Act frá 1714, sum varð lisin upp fyri ólógligum mannamúgvum, áðrenn revsing kundi fylgja.'
      when E'bury-hatchet' then E'Verður ofta knýtt at norðuramerikanskum friðarsiðum, har vápn vórðu grivin niður sum tekin um, at stríðið var liðugt.'
      when E'bigwig' then E'Í 1700-talinum bóru ríkir og máttmiklir menn ofta stórar parykkar. Jú størri parykkur, jú týdningarmiklari tyktist maðurin.'
      when E'armed-to-teeth' then E'Verður ofta knýtt at sjórænarum, sum bóru so nógv vápn sum gjørligt, enntá knívar millum tenninar.'
      when E'silver-lining' then E'Myndin kemur frá sólarljósi fram við rondini á einum myrkum skýggi og varð kent brúkt av yrkjaranum John Milton.'
      when E'you-live-and-learn' then E'Origin unknown. Experience and mistakes teach you.'
      when E'no-pain-no-gain' then E'Origin unknown. Progress often requires effort.'
      when E'one-swallow' then E'Origin unknown. One good sign does not prove everything is fine.'
      when E'all-that-glitters' then E'Origin unknown. Something attractive is not always valuable.'
      when E'empty-vessels' then E'Origin unknown. People with little knowledge can be the loudest.'
      when E'out-of-sight' then E'Origin unknown. People often forget what they do not see.'
      when E'two-birds-one-stone' then E'Origin unknown. Solve two things with one action.'
      when E'old-habits-die-hard' then E'Origin unknown. It is difficult to make someone change long-established habits or ways of thinking.'
      when E'too-many-cooks' then E'Origin unknown. Too many people controlling something can make it worse.'
      when E'many-hands-light-work' then E'Origin unknown. A task is easier when more people help.'
      when E'silence-golden' then E'Origin unknown. Sometimes it is best not to speak.'
      when E'knowledge-power' then E'Origin unknown. Knowing more gives you strength and options.'
      when E'every-beginning-hard' then E'Origin unknown. Starting something new is often the most difficult part.'
      when E'pick-your-brain' then E'The phrase imagines gently taking useful thoughts from someone’s mind. It became common in everyday English in the 1900s.'
      when E'bone-to-pick' then E'Orðingin verður ofta knýtt at tveimum hundum, sum stríðast um sama bein — nakað má fáast upp á pláss.'
      when E'break-the-ice' then E'Skip máttu bróta ís fyri at sleppa fram. Seinni varð tað brúkt um at lata upp fyri samrøðu.'
      when E'let-cat-out-bag' then E'Verður ofta knýtt at gomlum marknaðum, har ein óerligur seljari kundi lata ein ketu í sekk í staðin fyri ein grís. Tá sekkurin varð latin upp, kom svikið undan kavi.'
      when E'bite-dust' then E'Orðingin varð kend gjøgnum westernfilmar, men myndin av fíggindum, sum enda í dustinum, er nógv eldri og finst eisini í bíbilskum máli.'
      else null
    end) as story_fo,
    p.image_url,
    p.favorite_count,
    p.created_at,
    (case p.category
      when E'time' then E'Tid, tålmodighed og timing'
      when E'work-results' then E'Handling, arbejde og resultater'
      when E'truth' then E'Sandhed, klarhed og direkte tale'
      when E'relations' then E'Mennesker, grænser og relationer'
      when E'risk' then E'Mod, risiko og beslutninger'
      when E'images-humour' then E'Krop, humor og skarpe billeder'
      when E'origin-stories' then E'Historierne bag ordene'
      when E'experience' then E'Erfaring, modgang og eftertanke'
      else p.category
    end) as category_da,
    (case p.category
      when E'time' then E'Zeit, Geduld und Timing'
      when E'work-results' then E'Handlung, Arbeit und Ergebnisse'
      when E'truth' then E'Wahrheit, Klarheit und direkte Rede'
      when E'relations' then E'Menschen, Grenzen und Beziehungen'
      when E'risk' then E'Mut, Risiko und Entscheidungen'
      when E'images-humour' then E'Körper, Humor und scharfe Bilder'
      when E'origin-stories' then E'Die Geschichten hinter den Worten'
      when E'experience' then E'Erfahrung, Widerstand und Nachdenken'
      else p.category
    end) as category_de,
    (case p.category
      when E'time' then E'Tiempo, paciencia y momento oportuno'
      when E'work-results' then E'Acción, trabajo y resultados'
      when E'truth' then E'Verdad, claridad y habla directa'
      when E'relations' then E'Personas, límites y relaciones'
      when E'risk' then E'Coraje, riesgo y decisiones'
      when E'images-humour' then E'Cuerpo, humor e imágenes precisas'
      when E'origin-stories' then E'Las historias detrás de las palabras'
      when E'experience' then E'Experiencia, adversidad y reflexión'
      else p.category
    end) as category_es,
    (case p.category
      when E'time' then E'Tid, tålmodighet og timing'
      when E'work-results' then E'Handling, arbeid og resultater'
      when E'truth' then E'Sannhet, klarhet og direkte tale'
      when E'relations' then E'Mennesker, grenser og relasjoner'
      when E'risk' then E'Mot, risiko og beslutninger'
      when E'images-humour' then E'Kropp, humor og skarpe bilder'
      when E'origin-stories' then E'Historiene bak ordene'
      when E'experience' then E'Erfaring, motgang og ettertanke'
      else p.category
    end) as category_no,
    (case p.category
      when E'time' then E'Tempus, patientia et momentum'
      when E'work-results' then E'Actio, labor et eventus'
      when E'truth' then E'Veritas, claritas et oratio directa'
      when E'relations' then E'Homines, fines et relationes'
      when E'risk' then E'Fortitudo, periculum et consilia'
      when E'images-humour' then E'Corpus, iocus et imagines acres'
      when E'origin-stories' then E'Fabulae post verba'
      when E'experience' then E'Experientia, adversitas et meditatio'
      else p.category
    end) as category_la,
    (case p.category
      when E'time' then E'Tempo, pazienza e tempismo'
      when E'work-results' then E'Azione, lavoro e risultati'
      when E'truth' then E'Verità, chiarezza e parole dirette'
      when E'relations' then E'Persone, confini e relazioni'
      when E'risk' then E'Coraggio, rischio e decisioni'
      when E'images-humour' then E'Corpo, umorismo e immagini taglienti'
      when E'origin-stories' then E'Le storie dietro le parole'
      when E'experience' then E'Esperienza, avversità e riflessione'
      else p.category
    end) as category_it,
    (case p.category
      when E'time' then E'Temps, patience et moment juste'
      when E'work-results' then E'Action, travail et résultats'
      when E'truth' then E'Vérité, clarté et parole directe'
      when E'relations' then E'Personnes, limites et relations'
      when E'risk' then E'Courage, risque et décisions'
      when E'images-humour' then E'Corps, humour et images fortes'
      when E'origin-stories' then E'Les histoires derrière les mots'
      when E'experience' then E'Expérience, adversité et réflexion'
      else p.category
    end) as category_fr,
    (case p.category
      when E'time' then E'Tíð, tol og røtt løta'
      when E'work-results' then E'Gerðir, arbeiði og úrslit'
      when E'truth' then E'Sannleiki, greiðleiki og beinleiðis tala'
      when E'relations' then E'Fólk, mørk og sambond'
      when E'risk' then E'Dirvi, váði og avgerðir'
      when E'images-humour' then E'Kroppur, skemt og hvassar myndir'
      when E'origin-stories' then E'Søgurnar handan orðini'
      when E'experience' then E'Royndir, mótburður og umhugsan'
      else p.category
    end) as category_fo
from public.proverbs_before_category_story_columns p;

do $$
declare
  old_count integer;
  new_count integer;
begin
  select count(*) into old_count from public.proverbs_before_category_story_columns;
  select count(*) into new_count from public.proverbs;
  if old_count <> new_count then
    raise exception 'Proverb row count changed during category/story migration: old %, new %', old_count, new_count;
  end if;
end $$;

create index proverbs_created_at_idx on public.proverbs (created_at desc);
create index proverbs_category_idx on public.proverbs (category);

alter table public.proverbs enable row level security;

create policy "Public can read proverbs"
  on public.proverbs
  for select
  using (true);

grant select on public.proverbs to anon, authenticated;
grant execute on function public.adjust_proverb_favorite_count(text, integer) to anon, authenticated;

drop table public.proverbs_before_category_story_columns;

commit;
