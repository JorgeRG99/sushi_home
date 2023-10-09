let createShoppingCard = (shopping_bag) => {
    shopping_bag.innerHTML = ''
    let local_bag = localStorage.getItem('dish')
    local_bag = local_bag.split(",")
    fetch('../assets/js/dishes.json')
        .then(response => response.json())
        .then(data => {
            const dish_count = {};
            let total_price = 0

            local_bag.forEach(element => {
                dish_count[element] = (dish_count[element] || 0) + 1;
            });

            for (item in dish_count) {
                let local_s_dish

                for (dish in data) {
                    if (data[dish].name === item) {
                        local_s_dish = data[dish]
                    }
                }
                let card = document.createElement("div")
                card.classList.add("shopping_card")

                let img = document.createElement("img")
                img.src = local_s_dish["img_url"]
                img.setAttribute("width", "22%")
                card.appendChild(img)

                let card_content = document.createElement("div")
                let card_text = document.createElement("p")
                card_text.textContent = `${local_s_dish["name"]} - ${local_s_dish["price"]}$`
                card_content.appendChild(card_text)
                card.appendChild(card_content)

                let dish_count_box = document.createElement("div")
                card_content.classList.add("card_cunter")
                let dish_count_text = document.createElement("p")
                dish_count_text.textContent = `X${dish_count[item]}`
                dish_count_box.appendChild(dish_count_text)
                card.appendChild(dish_count_box)

                total_price += local_s_dish["price"] * dish_count[item]
                console.log(total_price)

                shopping_bag.appendChild(card)
            }

            let checkout_box = document.createElement("div")
            checkout_box.classList.add("checkout_box")

            let checkout_text = document.createElement("p")
            checkout_text.textContent = `Total ${total_price}$`

            let checkout_btn = document.createElement("a")
            checkout_btn.href = "checkout.html"
            checkout_btn.classList.add("checkout_btn")
            checkout_btn.textContent = "Checkout"

            checkout_box.appendChild(checkout_text)
            checkout_box.appendChild(checkout_btn)
            shopping_bag.appendChild(checkout_box)
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching JSON:', error);
        });
}

let setBag = () => {
    let local_bag = localStorage.getItem('dish')
    let shopping_bag = document.getElementById("shopping_bag")

    if (local_bag === null) {
        if (document.getElementById("empty_text") === null) {
            let empty_text = document.createElement("p")
            empty_text.id = "empty_text"
            empty_text.textContent = "Empty Shopping Bag"
            shopping_bag.appendChild(empty_text)
        }
    } else {
        if (document.getElementById("empty_text") != null) {
            shopping_bag.removeChild(shopping_bag.firstChild);
            shopping_bag.style.height = "auto"
            createShoppingCard(shopping_bag)
        } else {
            createShoppingCard(shopping_bag)
        }
    }
}

function addCart(id) {
    fetch('../assets/js/dishes.json')
        .then(response => response.json())
        .then(data => {
            if (localStorage.getItem('dish') === null) {
                let local_bag = []
                local_bag.push(data[id].name)
                localStorage.setItem('dish', local_bag)
                setBag()
            } else {
                let local_bag = localStorage.getItem('dish')

                if (local_bag != []) {
                    local_bag = local_bag.split(",")
                }

                local_bag.push(data[id].name)
                localStorage.setItem('dish', local_bag)

                setBag()
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching JSON:', error);
        });
}

let displayBag = () => {
    let shopping_bag = document.getElementById("shopping_bag")

    if (shopping_bag.classList.contains('visible')) {
        shopping_bag.classList.remove('visible')
    } else {
        setBag()
        shopping_bag.classList.add('visible')
    }
}
