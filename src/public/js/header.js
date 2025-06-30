//Create sets and folder
const toggle = document.getElementById('createToggle');
const content = document.getElementById('createContent');

toggle.addEventListener("click", function(e){
    e.stopPropagation();

    if(content.style.display === 'block'){
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
});

document.addEventListener("click", function(){
    content.style.display = 'none';
});

//Search
const keyWord = document.getElementById('inputSearch');
const history = document.getElementById('searchHistory');

keyWord.addEventListener("click", function(e){
    e.stopPropagation();

    if(history.style.display === 'block'){
        history.style.display = 'none';
    } else {
        history.style.display = 'block';
    }
});

history.addEventListener("click", function(e){
    e.stopPropagation();
})

document.addEventListener("click", function(){
    history.style.display = 'none';
});






