document.addEventListener('DOMContentLoaded', () => {
    let firstCard = null;
    let secondCard = null;
    let canFlip = true;
    let moves = 0;
    let pairs = 0;
    
    function shuffleCards() {
        return [...PAIRS].sort(() => Math.random() - 0.5);
    }
    
    function createCard(cardData) {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-front">❤️</div>
            <div class="card-back">
                <div class="card-emoji">${cardData.emoji}</div>
                <div class="card-label" style="font-size: ${cardData.fontSize || '1.0rem'}">${cardData.label}</div>
            </div>
        `;
        
        card.addEventListener('click', () => handleCardClick(card, cardData));
        return card;
    }
    
    function handleCardClick(card, cardData) {
        if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        SOUNDS.flip.play();
        card.classList.add('flipped');
        
        if (!firstCard) {
            firstCard = { card, cardData };
            return;
        }
        
        secondCard = { card, cardData };
        moves++;
        updateStats();
        
        checkMatch();
    }
    
    function createHeartParticles(x, y) {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = '❤️';
            heart.style.left = `${x + (Math.random() - 0.5) * 100}px`;
            heart.style.top = `${y + (Math.random() - 0.5) * 100}px`;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }
    }
    
    function showCustomAlert(message) {
        // Удаляем предыдущий алерт, если есть
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.textContent = message;
        document.body.appendChild(alert);

        // Показываем алерт
        setTimeout(() => alert.classList.add('show'), 100);

        // Скрываем и удаляем алерт
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 500);
        }, 2000);
    }
    
    function checkMatch() {
        canFlip = false;
        
        if (firstCard.cardData.category === secondCard.cardData.category) {
            // Проверяем, будет ли это последней парой
            if (pairs === 7) {
                // Если это последняя пара, сразу играем звук победы
                setTimeout(() => {
                    SOUNDS.win.play();
                    firstCard.card.classList.add('matched');
                    secondCard.card.classList.add('matched');
                    resetCards();
                    pairs++;
                    updateStats();
                    checkWin();
                }, 500);
            } else {
                SOUNDS.match.play();
                const rect = firstCard.card.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                
                setTimeout(() => {
                    showCustomAlert(`Найдена пара: ${firstCard.cardData.label} + ${secondCard.cardData.label}!`);
                    createHeartParticles(x, y);
                    firstCard.card.classList.add('matched');
                    secondCard.card.classList.add('matched');
                    resetCards();
                    pairs++;
                    updateStats();
                    checkWin();
                }, 500);
            }
        } else {
            setTimeout(() => {
                firstCard.card.classList.remove('flipped');
                secondCard.card.classList.remove('flipped');
                resetCards();
            }, 1000);
        }
    }
    
    function resetCards() {
        firstCard = null;
        secondCard = null;
        canFlip = true;
    }
    
    function updateStats() {
        document.querySelector('.moves').textContent = `Ходов: ${moves}`;
        document.querySelector('.pairs').textContent = `Найдено пар: ${pairs}/8`;
    }
    
    function checkWin() {
        if (pairs === 8) {
            SOUNDS.win.play();
            const randomWish = WISHES[Math.floor(Math.random() * WISHES.length)];
            const modal = document.createElement('div');
            modal.className = 'congratulation-modal';
            modal.innerHTML = `
                <img src="css/pics/angel.png" alt="Святой Валентин">
                <h2>Поздравляем! 🎉</h2>
                <p>Вы нашли все пары за ${moves} ходов!</p>
                <p class="wish">${randomWish}</p>
                <button onclick="saveScreenshot()">Сохранить скриншот 📸</button>
                <button onclick="location.reload()">Играть снова 🔄</button>
            `;
            document.body.appendChild(modal);
        }
    }
    
    // Функция для сохранения скриншота
    window.saveScreenshot = async function() {
        try {
            // Создаем временный контейнер для скриншота
            const screenshotContainer = document.createElement('div');
            screenshotContainer.className = 'screenshot-container';
            
            // Копируем содержимое модального окна
            const modalContent = document.querySelector('.congratulation-modal').cloneNode(true);
            modalContent.querySelectorAll('button').forEach(btn => btn.remove());
            
            screenshotContainer.appendChild(modalContent);
            document.body.appendChild(screenshotContainer);

            // Используем только html2canvas
            html2canvas(screenshotContainer, {
                backgroundColor: 'white',
                scale: 2, // Увеличиваем качество
                useCORS: true, // Разрешаем кросс-доменные изображения
                logging: false,
                windowWidth: screenshotContainer.offsetWidth,
                windowHeight: screenshotContainer.offsetHeight,
                x: screenshotContainer.offsetLeft,
                y: screenshotContainer.offsetTop,
                width: screenshotContainer.offsetWidth,
                height: screenshotContainer.offsetHeight
            }).then(canvas => {
                const link = document.createElement("a");
                link.download = "valentine_wish.png";
                link.href = canvas.toDataURL("image/png", 1.0);
                link.click();
                screenshotContainer.remove();
            }).catch(error => {
                console.error("Screenshot failed:", error);
                alert("Не удалось сохранить скриншот. Пожалуйста, попробуйте еще раз.");
            });
        } catch (error) {
            console.error("Screenshot failed:", error);
            alert("Не удалось сохранить скриншот. Пожалуйста, попробуйте еще раз.");
        }
    };
    
    // Показываем модальное окно с инструкцией
    const introModal = document.createElement('div');
    introModal.className = 'intro-modal';
    introModal.innerHTML = `
        <div class="intro-modal-content">
            <h2>Добро пожаловать! 💝</h2>
            <p>Святой Валентин - очень занятой человек. В День всех влюбленных он должен помочь множеству людей найти свою любовь!</p>
            <p>Помогите ему соединить парные категории на карточках, а он в благодарность подарит вам особое праздничное пожелание!</p>
            <button onclick="startGame()">Всё понятно!</button>
        </div>
    `;
    document.body.appendChild(introModal);

    // Инициализация игры
    const gameGrid = document.querySelector('.game-grid');
    const shuffledCards = getRandomPairs();
    
    shuffledCards.forEach(cardData => {
        gameGrid.appendChild(createCard(cardData));
    });
});

// Функция для начала игры
function startGame() {
    const introModal = document.querySelector('.intro-modal');
    introModal.classList.add('hide');
    setTimeout(() => introModal.remove(), 300);
}

gender = getAllUrlParams().gender;
console.log(gender);
front = document.querySelector('.front');
back =  document.querySelector('.back');
preloader_idio = document.querySelector('.ldio div');
preloader_idio_2 = document.querySelector('.ldio div:before, .ldio div:after');
progressbar = document.querySelector('.progress-value');
progressbar.addEventListener("load", timeout_trigger());
if (gender == "male") {
	front.style.backgroundImage="url(css/pics/heart_male.png)";
	back.style.backgroundImage="url(css/pics/heart_male.png)";
    preloader_idio.style.background = '#455AA5';
    preloader_idio.classList.toggle('gender');
    progressbar.classList.toggle('gender');
    progressbar.style.background = '#455AA5';

}
else {
	front.style.backgroundImage="url(css/pics/heart.png)";
	back.style.backgroundImage="url(css/pics/heart.png)";
    preloader_idio.style.background = 'red';
    progressbar.style.background = 'red';
}

p = 0;

function timeout_trigger() {
    progress_bar = document.querySelector('.progress-value');
    white_bg = document.querySelector('.white_space');
    //console.log(white_bg);
    progress_bar.setAttribute("style",`width:${p+1}%`);
    document.querySelector('.load_value').innerHTML =`${p}%`;
   if(p!=100) {
       setTimeout('timeout_trigger()', 30);
   }
   p++;
   if(p>100)
    {
        white_bg.classList.add('hide');
    }
}


//Регулярное выражение для проверки кода
const regexp = /\d[A-Z,a-z]\d\d[A-Z,a-z][A-Z,a-z]\d/
function getWunch(){
    code = document.getElementById('code_value').value.toUpperCase(); 
	desire_block = document.getElementById('desire');
	front =  document.querySelector('.front');
    back =  document.querySelector('.back');
    if(code.length != 7 || !regexp.test(code))  
        {
            alert('Введённый код не соответсвует формату: 0А00АА0');
            return;
        } 
	
		
    desire_text = CodeArray[code];
	if (typeof desire_text == 'undefined'){
		desire_text = "Святого Валентина лучше не обманывать)";
	}
	
	if( desire_text.length > 150) {
		console.log(desire_text.length);
		desire_block.style = 'font-size: 1em;';
	}
	else desire_block.style = 'font-size: 1.2em;';
	
    desire_block.innerHTML = `${desire_text}`;    
    
    front.style.transform = 'rotateY(180deg)';
    back.style.transform = 'rotateY(360deg)';
    
    
       
}
function takeshot() {
    document.querySelector('.front').style.display = "none";
    document.getElementById('screen_text').innerHTML = 'Моё пожелание)';   
    
    html2canvas(document.body).then(canvas => {
        let a = document.createElement("a");
        a.download = "my_valentins_desire.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
      });
    
    document.getElementById('screen_text').innerHTML = 'Сохранить скриншот!';   
}

async function Screenshot(){
    var constraints = {
        preferCurrentTab: true,
        audio: false,
        video: {
          width: { ideal: 1920, max: 7680 },
          height: { ideal: 1080, max: 4320 }
        }
      }
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            video.play();

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            //stream.getVideoTracks()[0].stop();
            document.body.appendChild(canvas);
            /*
            let a = document.createElement("a");
            a.download = "ss.png";
            a.href = canvas.toDataURL("image/png");
            a.click();
            */
        });
        video.srcObject = stream;
        console.log(stream);
    }
    catch (error) {
        console.log(error);
    }
}

function getAllUrlParams(url) {

  // извлекаем строку из URL или объекта window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // объект для хранения параметров
  var obj = {};

  // если есть строка запроса
  if (queryString) {

    // данные после знака # будут опущены
    queryString = queryString.split('#')[0];

    // разделяем параметры
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // разделяем параметр на ключ => значение
      var a = arr[i].split('=');

      // обработка данных вида: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // передача значения параметра ('true' если значение не задано)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // преобразование регистра
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // если ключ параметра уже задан
      if (obj[paramName]) {
        // преобразуем текущее значение в массив
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // если не задан индекс...
        if (typeof paramNum === 'undefined') {
          // помещаем значение в конец массива
          obj[paramName].push(paramValue);
        }
        // если индекс задан...
        else {
          // размещаем элемент по заданному индексу
          obj[paramName][paramNum] = paramValue;
        }
      }
      // если параметр не задан, делаем это вручную
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}