// Тут наполняем массив, соответствующий картинкам, тосуем его
// И дальше идем по функциям, начиная с Заполнения таблицы
function buttonClickGenerate(){
	var DivInfo = document.getElementById('Info');	
	clearAll (DivInfo); // Тут очищаем всё, что есть в Div
	var DivVic = document.getElementById('myVictory');
	clearAll (DivVic);
	// В массиве 2 раза от 1 до 18, т.к. нужны пары картинок, а это сейчас самый быстрый и простой способ
	var myArr = [];
	var a=document.getElementById('L1').value; // Выбранный размер поля
	var b = (a/2); // Сколько картинок грузить	
	for (var i=1; i<=b; i++){		
		// Два раза потому, что картинки нужны парные
		myArr.push(i); 
		myArr.push(i);		
	}
	//var myArr = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
	Marr = shuffleArray(myArr);
		// Тут генерим случайную последовательность для картинок
		// Идею по сортировке взял здесь https://toster.ru/q/163095
		function shuffleArray(array) {
		array.sort(function(){ return 0.5-Math.random() });
		}
	var iSizeTable = Math.sqrt(myArr.length);
	editTable(iSizeTable, myArr); // Заполняем таблицу
} // Окончание buttonClickGenerate
 
// Заполняем таблицу
// Идея подсмотрена здесь https://webew.ru/articles/598.webew
function editTable(iSizeTable, myArr) {
	var chbox = document.getElementById('myHelp'); // Чек-бокс нужна ли помощь
    var N = 0; // Номер ячеек от 0 до 35 (ибо хранение в массиве с 0, чтобы не путаться дальше)
	var table = document.getElementById("tbl"); // Берем таблицу, которую будем заполнять
 	clearAll (table); // На всякий случай чистим таблицу
	for(var i=0; i<iSizeTable; i++){ 				// for_1
	var newrow = table.insertRow(-1); 				// Добавляем строку
		for(var j=0; j<iSizeTable; j++){ 			// for_2
			var myCell = newrow.insertCell(-1);     // Добавляем ячейку
			if (chbox.checked) { // Проверяем нужна ли помощь
				myCell.innerHTML = myArr[N];// myCell.innerHTML = N + "_" + myArr[N];	// Подсказка Номер и Рандомный номер картинки		
			}
			addMainElement(myCell, N, myArr[N]); // Вставляем элементы
			var N = N + 1;
		} // Окончание for_2
	} // Окончание for_1
} // Окончание editTable

// Тут заполняем ячейку таблицы активным элементом
// Идея вставки картинки отсюда http://qaru.site/questions/946747/insert-image-into-table-cell-in-javascript
function addMainElement(myCell,N,myArrN) {
	var myImg = document.createElement('img'); // Создаем картинку
	myImg.setAttribute("class","element"); // По общему классу позже возьмем все картинки только из таблицы сразу
	myImg.src = "images/0.png";	// Эта ссылка подгрузит "рубашку" 
	myImg.name = N; // Порядковый номер ячейки
	myImg.id = 'images/' + myArrN + '.png'; // Здесь сгенерированное изображение, которое скрыто		
	myImg.setAttribute("onclick","imgСhange(this,'images/0.png','images/" + myArrN + ".png')"); // Тут событие при клике по картинке. Конкретно смена картинки, для пользователя это выглядит как отображение картинки	
	myCell.appendChild(myImg); // Добавляем картинку в ячейку	
}

// Тут функция по смене картинки при клике
// Идея отсюда https://javascript.ru/forum/misc/5434-smena-kartinok-pri-klike.html
function imgСhange(obj,imgX,imgY) {
// Что передаю(this, images/0.png, images/XX.png)	
	obj.src = imgY; // Открываем изображение путем замены 0.PNG на XX.PNG
	var objName = obj.name; // Фактически Номер ячейки от 0 до 35 в которую ткнул пользователь
	 //console.log(imgX,imgY);
	var Allimg = document.getElementsByClassName('element'); // тут берем все картинки (коллекцию)
    // Идея отсюда http://qaru.site/questions/70809/using-foreach-on-an-array-from-getelementsbyclassname-results-in-typeerror-undefined-is-not-a-function
	Array.from(Allimg).forEach(function(imgForSearch) { // Перебираем все картинки в таблице
        var checkImgNumber = (objName != imgForSearch.name); // Проверяем что номер текущей картинки не равен перебираемой
		if (checkImgNumber) { // if_1 True, если перебераемый элемент не он сам
			var sScrImg = String(imgForSearch.src); // делаем строку из текущей ссылки на картинку
			var itFirstChoiceImg = sScrImg.endsWith(imgX); // True если ссылка заканчивается на images/0.png
			//console.log(itFirstChoiceImg);
			if (itFirstChoiceImg) { // If_2 True если картинку не тыкали
				// Ничего не делаем
			} else {
			var checkImgSrc = (obj.src == imgForSearch.src ); // Проверяем совпадает ли картинка текущего выбора с ранее открытыми
				//console.log(checkImgSrc);
				if (checkImgSrc) { // if_3  
						// Удаляем обе картинки при совпадении
						setTimeout(function(){
						imgForSearch.parentNode.removeChild(imgForSearch);
						obj.parentNode.removeChild(obj);
						}, 300); // 0.3 секунды ибо дольше ждать не охото
						endGame();
						//console.log("Совпали");
				} else { 
						// Раз не совпали меняем на images/0.png (скрываем от пользователя) и сразу задерживаем 
						setTimeout(function(){
							obj.src = imgX;
							imgForSearch.src = imgX
						}, 300); // 0.3 секунды ибо дольше ждать не охото
				} // end if_3
			} // end if_2
		} // end if_1
	});

} // Окончание imgСhange

// Тут всё чистим
function clearAll (XXX) {
 	while (XXX.hasChildNodes()) {
	XXX.removeChild(XXX.firstChild);
	}
} // Окончание clearAll

// Окончание игры
function endGame () { // Тут всё чистим и поздравляем
	console.clear()
	var YYY = document.getElementsByClassName('element'); // тут берем все картинки (коллекцию). Д.б. 2 элемента
	//console.log(YYY.length);
	var GameOver = YYY.length; // Определяем сколько
	if (GameOver == 2) { // if_1 Если на последних двух выборах у пользователя оставалось 2, то считаем сейчас был победный "тык"
		var table = document.getElementById("tbl"); // Берем таблицу, которую будем очищать
		clearAll (table); // очищаем таблицу
		var DivVic = document.getElementById('myVictory'); // находим элемент для вывода поздравления
		DivVic.append("ПОБЕДА"); // Выводим поздравление
	} // end if_1
} // Окончание endGame