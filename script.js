document.addEventListener("DOMContentLoaded", () => {
    const totalDays = 14;
    let currentDay = 1;
    let reflections = {}; // Opslag voor reflecties per dag

    // Herstellen van de opgeslagen voortgang in localStorage
    if (localStorage.getItem('currentDay')) {
        currentDay = parseInt(localStorage.getItem('currentDay'));
        reflections = JSON.parse(localStorage.getItem('reflections')) || {};
    }

    // Secties ophalen
    const sections = {
        checkIn: document.getElementById("check-in-section"),
        analysis: document.getElementById("analysis-section"),
        emotionSummary: document.getElementById("emotion-summary"),
        exercise: document.getElementById("exercise-section"),
        checkOut: document.getElementById("check-out-section"),
        sleep: document.getElementById("sleep-section"),
    };

    // Knoppen ophalen
    const buttons = {
        checkIn: document.getElementById("check-in-btn"),
        emotionSubmit: document.getElementById("emotion-submit"),
        proceedToExercise: document.getElementById("proceed-to-exercise"),
        completeExercise: document.getElementById("complete-exercise-btn"),
        checkOut: document.getElementById("check-out-btn"),
        nextDay: document.getElementById("next-day-btn"),
        prevDay: document.getElementById("prev-day-btn"),
        reset: document.getElementById("reset-btn"),
    };

    // Reflectie prompts voor 14 dagen
    const reflectionPrompts = [
        "Hoe voel je je vandaag? Wat overheerst er in je lichaam?",
        "Herken je een emotie vandaag? Waar voel je deze in je lichaam?",
        "Welke situatie bracht stress vandaag? Hoe voel je je daarover?",
        "Wat maakt je blij vandaag? Hoe merk je dat in je lichaam?",
        "Ben je ergens boos over? Waar voel je dat in je lichaam?",
        "Wat maakt je onzeker vandaag? Wat zegt je lichaam hierover?",
        "Welke emoties heb je vandaag ervaren? Waar in je lichaam merk je deze?",
        "Voel je ergens spanning? Hoe kun je deze spanning loslaten?",
        "Wat heeft je gelukkig gemaakt? Hoe voelde je dat in je lichaam?",
        "Wat zou je vandaag willen veranderen in je reacties op emoties?",
        "Welke lichamelijke sensaties merk je? Wat zeggen ze over je emotie?",
        "Wat is je grootste uitdaging op dit moment? Hoe voelt dat lichamelijk?",
        "Heb je je vandaag ontspannen? Wat zou je willen verbeteren?",
        "Hoe zou je jezelf vandaag kunnen steunen in het omgaan met emoties?"
    ];

    // Functie om secties te tonen
    const showSection = (id) => {
        Object.values(sections).forEach(section => section.classList.add("hidden"));
        sections[id].classList.remove("hidden");
    };

    // Sla de voortgang op in localStorage
    const saveProgress = () => {
        localStorage.setItem('currentDay', currentDay);
        localStorage.setItem('reflections', JSON.stringify(reflections));
    };

    // Laad de inhoud voor de dag
    const loadDayContent = () => {
        document.getElementById("check-in-prompt").textContent = reflectionPrompts[currentDay - 1];
        document.getElementById("day-number").textContent = currentDay;
    };

    // Check-in button handler
    buttons.checkIn.addEventListener("click", () => {
        const input = document.getElementById("check-in-text").value.trim();
        if (!input) return alert("Vul je reflectie in.");
        reflections[currentDay] = { checkIn: input };
        saveProgress();
        showSection("analysis");
    });

    // Emotie analyse button handler
    buttons.emotionSubmit.addEventListener("click", () => {
        const selectedEmotions = Array.from(document.getElementById("emotion-select").selectedOptions).map(option => option.value);
        const selectedBodyParts = Array.from(document.getElementById("body-select").selectedOptions).map(option => option.value);
        
        reflections[currentDay].emotions = selectedEmotions;
        reflections[currentDay].bodyParts = selectedBodyParts;
        saveProgress();
        showSection("emotion-summary");
    });

    // Ga naar de oefening sectie
    buttons.proceedToExercise.addEventListener("click", () => {
        showSection("exercise");
    });

    // Voltooi de oefening
    buttons.completeExercise.addEventListener("click", () => {
        showSection("check-out");
    });

    // Check-out handler
    buttons.checkOut.addEventListener("click", () => {
        const checkOutText = document.getElementById("check-out-text").value.trim();
        if (!checkOutText) return alert("Vul je check-out reflectie in.");
        reflections[currentDay].checkOut = checkOutText;
        saveProgress();
        showSection("sleep");
    });

    // Volgende dag
    buttons.nextDay.addEventListener("click", () => {
        if (currentDay < totalDays) {
            currentDay++;
            loadDayContent();
            showSection("check-in");
        } else {
            alert("Gefeliciteerd! Je hebt alle 14 dagen voltooid!");
        }
    });

    // Vorige dag
    buttons.prevDay.addEventListener("click", () => {
        if (currentDay > 1) {
            currentDay--;
            loadDayContent();
            showSection("check-in");
        }
    });

    // Reset de game
    buttons.reset.addEventListener("click", () => {
        localStorage.clear();
        reflections = {};
        currentDay = 1;
        loadDayContent();
        showSection("check-in");
    });

    loadDayContent();
    showSection("check-in");
});
