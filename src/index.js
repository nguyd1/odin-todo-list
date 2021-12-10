import './style.css';

const container=document.querySelector(".container");
const header=document.querySelector(".header");

let projectLibrary=[];

function Project(name){
    this.name=name;
    this.todos=[];
}

function addProjectButton(name){
    const btn=document.createElement("button");
    btn.classList.add("newProject");
    btn.textContent=name;
    header.appendChild(btn);

    btn.addEventListener("click",()=>{
        const name=window.prompt("Enter name: ");
        projectLibrary.push(new Project(name));
        addProject(name);
    });
}

function addProject(name){
    const div=document.createElement("div");
    div.classList.add("project");
    div.textContent=name;
    div.id=projectLibrary.length-1;
    container.appendChild(div);

    div.addEventListener("click",function(e){
        clearPage();
        printNotes(e.target.id);
    });
}

function Todo(title,description,dueDate,priority){
    this.title=title;
    this.description=description;
    this.dueDate=dueDate;
    this.priority=priority;
}

function addTodoButton(name,idx){
    const btn=document.createElement("button");
    btn.classList.add("newTodo");
    btn.textContent=name;
    header.appendChild(btn);

    btn.addEventListener("click",()=>{
        const title=window.prompt("Enter title: ");
        const description=window.prompt("Enter description: ");
        const dueDate=window.prompt("Enter due date: ");
        const priority=window.prompt("Enter priority: ");
        addTodo(title,description,dueDate,priority,idx);
    });

    addReturnButton("Return");
}

function addReturnButton(name){
    const btn=document.createElement("button");
    btn.classList.add("return");
    btn.textContent=name;
    header.appendChild(btn);

    btn.addEventListener("click",()=>{
        clearPage();
        printHome();
    });
}

function addTodo(title,description,dueDate,priority,idx){
    const div=document.createElement("div");
    div.classList.add("todo");
    div.textContent=title;
    div.id=projectLibrary[idx].todos.length;
    container.appendChild(div);

    projectLibrary[idx].todos.push(new Todo(title,description,dueDate,priority));
}

function clearPage(){
    header.innerHTML="";
    container.innerHTML="";
}

function printHome(){
    addProjectButton("New Project");
    for(let i=0;i<projectLibrary.length;i++){
        addProject(projectLibrary[i].name);
    }
}

function printNotes(idx){
    console.log(idx);
    addTodoButton("New Note",idx);
    // for(let i=0;i<projectLibrary[idx].todos.length;i++){
    //     addTodo(projectLibrary[idx].todos[i].title,
    //         projectLibrary[idx].todos[i].description,
    //         projectLibrary[idx].todos[i].dueDate,
    //         projectLibrary[idx].todos[i].priority,
    //         idx);
    // }
}

// init
if(projectLibrary.length===0) projectLibrary.push(new Project("Default"));
printHome();