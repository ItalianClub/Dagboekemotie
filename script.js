document.addEventListener("DOMContentLoaded", () => {
    let currentDay = 1;
    const totalDays = 14;

    const exercises = [
        { title: "Ademruimte nemen", description: "Neem 3 minuten de tijd om je ademhaling te observeren. Hoe voel je je na deze oefening?" },
        { title: "Reflectieve Dialoog", description: "Schrijf een gesprek tussen je kalme ik en je gestreste ik. Wat heeft je gestreste ik nodig?" },
        { title: "Triggers Herkennen", description: "Beschrijf een situatie die een sterke emotie opriep. Wat was de oorzaak, en hoe reageerde je?" },
        { title: "Dankbaarheid en Emoties", description: "Schrijf 3 dingen op waarvoor je dankbaar bent. Hoe voelt dat?" },
        { title: "Compassiebrief", description: "Schrijf een brief aan jezelf waarin je begrip toont voor je gevoelens." },
        { title: "Emotionele Kaart", description: "Teken een silhouet van een lichaam en markeer waar je emoties vandaag voelde." },
        { title: "Emotionele Woordenschat", description: "Zoek 3 nieuwe woorden die je emoties van vandaag beschrijven." },
        { title: "Kleur je Stemming", description: "Kies een kleur die je stemming vandaag beschrijft en leg uit waarom." },
        { title: "Stress Loslaten", description: "Schrijf 1 ding op dat stress veroorzaakte en hoe je hiermee om kunt gaan." },
        { title: "Communicatiemodel Oefenen", description: "Gebruik het model: 'Ik voel me..., omdat..., en ik zou willen...'." },
        { title: "Ademhaling en Ontspanning", description: "Doe 5 diepe ademhalingen en voel hoe je lichaam reageert." },
        { title: "Zelfreflectie op Communicatie", description: "Denk aan een gesprek. Wat ging goed, en wat kun je verbeteren?" },
        { title: "Energiebronnen Identificeren", description: "Wat gaf je energie vandaag? Wat heeft energie gekost?" },
        { title: "Dagelijkse Reflectie", description: "Kijk terug op de afgelopen 14 dagen. Wat heb je geleerd over jezelf?" },
    ];

    const sleepRoutines = [
        "Doe een ademhalingsoefening: adem in 4 seconden, houd vast voor 4 seconden, adem uit in 6 seconden.",
        "Visualiseer een rustige plek zoals een bos of strand terwijl je je ademhaling volgt.",
        "Span en ontspan elke spiergroep van je tenen tot je hoofd.",
        "Schrijf 3 dingen op waarvoor je vandaag dankbaar bent.",
    ];

    const dailyData = Array(totalDays).fill(null).map(() => ({
        checkIn: "",
        emotions: [],
        bodyParts: [],
        analysis: "",
        advice: "",
        checkOut: "",
    }));

    const showSection = (sectionId) => {
        document.querySelectorAll(".section").forEach(section => section.classList.add("hidden"));
        document.getElementById(sectionId).classList.remove("hidden");
    };

    const updateProgressBar = () => {
        const progressBar = document.getElementById("progress-bar-inner");
        progressBar.style.width = `${(currentDay / totalDays) * 100}%`;
    };

    const generateAnalysis = (data) => {
        let result = `<p>Je hebt aangegeven de volgende emoties te voelen: ${data.emotions.join(", ") || "geen emoties"}.</p>`;
        result += `<p>Je ervoer spanning in: ${data.bodyParts.join(", ") || "geen plekken"}.</p>`;
        if (data.emotions.includes("Boos")) {
            result += `<p>Boosheid kan duiden op frustratie. Neem een moment om rustig adem te halen.</p>`;
        }
        if (data.bodyParts.includes("Schouders")) {
            result += `<p>Spanning in je schouders kan wijzen op stress. Probeer je schouders te rollen of een stretch te doen.</p>`;
        }
        return result;
    };

    const loadExercise = () => {
        const exercise = exercises[(currentDay - 1) % exercises.length];
        document.getElementById("exercise-title").textContent = exercise.title;
        document.getElementById("exercise-description").textContent = exercise.description;
    };

    const loadSleepRoutine = () => {
        const routine = sleepRoutines[(currentDay - 1) % sleepRoutines.length];
        document.getElementById("sleep-routine-description").textContent = routine;
    };

    document.getElementById("start-game-btn").addEventListener("click", () => {
        showSection("check-in-section");
        updateProgressBar();
    });

    document.getElementById("check-in-btn").addEventListener("click", () => {
        const emotions = [...document.querySelectorAll("#emotion-choices input:checked")].map(input => input.value);
        const bodyParts = [...document.querySelectorAll("#body-choices input:checked")].map(input => input.value);
        const checkInText = document.getElementById("check-in-text").value.trim();

        if (!checkInText || !emotions.length || !bodyParts.length) {
            alert("Vul alle velden in om verder te gaan.");
            return;
        }

        dailyData[currentDay - 1] = { ...dailyData[currentDay - 1], checkIn: checkInText, emotions, bodyParts };
        document.getElementById("analysis-result").innerHTML = generateAnalysis(dailyData[currentDay - 1]);
        showSection("analysis-section");
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        const data = dailyData[currentDay - 1];
        document.getElementById("advice-result").innerHTML = `<p>Advies: Neem een moment om je emoties te erkennen en ontspan met een oefening.</p>`;
        showSection("advice-section");
    });

    document.getElementById("exercise-btn").addEventListener("click", () => {
        loadExercise();
        showSection("exercise-section");
    });

    document.getElementById("complete-exercise-btn").addEventListener("click", () => {
        showSection("check-out-section");
    });

    document.getElementById("check-out-btn").addEventListener("click", () => {
        const checkOutText = document.getElementById("check-out-text").value.trim();
        if (!checkOutText) {
            alert("Vul je check-out reflectie in.");
            return;
        }

        dailyData[currentDay - 1].checkOut = checkOutText;
        loadSleepRoutine();
        showSection("sleep-section");
    });

    document.getElementById("next-day-btn").addEventListener("click", () => {
        if (currentDay < totalDays) {
            currentDay++;
            showSection("check-in-section");
            updateProgressBar();
        } else {
            alert("Gefeliciteerd! Je hebt de challenge voltooid.");
        }
    });
});
