//============= START: create new note  ============//
function criarTarefa() {
  const place = document.querySelector('.view_notes');
  const notas = document.createElement('article');
  notas.classList.add('sticky-note');
  const conteudo = `</div><textarea class="sticky-title sticky" rows="1" cols="25" placeholder="Title..."></textarea><textarea class="sticky-body sticky" rows="8" cols="25"></textarea>`; //tagged template literals
  notas.innerHTML = conteudo;

  const header = document.createElement('div');
  header.classList.add('sticky-header');

  const botaox = botaoDeleta();

  notas.ondragstart = function () {
    // browser has its own drag’n’drop support for images and some other elements. It runs automatically and conflicts with ours.To disable it:
    return false;
  };
  //============= END: create new note  ============//

  //============= START: make notes float through viewport ============//
  notas.onmousedown = function (event) {
    let shiftX = event.clientX - notas.getBoundingClientRect().left;
    let shiftY = event.clientY - notas.getBoundingClientRect().top;

    notas.style.position = 'absolute';
    notas.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the note at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      notas.style.left = pageX - shiftX + 'px';
      notas.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // move the note on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the note, remove unneeded handlers
    notas.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      notas.onmouseup = null;
    };
  };

  notas.ondragstart = function () {
    return false;
  };
  //============= END: make notes float through viewport =====//

  notas.prepend(header);
  header.append(botaox);
  place.appendChild(notas);
}
//=============START: click on the button to create a new note =====//
const botao = document.getElementById('newnote');

botao.addEventListener('click', () => {
  criarTarefa();
});
//=============END: click on the button to create a new note =====//
//=============START: little X to delete sticky note =====//

const botaoDeleta = () => {
  const deletarSticky = document.createElement('button');
  deletarSticky.classList.add('delete-button');

  deletarSticky.addEventListener('click', deletarTarefa);
  return deletarSticky;
};

const deletarTarefa = (e) => {
  const deletarSticky = e.target.parentElement.parentElement;
  deletarSticky.remove();
};
//=============END: little X to delete sticky note =====//
