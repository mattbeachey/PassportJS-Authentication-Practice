//left to do:
//if user adds burger with no name, error message? or randomly generated burger name?


const burgerInputEl = document.getElementById("burgerName")
const burgerButtonEl = document.getElementById("addBurger")

//click handler for menu/about block
const aboutButtonEl = document.getElementById("about-box")
const fillInDivEl = document.getElementById("fillInDiv")
const topBarEl = document.getElementById("bar1")
const midBarEl = document.getElementById("bar2")
const botBarEl = document.getElementById("bar3")
const aboutTextEl = document.getElementById("aboutText")
let appearSelector = 1
aboutButtonEl.addEventListener("click", function (){
    topBarEl.classList.toggle("bar1clicked")
    midBarEl.classList.toggle("bar2clicked")
    botBarEl.classList.toggle("bar3clicked")
    fillInDivEl.classList.toggle("fill-in-div")
    appearSelector++
    console.log(appearSelector)
    if (appearSelector%2 == 0) {
        const aboutTextCont = document.createElement("p")
        aboutTextCont.setAttribute("id", "justSomeRandomId")
         aboutTextEl.append(aboutTextCont)
         aboutTextCont.innerHTML = `
         This full-stack web app is powered by an Express server and a MySQL database,
        accessed using Sequelize as an ORM. Primarily for demonstration purposes, it allows a user to add an entry to a
        global database, view all entries made by others to that database, and modify any item in that database and see
        that modification reflected back in the DOM.
        <br>
        <br>
        Check out the github repository <a href="https://github.com/mattbeachey/sequelize-burger-shop">here.</a>
         `
        setTimeout(function () {
        aboutTextEl.classList.add("appear")
        }, 500)
    } else {
        aboutTextEl.classList.remove("appear")
        const throwAwayConst = document.getElementById("justSomeRandomId")
        throwAwayConst.parentNode.removeChild(throwAwayConst)
    }
})


//add a burger
burgerButtonEl.addEventListener("click", function () {
    if (burgerInputEl.value) {

        name = burgerInputEl.value
        if (name.length < 17) {
        axios.post('/api/burgers', {
            burgerName: name
        })
            .then(function (response) {
                displayBurgers();
                console.log(burgerInputEl)
            })
            .catch(function (error) {
                console.log(error);
            });
            burgerInputEl.setAttribute("placeholder", "Mmmm, sounds like a good burger")
            burgerInputEl.value = "";

        } else {
            burgerInputEl.setAttribute("placeholder", "Your burger name is too long!")
            burgerInputEl.value = "";
        }
    } else {
        // case if user doesn't enter a name for new burger
        burgerInputEl.setAttribute("placeholder", "!!!    Please name your burger    !!!")
        burgerInputEl.focus();
    }
})

test = {id: 1, burgerName: "Good Burger", eaten: true}

//function to alternate the class of the div holding each burger name based on the db entry's ID number
function condimentSelect(burger){
    console.log(burger)
    if (burger%2 == 0){
        if (burger%4 == 0){
            return "1"
        } else {
            return "2"
        }
        
    }
    else {
        if ((--burger)%4 == 0){
            return "3"
        } else {
            return "4"
        }
        
    }
}


//displays all burgers depending on eaten status
function displayBurgers() {
    axios.get('/api/burgers')
        .then(function (response) {
            const uneaten = response.data.filter(function (valueObject) {
                return valueObject.eaten == false
            })
            console.log(uneaten)
            const uneatenBurgersEl = document.getElementById("unEaten")
            const uneatenBurgersStr = uneaten.map(burger => `<div class="condiment${condimentSelect(burger.id)}">${burger.burgerName}<button onclick="eatBurger(${burger.id}) "id="${burger.id}" class="eatbutton${condimentSelect(burger.id)}">&nbsp;Eat This Burger&nbsp;</button></div>`)
            console.log(uneatenBurgersStr)
            const burgersAndButtonsHTML = uneatenBurgersStr.join("<br>")
            uneatenBurgersEl.innerHTML = burgersAndButtonsHTML;

            const eaten = response.data.filter(function (valueObject) {
                return valueObject.eaten == true
            })
            console.log(eaten)
            const eatenBurgersEl = document.getElementById("eaten")
            const eatenBurgersStr = eaten.map(burger => `<div class="condiment${condimentSelect(burger.id)}">${burger.burgerName}</div>`)
            const eatenBurgersHTML = eatenBurgersStr.join("<br>")
            eatenBurgersEl.innerHTML = eatenBurgersHTML
        })
        .catch(function (error) {
            console.log(error);
        });
}

//update individual db entry from uneaten to eaten and repopulate the uneaten and eaten burger lists
function eatBurger(id) {
    console.log(id)
    axios.put(`/api/burgers/${id}`)
        .then(function (response) {
            console.log(response);
            displayBurgers();
        })
        .catch(function (error) {
            console.log(error);
        });
}

displayBurgers()