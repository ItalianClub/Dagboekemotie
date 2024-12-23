    /* Algemene styling */
body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    margin: 0;
    padding: 0;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Voortgangsbalk */
#progress-bar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
}

#progress-bar-inner {
    height: 20px;
    width: 0;
    background-color: #4caf50;
    transition: width 0.3s ease;
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

/* Knoppen */
.btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1em;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: #45a049;
}

/* Tekstvelden */
textarea {
    width: 100%;
    height: 120px;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
}

/* Checkbox opties */
#emotion-choices label, #body-choices label {
    display: inline-block;
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    padding: 10px 15px;
    border-radius: 20px;
    cursor: pointer;
    margin: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

#emotion-choices input[type="checkbox"], #body-choices input[type="checkbox"] {
    display: none;
}

#emotion-choices input:checked + label, #body-choices input:checked + label {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
}
