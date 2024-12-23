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
        emotions: [],
        bodyParts: [],
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

    const updateProgressBar = () => {
        const progressBar = document.getElementById("progress-bar-inner");
        progressBar.style.width = `${(currentDay / totalDays) * 100}%`;
    };

    const validateSelections = () => {
        const emotionsSelected = document.querySelectorAll('#emotion-choices input:checked');
        const bodyPartsSelected = document.querySelectorAll('#body-choices input:checked');

        if (emotionsSelected.length === 0 || bodyPartsSelected.length === 0) {
            alert('Kies ten minste één emotie en een locatie van spanning.');
            return false;
        }
        return true;
    };

    const showSection = (sectionId) => {
        Object.values(sections).forEach(section => section.classList.add("hidden"));
        document.getElementById(sectionId).classList.remove("hidden");
    };

    const loadDayContent = () => {
        document.getElementById("check-in-prompt").textContent = checkInPrompts[currentDay - 1];
        document.getElementById("exercise-title").textContent = exercises[currentDay - 1].title;
        document.getElementById("exercise-description").textContent = exercises[currentDay - 1].description;
    };

    buttons.startGame.addEventListener("click", () => {
        updateProgressBar();
        showSection("checkIn");
    });

    buttons.aboutGame.addEventListener("click", () => showSection("about"));
    buttons.backToStart.addEventListener("click", () => showSection("start"));

    buttons.checkIn.addEventListener("click", () => {
        const checkInText = document.getElementById("check-in-text").value.trim();
        if (!checkInText || !validateSelections()) return;

        const selectedEmotions = [...document.querySelectorAll('#emotion-choices input:checked')].map(input => input.value);
        const selectedBodyParts = [...document.querySelectorAll('#body-choices input:checked')].map(input => input.value);

        data[currentDay - 1] = {
            ...data[currentDay - 1],
            checkIn: checkInText,
            emotions: selectedEmotions,
            bodyParts: selectedBodyParts,
        };

        const analysis = `
            <h3>Emotionele Analyse:</h3>
            <p>Je hebt de volgende emoties aangegeven: ${selectedEmotions.join(", ")}.</p>
            <h3>Fysieke Analyse:</h3>
            <p>Je voelt spanning in: ${selectedBodyParts.join(", ")}.</p>
            <p>Tip: Probeer een ademhalingsoefening om spanning los te laten.</p>
        `;

        document.getElementById("analysis-result").innerHTML = analysis;
        showSection("analysis");
    });

    buttons.next.addEventListener("click", () => showSection("exercise"));
    buttons.completeExercise.addEventListener("click", () => showSection("checkOut"));

    buttons.checkOut.addEventListener("click", () => {
        const checkOutText = document.getElementById("check-out-text").value.trim();
        if (!checkOutText) {
            alert("Vul je check-out in om verder te gaan.");
            return;
        }

        data[currentDay - 1] = {
            ...data[currentDay - 1],
            checkOut: checkOutText,
        };

        showSection("sleep");
    });

    buttons.nextDay.addEventListener("click", () => {
        if (currentDay < totalDays) {
            currentDay++;
            loadDayContent();
            updateProgressBar();
            showSection("checkIn");
        } else {
            alert("Gefeliciteerd! Je hebt alle 14 dagen voltooid!");
        }
    });

    buttons.prevDay.addEventListener("click", () => {
        if (currentDay > 1) {
            currentDay--;
            loadDayContent();
            updateProgressBar();
            showSection("checkIn");
        }
    });

    buttons.reset.addEventListener("click", () => {
        currentDay = 1;
        data.forEach(day => {
            day.checkIn = "";
            day.emotions = [];
            day.bodyParts = [];
            day.analysis = "";
            day.checkOut = "";
        });
        loadDayContent();
        updateProgressBar();
        showSection("start");
    });

    loadDayContent();
});
