const pommeImg = document.getElementById('pomme');
const poissonImg = document.getElementById('poisson');
const status = document.getElementById('status');
const interactionMsg = document.getElementById('interactionMsg');
const userInput = document.getElementById('input');
const validate = document.getElementById('button');

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

const pomme = new FoodItem("Pomme", 10, 5, 10);
const poisson = new FoodItem("Poisson", 5, 5, 1);

/* Création du Tamagotchi au clic */

validate.addEventListener('click', (event) => {
    event.preventDefault();

    const userTamaName = userInput.value.trim();
    userInput.value = '';

    if (userTamaName === '') {
        alert("Veuillez entrer un nom pour votre Tamagotchi.");
        return;
    }

    userTama = new Tamagotchi(userTamaName);
    interactionMsg.textContent = `${userTama.name} est né ! Prenez soin de lui.`;
    status.textContent = `Faim : ${userTama.hunger}, Énergie : ${userTama.energy}, Humeur : ${userTama.mood}`;
});

/* Tick temps toutes les 5 secondes */

setInterval(() => {
    if (userTama) {
        userTama.passTime();
        status.textContent = `Faim : ${userTama.hunger}, Énergie : ${userTama.energy}, Humeur : ${userTama.mood}`;
    }
}, 5000);

/* Bouton pour nourrir */

pommeImg.addEventListener("click", () => {
    if (userTama) {
        userTama.eat(pomme);
        interactionMsg.textContent = `${userTama.name} a mangé ${pomme.name}.`;
        status.textContent = `Faim : ${userTama.hunger}, Énergie : ${userTama.energy}, Humeur : ${userTama.mood}`;
    } else {
        alert("Veuillez d'abord créer votre Tamagotchi.");
    }
});

poissonImg.addEventListener("click", () => {
    if (userTama) {
        userTama.eat(poisson);
        interactionMsg.textContent = `${userTama.name} a mangé ${poisson.name}.`;
        status.textContent = `Faim : ${userTama.hunger}, Énergie : ${userTama.energy}, Humeur : ${userTama.mood}`;
    } else {
        alert("Veuillez d'abord créer votre Tamagotchi.");
    }
});

