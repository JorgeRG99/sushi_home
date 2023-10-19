async function promotions_generator() {
    fetch('../assets/js/promotions.json')
        .then(response => response.json())
        .then(data => {
            let menu_section = document.getElementById("promotions")

            for (promo in data) {

                let card = document.createElement("div")
                card.classList.add("card")

                let dish_img = document.createElement("img")
                dish_img.src = data[promo]["img_url"]
                dish_img.setAttribute("height", "40%")

                let dish_title = document.createElement("h3")
                dish_title.classList.add("dish_name", "text_box_weight")
                let dish_title_text = document.createTextNode(`${data[promo]["name"]} - ${data[promo]["price"]}$`)
                dish_title.appendChild(dish_title_text)

                let arrow = document.createElement("img")
                arrow.src = "../assets/img/home/dishes/arrow-icon.png"
                arrow.classList.add("arrow")
                arrow.setAttribute("width", "7%")
                arrow.setAttribute("id", promo)
                arrow.setAttribute("onclick", `text_appear("d${promo}", "${promo}")`)

                let dish_desc = document.createElement("div")
                dish_desc.classList.add("dish_description")
                dish_desc.setAttribute("id", `d${promo}`)
                let dish_desc_text = document.createTextNode(`${data[promo]["description"]}`)
                dish_desc.appendChild(dish_desc_text)
                let buy_btn = document.createElement("button")
                buy_btn.classList.add("addCart")
                buy_btn.textContent = "Buy"
                buy_btn.setAttribute("onclick", `addCart("${promo}")`)
                dish_desc.appendChild(buy_btn)

                card.appendChild(dish_img)
                card.appendChild(dish_title)
                card.appendChild(arrow)
                card.appendChild(dish_desc)

                menu_section.appendChild(card)
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching JSON:', error);
        });
}

promotions_generator();