const worker = new Worker('/js/workers/imagenesPromotores.js');

const nombre = Array(41).fill('PROMOTOR(A)');
const text2_options = Array(41).fill('Global Dorado');

function initializeCarousel(text1_options, text2_options,image_options, carouselId, text1Id, text2Id, imageId, previousBtnId, nextBtnId) {
  let i = 0;
  const carousel = document.getElementById(carouselId);
  const currentOptionText1 = document.getElementById(text1Id);
  const currentOptionText2 = document.getElementById(text2Id);
  const img = document.getElementById(imageId);
  
  const optionPrevious = document.getElementById(previousBtnId);
  const optionNext = document.getElementById(nextBtnId);

  function updateCarousel() {
    // Agregar o quitar clases de animación si es necesario
    carousel.classList.add("anim-next");

     setTimeout(() => {
    img.src=`/promotores/${image_options[i]}`;
  }, 255);

  setTimeout(() => {
    currentOptionText1.innerText = text1_options[i];
    currentOptionText2.innerText = text2_options[i];
    carousel.classList.remove("anim-next");
  }, 450);
  }

  function nextSlide() {
    i = (i + 1) % image_options.length;
    updateCarousel();
  }

  function previousSlide(){
    i = (i - 1 + image_options.length) % image_options.length;//20 divisible entre 21
    updateCarousel();
  }

  optionNext.onclick = nextSlide;
  optionPrevious.onclick = previousSlide;

  updateCarousel();
   // Función para pasar automáticamente al siguiente slide cada 2 segundos
  const intervalId = setInterval(nextSlide,4000);

  // Detener el carrusel automático al hacer clic en una opción manualmente
  optionNext.addEventListener('click', () => {
    clearInterval(intervalId);
  });

  optionPrevious.addEventListener('click', () => {
    clearInterval(intervalId);
  });
}

worker.onmessage = function(event){
	const data = event.data;
  const mitad = Math.ceil(data.length / 2);
  const primeraParte = data.slice(0,mitad);
  const segundaParte = data.slice(mitad);
  // Inicializar el primer carrusel
initializeCarousel(
  nombre,
  text2_options,
  primeraParte,
  "carousel-wrapper",
  "current-option-text1",
  "current-option-text2",
  "img",
  "previous-option",
  "next-option"
);

// Inicializar otro carrusel
initializeCarousel(
  nombre,
  text2_options,
  segundaParte,
  "other-carousel-wrapper",
  "other-current-option-text1",
  "other-current-option-text2",
  "img2",
  "other-previous-option",
  "other-next-option"
);
}

worker.postMessage(true);


