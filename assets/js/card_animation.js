let text_appear = (card_id, arrow_id) => {
    let card_content = document.getElementById(card_id)
    let arrow = document.getElementById(arrow_id)

    let card_content_classes = card_content.classList

    if(card_content_classes.contains("reveal")) {
        card_content_classes.remove("reveal")
        arrow.classList.remove('rotate')
    }else {
        card_content_classes.add("reveal")
        arrow.classList.add('rotate')
    }

    
}
