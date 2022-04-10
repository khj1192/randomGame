/**
 * 정리할 점
 * 1. 유저의 입력값을 받았을때 기본동작 해석
 * 2. 맞추지 못했을때 동작 해석
 * 3. 맞췄을때의 동작 해석
 * 4. 새 게임을 눌렀을 때의 동작 해석.
 *  새 게임을 누르게되면 모든 부분을 초기상태로 바꾼다.
 * 게임을 진행하면서 패배나 승리시
 * 텍스트입력태그와 입력버튼이 비활성화, 내가 입력한 값들과 축하or패배 메세지등 
 * 모든 값을 초기상태로 하나씩 입력하여 초기화 한다.
 * 지금 생각해보면 초기화란게 그런거다... 그전까지 어떻게 초기화할까?? 라는
 * 의문이 없어 단순하게 과거로 돌리는 느낌으로 인식하고 있었다.
 * 설명하기가 참 힘든데 처음은 아하! 하고 몇초 후 당연하단 생각이 들었던 로직이다
 * 
 */

let randomNumber = Math.floor(Math.random() * 100) + 1;
// Math.floor() 작은 정수로 반환 랜덤메서드(0~1미만 반환)
// Math.floor(Math.random()) = 0 
// Math.floor(Math.random()*100) = 0~99 +1 = 1~100

// 태그를 변수로 선언. 아래 함수구현시 text추가할때 
// 변수.textContent =''; 문자열추가
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

// 입력하기 버튼 input submit
let guessSubmit = document.querySelector('.guessSubmit');
// input text구간
let guessField = document.querySelector('.guessField');

// 카운트와 리셋버튼 아직까지 어떻게 구동할지 모르겠음.
let guessCount = 1;
let resetButton;

function checkGuess(){
                    // 유저가 입력한 숫자의 값을 변수에 넣는다.
    let userGuess = Number(guessField.value);
    if(guessCount === 1){
        // guessCount가 1이면 텍스트 입력.
        guesses.textContent = '입력한 값: ';
    }
    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber){
        // 해당태그에 축하메시지 추가.
        lastResult.textContent = '축하합니다!!';
        // 해당 태그의 백그라운드 녹색으로 변경
        lastResult.style.backgroundColor = 'green';
        // 해당태그 메시지 입력.
        lowOrHi.textContent = '';
        // 함수실행
        setGameOver();
        // 10회 Count되면 종료.
    } else if(guessCount === 10){
        lastResult.textContent = '게임 오버!!';
        setGameOver();
    } else{
        lastResult.textContent = '오답';

        lastResult.style.backgroundColor = 'red';
        
        // 해당 조건문은 유저의 네비게이션역할.
        if(userGuess < randomNumber){
            lowOrHi.textContent = '입력 숫자보다 더 높아요!';
        } else if(userGuess > randomNumber){
            lowOrHi.textContent = '입력 숫자보다 더 낮아요!';
        }
    }
    // 1씩추가 10회시 종료해주기 위한 카운트
    guessCount++;
    // 유저가 입력한 값을 초기화 해준다.
    guessField.value = '';
    // 입력칸에 .focus();로 클릭한 효과를 부여한다.
    guessField.focus();
}
    // checkGuess();
    // 클릭시 checkGuess함수 실행.
    guessSubmit.addEventListener('click', checkGuess);

    // 게임오버 || 게임승리시 활성화되는 함수.
    function setGameOver(){
        
        // .disabled = true; -> 비활성화
        // guessField, guessSubmit 비활성화 하면서,
        // 버튼을 생성 -> "새 게임" textContent로 추가
        // 클릭시 resetGame 함수 실행.
        guessField.disabled = true;
        guessSubmit.disabled = true;
        // 변수에 버튼태그를 생성
        resetButton = document.createElement('button');
        // 생성된 버튼태그에 새 게임 텍스트 추가
        resetButton.textContent = '새 게임';
        // 바디태그 안에 <button>새 게임</button>을 추가해준다.
        document.body.appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
    }

    // 아래 논리는 모든 상태를 초기상태로 돌려버린다.
    // 입력된 값을 비우고, 바뀐부분을 초기 세팅으로 변경한 후
    // 랜덤변수를 다시 실행해 게임을 리셋하는 로직
    // 게임 승리 || 패배시 활성화 된 "새 게임"을 클릭하면 실행된다.
    function resetGame() {
        // 유저의 카운트를 1로 재할당.
        guessCount = 1;
      
        // resultParas내부 모든 p태그 선택
        let resetParas = document.querySelectorAll('.resultParas p');
        // 반복문으로 p태그 내부를 모두 비워줌.
        for (let i = 0 ; i < resetParas.length ; i++) {
          resetParas[i].textContent = '';
        }
      
        // 새게임 버튼을 지워줌.
        // parentNode는 뭐지???
        resetButton.parentNode.removeChild(resetButton);
        
        // .disabled true값으로 비활성화를 다시 false로 활성화시킴.
        guessField.disabled = false;
        guessSubmit.disabled = false;
        // 입력칸을 다시 비워주고 .focus();로 클릭한 효과를 줌.
        guessField.value = '';
        guessField.focus();
      
        // 다시 배경색 흰색으로.
        lastResult.style.backgroundColor = 'white';
      
        // 랜덤변수 주어짐.
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }



