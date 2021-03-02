const navBtns = document.querySelectorAll('.nav-btn');
const inputs = document.querySelectorAll(".inputs");

navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.remove('active');
        btn.classList.add('active');
        console.log('farts');
    });
});

inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentNode.style.color="#ff8149";
    });
    input.addEventListener('focusout', () => {
        input.parentNode.style.color="black";
    });
});


