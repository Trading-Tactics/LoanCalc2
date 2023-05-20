const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let myChart;

const calculateEMI = () => {
    let loanAmount = parseFloat(loanAmountInput.value);
    let interestRate = parseFloat(interestRateInput.value);
    let loanTenure = parseFloat(loanTenureInput.value);

    let interest = interestRate / 12 /100;
    let emi = loanAmount * interest * (Math.pow(1+interest, loanTenure) / (Math.pow(1+interest, loanTenure) - 1));

    return emi;
};

const displayChart = (totalInterestPayable, loanAmount) =>{
    const ctx = document.getElementById('myChart');

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Total Interest', 'Principal Loan Amount'],
            datasets: [{
                label: '# of Votes',
                data: [totalInterestPayable, loanAmount],
                backgroundColor: ["#e63946","#14213d"],
                borderWidth: 0
            }]
        },
    });
};

const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi * 100) / 100;  // Rounding to the nearest hundredth

    let loanTenure = parseFloat(loanTenureInput.value);
    let loanAmount = parseFloat(loanAmountInput.value);
    
    let totalAmount = Math.round(emi * loanTenure * 100) / 100;  // Rounding to the nearest hundredth
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round((totalAmount - loanAmount) * 100) / 100;  // Rounding to the nearest hundredth
    totalInterestValue.innerHTML = totalInterestPayable; 

    if (myChart) {
        myChart.data.datasets[0].data[0] = totalInterestPayable;
        myChart.data.datasets[0].data[1] = loanAmount;
        myChart.update();
    } else {
        displayChart(totalInterestPayable, loanAmount);
    }
};

const init = () => {
    let emi = calculateEMI();
    updateData(emi);
};

calculateBtn.addEventListener("click", init);
init();