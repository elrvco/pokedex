const nav = document.querySelector("nav");
const main = document.querySelector("main");
const showTiposBtn = document.querySelector("#tipos");
const showSearchBtn = document.querySelector("#search");
showTiposBtn.addEventListener("click", showTiposSection);
showSearchBtn.addEventListener("click", showSearchForm);

function getRandomColor() {
  let randomColor = Math.floor(Math.random() * 5592405).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
}

function removeChildElements(parent) {
  if (parent.hasChildNodes) {
    parent.innerHTML = "";
  }
}

function showSearchForm() {
  removeChildElements(nav);
  const input = document.createElement("input");
  const searchBtn = document.createElement("button");
  input.required = true;
  searchBtn.textContent = "Search";
  nav.appendChild(input);
  nav.appendChild(searchBtn);
  nav.style.backgroundColor = "transparent";
  searchBtn.addEventListener("click", () => {
    removeChildElements(main);
    const inputValue = input.value.toLowerCase();
    fetch("https://pokeapi.co/api/v2/pokemon/" + inputValue)
      .then((response) => response.json())
      .then((pokeData) => {
        const pokeCard = document.createElement("div");
        const pokeDataCont = document.createElement("div");
        const pokeProperties = document.createElement("div");
        const alturaCont = document.createElement("div");
        const pesoCont = document.createElement("div");
        const tiposCont = document.createElement("div");
        const sonidoCont = document.createElement("div");
        const pokeImage = document.createElement("img");
        const pokeName = document.createElement("h3");
        const pokeId = document.createElement("p");
        const propertiesHead = document.createElement("p");
        const alturaLabel = document.createElement("p");
        const pesoLabel = document.createElement("p");
        const tiposLabel = document.createElement("p");
        const sonidoLabel = document.createElement("p");
        const alturaData = document.createElement("p");
        const pesoData = document.createElement("p");
        const pokeAudio = document.createElement("audio");
        const audioSource = document.createElement("source");
        const playAudioBtn = document.createElement("button");

        //asignacion de atributos
        playAudioBtn.addEventListener("click", () => {
          pokeAudio.play();
        });
        playAudioBtn.textContent = "PLAY";
        audioSource.type = "audio/ogg";
        audioSource.src = pokeData.cries.latest;
        pokeImage.src =
          pokeData["sprites"]["other"]["official-artwork"]["front_default"];
        pokeImage.id = "pokeImage2";
        pokeCard.id = "pokeCard2";
        pokeDataCont.id = "pokeDataCont";
        pokeProperties.id = "pokeProperties";
        alturaCont.id = "alturaCont";
        pesoCont.id = "pesoCont";
        tiposCont.id = "tiposCont";
        sonidoCont.id = "sonidoCont";
        propertiesHead.id = "propertiesHead";

        pokeId.textContent = String(pokeData.id).padStart(4, "0");
        pokeName.textContent = pokeData.name;
        propertiesHead.textContent = "Data";
        alturaLabel.textContent = "Height";
        pesoLabel.textContent = "Weight";
        tiposLabel.textContent = "Types";
        sonidoLabel.textContent = "Cries";
        alturaData.textContent = Number(pokeData.height) / 10 + "m";
        pesoData.textContent = Number(pokeData.weight) / 10 + "kg";

        //asignacion de padres
        pokeCard.appendChild(pokeImage);
        pokeCard.appendChild(pokeDataCont);
        pokeDataCont.appendChild(pokeName);
        pokeDataCont.appendChild(pokeId);
        pokeDataCont.appendChild(propertiesHead);
        pokeDataCont.appendChild(pokeProperties);
        pokeAudio.appendChild(audioSource);
        pokeProperties.appendChild(alturaCont);
        alturaCont.appendChild(alturaLabel);
        alturaCont.appendChild(alturaData);

        pokeProperties.appendChild(pesoCont);
        pesoCont.appendChild(pesoLabel);
        pesoCont.appendChild(pesoData);
        pokeProperties.appendChild(tiposCont);
        tiposCont.appendChild(tiposLabel);
        pokeProperties.appendChild(sonidoCont);
        sonidoCont.appendChild(sonidoLabel);
        sonidoCont.appendChild(playAudioBtn);

        pokeData.types.forEach((element) => {
          const tipo = document.createElement("p");
          tipo.textContent = element.type.name;
          tipo.style.backgroundColor = getRandomColor();
          tiposCont.appendChild(tipo);
        });

        main.appendChild(pokeCard);
      });
  });
}

function showTiposSection() {
  removeChildElements(nav);
  nav.style.backgroundColor = "rgb(185, 21, 21)";
  fetch("https://pokeapi.co/api/v2/type/")
    .then((response) => response.json()) //obtenemos el tipo(type) y el url del pokemon al que se refiere
    .then((data) => {
      data.results.forEach((object) => {
        let typeButton = document.createElement("button");
        fetch(object.url)
          .then((response) => response.json())
          .then((data) => {
            typeButton.style.backgroundImage = `url(
              ${data["sprites"]["generation-viii"]["sword-shield"]["name_icon"]})`;
            typeButton.style.backgroundSize = "contain";
            typeButton.style.backgroundRepeat = "no-repeat";
          });

        typeButton.addEventListener("click", () => {
          removeChildElements(main);
          fetch(object.url)
            .then((response) => response.json()) //obtenemos url del perfil completo del pokemon
            .then((typesData) => {
              typesData.pokemon.forEach((element) => {
                fetch(element.pokemon.url)
                  .then((response) => response.json()) // obtenemos name(nombre), abilities (habilidades),cries (sonidos),sprites(imagenes)
                  .catch((error) => {
                    console.log("error capturado", error);
                  })
                  .then((pokeData) => {
                    let pokeCard = document.createElement("div");
                    let pokeName = document.createElement("h3");
                    let pokeImage = document.createElement("img");
                    let pokeId = document.createElement("p");
                    let abiliTitle = document.createElement("p");
                    let abiliContainer = document.createElement("div");
                    pokeCard.id = "pokeCard";
                    pokeImage.id = "pokeImage";
                    abiliTitle.textContent = "Skills";
                    pokeId.textContent = String(pokeData.id).padStart(4, "0");
                    pokeName.textContent = pokeData.name;
                    pokeImage.src =
                      pokeData["sprites"]["other"]["official-artwork"][
                        "front_default"
                      ];
                    main.appendChild(pokeCard);
                    pokeCard.appendChild(pokeImage);
                    pokeCard.appendChild(pokeId);
                    pokeCard.appendChild(pokeName);
                    pokeCard.appendChild(abiliTitle);
                    pokeCard.appendChild(abiliContainer);
                    //la propiedad abilites contiene un array con los nombres de las abilidades
                    pokeData.abilities.forEach((element) => {
                      const pokeAbility = document.createElement("p");
                      pokeAbility.textContent = element.ability.name;
                      abiliContainer.appendChild(pokeAbility);
                    });
                  });
              });
            });
        });
        nav.appendChild(typeButton);
      });
    });
}
