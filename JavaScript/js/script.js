//alert("It works!");

console.log("����� �� 10 �� 20 ������������.");
for(var i=10; i<=20; i++){
console.log(i);
}
console.log("�������� ����� �� 10 �� 20");
for(var i=10; i<=20; i++){
console.log(Math.pow(i,2));
}
console.log("����� ���� ����� �� 10 �� 20");
a = 0
for(var i=10; i<=20; i++){
var a = a + i
}
console.log(a);
alert("� ������� �������� ����� �� 10 �� 20. �� �������� � ����� ����.");
// ������ ������� ��� ��������
function buttonClick(){
		var x1 = document.getElementById('x1').value;
		var x2 = document.getElementById('x2').value;
		var resultDiv = document.getElementById('result');
		resultDiv.append("x1: "+x1 + ", x2: "+x2);
}

// ������� ����� ���� ��������
function buttonClickSum(){
		var x3 = parseInt(document.getElementById('x3').value);
		var x4 = parseInt(document.getElementById('x4').value);
		
		if(Number.isNaN(x3) || Number.isNaN(x4)){
				alert("� ���� �3 � �4 �.�. ������� �������� ��������.");
		} else {
				var resultDivSum = document.getElementById('resultsum');
				resultDivSum.append("x3 + x4 = "+(x3+x4));
		}
}

// ��� �� � 1 �� 5 �����
function buttonClickHW(){
		// ���� ���������� �� �����
		var d1 = parseInt(document.getElementById('d1').value);
		var d2 = parseInt(document.getElementById('d2').value);
		var resultDivSum = document.getElementById('resulthw'); 
		var DivSumAllD = document.getElementById('sumalld');
		var DivSimp = document.getElementById('simp');
		var SumD = document.getElementById('SumD');
		var UmnD = document.getElementById('UmnD');
		
		// �.1. ��� ������� ��, ��� ���� � Div. (� ������ ������� � ��������� ������� ��� ������� ����� Div)
		while (resultDivSum.hasChildNodes()) {
		resultDivSum.removeChild(resultDivSum.firstChild);
		}
		while (DivSumAllD.hasChildNodes()) {
		DivSumAllD.removeChild(DivSumAllD.firstChild);
		}
		while (DivSimp.hasChildNodes()) {
		DivSimp.removeChild(DivSimp.firstChild);
		}
		// �.2. �������� �� ������ ����.
		if (!document.getElementById('d1').value || !document.getElementById('d2').value) {
				alert("���� D1 � D2 �� �.�. �������");
		} else {
				// ��� ���������, ��� ������� �����
				if(Number.isNaN(d1) || Number.isNaN(d2)){
						alert("� ���� D1 � D2 �.�. ������� �������� ��������.");
				} else {
						resultDivSum.append("d1 + d2 = "+(d1+d2));
						// ��� ������� �������� �������� ������ �� ������ ����������� ������� ������������,
						// �������� ������ D1=5 D2=-2 � ��� ���� ��� ���� i++ ��������� �������. 						
						var Dmin = Math.min(d1, d2);
						var Dmax = Math.max(d1, d2);
						var c = 0;
						var e = 1;
						for(i=Dmin; i<=Dmax; i++){	
							// �.3. ����� ���� ����� �� d1 �� d2
							var c = c + i
							// � �.5. ������������ ���� ����� �� d1 �� d2							
							var e = e * i	
						}
						// �.6. ��� ���� ������� �����. � ������� i ������� ������� �� ������� 0 �� ���� �������� ����� ����� �� D1 �� D2							
						// ��� ��� ��� ������ �������� ������������� �������, ������� ������������ Dmin �.�. ������ 1 
						if (Dmin<2) {
							Dmin=2;
						}
						myMark:
						for (i = Dmin; i <= Dmax; i++) {
							//var y = 0;
							for (var y = Dmin; y < i; y++) {
							  if (i % y == 0) continue myMark; // ��������� ���� ����� d1=1 !!!!!!!!!!!!!!!!!!!!!
							}
							DivSimp.append(i+" ");
						}								
						// ��� ������� ������� �� ����� � ������� ��, � ��������� ������ ��������
						if (SumD.checked) {
						DivSumAllD.append("����� ���� ����� �� D1 �� D2 = "+c);
						} else {
						DivSumAllD.append("������������ ���� ����� �� D1 �� D2 = "+e);	
						}						
				}
		}
}

