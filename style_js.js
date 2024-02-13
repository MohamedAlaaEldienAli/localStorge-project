



let productNameinput = document.getElementById('productName');
let productPriceinput = document.getElementById('productPrice');
let productCompanyinput = document.getElementById('productCompany');
let productDescriptioninput = document.getElementById('productDescription');
let searchBtn = document.getElementById('searchBtn');
let searchRow = document.getElementById('searchRow');
let currentIndex = 0; 

let myBtn =document.querySelector('.addBtn');

let productContainer ;

if( localStorage.getItem("productsContainer") == null){
    productContainer = [];
}
else{

    productContainer =JSON.parse(localStorage.getItem('productsContainer'));
    displayData();
}

myBtn.onclick =function()
{

    if( myBtn.innerHTML == 'Add Product')
    {
        addProducts ();
        displayData();
    }
    else{
        updateProduct();
        displayData();
        clearForm ();
        
    }

};


function addProducts (){

    let product = {
        name: productNameinput.value ,
        price: productPriceinput.value,
        company: productCompanyinput.value,
        desc: productDescriptioninput.value,
    };

    if( product.name === '')
    {
        window.alert('The name must by Not Empty value ');
    
    }
    else if (product.price === ''){
        window.alert('The price must by Not Empty valuee');
    }
    else if (product.company === ''){
        window.alert('The company must by Not Empty value');
    }
    else if (product.desc === '' ){
        window.alert('The Description must by Not Empty value');
    }
    else{
        productContainer.push(product);
        localStorage.setItem('productsContainer', JSON.stringify(productContainer));
        clearForm ();
    }

    
};


function displayData(){
    temp = "";

for (let i =0 ; i < productContainer.length ; i++)
    {
        temp += `<div class="col-md-auto col-lg-4 my-4"><div class="card">
        <div class="card-body"><h5 class="card-title text-primar">`+productContainer[i].name+`</h5>
        <p class="card-text text-success">`+productContainer[i].price+`</p><p class="card-text">`+productContainer[i].company+`</p>
        <p class="card-text text-body-secondary ">`+productContainer[i].desc+`</p>
        <button  class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
        <button  class="btn btn-warning" onclick="setProduct(`+i+`)">Update</button>
        </div></div></div>`;
    };

    document.getElementById('rowData').innerHTML = temp;
};

function clearForm (){

    let inputs = document.getElementsByClassName('form-control');

    for (let i=0 ; i< inputs.length ; i++){
        inputs[i].value = "";
    }
};


function deleteProduct(id){
    productContainer.splice(id , 1);
    localStorage.setItem('productsContainer', JSON.stringify(productContainer));
    displayData();

};

function setProduct(i)
{
    productNameinput.value = productContainer[i].name;
    productPriceinput.value = productContainer[i].price;
    productCompanyinput.value = productContainer[i].company;
    productDescriptioninput.value = productContainer[i].desc;

    myBtn.innerHTML = 'Update';
    currentIndex =i;
};

function updateProduct()
{
    productContainer[currentIndex].name = productNameinput.value;
    productContainer[currentIndex].price = productPriceinput.value;
    productContainer[currentIndex].company = productCompanyinput.value;
    productContainer[currentIndex].desc = productDescriptioninput.value;

    myBtn.innerHTML = 'Add Product';
    localStorage.setItem('productsContainer', JSON.stringify(productContainer));
        
};

searchBtn.onkeyup = function(){
    searchprocudts(searchBtn.value);
};

function searchprocudts(trem)
{
    let searchCols ="";

    for( let i = 0 ; i< productContainer.length ; i++){

        if(productContainer[i].name.includes(trem))
        {
            searchCols += `<div class="col-md-auto col-lg-4 my-4 "><div class="card bg-body-secondary">
            <div class="card-body"><h5 class="card-title text-primar">`+productContainer[i].name+`</h5>
            <p class="card-text text-success">`+productContainer[i].price+`</p><p class="card-text">`+productContainer[i].company+`</p>
            <p class="card-text text-body-secondary ">`+productContainer[i].desc+`</p>
            <button  class="btn btn-danger" onclick="deleteProduct('+i+')">Delete</button>
            <button  class="btn btn-warning" onclick="setProduct(`+i+`)">Update</button>
            </div></div></div>`;
        }
        searchRow.innerHTML = searchCols;
    };
    
    if(searchBtn.value == ""){
        searchRow.innerHTML = '';
    }
    
    
};