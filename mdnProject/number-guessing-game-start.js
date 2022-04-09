/**
 * 정리할 점
 * 1. 유저의 입력값을 받았을때 기본동작 해석
 * 2. 맞추지 못했을때 동작 해석
 * 3. 맞췄을때의 동작 해석
 * 4. 새 게임을 눌렀을 때의 동작 해석.
 * 
 */

var randomNumber = Math.floor(Math.random() * 100) + 1;
// Math.floor() 작은 정수로 반환 랜덤메서드(0~1미만 반환)
// Math.floor(Math.random()) = 0 
// Math.floor(Math.random()*100) = 0~99 +1 = 1~100

// 태그를 변수로 선언. 아래 함수구현시 text추가할때 
// 변수.textContent =''; 문자열추가
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

// 다음의 입력과 버튼을 받고, 추측된 값을 나중에 받도록한다?
var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

// 카운트와 리셋버튼 아직까지 어떻게 구동할지 모르겠음.
var guessCount = 1;
var resetButton;

function checkGuess(){
                    // 왜 Num으로 형변환 하지?
    var userGuess = Number(guessField.value);
    if(guessCount === 1){
        // guessCount가 1이면 텍스트 입력.
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber){
        lastResult.textContent = '축하합니다!!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
        // 10회 Count되면 종료.
    } else if(guessCount === 10){
        lastResult.textContent = '게임 오버!!';
        setGameOver();
    } else{
        lastResult.textContent = 'Wrong';

        lastResult.style.backgroundColor = 'red';
        
        if(userGuess < randomNumber){
            // 여기서 에러가 났다.
            // userGuess; -> userGuess를 찾지 못한다. 임의로 1을 넣어줌
            // userGuess 비교연산자 randomNumber 사용 문제없음.
            // lowOrHi.textContent = '임의값'; -> 에러
            // HTML에서는 제대로 명시 됐음을 확인.. 뭘까;;
            // 처음 변수선언때 돔객체 쿼리의 클래스 .(온점)을 빼먹음
            lowOrHi.textContent = '입력 숫자보다 더 높아요!';
        } else if(userGuess > randomNumber){
            lowOrHi.textContent = '입력 숫자보다 더 낮아요!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}
    // checkGuess();
    // 클릭시 checkGuess함수 실행.
    guessSubmit.addEventListener('click', checkGuess);

    function setGameOver(){
        
        // .disabled = true; -> 비활성화
        // guessField, guessSubmit 비활성화 하면서,
        // 버튼을 생성 -> "새 게임" textContent로 추가
        // 클릭시 resetGame 함수 실행.
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = '새 게임';
        document.body.appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        guessCount = 1;
      
        var resetParas = document.querySelectorAll('.resultParas p');
        for (var i = 0 ; i < resetParas.length ; i++) {
          resetParas[i].textContent = '';
        }
      
        resetButton.parentNode.removeChild(resetButton);
        
        // .disabled = false; -> 활성화
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();
      
        lastResult.style.backgroundColor = 'white';
      
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }



