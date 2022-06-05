document.addEventListener('DOMContentLoaded', () => {



    const links = document.querySelectorAll('.nav__links'),
        tabs = document.querySelectorAll('.tab'),
        commonWrapper = document.querySelector('.common__wrapper'),
        favoriteWrapper = document.querySelector('.favorite__wrapper');

    let favoriteCatCard = localStorage.getItem('cats') ? JSON.parse(localStorage.getItem('cats')) : [];

    fetch('https://api.thecatapi.com/v1/images/search?limit=15')
        .then(response => response.json())
        .then(cats => {
            console.log(cats)
            cats.map((item, index) => {
                // console.log(item)
                commonWrapper.innerHTML += `
            <div class="cat__card">
                <img src="${item.url}" alt="">
                <button class="heart">
                <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            `})
            const buttonsHeart = document.querySelectorAll('.heart');
            buttonsHeart.forEach((item, index) => {
                // item.addEventListener('mouseover', function (event) {
                //     if (event.target == item.childNodes[1]) {
                //         if (event.target.classList.contains('fa-regular')) {
                //             event.target.classList.remove('fa-regular')
                //             event.target.classList.add('fa-solid')
                //         } 
                //     }
                // })
                // item.addEventListener('mouseout', function (event) {
                //     if (event.target == item.childNodes[1]) {
                //         if (event.target.classList.contains('fa-solid')) {
                //             event.target.classList.add('fa-regular')
                //             event.target.classList.remove('fa-solid')
                //         } 
                //     }
                // })

                item.addEventListener('click', function (event) {
                    if (event.target == item.childNodes[1]) {
                        if (event.target.classList.contains('fa-solid')) {
                            event.target.classList.remove('fa-solid')
                            event.target.classList.add('fa-regular')
                        }
                        else if (event.target.classList.contains('fa-regular')) {
                            event.target.classList.remove('fa-regular')
                            event.target.classList.add('fa-solid')

                            favoriteCatCard.push(cats[index]);
                            localStorage.setItem('cats', JSON.stringify(favoriteCatCard));
                        }
                    }
                })
            })
        });
    console.log(favoriteCatCard)


    links.forEach((item, index) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            if (!item.classList.contains('is-active')) {
                for (let i = 0; i < links.length; i++) {
                    links[i].classList.remove('is-active');
                    tabs[i].classList.add('d-none');
                }
                item.classList.add('is-active');
                tabs[index].classList.remove('d-none');
            }
            if(index == 1){
                console.log(1)
                favoriteWrapper.innerHTML = ''
                favoriteCatCard.map((item, index) => {
                    // console.log(item)
                    favoriteWrapper.innerHTML += `
                    <div class="cat__card">
                        <img src="${item.url}" alt="">
                        <button class="heart">
                        <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                `})
            }
        })
    })

})
