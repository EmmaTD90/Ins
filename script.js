// Initialiser EmailJS
(function () {
    emailjs.init("email_iK5F12QHpmEJpC1B1J1PbatT");
})();

document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country');
    const phonePrefixInput = document.getElementById('phonePrefix');

    // Liste des pays et préfixes
    const countries = [
        { name: "Benin", prefix: "+229" },
        { name: "France", prefix: "+33" },
        { name: "USA", prefix: "+1" },
        { name: "Canada", prefix: "+1" },
        { name: "UK", prefix: "+44" }
    ];

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        option.text = `${country.name} (${country.prefix})`;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', () => {
        const selectedCountry = countries.find(c => c.name === countrySelect.value);
        phonePrefixInput.value = selectedCountry ? selectedCountry.prefix : '';
    });

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const serviceID = 'service_wa2242e';
        const templateID = 'template_vd3ztyg';

        const formData = new FormData();
        formData.append("lastName", document.getElementById('lastName').value);
        formData.append("firstName", document.getElementById('firstName').value);
        formData.append("gender", document.getElementById('gender').value);
        formData.append("country", document.getElementById('country').value);
        formData.append("phone", `${phonePrefixInput.value} ${document.getElementById('phone').value}`);
        formData.append("profession", document.getElementById('profession').value);
        formData.append("income", document.getElementById('income').value);
        formData.append("loanReason", document.getElementById('loanReason').value);
        formData.append("email", document.getElementById('email').value);
        formData.append("idDocument", document.getElementById('idDocument').files[0]);

        emailjs.sendForm(serviceID, templateID, formData)
            .then(() => {
                document.getElementById('status').innerText = 'Your application has been successfully submitted!';
                document.getElementById('status').style.color = 'green';
            })
            .catch(() => {
                document.getElementById('status').innerText = 'There was an error sending your application. Please try again.';
                document.getElementById('status').style.color = 'red';
            });
    });
});