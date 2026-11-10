/*
  data.js
  All sport content for the site. Every fact comes from the English
  Wikipedia page linked in "wiki". Videos were chosen by the team.

  Fields:
    id         short unique name used in code
    name       display name
    continent  asia | europe | africa | namerica | samerica | oceania
    location   map location key (see LOCATIONS below)
    wiki       Wikipedia source page
    imageTitle Wikipedia article whose main photo is shown
    imageFile  (optional) a specific Wikimedia Commons file to show instead
    imageLocal (optional) a photo saved in the images folder, with its source
    extraSources (optional) other pages used, as [title, link] pairs
    video      YouTube video ID
    sections   [label, text] pairs; *word* becomes italic
    terms      [term, meaning] pairs
*/

var CONTINENTS = {
  asia:     { name: "Asia",          color: "#C0432F", center: 100,  extent: [[60, -11], [146, -11], [60, 55], [146, 55]] },
  europe:   { name: "Europe",        color: "#2F5DA8", center: 10,   extent: [[-25, 35], [45, 35], [-25, 67], [45, 67]] },
  africa:   { name: "Africa",        color: "#5E8C3A", center: 15,   extent: [[-20, -36], [52, -36], [-20, 38], [52, 38]] },
  namerica: { name: "North America", color: "#8A3F7E", center: -95,  extent: [[-140, 12], [-55, 12], [-140, 72], [-55, 72]] },
  samerica: { name: "South America", color: "#C68A1E", center: -60,  extent: [[-85, -56], [-33, -56], [-85, 13], [-33, 13]] },
  oceania:  { name: "Oceania",       color: "#1F8178", center: 165,  extent: [[110, -48], [-150, -48], [110, 24], [-150, 24], [180, 0]] }
};

/* Where each badge sits on the world map [longitude, latitude] */
var CONTINENT_LABELS = {
  namerica: [-102, 47],
  samerica: [-62, -14],
  europe:   [12, 53],
  africa:   [19, 6],
  asia:     [96, 44],
  oceania:  [137, -26]
};

/*
  When you zoom into a continent, each country with a sport gets its
  own colour so neighbouring countries stand out from each other.
  Countries next to each other are given different colours.
*/
var COUNTRY_COLORS = {
  RED:    "#C8344A",
  BLUE:   "#2C6FB7",
  GREEN:  "#2E8B57",
  PURPLE: "#7D4CA8",
  ORANGE: "#D06A12",
  TEAL:   "#12808F"
};

/*
  Map locations. "iso" is the country's ISO numeric code, used to
  highlight it on the map. "pin" is where the number marker sits.
  "color" is the country's colour when zoomed in.
  Hawaii has no iso code: map.js cuts the Hawaiian islands out of the
  USA shape so they can be shown as part of Oceania.
*/
var LOCATIONS = {
  thailand:    { name: "Thailand",           iso: "764", pin: [101, 15.5], color: COUNTRY_COLORS.RED },
  malaysia:    { name: "Malaysia",           iso: "458", pin: [102, 4], color: COUNTRY_COLORS.BLUE },
  japan:       { name: "Japan",              iso: "392", pin: [138.5, 36.5], color: COUNTRY_COLORS.PURPLE },
  india:       { name: "India",              iso: "356", pin: [79, 22], color: COUNTRY_COLORS.GREEN },
  southkorea:  { name: "South Korea",        iso: "410", pin: [128, 36.3], color: COUNTRY_COLORS.TEAL },
  indonesia:   { name: "Indonesia",          iso: "360", pin: [113, -1.5], color: COUNTRY_COLORS.ORANGE },
  scotland:    { name: "Scotland, UK",       iso: "826", pin: [-4.2, 57], color: COUNTRY_COLORS.RED },
  france:      { name: "France",             iso: "250", pin: [2.5, 46.6], color: COUNTRY_COLORS.BLUE },
  spain:       { name: "Basque Country, Spain", iso: "724", pin: [-3.5, 41], color: COUNTRY_COLORS.GREEN },
  ireland:     { name: "Ireland",            iso: "372", pin: [-8, 53.2], color: COUNTRY_COLORS.PURPLE },
  russia:      { name: "Russia",             iso: "643", pin: [38, 55.5], color: COUNTRY_COLORS.ORANGE },
  iceland:     { name: "Iceland",            iso: "352", pin: [-18.5, 65], color: COUNTRY_COLORS.TEAL },
  senegal:     { name: "Senegal",            iso: "686", pin: [-14.5, 14.5], color: COUNTRY_COLORS.RED },
  nigeria:     { name: "Nigeria",            iso: "566", pin: [8, 9.5], color: COUNTRY_COLORS.BLUE },
  southafrica: { name: "South Africa",       iso: "710", pin: [25, -29], color: COUNTRY_COLORS.GREEN },
  egypt:       { name: "Egypt",              iso: "818", pin: [30, 26.5], color: COUNTRY_COLORS.PURPLE },
  canada:      { name: "Canada",             iso: "124", pin: [-100, 57], color: COUNTRY_COLORS.RED },
  usa:         { name: "United States",      iso: "840", pin: [-98, 39], color: COUNTRY_COLORS.BLUE },
  mexico:      { name: "Mexico",             iso: "484", pin: [-102, 23.5], color: COUNTRY_COLORS.GREEN },
  brazil:      { name: "Brazil",             iso: "076", pin: [-51, -10], color: COUNTRY_COLORS.GREEN },
  argentina:   { name: "Argentina",          iso: "032", pin: [-64, -34], color: COUNTRY_COLORS.BLUE },
  chile:       { name: "Chile",              iso: "152", pin: [-71.5, -36], color: COUNTRY_COLORS.RED },
  newzealand:  { name: "New Zealand",        iso: "554", pin: [173, -41], color: COUNTRY_COLORS.RED },
  hawaii:      { name: "Hawaii",             iso: null,  pin: [-157, 20.5], color: COUNTRY_COLORS.BLUE }
};

var SPORTS = [

  /* ---------------- ASIA ---------------- */
  {
    id: "muay-thai",
    name: "Muay Thai",
    continent: "asia",
    location: "thailand",
    wiki: "https://en.wikipedia.org/wiki/Muay_Thai",
    imageTitle: "Muay Thai",
    video: "3C9fVc7jmDk",
    sections: [
      ["Quick facts", "Thai martial art and full-contact combat sport, called the \"Art of Eight Limbs\" because it uses fists, elbows, knees and shins. Modern rules were codified under King Rama VII (1925–1935)."],
      ["Rituals & traditions", "Fighters perform the *wai kru ram muay* before a bout. The *mongkol* headband is given by the trainer when a fighter is ready to represent the gym, and it is often blessed by a Buddhist monk. *Pra jiad* armbands come from wartime, when young men wore a piece of a loved one's clothing for luck."],
      ["Cultural values", "The word *muay* is traced to a Sanskrit root meaning \"unity\" or \"to tie.\" King Bhumibol described it as a sport rooted in the self-defence of ancient Thai warriors."],
      ["How it spread", "Thai troops in France during World War I taught it there. It spread widely in the late 20th century as Thai fighters competed in kickboxing abroad; by 2020 there were over 3,800 Thai boxing gyms overseas."],
      ["Influence on modern sports", "The Thai roundhouse kick has been widely adopted by other combat sports. Brazilian gyms such as Chute Boxe introduced coloured armbands to show rank."],
      ["International competitions", "IFMA (founded 1993, 128 member countries) governs amateur Muaythai. It joined the World Games in 2017, gained full IOC recognition on 20 July 2021, and was a demonstration sport at Paris 2024."],
      ["Fun facts", "\"Muay Thai Day\" is held every 17 March to honour the legendary fighter Nai Khanom Tom. The Olympic name is written as one word, \"Muaythai,\" because sport names cannot include a country name."],
      ["Where to watch", "Rajadamnern Stadium and Lumpinee Boxing Stadium in Bangkok."]
    ],
    terms: [["nak muay", "fighter"], ["nak muay farang", "foreign fighter"], ["mongkol", "headband, \"luck/protection\""], ["thip", "foot jab"], ["khao loi", "flying knee"], ["sok", "elbow"]]
  },
  {
    id: "sepak-takraw",
    name: "Sepak Takraw",
    continent: "asia",
    location: "malaysia",
    wiki: "https://en.wikipedia.org/wiki/Sepak_takraw",
    imageTitle: "Sepak takraw",
    video: "pewgkEy1fT0",
    sections: [
      ["Quick facts", "\"Kick volleyball\" played with feet, knees, chest and head over a net. Teams (*regu*) have 3 players and the ball is rattan or synthetic. Standardised in Kuala Lumpur in 1960."],
      ["Rituals & traditions", "Originally a casual circle game to loosen the limbs, not a competition. Murals at Bangkok's Wat Phra Kaew show the god Hanuman playing it with monkeys."],
      ["Cultural values", "Malaysia's national sport. In Thailand, a takraw exhibition celebrated the first constitution in 1933."],
      ["How it spread", "The name is a compromise: *sepak* is Malay for \"kick\" and *takraw* is Thai for a woven rattan ball. Lao refugees brought it to Canada in the 1970s, and it reached the US through Southeast Asian communities in the 1980s."],
      ["Influence on modern sports", "Wikipedia links the idea of footvolley to Thai takraw."],
      ["International competitions", "ISTAF (formed 1988) runs the World Cup, SuperSeries and King's Cup. A medal sport at the Asian Games since 1990; Thailand has won the most gold medals."],
      ["Fun facts", "Related games exist across Asia, such as *chinlone* (Myanmar), *sipa* (Philippines) and *cầu mây* (Vietnam). Thailand switched from rattan to synthetic balls in 1982."],
      ["Where to watch", "The King's Cup World Championships in Thailand, held every year."]
    ],
    terms: [["regu", "team"], ["tekong", "server"], ["feeder / setter", "player who sets up the attack"], ["striker / killer", "attacking player"]]
  },
  {
    id: "sumo",
    name: "Sumo",
    continent: "asia",
    location: "japan",
    wiki: "https://en.wikipedia.org/wiki/Sumo",
    imageTitle: "Sumo",
    video: "E0Xl1f-fXLo",
    sections: [
      ["Quick facts", "Japan's national sport. First mentioned in the *Kojiki* (712) and became a professional sport in the Edo period."],
      ["Rituals & traditions", "Wrestlers throw salt to purify the ring and rinse with *chikara-mizu* (\"power water\"), as before entering a Shinto shrine. Each day opens with the *dohyō-iri* ring-entering ceremony in decorated aprons."],
      ["Cultural values", "Strict discipline: wrestlers live in stables with rules on dress, meals and behaviour, and rank is earned purely by results."],
      ["How it spread", "Foreign-born wrestlers now hold many top ranks; Bulgaria's Kotoōshū and Brazil's Ryūkō Gō are examples. Japanese immigrants brought amateur sumo to Brazil."],
      ["International competitions", "The International Sumo Federation (1992) runs World and European Championships. Sumo was in the World Games 2001–2022 and has been in the World Combat Games since 2010."],
      ["Fun facts", "A 1578 tournament for 1,500 wrestlers under Oda Nobunaga is credited with inventing the ring. Some *mawashi* belts are about 30 feet long. Fans throw seat cushions when a yokozuna loses."],
      ["Where to watch", "Six 15-day tournaments a year: Tokyo's Ryōgoku Kokugikan (January, May, September), Osaka (March), Nagoya (July) and Fukuoka (November)."]
    ],
    terms: [["dohyō", "ring"], ["rikishi", "wrestler"], ["mawashi", "belt"], ["yokozuna", "grand champion"], ["basho", "tournament"], ["heya", "stable"], ["gyōji", "referee"]]
  },
  {
    id: "kabaddi",
    name: "Kabaddi",
    continent: "asia",
    location: "india",
    wiki: "https://en.wikipedia.org/wiki/Kabaddi",
    imageTitle: "Kabaddi",
    video: "uDA3kOwmD-g",
    sections: [
      ["Quick facts", "Contact team sport from the Indian subcontinent, possibly about 4,000 years old. 7 players per side on court; modern rules were drafted in 1921."],
      ["Rituals & traditions", "The raider must keep chanting \"kabaddi\" on one breath for the whole raid. Early references are linked to the *Mahabharata*."],
      ["Cultural values", "A rural sport of entertainment and community bonding. Bangladesh's national sport."],
      ["How it spread", "Reached the UK with the South Asian diaspora. Iran, South Korea and Taiwan are now strong international teams."],
      ["International competitions", "Asian Games medal event since 1990 (women since 2010). Kabaddi World Cup since 2004. The Pro Kabaddi League, a franchise league, was founded in 2014."],
      ["Fun facts", "Kabaddi was a demonstration sport at the 1936 Berlin Olympics. Beach kabaddi is played barefoot on sand."],
      ["Where to watch", "Pro Kabaddi League matches in India."]
    ],
    terms: [["raider", "attacker"], ["defenders", "players who tackle the raider"], ["cant", "the chant"], ["bonus line", "line that earns an extra point"], ["All Out", "all 7 opponents removed: +2 points"]]
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    continent: "asia",
    location: "southkorea",
    wiki: "https://en.wikipedia.org/wiki/Taekwondo",
    imageTitle: "Taekwondo",
    video: "cz7cctS3eHQ",
    sections: [
      ["Quick facts", "Korean martial art developed in the 1940s–50s from Seoul's *kwan* schools. The Korea Taekwondo Association formed in 1959."],
      ["Rituals & traditions", "Students bow as a sign of respect, wear the *dobok*, earn coloured belts (*geup*) then black-belt ranks (*dan*), and practise forms called *poomsae*."],
      ["Cultural values", "Choi Hong-hi's five tenets: courtesy, integrity, perseverance, self-control and indomitable spirit."],
      ["How it spread", "Adoption by the South Korean military boosted it. Jhoon Rhee is called the \"father of Taekwondo in the United States.\""],
      ["Influence on modern sports", "Electronic scoring in competition changed tactics, rewarding foot-to-head contact."],
      ["International competitions", "Olympic demonstration sport in 1988 (Seoul) and a full medal sport since 2000. Governed by World Taekwondo and the ITF."],
      ["Fun facts", "South Korea named taekwondo its national martial art in 2018. In 1966 Allen Steen beat Chuck Norris at the Long Beach Internationals."],
      ["Where to watch or try", "Kukkiwon in Seoul, the national academy (est. 1972) that sets the official curriculum."]
    ],
    terms: [["dobok", "uniform"], ["dojang", "training hall"], ["kyorugi", "sparring"], ["poomsae", "forms"], ["gihap", "shout"], ["gyeokpa", "board breaking"]]
  },
  {
    id: "pencak-silat",
    name: "Pencak Silat",
    continent: "asia",
    location: "indonesia",
    wiki: "https://en.wikipedia.org/wiki/Pencak_silat",
    imageTitle: "Pencak silat",
    video: "8H0x1AKlpM4",
    sections: [
      ["Quick facts", "A family of Indonesian martial arts. The earliest structured teaching is traced to the Minangkabau Highlands of West Sumatra."],
      ["Rituals & traditions", "Traditional music sets the rhythm of footwork, and a drum beat can signal an attack. Classical styles use weapons such as the *keris* dagger and *toya* staff."],
      ["Cultural values", "Used for physical and mental defence. Historically, local champions (*jago*) protected common people against colonial rule. Listed by UNESCO as intangible heritage on 12 December 2019."],
      ["How it spread", "Indo-Dutch Eurasians took it to the West in the late 20th century; schools now exist in Europe and America."],
      ["International competitions", "PERSILAT (founded 1980) governs it. SEA Games since 1987, Asian Games debut in 2018, and World Championships every 2–3 years."],
      ["Fun facts", "Silat fighters Yayan Ruhian and Cecep Arif Rahman fight Keanu Reeves in *John Wick 3*. Minangkabau *randai* dance uses silat moves."]
    ],
    terms: [["jurus", "forms"], ["langkah", "footwork"], ["kembang", "flowing hand movements"], ["silek", "Minangkabau word for silat"], ["tanding", "match"]]
  },

  /* ---------------- EUROPE ---------------- */
  {
    id: "highland-games",
    name: "Highland Games",
    continent: "europe",
    location: "scotland",
    wiki: "https://en.wikipedia.org/wiki/Highland_games",
    imageTitle: "Highland games",
    video: "WKmuOnw2sL4",
    sections: [
      ["Quick facts", "Scottish festival of \"heavy events,\" music and dance. The earliest reference is from Malcolm III (c. 1031–1093); the modern games took shape in the 19th century."],
      ["Rituals & traditions", "Massed pipe bands open and close the games. Highland dancing (Highland Fling, Sword Dance), kilts and tartan, and clan tents are central."],
      ["Cultural values", "Celebrating Scottish and Celtic heritage and a shared identity, especially for families abroad."],
      ["How it spread", "At least 260 events worldwide (as of 2000): over 100 in the USA, dozens in Canada, plus Australia, New Zealand, Brazil and more. North American games date to 1836 in New York."],
      ["Influence on modern sports", "Pierre de Coubertin reportedly saw a Highland games display in 1889, and the games are claimed to have influenced the Olympic revival."],
      ["International competitions", "World Highland Dancing Championship (Cowal), World Pipe Band Championships (Glasgow) and Scottish Heavyweight Championships (Crieff)."],
      ["Fun facts", "In the caber toss, a perfect throw lands at \"12 o'clock,\" straight away from the thrower. The TV series *Outlander* boosted interest, dubbed the \"Outlander effect.\""],
      ["Where to watch", "Cowal Highland Gathering (Dunoon, August; about 23,000 spectators), Braemar Gathering (attended by the royal family), and Pleasanton, California (record crowd near 50,000 in 2015)."]
    ],
    terms: [["caber", "larch pole that is flipped"], ["trig", "toeboard"], ["Braemar Stone", "standing stone put"], ["maide-leisg", "\"lazy stick\" pull"], ["massed bands", "many pipe bands playing together"]]
  },
  {
    id: "fencing",
    name: "Fencing",
    continent: "europe",
    location: "france",
    wiki: "https://en.wikipedia.org/wiki/Fencing",
    imageTitle: "Fencing",
    video: "R03U2lDPQqk",
    sections: [
      ["Quick facts", "Combat sport descended from European swordsmanship. The oldest surviving manual dates to about 1300; modern technique comes from the Italian and French schools of the 18th century. Three weapons: foil, épée and sabre."],
      ["Rituals & traditions", "Every bout begins and ends with a salute. Fencers traditionally wear white; instructors wear black."],
      ["Cultural values", "Sportsmanship and honour. It is often described as \"high-speed chess.\""],
      ["How it spread", "Domenico Angelo's London academy (1763) helped turn it into a sport. The FIE now has 155 national federations."],
      ["International competitions", "In every modern Summer Olympics since 1896, and the Paralympics since 1960."],
      ["Fun facts", "Kevlar uniforms were introduced after a fatal accident at the 1982 World Championships. ESPN2 aired a lightsaber-duelling variant in 2018."]
    ],
    terms: [["foil", "torso is the target"], ["épée", "whole body is the target"], ["sabre", "above the waist"], ["parry", "block"], ["riposte", "counterattack after a parry"], ["piste", "fencing strip"]]
  },
  {
    id: "basque-pelota",
    name: "Basque Pelota",
    continent: "europe",
    location: "spain",
    wiki: "https://en.wikipedia.org/wiki/Basque_pelota",
    imageTitle: "Basque pelota",
    video: "wk4-fuGAwjY",
    sections: [
      ["Quick facts", "Court sport where a ball is hit against a wall with the hand, a bat or a basket. Hand pelota is said to date to the 13th century; the basket (*xistera*) appeared around 1850–1860."],
      ["Rituals & traditions", "Betting is a traditional part of professional play. *Joko garbi* (\"pure game\") contrasts with the old \"dirty game\" of holding the ball."],
      ["Cultural values", "Strongly tied to Basque identity, at home and in the diaspora."],
      ["How it spread", "Taken to Argentina, Chile, Uruguay, Cuba and Mexico. Basque immigrants built courts in Oregon (1915) and Miami (1924); as jai alai it became a betting sport in Florida and other states."],
      ["Influence on modern sports", "Shares roots with real tennis and lawn tennis, and inspired one-wall handball. Mexico created *frontenis*, a tennis–pelota fusion."],
      ["International competitions", "World Championships since 1952. Official Olympic sport in 1900; demonstration sport in 1924, 1968 and 1992."],
      ["Fun facts", "The ball can reach about 200 km/h; the record is 302 km/h (1979). Courts have been painted green since 1994 so the ball shows up on TV."],
      ["Where to watch", "Courts across the Basque Country in Spain and France, and jai alai courts in Florida."]
    ],
    terms: [["frontón", "court"], ["pelotari", "player"], ["xistera", "basket glove"], ["cesta punta / jai alai", "basket version"]]
  },
  {
    id: "gaelic-games",
    name: "Gaelic Football & Hurling",
    continent: "europe",
    location: "ireland",
    wiki: "https://en.wikipedia.org/wiki/Gaelic_football",
    wiki2: "https://en.wikipedia.org/wiki/Hurling",
    imageTitle: "Gaelic football",
    video: "RAjZcb8LTIo",
    sections: [
      ["Quick facts", "Both are run by the Gaelic Athletic Association (GAA, founded 1884). Gaelic football has 15 players a side and mixes kicking and hand passing. Hurling is a stick-and-ball game referenced in 7th-century Irish law texts."],
      ["Rituals & traditions", "Football matches start with the ball thrown up between four midfielders. Early rules had players hold hands with opponents before play."],
      ["Cultural values", "Strictly amateur: players cannot be paid. Clubs represent their parish, county teams their county. The GAA aimed to promote Irish sports over English imports."],
      ["How it spread", "Played mainly by the Irish diaspora; Gaelic Park in New York is the largest venue outside Ireland. Brittany in France is a growing exception."],
      ["Influence on modern sports", "Gaelic football and Australian rules combined into International Rules football (test series 1984–2017)."],
      ["International competitions", "All-Ireland Senior Football and Hurling Championships. UNESCO lists hurling as intangible cultural heritage."],
      ["Fun facts", "In 1939, Kerry played Galway at Yankee Stadium before 70,000 fans. A hurling ball can fly at over 150 km/h. Tadhg Kennelly won both an All-Ireland title and an AFL premiership."],
      ["Where to watch", "Croke Park, Dublin (All-Ireland finals, 80,000+ crowds) and Semple Stadium, Thurles (hurling)."]
    ],
    terms: [["soloing", "toe-kicking the ball back to your hands"], ["point", "over the bar, white flag"], ["goal", "3 points, green flag"], ["hurley / camán", "hurling stick"], ["sliotar", "hurling ball"]]
  },
  {
    id: "sambo",
    name: "Sambo",
    continent: "europe",
    location: "russia",
    wiki: "https://en.wikipedia.org/wiki/Sambo_(martial_art)",
    imageTitle: "Sambo (martial art)",
    video: "03cxFEq5czY",
    sections: [
      ["Quick facts", "Soviet martial art from the 1920s, developed for the Red Army. Pioneers: Vasili Oshchepkov and Viktor Spiridonov. Styles: sport sambo (throws, pins, leg locks) and combat sambo (adds strikes and chokes)."],
      ["Rituals & traditions", "Competitors wear a *kurtka* jacket and *bortsovki* shoes, in red or blue. Ranks come from competition (\"Master of Sport\") rather than coloured belts."],
      ["Cultural values", "Built for practical self-defence: its stated goal is to stop an opponent as quickly as possible."],
      ["How it spread", "Recognised by the international wrestling federation in 1968 and the US AAU in 1972; the first US National Championships were held in 1975."],
      ["Influence on modern sports", "Combat sambo uses \"adapters\" that link boxing and sambo techniques. Sambo wrestlers also won Olympic judo medals (see fun facts)."],
      ["International competitions", "FIAS (formed 1985) sanctions world events; the World Cup has been held since 1969. The IOC gave temporary recognition in 2018, but it is not an Olympic sport yet."],
      ["Fun facts", "The name stands for *samozashchita bez oruzhiya*, \"self-defence without weapons.\" Sambo wrestlers won four bronze medals in judo at the 1964 Olympics."]
    ],
    terms: [["kurtka", "jacket"], ["bortsovki", "wrestling shoes"], ["Master of Sport", "rank"]]
  },
  {
    id: "glima",
    name: "Glíma",
    continent: "europe",
    location: "iceland",
    wiki: "https://en.wikipedia.org/wiki/Gl%C3%ADma",
    imageTitle: "Glíma",
    video: "WUx2pOqtTiM",
    sections: [
      ["Quick facts", "Icelandic folk wrestling and Iceland's national sport. Mentioned in the Jónsbók law book of 1325. Wrestlers grip each other's belts and trousers and must stay upright."],
      ["Rituals & traditions", "Wrestlers step clockwise around each other (*stígandi*). A belt harness replaced gripping the trousers in 1905."],
      ["Cultural values", "*Drengskapur*, a code of honour: fairness, respect and care for your partner's safety. Forceful knockdowns are unsportsmanlike."],
      ["How it spread", "Loose-grip glíma is practised in Norway and Finland."],
      ["International competitions", "Demonstrated at the 1912 Stockholm Olympics. The Belt of Grettir (since 1906) crowns the \"Glíma King\"; women win the Necklace of Freyja."],
      ["Fun facts", "A win comes from making the opponent touch the ground between elbow and knee; landing on hands and feet does not count. A competition has been held in Iceland almost every year since 1888."]
    ],
    terms: [["brókartök", "trouser grip"], ["lausatök", "loose grip"], ["stígandi", "stepping"], ["drengskapur", "honour"], ["Glíma King / Queen", "champion"]]
  },

  /* ---------------- AFRICA ---------------- */
  {
    id: "laamb",
    name: "Laamb (Senegalese Wrestling)",
    continent: "africa",
    location: "senegal",
    wiki: "https://en.wikipedia.org/wiki/Senegalese_wrestling",
    imageTitle: "Senegalese wrestling",
    video: "Om9EqqHRdHA",
    sections: [
      ["Quick facts", "Rooted in Serer wrestling, once used as war training and an initiation rite. The aim is to throw the opponent to the ground. Two versions today: without strikes (*lutte sans frappe*) and with hand strikes (*lutte avec frappe*)."],
      ["Rituals & traditions", "Before a bout, each wrestler performs the *bàkk*, a boastful spoken performance meant to inspire fear or respect. Griots sang praise songs and drummers played during bouts."],
      ["Cultural values", "Wrestling let young men prove their strength, court a wife and bring honour to their village. The Serer word *njom* comes from *jom*, meaning \"heart\" or \"honour.\""],
      ["How it spread", "Practised across ethnic groups as Senegal's national sport, and in The Gambia (\"Senegambian wrestling\"). A 2008 BBC documentary followed British and American hopefuls training in Senegal."],
      ["International competitions", "Mainly a domestic professional sport; it has been a major spectator event since the 1950s."],
      ["Fun facts", "Boukar Djilak Faye, a 14th-century wrestler, is one of the oldest on record. Top wrestlers have landed TV acting roles. Famous names include Mame Gorgui, Balla Gaye 2, Yékini and Bombardier."],
      ["Where to watch", "The National Wrestling Arena (20,000 seats), in the Dakar area."]
    ],
    terms: [["laamb", "Wolof for wrestling"], ["bàkk", "boast performance"], ["mbër", "wrestler"], ["njom", "Serer for wrestling"]]
  },
  {
    id: "dambe",
    name: "Dambe",
    continent: "africa",
    location: "nigeria",
    wiki: "https://en.wikipedia.org/wiki/Dambe",
    imageTitle: "Dambe",
    video: "xF4nZKnWLgw",
    sections: [
      ["Quick facts", "Hausa boxing from Nigeria, traditionally dominated by butcher and fisherman groups. Three rounds with no time limit; a round ends when a fighter's hand, knee or body touches the ground."],
      ["Rituals & traditions", "Drums and chants call fighters to the ring and taunt rivals. Traditional fighters wear amulets for protection, though officials now discourage it."],
      ["Cultural values", "Brotherhood within travelling fighter companies (\"armies\"), toughness and readiness for war. Bouts began at harvest festivals, when villages had money for prizes."],
      ["How it spread", "Travelling companies stage matches across northern Nigeria, southern Niger and southwestern Chad. Online videos made it widely known; in 2019 Nigeria's sports ministry pledged a national league."],
      ["Fun facts", "The striking fist is called the \"spear\" and is wrapped in cloth and cord; the open hand is the \"shield.\" Knocking someone down is called \"killing\" them. Urban bouts are often held outside meatpacking plants."],
      ["Where to watch", "Outdoor carnival-style events in northern Nigeria."]
    ],
    terms: [["dambe", "from the Hausa for \"boxer\""], ["yan dambe", "boxers"], ["spear", "striking fist"], ["shield", "open guarding hand"]]
  },
  {
    id: "nguni-stick-fighting",
    name: "Nguni Stick Fighting",
    continent: "africa",
    location: "southafrica",
    wiki: "https://en.wikipedia.org/wiki/Nguni_stick-fighting",
    imageTitle: "Nguni stick-fighting",
    /* The Wikipedia page has no photo, so this one is saved in the
       site's images folder and credited to the article it came from. */
    imageLocal: {
      src: "images/nguni-stick-fighting.jpg",
      source: "Face2Face Africa",
      page: "https://face2faceafrica.com/article/centuries-old-zulu-tradition-of-stick-fighting-is-today-helping-south-africa-to-curb-gang-violence-heres-why"
    },
    extraSources: [
      ["Centuries-old Zulu tradition of stick-fighting is today helping South Africa to curb gang violence (Face2Face Africa, 2019)",
       "https://face2faceafrica.com/article/centuries-old-zulu-tradition-of-stick-fighting-is-today-helping-south-africa-to-curb-gang-violence-heres-why"]
    ],
    video: "U1qrVYh7E1k",
    sections: [
      ["Quick facts", "Traditionally practised by teenage Nguni herdboys. Uses an attacking stick and a defending stick; Zulu styles add a shield. Bouts can last up to five hours."],
      ["Rituals & traditions", "Bouts now often take place at weddings, where fighters from the bride's and groom's families meet to \"get to know each other.\" An *induna* (war captain) keeps order."],
      ["Cultural values", "The aim is to find the strongest fighter, called the \"Bull\" (*inkunzi*). Modern Zulu stick fighting follows regiment structures from Shaka's era."],
      ["How it spread", "Once banned in parts of South Africa, it is now resurfacing. In Cape Town townships it is being revived to steer teenagers away from gangs and drugs (Face2Face Africa). It appeared on the TV shows *Last Man Standing* and *Deadliest Warrior*, and in the film *We Still Are Warriors*."],
      ["Fun facts", "Nelson Mandela practised stick fighting as a child. Shaka Zulu was a famous practitioner."]
    ],
    terms: [["dlala 'nduku", "\"playing sticks\""], ["isikhwili", "attacking stick"], ["ubhoko", "defending stick"], ["ihawu", "shield"], ["inkunzi", "\"Bull,\" the strongest fighter"]]
  },
  {
    id: "tahtib",
    name: "Tahtib",
    continent: "africa",
    location: "egypt",
    wiki: "https://en.wikipedia.org/wiki/Tahtib",
    imageTitle: "Tahtib",
    video: "FwXfaAZ_-Lk",
    sections: [
      ["Quick facts", "Stick-fighting art from Upper Egypt. The oldest traces are carvings at Abusir from about 2500 BC; tomb scenes at Beni Hassan also show it."],
      ["Rituals & traditions", "Fighters swing a 4-foot stick (*asa*) in figure-eight patterns to the beat of the *tabl* drum and *mizmar* oboe. Matches were held at weddings and celebrations."],
      ["Cultural values", "Its original name translates as \"the art of being straight and honest through the use of stick.\""],
      ["How it spread", "It evolved from a martial art into a folk dance. A women's version, *raqs el assaya* (\"stick dance\"), appears in belly dance shows with a decorated cane."],
      ["Influence on modern sports", "Modern tahtib is a mixed-gender combat sport: one clean touch to the head or three to the body wins."],
      ["Fun facts", "It was one of three skills taught to ancient Egyptian soldiers, with archery and wrestling. The swings are fast enough that you can hear the air move."],
      ["Where to watch", "Performances for tourists in Luxor and Aswan."]
    ],
    terms: [["asa / nabboot", "stick"], ["tabl", "bass drum"], ["mizmar", "folk oboe"], ["raqs el assaya", "stick dance"]]
  },

  /* ---------------- NORTH AMERICA ---------------- */
  {
    id: "lacrosse",
    name: "Lacrosse",
    continent: "namerica",
    location: "canada",
    wiki: "https://en.wikipedia.org/wiki/Lacrosse",
    imageTitle: "Lacrosse",
    video: "Ngr18Oh-qG4",
    sections: [
      ["Quick facts", "Indigenous team sport dating to about 1100 AD; the Haudenosaunee (Iroquois Confederacy) are among its originators. The oldest organised sport in North America."],
      ["Rituals & traditions", "Games were part of ceremony, symbolic warfare or thanksgiving to the Creator. Matches could last two to three days with 100 to 1,000 players."],
      ["Cultural values", "Called \"The Creator's Game\" and \"The Medicine Game.\" Players acted as warriors, seeking honour for themselves and their tribe."],
      ["How it spread", "Missionary Jean de Brébeuf saw the Wendat play in 1637 and named it *la crosse* (French for \"the stick\"). William George Beers codified the rules in Montreal in 1860; by 1900 it was played in Canada, the US, England, Australia and New Zealand."],
      ["International competitions", "Olympic sport in 1904 and 1908; returns as lacrosse sixes at Los Angeles 2028. World Championships are held every four years since 1967. The Iroquois Nationals are the only First Nations team allowed to compete internationally in any sport."],
      ["Fun facts", "Shafts are octagonal, not round, for a better grip. Canada has won every gold medal at the World Indoor Championship."],
      ["Where to watch", "National Lacrosse League (indoor, December–April) and Premier Lacrosse League (outdoor, on ESPN)."]
    ],
    terms: [["crease", "circle around the goal"], ["face-off / draw", "restart"], ["man up / man down", "power play"], ["box lacrosse", "indoor version"]]
  },
  {
    id: "rodeo",
    name: "Rodeo",
    continent: "namerica",
    location: "usa",
    wiki: "https://en.wikipedia.org/wiki/Rodeo",
    imageTitle: "Rodeo",
    video: "WRpuFk323t8",
    sections: [
      ["Quick facts", "Grew out of the cattle-herding skills of Spanish and Mexican *vaqueros*, later American and Canadian cowboys. The word comes from Spanish *rodear*, \"to surround.\" First organised competition: Deer Trail, Colorado, 1869."],
      ["Rituals & traditions", "The Grand Entry, where riders gallop in with flags. Rodeo queens, trick riding and \"mutton busting\" (children riding sheep). Bullfighters, once called rodeo clowns, protect fallen riders."],
      ["Cultural values", "Celebrates cowboy skill, speed and athleticism; part sport, part pageant."],
      ["How it spread", "Canada (first rodeo 1902; Calgary Stampede 1912), Australia (association formed 1944), Brazil (Festa do Peão de Barretos, since 1956), and Hawaii's *paniolo* cowboy culture."],
      ["International competitions", "National Finals Rodeo, every December in Las Vegas, and the Calgary Stampede every July."],
      ["Fun facts", "Rodeo is the official state sport of Wyoming, South Dakota and Texas. The first night rodeo under electric lights was held in 1935. Rodeo is banned in the UK and the Netherlands over animal-welfare concerns."]
    ],
    terms: [["vaquero", "cattle herder"], ["lariat", "rope with a loop"], ["bronc", "bucking horse"], ["header / heeler", "team-roping roles"]]
  },
  {
    id: "charreria",
    name: "Charrería",
    continent: "namerica",
    location: "mexico",
    wiki: "https://en.wikipedia.org/wiki/Charreada",
    imageTitle: "Charreada",
    video: "3-izs8Ez52Y",
    sections: [
      ["Quick facts", "Mexico's national sport, grown from 16th-century ranch work on haciendas. Declared \"genuinely national\" by decree in 1933. A charreada has nine events, ending with *el paso de la muerte* (\"pass of death\")."],
      ["Rituals & traditions", "Riders wear the *charro* suit, from simple work dress to silver-embroidered gala wear. Opening ceremonies feature mariachi or banda music. The *escaramuza* is a team of eight women performing fast riding routines."],
      ["Cultural values", "Skill and horsemanship rather than killing: bulls are not slaughtered. Strongly tied to Mexican identity and national pride. September 14 is *Día del Charro*."],
      ["How it spread", "Over 100 charro associations now exist in the US, and US teams sometimes compete at Mexico's national championship."],
      ["International recognition", "UNESCO Intangible Cultural Heritage since 2016."],
      ["Fun facts", "The word *charro* began as an 18th-century insult for country people. The Azteca horse breed was created in 1972 for charros. The first escaramuza (1953) was made up of children aged five to nine."]
    ],
    terms: [["charro / charra", "rider"], ["lienzo charro", "keyhole-shaped arena"], ["suerte", "event"], ["escaramuza", "women's riding team"], ["cala de caballo", "horse test"]]
  },
  {
    id: "ice-hockey",
    name: "Ice Hockey",
    continent: "namerica",
    location: "canada",
    wiki: "https://en.wikipedia.org/wiki/Ice_hockey",
    imageTitle: "Ice hockey",
    video: "YQoTamp5m_w",
    sections: [
      ["Quick facts", "The first organised indoor game was played in Montreal on 3 March 1875, drawing on shinty, bandy, hurling and lacrosse. Six players a side: three forwards, two defencemen and one goaltender."],
      ["Cultural values", "Canada's official national winter sport since 1994."],
      ["How it spread", "Canadian rules were adopted in Paris in the early 1900s by the forerunner of the IIHF. It is now most popular in Canada, the US, Germany, Switzerland and Northern and Eastern Europe."],
      ["International competitions", "Played at the 1920 Summer Games; Winter Olympics since 1924 (women since 1998). Women's World Championship since 1990. The Stanley Cup is the NHL's championship trophy."],
      ["Fun facts", "The attendance record is 104,173, set at Michigan Stadium in 2010. Sledge hockey, for players with physical disabilities, was created in Sweden in the early 1960s."],
      ["Where to watch", "NHL games in Canada and the US."]
    ],
    terms: [["puck", "rubber disc"], ["power play", "advantage during a penalty"], ["face-off", "restart"], ["icing", "shooting the puck the length of the ice"]]
  },
  {
    id: "basketball",
    name: "Basketball",
    continent: "namerica",
    location: "usa",
    wiki: "https://en.wikipedia.org/wiki/Basketball",
    imageTitle: "Basketball",
    video: "G6go_js-qoU",
    sections: [
      ["Quick facts", "Invented by James Naismith in December 1891 at the YMCA Training School in Springfield, Massachusetts, to keep his class active in winter. Five players a side."],
      ["Rituals & traditions", "The first hoops were peach baskets; metal hoops with backboards replaced them in 1906. High school basketball in Indiana is famous as \"Hoosier Hysteria.\""],
      ["How it spread", "YMCAs carried it across the US and Canada; Senda Berenson adapted it for women in 1892. FIBA formed in 1932 with eight countries. NBA players now come from all six inhabited continents."],
      ["International competitions", "Olympic sport since 1936 (women since 1976) and the FIBA Basketball World Cup. NBA players were allowed in the Olympics from 1989, leading to the 1992 \"Dream Team.\""],
      ["Fun facts", "The first official game (1892) ended 1–0. Muggsy Bogues (5'3\") is the shortest NBA player ever; Manute Bol and Gheorghe Mureșan (7'7\") are the tallest."],
      ["Where to visit", "Naismith Memorial Basketball Hall of Fame, Springfield, Massachusetts (opened 1959)."]
    ],
    terms: [["dribble", "bouncing the ball while moving"], ["travel", "illegal steps without dribbling"], ["rebound", "catching a missed shot"], ["goaltending", "touching a falling shot, not allowed"], ["pick and roll", "screen, then move to the basket"]]
  },
  {
    id: "arctic-sports",
    name: "Arctic Sports (Inuit Games)",
    continent: "namerica",
    location: "canada",
    wiki: "https://en.wikipedia.org/wiki/Arctic_sports",
    wiki2: "https://en.wikipedia.org/wiki/Arctic_Winter_Games",
    imageTitle: "Arctic sports",
    video: "88Fqaa1o2mQ",
    sections: [
      ["Quick facts", "Athletic and strength contests practised by Indigenous Arctic peoples, such as the Inuit. Most events grew from hunting, fishing and camp-life skills."],
      ["Rituals & traditions", "Hand games are played while drummers and singers perform. The blanket toss (*nalukataq*) launches a person into the air from a blanket held by 40–50 people."],
      ["Cultural values", "Practical skill, preparation and friendly competition between communities, and keeping traditional knowledge alive. The Arctic Winter Games' Hodgson Trophy rewards fair play and team spirit."],
      ["How it spread", "The Arctic Winter Games (since 1970) bring together Alaska, Northern Canada, Greenland and Sápmi (Norway, Sweden, Finland, Russia)."],
      ["International competitions", "Arctic Winter Games (Arctic sports have been medal events since 1974) and the World Eskimo-Indian Olympics in Fairbanks (since 1961)."],
      ["Fun facts", "The kneel jump may come from escaping broken ice; the seal hop copies sneaking up on seals. The one-foot high kick record is 2.92 m (2018)."],
      ["Where to watch", "The 2028 Arctic Winter Games in Fairbanks and Anchorage, Alaska."]
    ],
    terms: [["anaktaqtuat", "Inuit games"], ["one-foot high kick", "kick a hanging target, land on the same foot"], ["knuckle hop", "hop forward on fists and toes"], ["ear pull", "tug-of-war with a loop around the ears"], ["nalukataq", "blanket toss"]]
  },

  /* ---------------- SOUTH AMERICA ---------------- */
  {
    id: "capoeira",
    name: "Capoeira",
    continent: "samerica",
    location: "brazil",
    wiki: "https://en.wikipedia.org/wiki/Capoeira",
    imageTitle: "Capoeira",
    video: "lIVgvpMIImY",
    sections: [
      ["Quick facts", "Afro-Brazilian martial art and game created by Black Brazilians, possibly rooted in *engolo* from Angola. First mentioned officially in 1789, as a crime. Two main styles: *Regional* (Mestre Bimba, 1930s) and *Angola* (Mestre Pastinha, 1941)."],
      ["Rituals & traditions", "Played inside the *roda*, a circle of people clapping and singing. Two players shake hands, enter, and play to the rhythm of the *berimbau*, the lead instrument. Songs are in Portuguese, often call-and-response."],
      ["Cultural values", "*Malícia*: cunning and reading your opponent's intentions. Players say they \"play\" (*jogar*), not fight. Anti-racism has been an explicit value since the mid-1980s."],
      ["How it spread", "Banned in the 1890 penal code and legalised in 1937. The first class in Europe was likely in London in 1971; New York followed in 1975. It is now practised on every continent."],
      ["Influence on modern sports", "It has influenced some MMA fighters. A 1909 bout between a capoeirista and a Japanese jujutsu fighter was an early mixed-style fight."],
      ["International recognition", "The *roda de capoeira* was added to UNESCO's Intangible Cultural Heritage list in 2014."],
      ["Fun facts", "Practitioners used nicknames (*apelido*) to avoid trouble with the police. The *bênção* kick looks like a greeting but becomes an attack. Eddy Gordo in *Tekken 3* (1997) fights with capoeira."]
    ],
    terms: [["roda", "circle"], ["ginga", "rhythmic side-step"], ["berimbau", "musical bow"], ["mestre", "master"], ["apelido", "nickname"], ["batizado", "ceremony for new students"]]
  },
  {
    id: "bjj",
    name: "Brazilian Jiu-Jitsu",
    continent: "samerica",
    location: "brazil",
    wiki: "https://en.wikipedia.org/wiki/Brazilian_jiu-jitsu",
    imageTitle: "Brazilian jiu-jitsu",
    video: "Tdbegvx0xAg",
    sections: [
      ["Quick facts", "Grappling art focused on ground fighting. Traces back to Mitsuyo Maeda, a Japanese judoka who taught in Brazil from 1914; the Gracie brothers developed it around 1925."],
      ["Rituals & traditions", "Belt ranks are white, blue, purple, brown and black, with stripes to mark progress; a black belt usually takes about 10 years. Students remove shoes, bow, line up by rank and call instructors \"professor.\""],
      ["Cultural values", "A smaller, weaker person can beat a larger opponent using leverage. Hélio Gracie adapted judo for his small build."],
      ["How it spread", "Carlos Gracie moved to the US in 1972 and Rorion in 1978. Rorion co-founded the UFC in 1993."],
      ["Influence on modern sports", "Royce Gracie won UFC 1, 2 and 4, showing the value of ground fighting; BJJ is now essential to MMA."],
      ["International competitions", "IBJJF World Championships (\"Mundials\"), Pan American and European Championships, and ADCC for no-gi grappling."],
      ["Fun facts", "The name survives because judo was once called \"Kano jiu-jitsu.\" Injury rates are lower than in MMA, boxing, judo or taekwondo."]
    ],
    terms: [["guard", "controlling from your back with your legs"], ["mount", "sitting on the opponent's chest"], ["submission", "lock or choke"], ["tap out", "give up"], ["gi / no-gi", "with or without the uniform"]]
  },
  {
    id: "pato",
    name: "Pato",
    continent: "samerica",
    location: "argentina",
    wiki: "https://en.wikipedia.org/wiki/Pato",
    imageTitle: "Pato",
    video: "mCOo8bG4Rzo",
    sections: [
      ["Quick facts", "Horseback game of the gauchos, first described in Buenos Aires in 1610. Two teams of four contest a leather ball with six handles and throw it through a vertical ring."],
      ["Rituals & traditions", "Originally played with a live duck in a basket; fields could stretch between neighbouring ranches. Today it is often played at weekend fairs alongside *doma* (Argentine rodeo)."],
      ["Cultural values", "Seen as purely Argentine, in contrast to imported football, and nicknamed \"el deporte nacional.\""],
      ["History", "Banned many times for cruelty to the duck and violence between players. In the 1930s Alberto del Castillo Posse wrote rules modelled on polo, and in 1953 President Juan Perón declared it the national game."],
      ["Influence on modern sports", "Horseball, played in France, Portugal and other countries, is similar."],
      ["Fun facts", "*Pato* means \"duck.\" Only a few thousand people play, and about 90% of Argentines have never seen a match."]
    ],
    terms: [["pato", "duck"], ["cinchada", "tug-of-war for the ball"], ["negada", "foul for not offering the ball"], ["estancia", "ranch"]]
  },
  {
    id: "football-brazil",
    name: "Football (Futebol)",
    continent: "samerica",
    location: "brazil",
    wiki: "https://en.wikipedia.org/wiki/Football_in_Brazil",
    imageTitle: "Maracanã Stadium",
    /* A match photo instead of the stadium */
    imageFile: "FWC 2018 - Group E - SRB v BRA - Photo 117.jpg",
    video: "9Bd8gb6k7hE",
    sections: [
      ["Quick facts", "Football came from England. Charles Miller learned it at school in Southampton and brought equipment and a rulebook to São Paulo; Scottish immigrant Thomas Donohoe organised the first match in Brazil in April 1894."],
      ["Cultural values", "Central to Brazilian identity: Brazil is \"o País do Futebol\" (\"the country of football\"), and over 68% of Brazilians are fans."],
      ["Influence on modern sports", "Brazil's style, called *ginga*, relies heavily on dribbling."],
      ["International competitions", "Brazil has won a record five World Cups (1958, 1962, 1970, 1994, 2002) and is the only team to play in every World Cup. Olympic gold in 2016 and 2020."],
      ["Famous players", "Pelé (three World Cups), Garrincha, Ronaldo, Ronaldinho, Neymar, and Marta in the women's game."],
      ["Fun facts", "The Maracanã's record crowd is 199,854, for Brazil 1–2 Uruguay at the 1950 World Cup. The Campeonato Paulista (1902) is Brazil's oldest official competition."],
      ["Where to watch", "Maracanã Stadium, Rio de Janeiro (home of Flamengo and Fluminense)."]
    ],
    terms: [["futebol", "football"], ["ginga", "Brazilian dribbling style"]]
  },
  {
    id: "palin",
    name: "Palin (Chueca)",
    continent: "samerica",
    location: "chile",
    wiki: "https://en.wikipedia.org/wiki/Palin_(game)",
    imageTitle: "Palin (game)",
    video: "HAfg9l-YbpQ",
    sections: [
      ["Quick facts", "Traditional Mapuche game similar to field hockey. Two teams use curved wooden sticks to move a wood or leather ball across a field about 200 m long and 12 m wide."],
      ["Rituals & traditions", "Before the Spanish arrived, it was played as a ritual or as preparation for war. Some communities still hold games as rituals on special occasions."],
      ["Cultural values", "Carries spiritual, social and political meaning for the Mapuche."],
      ["History", "Chile's colonial government banned it repeatedly in the 17th–18th centuries because of its ritual and war links. It was revived after independence."],
      ["Fun facts", "Scoring works like a tug-of-war: a team must score four points in a row with no reply to win. Palin is the only pre-Columbian Mapuche game still played today. The Spanish called it *chueca* after a similar game in Spain."]
    ],
    terms: [["palin", "Mapuche name"], ["chueca", "Spanish name"]]
  },

  /* ---------------- OCEANIA ---------------- */
  {
    id: "haka",
    name: "The Haka",
    continent: "oceania",
    location: "newzealand",
    wiki: "https://en.wikipedia.org/wiki/Haka_in_sports",
    imageTitle: "Haka",
    video: "yiKFYTFJ_kw",
    sections: [
      ["Quick facts", "The 1905 \"Originals,\" the first team called the All Blacks, performed the haka *Ka Mate* before tests against Scotland and Wales. A second haka, *Kapa o Pango*, was introduced in 2005."],
      ["Rituals & traditions", "*Ka Mate* is credited to Te Rauparaha of Ngāti Toa, celebrating his escape from enemies in 1810. It is still used to welcome visitors onto a *marae*. Opponents usually face it about 10 metres away."],
      ["Cultural values", "Teams stress *tikanga* (correct custom), pronunciation and movement; iwi (tribe) permission is needed to use a haka. Richie McCaw called it integral to New Zealand culture."],
      ["How it spread", "Other Pacific rugby nations perform their own war dances: Fiji's *Cibi*, Tonga's *Sipi Tau* and Samoa's *Siva Tau*. The women's team, the Black Ferns, has its own haka, *Ko Ūhia Mai*."],
      ["International competitions", "The All Blacks first performed the haka at a home Rugby World Cup in 1987; before that it was mainly done at overseas matches."],
      ["Fun facts", "England was fined £2,000 in 2019 for crossing halfway during the haka. In 1949 the All Blacks did no haka in South Africa, in protest at apartheid rules excluding Māori players. James Joyce heard a haka in Paris and used it in *Finnegans Wake*."]
    ],
    terms: [["haka", "Māori posture dance"], ["Ka Mate", "best-known haka"], ["Kapa o Pango", "All Blacks' own haka"], ["tikanga", "custom"], ["marae", "meeting ground"], ["iwi", "tribe"]]
  },
  {
    id: "rugby-nz",
    name: "Rugby in New Zealand & the Pacific",
    continent: "oceania",
    location: "newzealand",
    wiki: "https://en.wikipedia.org/wiki/Rugby_union_in_New_Zealand",
    imageTitle: "New Zealand national rugby union team",
    /* A match photo instead of the team logo */
    imageFile: "Springbok-All Black lineout in tri nations 2006.jpg",
    video: "CjWk4j8cC6U",
    sections: [
      ["Quick facts", "Charles John Monro learned rugby while studying in London and brought it to Nelson College in 1870. It is New Zealand's most popular sport; in a 2023 survey, 75% of people said they followed it."],
      ["Rituals & traditions", "The haka has been performed before All Blacks matches since the late 19th century. The 1884 New Zealand team wore blue jerseys with a golden fern."],
      ["Cultural values", "The 1905–06 tour built national pride, and the kiwi became a national symbol. The Māori All Blacks (formed 1910) give young Māori players a pathway; Wirihana was the first recorded Māori player in 1872."],
      ["How it spread", "Rugby arrived from Britain with settlers. Today New Zealand plays Pacific neighbours Fiji, Samoa and Tonga in the Pacific Nations Cup."],
      ["International competitions", "The All Blacks won the Rugby World Cup in 1987, 2011 and 2015, becoming the first team to win back-to-back titles. The Black Ferns have won the Women's Rugby World Cup six times. Rivalry with Australia for the Bledisloe Cup."],
      ["Famous players", "Richie McCaw, Dan Carter, Beauden Barrett, Colin Meads, Kieran Read."],
      ["Fun facts", "Up to 5,000 people have attended All Blacks training sessions. The 2011 World Cup final was New Zealand's most-watched TV event. The Ranfurly Shield, contested since 1904, is nicknamed the \"Log o' Wood.\""]
    ],
    terms: [["All Blacks", "men's national team"], ["Black Ferns", "women's national team"], ["Super Rugby", "professional club competition"], ["Ranfurly Shield", "provincial trophy"]]
  },
  {
    id: "surfing",
    name: "Surfing",
    continent: "oceania",
    location: "hawaii",
    wiki: "https://en.wikipedia.org/wiki/Surfing",
    imageTitle: "Surfing",
    video: "35CSnPlFdIs",
    sections: [
      ["Quick facts", "Modern surfing is thought to come from Hawaii, brought by Polynesians from Tahiti and the Marquesas around AD 400. Standing up on the board was invented in Hawaii."],
      ["Cultural values", "Many surfers see surfing as a spiritual experience."],
      ["How it spread", "Native Hawaiian Duke Kahanamoku, an Olympic swimming champion (1912, 1920), spread surfing to the US and Australia. George Freeth was brought to California in 1907."],
      ["Influence on modern sports", "\"Sidewalk surfing\" became skateboarding, and the Snurfer is credited as the first snowboard. 1950s–60s surf films and the Beach Boys spread California surf culture."],
      ["International competitions", "Olympic sport since Tokyo 2020 (first champions: Ítalo Ferreira of Brazil and Carissa Moore of Hawaii). The World Surf League (since 1976) runs the championship tour."],
      ["Fun facts", "The biggest wave ever surfed was 26.2 m (86 ft) at Nazaré, Portugal. Dale Webster surfed 14,641 days in a row."],
      ["Where to watch or try", "Pipeline and Waimea Bay (Oahu, Hawaii), Teahupo'o (Tahiti), Cloudbreak (Fiji) and Superbank (Gold Coast, Australia)."]
    ],
    terms: [["barrel / tube ride", "riding inside the wave"], ["cutback", "turn back toward the wave"], ["wipeout", "falling off"], ["thruster", "three-fin board"]]
  },
  {
    id: "outrigger",
    name: "Outrigger Canoeing (Va'a)",
    continent: "oceania",
    location: "hawaii",
    wiki: "https://en.wikipedia.org/wiki/Outrigger_canoeing",
    imageTitle: "Outrigger canoeing",
    video: "Z1-I97_Y6TU",
    sections: [
      ["Quick facts", "Outrigger boats were developed by Austronesian peoples and were the first true ocean-going ships, carrying people across the Pacific from about 3000 BC. Racing crews are usually six (OC6)."],
      ["Rituals & traditions", "The steersperson is the most experienced paddler and is responsible for safety. Long races use \"water changes,\" where paddlers swap in and out from the water."],
      ["Cultural values", "Teamwork and trust in the steersperson; every paddler must know how to recover from a capsize (*huli*)."],
      ["How it spread", "Clubs now exist in Hawaii, Fiji, Tahiti, Hong Kong, Sri Lanka, East Africa, Australia and California. It is Hawaii's state sport."],
      ["International competitions", "IVF World Championships and the Pacific Games. The Molokaʻi Hoe is a 43-mile race across Hawaii's Kaiwi Channel."],
      ["Fun facts", "In 1521, Magellan's chronicler recorded that Chamorro boats far outran Spanish ships. The voyaging canoe Hōkūleʻa sails between islands using traditional navigation, without instruments."]
    ],
    terms: [["va'a / wa'a", "canoe"], ["ama", "outrigger float"], ["ʻiako", "booms joining float to hull"], ["huli", "capsize"]]
  },
  {
    id: "lua",
    name: "Lua",
    continent: "oceania",
    location: "hawaii",
    wiki: "https://en.wikipedia.org/wiki/Lua_(martial_art)",
    imageTitle: "Lua (martial art)",
    video: "iFeFWQr9XII",
    sections: [
      ["Quick facts", "Ancient Hawaiian martial art (*Kapu Kuʻialua*) of bone breaking, joint locks, throws and strikes, plus weapons such as a shark-tooth club and spear."],
      ["Rituals & traditions", "Fighters coated themselves in coconut oil and removed body hair to slip out of grabs. Training included spear catching, surf training and focusing *mana* (life force)."],
      ["Cultural values", "Taught mainly to nobility (*aliʻi*) and warriors; under Kamehameha the Great, only the king's guards could learn it."],
      ["How it spread", "Kamehameha II founded three schools to save it from dying out. Teacher Solomon Kaihewalu opened it to the public in the 1960s."],
      ["Influence on modern sports", "Some Lua techniques were absorbed into Danzan-ryū jujutsu, developed in Hilo in the 1920s."],
      ["Fun facts", "Lua masters are called *ʻōlohe*, meaning \"hairless.\" Lua appeared in the *Hawaii Five-0* reboot."]
    ],
    terms: [["kuʻialua", "\"two hits\""], ["kapu", "forbidden"], ["aliʻi", "nobility"], ["kumu lua", "Lua teacher"], ["mana", "life force"]]
  },
  {
    id: "ki-o-rahi",
    name: "Kī-o-rahi",
    continent: "oceania",
    location: "newzealand",
    wiki: "https://en.wikipedia.org/wiki/Ki-o-rahi",
    imageTitle: "Kī-o-rahi",
    video: "Tbo9xJwzC5Y",
    sections: [
      ["Quick facts", "Māori ball game based on the legend of Rahitutakahina rescuing his wife. Two teams of eight play on a circular field, scoring by touching boundary markers (*pou*) and hitting a central target (*tupu*)."],
      ["Rituals & traditions", "Before play, teams agree the rules in a process called *Tatu*, because rules vary by region."],
      ["Cultural values", "Described as an indigenous game carrying *tikanga Māori* (Māori customs). Its traditional status is debated by some scholars."],
      ["How it spread", "McDonald's \"Passport to Play\" taught it in 31,000 US schools in 2005. A New Zealand team toured Europe in 2010, beating France 57–10 (men) and 33–0 (women) in the first test matches between the two countries."],
      ["Influence on modern sports", "Mixes skills from rugby, netball, tag rugby and touch."],
      ["Fun facts", "All Black legend Buck Shelford became New Zealand's first kī-o-rahi and rugby double international."]
    ],
    terms: [["kī", "ball"], ["pou", "boundary markers"], ["tupu", "central target"], ["Tatu", "rule-setting before the game"]]
  }
];

