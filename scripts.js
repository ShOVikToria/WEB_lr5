// Завдання 1. Поміняйте місцями контент блоків «х» та «у»
var Xblock = document.getElementById("x"), 
    Yblock = document.getElementById("y");
var tempSRC = Xblock.src;
var tempClass = Xblock.className;
Xblock.className = Yblock.className;
Yblock.className = tempClass;
Xblock.src = Yblock.src;
Yblock.src = tempSRC;

/* Завдання 2. Напишіть функцію, яка обчислює площу
прямокутника, беручи необхідні значення із
відповідних змінних у скрипті, і виводить
отриманий результат в кінці контенту в блоці «5».*/
var a = Math.floor(Math.random() * 99) + 2;
var b = Math.floor(Math.random() * 99) + 2;
var square = a * b;
console.log(a);
console.log(b);
console.log(square);
var Block5 = document.getElementById("5");
Block5.innerHTML += "<br><strong>Площа прямокутника: " + square;

/* Завдання 3. Напишіть скрипт, який визначає кількість мінімальних чисел із 10 значень, 
беручи необхідні значення із відповідної форми в блоці «5», а отриманий результат 
виводить за допомогою діалогового вікна і зберігає в cookies, причому:
а) при оновленні веб-сторінки в броузері користувачу за допомогою діалогового вікна 
виводиться інформація, збережена в cookies, із питанням про необхідність зберегти дані 
із cookies, і не виводиться згадана вище форма;
б) при підтвердженні питання виводиться наступне діалогове вікно із інформуванням 
користувача про наявність cookies і необхідність перезавантаження веб-сторінки;
в) при відмові відповідні cookies видаляються, і веб-сторінка оновлюється з
початковим станом із наявною формою для введення даних.*/

// Функції роботи з cookies
function setCookie(name, value, days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArr = decodedCookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        let c = cookieArr[i].trim();
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.getElementById('minNumberForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let form = event.target;
    let numbers = [];
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type === "number") {
            numbers.push(Number(form.elements[i].value));
        }
    }

    let minValue = Math.min(...numbers);
    let minCount = numbers.filter(num => num === minValue).length;

    alert(`Мінімальне число: ${minValue}, кількість його повторень: ${minCount}`);
    setCookie("minResult", `Мінімальне число: ${minValue}, кількість повторень: ${minCount}`, 7);
});

let form = document.getElementById('minNumberForm');

window.onload = function ()  {
    let savedData = getCookie("minResult");
    
    
    form.style.display = "none";
    
    if (savedData) {       
        let userChoice = confirm(`Є збережені дані з cookies:\n\n${savedData}\n\n Бажаєте їх зберегти?`);
        
        if (userChoice) {
            let reloadChoice = confirm("Бажаєте перезавантажити сторінку, щоб внести нові дані у форму? Cookies буде видалено");
            if (reloadChoice) {
                deleteCookie("minResult");
                alert("Cookies видалено, можете вносити дані у форму знову");
                location.reload();
            } else {
                alert("Cookies збережені. Якщо хочете ввести дані у форму знову, видаліть інформацію, збережену в Cookies, для цього оновіть сторінку та оберіть необхідну опцію");
            }
        } else {
            deleteCookie("minResult");
            alert("Cookies видалено, можете вносити дані у форму знову");
            form.reset(); 
            form.style.display = "flex"; 
            location.reload();
        }
    } 
    else {
        form.style.display = "flex";
        form.reset(); 
    }
};

/*Завдання 4. Напишіть скрипт, який при настанні події keypress встановлює властивість
«курсив» для всього тексту в блоці «4» при встановленні користувачем відповідної галочки 
у формі і зберігає відповідне значення «курсивності» тексту в localStorage броузера так, 
щоб при наступному відкриванні веб-сторінки значення «курсивності» тексту в блоці «4» 
встановлювалось із збереженого значення в localStorage.*/

const checkbox = document.getElementById('toggle-italic');
const block = document.getElementById('block-4');

const savedItalic = localStorage.getItem('italic');
if (savedItalic === 'true') {
  block.style.fontStyle = 'italic';
  checkbox.checked = true;
} else {
  block.style.fontStyle = 'normal';
  checkbox.checked = false;
}

document.addEventListener('keypress', () => {
  if (checkbox.checked) {
    block.style.fontStyle = 'italic';
    localStorage.setItem('italic', 'true');
  } else {
    block.style.fontStyle = 'normal';
    localStorage.setItem('italic', 'false');
  }
});

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    block.style.fontStyle = 'italic';
    localStorage.setItem('italic', 'true');
  } else {
    block.style.fontStyle = 'normal';
    localStorage.setItem('italic', 'false');
  }
});

/*Завдання 5. Напишіть скрипт задання CSS-інструкцій для будь-якого тега в HTML-структурі
номерних блоків (1..6):
а) необхідні елементи форми появляються у блоці «5» внаслідок подвійного
кліку на блоці «у», кількість CSS-інструкцій необмежена;
б) після елементів форми розміщується кнопка, внаслідок натискання на яку
додана CSS-інструкція зберігається в localStorage броузера і задіюється для
відповідного тега;*/

let applyCSSButton = document.getElementById("applyCSS");
let setCSSButton = document.getElementById("setCSS");

// пункт А
Yblock.addEventListener("dblclick", () => {
  form.style.setProperty("display", "flex", "important");
  applyCSSButton.style.display = "inline-block";
  setCSSButton.style.display = "inline-block"; 
});

//Пункт Б
applyCSSButton.addEventListener("click", () => {
  const cssRule = form.className;
  localStorage.setItem("block5Style", cssRule);
});

var counter = 0;

setCSSButton.addEventListener("click", () => {
    counter++;
    if(form.className != "minNumberForm2"){
        form.className = "minNumberForm2";
    }
    else{
        form.className = "minNumberForm";
    }    
});


window.addEventListener("load", () => {
  const savedStyle = localStorage.getItem("block5Style");
  if (savedStyle) {
    form.className= savedStyle;
  }
});