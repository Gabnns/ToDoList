// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const buscar = document.querySelector("#search-input");
const apaga = document.querySelector('#erase-button');

const filtro = document.querySelector('#filter-select');

let oldInputValue;

// Funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

/* ESSE BLOCO DEFINE QUANDO AS DIVS DEVEM ESTAR VISÍVEIS NA TELA */
const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

/* ESSE BLOCO REFERE-SE A FUNÇÃO DE PERCORRER AS TAREFAS CRIADAS COM A CLASS .TODO E VERIFICAR OS TEXTOS QUANDO EDITADOS SE SERÃO IGUAI OU DIFERENTES, CASO NAO SEJA, RECEBE O NOVO VALOR */
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerHTML = text;
    }
  });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove();
  }
});

/* ESSES DOIS BLOCOS ABAIXO SÃO PARA O FORM DE EDIÇÃO DAS TAREFAS, OQUE SERÁ FEITO COM O BOTÃO CANCELAR E COM O BOTAO DE CONFIRMAR AS ALTERAÇÕES */
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    //atualizar
    updateTodo(editInputValue);
  
    toggleForms();
    }
});

/* Os ESCOPOS ABAIXO, FORAM DESENVOLVIDOS PARA A DIV DE PROCURA E FILTRO DAS TAREFAS ADICIONADAS ANTERIORMENTE */
buscar.addEventListener('input', (e) => {
    e.preventDefault();

    const valorPesquisa = buscar.value.toLowerCase();
    const itens = document.querySelectorAll('.todo');

    itens.forEach(item => {
        const textoItem = item.textContent.toLowerCase();

        if(textoItem.includes(valorPesquisa)) {
            item.style.display = 'flex';
        }else {
            item.style.display = 'none';
        }
    });
        /* o (e)  utilizado aqui serve para quando o evento de click for realizado, a página não fazer o carregamento*/
    apaga.addEventListener('click', (e) => {
        e.preventDefault();

        buscar.value = '';
    });
});

filtro.addEventListener('change', () => {
    const valorSelecionado = filtro.value;
    const divs = document.querySelectorAll('.done');

    divs.forEach(function(div){
        if (valorSelecionado === 'done' || valorSelecionado === 'all'){
            div.style.display = 'flex';
        }else {
            div.style.display = 'none';
        }
    });
    
});