let currentTimeZoneContainer=document.getElementById("currentTimeZoneContainer")
let enteredAddress=document.getElementById("Address")
let submitButton=document.getElementById("Submitbutton")

submitButton.addEventListener("click" , fetchAddressTimeZone)

let enteredAddressTimezoneContainer=document.getElementById("enteredAddressTimezoneContainer")



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    else {
        console.error("Geolocation is not supported by this browser.")
    }

}

function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude;
   getUserTimeZone(latitude,longitude)
    
}

getLocation()


async function getUserTimeZone(latitude,longitude) {
    let resposne = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=4e78775948b44ac6b90448c3aa886239`)
    let positionData = await resposne.json()
    displayUserTimeZone(positionData.features[0].properties,"userTimeZone")
    


}

async function fetchAddressTimeZone(){
    enteredAddressTimezoneContainer.style.display="flex"
    let alertMessage= document.createElement("p")
    if(enteredAddress.value===""){
        enteredAddressTimezoneContainer.innerHTML=""
     
       alertMessage.innerText="Please Enter Address!!"
       alertMessage.style.color="red"
       enteredAddressTimezoneContainer.appendChild(alertMessage)
    }
    else{
        enteredAddressTimezoneContainer.innerHTML=""
  let response= await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(enteredAddress.value)}&apiKey=4e78775948b44ac6b90448c3aa886239`)
    
    let data= await response.json()
    displayUserTimeZone(data.features[0].properties,"EnteredAdrressTimeZone")
    }
}





function displayUserTimeZone(data,str) {

   if(str==="userTimeZone"){
    let nameOfTimeZone=document.createElement("p")
    nameOfTimeZone.innerText=`Name Of TimeZone: ${data.timezone.name}`
    currentTimeZoneContainer.appendChild(nameOfTimeZone)


    let div=document.createElement("div")
    div.className="latLongContainer"
    let latitudePoint=document.createElement("p")
    latitudePoint.innerText=`Lat: ${data.lat}`
    let longitudePoint=document.createElement("p")
    longitudePoint.innerText=`Long: ${data.lon}`
    div.appendChild(latitudePoint)
    div.appendChild(longitudePoint)
    currentTimeZoneContainer.appendChild(div)

    let OffsetStd=document.createElement("p")
    OffsetStd.innerText=`Offset STD: ${data.timezone.offset_STD}`
    currentTimeZoneContainer.appendChild(OffsetStd)

    let offsetSTDSeconds=document.createElement("p")
    offsetSTDSeconds.innerText=`Offset STD Seconds: ${data.timezone.offset_STD_seconds}`
    currentTimeZoneContainer.appendChild(offsetSTDSeconds)

    let offsetDST=document.createElement("p")
    offsetDST.innerText=`Offset DST: ${data.timezone.offset_DST}`
    currentTimeZoneContainer.appendChild(offsetDST)

    let offsetDSTSeconds=document.createElement("p")
    offsetDSTSeconds.innerText=`Offset DST Seconds: ${data.timezone.offset_DST_seconds}`
    currentTimeZoneContainer.appendChild(offsetDSTSeconds)

    let country=document.createElement("p")
    country.innerText=`Country: ${data.country}`
    currentTimeZoneContainer.appendChild(country)

    let postcode=document.createElement("p")
    postcode.innerText=`Postcode: ${data.postcode}`
    currentTimeZoneContainer.appendChild(postcode)

    let city=document.createElement("p")
    city.innerText=`City: ${data.city}`
    currentTimeZoneContainer.appendChild(city)
   }

   if(str==="EnteredAdrressTimeZone"){

    let h2=document.createElement("h2")
    h2.innerText="Your Result"
    enteredAddressTimezoneContainer.appendChild(h2)

    let nameOfTimeZone=document.createElement("p")
    nameOfTimeZone.innerText=`Name Of TimeZone: ${data.timezone.name}`
    enteredAddressTimezoneContainer.appendChild(nameOfTimeZone)


    let div=document.createElement("div")
    div.className="latLongContainer"
    let latitudePoint=document.createElement("p")
    latitudePoint.innerText=`Lat: ${data.lat}`
    let longitudePoint=document.createElement("p")
    longitudePoint.innerText=`Long: ${data.lon}`
    div.appendChild(latitudePoint)
    div.appendChild(longitudePoint)
    enteredAddressTimezoneContainer.appendChild(div)

    let OffsetStd=document.createElement("p")
    OffsetStd.innerText=`Offset STD: ${data.timezone.offset_STD}`
    enteredAddressTimezoneContainer.appendChild(OffsetStd)

    let offsetSTDSeconds=document.createElement("p")
    offsetSTDSeconds.innerText=`Offset STD Seconds: ${data.timezone.offset_STD_seconds}`
    enteredAddressTimezoneContainer.appendChild(offsetSTDSeconds)

    let offsetDST=document.createElement("p")
    offsetDST.innerText=`Offset DST: ${data.timezone.offset_DST}`
    enteredAddressTimezoneContainer.appendChild(offsetDST)

    let offsetDSTSeconds=document.createElement("p")
    offsetDSTSeconds.innerText=`Offset DST Seconds: ${data.timezone.offset_DST_seconds}`
    enteredAddressTimezoneContainer.appendChild(offsetDSTSeconds)

    let country=document.createElement("p")
    country.innerText=`Country: ${data.country}`
    enteredAddressTimezoneContainer.appendChild(country)

    let postcode=document.createElement("p")
    postcode.innerText=`Postcode: ${data.postcode}`
    enteredAddressTimezoneContainer.appendChild(postcode)

    let city=document.createElement("p")
    city.innerText=`City: ${data.city}`
    enteredAddressTimezoneContainer.appendChild(city)

   }


}
