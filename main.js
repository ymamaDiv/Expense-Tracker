let transactions=[];

let transtitle;
let transtype;
let transamount;
let transdate;

let form = document.getElementById("myForm");

function showForm() {
    form.classList.remove("hidden");
}

function addTransaction(){
 
     console.log("Add Transaction");

  transtitle= document.getElementById("input-title").value;
  transtype= document.getElementById("input-type").value;
  transamount= document.getElementById("input-amount").value;
  transdate= document.getElementById("input-date").value;

  let transaction = {id:transactions.length +1 , title: transtitle , type: transtype , amount: Number(transamount) , date:transdate};
  transactions.push(transaction);
  form.reset();
  form.classList.add("hidden");
  console.log(transactions);
  displayTransaction();
  balanceshow();
  lastexpense();
  
};


function balanceshow(){
    let income =0; 
    let expense =0;
    for (let i=0; i<transactions.length; i++){
     if (transactions[i].type === "income"){
      income +=transactions[i].amount;
   } else{
      expense +=(transactions[i].amount);
   };
   }
   let balance= income - expense; 
   document.getElementById("current-balance").innerHTML=`The curreant balance ${balance}SR`;
}; 


const transactionList = document.getElementById("transaction-list");




function displayTransaction(){
    const title = document.getElementById("last-title"); 
      console.log(title);
      title.classList.remove("hidden1");             
  transactionList.innerHTML= "";
  const lastTransactions = transactions.slice(-3).reverse();
  
   lastTransactions.forEach(function(transaction) {

        // أنشئ عنصر li
        const li = document.createElement("li");

        // أضف بيانات العملية
        li.innerHTML = ` 
            <span>${transaction.title} - ${transaction.type} - ${transaction.amount} SR</span>
            <button onclick="editTransaction(${transaction.id})">Edit</button>
            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;

        // أضفها داخل ul
        transactionList.appendChild(li);

    });
  };


  let currentEditId = null;
  function editTransaction(id){

    currentEditId = id;

    let updateForm = document.getElementById("mynewForm");
    updateForm.classList.remove("hidden");

    for(let i = 0; i < transactions.length; i++){

        if(transactions[i].id === id){

            document.getElementById("update-title").value = transactions[i].title;
            document.getElementById("update-type").value = transactions[i].type;
            document.getElementById("update-amount").value = transactions[i].amount;
            document.getElementById("update-date").value = transactions[i].date;

        }

    }
   
}

  function saveEdit(event){
    event.preventDefault();

    for(let i=0; i<transactions.length; i++){

        if(transactions[i].id === currentEditId){

            transactions[i].title = document.getElementById("update-title").value;

            transactions[i].type = document.getElementById("input-type").value;

            transactions[i].amount = document.getElementById("update-amount").value;

            transactions[i].date = document.getElementById("update-date").value;

        }

    }

    document.getElementById("mynewForm").reset();

    document.getElementById("mynewForm").classList.add("hidden");

    currentEditId = null;

    displayTransaction();
    balanceshow();
    lastexpense();
}
    
 
form.addEventListener("submit", function(event){

    event.preventDefault();

    if(currentEditId === null){
        addTransaction();
    }else{
        saveEdit();
    }

});

function deleteTransaction(id){
    
   for (let i=0; i<transactions.length; i++){
     if( transactions[i].id === id){
       transactions.splice(i, 1);
       break;
     }
   }
  
    displayTransaction();
    balanceshow();
}

function lastexpense(){
   let lastexpense= document.getElementById("last-expense");
    if (transactions.length === 0){
      return `No transatcion ` ;
    }
     else{
    lastexpense.innerHTML=`last transaction is ${transactions[transactions.length - 1].type}
    ( ${transactions[transactions.length - 1].title} )
     - ${transactions[transactions.length - 1].amount} SR`;
   };
};

