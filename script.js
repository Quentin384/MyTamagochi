/* Bouton activités */
const carotteImg = document.getElementById('carotte');
const grainesImg = document.getElementById('graines');
const bookImg = document.getElementById('book');
const singImg = document.getElementById('sing');
const sleepImg = document.getElementById('sleep');
const sportImg = document.getElementById('sport');
const wakeUpBtn = document.getElementById('wakeUp');

/* Input utilisateur */
const userInput = document.getElementById('input');
const validate = document.getElementById('button');

/* Output affichage */
const interactionMsg = document.getElementById('interactionMsg');
const tamaImg = document.getElementById('tamaImg');

/* Jauges d'etat */ 
const hungerBar = document.getElementById('hungerBar');
const energyBar = document.getElementById('energyBar');
const moodBar = document.getElementById('moodBar');

/* Musique */
const music = document.getElementById('musique');
const singing = document.getElementById('musique-singing');

let Tama = null;
let isSleeping = false;

/* Classe Tamagotchi */
class Tamagotchi {
    constructor(name) {
        this.name = name;
        this.hunger = 100;
        this.energy = 100;
        this.mood = 100;
    }

    activités(item) {
        this.hunger = Math.min(this.hunger + item.nutritionValue, 100);
        this.energy = Math.min(this.energy + item.energyValue, 100);
        this.mood = Math.min(this.mood + item.moodValue, 100);
    }

    passTime() {
        this.hunger = Math.max(this.hunger - 10, 0);
        this.energy = Math.max(this.energy - 10, 0);
        this.mood = Math.max(this.mood - 10, 0);
    }
}

/* Classe des activités */
class ActivitésItem {
    constructor(name, nutritionValue, energyValue, moodValue) {
        this.name = name;
        this.nutritionValue = nutritionValue;
        this.energyValue = energyValue;
        this.moodValue = moodValue;
    }
}

// Instances des activités
const carotte = new ActivitésItem("une carotte", 10, 0, 5);
const graines = new ActivitésItem("des graines", 5, 5, 0);
const book = new ActivitésItem("un livre", 0, 0, 5);
const sing = new ActivitésItem("une chanson", 0, -5, 10);
const sleep = new ActivitésItem("au chaud dans son lit", 0, 100, 50);
const sport = new ActivitésItem("et il est super content !", 0, -5, 10);

// Mise à jour les jauges
function updateGauges() {
    if (!Tama) return;
    hungerBar.value = Tama.hunger;
    energyBar.value = Tama.energy;
    moodBar.value = Tama.mood;
}

// Fonction de nettoyage du nom
function nettoyerNom(nom) {
    return nom
        .toLowerCase()                   
        .normalize("NFD")                           
        .replace(/[\u0300-\u036f]/g, "")            
        .replace(/[^a-z0-9]/g, "");                
}

// Création du Tamagotchi
validate.addEventListener('click', (event) => {
    event.preventDefault();

    const TamaName = userInput.value.trim();
    const nomNettoye = nettoyerNom(TamaName);    
    userInput.value = '';

    // Liste des mots interdits
    const motsInterdits = [
        "con", 
    ];

    if (TamaName === '') {
        alert("Veuillez entrer un nom pour votre Tamagotchi.");
        return;
    }

    if (motsInterdits.some(mot => nomNettoye.includes(mot))) {
        alert("Ce nom n'est pas autorisé. Choisissez un nom plus approprié.");
        return;
    }

    Tama = new Tamagotchi(TamaName);
    tamaImg.style.visibility = "visible";
    interactionMsg.textContent = `${Tama.name} est né ! Prends soin de lui.`;

    updateGauges();
    jouerMusique();

    document.querySelector('.chooseName').style.display = 'none';
    const tamaNameDisplay = document.getElementById('tamaName');
    tamaNameDisplay.style.display = 'block';
    tamaNameDisplay.textContent = `${Tama.name}`;
});

// Décrémentation de l'état
setInterval(() => {
    if (Tama && !isSleeping) {
        Tama.passTime();
        updateGauges();

        if (Tama.mood <= 30) {
            tamaImg.src = 'image/sad.jpg';
            interactionMsg.textContent = `Ton Tamagotchi est triste !`;
        } else if (Tama.energy <= 30) {
            tamaImg.src = 'image/tired.jpg';
            interactionMsg.textContent = `Ton Tamagotchi est fatigué !`;
        } else if (Tama.hunger <= 30) {
            tamaImg.src = 'image/hungry.png';
            interactionMsg.textContent = `Ton Tamagotchi a faim !`;
        } else {
            tamaImg.src = 'image/Tamagochi.jpg';
            interactionMsg.textContent = ``;
        }
    }
}, 20000); //                                      <<<<<<<<<<<<<<<<<<<<<<<<  Le timer de decrementation est ici 

// Gestion des activités
function effectuerActivité(item, imagePath, actionText) {
    if (!Tama) {
        alert("Veuillez d'abord créer votre Tamagotchi.");
        return;
    }

    if (isSleeping && item !== sleep) {
        alert(`${Tama.name} dort profondément. Réveille-le d'abord.`);
        return;
    }

    if (item === sleep) {
        isSleeping = true;
        tamaImg.src = imagePath;
        document.body.classList.add('sleeping');
        wakeUpBtn.style.display = 'inline-block';
        interactionMsg.textContent = `${Tama.name} ${actionText} ${item.name}.`;
        updateGauges();
        return;
    }

    Tama.activités(item);
    tamaImg.src = imagePath;
    interactionMsg.textContent = `${Tama.name} ${actionText} ${item.name}.`;
    updateGauges();

    setTimeout(() => {
        interactionMsg.textContent = "";
    }, 10000); //                               <<<<<<<<<<<<<<<<<<<< Le timer d'affichage des elements est ici
}

// Réveil
wakeUpBtn.addEventListener('click', () => {
    if (!isSleeping) return;

    isSleeping = false;
    wakeUpBtn.style.display = 'none';
    tamaImg.src = 'image/wakeup.jpg';
    interactionMsg.textContent = `${Tama.name} s'est réveillé.`;
    Tama.activités(sleep);
    updateGauges();
    document.body.classList.remove('sleeping');
});

// Musique 
const MUSIC_VOLUME = 0.1;
const SINGING_VOLUME = 0.1;

function stopSound() {
    const sound = music;
    const sound1 = singing;

    if (sound && sound1) {
        sound.pause();
        sound.currentTime = 0;
        sound1.pause();
        sound1.currentTime = 0;
    }    
}

function jouerMusique() {
    if (!music.paused) {
        music.currentTime = 0;
        return;
    }

    singing.pause();
    singing.currentTime = 0;

    music.volume = MUSIC_VOLUME;
    music.play();

    // Stop après 120 secondes
    setTimeout(() => {
        music.pause();
        music.currentTime = 0;
    }, 120000); //                                     <<<<<<<<<<<<<<<<<<<<<< Timer de la musique d'ambiance
}

function jouerSinging() {
    music.pause();
    music.currentTime = 0;

    if (!singing.paused) {
        singing.currentTime = 0;
        return;
    }

    singing.volume = SINGING_VOLUME;
    singing.play();

    // Stop après 50 secondes
    setTimeout(() => {
        singing.pause();
        singing.currentTime = 0;
    }, 40000); //                                   <<<<<<<<<<<<<<<<<<<<<<<<< Timer de la musique de chant
}

// Événements des boutons
carotteImg.addEventListener("click", () => {
    effectuerActivité(carotte, 'image/eating.jpg', 'mange');
    stopSound();
});
grainesImg.addEventListener("click", () => {
    effectuerActivité(graines, 'image/eating.jpg', 'mange');
    stopSound();
});
bookImg.addEventListener("click", () => {
    effectuerActivité(book, 'image/reading.jpg', 'lit');
    stopSound();
});
singImg.addEventListener("click", () => {
    effectuerActivité(sing, 'image/singing.jpg', 'chante');
    jouerSinging()
});
sleepImg.addEventListener("click", () => {
    effectuerActivité(sleep, 'image/sleeping.jpg', 'dort');
    stopSound();
});
sportImg.addEventListener("click", () => {
    effectuerActivité(sport, 'image/sport.jpg', 'fait du sport');
    stopSound();
});

