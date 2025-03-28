const animals = ["Cane", "Gatto", "Delfino", "Balena", "Foca", "Pesce", "Coccodrillo", "Mucca", "Pecora", "Colomba", "Civetta"];
let assignedAnimals = {}; // Ogni animale e il numero di volte che è stato assegnato

// Funzione per assegnare un animale
function assignAnimal() {
    // Animali con count = 0 (mai assegnati)
    let unassignedZero = animals.filter(animal => (assignedAnimals[animal] || 0) === 0);

    // Se tutti gli animali hanno count = 2
    if (unassignedZero.length === 0 && Object.values(assignedAnimals).every(count => count === 2)) {
        document.getElementById("result").innerText = "Gioco finito, tutti gli animali sono stati assegnati!";
        return;
    }

    // Se ci sono almeno 5 animali con count = 0, assegnane 5
    if (unassignedZero.length >= 5) {
        let randomAnimals = getRandomItems(unassignedZero, 5);
        randomAnimals.forEach(animal => {
            assignedAnimals[animal] = 1; // Assegna 1 volta
        });
        document.getElementById("result").innerText = "5 animali con count = 0 sono stati assegnati, ora sono con count = 1.";
        return;
    }

    // Quando ci sono solo 4 animali con count = 0, assegnare 2 animali con count = 0 e 2 con count = 1
    if (unassignedZero.length === 4) {
        let unassignedOnce = animals.filter(animal => assignedAnimals[animal] === 1); // Animali con count = 1
        if (unassignedOnce.length >= 2) {
            let randomZero = getRandomItems(unassignedZero, 2);
            let randomOnce = getRandomItems(unassignedOnce, 2);

            // Assegna i 2 animali con count = 0 (passano a count = 1)
            randomZero.forEach(animal => {
                assignedAnimals[animal] = 1;
            });

            // Assegna i 2 animali con count = 1 (passano a count = 2)
            randomOnce.forEach(animal => {
                assignedAnimals[animal] = 2;
            });

            document.getElementById("result").innerText = "2 animali da 0 sono stati assegnati e 2 da 1 sono stati assegnati a 2.";
            return;
        }
    }

    // Se ci sono ancora animali da assegnare con count < 2
    let availableAnimals = animals.filter(animal => (assignedAnimals[animal] || 0) < 2);
    let randomAnimal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
    assignedAnimals[randomAnimal] = (assignedAnimals[randomAnimal] || 0) + 1;

    document.getElementById("result").innerText = "Il tuo animale è: " + randomAnimal;
}

// Funzione per ottenere un numero casuale di animali da un array
function getRandomItems(arr, num) {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

