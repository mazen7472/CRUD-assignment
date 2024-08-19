
var siteName= document.getElementById("siteName");
var siteURL= document.getElementById("siteURL");
var submitBtn= document.getElementById("submitBtn");
var tBody= document.getElementById("tBody")
var siteList;
var updateBtn= document.getElementById("updateBtn");
var visitBtn= document.getElementById("visitBtn")
var deleteAllBtn= document.getElementById("deleteAllBtn");
var close=document.getElementById("close")
var boxInfo=document.getElementById("boxInfo")
var temp;
var nameRegex=/^[a-zA-Z0-9]{3,}$/;
var urlRegex=/^(https?:\/\/(?:www\.|(?!www)?)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;



if(localStorage.site==null){
    siteList=[];

}
else{
    siteList= JSON.parse(localStorage.getItem("site"));
    display(siteList);
}

//Create

submitBtn.onclick = function(){
  if(validateSiteName()&&validateSiteURL()){
   var site={
      name:  siteName.value,
      url: siteURL.value,
    }
    siteList.push(site);
    setLocal();
    display(siteList);
    updatedFormValues();}
  else{
    boxInfo.classList.replace('d-none','d-block')
}
    
}

//setLocal
function setLocal(){
    localStorage.setItem("site",JSON.stringify(siteList));
}

//Display
function display(list){
    var container='';
    for(var i=0;i<list.length;i++){
     container+= `<tr>
     <td class="pt-3">${i+1}</td>
     <td class="pt-3">${list[i].newName ? list[i].newName:list[i].name}</td>
     <td><button onclick="getVisitedSite(${i})"  class="btn btn-color" id="visitBtn"><i class="fa-solid fa-eye"></i> Visit</button></td>
     <td><button onclick="getUpdatedSite(${i})"  class="btn btn-color" id="updateBtnTable"><i class="fa-solid fa-refresh"></i> Update</button></td>
     <td><button onclick="deleteSite(${i})" class="btn" id="deleteBtn"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
 
   </tr>
`
    }
    
   tBody.innerHTML= container;
   
   if(list.length>0){
     deleteAllBtn.classList.replace("d-none","d-block");
   }
  else{
    deleteAllBtn.classList.replace("d-block","d-none");
  }
}

//Visit
function getVisitedSite(index){
  let regex=/^(http|https)/
if(regex.test(siteList[index].url)){
  open(siteList[i].url)
}else{
  open(`https://${siteList[index].url}`);

}
}

//Delete
function deleteSite(index){
    siteList.splice(index,1);
    setLocal();
    display(siteList);
}
function deleteAll(){
    localStorage.clear();
    siteList.splice(0);
    display(siteList);

}

//update
function getUpdatedSite(index){
    submitBtn.classList.add("d-none");
    updateBtn.classList.replace("d-none","d-block");
    updatedFormValues(siteList[index]);
    temp=index;
}
updateBtn.onclick = function(){
    submitBtn.classList.replace("d-none","d-block");
    updateBtn.classList.replace("d-block","d-none");
    var site={
        name:  siteName.value,
        url: siteURL.value,
      } 
    siteList[temp]= site;
    setLocal();
    display(siteList);
    updatedFormValues();

}
function updatedFormValues(flag){
    siteName.value = flag? flag.name:"";
    siteURL.value = flag? flag.url:"";
}


//Search
function searchByName(value){

    var foundedItems=[];
        for(var i=0;i<siteList.length;i++){
          if(siteList[i].name.toLowerCase().includes(value.toLowerCase())){
            siteList[i].newName = siteList[i].name.toLowerCase().replace(value.toLowerCase(),`<span class="text-danger">${value}</span>`)
            foundedItems.push(siteList[i]);
          }
        }
        display(foundedItems);
        updatedFormValues();
    }

    //Validation
    function validateSiteName(){
     
      if(nameRegex.test(siteName.value)){
          siteName.style.border='none';
          return true;
      }else{
          siteName.style.border='5px solid red';
          return false;
      }
      }
      
      function validateSiteURL(){
          
          if(urlRegex.test(siteURL.value)){
              siteURL.style.border='none';
              return true;
           
          }else{
              siteURL.style.border='5px solid red';
              return false;
              
          }
         
      }
      
    
      siteName.addEventListener('input',function(){
          validateSiteName();
          
      })
      siteURL.addEventListener('input',function(){
          validateSiteURL();
          
      })

      close.addEventListener('click',function(){
        boxInfo.classList.replace('d-block','d-none')
    })