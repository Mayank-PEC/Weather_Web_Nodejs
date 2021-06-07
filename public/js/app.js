console.log("client side javascript loaded");  

// fetch("http://puzzle.mead.io/puzzle").then((response)=>{  
//     response.json().then((data)=>{
//             console.log(data);
//       })
// })




const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")


weatherForm.addEventListener("submit",(event)=>{
       event.preventDefault()

     // console.log("testing"); 
      const location = search.value
    //  console.log(location);
      messageOne.textContent = "Loading..."
      messageTwo.textContent =""

    fetch("/weather?address="+location).then((res)=>{
      res.json().then((data)=>{
            if(data.err){
                  //console.log(data.err);
                  messageOne.textContent = data.err
            }
            else{
                //  console.log(data.address);
                messageOne.textContent =data.address
                messageTwo.textContent = data.forecast
                //  console.log(data.forecast);
            }
      })

})
      
})
