let transactions=[];



let form = document.getElementById("myForm");

function showForm() {
    form.classList.remove("hidden");
}

function addTransaction(){
 
     console.log("Add Transaction");

    const transtitle=document.getElementById("input-title").value;
    const transtype= document.getElementById("input-type").value;
    const transamount= document.getElementById("input-amount").value;
    const transdate =document.getElementById("input-date").value;
    if (transamount<=0){
        alert("The amount must be grater than 0");
    } else{
  let transaction = {id: Date.now() , title: transtitle , type: transtype , amount: Number(transamount) , date:transdate};
  transactions.push(transaction);
  form.reset();
  form.classList.add("hidden");
  console.log(transactions);
  displayTransaction();
  balanceshow();
  lastexpense();}
  
};


function balanceshow(){
    let income =0; 
    let expense =0;
    transactions.forEach(function(x){
    
     if (x.type === "income"){
      income +=x.amount;
    } 
    else{
      expense +=x.amount;
    }
   });
   
   const balance= income - expense; 
   document.getElementById("current-balance").innerHTML=`The curreant balance ${balance} SR`;
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

    
    
       const transaction = transactions.find(function(x){
        return x.id === id }); 
           
            document.getElementById("update-title").value = transaction.title;
            document.getElementById("update-type").value = transaction.type;
            document.getElementById("update-amount").value = transaction.amount;
            document.getElementById("update-date").value = transaction.date;
            
     
};

  function saveEdit(event){
    const amount= Number(document.getElementById("update-amount").value);
    
     if(amount <= 0 ){
           return alert("The amount must be grater than 0");
        }
         
        const transaction = transactions.find(function (x) {
            return x.id === currentEditId;
            });
         
            transaction.title = document.getElementById("update-title").value;
            transaction.type = document.getElementById("update-type").value;
            transaction.amount = amount;
            transaction.date = document.getElementById("update-date").value; 
        
        
         
    document.getElementById("mynewForm").reset();
    document.getElementById("mynewForm").classList.add("hidden");

    currentEditId = null;

    displayTransaction();
    balanceshow();
    lastexpense();
};
    
 
form.addEventListener("submit", function(event){

    event.preventDefault();

    if(currentEditId === null){
        addTransaction();
    }else{
        saveEdit();
    }

});

function deleteTransaction(id){
    
     
     const index = transactions.findIndex(function(x){
       
        return x.id === id;     
  });
     if (index !== -1){
    transactions.splice(index, 1);}
  
    displayTransaction();
    balanceshow();
    lastexpense();
     
    const title = document.getElementById("last-title"); //معرف للمرة الثانية
    if (transactions.length == 0){
        title.classList.add("hidden1");  
    }
};

function lastexpense(){
   let lastexpense= document.getElementById("last-expense");
    if (transactions.length === 0){
      return lastexpense.innerHTML="No Transzctions" ;
    }
     else{
    lastexpense.innerHTML=`last transaction is ${transactions[transactions.length - 1].type}
    ( ${transactions[transactions.length - 1].title} )
     amount: ${transactions[transactions.length - 1].amount} SR`;
   };
};

