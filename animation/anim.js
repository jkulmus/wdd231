// get green button
const greenButton = document.querySelector('.green');
// get blue shape
const blueShape = document.querySelector('.blue');
// add event listener to green button
greenButton.addEventListener('click', () => {
    //toggle the show class on the blue shape
    blueShape.classList.toggle('show');
});