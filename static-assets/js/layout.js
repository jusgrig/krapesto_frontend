(function () {
  'use strict';

  // --- Language logic and persistence ---
  const url = new URL(window.location.href);
  const langParam = url.searchParams.get('lang');
  const storedLang = localStorage.getItem('selectedLang');

  // Resolve language: URL > localStorage > default 'lt'
  const currentLang = (langParam === 'en' || langParam === 'lt')
    ? langParam
    : (storedLang === 'en' || storedLang === 'lt')
      ? storedLang
      : 'lt';

  localStorage.setItem('selectedLang', currentLang);
  const isEnglish = currentLang === 'en';

  function getCurrentLanguage() {
    return isEnglish ? 'en' : 'lt';
  }

  // Toggle function: always set URL + storage explicitly
  function getLangSwitchHref() {
    const next = isEnglish ? 'lt' : 'en';
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('lang', next);
    localStorage.setItem('selectedLang', next);
    return nextUrl.pathname + nextUrl.search;
  }


  // Vertimai (pašalinti dublikatai EN bloke)
  const translations = {
    lt: {
      NAV_HOME: 'Pradinis',
      NAV_MENU: 'Meniu',
      NAV_DAILY_LUNCH: 'Dienos pietų meniu',
      NAV_FRIDAY_PIZZA: 'Penktadienio picų meniu',
      NAV_DRINKS: 'Gėrimų meniu',
      NAV_EVENTS: 'Renginiai',
      NAV_PIZZA_EDUCATION: 'Picų kepimo edukacija',
      NAV_COCKTAIL: 'Kokteilių degustacija',
      NAV_KIDS_BIRTHDAYS: 'Vaikų gimtadieniai',
      NAV_FAMILY_EVENTS: 'Šeimos renginiai',
      NAV_EAT_ALL: 'Valgyk kiek telpa',
      NAV_GALLERY: 'Galerija',
      NAV_CONTACT: 'Kontaktai',
      LANG_SWITCH_TEXT: 'EN',
      HOME_LOC_TITLE: 'Vieta',
      HOME_LOC_DESC:
        'Restoranas įsikūręs ramioje Dvarčionių vietoje, šalia sveikatingumo pušyno. Patogi lokacija leidžia lengvai pasiekti restoraną tiek miestiečiams, tiek svečiams iš kitų rajonų. Netoliese yra Dvarčionių ežeras su puikiai sutvarkytu paplūdimiu, paplūdimio tinklinio aikštele ir kitomis laisvalaikio pramogomis. Šalia restorano įrengta erdvi automobilių stovėjimo aikštelė, užtikrinanti patogų atvykimą bet kuriuo metu.',
      HOME_ENV_TITLE: 'Aplinka',
      HOME_ENV_DESC:
        'Restoraną supa gamta, tvarkinga teritorija ir jauki lauko erdvė su terasa bei vaikų žaidimų aikštele. Šalia esantis pušynas kviečia pasivaikščioti, sportuoti ar tiesiog atsipalaiduoti gryname ore. Antrojo aukšto erdvė puikiai tinka šventėms, renginiams ar jaukiems susibūrimams, o šiltuoju sezonu renginiai gali vykti ir lauke.',
      HOME_FOOD_TITLE: 'Maistas',
      HOME_FOOD_DESC:
        'Pirmajame aukšte įsikūrusi virtuvė, baras ir autentiškų picų kepimo zona, kur gimsta išskirtiniai skoniai. Maistas ruošiamas vietoje, daug dėmesio skiriant kokybei, skoniui ir pateikimui. Restoranas puikiai tinka tiek kasdieniams pietums, tiek šventinėms progoms.',
      WORKING_HOURS: 'Darbo laikas',
      MON_FRI: 'Pirmadienis - Penktadienis',
      SAT_SUN: 'Šeštadienis - Sekmadienis',
      CLOSED: 'Nedirbame',
      // Antraštės ir akcijos
      PIZZA_SECTION_TITLE: 'Nepamirštamo skonio neapolietiškos picos',
      PIZZA_PROMO_TEXT:
        'Akcija - penktadieniais dienos pietų metu visų picų kaina po 8,00 Eur. Skanaus!',
      // Ingredientai
      ING_TOMATO: 'Trinti itališki pomidorai',
      ING_MOZZARELLA: 'mocarela sūris',
      ING_PARMSAN: 'parmezano sūris', // palikta kaip faile; galima pataisyti į "parmezano"
      ING_PORK: 'lėtai kepta plėšyta kiauliena',
      ING_PEPERONI: 'peperoni dešra',
      ING_GRILL_ONION: 'grill svogūnai',
      ING_GRILL_PINEAPPLE: 'grill ananasai',
      ING_JALAPENO: 'jelapenas',
      ING_NDUJA: 'nduja dešra',
      ING_HAMBURG_SAUCE: 'hamburgo padažas',
      ING_CHICKEN: 'vištiena',
      ING_PROSCIUTTO: 'prosciuto kumpis',
      ING_BASIL: 'bazilikas',
      ING_RUCOLA: 'rukola',
      ING_CHERRY_TOMATOES: 'cherry pomidorai',
      ING_BALSAMIC: 'balzamiko kremas',
      ING_MUSHROOMS: 'pievagrybiai',
      ING_BACON: 'kepta šoninė',
      ING_PANKO: 'panko pabarstukai',
      ING_CHIPOTLE: 'čipotlės padažas',
      ING_ONION: 'svogūnai',
      ING_CHEDDAR: 'čederio sūris',
      ING_PICKLES: 'marinuoti agurkai',
      ING_SCARMOZA: 'skarmoza sūris',
      ING_HAM: 'kumpis',
      ING_PAPRIKA: 'paprika',
      NAME_HAVAJU: 'Havajų',
      NAME_MARGARITA: 'Margarita',
      NAME_PEPPERONI: 'Pepperoni',
      NAME_PROSCIUTO: 'Prosciuto',
      NAME_VISTIENA: 'Su Vištiena',
      NAME_TRASKIOJI: 'Traškioji',
      NAME_DIETA: 'Velniop Dietą',
      NAME_KARALIUS: 'Virtuvės Karalius',
      DESC_ALKISS:
        'Trinti itališki pomidorai, lėtai kepta plėšyta kiauliena, peperoni dešra, grill svogūnai, grill ananasai, jelapenas, nduja dešra, mocarela sūris, permezano sūris, hamburgo padažas',
      DESC_HAVAJU:
        'Trinti itališki pomidorai, vištiena, grill ananasai, prosciuto kumpis, jelapenas, mocarela sūris, permezano sūris',
      DESC_MARGARITA:
        'Trinti itališki pomidorai, bazilikas, mocarela sūris, permezano sūris',
      DESC_PEPPERONI:
        'Trinti itališki pomidorai, bazilikas, pepperoni dešra, mocarela sūris, permezano sūris',
      DESC_PROSCIUTO:
        'Trinti itališki pomidorai, mocarela sūris, rukola, prosciuto kumpis, cherry pomidorai, permezano sūris, balzamiko kremas',
      DESC_VISTIENA:
        'Trinti itališki pomidorai, vištiena, pievagrybiai, permezano sūris, rukola',
      DESC_TRASKIOJI:
        'Trinti itališki pomidorai, vištiena, kepta šoninė, mocarela sūris, permezano sūris, panko pabarstukai, čipotlės padažas',
      DESC_DIETA:
        'Trinti itališki pomidorai, lėtai kepta plėšyta kiauliena, svogūnai, čederio sūris, marinuoti agurkai, skarmoza sūris, mocarela sūris, permezano sūris, cherry pomidorai, jelapenas, hamburgo padažas',
      DESC_KARALIUS:
        'Trinti itališki pomidorai, šoninė, kumpis, grill svogūnai, čederio sūris, paprika, mocarela sūris, permezano sūris',
      FOOTER_ADDRESS_TITLE: 'Adresas',
      FOOTER_ADDRESS: 'Keramikų g. 2, Vilnius',
      FOOTER_CONTACT_TITLE: 'Kontaktai',
      FOOTER_PHONE: '+370 645 57261',
      FOOTER_EMAIL: 'info@krapesto.lt',
      FOOTER_RIGHTS: 'Visos teisės saugomos',
      EDU_DESC_1: 'Išmokite autentiškos neapolietiškos picos gamybos meno kartu su mūsų patyrusiais virtuvės meistrais. Šios praktinės edukacijos metu susipažinsite su tikros neapolietiškos picos subtilybėmis – nuo jos istorijos iki profesionalių gamybos technikų.',
    EDU_DESC_2: 'Užsiėmimo metu sužinosite, kaip gaminama autentiška picos tešla, kokios tikslios proporcijos ir ingredientai naudojami bei kodėl jų kokybė yra esminė nepriekaištingam rezultatui. Mūsų šefai supažindins su neapolietiškos picos kilme, tradicijomis ir taisyklėmis, kurios iki šiol saugomos Italijoje.',
    EDU_DESC_3: 'Praktinėje dalyje būsite pamokyti, kaip taisyklingai formuoti picos padą rankomis, kaip derinti ingredientus tarpusavyje, kad būtų išlaikytas autentiškas skonis, bei kaip teisingai paruošti picą kepimui. Kiekvienas dalyvis turės galimybę savo rankomis paruoštą picą pašauti į krosnį ir patirti tikrą neapolietiškos picos kepimo procesą.',
    EDU_DESC_4: 'Ši patirtis puikiai tinka šeimoms, draugų kompanijoms ir visiems picos mėgėjams, norintiems ne tik paragauti, bet ir išmokti kurti tikrą itališką skonį patiems.',
    AUDIENCE_LABEL: 'Tikslinė auditorija:',
    EDU_AUDIENCE_VAL: 'Šeimos, vaikai nuo 6 metų, picos mėgėjai',
    DURATION_LABEL: 'Trukmė:',
    DURATION_VAL: '2 valandos',
    ORDER_PHONE: 'Užsisakyti telefonu',
    EDU_PAGE_TITLE: 'Picų kepimo edukacija',
    EAT_ALL_DESC_1: 'Prisijunkite prie mūsų kasmetinės šventės rugsėjo 1-ąją! Tai ypatingas renginys visai šeimai, skirtas smagiai pasitikti naujus mokslo metus. Mėgaukitės neribotu skaniu maistu ir kurkite gražius prisiminimus kartu su artimaisiais.',
EAT_ALL_DESC_2: 'Sumokėję dienos mokestį galėsite ragauti maistą be apribojimų, o mažieji svečiai – ne tik skaniai pavalgyti, bet ir linksmai praleisti laiką pramogaudami.',
EAT_ALL_STATS: 'Su kiekvienais metais lankytojų skaičius vis didėja ir didėja. 2025 metų rugsėjo 1-ąją mus aplankė beveik 400 lankytojų, todėl 2026-aisiais tikimės dar gausesnio būrio svečių, gero oro ir dar geresnės nuotaikos.',
EAT_ALL_FUTURE: 'Nestovime vietoje – ruošiame dar skanesnį maistą ir dar įdomesnes pramogas jūsų vaikams. Tegul rugsėjo 1-oji tampa smagia švente visai šeimai!',
EAT_ALL_AUDIENCE_VAL: 'Šeimos su mokslo amžiaus vaikais',
EAT_ALL_FREQUENCY_VAL: 'Kartą per metus, rugsėjo 1 d.',
COCKTAIL_TITLE: 'Miksologijos menas ir skonių kelionė',
COCKTAIL_DESC_1: 'Atraskite miksologijos meną ir leiskitės į išskirtinę skonių kelionę.',
COCKTAIL_DESC_2: 'Šis renginys – tai ne tik kokteilių degustacija, bet ir pažintis su jų istorija, kilme bei subtilybėmis, kurios per šimtmečius formavo gėrimų kultūrą visame pasaulyje. Kiekvienas kokteilis pasakoja savo istoriją – nuo klasikinių receptų, gimusių XIX amžiaus baruose, iki modernių interpretacijų, atspindinčių šiandienos skonio tendencijas.',
COCKTAIL_DESC_3: 'Vakaro metu dalyviai ragaus penkis profesionaliai paruoštus kokteilius, kruopščiai atrinktus taip, kad atskleistų skirtingus skonių profilius – nuo gaivių ir lengvų iki sodrių, brandžių bei kompleksiškų. Mūsų barmenas ne tik paruoš gėrimus, bet ir papasakos apie jų kilmę, naudojamus ingredientus, skonio balansą bei tai, kaip amžius, laikas ir kultūra daro įtaką kokteilių evoliucijai.',
COCKTAIL_DESC_4: 'Tai – tik suaugusiesiems skirtas renginys, skirtas tiems, kurie vertina kokybę, estetiką ir nori patirti daugiau nei paprastą gėrimo ragavimą. Leiskite sau trumpam sustoti, atsipalaiduoti ir pasinerti į pasaulį, kuriame skonis, istorija ir atmosfera susilieja į vieną išskirtinę patirtį.',
COCKTAIL_ADULTS_ONLY: 'Renginys skirtas tik suaugusiesiems (N-21).',
KIDS_BIRTHDAYS_NAME: 'Vaikų gimtadienių šventės',
KIDS_BIRTHDAYS_DESC: 'Padarykite savo vaiko gimtadienį nepamirštamu su mūsų specialiomis vaikų gimtadienių šventėmis! Mūsų restoranas siūlo jaukią ir linksmą aplinką, kurioje jūsų mažyliai gali švęsti su draugais, mėgautis skaniu maistu ir dalyvauti įvairiose pramogose. Leiskite mums pasirūpinti viskuo – nuo dekoracijų iki maisto meniu, kad jūs galėtumėte atsipalaiduoti ir mėgautis švente kartu su savo vaiku.',
KIDS_BIRTHDAYS_Audience: 'Vaikai nuo 3 metų amžiaus',
FAMILY_EVENTS: 'Šeimos renginiai ir susibūrimai',
FAMILY_EVENTS_DESC: 'Surenkite savo šeimos šventes su mumis! Nuo jubiliejų iki susitikimų, mes sukuriame tobulą atmosferą jūsų ypatingiems momentams.',
FAMILY_EVENTS_AUDIENCE: 'Visos amžiaus grupės',
FAMILY_EVENTS_DURATION: 'Pagal užsakymą'
   },
  
    en: {



      NAV_HOME: 'Welcome',
      NAV_MENU: 'Menu',
      NAV_DAILY_LUNCH: 'Daily Lunch Menu',
      NAV_FRIDAY_PIZZA: 'Friday Pizza Menu',
      NAV_DRINKS: 'Drinks Menu',
      NAV_EVENTS: 'Events',
      NAV_PIZZA_EDUCATION: 'Pizza Education',
      NAV_COCKTAIL: 'Cocktail Degustation',
      NAV_KIDS_BIRTHDAYS: "Kids' Birthdays",
      NAV_FAMILY_EVENTS: 'Family Events',
      NAV_EAT_ALL: 'Eat as Much as You Can',
      NAV_GALLERY: 'Gallery',
      NAV_CONTACT: 'Contact',
      LANG_SWITCH_TEXT: 'LT',
      HOME_LOC_TITLE: 'Location',
      HOME_LOC_DESC:
        'The restaurant is located in a quiet area of Dvarčionys, next to a wellness pine forest. The convenient location allows easy access for both city residents and guests from other districts. Nearby is Dvarčionys Lake with a well-maintained beach and leisure activities. A spacious parking lot next to the restaurant ensures convenient arrival at any time.',
      HOME_ENV_TITLE: 'Environment',
      HOME_ENV_DESC:
        "The restaurant is surrounded by nature, a tidy territory, and a cozy outdoor space with a terrace and a children's playground. The adjacent pine forest invites you to walk, exercise, or simply relax in the fresh air. The second-floor space is perfect for celebrations and events, and during the warm season, events can also take place outdoors.",
      HOME_FOOD_TITLE: 'Food',
      HOME_FOOD_DESC:
        'The first floor houses the kitchen, bar, and authentic pizza baking zone where exceptional flavors are born. Food is prepared on-site with great attention to quality and taste. The restaurant is perfect for both daily lunches and festive occasions.',
      WORKING_HOURS: 'Opening Hours',
      MON_FRI: 'Monday - Friday',
      SAT_SUN: 'Saturday - Sunday',
      CLOSED: 'Closed',
      // Headlines and promos
      PIZZA_SECTION_TITLE: 'Unforgettable Neapolitan Pizzas',
      PIZZA_PROMO_TEXT:
        'Special offer - all pizzas for €8.00 during Friday lunch. Enjoy!',
      // Ingredients
      ING_TOMATO: 'Crushed Italian tomatoes',
      ING_MOZZARELLA: 'mozzarella',
      ING_PARMSAN: 'parmesan',
      ING_PORK: 'slow-cooked pulled pork',
      ING_PEPERONI: 'pepperoni sausage',
      ING_GRILL_ONION: 'grilled onions',
      ING_GRILL_PINEAPPLE: 'grilled pineapples',
      ING_JALAPENO: 'jalapeños',
      ING_NDUJA: 'nduja sausage',
      ING_HAMBURG_SAUCE: 'hamburger sauce',
      ING_CHICKEN: 'chicken',
      ING_PROSCIUTTO: 'prosciutto ham',
      ING_BASIL: 'basil',
      ING_RUCOLA: 'arugula',
      ING_CHERRY_TOMATOES: 'cherry tomatoes',
      ING_BALSAMIC: 'balsamic glaze',
      ING_MUSHROOMS: 'mushrooms',
      ING_BACON: 'fried bacon',
      ING_PANKO: 'panko breadcrumbs',
      ING_CHIPOTLE: 'chipotle sauce',
      ING_ONION: 'onions',
      ING_CHEDDAR: 'cheddar cheese',
      ING_PICKLES: 'pickles',
      ING_SCARMOZA: 'scamorza cheese',
      ING_HAM: 'ham',
      ING_PAPRIKA: 'bell pepper',
      NAME_ALKISS: 'Dvarčionys Hunger',
      NAME_HAVAJU: 'Hawaiian',
      NAME_MARGARITA: 'Margherita',
      NAME_PEPPERONI: 'Pepperoni',
      NAME_PROSCIUTO: 'Prosciutto',
      NAME_VISTIENA: 'With Chicken',
      NAME_TRASKIOJI: 'Crispy',
      NAME_DIETA: 'To Hell with Diet',
      NAME_KARALIUS: 'Kitchen King',
      DESC_ALKISS:
        'Crushed Italian tomatoes, slow-roasted pulled pork, pepperoni, grilled onions, grilled pineapples, jalapeños, nduja sausage, mozzarella, parmesan, hamburger sauce',
      DESC_HAVAJU:
        'Crushed Italian tomatoes, chicken, grilled pineapples, prosciutto ham, jalapeños, mozzarella, parmesan',
      DESC_MARGARITA:
        'Crushed Italian tomatoes, basil, mozzarella, parmesan',
      DESC_PEPPERONI:
        'Crushed Italian tomatoes, basil, pepperoni, mozzarella, parmesan',
      DESC_PROSCIUTO:
        'Crushed Italian tomatoes, mozzarella, arugula, prosciutto ham, cherry tomatoes, parmesan, balsamic glaze',
      DESC_VISTIENA:
        'Crushed Italian tomatoes, chicken, mushrooms, parmesan, arugula',
      DESC_TRASKIOJI:
        'Crushed Italian tomatoes, chicken, crispy bacon, mozzarella, parmesan, panko crumbs, chipotle sauce',
      DESC_DIETA:
        'Crushed Italian tomatoes, slow-roasted pulled pork, onions, cheddar, pickles, scamorza cheese, mozzarella, parmesan, cherry tomatoes, jalapeños, hamburger sauce',
      DESC_KARALIUS:
        'Crushed Italian tomatoes, bacon, ham, grilled onions, cheddar, bell peppers, mozzarella, parmesan',
      FOOTER_ADDRESS_TITLE: 'Address',
      FOOTER_ADDRESS: 'Keramikų st. 2, Vilnius',
      FOOTER_CONTACT_TITLE: 'Contacts',
      FOOTER_PHONE: '+370 645 57261',
      FOOTER_EMAIL: 'info@krapesto.lt',
      FOOTER_RIGHTS: 'All rights reserved',
      EDU_DESC_1: 'Learn the art of authentic Neapolitan pizza making with our experienced chefs. During this hands-on education, you will get acquainted with the subtleties of real Neapolitan pizza – from its history to professional production techniques.',
    EDU_DESC_2: 'During the session, you will learn how authentic pizza dough is made, what exact proportions and ingredients are used, and why their quality is essential for a perfect result. Our chefs will introduce you to the origins, traditions, and rules of Neapolitan pizza, which are still preserved in Italy.',
    EDU_DESC_3: 'In the practical part, you will be taught how to correctly shape the pizza base by hand, how to combine ingredients to maintain an authentic taste, and how to properly prepare the pizza for baking. Every participant will have the opportunity to slide their hand-made pizza into the oven and experience the real Neapolitan pizza baking process.',
    EDU_DESC_4: 'This experience is perfect for families, groups of friends, and all pizza lovers who want not only to taste but also to learn how to create a real Italian flavor themselves.',
    AUDIENCE_LABEL: 'Target audience:',
    EDU_AUDIENCE_VAL: 'Families, children from 6 years old, pizza lovers',
    DURATION_LABEL: 'Duration:',
    DURATION_VAL: '2 hours',
    ORDER_PHONE: 'Order by phone',
    EDU_PAGE_TITLE: 'Pizza Making Education',
    EAT_ALL_TITLE: 'September 1st – Eat as Much as You Can!',
EAT_ALL_DESC_1: 'Join us for our annual celebration on September 1st! This is a special event for the whole family to welcome the new school year in style. Enjoy unlimited delicious food and create beautiful memories with your loved ones.',
EAT_ALL_DESC_2: 'By paying a daily fee, you can taste our food without limits, while our younger guests can enjoy delicious meals and have fun with various entertainment options.',
EAT_ALL_STATS: 'Every year the number of visitors keeps growing. On September 1st, 2025, we had nearly 400 visitors, so in 2026 we expect an even larger crowd, great weather, and even better vibes.',
EAT_ALL_FUTURE: 'We never stand still – we are preparing even tastier food and even more exciting entertainment for your children. Let September 1st become a fun celebration for the whole family!',
EAT_ALL_AUDIENCE_VAL: 'Families with school-aged children',
EAT_ALL_FREQUENCY_VAL: 'Once a year, on September 1st',
COCKTAIL_TITLE: 'The Art of Mixology and a Journey of Flavors',
COCKTAIL_DESC_1: 'Discover the art of mixology and embark on an exclusive journey of flavors.',
COCKTAIL_DESC_2: 'This event is not just a cocktail tasting, but an introduction to their history, origins, and the subtleties that have shaped the global beverage culture over centuries. Each cocktail tells its own story – from classic recipes born in 19th-century bars to modern interpretations reflecting today’s flavor trends.',
COCKTAIL_DESC_3: 'During the evening, participants will taste five professionally prepared cocktails, carefully selected to reveal different flavor profiles – from fresh and light to rich, mature, and complex. Our bartender will not only prepare the drinks but also share stories about their origins, ingredients used, flavor balance, and how age, time, and culture influence the evolution of cocktails.',
COCKTAIL_DESC_4: 'This is an adults-only event, designed for those who appreciate quality and aesthetics and want to experience more than just a simple tasting. Allow yourself to stop for a moment, relax, and immerse yourself in a world where taste, history, and atmosphere merge into one extraordinary experience.',
COCKTAIL_ADULTS_ONLY: 'Adults only event (21+).',
KIDS_BIRTHDAYS_NAME: 'Children’s Birthday Parties',
KIDS_BIRTHDAYS_DESC: 'Make your child’s birthday unforgettable! We take care of everything — from decorations and entertainment to delicious food.',
KIDS_BIRTHDAYS_Audience: 'Children aged from 3 years',
FAMILY_EVENTS: 'Family Events and Gatherings',
FAMILY_EVENTS_DESC: 'Host your family celebrations with us! From anniversaries to get-togethers, we create the perfect atmosphere for your special moments.',
FAMILY_EVENTS_AUDIENCE: 'All age groups',
FAMILY_EVENTS_DURATION: 'By arrangement'
    }
  };

  // HERO duomenys
  const heroData = {
    lt: {
      home: {
        image: '/images/hero/index.jpg',
        alt: 'Krapesto Restaurant Interior',
        title: 'Sveiki atvykę į Krapesto!',
        subtitle: 'Vieta, kur gero maisto mėgėjai susiburia kartu',
        height: '40vh',
        extra:
          '<p style="font-size: 1.125rem; max-width: 42rem; margin: 0 auto;"></p><div style="margin-top: 2rem;"><a href="/menu/daily-lunch/" class="btn btn-primary">Žiūrėti meniu</a></div>'
      },
      about: {
        image: '/images/hero/about.jpg',
        alt: 'About Krapesto',
        title: 'Apie Krapesto',
        subtitle: 'Dienos pietų ir jūsų švenčių restoranas',
        height: '40vh',
        extra: ''
      },
      menu: {
        image: '/images/hero/meniu/menu.jpg',
        alt: 'Menu',
        title: 'Meniu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'daily-lunch': {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Lunch',
        title: 'Dienos pietų meniu',
        subtitle: 'Pirmadienis - Penktadienis, 11:00 - 16:00',
        height: '40vh',
        extra: ''
      },
      daily: {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Lunch',
        title: 'Dienos pietų meniu',
        subtitle: 'Pirmadienis - Penktadienis, 11:00 - 16:00',
        height: '40vh',
        extra: ''
      },
      'friday-pizza': {
        image: '/images/hero/meniu/friday_pizza.jpg',
        alt: 'Friday Pizza',
        title: 'Penktadienio picų meniu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      drinks: {
        image: '/images/hero/meniu/drinks.jpg',
        alt: 'Drinks',
        title: 'Gėrimų meniu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      gallery: {
        image: '/images/hero/gallery.jpg',
        alt: 'Gallery',
        title: 'Mūsų galerija',
        subtitle: 'Akimirkos iš Krapesto',
        height: '40vh',
        extra: ''
      },
      contact: {
        image: '/images/hero/contact.jpg',
        alt: 'Contact',
        title: 'Susisiekite',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'pizza-education': {
        image: '/images/hero/events/pizza-education.jpg',
        alt: 'Pizza Education',
        title: 'Picų kepimo edukacija',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'cocktail-degustation': {
        image: '/images/hero/events/cocktail-degustation.jpg',
        alt: 'Cocktail Degustation',
        title: 'Kokteilių degustacijos patirtis',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'kids-birthdays': {
        image: '/images/hero/events/kids-birthdays.jpg',
        alt: 'Kids Birthdays',
        title: 'Vaikų gimtadieniai',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'family-events': {
        image: '/images/hero/events/family-events.jpg',
        alt: 'Family Events',
        title: 'Šeimos renginiai',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'eat-as-much-as-you-can': {
        image: '/images/hero/events/eat-as-much-as-you-can.jpg',
        alt: 'Eat as Much as You Can',
        title: 'Valgyk kiek telpa',
        subtitle: '',
        height: '40vh',
        extra: ''
      }
    },
    en: {
      home: {
        image: '/images/hero/index.jpg',
        alt: 'Krapesto Restaurant Interior',
        title: 'Welcome to Krapesto',
        subtitle: 'Where Families Come Together',
        height: '40vh',
        extra:
          '<p style="font-size: 1.125rem; max-width: 42rem; margin: 0 auto;">Experience warm hospitality, delicious food, and memories that last a lifetime</p><div style="margin-top: 2rem;"><a href="/en/menu/" class="btn btn-primary">View Menu</a></div>'
      },
      about: {
        image: '/images/hero/about.jpg',
        alt: 'About Krapesto',
        title: 'About Krapesto',
        subtitle: 'Daily lunch and celebration restaurant',
        height: '40vh',
        extra: ''
      },
      menu: {
        image: '/images/hero/meniu/menu.jpg',
        alt: 'Menu',
        title: 'Menu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'daily-lunch': {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Lunch',
        title: 'Daily Lunch Menu',
        subtitle: 'Monday - Friday, 11:00 - 16:00',
        height: '40vh',
        extra: ''
      },
      daily: {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Lunch',
        title: 'Daily Lunch Menu',
        subtitle: 'Monday - Friday, 11:00 - 16:00',
        height: '40vh',
        extra: ''
      },
      'friday-pizza': {
        image: '/images/hero/meniu/friday_pizza.jpg',
        alt: 'Friday Pizza',
        title: 'Friday Pizza Menu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      drinks: {
        image: '/images/hero/meniu/drinks.jpg',
        alt: 'Drinks',
        title: 'Drinks',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      gallery: {
        image: '/images/hero/gallery.jpg',
        alt: 'Gallery',
        title: 'Our Gallery',
        subtitle: 'Moments from Krapesto',
        height: '40vh',
        extra: ''
      },
      contact: {
        image: '/images/hero/contact.jpg',
        alt: 'Contact',
        title: 'Contact Us',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'pizza-education': {
        image: '/images/hero/events/pizza-education.jpg',
        alt: 'Pizza Education',
        title: 'Pizza Making Education',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'cocktail-degustation': {
        image: '/images/hero/events/cocktail-degustation.jpg',
        alt: 'Cocktail Degustation',
        title: 'Cocktail Degustation Experience',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'kids-birthdays': {
        image: '/images/hero/events/kids-birthdays.jpg',
        alt: 'Kids Birthdays',
        title: "Kids' Birthdays",
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'family-events': {
        image: '/images/hero/events/family-events.jpg',
        alt: 'Family Events',
        title: 'Family Events',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'eat-as-much-as-you-can': {
        image: '/images/hero/events/eat-as-much-as-you-can.jpg',
        alt: 'Eat as Much as You Can',
        title: 'Eat as Much as You Can',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      day: {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Menu',
        title: "Today's Menu",
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      date: {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Menu',
        title: 'Daily Menu',
        subtitle: '',
        height: '40vh',
        extra: ''
      }
    }
  };

  /**
   * Pakeičia {PLACEHOLDERIUS} pateiktomis reikšmėmis
   */
  function replaceTemplateVars(html, vars) {
    let result = html;
    for (const [key, value] of Object.entries(vars)) {
      result = result.replace(new RegExp('\\{' + key + '\\}', 'g'), String(value));
    }
    return result;
  }

  /**
   * Parsineša HTML šabloną
   */
  async function loadTemplate(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load ' + url);
      return await response.text();
    } catch (error) {
      console.error('Error loading template:', error);
      return '';
    }
  }
  async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const html = await loadTemplate('/header.html');
    headerPlaceholder.innerHTML = html;

    // SUTVARKO KALBOS PERJUNGIKLĮ
    const langLink = headerPlaceholder.querySelector('#lang-switch');
    if (langLink) {
      langLink.href = getLangSwitchHref();
    }

    // Inicializuoja meniu (dropdowns, mobile menu paspaudimai)
    if (typeof initHeaderLogic === 'function') {
      initHeaderLogic();
    }
  }

  /**
   * Loads and renders the footer component
   */
  async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;
    const footerUrl = '/footer.html';

    try {
      const html = await loadTemplate(footerUrl);
      footerPlaceholder.innerHTML = html;

      const yearEl = document.getElementById('current-year');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
    } catch (error) {
      console.error("Error loading footer template:", error);
    }
  }

  /**
   * Returns current language code for heroData keys
   * @returns {string} 'en' or 'lt'
   */
  function getCurrentLanguage() {
    return isEnglish ? 'en' : 'lt';
  }


  async function loadHero() {
    const heroPlaceholder = document.getElementById('hero-placeholder');
    if (!heroPlaceholder) return;

    // 1) Bandome paimti puslapio pavadinimą iš body [data-hero]
    const pageAttr = document.body.getAttribute('data-hero');
    let page = pageAttr && pageAttr.trim() ? pageAttr.trim() : null;

    // 2) Jei body neturi atributo, spėjame iš URL
    if (!page) {
      let path = window.location.pathname;
      // Išvalome kelią nuo /en/, .html plėtinių ir pasvirų brūkšnių
      const cleanPath = path.replace(/^\/en\//, '/')
                            .replace(/\.html$/, '')
                            .replace(/^\/|\/$/g, '');
      page = cleanPath.split('/').pop() || 'home';
    }

    const lang = getCurrentLanguage();
    
    // Paimame duomenis iš heroData objekto pagal nustatytą kalbą ir puslapį
    const data = (heroData[lang] && heroData[lang][page]) 
                 ? heroData[lang][page] 
                 : heroData[lang]['home'];

    const html = await loadTemplate('/hero.html');

    // ŠTAI TAVO KLAUSTA VIETA:
    const vars = {
      HERO_IMAGE: data.image,
      HERO_ALT: data.alt,
      HERO_TITLE: data.title,
      HERO_SUBTITLE: data.subtitle || '',
      HERO_HEIGHT: '40vh', // Galite keisti aukštį čia
      HERO_EXTRA: data.extra || ''
    };

    heroPlaceholder.innerHTML = replaceTemplateVars(html, vars);
  }

  /**
   * Initializes the layout: header, footer, hero, i18n translations, and initMain()
   */
  async function initLayout() {
    // Wait for all components to load
    await Promise.all([loadHeader(), loadFooter(), loadHero()]);

    // Apply translations based on [data-i18n] attributes
    const lang = getCurrentLanguage();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Ensure all internal links persist the current language setting
    // This handles both 'en' and 'lt' cases to prevent language "sticking"
    document.querySelectorAll('nav a, .mobile-nav a, .footer a').forEach(link => {
      const href = link.getAttribute('href');
      // Only modify internal links that don't already have a lang parameter
      if (href && href.startsWith('/') && !href.includes('lang=')) {
        const separator = href.includes('?') ? '&' : '?';
        link.href = href + separator + 'lang=' + lang;
      }
    });

    // Run page-specific initialization if it exists
    if (typeof window.initMain === 'function') {
      window.initMain();
    }
  }

  // Expose initLayout to global scope and trigger it on DOM content load
  window.initLayout = initLayout;
  document.addEventListener('DOMContentLoaded', initLayout);
})();