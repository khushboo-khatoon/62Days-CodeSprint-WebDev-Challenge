let task=document.querySelector("input")
let add=document.querySelector(".addBtn");
let list=document.querySelector(".list");


add.addEventListener("click",()=>{
    let newTask=document.createElement("div");
list.append(newTask);
newTask.setAttribute("class","newTask");
newTask.innerHTML=`<div class="taskBox"><input type="radio" class="done">
    <p class="taskText">${task.value}</p>
    </div>
    <button class="delete">❌</button>`;
})
list.addEventListener("click", (e) => {
    //here e.target means the exact elemnt which is clicked
    if (e.target.classList.contains("delete")) {
        e.target.closest(".newTask").remove();
    }
});

list.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
        const radio = e.target;
        const taskText = radio.closest(".taskBox").querySelector(".taskText");//we have target that specific text here

        if (radio.dataset.checked === "true") {
            radio.checked = false;
            radio.dataset.checked = "false";
            taskText.style.textDecoration = "none";
        } else {
            radio.checked = true;
            radio.dataset.checked = "true";
            taskText.style.textDecoration = "line-through";
        }
    }
});