document.addEventListener('DOMContentLoaded', () => {
    const solarInput = document.getElementById('solarInput');
    const resultValue = document.getElementById('resultValue');
    const powerGen = document.getElementById('powerGen');
    const storageCap = document.getElementById('storageCap');

    const RATIO = 0.84;
    const SOLAR_POWER = 60; 
    const ACCUMULATOR_CAPACITY = 5; 

    function calculate() {
        const panels = parseInt(solarInput.value) || 0;
        
        const accumulators = Math.ceil(panels * RATIO);
        const totalPower = (panels * SOLAR_POWER) / 1000; 
        const totalStorage = accumulators * ACCUMULATOR_CAPACITY; 

        resultValue.textContent = accumulators.toLocaleString();
        powerGen.textContent = totalPower.toFixed(2) + ' MW';
        storageCap.textContent = totalStorage.toLocaleString() + ' MJ';
    }

    solarInput.addEventListener('input', calculate);
    
    calculate();
});
