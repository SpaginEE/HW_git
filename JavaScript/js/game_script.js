// ��� ��������� ������, ��������������� ���������, ������ ���
// � ������ ���� �� ��������, ������� � ���������� �������
function buttonClickGenerate(){
	var DivInfo = document.getElementById('Info');	
	clearAll (DivInfo); // ��� ������� ��, ��� ���� � Div
	var DivVic = document.getElementById('myVictory');
	clearAll (DivVic);
	// � ������� 2 ���� �� 1 �� 18, �.�. ����� ���� ��������, � ��� ������ ����� ������� � ������� ������
	var myArr = [];
	var a=document.getElementById('L1').value; // ��������� ������ ����
	var b = (a/2); // ������� �������� �������	
	for (var i=1; i<=b; i++){		
		// ��� ���� ������, ��� �������� ����� ������
		myArr.push(i); 
		myArr.push(i);		
	}
	//var myArr = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
	Marr = shuffleArray(myArr);
		// ��� ������� ��������� ������������������ ��� ��������
		// ���� �� ���������� ���� ����� https://toster.ru/q/163095
		function shuffleArray(array) {
		array.sort(function(){ return 0.5-Math.random() });
		}
	var iSizeTable = Math.sqrt(myArr.length);
	editTable(iSizeTable, myArr); // ��������� �������
} // ��������� buttonClickGenerate
 
// ��������� �������
// ���� ����������� ����� https://webew.ru/articles/598.webew
function editTable(iSizeTable, myArr) {
	var chbox = document.getElementById('myHelp'); // ���-���� ����� �� ������
    var N = 0; // ����� ����� �� 0 �� 35 (��� �������� � ������� � 0, ����� �� �������� ������)
	var table = document.getElementById("tbl"); // ����� �������, ������� ����� ���������
 	clearAll (table); // �� ������ ������ ������ �������
	for(var i=0; i<iSizeTable; i++){ 				// for_1
	var newrow = table.insertRow(-1); 				// ��������� ������
		for(var j=0; j<iSizeTable; j++){ 			// for_2
			var myCell = newrow.insertCell(-1);     // ��������� ������
			if (chbox.checked) { // ��������� ����� �� ������
				myCell.innerHTML = myArr[N];// myCell.innerHTML = N + "_" + myArr[N];	// ��������� ����� � ��������� ����� ��������		
			}
			addMainElement(myCell, N, myArr[N]); // ��������� ��������
			var N = N + 1;
		} // ��������� for_2
	} // ��������� for_1
} // ��������� editTable

// ��� ��������� ������ ������� �������� ���������
// ���� ������� �������� ������ http://qaru.site/questions/946747/insert-image-into-table-cell-in-javascript
function addMainElement(myCell,N,myArrN) {
	var myImg = document.createElement('img'); // ������� ��������
	myImg.setAttribute("class","element"); // �� ������ ������ ����� ������� ��� �������� ������ �� ������� �����
	myImg.src = "images/0.png";	// ��� ������ ��������� "�������" 
	myImg.name = N; // ���������� ����� ������
	myImg.id = 'images/' + myArrN + '.png'; // ����� ��������������� �����������, ������� ������		
	myImg.setAttribute("onclick","img�hange(this,'images/0.png','images/" + myArrN + ".png')"); // ��� ������� ��� ����� �� ��������. ��������� ����� ��������, ��� ������������ ��� �������� ��� ����������� ��������	
	myCell.appendChild(myImg); // ��������� �������� � ������	
}

// ��� ������� �� ����� �������� ��� �����
// ���� ������ https://javascript.ru/forum/misc/5434-smena-kartinok-pri-klike.html
function img�hange(obj,imgX,imgY) {
// ��� �������(this, images/0.png, images/XX.png)	
	obj.src = imgY; // ��������� ����������� ����� ������ 0.PNG �� XX.PNG
	var objName = obj.name; // ���������� ����� ������ �� 0 �� 35 � ������� ����� ������������
	 //console.log(imgX,imgY);
	var Allimg = document.getElementsByClassName('element'); // ��� ����� ��� �������� (���������)
    // ���� ������ http://qaru.site/questions/70809/using-foreach-on-an-array-from-getelementsbyclassname-results-in-typeerror-undefined-is-not-a-function
	Array.from(Allimg).forEach(function(imgForSearch) { // ���������� ��� �������� � �������
        var checkImgNumber = (objName != imgForSearch.name); // ��������� ��� ����� ������� �������� �� ����� ������������
		if (checkImgNumber) { // if_1 True, ���� ������������ ������� �� �� ���
			var sScrImg = String(imgForSearch.src); // ������ ������ �� ������� ������ �� ��������
			var itFirstChoiceImg = sScrImg.endsWith(imgX); // True ���� ������ ������������� �� images/0.png
			//console.log(itFirstChoiceImg);
			if (itFirstChoiceImg) { // If_2 True ���� �������� �� ������
				// ������ �� ������
			} else {
			var checkImgSrc = (obj.src == imgForSearch.src ); // ��������� ��������� �� �������� �������� ������ � ����� ���������
				//console.log(checkImgSrc);
				if (checkImgSrc) { // if_3  
						// ������� ��� �������� ��� ����������
						setTimeout(function(){
						imgForSearch.parentNode.removeChild(imgForSearch);
						obj.parentNode.removeChild(obj);
						}, 300); // 0.3 ������� ��� ������ ����� �� �����
						endGame();
						//console.log("�������");
				} else { 
						// ��� �� ������� ������ �� images/0.png (�������� �� ������������) � ����� ����������� 
						setTimeout(function(){
							obj.src = imgX;
							imgForSearch.src = imgX
						}, 300); // 0.3 ������� ��� ������ ����� �� �����
				} // end if_3
			} // end if_2
		} // end if_1
	});

} // ��������� img�hange

// ��� �� ������
function clearAll (XXX) {
 	while (XXX.hasChildNodes()) {
	XXX.removeChild(XXX.firstChild);
	}
} // ��������� clearAll

// ��������� ����
function endGame () { // ��� �� ������ � �����������
	console.clear()
	var YYY = document.getElementsByClassName('element'); // ��� ����� ��� �������� (���������). �.�. 2 ��������
	//console.log(YYY.length);
	var GameOver = YYY.length; // ���������� �������
	if (GameOver == 2) { // if_1 ���� �� ��������� ���� ������� � ������������ ���������� 2, �� ������� ������ ��� �������� "���"
		var table = document.getElementById("tbl"); // ����� �������, ������� ����� �������
		clearAll (table); // ������� �������
		var DivVic = document.getElementById('myVictory'); // ������� ������� ��� ������ ������������
		DivVic.append("������"); // ������� ������������
	} // end if_1
} // ��������� endGame