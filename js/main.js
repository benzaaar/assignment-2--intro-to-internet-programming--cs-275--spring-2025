// -----------------------------------------------------------------------------
// This file includes deliberate formatting errors in order for you to verify
// that ESLint and EditorConfig are working properly. If both tools are, indeed,
// working correctly, then you’d see errors in your editor about indentation and
// improper use of footmarks instead of back ticks. When you save this file,
// your editor should strip all excess newlines and whitespace characters from
// the file. If both of these events occur, then ESLint and EditorConfig are
// working correctly.
//
// DON’T PROCEED UNTIL YOU’RE SURE ESLINT AND EDITORCONFIG ARE WORKING CORRECTLY
// -----------------------------------------------------------------------------
window.onload = () => {
       alert('Test');                    
}


















let imgPlace = document.querySelector(`div.carousel-slides`);

const createSlide = (artist, artistUrl, album, coverPath, coverAlt, reviewContent, reviewSource, reviewUrl, creditText, creditUrl) => {
    let slideWrapper = document.createElement(`div`);
    slideWrapper.className = `slide`;

    let artistLabel = document.createElement(`div`);
    artistLabel.className = `artist-name`;
    let artistLink = document.createElement(`a`);
    artistLink.href = artistUrl;
    artistLink.target = `_blank`;
    artistLink.textContent = artist;
    artistLabel.appendChild(artistLink);

    let image = document.createElement(`img`);
    image.src = coverPath;
    image.alt = coverAlt;
    image.className = `carousel-img`;

    let creditLink = document.createElement(`a`);
    creditLink.href = creditUrl;
    creditLink.target = `_blank`;
    creditLink.className = `image-credit`;
    creditLink.textContent = creditText;

    let description = document.createElement(`div`);
    description.className = `description`;
    description.textContent = reviewContent;

    let reviewSourceLink = document.createElement(`a`);
    reviewSourceLink.href = reviewUrl;
    reviewSourceLink.target = `_blank`;
    reviewSourceLink.className = `review-source`;
    reviewSourceLink.textContent = `Review by: ${reviewSource}`;

    slideWrapper.appendChild(artistLabel);
    slideWrapper.appendChild(image);
    slideWrapper.appendChild(creditLink);
    slideWrapper.appendChild(description);
    slideWrapper.appendChild(reviewSourceLink);

    imgPlace.appendChild(slideWrapper);
    return slideWrapper;
};

fetch(`../json/data.json`)
    .then(response => response.json())
    .then(data => {
        let slides = data.map(item => {
            return createSlide(
                item.artist,
                item.url,
                item.album,
                item.cover_image.path,
                item.cover_image.alt_content,
                item.review.content,
                item.review.source,
                item.review.url,
                item.cover_image.credit,
                item.cover_image.url
            );
        });

        let selected = 0;

        const select = (n) => {
            if (n < 0 || n >= slides.length) return;
            slides[selected].classList.remove(`selected`);
            slides[n].classList.add(`selected`);
            selected = n;
        };

        select(0);

        document.querySelector(`.carousel-navigation a:nth-child(1)`).onclick = () => select(selected - 1);
        document.querySelector(`.carousel-navigation a:nth-child(2)`).onclick = () => select(selected + 1);
    });
