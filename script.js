/* Algemene styling */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Secties */
.section {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.section:not(.hidden) {
    display: block;
    opacity: 1;
}

/* Koppen */
h1 {
    font-size: 2.5em;
    color: #9c1925;
    margin-bottom: 20px;
}

h2 {
    font-size: 1.8em;
    color: #444;
    margin-bottom: 15px;
}

h3 {
    font-size: 1.5em;
    color: #555;
    margin-bottom: 10px;
}

/* Paragrafen */
p {
    font-size: 1.2em;
    line-height: 1.6;
    margin-bottom: 20px;
}

/* Lijsten */
ul {
    text-align: left;
    margin: 20px auto;
    max-width: 600px;
}

li {
    font-size: 1em;
    margin-bottom: 10px;
}

/* Tekstvelden */
textarea {
    width: 100%;
    height: 120px;
    font-size: 1.1em;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease-in-out;
}

textarea:focus {
    border-color: #9c1925;
    outline: none;
}

textarea.error {
    border-color: red !important;
}

/* Knoppen */
.btn {
    display: inline-block;
    padding: 12px 20px;
    font-size: 1em;
    background-color: #9c1925;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.btn:hover {
    background-color: #b3212f;
    transform: scale(1.05);
}

.btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Resetknop styling */
.reset-btn {
    background-color: #f39c12;
    color: white;
}

.reset-btn:hover {
    background-color: #e67e22;
}

/* Navigatieknoppen */
.navigation {
    margin-top: 20px;
    text-align: center;
}

/* Analyse sectie stijl */
#analysis-result {
    text-align: left;
    background-color: #f7f7f7;
    padding: 15px;
    border-radius: 10px;
    margin: 20px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#analysis-result h3 {
    color: #9c1925;
    margin-bottom: 10px;
}

/* Voortgangsindicator */
#progress-indicator {
    font-size: 1.2em;
    color: #555;
    margin-bottom: 20px;
}

#progress-indicator span {
    font-weight: bold;
    color: #9c1925;
}

/* Responsieve ontwerpaanpassingen */
@media (max-width: 600px) {
    .container {
        padding: 10px;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.5em;
    }

    .btn {
        padding: 10px 15px;
        font-size: 0.9em;
    }
}
