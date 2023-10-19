let displayLogin = () => {
    let shopping_bag = document.getElementById("user_login_box")

    if (shopping_bag.classList.contains('visible_user')) {
        shopping_bag.classList.remove('visible_user')
    } else {
        setBag()
        shopping_bag.classList.add('visible_user')
    }
}