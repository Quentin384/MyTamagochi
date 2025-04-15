const pommeImg = document.getElementById('pomme');
const poissonImg = document.getElementById('poisson');
const status = document.getElementById('status');
const interactionMsg = document.getElementById('interactionMsg');
const userInput = document.getElementById('input');
const validate = document.getElementById('button');
const tamaImg = document.getElementById('tamaImg');

let userTama = null;

/* Classe du Tamagotchi */

class Tamagotchi {
    constructor(name) {
        this.name = name;
        this.hunger = 100;
        this.energy = 100;
        this.mood = 100;
    }

    eat(food) {
        if (!(food instanceof FoodItem)) {
            console.error("L'objet fourni n'est pas un aliment valide.");
            return;
        }

        this.hunger = Math.min(this.hunger + food.nutritionValue, 100);
        this.energy = Math.min(this.energy + food.energyValue, 100);
        this.mood = Math.min(this.mood + food.moodValue, 100);

        console.log(`${this.name} a mangé ${food.name} et sa faim est maintenant à ${this.hunger}.`);
    }

    passTime() {
        this.hunger = Math.max(this.hunger - 15, 0);
        this.energy = Math.max(this.energy - 10, 0);
        this.mood = Math.max(this.mood - 8, 0);
    }
}

/* Classe des aliments */

class FoodItem {
    constructor(name, nutritionValue, energyValue, moodValue) {
        this.name = name;
        this.nutritionValue = nutritionValue;
        this.energyValue = energyValue;
        this.moodValue = moodValue;
    }
}

const pomme = new FoodItem("une pomme", 10, 5, 10);
const poisson = new FoodItem("un poisson", 5, 5, 1);

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
    interactionMsg.textContent = `${Tama.name} est né ! Prenez soin de lui.`;
    status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
});

/* Barre du Tama descend et changement des valeurs */

setInterval(() => {
    if (Tama) {
        Tama.passTime();
        status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;

        // Mise à jour de l'image et du fond selon l'humeur

        const body = document.body;

        if (Tama.mood <= 30) {
            tamaImg.src = 'image/triste.png';
            body.classList.add('sad');
        } else {
            tamaImg.src = 'image/Tamagochi.png';
            body.classList.remove('sad');
        }
    }
}, 5000);


/* Bouton pour nourrir */

pommeImg.addEventListener("click", () => {
    if (Tama) {
        Tama.eat(pomme);
        interactionMsg.textContent = `${Tama.name} a mangé ${pomme.name}.`;
        status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
    } else {
        alert("Veuillez d'abord créer votre Tamagotchi.");
    }
});

poissonImg.addEventListener("click", () => {
    if (Tama) {
        Tama.eat(poisson);
        interactionMsg.textContent = `${Tama.name} a mangé ${poisson.name}.`;
        status.textContent = `Faim : ${Tama.hunger}, Énergie : ${Tama.energy}, Humeur : ${Tama.mood}`;
    } else {
        alert("Veuillez d'abord créer votre Tamagotchi.");
    }
});

