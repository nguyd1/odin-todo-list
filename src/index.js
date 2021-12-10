import './style.css';

let myLibrary=[];

const newProject=document.querySelector(".newProject");
const newTodo=document.querySelector(".newTodo");
const container=document.querySelector(".container");

function todo(title,description,dueDate,priority){
    this.title=title;
    this.description=description;
    this.dueDate=dueDate;
    this.priority=priority;
}

function addTodo(title,description,dueDate,priority){
    myLibrary.push(new todo(title,description,dueDate,priority));
    display();
}

function display(){

}

const setData=()=>localStorage.setItem("library",JSON.stringify(myLibrary));

myLibrary=JSON.parse(localStorage.getItem("library"));
if(myLibrary) display();
else myLibrary=[];

// newTodo.addEventListener("click",()=>{
//     const title=window.prompt("Enter title: ");
//     const description=window.prompt("Enter description: ");
//     const dueDate=window.prompt("Enter due date: ");
//     const priority=window.prompt("Enter priority: ");
//     addTodo(title,description,dueDate,priority);
//     display();
// });

newProject.addEventListener("click",()=>{
    const name=window.prompt("Enter name: ");
    const div=document.createElement("div");
    div.classList.add("project");
    div.textContent=name;
    container.appendChild(div);
});