//alert("It works!");

console.log("Числа от 10 до 20 включительно.");
for(var i=10; i<=20; i++){
console.log(i);
}
console.log("Квадраты чисел от 10 до 20");
for(var i=10; i<=20; i++){
console.log(Math.pow(i,2));
}
console.log("Сумма всех чисел от 10 до 20");
a = 0
for(var i=10; i<=20; i++){
var a = a + i
}
console.log(a);
alert("В консоле выведены числа от 10 до 20. Их квадраты и сумма всех.");
// Просто выводит два значения
function buttonClick(){
		var x1 = document.getElementById('x1').value;
		var x2 = document.getElementById('x2').value;
		var resultDiv = document.getElementById('result');
		resultDiv.append("x1: "+x1 + ", x2: "+x2);
}

// Выводит сумму двух значений
function buttonClickSum(){
		var x3 = parseInt(document.getElementById('x3').value);
		var x4 = parseInt(document.getElementById('x4').value);
		
		if(Number.isNaN(x3) || Number.isNaN(x4)){
				alert("В поля х3 и х4 д.б. введены числовые значения.");
		} else {
				var resultDivSum = document.getElementById('resultsum');
				resultDivSum.append("x3 + x4 = "+(x3+x4));
		}
}

// Тут ДЗ с 1 по 5 пункт
function buttonClickHW(){
		// Наши переменный из формы
		var d1 = parseInt(document.getElementById('d1').value);
		var d2 = parseInt(document.getElementById('d2').value);
		var resultDivSum = document.getElementById('resulthw'); 
		var DivSumAllD = document.getElementById('sumalld');
		var DivSimp = document.getElementById('simp');
		var SumD = document.getElementById('SumD');
		var UmnD = document.getElementById('UmnD');
		
		// п.1. Тут очищаем всё, что есть в Div. (в теории вынести в отдельную функцию при большом числе Div)
		while (resultDivSum.hasChildNodes()) {
		resultDivSum.removeChild(resultDivSum.firstChild);
		}
		while (DivSumAllD.hasChildNodes()) {
		DivSumAllD.removeChild(DivSumAllD.firstChild);
		}
		while (DivSimp.hasChildNodes()) {
		DivSimp.removeChild(DivSimp.firstChild);
		}
		// п.2. Проверка на пустой ввод.
		if (!document.getElementById('d1').value || !document.getElementById('d2').value) {
				alert("Поля D1 и D2 не д.б. пустыми");
		} else {
				// Тут проверяем, что введены числа
				if(Number.isNaN(d1) || Number.isNaN(d2)){
						alert("В поля D1 и D2 д.б. введены числовые значения.");
				} else {
						resultDivSum.append("d1 + d2 = "+(d1+d2));
						// Тут немного причешем исходные данные на случай творческого подхода пользователя,
						// например введет D1=5 D2=-2 и наш цикл при шаге i++ посчитает неверно. 						
						var Dmin = Math.min(d1, d2);
						var Dmax = Math.max(d1, d2);
						var c = 0;
						var e = 1;
						for(i=Dmin; i<=Dmax; i++){	
							// п.3. Сумма всех чисел от d1 до d2
							var c = c + i
							// к п.5. Произведение всех чисел от d1 до d2							
							var e = e * i	
						}
						// п.6. Тут ищем простые числа. У каждого i смотрим остаток от деления 0 на весь диапазон целых чисел от D1 до D2							
						// При это нет смысла смотреть отрицательную область, поэтому контролируем Dmin д.б. больше 1 
						if (Dmin<2) {
							Dmin=2;
						}
						myMark:
						for (i = Dmin; i <= Dmax; i++) {
							//var y = 0;
							for (var y = Dmin; y < i; y++) {
							  if (i % y == 0) continue myMark; // ПРОВЕРИТЬ сбой когда d1=1 !!!!!!!!!!!!!!!!!!!!!
							}
							DivSimp.append(i+" ");
						}								
						// Тут смотрим выбрана ли сумма и выводим ее, в противном случае умножаем
						if (SumD.checked) {
						DivSumAllD.append("Сумма всех чисел от D1 до D2 = "+c);
						} else {
						DivSumAllD.append("Произведение всех чисел от D1 до D2 = "+e);	
						}						
				}
		}
}

