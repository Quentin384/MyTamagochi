const carotteImg = document.getElementById('carotte');
const grainesImg = document.getElementById('graines');
const bookImg = document.getElementById('book');
const status = document.getElementById('status');
const interactionMsg = document.getElementById('interactionMsg');
const userInput = document.getElementById('input');
const validate = document.getElementById('button');
const tamaImg = document.getElementById('tamaImg');

let Tama = null;

/* Classe du Tamagotchi */

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
        this.hunger = Math.max(this.hunger - 15, 0);
        this.energy = Math.max(this.energy - 10, 0);
        this.mood = Math.max(this.mood - 8, 0);
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
const book = new ActivitésItem("un livre", 0, 5, 10);

/* Création du Tamagotchi au clic */

validate.addEventListener('click', (event) => {
    event.preventDefault();

    const TamaName = userInput.value.trim();
    userInput.value = '';

    if (TamaName === '') {
        alert("Veuillez entrer un nom pour votre Tamagotchi.");
        return;
    }

    Tama = new Tamagotchi(TamaName);
    tamaImg.style.visibility = "visible";
    interactionMsg.textContent = `${Tama.name} est né ! Prends soin de lui.`;
    status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
});

/* Mise à jour automatique de l'état toutes les 5 secondes */

setInterval(() => {
    if (Tama) {
        Tama.passTime();

        if (Tama.mood <= 30) {
            tamaImg.src = 'image/sad.jpg';
            status.textContent = `Ton Tamagotchi est triste ! Son humeur est à ${Tama.mood}`;
        } else {
            tamaImg.src = 'image/Tamagochi.jpg';
            status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
        }
    }
}, 5000);

/* Fonction utilitaire : gérer une activité */

function effectuerActivité(item, imagePath, actionText) {
    if (!Tama) {
        alert("Veuillez d'abord créer votre Tamagotchi.");
        return;
    }

    Tama.activités(item);
    tamaImg.src = imagePath;
    interactionMsg.textContent = `${Tama.name} ${actionText} ${item.name}.`;
    status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;

    setTimeout(() => {
        interactionMsg.textContent = "";
    }, 3000);
}

/* Gestion des boutons */

carotteImg.addEventListener("click", () => {
    effectuerActivité(carotte, 'image/eating.jpg', 'a mangé');
});

grainesImg.addEventListener("click", () => {
    effectuerActivité(graines, 'image/eating.jpg', 'a mangé');
});

bookImg.addEventListener("click", () => {
    effectuerActivité(book, 'image/reading.jpg', 'a lu');
});
