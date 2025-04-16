// Bouton des activités 
const carotteImg = document.getElementById('carotte');
const grainesImg = document.getElementById('graines');
const bookImg = document.getElementById('book');
const singImg = document.getElementById('sing');
const sleepImg = document.getElementById('sleep');
const wakeUpBtn = document.getElementById('wakeUp');

const status = document.getElementById('status');
const interactionMsg = document.getElementById('interactionMsg');
const userInput = document.getElementById('input');
const validate = document.getElementById('button');
const tamaImg = document.getElementById('tamaImg');

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

// Définition des activités
const carotte = new ActivitésItem("une carotte", 10, 0, 5);
const graines = new ActivitésItem("des graines", 5, 5, 0);
const book = new ActivitésItem("un livre", 0, 0, 5);
const sing = new ActivitésItem("une chanson", 0, -5, 10);
const sleep = new ActivitésItem("au chaud dans son lit", 0, 100, 50);

// Création du Tamagotchi
validate.addEventListener('click', (event) => {
    event.preventDefault();

    const TamaName = userInput.value.trim();
    userInput.value = '';

    if (TamaName === '') {
        alert("Veuillez entrer un nom pour votre Tamagotchi.");
        return;
    }

    // Instance du Tamagochi
    Tama = new Tamagotchi(TamaName);
    tamaImg.style.visibility = "visible";
    interactionMsg.textContent = `${Tama.name} est né ! Prends soin de lui.`;
    status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;

    document.querySelector('.chooseName').style.display = 'none';
    const tamaNameDisplay = document.getElementById('tamaName');
    tamaNameDisplay.style.display = 'block';
    tamaNameDisplay.textContent = `${Tama.name}`;
});

// Met à jour l'état toutes les 10 secondes
setInterval(() => {
    if (Tama && !isSleeping) {
        Tama.passTime();

        if (Tama.mood <= 30) {
            tamaImg.src = 'image/sad.jpg';
            status.textContent = `Ton Tamagotchi est triste ! Son humeur est à ${Tama.mood}`;
        } else {
            tamaImg.src = 'image/Tamagochi.jpg';
            status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
        }

        if (Tama.energy <= 30) {
            tamaImg.src = 'image/tired.jpg';
            status.textContent = `Ton Tamagotchi est fatigué ! Son energie est à ${Tama.energy}, tu devais le mettre au lit.`;
        } else {
            tamaImg.src = 'image/Tamagochi.jpg';
            status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
        }
    }
}, 10000);

// Gère les activités
function effectuerActivité(item, imagePath, actionText) {
    if (!Tama) {
        alert("Veuillez d'abord créer votre Tamagotchi.");
        return;
    }

    // Activité alors que le tamagochi dort
    if (isSleeping && item !== sleep) {
        alert(`${Tama.name} dort profondément. Réveille-le d'abord.`);
        return;
    }

    // Déclenche le sommeil sans appliquer les effets
    if (item === sleep) {
        isSleeping = true;
        tamaImg.src = imagePath;
        document.body.classList.add('sleeping');
        wakeUpBtn.style.display = 'inline-block';
        interactionMsg.textContent = `${Tama.name} ${actionText} ${item.name}.`;
        status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
        return;
    }

    // Fonction pour les activités
    Tama.activités(item);
    tamaImg.src = imagePath;
    interactionMsg.textContent = `${Tama.name} ${actionText} ${item.name}.`;
    status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;

    setTimeout(() => {
        interactionMsg.textContent = "";
    }, 8000);     //                                           <<<<<<<<<<<<<      ICI      <<<<<<<<<<<<<<<<<<<<<<<<<<
}                 //                                                         Decrementation                                        

// Gère le réveil
wakeUpBtn.addEventListener('click', () => {
    if (!isSleeping) return;

    isSleeping = false;
    wakeUpBtn.style.display = 'none';
    tamaImg.src = 'image/Wakeup.jpg';
    interactionMsg.textContent = `${Tama.name} s'est réveillé.`;
    Tama.activités(sleep);
    status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
    document.body.classList.remove('sleeping');

    setTimeout(() => {
        interactionMsg.textContent = ""; 
    }, 10000);
});

// Événements des boutons d’activités
carotteImg.addEventListener("click", () => {
    effectuerActivité(carotte, 'image/eating.jpg', 'a mangé');
});

grainesImg.addEventListener("click", () => {
    effectuerActivité(graines, 'image/eating.jpg', 'a mangé');
});

bookImg.addEventListener("click", () => {
    effectuerActivité(book, 'image/reading.jpg', 'a lu');
});

singImg.addEventListener("click", () => {
    effectuerActivité(sing, 'image/singing.jpg', 'a chanté');
});

sleepImg.addEventListener("click", () => {
    effectuerActivité(sleep, 'image/sleeping.jpg', 'dort');
});

