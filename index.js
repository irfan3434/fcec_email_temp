var languageStrings = {
    en: {
        greetingTitle: "Signature Email Template",
        enterYourName: "Enter your name:",
        enterYourProfession: "Enter your Profession",
        enteryourNumber: "Enter Your Number",
        enteryourEmail: "Enter Your Email",
        chooseTemplate: "Choose a template:",
        generate: "Generate",
        pleaseSelectTemplate: "Please select a template"
    },
    ar: {
        greetingTitle: "صفحة تهاني العيد",
        enterYourName: "أدخل أسمك",
        enterYourProfession: "أدخل مهنتك",
        enteryourNumber: "أدخل رقمك",
        enteryourEmail: "أدخل بريدك الإلكتروني",
        chooseTemplate: "اختر قالبًا",
        generate: "يولد",
        pleaseSelectTemplate: "اختر قالبًا",
        fontFamily: 'Sakkal Majalla, sans-serif !important',
    }
};

function changeLanguage() {
    var lang = document.getElementById('language').value;
    var strings = languageStrings[lang];

    document.querySelector('h1').innerText = strings.greetingTitle;
    // Ensure that the correct label is targeted for each field
    var labels = document.querySelectorAll('#emailform label');
    labels[0].innerText = strings.enterYourName; // Assuming this is the first label
    labels[1].innerText = strings.enterYourProfession;
    labels[2].innerText = strings.enteryourNumber;
    labels[3].innerText = strings.enteryourEmail;
    // Add similar lines for other labels if necessary

    document.querySelector('.create').value = strings.generate;

    if (lang === 'ar') {
        document.querySelector('.container').style.direction = 'rtl';
    } else {
        document.querySelector('.container').style.direction = 'ltr';
    }
}

document.getElementById('language').addEventListener('change', changeLanguage);

changeLanguage();



function getUserInput() {
    return {
        name: document.getElementById('name').value,
        profession: document.getElementById('profession').value, // Assuming there's an element with ID 'profession'
        number: document.getElementById('number').value, // Assuming there's an element with ID 'number'
        email: document.getElementById('email').value // Assuming there's an element with ID 'email'
    };
}




var canvas = new fabric.Canvas('emailDisplay');

document.querySelectorAll('.template-option').forEach(templateOption => {
    templateOption.addEventListener('click', function() {
        // Remove 'selected' class from all options and add to the clicked one
        document.querySelectorAll('.template-option').forEach(option => {
            option.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});



document.getElementById("emailform").addEventListener("submit", function(event) {
    event.preventDefault();
    var userInput = getUserInput();
    var selectedTemplate = document.querySelector('.template-option.selected');

    if (!selectedTemplate) {
        alert(languageStrings[document.getElementById('language').value].pleaseSelectTemplate);
        return;
    }

        // Correcting the image path
        var template = selectedTemplate.dataset.template;
        var imagePath = 'assets/' + template;
        fabric.Image.fromURL(imagePath, function(img) {
            canvas.clear();
            canvas.setWidth(img.width);
            canvas.setHeight(img.height);
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top'
            });
    
            addTextToCanvas(canvas, userInput);
        }, { crossOrigin: 'anonymous' });
});

function addTextToCanvas(canvas, userInput) {
    // Add the text objects for name, profession, number, and email
    var nameText = new fabric.Text(userInput.name, { left: 100, top: 520, fontFamily: 'Arial', fontSize: 60, fontWeight:600, fill: '#E3AD38' });
    var professionText = new fabric.Text(userInput.profession, { left: 220, top: 705, fontFamily: 'Arial', fontSize: 48, fontWeight:600, fill: '#E3AD38' });
    var numberText = new fabric.Text(userInput.number, { left: 220, top: 875, fontFamily: 'Arial', fontSize: 48, fontWeight:600, fill: '#E3AD38' });
    var emailText = new fabric.Text(userInput.email, { left: 220, top: 1038, fontFamily: 'Arial', fontSize: 48, fontWeight:600, fill: '#E3AD38' });
    // Add other text objects similarly...

    canvas.add(nameText, professionText, numberText, emailText);
    canvas.renderAll();

    // Setup download functionality after a short delay
    setTimeout(function() {
        let dataURL = canvas.toDataURL({format: 'png'});
        downloadImage(dataURL, 'customized-signature.png');
    }, 500);
}

function downloadImage(dataURL, filename) {

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        window.open(dataURL); // Or, you could create an offscreen element to 'click'.
    } else {
    let downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    }

    document.getElementById('emailform').reset();
    // Optionally, if you want to refresh the entire page, uncomment the following line:
     window.location.reload();
    
}

function getUserInput() {
    return {
        name: document.getElementById('name').value,
        profession: document.getElementById('profession').value,
        number: document.getElementById('number').value,
        email: document.getElementById('email').value
    };
}