let currentLevel = 15 * 5; // Updated initial level
let currentStage = 1;
let currentBetUnit = 0;
let totalUnits = 15 * 5; // Updated initial total units
let winStreak = 0;
let betHistory = [];

const levelMap = {};

// Original levelMap data with levels and bet units multiplied by 5
const originalLevelMap = {
    3: {
        1: { bet: 3, win: { type: 'goto', level: 6 }, lose: { type: 'gameOver' } }
    },
    4: {
        1: { bet: 4, win: { type: 'goto', level: 8 }, lose: { type: 'gameOver' } }
    },
    5: {
        1: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevel', units: [2, 4] }, lose: { type: 'goto', stage: 2 } },
        2: { bet: 3, win: { type: 'calcLevelSubUnit', subtract: 2 }, lose: { type: 'gameOver' } }
    },
    6: {
        1: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevel', units: [2, 4] }, lose: { type: 'goto', stage: 2 } },
        2: { bet: 4, win: { type: 'calcLevelSubUnit', subtract: 2 }, lose: { type: 'gameOver' } }
    },
    7: {
        1: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevel', units: [2, 4] }, lose: { type: 'goto', stage: 2 } },
        2: { bet: 5, win: { type: 'calcLevelSubUnit', subtract: 2 }, lose: { type: 'gameOver' } }
    },
    8: {
        1: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevel', units: [2, 4] }, lose: { type: 'goto', stage: 2 } },
        2: { bet: 6, win: { type: 'calcLevelSubUnit', subtract: 2 }, lose: { type: 'gameOver' } }
    },
    9: {
        1: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevel', units: [2, 4] }, lose: { type: 'goto', stage: 2 } },
        2: { bet: 7, win: { type: 'calcLevelSubUnit', subtract: 2 }, lose: { type: 'gameOver' } }
    },
    10: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 7, win: { type: 'goto', level: 14 }, lose: { type: 'gameOver' } }
    },
    11: {
        1: { bet: 2, win: { type: 'calcLevelSumCurrentLevel', units: [2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 7, win: { type: 'goto', level: 14 }, lose: { type: 'gameOver' } }
    },
    12: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet: 7, win: { type: 'goto', level: 14 }, lose: { type: 'gameOver' } }
    },
    13: {
        1: { bet: 2, win: { type: 'calcLevelSumCurrentLevel', units: [2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet: 7, win: { type: 'goto', level: 14 }, lose: { type: 'gameOver' } }
    },
    14: {
        1: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevel', units: [2, 4] }, lose: { type: 'goto', stage: 2 } },
        2: { bet: 3, win: { type: 'goto', level: 15 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 5 }, lose: { type: 'gotoLevel', level: 6 } }
    },
    15: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 6 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 } }
    },
    16: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 6 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 } }
    },
    17: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 6 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 } }
    },
    18: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 6 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 } }
    },
    19: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 6 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 } }
    },
    20: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 6 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 } }
    },
    21: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 6 }, lose: { type: 'calcLevelSubCurrentLevel', subtract: 9 } }
    },
    22: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: {
            bet1: 9, bet2: 3,
            win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9, 3], subtract: 6 },
            lose: { type: 'specialLoseLevel22_4' }
        }
    },
    23: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: {
            bet1: 9, bet2: 3,
            win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9, 3], subtract: 6 },
            lose: { type: 'specialLoseLevel23_4' }
        }
    },
    24: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 6, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 6], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: {
            bet1: 9, bet2: 3,
            win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9, 3], subtract: 6 },
            lose: { type: 'specialLoseLevel24_4' }
        }
    },
    25: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 4], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 5, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 5], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: {
            bet1: 9, bet2: 2,
            win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9, 2], subtract: 6 },
            lose: { type: 'specialLoseLevel25_4' }
        }
    },
    26: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 3], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 4, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 4], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: {
            bet1: 9, bet2: 1,
            win: { type: 'calcLevelSumCurrentLevelSubtract', units: [9, 1], subtract: 6 },
            lose: { type: 'specialLoseLevel26_4' }
        }
    },
    27: {
        1: { bet1: 1, bet2: 2, win: { type: 'calcLevelSumCurrentLevel', units: [1, 2] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 2], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 3, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 3], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet: 9, win: { type: 'goto', level: 30 }, lose: { type: 'gotoLevel', level: 12 } }
    },
    28: {
        1: { bet1: 1, bet2: 1, win: { type: 'calcLevelSumCurrentLevel', units: [1, 1] }, lose: { type: 'goto', stage: 2 } },
        2: { bet1: 2, bet2: 1, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [2, 1], subtract: 1 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 2, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 2], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet: 8, win: { type: 'goto', level: 30 }, lose: { type: 'gotoLevel', level: 14 } }
    },
    29: {
        1: { bet: 1, win: { type: 'goto', level: 30 }, lose: { type: 'goto', stage: 2 } },
        2: { bet: 2, win: { type: 'goto', level: 30 }, lose: { type: 'goto', stage: 3 } },
        3: { bet1: 3, bet2: 1, win: { type: 'calcLevelSumCurrentLevelSubtract', units: [3, 1], subtract: 3 }, lose: { type: 'goto', stage: 4 } },
        4: { bet: 7, win: { type: 'goto', level: 30 }, lose: { type: 'gotoLevel', level: 16 } }
    },
    30: {
        // Level 30 remains as is, as it's a target level
    }
};

// Function to multiply values by 5
function applyMultiplier(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            applyMultiplier(obj[key]); // Recursively call for nested objects
        } else if (typeof obj[key] === 'number') {
            obj[key] *= 5;
        } else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map(item => typeof item === 'number' ? item * 5 : item);
        }
    }
}

// Create the new levelMap by applying the multiplier
for (const level in originalLevelMap) {
    const newLevel = parseInt(level) * 5;
    levelMap[newLevel] = JSON.parse(JSON.stringify(originalLevelMap[level])); // Deep copy
    const stages = levelMap[newLevel];
    for (const stage in stages) {
        const stageData = stages[stage];
        if (stageData.bet) {
            stageData.bet *= 5;
        }
        if (stageData.bet1) {
            stageData.bet1 *= 5;
        }
        if (stageData.bet2) {
            stageData.bet2 *= 5;
        }
        if (stageData.win && stageData.win.level) {
            stageData.win.level *= 5;
        }
        if (stageData.win && stageData.win.units) {
            stageData.win.units = stageData.win.units.map(unit => unit * 5);
        }
        if (stageData.win && stageData.win.subtract) {
            stageData.win.subtract *= 5;
        }
        if (stageData.lose && stageData.lose.level) {
            stageData.lose.level *= 5;
        }
        if (stageData.lose && stageData.lose.subtract) {
            stageData.lose.subtract *= 5;
        }
    }
}

// DOM 요소 가져오기
const currentLevelEl = document.getElementById('currentLevel');
const currentStageEl = document.getElementById('currentStage');
const currentBetUnitEl = document.getElementById('currentBetUnit');
const totalUnitsEl = document.getElementById('totalUnits');
const messageEl = document.getElementById('message');
const winButton = document.getElementById('winButton');
const loseButton = document.getElementById('loseButton');
const resetButton = document.getElementById('resetButton');
const undoButton = document.getElementById('undoButton');

// 게임 초기화 함수
function initializeGame() {
    currentLevel = 15 * 5; // 시작 레벨 15*5로 변경
    currentStage = 1;
    totalUnits = 15 * 5; // 시작 유닛 15*5로 변경
    winStreak = 0;
    betHistory = [];
    updateDisplay();
    messageEl.textContent = `게임 시작! 레벨 ${currentLevel}, ${currentStage}단계.`;
    enableButtons();
}

// 디스플레이 업데이트 함수
function updateDisplay() {
    const levelData = levelMap[currentLevel];
    if (levelData && levelData[currentStage]) {
        const stageData = levelData[currentStage];
        // winStreak이 0일 때 bet1, 1일 때 bet2를 사용
        if (stageData.bet) { // 단일 베팅
            currentBetUnit = stageData.bet;
        } else if (stageData.bet1 && stageData.bet2) { // 2단계 베팅 (1번째/2번째 베팅 존재)
            currentBetUnit = winStreak === 0 ? stageData.bet1 : stageData.bet2;
        } else if (stageData.bet1 && !stageData.bet2) { // 단일 베팅 (bet1만 존재)
             currentBetUnit = stageData.bet1;
        }
        else {
            currentBetUnit = 0; // 정의되지 않은 경우 또는 게임 오버 상태
        }
    } else {
        currentBetUnit = 0; // 정의되지 않은 레벨/단계 (새로운 레벨이 추가되어야 할 때 발생 가능)
    }

    currentLevelEl.textContent = currentLevel;
    currentStageEl.textContent = currentStage;
    currentBetUnitEl.textContent = currentBetUnit;
    totalUnitsEl.textContent = totalUnits;

    // 게임 승리 조건 확인
    if (totalUnits >= 30 * 5) { // Adjusted win condition
        gameWin("축하합니다! 총 유닛이 30에 도달하여 게임에 승리했습니다!");
        return; // 승리 시 추가 로직 실행 방지
    }
    // 게임 패배 조건 확인 (초기화 시점 제외)
    if (totalUnits <= 0 && !(currentLevel === (15 * 5) && currentStage === 1 && totalUnits === (15 * 5))) { // Adjusted initial condition
        gameOver("총 유닛이 0이거나 0 미만이 되어 게임에 패배했습니다.");
        return; // 패배 시 추가 로직 실행 방지
    }
}

// 게임 승리 처리 함수
function gameWin(msg) {
    messageEl.textContent = msg;
    disableButtons();
    currentLevelEl.textContent = "승리";
    currentStageEl.textContent = "승리";
    currentBetUnitEl.textContent = "0";
}

// 게임 패배 처리 함수
function gameOver(msg) {
    messageEl.textContent = msg;
    disableButtons();
    currentLevelEl.textContent = "패배";
    currentStageEl.textContent = "패배";
    currentBetUnitEl.textContent = "0";
}

// 버튼 비활성화 함수
function disableButtons() {
  /* winButton.disabled = true;
    loseButton.disabled = true;
    undoButton.disabled = true; */
}

// 버튼 활성화 함수
function enableButtons() {
   /* winButton.disabled = false;
    loseButton.disabled = false;
    undoButton.disabled = betHistory.length === 0; // 기록이 없으면 비활성화
     승리/패배 상태에서는 버튼 활성화하지 않음
    if (messageEl.textContent.includes("승리") || messageEl.textContent.includes("패배")) {
        disableButtons();
    }
*/
}
/*


*/
// 현재 게임 상태 저장 (이전 단계 버튼용)
function saveState() {
    betHistory.push({
        level: currentLevel,
        stage: currentStage,
        totalUnits: totalUnits,
        winStreak: winStreak
    });
}

// 승리 버튼 클릭 핸들러
function handleWin() {
    saveState(); // 현재 상태 저장

    totalUnits += currentBetUnit; // 유닛 증가

    const levelData = levelMap[currentLevel];
    if (!levelData || !levelData[currentStage]) {
        messageEl.textContent = "오류: 현재 레벨/단계 데이터가 정의되지 않았습니다.";
        gameOver("시스템 오류로 게임 종료."); // 오류 시 게임 종료
        return;
    }

    const stageData = levelData[currentStage];

    // 단일 베팅 로직 또는 2연승 중 1연승 승리 로직
    if (stageData.bet) { // 단일 베팅 승리 (29레벨 1,2,4단계, 27,28레벨 4단계 등)
        winStreak = 0; // 단일 베팅은 연속 승리 개념 없음
        if (stageData.win.type === 'goto') {
            currentLevel = stageData.win.level;
            currentStage = 1;
            messageEl.textContent = `승리! 레벨 ${currentLevel}로 이동합니다.`;
        } else if (stageData.win.type === 'calcLevelSumCurrentLevelSubtract') { // 예: 레벨 15-21의 3단계
            const calculatedUnits = stageData.win.units.reduce((sum, u) => sum + u, 0) - stageData.win.subtract;
            currentLevel = currentLevel + calculatedUnits;
            currentStage = 1;
            messageEl.textContent = `승리! 레벨 ${currentLevel}로 이동합니다.`;
        }
    }
    else if (stageData.bet1 && stageData.bet2) { // 2연승 로직 (1단계, 2단계, 3단계, 4단계)
        winStreak++;
        if (winStreak === 2) { // 2연승 시
            let calculatedNextLevel;
            if (stageData.win.type === 'calcLevelSumCurrentLevel') {
                const sumOfBetUnits = stageData.win.units.reduce((sum, u) => sum + u, 0);
                calculatedNextLevel = currentLevel + sumOfBetUnits;
            } else if (stageData.win.type === 'calcLevelSumCurrentLevelSubtract') {
                const sumOfBetUnits = stageData.win.units.reduce((sum, u) => sum + u, 0);
                calculatedNextLevel = currentLevel + sumOfBetUnits - stageData.win.subtract;
            } else {
                 messageEl.textContent = "오류: 알 수 없는 2연승 다음 레벨 계산 방식.";
                 gameOver("시스템 오류로 게임 종료.");
                 return;
            }

            currentLevel = calculatedNextLevel;
            currentStage = 1; // 다음 레벨의 1단계로 이동
            winStreak = 0;
            messageEl.textContent = `2연승! 레벨 ${currentLevel}로 이동합니다.`;
        } else { // 1번째 베팅 승리 (2번째 베팅 대기)
            messageEl.textContent = `승리! 2번째 베팅 (${stageData.bet2}유닛)을 시도합니다.`;
        }
    } else { // 예외 처리
        messageEl.textContent = "오류: 알 수 없는 승리 규칙입니다.";
        gameOver("시스템 오류로 게임 종료.");
        return;
    }

    updateDisplay();
}

// 패배 버튼 클릭 핸들러
function handleLose() {
    saveState(); // 현재 상태 저장

    // 승리/패배 베팅 유닛 확인 (어떤 베팅에서 졌는지 알아야 함)
    let lostBetUnit = currentBetUnit; // 현재 베팅 유닛만큼 감소
    totalUnits -= lostBetUnit; // 유닛 감소

    const levelData = levelMap[currentLevel];
    if (!levelData || !levelData[currentStage]) {
        messageEl.textContent = "오류: 현재 레벨/단계 데이터가 정의되지 않았습니다.";
        gameOver("시스템 오류로 게임 종료."); // 오류 시 게임 종료
        return;
    }

    const stageData = levelData[currentStage];

    // 연속 승리 카운터 리셋
    winStreak = 0;

    // 패배 로직
    if (stageData.lose.type === 'gameOver') {
        gameOver("베팅 패배로 유닛이 소진되었습니다.");
    } else if (stageData.lose.type === 'goto') {
        currentStage = stageData.lose.stage;
        messageEl.textContent = `패배! ${currentStage}단계로 이동합니다.`;
    } else if (stageData.lose.type === 'gotoLevel') {
        currentLevel = stageData.lose.level;
        currentStage = 1;
        messageEl.textContent = `패배! 레벨 ${currentLevel}로 이동합니다.`;
    } else if (stageData.lose.type === 'calcLevelSubCurrentLevel') {
        currentLevel = currentLevel - stageData.lose.subtract;
        currentStage = 1;
        messageEl.textContent = `패배! 레벨 ${currentLevel}로 이동합니다.`;
    }
    // 레벨 22, 23, 24, 25, 26의 4단계 패배 로직
    else if (stageData.lose.type && stageData.lose.type.startsWith('specialLoseLevel')) {
        let nextLevel = currentLevel;
        // Compare with original bet values for determining which bet was lost
        const originalStageData = originalLevelMap[currentLevel / 5][currentStage];
        if (lostBetUnit === originalStageData.bet1 * 5) { // 1번째 베팅에서 패배
            nextLevel = currentLevel - (15 * 5); // Subtract original 15 multiplied by 5
            messageEl.textContent = `패배! (1번째 베팅 실패) 레벨 ${nextLevel}로 이동합니다.`;
        } else if (lostBetUnit === originalStageData.bet2 * 5) { // 2번째 베팅에서 패배
            if (stageData.lose.type === 'specialLoseLevel25_4') {
                nextLevel = currentLevel + (1 * 5); // Add original 1 multiplied by 5
                messageEl.textContent = `패배! (2번째 베팅 실패) 레벨 ${nextLevel}로 이동합니다.`;
            } else if (stageData.lose.type === 'specialLoseLevel26_4') {
                nextLevel = currentLevel + (2 * 5); // Add original 2 multiplied by 5
                messageEl.textContent = `패배! (2번째 베팅 실패) 레벨 ${nextLevel}로 이동합니다.`;
            } else { // 22, 23, 24의 4단계 2번째 베팅 패배 시
                nextLevel = currentLevel; // 현재 레벨 유지
                messageEl.textContent = `패배! (2번째 베팅 실패) 현재 레벨 ${nextLevel}을 유지합니다.`;
            }
        } else {
            messageEl.textContent = "오류: 알 수 없는 4단계 패배 규칙입니다.";
            gameOver("시스템 오류로 게임 종료.");
            return;
        }
        currentLevel = nextLevel;
        currentStage = 1; // 패배 후 다음 레벨의 1단계로 이동
    }
    else {
        messageEl.textContent = "알 수 없는 패배 규칙입니다.";
        gameOver("시스템 오류로 게임 종료.");
        return;
    }

    updateDisplay();
}

// 리셋 버튼 클릭 핸들러
function handleReset() {
    if (confirm("정말로 게임을 리셋하시겠습니까?")) {
        initializeGame();
    }
}

// 이전 단계 버튼 클릭 핸들러
function handleUndo() {
    if (betHistory.length > 0) {
        const prevState = betHistory.pop();
        currentLevel = prevState.level;
        currentStage = prevState.stage;
        totalUnits = prevState.totalUnits;
        winStreak = prevState.winStreak;
        messageEl.textContent = "이전 상태로 돌아갑니다.";
        updateDisplay();
        enableButtons(); // 이전 단계 후에도 버튼 활성화
    } else {
        messageEl.textContent = "더 이상 돌아갈 이전 상태가 없습니다.";
        undoButton.disabled = true;
    }
}

// 이벤트 리스너 연결
winButton.addEventListener('click', handleWin);
loseButton.addEventListener('click', handleLose);
resetButton.addEventListener('click', handleReset);
undoButton.addEventListener('click', handleUndo);

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initializeGame);