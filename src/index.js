import './style.css';

const container=document.querySelector(".container");
const header=document.querySelector(".header");
const body=document.querySelector("body");

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
        setData();
        addProject(name,projectLibrary.length-1);
    });
}

function addProject(name,id){
    const div=document.createElement("div");
    div.classList.add("project");
    div.id=id;
    container.appendChild(div);

    const h1=document.createElement("h1");
    h1.textContent=name;
    div.appendChild(h1);

    const btn=document.createElement("button");
    btn.classList.add("removeProject");
    btn.textContent="Remove";
    div.appendChild(btn);

    div.addEventListener("click",()=>{
        clearPage();
        printNotes(id);
    });

    btn.addEventListener("click",function(e){
        e.stopPropagation();
        projectLibrary.splice(id,1);
        setData();
        clearPage();
        printHome();
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
        const priority=window.prompt("Enter priority (color): ");
        projectLibrary[idx].todos.push(new Todo(title,description,dueDate,priority));
        setData();
        addTodo(title,description,dueDate,priority,projectLibrary[idx].todos.length-1,idx);
    });
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

function addTodo(title,description,dueDate,priority,id,idx){
    const div=document.createElement("div");
    div.classList.add("todo");
    div.id=id
    div.style.backgroundColor=priority;
    container.appendChild(div);

    const h1=document.createElement("h1");
    h1.textContent="Title: "+title;
    div.appendChild(h1);

    const h2=document.createElement("h2");
    h2.textContent="Due date: "+dueDate;
    div.appendChild(h2);

    const h3=document.createElement("h3");
    div.appendChild(h3);

    const btn=document.createElement("button");
    btn.classList.add("removeTodo");
    btn.textContent="Remove";
    div.appendChild(btn);

    div.addEventListener("click",()=>{
        h3.textContent=!h3.textContent?"Description: "+description:"";
    });

    btn.addEventListener("click",function(e){
        e.stopPropagation();
        projectLibrary[idx].todos.splice(id,1);
        setData();
        clearPage();
        printNotes(idx);
    });
}

function clearPage(){
    header.innerHTML="";
    container.innerHTML="";
}

function printHome(){
    body.style.backgroundColor="lightblue";

    addProjectButton("New Project");
    for(let i=0;i<projectLibrary.length;i++){
        addProject(projectLibrary[i].name,i);
    }
}

function printNotes(idx){
    body.style.backgroundColor="lightgreen";

    addTodoButton("New Note",idx);
    addReturnButton("Return");
    for(let i=0;i<projectLibrary[idx].todos.length;i++){
        addTodo(projectLibrary[idx].todos[i].title,
            projectLibrary[idx].todos[i].description,
            projectLibrary[idx].todos[i].dueDate,
            projectLibrary[idx].todos[i].priority,
            i,
            idx);
    }
}

// localStorage
const setData=()=>localStorage.setItem("library",JSON.stringify(projectLibrary));

projectLibrary=JSON.parse(localStorage.getItem("library"));

// init
if(!projectLibrary) projectLibrary=[], projectLibrary.push(new Project("Default",0));
printHome();