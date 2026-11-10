/*
  howtoplay.js
  A plain explanation of each sport: what it is, how it is played,
  and how you win. Shown at the top of each sport's panel.

  Most of this comes from the sport's Wikipedia page. Where Wikipedia
  does not cover the rules, "rulesSources" lists the other page used.

  "how" and "win" can be one string, or a list of strings (shown as bullets).
  *word* becomes italic.
*/

var HOW_TO_PLAY = {

  /* ---------------- ASIA ---------------- */
  "muay-thai": {
    what: "Thai kickboxing, the \"Art of Eight Limbs\": fighters strike with fists, elbows, knees and shins.",
    how: "Two fighters in a roped ring. A standard bout is 5 rounds of 3 minutes with 2-minute breaks. Fighters may clinch (hold each other close) to throw knees and elbows, and a strike only scores if it lands without being blocked.",
    win: "By knockout, by the referee stopping the fight, or on points from three judges.",
    rulesSources: [["Muay Thai rules (GameRules)", "https://gamerules.com/rules/muay-thai/"]]
  },
  "sepak-takraw": {
    what: "\"Kick volleyball\": like volleyball, but players use their feet, knees, chest and head, never their hands.",
    how: "Two teams of 3 on a badminton-sized court with a net. The server (*tekong*) kicks the ball over, and each team gets up to 3 touches to send it back.",
    win: "A team scores a point whenever the other side makes a fault. Sets go to 21 points, and the first team to win 2 sets wins the match."
  },
  "sumo": {
    what: "Japanese wrestling between two large wrestlers in a raised circular ring.",
    how: "Both wrestlers crouch, touch the ground with their fists, then charge at each other (*tachi-ai*). They push, grip each other's belt and throw. Punching, kicking and hair-pulling are banned, and most bouts last only a few seconds.",
    win: "Force your opponent out of the ring, or make any part of their body other than the soles of their feet touch the ground. In a tournament, the wrestler with the most wins over 15 days is champion."
  },
  "kabaddi": {
    what: "A tag-and-tackle team game from India.",
    how: "Two teams of 7, each on its own half of the court. Teams take turns sending one \"raider\" into the other half to tag defenders and run back, chanting \"kabaddi\" on one breath the whole time. The defenders try to tackle the raider and stop them getting home.",
    win: [
      "The raider's team gets 1 point for each defender tagged.",
      "The defending team gets 1 point if it stops the raider.",
      "Knocking out the whole opposing team (\"All Out\") earns 2 bonus points.",
      "The team with more points after two 20-minute halves wins."
    ]
  },
  "taekwondo": {
    what: "A Korean martial art known for fast, high kicks.",
    how: "Three 2-minute rounds in an 8 m square or octagon. Fighters wear electronic body and head guards that register kicks automatically.",
    win: [
      "Body kick: 2 points (4 for a spinning kick).",
      "Head kick: 3 points (5 for a spinning kick).",
      "Punch to the body: 1 point.",
      "The fighter with more points after 3 rounds wins. A 20-point lead or a knockout ends the match early; a tie goes to a sudden-death \"golden point\" round."
    ]
  },
  "pencak-silat": {
    what: "An Indonesian martial art that mixes fighting with dance-like movements.",
    how: "In the fighting event (*tanding*), two fighters exchange punches, kicks and sweeps. There are also form events, solo (*tunggal*), pairs (*ganda*) and team (*regu*), judged like gymnastics on accuracy, power and expression.",
    win: [
      "Punch: 1 point.",
      "Kick: 2 points.",
      "Bringing the opponent to the floor: 3 points.",
      "A clean defence followed by your own attack earns an extra point."
    ],
    rulesSources: [["Scoring in silat (ActiveSG Circle)", "https://activesgcircle.gov.sg/learn/silat/scoring-in-silat"]]
  },

  /* ---------------- EUROPE ---------------- */
  "highland-games": {
    what: "A Scottish festival of strength events, bagpipe music and dancing.",
    how: [
      "Flipping a giant wooden pole end over end (caber toss).",
      "Putting a heavy stone.",
      "Throwing a weighted hammer.",
      "Swinging a heavy weight over a bar."
    ],
    win: "Each event has its own winner. The hammer goes to the longest throw and the weight over bar to the highest clearance. In the caber toss, the straightest flip, landing at \"12 o'clock,\" scores best."
  },
  "fencing": {
    what: "Sword fighting as a sport, with three weapons: foil, épée and sabre.",
    how: "Two fencers face each other on a long strip (*piste*). Their weapons are wired to a scoring box that lights up when a hit lands. Each weapon has a different target: the torso for foil, the whole body for épée, and above the waist for sabre.",
    win: "First to 5 hits in pool bouts, or first to 15 hits in knockout bouts. A tied bout goes to a 1-minute sudden-death period."
  },
  "basque-pelota": {
    what: "A Basque wall-ball game, a bit like squash. The ball is hit with the bare hand, a bat, or a curved wicker basket (*xistera*, used in jai alai).",
    how: "Players hit the ball against a front wall, between a low line and a high line, and opponents must return it before it bounces twice. In jai alai, players catch and throw the ball in one smooth motion.",
    win: "You win the point when the opponent can't return the ball or hits outside the lines. Hand-pelota league games go to 22 points; jai alai games go to 7 or 9 points.",
    rulesSources: [
      ["Jai alai (Wikipedia)", "https://en.wikipedia.org/wiki/Jai_alai"],
      ["Bare-handed Pelota First League Doubles (Wikipedia)", "https://en.wikipedia.org/wiki/Bare-handed_Pelota_First_League_Doubles"]
    ]
  },
  "gaelic-games": {
    what: "Ireland's two national games, each played by 15 per side. Gaelic football mixes soccer and rugby; hurling is played with a wooden stick (*hurley*) and a small ball (*sliotar*).",
    how: [
      "Gaelic football: players can run with the ball, but must bounce it or \"solo\" it (kick it back into their own hands) every few steps. They pass by kicking or punching the ball.",
      "Hurling: players carry the ball balanced on the stick or strike it through the air.",
      "Both use H-shaped goalposts with a net below the bar."
    ],
    win: "A goal (into the net) is worth 3 points; a point (over the bar) is worth 1. The higher total after 60–70 minutes wins."
  },
  "sambo": {
    what: "Russian wrestling and martial art, close to judo.",
    how: "Wrestlers in jackets try to throw each other, pin each other down, or apply arm and leg locks. A senior match is one 5-minute period.",
    win: [
      "Instant win (\"total victory\"): a perfect throw that lands the opponent on their back while you stay standing, or a submission lock.",
      "A 12-point lead also ends the match.",
      "Otherwise, the wrestler with more points from throws and pins wins."
    ],
    rulesSources: [["Sombo wrestling history and basic rules (USA Wrestling)", "https://content.usawmembership.com/articles/14485"]]
  },
  "glima": {
    what: "Icelandic folk wrestling, built on technique rather than strength.",
    how: "Wrestlers wear special belts and hold each other's belt and trousers. They stand upright and step around each other in a circle, looking for a chance to trip or throw. Pushing someone down by force is not allowed.",
    win: "Make your opponent touch the ground with any part of the body between the elbow and the knee. Landing on hands and feet doesn't count."
  },

  /* ---------------- AFRICA ---------------- */
  "laamb": {
    what: "Senegal's national sport, a wrestling style where punches are allowed.",
    how: "Two wrestlers in a sand ring try to lift and throw each other. Punching is allowed in the main professional version.",
    win: [
      "The opponent's back, buttocks or head touches the ground.",
      "Both of the opponent's knees and both hands touch the ground.",
      "The opponent is pushed out of the ring.",
      "The opponent is knocked out."
    ],
    rulesSources: [["Senegalese Wrestling (Grapplezilla)", "https://grapplezilla.com/senegalese-wrestling/"]]
  },
  "dambe": {
    what: "Hausa boxing from Nigeria.",
    how: "The striking fist, the \"spear,\" is wrapped in cloth and cord. The other hand, the \"shield,\" is open and used to block and grab, and the front leg can kick.",
    win: "A round ends when a fighter's hand, knee or body touches the ground; knocking your opponent down is called \"killing\" them. Fights have 3 rounds with no time limit."
  },
  "nguni-stick-fighting": {
    what: "South African fighting with two long sticks, one for attacking and one for defending. Zulu fighters may also use a shield.",
    how: "Fighters take turns attacking and defending, and an *induna* (referee) keeps order. A bout can last up to five hours.",
    win: "Points are scored by striking different parts of the opponent's body. The aim is to prove you are the strongest, the \"Bull.\" Wikipedia doesn't give the exact points or how a bout officially ends."
  },
  "tahtib": {
    what: "Egyptian stick fighting that also became a folk dance.",
    how: "Two players swing 4-foot sticks in figure-eight patterns to drum and oboe music, attacking and defending the head.",
    win: "In the modern sport version, one clean touch to the head or three touches to the body wins. The traditional dance form has no winner."
  },

  /* ---------------- NORTH AMERICA ---------------- */
  "lacrosse": {
    what: "An Indigenous team sport played with sticks that have a small net on the end.",
    how: "Ten players per side (field version). Players scoop up, carry, pass and catch a hard rubber ball with their sticks, and shoot it into a 6 × 6 ft goal. Attackers can't enter the circle around the goal, and players wear helmets and pads.",
    win: "The team with more goals after four 15-minute quarters wins."
  },
  "rodeo": {
    what: "A competition built from cowboy ranch skills.",
    how: [
      "Riding events: staying on a bucking horse or bull.",
      "Timed events: roping a calf, wrestling a steer, or racing a horse around barrels."
    ],
    win: [
      "Bull riding: stay on for 8 seconds holding on with one hand. Judges score both the rider and the bull, up to 100 points in total.",
      "Timed events: the fastest time wins.",
      "The season's world champion is whoever wins the most prize money."
    ],
    rulesSources: [["Bull riding (Wikipedia)", "https://en.wikipedia.org/wiki/Bull_riding"]]
  },
  "charreria": {
    what: "Mexico's national sport, a traditional rodeo.",
    how: [
      "Teams of riders perform nine events in a set order, plus the women's *escaramuza* team riding.",
      "Examples: roping a running mare's back legs, and pulling a bull down by its tail while on horseback.",
      "The \"pass of death\": leaping from your own horse onto a wild one."
    ],
    win: "Judges score each event on style and execution. Points add up for each team, and the highest team total wins."
  },
  "ice-hockey": {
    what: "A team sport on ice, played with skates, sticks and a rubber puck.",
    how: [
      "Six players per side, including a goalie, play three 20-minute periods. Body checking is allowed in men's hockey.",
      "Offside: attackers can't enter the opponent's zone before the puck.",
      "Icing: players can't shoot the puck the full length of the ice."
    ],
    win: "The team with more goals wins. A tie goes to overtime, where the next goal wins, and then to a shootout in some leagues."
  },
  "basketball": {
    what: "A team sport where you shoot a ball through a hoop 10 feet high.",
    how: "Five players per side move the ball by dribbling or passing. Teams have 24 seconds to take a shot. Games are four quarters of 10 minutes (FIBA) or 12 minutes (NBA).",
    win: [
      "A normal basket is worth 2 points.",
      "A shot from beyond the arc is worth 3.",
      "A free throw is worth 1.",
      "The team with the most points wins; a tie goes to overtime."
    ]
  },
  "arctic-sports": {
    what: "Strength and agility contests based on Arctic hunting and survival skills.",
    how: [
      "One-foot high kick: jump and kick a hanging ball, then land on the same foot.",
      "Knuckle hop: hop forward on your fists and toes.",
      "Ear pull: a tug-of-war with a loop of string around both players' ears."
    ],
    win: [
      "High kick: the target is raised after each round. You get 3 tries at each height, and the last athlete left wins.",
      "Hops and jumps: the longest distance wins.",
      "Pulls: pull your opponent over, or pull the string off their ear."
    ]
  },

  /* ---------------- SOUTH AMERICA ---------------- */
  "capoeira": {
    what: "An Afro-Brazilian martial art that looks like a dance.",
    how: "People form a circle (*roda*), clap and sing while the *berimbau*, a musical bow, sets the rhythm. Two players enter and \"play\" with kicks, sweeps, cartwheels and dodges, mostly without hitting each other. The music decides how fast or tricky the game is.",
    win: "There is usually no winner. The aim is a \"conversation\" of movement that shows skill and cunning. A game ends when the music signals, or when another player steps in."
  },
  "bjj": {
    what: "A grappling art focused on fighting on the ground.",
    how: "Fighters start standing and try to take the match to the ground, then work into strong positions and attempt joint locks or chokes.",
    win: [
      "Make your opponent \"tap out\" (give up), which ends the match straight away.",
      "Otherwise, the fighter with more points wins.",
      "Takedown or sweep: 2 points. Guard pass: 3 points. Mount or back control: 4 points."
    ],
    rulesSources: [["How does the 2025 IBJJF point system work? (FloGrappling)", "https://www.flograppling.com/articles/13493486-how-does-the-2025-ibjjf-point-system-work"]]
  },
  "pato": {
    what: "Argentina's national game, played on horseback.",
    how: "Two teams of four riders fight for a leather ball with six handles. A rider holding the ball must hold it out so rivals can try to grab it, and the tug for the ball is the highlight. A game is six periods of 8 minutes.",
    win: "Throw the ball through the other team's vertical hoop. More goals wins."
  },
  "football-brazil": {
    what: "Association football (soccer). It came from England, and Brazil became its most famous home.",
    how: "Eleven players per side play for 90 minutes. Only the goalkeeper may use their hands, and only inside their own penalty area.",
    win: "Get the whole ball over the goal line, between the posts and under the bar. More goals wins. Knockout games that are tied go to extra time and then penalties.",
    rulesSources: [["Association football (Wikipedia)", "https://en.wikipedia.org/wiki/Association_football"]]
  },
  "palin": {
    what: "A Mapuche game similar to field hockey.",
    how: "Two teams use curved wooden sticks to move a ball along a long, narrow field (about 200 × 12 m) towards the other team's line. It is very physical.",
    win: "Scoring works like a tug-of-war: when the trailing team scores, it cancels one of the leader's points. A team must get four points ahead in a row to win."
  },

  /* ---------------- OCEANIA ---------------- */
  "haka": {
    what: "A Māori ceremonial posture dance with chanted words. It is not a sport, but New Zealand teams perform it before matches.",
    how: "A group chants in rhythm while stamping, slapping their bodies, widening their eyes (*pūkana*) and poking out their tongues (*whetero*).",
    win: "There is no winner. A haka is performed to welcome guests, honour achievements or the dead, and challenge opponents.",
    winLabel: "What it's for",
    rulesSources: [["Haka (Wikipedia)", "https://en.wikipedia.org/wiki/Haka"]]
  },
  "rugby-nz": {
    what: "Rugby union, the de facto national sport of New Zealand.",
    how: "Fifteen players per side play two 40-minute halves. The ball may only be passed backwards by hand, but it can be kicked forward. Only the ball carrier can be tackled, and play restarts with scrums and lineouts.",
    win: [
      "Try (grounding the ball over the line): 5 points.",
      "Conversion kick after a try: 2 points.",
      "Penalty kick or drop goal: 3 points.",
      "The team with more points wins."
    ],
    rulesSources: [["Rugby union (Wikipedia)", "https://en.wikipedia.org/wiki/Rugby_union"]]
  },
  "surfing": {
    what: "Riding breaking waves standing on a board.",
    how: "Surfers paddle out past the breaking waves, catch a wave, stand up, and ride along it doing turns, airs and tube rides.",
    win: "In competitions, judges score each wave from 0.1 to 10, looking at commitment, difficulty, new moves, variety, speed, power and flow. The highest score in a heat advances.",
    rulesSources: [["World Surf League (Wikipedia)", "https://en.wikipedia.org/wiki/World_Surf_League"]]
  },
  "outrigger": {
    what: "Racing canoes that have a float (*ama*) on one side for balance.",
    how: "Six paddlers sit in a row: seat 1 sets the pace, the middle seats are the strongest, and seat 6 steers. The crew switches paddling sides together when the caller signals. Races run from 500 m sprints to 69 km ocean crossings.",
    win: "The first canoe across the finish line wins."
  },
  "lua": {
    what: "An ancient Hawaiian fighting art with bone-breaking, joint locks, throws and weapons.",
    how: "It is taught through teacher lineages (*kumu lua*), with drills such as spear catching and training in the surf.",
    win: "Lua is a fighting art, not a competitive sport, so there are no matches or winners.",
    winLabel: "Is there a winner?"
  },
  "ki-o-rahi": {
    what: "A Māori ball game mixing netball, handball and tag rugby.",
    how: [
      "Two teams of 8 on a circular field take turns in two roles, switching each quarter.",
      "*Kīoma* (attackers) touch the ball to boundary posts (*pou*), then run it into the centre zone to \"bank\" those points as a try.",
      "*Taniwha* (defenders) try to hit the central target (*tupu*) with the ball.",
      "Players wear tags that opponents rip off, as in tag rugby."
    ],
    win: "The team with more points at the end wins. Rules vary by region, so teams agree them before the game (*Tatu*).",
    rulesSources: [["Ki o Rahi Rules 2025 (University of Auckland)", "https://www.auckland.ac.nz/assets/on-campus/facilities-and-services/sport-and-recreation/sport/interfaculty-sports/Ki-o-Rahi-Rules-2025.pdf"]]
  }
};
