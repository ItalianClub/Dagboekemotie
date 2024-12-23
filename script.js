document.addEventListener("DOMContentLoaded", () => {
    const totalDays = 14;
    let currentDay = 1;

    const dailyData = Array(totalDays).fill(null).map(() => ({
        checkIn: "",
        emotions: [],
        bodyParts: [],
        analysis: "",
        advice: "",
        checkOut: "",
        exercises: [],
    }));

    const exercises = [
        { title: "Ademruimte nemen", description: "Neem 3 minuten de tijd om je ademhaling te observeren. Hoe voel je je na deze oefening?" },
        { title: "Ik-boodschappen oefenen", description: "Formuleer een situatie en schrijf een 'Ik-boodschap'. Gebruik het model: 'Ik voel me [emotie] omdat [reden]'." },
        { title: "Reflectieve dialoog", description: "Schrijf een gesprek tussen jouw kalme ik en gestreste ik. Wat heeft je gestreste ik nodig?" },
        { title: "Triggers herkennen", description: "Denk aan een situatie waarin je sterke emoties voelde. Wat was de oorzaak, en hoe reageerde je?" },
        { title: "Dankbaarheid en emoties", description: "Schrijf 3 dingen op waarvoor je dankbaar bent en hoe die je laten voelen." },
        { title: "Emotionele kaarten maken", description: "Teken een lichaamssilhouet en markeer waar je emoties vandaag voelde." },
        { title: "Compassiebrief", description: "Schrijf een brief aan jezelf waarin je begrip toont voor je gevoelens." },
        { title: "Emotionele woordenschat", description: "Zoek naar 3 nieuwe woorden voor emoties die je vandaag hebt gevoeld." },
        { title: "Kleur je stemming", description: "Kies een kleur die jouw stemming vandaag beschrijft. Waarom koos je die kleur?" },
        { title: "Ademhaling en ontspanning", description: "Doe 5 diepe ademhalingen en voel hoe je lichaam reageert." },
        { title: "Communicatiemodel oefenen", description: "Oefen het model: 'Ik voel me..., omdat..., en ik zou willen...'" },
        { title: "Stress loslaten", description: "Schrijf 1 ding op dat vandaag stress veroorzaakte en hoe je ermee om kunt gaan." },
        { title: "Zelfreflectie op communicatie", description: "Denk aan een recent gesprek. Wat ging goed, en wat kun je verbeteren?" },
        { title: "Dagelijkse reflectie", description: "Bekijk de afgelopen 14 dagen. Wat heb je geleerd over je emoties en lichaam?" },
    ];

    const showSection = (sectionId) => {
        document.querySelectorAll(".section").forEach(section => section.classList.add("hidden"));
        document.getElementById(sectionId).classList.remove("hidden");
    };

    const updateProgressBar = () => {
        const progressBar = document.getElementById("progress-bar-inner");
        progressBar.style.width = `${(currentDay / totalDays) * 100}%`;
    };

    const generateAnalysis = ({ emotions, bodyParts }) => {
        let analysis = "<h3>Analyse:</h3>";
        if (emotions.length) {
            analysis += `<p>Je hebt aangegeven de volgende emoties te voelen: ${emotions.join(", ")}.</p>`;
        } else {
            analysis += "<p>Geen emoties geselecteerd.</p>";
        }

        if (bodyParts.length) {
            analysis += `<p>Je ervaart spanning in: ${bodyParts.join(", ")}.</p>`;
        } else {
            analysis += "<p>Geen spanningslocaties geselecteerd.</p>";
        }

        return analysis;
    };

    const generateAdvice = ({ emotions, bodyParts }) => {
        let advice = "<h3>Advies:</h3>";
        if (emotions.includes("Boos")) {
            advice += "<p>Probeer een ademhalingsoefening om je woede te verminderen.</p>";
        }
        if (emotions.includes("Angstig")) {
            advice += "<p>Noteer je gedachten en probeer je te richten op wat je kunt controleren.</p>";
        }
        if (bodyParts.includes("Schouders")) {
            advice += "<p>Probeer je schouders te ontspannen met een stretch of massage.</p>";
        }
        if (!advice.trim()) {
            advice += "<p>Blijf reflecteren en neem tijd om te ontspannen.</p>";
        }
        return advice;
    };

    const loadDayContent = () => {
        updateProgressBar();
        const exercise = exercises[currentDay - 1];
        document.getElementById("exercise-title").textContent = exercise.title;
        document.getElementById("exercise-description").textContent = exercise.description;
    };

    document.getElementById("start-game-btn").addEventListener("click", () => {
        showSection("check-in-section");
        loadDayContent();
    });

    document.getElementById("check-in-btn").addEventListener("click", () => {
        const emotions = [...document.querySelectorAll("#emotion-choices input:checked")].map(input => input.value);
        const bodyParts = [...document.querySelectorAll("#body-choices input:checked")].map(input => input.value);
        const checkInText = document.getElementById("check-in-text").value.trim();

        if (!checkInText || !emotions.length || !bodyParts.length) {
            alert("Vul alle velden in.");
            return;
        }

        dailyData[currentDay - 1].checkIn = checkInText;
        dailyData[currentDay - 1].emotions = emotions;
        dailyData[currentDay - 1].bodyParts = bodyParts;

        document.getElementById("analysis-result").innerHTML = generateAnalysis(dailyData[currentDay - 1]);
        showSection("analysis-section");
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        document.getElementById("advice-result").innerHTML = generateAdvice(dailyData[currentDay - 1]);
        showSection("advice-section");
    });

    document.getElementById("exercise-btn").addEventListener("click", () => {
        showSection("exercise-section");
    });

    document.getElementById("complete-exercise-btn").addEventListener("click", () => {
        showSection("check-out-section");
    });

    document.getElementById("check-out-btn").addEventListener("click", () => {
        const checkOutText = document.getElementById("check-out-text").value.trim();
        if (!checkOutText) {
            alert("Vul je reflectie in.");
            return;
        }

        dailyData[currentDay - 1].checkOut = checkOutText;
        showSection("sleep-section");
    });

    document.getElementById("next-day-btn").addEventListener("click", () => {
        if (currentDay < totalDays) {
            currentDay++;
            loadDayContent();
            showSection("check-in-section");
        } else {
            alert("Gefeliciteerd! Je hebt alle 14 dagen voltooid.");
        }
    });
});
