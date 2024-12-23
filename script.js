document.addEventListener("DOMContentLoaded", () => {
    const totalDays = 14;
    let currentDay = 1;

    const sections = {
        start: document.getElementById("start-section"),
        about: document.getElementById("about-section"),
        checkIn: document.getElementById("check-in-section"),
        analysis: document.getElementById("analysis-section"),
        exercise: document.getElementById("exercise-section"),
        checkOut: document.getElementById("check-out-section"),
        sleep: document.getElementById("sleep-section"),
    };

    const buttons = {
        startGame: document.getElementById("start-game-btn"),
        aboutGame: document.getElementById("about-game-btn"),
        backToStart: document.getElementById("back-to-start-btn"),
        checkIn: document.getElementById("check-in-btn"),
        next: document.getElementById("next-btn"),
        completeExercise: document.getElementById("complete-exercise-btn"),
        checkOut: document.getElementById("check-out-btn"),
        nextDay: document.getElementById("next-day-btn"),
        prevDay: document.getElementById("prev-day-btn"),
        reset: document.getElementById("reset-btn"),
    };

    const data = Array(totalDays).fill(null).map(() => ({
        checkIn: "",
        analysis: "",
        checkOut: "",
    }));

    const checkInPrompts = [
        "Hoe voel je je nu? Beschrijf eventuele fysieke spanningen.",
        "Welke emotie overheerst vandaag? Waar voel je dit in je lichaam?",
        "Wat heeft je vandaag geraakt en hoe voelde dat?",
        "Welke kleur beschrijft je stemming vandaag? Waarom?",
        "Waar voel je spanning in je lichaam?",
        "Hoe voelt je ademhaling op dit moment?",
        "Voel je ergens tintelingen? Waar precies?",
        "Welke gedachten hebben vandaag het meeste door je hoofd gespookt?",
        "Waar voel je je energiek? Wat gaf je energie?",
        "Welke situatie bracht vandaag stress? Waar voelde je dat?",
        "Wat heeft je vandaag gelukkig gemaakt? Hoe voelde dat?",
        "Welke emoties heb je vandaag genegeerd? Waar merk je dat aan?",
        "Hoe voelt je lichaam op dit moment als een geheel?",
        "Wat zou je lichaam je vandaag vertellen als het kon praten?",
    ];

    const exercises = [
        { title: "Ademruimte nemen", description: "Neem 3 minuten de tijd om je ademhaling te observeren. Hoe voel je je na deze oefening?" },
        { title: "Emotionele woordenlijst", description: "Kies 3 emoties uit een lijst en beschrijf waar je ze voelt in je lichaam." },
        { title: "Spanning en ontspanning", description: "Span je schouders 5 seconden aan en laat los. Wat voel je tijdens deze verandering?" },
        { title: "Innerlijke dialoog", description: "Schrijf een gesprek op tussen jouw ‘kalme ik’ en jouw ‘gestreste ik’." },
        { title: "Triggers onderzoeken", description: "Schrijf een situatie op die een sterke emotie opriep. Hoe reageerde je?" },
        { title: "Dankbaarheid reflectie", description: "Noem 3 dingen waar je vandaag dankbaar voor bent en beschrijf hoe ze je laten voelen." },
        { title: "Kleur je emotie", description: "Kies een kleur die jouw stemming vandaag vertegenwoordigt. Waarom koos je deze kleur?" },
        { title: "Spiegelwerk", description: "Kijk 5 minuten in de spiegel en observeer je gezichtsuitdrukking. Wat zegt deze over jouw emoties?" },
        { title: "Adem en observeer", description: "Doe een diepe ademhalingsoefening. Wat merk je op in je lichaam?" },
        { title: "Zelfcompassie brief", description: "Schrijf een brief aan jezelf waarin je jouw emoties erkent en jezelf steunt." },
        { title: "Emotionele kaart", description: "Teken een lichaamssilhouet en markeer waar je emoties voelt." },
        { title: "Reflectieve vragen", description: "Schrijf 3 vragen die je jezelf kunt stellen bij een sterke emotie." },
        { title: "Stress loslaten", description: "Identificeer één ding dat vandaag stress veroorzaakte en schrijf hoe je het kunt loslaten." },
        { title: "Eindreflectie", description: "Kijk terug op de afgelopen 14 dagen. Wat heb je geleerd over je emoties en lichaam?" },
    ];

    const emotionOptions = [
        "Blij", "Boos", "Verdrietig", "Bang", "Gefrustreerd", "Opgelucht", "Verward", "Energiek", "Vermoeid",
    ];

    const checkOutPrompts = [
        "Wat heb je vandaag geleerd over je lichaam en emoties?",
        "Welke momenten brachten je rust of spanning?",
        "Wat voelde je tijdens de oefening? Waar in je lichaam merkte je dat?",
        "Welke gedachten hielpen je vandaag vooruit?",
        "Hoe kun je morgen een moment van rust creëren?",
        "Welke emoties herken je nu beter? Hoe voel je dat?",
        "Wat gaf je vandaag een glimlach? Hoe voelde dat?",
        "Waar voel je nu rust in je lichaam? Hoe kwam dat?",
        "Welke situaties maakten je emotioneel? Waar voelde je dat?",
        "Wat bracht je vandaag kalmte? Hoe kun je dat vaker oproepen?",
        "Wat leerde je vandaag over je ademhaling?",
        "Welke beweging voelde goed vandaag? Waarom?",
        "Wat was het meest waardevolle inzicht van vandaag?",
        "Hoe heeft deze dag je geholpen om te groeien?",
    ];

    const validateInput = (inputId) => {
        const inputField = document.getElementById(inputId);
        if (!inputField.value.trim()) {
            inputField.classList.add("error");
            alert("Vul dit veld in om verder te gaan.");
            return false;
        }
        inputField.classList.remove("error");
        return true;
    };

    const resetGame = () => {
        currentDay = 1;
        data.forEach(day => {
            day.checkIn = "";
            day.analysis = "";
            day.checkOut = "";
        });
        document.querySelectorAll("textarea").forEach(textarea => textarea.value = "");
        loadDayContent();
        showSection("start");
    };

    const generateAnalysis = (inputText) => {
        const lowerInput = inputText.toLowerCase();
        if (lowerInput.includes("spanning") || lowerInput.includes("schouders")) {
            return {
                psychological: "Spanning in je schouders wijst vaak op stress of verantwoordelijkheid. Overweeg hoe je deze spanning kunt loslaten.",
                physical: "Probeer lichte stretchoefeningen om de spanning in je schouders te verlichten.",
            };
        }
        if (lowerInput.includes("blij") || lowerInput.includes("gelukkig")) {
            return {
                psychological: "Je ervaart blijdschap, een teken dat je iets doet wat je energie geeft.",
                physical: "Blijdschap ontspant je lichaam. Let op hoe je ademhaling kalmer wordt.",
            };
        }
        return {
            psychological: "Je gevoelens zijn divers en vragen om reflectie. Wat is de sterkste emotie vandaag?",
            physical: "Doe een volledige lichaamsscan om spanning of ontspanning in je lichaam te herkennen.",
        };
    };

    const loadDayContent = () => {
        document.getElementById("check-in-prompt").textContent = checkInPrompts[currentDay - 1];
        document.getElementById("exercise-title").textContent = exercises[currentDay - 1].title;
        document.getElementById("exercise-description").textContent = exercises[currentDay - 1].description;
        document.getElementById("check-out-prompt").textContent = checkOutPrompts[currentDay - 1];
        document.getElementById("day-number").textContent = currentDay;
    };

    const showSection = (sectionId) => {
        Object.values(sections).forEach(section => section.classList.add("hidden"));
        document.getElementById(sectionId).classList.remove("hidden");
    };

    buttons.startGame.addEventListener("click", () => showSection("checkIn"));
    buttons.aboutGame.addEventListener("click", () => showSection("about"));
    buttons.backToStart.addEventListener("click", () => showSection("start"));

    buttons.checkIn.addEventListener("click", () => {
        if (validateInput("check-in-text")) {
            const inputText = document.getElementById("check-in-text").value.trim();
            const analysis = generateAnalysis(inputText);
            data[currentDay - 1].checkIn = inputText;
            data[currentDay - 1].analysis = analysis;
            document.getElementById("analysis-result").innerHTML = `
                <h3>Psychologische Analyse:</h3>
                <p>${analysis.psychological}</p>
                <h3>Fysieke Analyse:</h3>
                <p>${analysis.physical}</p>
            `;
            showSection("analysis");
        }
    });

    buttons.next.addEventListener("click", () => showSection("exercise"));
    buttons.completeExercise.addEventListener("click", () => showSection("checkOut"));

    buttons.checkOut.addEventListener("click", () => {
        if (validateInput("check-out-text")) {
            const checkOutText = document.getElementById("check-out-text").value.trim();
            data[currentDay - 1].checkOut = checkOutText;
            showSection("sleep");
        }
    });

    buttons.nextDay.addEventListener("click", () => {
        if (currentDay < totalDays) {
            currentDay++;
            loadDayContent();
            showSection("checkIn");
        } else {
            alert("Gefeliciteerd! Je hebt alle 14 dagen voltooid!");
        }
    });

    buttons.prevDay.addEventListener("click", () => {
        if (currentDay > 1) {
            currentDay--;
            loadDayContent();
            showSection("checkIn");
        }
    });

    buttons.reset.addEventListener("click", resetGame);

    loadDayContent();
});
