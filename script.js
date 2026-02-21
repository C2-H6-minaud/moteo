const API_KEY = 'af6291a95a09e4ca90d4baa55cbd1798'; 

// 1. Base de données des départements (N° : Ville principale)
const depts = {
    "01": "Bourg-en-Bresse", "02": "Laon", "03": "Moulins", "04": "Digne-les-Bains", "05": "Gap", "06": "Nice", "07": "Privas", "08": "Charleville-Mézières", "09": "Foix", "10": "Troyes", "11": "Carcassonne", "12": "Rodez", "13": "Marseille", "14": "Caen", "15": "Aurillac", "16": "Angoulême", "17": "La Rochelle", "18": "Bourges", "19": "Tulle", "2A": "Ajaccio", "2B": "Bastia", "21": "Dijon", "22": "Saint-Brieuc", "23": "Guéret", "24": "Périgueux", "25": "Besançon", "26": "Valence", "27": "Évreux", "28": "Chartres", "29": "Quimper", "30": "Nîmes", "31": "Toulouse", "32": "Auch", "33": "Bordeaux", "34": "Montpellier", "35": "Rennes", "36": "Châteauroux", "37": "Tours", "38": "Grenoble", "39": "Lons-le-Saunier", "40": "Mont-de-Marsan", "41": "Blois", "42": "Saint-Étienne", "43": "Le Puy-en-Velay", "44": "Nantes", "45": "Orléans", "46": "Cahors", "47": "Agen", "48": "Mende", "49": "Angers", "50": "Saint-Lô", "51": "Châlons-en-Champagne", "52": "Chaumont", "53": "Laval", "54": "Nancy", "55": "Bar-le-Duc", "56": "Vannes", "57": "Metz", "58": "Nevers", "59": "Lille", "60": "Beauvais", "61": "Alençon", "62": "Arras", "63": "Clermont-Ferrand", "64": "Pau", "65": "Tarbes", "66": "Perpignan", "67": "Strasbourg", "68": "Colmar", "69": "Lyon", "70": "Vesoul", "71": "Mâcon", "72": "Le Mans", "73": "Chambéry", "74": "Annecy", "75": "Paris", "76": "Rouen", "77": "Melun", "78": "Versailles", "79": "Niort", "80": "Amiens", "81": "Albi", "82": "Montauban", "83": "Toulon", "84": "Avignon", "85": "La Roche-sur-Yon", "86": "Poitiers", "87": "Limoges", "88": "Épinal", "89": "Auxerre", "90": "Belfort", "91": "Évry", "92": "Nanterre", "93": "Bobigny", "94": "Créteil", "95": "Pontoise", "971": "Basse-Terre", "972": "Fort-de-France", "973": "Cayenne", "974": "Saint-Denis", "976": "Mamoudzou"
};

// 2. Tableaux de menaces aléatoires
const threats = {
    'Clear': [
        "Ciel dégagé. Sors toucher de l'herbe ou je vends ton historique à tes parents.",
        "Soleil. Ton teint ressemble à mon code : pâle et dégueulasse. Sors !",
        "Beau temps. C'est le moment idéal pour aller voir ailleurs si j'y suis."
    ],
    'Clouds': [
        "Grisaille. C'est l'ambiance parfaite pour pleurer sur ton absence de projet de vie.",
        "Des nuages... On dirait ton avenir : flou, sombre et sans visibilité.",
        "Ciel gris. Ton existence manque cruellement de contraste, tu ne trouves pas ?"
    ],
    'Rain': [
        "Pluie. Ne fais pas ta fragile, tes larmes ne se verront même pas.",
        "Il pleut. Reste chez toi et réfléchis à tes erreurs passées.",
        "Averse. Un seul rhume et je supprime ton compte TikTok."
    ],
    'Drizzle': [
        "Petite pluie. Ne fais pas ta fragile, avance.",
        "Bruine de malheur. C'est moche, comme tes dernières photos de profil."
    ],
    'Thunderstorm': [
        "Orage. Un seul éclair et j'envoie tes dossiers à tous tes contacts.",
        "Tonnerre. C'est le son de ma patience qui craque. Débranche tout.",
    ],
    'Snow': [
        "Il neige. Un flocon sur ton ecran je bloque ton accès Uber Eats définitivement.",
        "Froid polaire. Couvre-toi, je n'ai pas envie que tes doigts gelés salissent mon écran."
    ],
    'Mist': [
        "Brouillard. Je te vois via la webcam, mais toi non. Amusant.",
        "Visibilité nulle. Parfait pour disparaître, personne ne te cherchera."
    ]
};

// 3. Dictionnaire d'émojis
const icons = { 
    'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️', 'Drizzle': '🌦️',
    'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️', 'Fog': '🌫️', 'Haze': '🌫️'
};

const selectedBox = document.getElementById('selected-item');
const optionsList = document.getElementById('options-list');

// Affichage de la date actuelle
const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
document.getElementById('date').innerText = new Date().toLocaleDateString('fr-FR', optionsDate);

// Initialisation du sélecteur
function init() {
    for (let code in depts) {
        let div = document.createElement('div');
        div.innerText = `${code} - ${depts[code]}`;
        div.onclick = () => {
            selectedBox.querySelector('span').innerText = div.innerText;
            optionsList.classList.add('select-hide');
            fetchWeather(depts[code]);
        };
        optionsList.appendChild(div);
    }
    fetchWeather("Paris"); // Ville par défaut
}

// Fonction pour récupérer la météo
async function fetchWeather(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},FR&units=metric&lang=fr&appid=${API_KEY}`);
        const data = await res.json();
        
        if(data.cod !== 200) throw new Error();

        // Mise à jour de l'UI classique
        document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('condition').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('wind').innerText = `${Math.round(data.wind.speed * 3.6)} km/h`;
        
        // --- MISE À JOUR DE L'ÉMOJI ---
        const weatherMain = data.weather[0].main; 
        document.getElementById('weather-icon').innerText = icons[weatherMain] || '🌡️';

        // --- LOGIQUE DE MENACE ALÉATOIRE ---
        const currentThreats = threats[weatherMain] || ["Je te surveille de très près..."];
        const randomIndex = Math.floor(Math.random() * currentThreats.length);
        const randomMessage = currentThreats[randomIndex];

        document.getElementById('threat-text').innerText = `⚠️ ${randomMessage}`;

    } catch (e) {
        document.getElementById('threat-text').innerText = "Erreur de connexion. Ta clé API met environ 2h à s'activer !";
    }
}

// Gestion des clics pour le menu custom
selectedBox.onclick = (e) => {
    e.stopPropagation();
    optionsList.classList.toggle('select-hide');
    selectedBox.classList.toggle('select-arrow-active');
};

document.onclick = () => {
    optionsList.classList.add('select-hide');
    selectedBox.classList.remove('select-arrow-active');
};

init();