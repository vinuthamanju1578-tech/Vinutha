let totalIncome =
parseFloat(localStorage.getItem("income")) || 0;

let budgetLimit =
parseFloat(localStorage.getItem("budget")) || 0;

let expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

function setBudget(){

let budget =
parseFloat($("#budgetLimit").val());

if(!budget || budget<=0){
alert("Enter valid budget");
return;
}

budgetLimit = budget;

localStorage.setItem(
"budget",
budgetLimit
);

$("#budgetLimit").val("");

updateUI();
}

function addIncome(){

let income =
parseFloat($("#incomeInput").val());

if(!income || income<=0){
alert("Enter valid income");
return;
}

totalIncome += income;

localStorage.setItem(
"income",
totalIncome
);

$("#incomeInput").val("");

updateUI();
}

function addExpense(){

let name =
$("#expenseName").val();

let amount =
parseFloat(
$("#expenseAmount").val()
);

if(name==="" || !amount || amount<=0){
alert("Enter valid expense");
return;
}

expenses.push({
name:name,
amount:amount
});

localStorage.setItem(
"expenses",
JSON.stringify(expenses)
);

$("#expenseName").val("");
$("#expenseAmount").val("");

updateUI();
}

function deleteExpense(index){

expenses.splice(index,1);

localStorage.setItem(
"expenses",
JSON.stringify(expenses)
);

updateUI();
}

function resetData(){

localStorage.clear();

totalIncome = 0;
budgetLimit = 0;
expenses = [];

updateUI();
}

function updateUI(){

let totalExpenses =
expenses.reduce(
(sum,item)=>sum+item.amount,
0
);

let balance =
totalIncome-totalExpenses;

$("#budget").text(
budgetLimit.toFixed(2)
);

$("#income").text(
totalIncome.toFixed(2)
);

$("#expenses").text(
totalExpenses.toFixed(2)
);

$("#balance").text(
balance.toFixed(2)
);

$("#expenseList").empty();

expenses.forEach(
(expense,index)=>{

$("#expenseList").append(`
<li>
${expense.name}
- ₹${expense.amount}

<br><br>

<button
class="delete-btn"
onclick="deleteExpense(${index})">
Delete
</button>

</li>
`);

}
);

let percent = 0;

if(budgetLimit>0){

percent =
(totalExpenses /
budgetLimit) * 100;

}

$("#progressBar").css(
"width",
Math.min(percent,100) + "%"
);

if(percent>=100){

$("#warning")
.hide()
.text("⚠ Budget Limit Exceeded!")
.fadeIn();

}
else if(percent>=80){

$("#warning")
.hide()
.text("⚠ Warning: Near Budget Limit!")
.fadeIn();

}
else{

$("#warning").text("");

}
}

updateUI();
