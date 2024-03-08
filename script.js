const input=document.querySelector("#input");
const header=document.querySelector(".header");
const indiv2=document.querySelector('.indiv2');
let show;
let arr;
let instr;
let centerdiv;
// try without async and see diff
const fetchRecipes=async () =>{
    
    indiv2.innerHTML="";
    const recipe=input.value;
    header.classList.add("hide");
    
    if(recipe===""){
        indiv2.innerHTML+=`<h2 style="grid-column:2/span 1;">Enter Recipe to be Searched</h2>`
        return;
    }
    const response=await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    const obj=await response.json(); //array of obj
    
    
    arr=obj.meals;
    if(arr===null) {
        indiv2.innerHTML+=`<h2 style="grid-column:2/span 1;">No Results Found</h2>`
        return;
    }
    
    let div;
    for(let ele of arr){
        div=document.createElement('div');
        const img=document.createElement('img');
        const name=document.createElement('h2');
        const cuisine=document.createElement('p');
        const category=document.createElement('p');
        const btn=document.createElement('button');
        btn.classList.add('btn');
     
        img.classList.add('meals');
        
        div.classList.add('card');
        const namevalue=ele["strMeal"];
        const categoryvalue=ele.strCategory;
        const cuisinevalue=ele.strArea;
        const url=ele.strMealThumb;
        div.innerHTML=`<img src="${url}" class="meals"></img><div class="flexcol inner"> <h2>${namevalue}</h2> <p><b>${cuisinevalue}</b> dish</p> <p>Belongs to <b>${categoryvalue}</b> category</p> <button class="btn show" id=${ele.idMeal}>Show Recipe</button></div>`
       
        indiv2.append(div);

    }
    
    if(arr.length==1){
        div.classList.remove("card");
        div.classList.add("singlecard");
    }
    show=document.getElementsByClassName("show");

    for(let i=0;i<show.length;i++){
        show[i].addEventListener("click",showRecipe);
    }
}
const func=(e) =>{
    if(e.key==='Enter') fetchRecipes();
    else return;
}
let close;

const search=document.getElementsByClassName("btn");

search[0].addEventListener("click",fetchRecipes);
input.addEventListener("keydown",func);


const showRecipe=(e)=>{
    
    centerdiv=document.createElement('div');
    let btnid=e.target.id;
    let ingred=[];
    for(ele of arr){
   
        if(ele.idMeal===btnid){
           
            centerdiv.innerHTML+=`<h2 style="text-align:center">${ele.strMeal}</h2><br><h3>Ingredents</h3>`
            instr=ele.strInstructions;
            for(let key in ele){
                
                if(key.includes("strIngredient")){
                    if(ele[key]==="") continue;
                    ingred.push(ele[key]);
                }
            }

        }
    }
    
    const ul1=document.createElement("ul");
    for(let ele of ingred){
        ul1.innerHTML+=`<li>${ele}</li>`

    }
    centerdiv.append(ul1);
    centerdiv.innerHTML+="<br><h3>Instructions</h3>";
    
    instr=instr.split("\r\n");
   
    const ul=document.createElement("ol");
    
    for(let ele of instr){
        ul.innerHTML+=`<li>${ele}</li>`
    }
    centerdiv.append(ul);
    centerdiv.innerHTML+="<button class='btn close'><label>&#x2716;</label></button>"
   
    const div3=document.querySelector(".div3");
    div3.append(centerdiv);
    div3.classList.remove("hide");
  
    close=document.querySelector(".close");
 
    close.addEventListener("click",()=>{
       
        div3.removeChild(centerdiv);
        div3.classList.add("hide");
});
}








