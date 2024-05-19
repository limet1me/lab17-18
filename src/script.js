document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    const showFavoriteBtn = document.getElementById('show-favorites-btn');
    const showToysBtn = document.getElementById('show-toys');
    const showHatsBtn = document.getElementById('show-hats');
    const showAllBtn = document.getElementById('show-all');
    const priceSlider = document.getElementById('priceSlider');
    const priceValue = document.getElementById('priceValue');

    showAllBtn.addEventListener('click', () => filterProducts());
    showToysBtn.addEventListener('click', () => filterProducts('toys'));
    showHatsBtn.addEventListener('click', () => filterProducts('hats'));
    showFavoriteBtn.addEventListener('click', () => filterProducts('favorite'));
    priceSlider.addEventListener('input', () => filterProducts());

    function filterProducts(filterType) {
        let price = parseInt(priceSlider.value);
        priceValue.textContent = price;

        products.forEach(product => {
            let productPrice = parseInt(product.dataset.price);
            let isToys = product.dataset.toys === 'true';
            let isHats = product.dataset.hats === 'true';
            let isFavorite = product.dataset.favorite === 'true';

            if (productPrice >= price && (
                !filterType ||
                (filterType === 'toys' && isToys) ||
                (filterType === 'hats' && isHats) ||
                (filterType === 'favorite' && isFavorite)
            )) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    products.forEach(product => {
        const favoriteBtn = product.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            let isFavorite = product.dataset.favorite === 'true';
            product.dataset.favorite = !isFavorite;
            favoriteBtn.classList.toggle('favorite', !isFavorite);
        });
    });

    document.querySelectorAll('.product-slider').forEach(sliderContainer => {
        const slider = sliderContainer.querySelector('.slider');
        const prevButton = sliderContainer.querySelector('.prev-button');
        const nextButton = sliderContainer.querySelector('.next-button');
        const slides = Array.from(slider.querySelectorAll('img'));
        const slideCount = slides.length;
        let slideIndex = 0;

        prevButton.addEventListener('click', () => {
            slideIndex = (slideIndex - 1 + slideCount) % slideCount;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            slideIndex = (slideIndex + 1) % slideCount;
            updateSlider();
        });

        function updateSlider() {
            slides.forEach((slide, index) => {
                slide.style.display = index === slideIndex ? 'block' : 'none';
            });
        }

        updateSlider();
    });

    filterProducts();
});
