import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";
function forms(formSelector, modalTimerId) {
// Forms
const forms = document.querySelectorAll(formSelector);
const message ={
   // loading: 'Загрузка',
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не  так...'
};
forms.forEach(item => {
    bindPostData(item);
});



function bindPostData (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // const statusMessage = document.createElement('div');
        const statusMessage = document.createElement('img');
        // statusMessage.classList.add('status');
        statusMessage.src = message.loading;
        // statusMessage.textContent = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        // form.append(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage);
        
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
     /*    const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        }); */
    
 /*        fetch('server.php', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
           body: JSON.stringify(object)
        }) */
        postData('http://localhost:3000/requests', json)
        // .then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
        
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
prevModalDialog.classList.add('hide');
openModal('.modal', modalTimerId );

const thanksModal = document.createElement('div');
thanksModal.classList.add('modal__dialog');
thanksModal.innerHTML = `
<div class="modal__content">
<div class="modal__close" data-close>x</div>
<div class="modal__title">${message}</div>
</div>
 `;

 document.querySelector('.modal').append(thanksModal);
 setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal('.modal');
 }, 4000);
}

fetch('http://localhost:3000/menu')
.then(data => data.json())
.then(res => console.log(res));

}

export default forms;