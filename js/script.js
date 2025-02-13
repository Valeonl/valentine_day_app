document.addEventListener('DOMContentLoaded', () => {
    
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
	
});
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