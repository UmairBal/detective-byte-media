import json
P=lambda k,**o:dict(k=k,**o)
S=[]
def R(id,hook,hsub,hvo,scenes,caption,tags):
    S.append(dict(id=id,hook=hook,hookSub=hsub,hookVo=hvo,scenes=scenes,caption=caption,tags=tags))
def N(cap,num,unit,panel,sub,vo,**k): return dict(t="num",cap=cap,num=num,unit=unit,panel=panel,sub=sub,vo=vo,**k)
def B(big,ital,panel,vo): return dict(t="big",big=big,ital=ital,panel=panel,vo=vo)
SP="#space #astronomy #facts #mindblowing #didyouknow #science #universe #learnsomethingnew"
OC="#ocean #marinelife #facts #mindblowing #didyouknow #nature #science #learnsomethingnew"
NA="#nature #earth #facts #mindblowing #didyouknow #science #planet #learnsomethingnew"
BO="#humanbody #biology #facts #mindblowing #didyouknow #science #health #learnsomethingnew"
HI="#history #facts #mindblowing #didyouknow #ancienthistory #learnsomethingnew #funfacts"
MA="#math #numbers #facts #mindblowing #didyouknow #science #learnsomethingnew #funfacts"
TE="#technology #tech #facts #mindblowing #didyouknow #computers #learnsomethingnew #funfacts"

R("002","A day on Venus is longer than its *year.*","And it isn't even close.","A day on Venus is longer than its year.",[
 N("ONE SPIN ON ITS AXIS",243,"EARTH DAYS",P("planet",p="venus"),"Venus spins incredibly slowly.","Venus takes about two hundred and forty-three Earth days to spin around just once."),
 N("ONE TRIP AROUND THE SUN",225,"EARTH DAYS",P("planet",p="venus",orbit=1),"Its year ends before its day does.","But it circles the Sun in only two hundred and twenty-five. So its year ends... before its day does.")],
 "A day on Venus is longer than its year. 🪐\n\nOne spin takes ~243 Earth days, but one orbit around the Sun takes only ~225.",SP)
R("003","The Sun holds *99.8%* of the Solar System's mass.","Everything else is crumbs.","The Sun holds about ninety-nine point eight percent of all the mass in our Solar System.",[
 N("THE SUN'S SHARE",99.8,"PERCENT OF ALL MASS",P("sun"),"Planets, moons, asteroids: the rest.","Every planet, moon and asteroid combined makes up just zero point two percent.",dec=1,suffix="%"),
 B("Jupiter takes most of what's *left.*","Earth is barely a speck.",P("planet",p="jupiter",compare="earth"),"And most of that leftover belongs to Jupiter. Earth is barely a speck.")],
 "The Sun holds about 99.8% of all the mass in our Solar System. ☀️\n\nEvery planet, moon and asteroid together is just ~0.2%, and most of that is Jupiter.",SP)
R("004","A sugar cube of neutron star weighs about a *billion tons.*","Heavier than a mountain.","A sugar cube of neutron star material would weigh about a billion tons.",[
 N("ONE SUGAR CUBE",1,"BILLION TONS",P("neutron"),"Matter crushed beyond imagination.","A neutron star squeezes more mass than our Sun into a ball only about twenty kilometres wide."),
 N("FASTEST KNOWN SPIN",716,"TIMES PER SECOND",P("neutron",fast=1),"Faster than a kitchen blender.","And the fastest one spins seven hundred and sixteen times every second.")],
 "A sugar-cube-sized piece of a neutron star would weigh about a billion tons. 🌟\n\nThey pack more than the Sun's mass into a ball ~20 km wide, and the fastest spins 716 times a second.",SP)
R("005","Footprints on the Moon could last *millions of years.*","No wind. No rain.","The footprints left on the Moon could last for millions of years.",[
 B("There's no *wind* on the Moon.","Nothing blows the dust away.",P("planet",p="moon"),"The Moon has no wind and no rain, so nothing wipes the dust away."),
 N("FIRST FOOTPRINTS",1969,"STILL THERE TODAY",P("planet",p="moon",compare="earth"),"Only tiny meteorites disturb them.","So the prints left in nineteen sixty-nine are almost certainly still there today.",year=1)],
 "Astronaut footprints on the Moon could last for millions of years. 👣🌕\n\nWith no wind or rain, nothing wipes them away.",SP)
R("006","About *1.3 million* Earths could fit inside the Sun.","And it's an average star.","About one point three million Earths could fit inside the Sun.",[
 N("FIT INSIDE THE SUN",1.3,"MILLION EARTHS",P("sun",compare="earth"),"Earth is the tiny dot.","The Sun is so big that about one point three million Earths could fit inside it.",dec=1),
 B("And it's just an *average* star.","Some stars would swallow it whole.",P("stars",big=1),"And yet, it's only an average star. Some giants out there could swallow it whole.")],
 "About 1.3 million Earths could fit inside the Sun. ☀️🌍\n\nAnd it's only an average-sized star.",SP)
R("007","Saturn would *float* in water.","If you had a big enough bathtub.","Saturn would float in water.",[
 N("SATURN'S DENSITY",0.69,"GRAMS PER CM³",P("planet",p="saturn"),"Water is 1.0.","Saturn is mostly hydrogen and helium, so on average it's less dense than water.",dec=2),
 B("You'd just need a bathtub *bigger than Saturn.*","Good luck finding one.",P("planet",p="saturn",float=1),"So in theory it would float. You'd just need a bathtub big enough.")],
 "Saturn would float in water. 🪐🛁\n\nIts average density (~0.69 g/cm³) is lower than water's.",SP)
R("008","The sunlight you see is about *8 minutes* old.","You're seeing the past.","The sunlight you see right now is about eight minutes old.",[
 N("SUN TO EARTH",8,"MINUTES 20 SECONDS",P("sun",compare="earth",beam=1),"Light is fast, but space is huge.","Light from the Sun takes about eight minutes and twenty seconds to reach us."),
 B("If the Sun vanished, you wouldn't *know* for 8 minutes.","It would still look like it's shining.",P("sun"),"So if the Sun suddenly disappeared, we wouldn't notice for eight whole minutes.")],
 "The sunlight hitting you right now left the Sun about 8 minutes ago. ☀️⏱️",SP)
R("009","There are more stars than grains of *sand* on Earth's beaches.","By a long way.","There are more stars in the universe than grains of sand on every beach on Earth.",[
 B("Billions of *galaxies.*","Each with billions of stars.",P("stars",galaxy=1),"The observable universe holds billions of galaxies, each with billions of stars."),
 B("More than every *beach* combined.","Scientists' best estimate.",P("land",s="beach"),"Scientists estimate that's more than every grain of sand on every beach combined.")],
 "There are more stars in the universe than grains of sand on all of Earth's beaches. ✨🏖️",SP)
R("010","A year on Mercury lasts just *88 days.*","But its days are wild.","A year on Mercury lasts just eighty-eight days.",[
 N("ONE MERCURY YEAR",88,"EARTH DAYS",P("planet",p="mercury",orbit=1),"The fastest planet.","Mercury races around the Sun in only eighty-eight Earth days."),
 N("SUNRISE TO SUNRISE",176,"EARTH DAYS",P("planet",p="mercury"),"Two full Mercury years.","But from one sunrise to the next takes a hundred and seventy-six Earth days. Two whole Mercury years.")],
 "A year on Mercury is only 88 Earth days, but one sunrise-to-sunrise day lasts 176. ☿️",SP)
R("011","Mars has a volcano *2.5 times* taller than Everest.","Olympus Mons.","Mars has a volcano about two and a half times taller than Mount Everest.",[
 N("OLYMPUS MONS",22,"KILOMETRES TALL",P("land",s="mars"),"Everest is under 9 km.","Olympus Mons rises about twenty-two kilometres high."),
 N("ITS BASE",600,"KILOMETRES WIDE",P("planet",p="mars"),"The biggest volcano in the Solar System.","And its base is around six hundred kilometres wide. The biggest volcano in the Solar System.")],
 "Olympus Mons on Mars is ~22 km tall, about 2.5x Mount Everest. 🌋🔴",SP)
R("012","Space is completely *silent.*","Not a single sound.","Space is completely silent.",[
 B("Sound needs *air* to travel.","Space is almost a perfect vacuum.",P("stars"),"Sound travels by making air vibrate, but space is almost completely empty."),
 B("Explosions in space make *no sound* at all.","Sorry, movies.",P("sun",flare=1),"So even a massive explosion out there would make no sound at all. Sorry, movies.")],
 "Space is completely silent. 🤫🌌\n\nSound needs air (or something) to travel through, and space is nearly a perfect vacuum.",SP)
R("013","Jupiter has a storm *bigger than Earth.*","And it's been raging for centuries.","Jupiter has a storm that's bigger than the entire Earth.",[
 B("The *Great Red Spot.*","Wider than our whole planet.",P("planet",p="jupiter",compare="earth"),"Jupiter's Great Red Spot is a giant storm, wider than the whole Earth."),
 N("WIND SPEEDS OVER",400,"KM PER HOUR",P("planet",p="jupiter"),"Watched for over 150 years.","Its winds blow faster than four hundred kilometres an hour, and it's been raging for well over a hundred and fifty years.",suffix="+")],
 "Jupiter's Great Red Spot is a storm wider than the entire Earth. 🌪️🪐",SP)
R("014","When dinosaurs lived, days were *shorter.*","Earth is slowing down.","When dinosaurs were alive, a day on Earth was shorter.",[
 N("70 MILLION YEARS AGO",23.5,"HOURS IN A DAY",P("planet",p="earth"),"About half an hour shorter.","Seventy million years ago, a day lasted only about twenty-three and a half hours.",dec=1),
 B("The *Moon* is slowing us down.","Days keep getting a tiny bit longer.",P("planet",p="earth",compare="moon"),"The Moon's pull works like a brake, so our days keep getting slightly longer.")],
 "70 million years ago, a day on Earth lasted only ~23.5 hours. 🦖🌍\n\nThe Moon's tidal pull is slowly slowing our planet's spin.",SP)
R("015","An octopus has three *hearts.*","And blue blood.","An octopus has three hearts.",[
 N("ONE OCTOPUS",3,"HEARTS",P("sea",c="octopus"),"Two for the gills, one for the body.","Two hearts pump blood to the gills, and the third pumps it around the rest of the body."),
 B("And its blood is *blue.*","Copper, not iron.",P("sea",c="octopus"),"And its blood is blue, because it uses copper instead of iron to carry oxygen.")],
 "An octopus has three hearts and blue blood. 🐙💙",OC)
R("016","A blue whale's heart can weigh about *180 kg.*","The biggest heart on Earth.","A blue whale's heart can weigh about a hundred and eighty kilograms.",[
 N("ONE HEART",180,"KILOGRAMS",P("sea",c="whale"),"Heavier than two adults.","That's heavier than two grown adults put together."),
 B("The *largest animal* ever known.","Bigger than any dinosaur.",P("sea",c="whale"),"The blue whale is the largest animal known to have ever lived. Bigger than any dinosaur.")],
 "A blue whale's heart can weigh around 180 kg. 🐋❤️\n\nIt's the largest animal known to have ever lived.",OC)
R("017","One jellyfish can, in a way, live *forever.*","Meet Turritopsis dohrnii.","There's a jellyfish that can, in a way, live forever.",[
 B("It turns back into a *baby.*","When it's hurt or stressed.",P("sea",c="jelly"),"When it's hurt or stressed, this tiny jellyfish can turn back into its baby stage..."),
 B("And starts life *all over again.*","Scientists call it biologically immortal.",P("sea",c="jelly"),"...and start its whole life over again. Scientists call it biologically immortal.")],
 "The 'immortal jellyfish' (Turritopsis dohrnii) can turn back into its baby stage and start life over. 🪼♾️",OC)
R("018","Over *80%* of the ocean is still unexplored.","Right here on Earth.","More than eighty percent of the ocean has never been explored.",[
 N("OUR OWN OCEAN",80,"PERCENT UNEXPLORED",P("sea",c="deep"),"Dark, deep and mostly unseen.","Most of the deep ocean has never been seen by humans.",suffix="%"),
 B("We have better maps of *Mars.*","Than of our own seafloor.",P("planet",p="mars"),"In fact, we have more detailed maps of Mars than of our own seafloor.")],
 "More than 80% of the ocean remains unexplored. 🌊\n\nWe have better maps of Mars than of our own seafloor.",OC)
R("019","Sharks don't have a single *bone.*","Not one.","Sharks don't have a single bone in their bodies.",[
 B("Their skeleton is *cartilage.*","The same stuff in your nose and ears.",P("sea",c="shark"),"Their skeleton is made of cartilage, the same flexible stuff in your nose and ears."),
 B("Lighter and more *flexible.*","Perfect for fast turns.",P("sea",c="shark"),"It's lighter and bendier than bone, which helps them turn fast and save energy.")],
 "Sharks don't have a single bone. 🦈\n\nTheir skeleton is made entirely of cartilage.",OC)
R("020","Some sharks can live for about *400 years.*","The Greenland shark.","Some sharks can live for around four hundred years.",[
 N("GREENLAND SHARK",400,"YEARS",P("sea",c="deep",shark=1),"The longest-lived vertebrate known.","Scientists estimate the Greenland shark can live for around four hundred years."),
 N("IT GROWS ABOUT",1,"CENTIMETRE A YEAR",P("sea",c="deep",shark=1),"Some alive today may be older than the USA.","It grows only about a centimetre a year, so some swimming today may be older than the United States.")],
 "Greenland sharks can live for around 400 years. 🦈⏳",OC)
R("021","Octopuses can *taste* with their arms.","Every sucker tastes.","Octopuses can taste with their arms.",[
 B("Their suckers *taste* what they touch.","Packed with chemical sensors.",P("sea",c="octopus"),"Their suckers are packed with chemical sensors, so they taste whatever they touch."),
 N("NEURONS IN THE ARMS",66,"PERCENT",P("sea",c="octopus"),"Each arm almost thinks for itself.","And about two thirds of its neurons are in its arms, so each arm can almost think for itself.",suffix="%")],
 "Octopuses taste with their suckers, and about two-thirds of their neurons are in their arms. 🐙🧠",OC)
R("022","You can see the Great Barrier Reef from *space.*","Built by tiny animals.","You can see the Great Barrier Reef from space.",[
 N("GREAT BARRIER REEF",2300,"KILOMETRES LONG",P("sea",c="reef"),"Off the coast of Australia.","It stretches for about two thousand three hundred kilometres."),
 B("Built by *living things.*","Tiny coral animals.",P("sea",c="reef"),"It's the largest structure on Earth built by living things: tiny coral animals.")],
 "The Great Barrier Reef can be seen from space. 🪸🛰️\n\nIt's the largest structure built by living things.",OC)
R("023","Wombats poop *cubes.*","Yes, actual cubes.","Wombats poop cubes.",[
 N("CUBES PER NIGHT",100,"UP TO",P("obj",o="cubes"),"The only animal known to do it.","Wombats are the only animals known to make cube-shaped poop, up to a hundred cubes a night."),
 B("Their *intestines* shape them.","So they don't roll away.",P("obj",o="cubes"),"Their intestines have stiff and stretchy sections that mould it into cubes, so it doesn't roll off the rocks where they leave it.")],
 "Wombats poop cubes. 🟫 Yes, really.\n\nTheir intestines shape it, and the cubes don't roll away from the spots they mark.",NA)
R("024","A tree alive today is nearly *5,000 years old.*","Older than the pyramids.","There's a tree alive today that's nearly five thousand years old.",[
 N("BRISTLECONE PINE",4800,"YEARS OLD",P("land",s="oldtree"),"Nicknamed Methuselah.","A bristlecone pine in California, nicknamed Methuselah, is about four thousand eight hundred years old."),
 B("Older than the *Great Pyramid.*","Of Giza.",P("land",s="desert",pyramids=1),"That makes it older than the Great Pyramid of Giza.")],
 "A bristlecone pine called Methuselah is ~4,800 years old. 🌲\n\nIt's older than the Great Pyramid of Giza.",NA)
R("025","Earth has more *trees* than the Milky Way has stars.","Trillions of them.","Earth has more trees than there are stars in the Milky Way.",[
 N("TREES ON EARTH",3,"TRILLION",P("land",s="forest"),"About 3 trillion.","There are about three trillion trees on Earth."),
 N("STARS IN THE MILKY WAY",400,"BILLION, AT MOST",P("stars",galaxy=1),"Probably between 100 and 400 billion.","Our galaxy has somewhere between one hundred and four hundred billion stars.")],
 "Earth has ~3 trillion trees, more than the 100–400 billion stars in the Milky Way. 🌳✨",NA)
R("026","Some bamboo can grow almost *1 metre* in a day.","You could almost watch it.","Some bamboo can grow almost one metre in a single day.",[
 N("RECORD GROWTH",91,"CM IN ONE DAY",P("land",s="bamboo"),"The fastest-growing plant.","Some species can grow up to ninety-one centimetres in a single day."),
 N("THAT'S ABOUT",4,"CM EVERY HOUR",P("land",s="bamboo"),"You could almost watch it grow.","That's nearly four centimetres an hour. You could almost watch it grow.")],
 "Some bamboo can grow up to 91 cm in one day. 🎋",NA)
R("027","Honey never *spoils.*","Ever.","Honey never spoils.",[
 B("Edible honey found in *ancient tombs.*","Around 3,000 years old.",P("obj",o="honey"),"Archaeologists have found honey in ancient Egyptian tombs that was around three thousand years old, and still edible."),
 B("Germs can't *survive* in it.","Too little water, too much acid.",P("obj",o="honey"),"Honey has so little water and so much acid that bacteria simply can't survive in it.")],
 "Honey never spoils. 🍯\n\nArchaeologists have found ~3,000-year-old honey in Egyptian tombs that was still edible.",NA)
R("028","Bananas are *berries.* Strawberries aren't.","Botany is weird.","Bananas are berries. Strawberries aren't.",[
 B("A berry grows from *one flower* with one ovary.","Bananas fit perfectly.",P("obj",o="fruit"),"In botany, a berry grows from a single flower with one ovary, and bananas fit perfectly."),
 B("Strawberries *don't.*","Their seeds are on the outside.",P("obj",o="fruit",focus=1),"Strawberries don't. Their seeds are on the outside, so they're not true berries at all.")],
 "Bananas are berries, but strawberries aren't. 🍌🍓",NA)
R("029","Lightning is about *5 times* hotter than the Sun's surface.","In a split second.","Lightning is about five times hotter than the surface of the Sun.",[
 N("ONE LIGHTNING BOLT",30000,"°C",P("land",s="storm"),"Hot enough to melt sand into glass.","A lightning bolt can heat the air to around thirty thousand degrees Celsius."),
 N("THE SUN'S SURFACE",5500,"°C",P("sun"),"Lightning wins easily.","The surface of the Sun is only about five thousand five hundred degrees.")],
 "A lightning bolt can be ~5x hotter than the surface of the Sun. ⚡☀️",NA)
R("030","Mount Everest is still *growing.*","Every single year.","Mount Everest is still growing.",[
 N("EVEREST RISES ABOUT",4,"MILLIMETRES A YEAR",P("land",s="mountain"),"Slowly, but surely.","Everest grows by roughly four millimetres every year."),
 B("India is still *pushing* into Asia.","Lifting the Himalayas higher.",P("land",s="mountain"),"That's because India is still pushing into Asia, slowly lifting the Himalayas.")],
 "Mount Everest grows ~4 mm every year. 🏔️\n\nIndia's tectonic plate is still pushing into Asia.",NA)
R("031","The largest desert on Earth is *Antarctica.*","Not the Sahara.","The largest desert on Earth is Antarctica.",[
 B("A desert is about *rain*, not heat.","Antarctica barely gets any.",P("land",s="ice"),"A desert is defined by how little rain or snow it gets, not by heat. And Antarctica barely gets any."),
 N("ANTARCTICA",14,"MILLION KM²",P("land",s="ice"),"Bigger than the Sahara.","At about fourteen million square kilometres, it's bigger than the Sahara.")],
 "The largest desert on Earth is Antarctica. 🧊\n\nDeserts are defined by low precipitation, not heat.",NA)
R("032","The Sahara used to be *green.*","With lakes and hippos.","The Sahara desert used to be green.",[
 B("Lakes, grass and *hippos.*","Around 6,000 to 11,000 years ago.",P("land",s="desert",green=1),"Between about eleven and six thousand years ago, the Sahara had lakes, grasslands and even hippos."),
 B("Then the *rains* moved away.","Earth's slow wobble shifted the monsoons.",P("land",s="desert"),"Slow changes in Earth's orbit shifted the monsoon rains, and the desert returned.")],
 "The Sahara was green ~6,000–11,000 years ago, with lakes, grassland and hippos. 🌿🐪",NA)
R("033","Your heart beats about *100,000* times a day.","Without a break.","Your heart beats about a hundred thousand times every day.",[
 N("EVERY DAY",100000,"HEARTBEATS",P("body",o="heart"),"About 70 beats a minute.","At about seventy beats a minute, that's roughly a hundred thousand beats a day."),
 N("IN A LIFETIME",3,"BILLION BEATS",P("body",o="heart"),"Without ever taking a break.","Over a lifetime, that adds up to around three billion beats, without ever stopping.")],
 "Your heart beats ~100,000 times a day, about 3 billion times in a lifetime. ❤️",BO)
R("034","Babies have nearly *100 more* bones than adults.","Where do they go?","Babies are born with nearly a hundred more bones than adults.",[
 N("AT BIRTH",300,"BONES",P("body",o="skeleton"),"Around 270 to 300.","A newborn has around three hundred bones."),
 N("IN ADULTS",206,"BONES",P("body",o="skeleton"),"Many fuse together as we grow.","As we grow, many of them fuse together, leaving two hundred and six.")],
 "Babies have ~300 bones; adults have 206. 🦴\n\nMany fuse together as we grow.",BO)
R("035","Your brain uses about *20%* of your energy.","For just 2% of your weight.","Your brain uses about twenty percent of your body's energy.",[
 N("ENERGY USED",20,"PERCENT",P("body",o="brain"),"Even while you sleep.","Your brain burns about a fifth of your energy, even while you're asleep.",suffix="%"),
 N("BODY WEIGHT",2,"PERCENT",P("body",o="brain"),"Thinking is expensive.","Yet it's only about two percent of your body weight.",suffix="%")],
 "Your brain is ~2% of your body weight but uses ~20% of your energy. 🧠⚡",BO)
R("036","Your stomach gets a new lining every *few days.*","Here's why.","Your stomach replaces its lining every few days.",[
 B("Its acid is *brutal.*","The lining is always under attack.",P("body",o="figure",glow="stomach"),"Your stomach is full of strong acid, so its lining is constantly under attack."),
 N("NEW SURFACE CELLS EVERY",3,"TO 5 DAYS",P("body",o="figure",glow="stomach"),"Constantly rebuilding itself.","To survive, it replaces its surface cells every three to five days.")],
 "Your stomach replaces its surface lining every 3–5 days. 🔁",BO)
R("037","The DNA in one cell is about *2 metres* long.","Packed into a tiny space.","The DNA in just one of your cells is about two metres long.",[
 N("IN ONE CELL",2,"METRES OF DNA",P("body",o="dna"),"Coiled up incredibly tightly.","Uncoiled, the DNA in a single cell would stretch about two metres."),
 B("All of it could reach the *Sun* and back.","Many times over.",P("sun",compare="earth"),"And all the DNA in your body could stretch to the Sun and back many times over.")],
 "The DNA in one of your cells is ~2 metres long. 🧬\n\nAll of yours could reach the Sun and back many times.",BO)
R("038","You're made of about *37 trillion* cells.","And they keep changing.","You're made of about thirty-seven trillion cells.",[
 N("YOUR BODY",37,"TRILLION CELLS",P("body",o="figure"),"A rough scientific estimate.","Scientists estimate the human body has about thirty-seven trillion cells."),
 N("REPLACED EVERY SECOND",3.8,"MILLION CELLS",P("body",o="dna"),"You're always rebuilding yourself.","And millions of them are replaced every single second.",dec=1)],
 "You're made of ~37 trillion cells, and millions are replaced every second. 🔬",BO)
R("039","Your body actually *glows.*","Just not enough to see.","Your body actually glows in the dark.",[
 B("A very faint *light.*","About 1,000 times too weak to see.",P("body",o="figure",glow="all"),"Scientists in Japan found the human body gives off a faint light, about a thousand times too weak for our eyes."),
 B("Brightest in the *afternoon.*","And strongest around the face.",P("body",o="figure",glow="face"),"It's brightest in the late afternoon, and strongest around the face.")],
 "Your body gives off a faint visible glow, about 1,000x too weak for your eyes to see. ✨🧍",BO)
R("040","You're slightly *taller* in the morning.","Gravity is to blame.","You're slightly taller in the morning.",[
 N("WHEN YOU WAKE UP",1,"CM TALLER",P("body",o="skeleton"),"Give or take.","Most people are about a centimetre taller right after they wake up.",prefix="~"),
 B("Gravity squeezes your *spine.*","The discs recover while you sleep.",P("body",o="skeleton",spine=1),"During the day gravity squeezes the discs in your spine, and they recover while you sleep.")],
 "You're about 1 cm taller in the morning. 📏\n\nGravity compresses your spinal discs during the day.",BO)
R("041","Your eyes can tell apart about *1 million* colours.","With just 3 types of cells.","Your eyes can tell apart about a million different colours.",[
 N("THE HUMAN EYE",1,"MILLION COLOURS",P("body",o="eye"),"A rough estimate.","The human eye can distinguish around a million different colours."),
 N("USING ONLY",3,"TYPES OF CONE CELLS",P("body",o="eye"),"Red, green and blue.","And it does that with only three types of colour-sensing cells.")],
 "Your eyes can tell apart ~1 million colours using just 3 types of cone cells. 👁️🌈",BO)
R("042","Cleopatra lived closer to the *Moon landing* than to the Great Pyramid.","Time is strange.","Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.",[
 N("THE GREAT PYRAMID WAS",2500,"YEARS OLD",P("land",s="desert",pyramids=1),"When Cleopatra was born.","The Great Pyramid was already about two and a half thousand years old when Cleopatra was born."),
 N("THE MOON LANDING CAME",2000,"YEARS LATER",P("planet",p="moon",compare="earth"),"Only about 2,000 years after her.","The Moon landing came only about two thousand years after her.")],
 "Cleopatra lived closer to the Moon landing than to the building of the Great Pyramid. 🏺🚀",HI)
R("043","Oxford University is older than the *Aztec Empire.*","By centuries.","Oxford University is older than the Aztec Empire.",[
 N("TEACHING AT OXFORD",1096,"AROUND",P("obj",o="castle"),"England.","Teaching at Oxford began around ten ninety-six.",year=1),
 N("TENOCHTITLAN FOUNDED",1325,"AZTEC CAPITAL",P("land",s="desert",step=1),"Over 200 years later.","The Aztec capital, Tenochtitlan, wasn't founded until thirteen twenty-five.",year=1)],
 "Oxford University is older than the Aztec Empire. 🏛️",HI)
R("044","The Great Pyramid was the tallest building for *3,800 years.*","Nothing came close.","The Great Pyramid was the tallest building in the world for about three thousand eight hundred years.",[
 N("AT THE TOP FOR",3800,"YEARS",P("land",s="desert",pyramids=1),"Built around 2560 BC.","Built around two thousand five hundred and sixty BC, it stayed the tallest for about three thousand eight hundred years."),
 B("Finally beaten in *1311.*","By England's Lincoln Cathedral.",P("obj",o="castle"),"It was finally beaten in thirteen eleven, by Lincoln Cathedral in England.")],
 "The Great Pyramid was the world's tallest building for ~3,800 years. 🔺",HI)
R("045","Mammoths were still alive when the *pyramids* were built.","Really.","Woolly mammoths were still alive when the Great Pyramid was built.",[
 B("The last mammoths lived on *Wrangel Island.*","Until about 4,000 years ago.",P("land",s="ice"),"The last woolly mammoths survived on Wrangel Island until about four thousand years ago."),
 N("GREAT PYRAMID BUILT",4500,"YEARS AGO",P("land",s="desert",pyramids=1),"The overlap is real.","The Great Pyramid was built about four thousand five hundred years ago.")],
 "Woolly mammoths were still alive when the Great Pyramid was built. 🦣🔺",HI)
R("046","The shortest war in history lasted under *an hour.*","38 minutes.","The shortest war in history lasted less than an hour.",[
 N("ANGLO-ZANZIBAR WAR",38,"MINUTES",P("obj",o="clock"),"27 August 1896.","In eighteen ninety-six, Britain and Zanzibar fought a war that lasted about thirty-eight minutes."),
 B("Over before most people *knew* it started.","History's shortest war.",P("obj",o="clock"),"It was over before most people even knew it had started.")],
 "The Anglo-Zanzibar War of 1896 lasted about 38 minutes. ⏱️",HI)
R("047","Nintendo was founded in *1889.*","Before cars were common.","Nintendo was founded in eighteen eighty-nine.",[
 N("NINTENDO FOUNDED",1889,"KYOTO, JAPAN",P("obj",o="cards"),"Over 130 years ago.","Nintendo started in Kyoto, Japan, in eighteen eighty-nine.",year=1),
 B("It started by making *playing cards.*","Video games came almost 90 years later.",P("obj",o="cards"),"It began by making playing cards. Video games came almost ninety years later.")],
 "Nintendo was founded in 1889, as a playing card company. 🎴",HI)
R("048","The fax machine was invented before the *telephone.*","Decades before.","The fax machine was invented before the telephone.",[
 N("FIRST FAX PATENT",1843,"ALEXANDER BAIN",P("obj",o="paper",lines=1),"A Scottish inventor.","Scottish inventor Alexander Bain patented an early fax machine in eighteen forty-three.",year=1),
 N("TELEPHONE PATENT",1876,"33 YEARS LATER",P("obj",o="phone"),"Fax came first.","The telephone was patented thirty-three years later, in eighteen seventy-six.",year=1)],
 "The fax machine (1843) was invented before the telephone (1876). 📠☎️",HI)
R("049","You can't see the Great Wall of China from *space.*","It's a myth.","You can't actually see the Great Wall of China from space with your eyes.",[
 B("It's long, but very *narrow.*","Just a few metres wide.",P("obj",o="wall"),"The wall is incredibly long, but only a few metres wide."),
 B("Astronauts *can't* spot it.","Not with the naked eye.",P("planet",p="earth"),"Astronauts say it's basically impossible to spot with the naked eye from orbit.")],
 "You can't see the Great Wall of China from space with the naked eye. 🧱🛰️",HI)
R("050","The first computer bug was a real *moth.*","Taped into a logbook.","The first computer bug was an actual moth.",[
 N("HARVARD MARK II",1947,"MOTH FOUND IN A RELAY",P("obj",o="moth"),"Taped into the logbook.","In nineteen forty-seven, engineers found a moth stuck inside the Harvard Mark Two computer.",year=1),
 B("But the word *bug* was much older.","Edison used it in the 1870s.",P("obj",o="moth"),"But the joke worked because engineers already called glitches bugs. Edison used the word in the eighteen seventies.")],
 "The first 'actual case of bug being found' was a moth in 1947, but engineers were already saying 'bug' for decades. 🦋💻",TE)
R("051","Every good shuffle likely creates an order that's *never existed.*","Ever.","Every time you shuffle a deck properly, you probably create an order that has never existed before.",[
 N("A DECK HAS",52,"CARDS",P("obj",o="cards"),"Simple, right?","A deck has just fifty-two cards."),
 B("But *8* followed by 67 zeros orders.","More than atoms on Earth.",P("obj",o="cards",fan=1),"But they can be arranged in about eight followed by sixty-seven zeros different ways. More than the atoms on Earth.")],
 "A well-shuffled deck is almost certainly in an order that has never existed before. 🃏\n\n52! ≈ 8 × 10^67.",MA)
R("052","There are more possible chess games than *atoms* in the universe.","Way more.","There are more possible chess games than atoms in the observable universe.",[
 B("About *10¹²⁰* possible games.","Claude Shannon's famous estimate.",P("obj",o="chess"),"Mathematician Claude Shannon estimated around ten to the power of a hundred and twenty possible games."),
 B("Only about *10⁸⁰* atoms.","In the whole observable universe.",P("stars",galaxy=1),"The whole observable universe has only about ten to the power of eighty atoms.")],
 "There are more possible chess games (~10^120) than atoms in the observable universe (~10^80). ♟️🌌",MA)
R("053","In a room of just *23 people*, two probably share a birthday.","The birthday paradox.","In a room of just twenty-three people, it's more likely than not that two share a birthday.",[
 N("A ROOM OF",23,"PEOPLE",P("obj",o="dots"),"Sounds too small, right?","With just twenty-three people in a room..."),
 N("CHANCE OF A SHARED BIRTHDAY",50,"PERCENT",P("obj",o="dots",match=1),"With 70 people, it's over 99.9%.","...the chance two share a birthday is just over fifty percent. With seventy people, it's over ninety-nine point nine.",suffix="%")],
 "In a room of 23 people, there's a >50% chance two share a birthday. 🎂🎉",MA)
R("054","Fold paper *42 times* and it would reach the Moon.","In theory.","In theory, if you folded a sheet of paper forty-two times, it would reach the Moon.",[
 N("FOLD IT",42,"TIMES",P("obj",o="paper"),"Each fold doubles the thickness.","Each fold doubles its thickness."),
 N("IT WOULD BE ABOUT",440000,"KILOMETRES THICK",P("planet",p="moon",compare="earth"),"The Moon is 384,400 km away.","After forty-two folds, it would be about four hundred and forty thousand kilometres thick. Past the Moon.")],
 "In theory, folding a paper 42 times would make it thick enough to reach the Moon. 📄🌕",MA)
R("055","Zero wasn't always a *number.*","It had to be invented.","Zero wasn't always treated as a number.",[
 N("BRAHMAGUPTA'S RULES FOR ZERO",628,"AD, INDIA",P("obj",o="zero"),"The first known rules.","In six twenty-eight AD, the Indian mathematician Brahmagupta wrote the first known rules for using zero as a number.",year=1),
 B("No zero, no *computers.*","Everything digital runs on 0s and 1s.",P("obj",o="computer",bits=1),"Without zero, there'd be no computers. Everything digital runs on zeros and ones.")],
 "Zero wasn't always a number. In 628 AD, Brahmagupta wrote the first known rules for it. 0️⃣",MA)
R("056","The first gigabyte hard drive weighed about *250 kg.*","And cost a fortune.","The first gigabyte hard drive weighed about two hundred and fifty kilograms.",[
 N("IBM 3380, 1980",250,"KILOGRAMS",P("obj",o="hdd"),"Size of a refrigerator.","In nineteen eighty, IBM's first gigabyte-class hard drive weighed about two hundred and fifty kilograms."),
 N("IT COST AROUND",40000,"DOLLARS",P("obj",o="hdd"),"Today a tiny card holds far more.","And it cost around forty thousand dollars.",prefix="$")],
 "The first gigabyte hard drive (IBM 3380, 1980) weighed ~250 kg and cost ~$40,000. 💾",TE)
R("057","Your phone has *millions of times* more memory than Apollo 11's computer.","And it reached the Moon.","Your phone has millions of times more memory than the computer that took Apollo eleven to the Moon.",[
 N("APOLLO GUIDANCE COMPUTER",4,"KB OF MEMORY",P("planet",p="moon",compare="earth"),"Roughly 4 kilobytes.","The Apollo guidance computer had only about four kilobytes of working memory."),
 B("Your phone has *millions* of times more.","And Apollo still landed on the Moon.",P("obj",o="computer"),"A modern phone has millions of times more. And that tiny computer still landed humans on the Moon.")],
 "Apollo 11's guidance computer had about 4 KB of memory. Your phone has millions of times more. 🚀📱",TE)
R("058","The first website ever made is still *online.*","You can visit it.","The very first website ever made is still online.",[
 N("THE FIRST WEBSITE",1991,"CERN",P("obj",o="computer",web=1),"Made by Tim Berners-Lee.","Tim Berners-Lee published it at CERN in nineteen ninety-one.",year=1),
 B("*info.cern.ch*","You can still visit it today.",P("obj",o="computer",web=1),"And you can still visit it today, at info dot cern dot ch.")],
 "The first website ever made (1991) is still online at info.cern.ch. 🌐",TE)
R("059","Email is older than the *World Wide Web.*","By about 20 years.","Email is older than the World Wide Web.",[
 N("FIRST NETWORK EMAIL",1971,"RAY TOMLINSON",P("obj",o="envelope"),"He picked the @ sign.","Ray Tomlinson sent the first network email in nineteen seventy-one, and picked the at sign.",year=1),
 N("THE WEB GOES PUBLIC",1991,"20 YEARS LATER",P("obj",o="computer",web=1),"Email came first.","The World Wide Web only went public twenty years later, in nineteen ninety-one.",year=1)],
 "Email (1971) is about 20 years older than the World Wide Web (1991). 📧",TE)
R("060","Wi-Fi doesn't actually stand for *anything.*","Surprise.","Wi-Fi doesn't actually stand for anything.",[
 B("Not *Wireless Fidelity.*","That's a myth.",P("obj",o="wifi"),"It's not short for wireless fidelity. That's a myth."),
 B("Just a *catchy name.*","Picked by a branding company in 1999.",P("obj",o="wifi"),"It was simply a catchy name picked by a branding company in nineteen ninety-nine.")],
 "Wi-Fi doesn't stand for 'Wireless Fidelity', or anything at all. 📶",TE)
assert len(S)==59, len(S)
json.dump(S,open("specs.json","w"),indent=1,ensure_ascii=False)
print(len(S))
