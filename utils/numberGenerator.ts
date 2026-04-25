export const generateRandomNumber = (): string => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';
    
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    result += firstDigit;
    digits.splice(firstDigit, 1);
    
    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * digits.length);
        result += digits[index];
        digits.splice(index, 1);
    }
    
    return result;
}

export const generateDailyNumber = (date = new Date()): string => {
    const seedText = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let seed = 0;

    for (let i = 0; i < seedText.length; i++) {
        seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
    }

    const random = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
    };

    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';

    const firstIndex = Math.floor(random() * 9) + 1;
    result += String(firstIndex);
    digits.splice(firstIndex, 1);

    for (let i = 0; i < 3; i++) {
        const index = Math.floor(random() * digits.length);
        result += digits[index];
        digits.splice(index, 1);
    }

    return result;
}

export const checkGuess = (guess: string, target: string): ('green' | 'yellow' | 'none')[] => {
    const result: ('green' | 'yellow' | 'none')[] = ['none', 'none', 'none', 'none'];
    const targetDigits = [...target];
    const usedIndices = new Set<number>();
    
    for (let i = 0; i < 4; i++) {
        if (guess[i] === target[i]) {
            result[i] = 'green';
            usedIndices.add(i);
            targetDigits[i] = 'X';
        }
    }
    
    for (let i = 0; i < 4; i++) {
        if (result[i] === 'none') {
            const targetIndex = targetDigits.indexOf(guess[i]);
            if (targetIndex !== -1 && !usedIndices.has(targetIndex)) {
                result[i] = 'yellow';
                targetDigits[targetIndex] = 'X';
                usedIndices.add(targetIndex);
            }
        }
    }
    
    return result;
} 
