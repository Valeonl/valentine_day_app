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

        // Очищаем текст от HTML тегов
        const cleanMessage = message.replace(/<br>/g, ' ');

        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.textContent = cleanMessage;
        document.body.appendChild(alert);

        setTimeout(() => alert.classList.add('show'), 100);
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 500);
        }, 2000);
    }
    
    function checkMatch() {
        canFlip = false;
        
        if (firstCard.cardData.category === secondCard.cardData.category) {
            if (pairs === 7) {
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
                
                // Очищаем текст от HTML тегов для сообщения
                const firstLabel = firstCard.cardData.label.replace(/<br>/g, ' ');
                const secondLabel = secondCard.cardData.label.replace(/<br>/g, ' ');
                
                setTimeout(() => {
                    showCustomAlert(`Найдена пара: ${firstLabel} + ${secondLabel}!`);
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
                <p class="wish-title">Святой Валентин желает Вам:</p>
                <div class="wish-container">
                    ${randomWish}
                </div>
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
            
            // Копируем содержимое модального окна и очищаем от HTML тегов
            const modalContent = document.querySelector('.congratulation-modal').cloneNode(true);
            modalContent.querySelectorAll('button').forEach(btn => btn.remove());
            
            screenshotContainer.appendChild(modalContent);
            document.body.appendChild(screenshotContainer);

            // Даем время для загрузки изображений
            setTimeout(() => {
                html2canvas(screenshotContainer, {
                    backgroundColor: '#ffffff',
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    onrendered: function(canvas) {
                        const link = document.createElement("a");
                        link.download = "valentine_wish.png";
                        link.href = canvas.toDataURL("image/png");
                        link.click();
                        screenshotContainer.remove();
                    }
                });
            }, 100);
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
            <p>Святой Валентин - очень занятой человек. </p>
            <p>В День всех влюбленных он должен помочь множеству людей найти свою любовь!</p>
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

    // Инициализация прогресс-бара
    const progressbar = document.querySelector('.progress-value');
    const preloader_idio = document.querySelector('.ldio div');
    
    // Устанавливаем стандартные красные стили
    if (preloader_idio) {
        preloader_idio.style.background = 'red';
    }
    if (progressbar) {
        progressbar.style.background = 'red';
    }

    // Запускаем анимацию загрузки
    let p = 0;
    function timeout_trigger() {
        const progress_bar = document.querySelector('.progress-value');
        const white_bg = document.querySelector('.white_space');
        
        if (progress_bar) {
            progress_bar.style.width = `${p+1}%`;
        }
        
        const load_value = document.querySelector('.load_value');
        if (load_value) {
            load_value.innerHTML = `${p}%`;
        }
        
        if (p != 100) {
            setTimeout(timeout_trigger, 30);
        }
        p++;
        
        if (p > 100 && white_bg) {
            white_bg.classList.add('hide');
        }
    }

    // Запускаем прогресс
    timeout_trigger();
});

// Функция для начала игры
function startGame() {
    const introModal = document.querySelector('.intro-modal');
    introModal.classList.add('hide');
    setTimeout(() => introModal.remove(), 300);
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