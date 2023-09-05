var cursor = document.getElementById("cursor")

var btn_hover = document.getElementsByClassName("btn_cursor_hover")

for (var btn of btn_hover) {
    btn.addEventListener("mouseover", () => {
        cursor.classList.add("cursor--links-hover")
    });
    
    btn.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor--links-hover")
    });   
}



window.addEventListener("mousemove", (e) => {  
    cursor.style.left = (e.clientX) + "px";
    cursor.style.top = (e.clientY) + "px";
});
