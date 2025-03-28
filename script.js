const animals = ["Cane", "Gatto", "Delfino", "Balena", "Foca", "Pesce", "Coccodrillo", "Mucca", "Pecora", "Colomba", "Civetta"];
let assignedAnimals = {}; // Ogni animale e il numero di volte che è stato assegnato
let assignedOnce = [];    // Lista degli animali assegnati una sola volta

function assignAnimal() {
    let availableAnimals = animals.filter(animal => (assignedAnimals[animal] || 0) < 2); // Animali che non hanno ancora raggiunto 2 assegnazioni

    // Se tutti gli animali sono stati assegnati 2 volte
    if (availableAnimals.length === 0) {
        document.getElementById("result").innerText = "Gioco finito, tutti gli animali sono stati assegnati!";
        return;
    }

    // Se ci sono 5 animali che non sono mai stati assegnati (count = 0)
    let unassignedZero = animals.filter(animal => (assignedAnimals[animal] || 0) === 0);

    if (unassignedZero.length >= 5) {
        // Prendi casualmente 5 animali che sono stati assegnati 0 volte e assegnali
        let randomAnimals = getRandomItems(unassignedZero, 5);
        randomAnimals.forEach(animal => {
            assignedAnimals[animal] = 1; // Assegna 1 volta
            assignedOnce.push(animal); // Aggiungi alla lista degli animali assegnati una sola volta
        });
       
        return;
    }

    // Quando mancano solo 4 animali con count = 0, esegui una logica speciale
    if (unassignedZero.length === 4) {
        let unassignedOnce = animals.filter(animal => assignedAnimals[animal] === 1); // Animali che sono stati assegnati 1 volta
        if (unassignedOnce.length >= 2) {
            // Assegna 2 animali con count = 0 e 2 animali con count = 1
            let randomZero = getRandomItems(unassignedZero, 2);
            let randomOnce = getRandomItems(unassignedOnce, 2);

            randomZero.forEach(animal => {
                assignedAnimals[animal] = 1; // Assegna 1 volta
                assignedOnce.push(animal); // Aggiungi alla lista degli animali assegnati una sola volta
            });

            randomOnce.forEach(animal => {
                assignedAnimals[animal] = 2; // Assegna 2 volte
            });

         
            return;
        }
    }

    // Assegna un animale casuale che ha count < 2
    let randomAnimal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
    assignedAnimals[randomAnimal] = (assignedAnimals[randomAnimal] || 0) + 1;

    // Se l'animale è stato assegnato solo una volta, aggiungilo a assignedOnce
    if (assignedAnimals[randomAnimal] === 1) {
        assignedOnce.push(randomAnimal);
    }

    document.getElementById("result").innerText = "Il tuo animale è: " + randomAnimal;
}

// Funzione per ottenere un numero casuale di elementi da un array
function getRandomItems(arr, num) {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}
