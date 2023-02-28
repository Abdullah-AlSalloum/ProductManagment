let title = document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mood = 'Create';
let tmp;


//get total
function getTotal() 
{
   if(price.value !=''){
     let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
     total.innerHTML = result;
     total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(189, 0, 0)';
    }
}

//creat product save localstorage

let dataProduct;
if(localStorage.product != null){
   dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct =[];
}
submit.onclick = function(){
    let newPro = { 
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value != '' || price.value !='' || category.value != '' && newPro.count <= 100 ) {
        if(mood === 'Create'){
            if(newPro.count > 1){
                for(let i = 0 ; i < newPro.count ; i++){
                    dataProduct.push(newPro);
                }
            }else{
                dataProduct.push(newPro);
            }
        }else{
            dataProduct[tmp] = newPro;
            mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData()
    }
   
   
    
    localStorage.setItem('product' ,JSON.stringify(dataProduct))
    
    showData()
} 

//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}
//read
function showData(){
    getTotal()
    let table ='';
    for(let i = 0;i < dataProduct.length;i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].count}</td>
        <td>${dataProduct[i].category}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="DeleteData(${i})">delete</button></td>
      </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btndeleteall = document.getElementById('deletAll');
    if(dataProduct.length > 0){
        btndeleteall.innerHTML = `<button onclick="deleteall()">Delete All Data(${dataProduct.length})</button>`
    }else{
        btndeleteall.innerHTML ='';
    }
}
showData()


//delete
function DeleteData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData()
}


//Delete All
function deleteall(){
    localStorage.clear()
    dataProduct.splice(0);
    showData()
}
//cout
//update
function updateData(i){


  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal()
  count.style.display = 'none';
  category.value = dataProduct[i].category;
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i; 
  scroll({
    top:0,behavior:'smooth',
  })
}
//search
let searchMood = 'title';
let search = document.getElementById('search'); 
function getSearchMood(id){
if(id == 'searchTitle'){
    searchMood = 'title';
    
}else{
    searchMood = 'catagory';
    
}
search.placeholder = 'Seach By ' +searchMood;
search.focus()
search.value = '';
showData()

}
function searchData(value){
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == 'title') {
       
        if(dataProduct[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="DeleteData(${i})">delete</button></td>
          </tr>
            `
        }
   }else{
    for (let i = 0; i < dataProduct.length; i++) {
        if(dataProduct[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">update</button></td>
            <td><button id="delete" onclick="DeleteData(${i})">delete</button></td>
          </tr>
            `
        }     
    }
   }
   
  }

   document.getElementById('tbody').innerHTML = table;
}
//clean data

