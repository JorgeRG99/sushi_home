let storage_items = localStorage.getItem('dish')
storage_items = storage_items.split(",")
const dish_count = {};
let total_price = 0

let bag_box = document.getElementById("bag")

storage_items.forEach(element => {
    dish_count[element] = (dish_count[element] || 0) + 1;
});

fetch('../assets/js/dishes.json')
    .then(response => response.json())
    .then(data => {
        for (item in dish_count) {
            let local_s_dish

            for (dish in data) {
                if (data[dish].name === item) {
                    local_s_dish = data[dish]
                }
            }
            let card = document.createElement("div")
            card.classList.add("checkout_card")

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
            card_content.classList.add("checkout_counter")
            let dish_count_text = document.createElement("p")
            dish_count_text.textContent = `x${dish_count[item]}`
            dish_count_box.appendChild(dish_count_text)
            card.appendChild(dish_count_box)

            total_price += local_s_dish["price"] * dish_count[item]

            bag_box.appendChild(card)
        }

        let line = document.createElement("div")
        line.classList.add("line")

        let subtotal_box = document.createElement("div")
        subtotal_box.classList.add("subtotal")
        let subtotal = document.createElement("p")
        subtotal.textContent = `Subtotal: ${total_price}$`
        subtotal_box.appendChild(subtotal)

        bag_box.appendChild(line)
        bag_box.appendChild(subtotal_box)
    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error fetching JSON:', error);
    });