async function loadData(){
const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
const data = await res.json();
showData(data.data);
}

const showData =(cards)=>{
    const cardContainer = document.getElementById("card-Container");
    cardContainer.innerHTML="";
    for(let card of cards){
        const newCard = document.createElement("div");

        let logo = "./assets/Open-Status.png";
        if(card.status==="open"){
            logo =  "./assets/Open-Status.png";
    }
     else{
        logo = "./assets/Closed- Status .png"
    }

    let priorityCol;
    if(card.priority=='high'){
        priorityCol="bg-red-300";
    }
    else if (card.priority == 'medium'){
        priorityCol="bg-yellow-200";
    }
    else if (card.priority=='low'){
        priorityCol="bg-green-200";
    }

    let borderT = card.status==='open'? "border-t-4 border-t-green-400" : "border-t-4 border-t-violet-400"

        newCard.innerHTML=`<div class="card w-64 h-64 border border-gray-400 ${borderT} p-2 space-y-3">
    <div class="front flex justify-between">
        <img src="${logo}" alt="">
        <h1 class="${priorityCol} w-20 py-1 inline-block text-center rounded-xl font-medium text-[12px]">${card.priority}</h1>
    </div>
    <div>
        <h2 class="font-semibold text-[14px]">${card.title}</h2>
        <p class="font-normal text-[12px] text-[#64748B] truncate">${card.description}</p>
    </div>
    <div class="flex gap-2">
        <div class="bg-red-300 w-20 text-center rounded-xl font-medium text-[12px] py-1 inline-block"><i class="fa-solid fa-bug"></i> Bug</div> <div class="bg-yellow-200 w-30 text-center rounded-xl font-medium text-[12px] py-1 inline-block"><i class="fa-regular fa-life-ring"></i>Help Wanted</div>
    </div>
    <hr>
    <div>
        <h1 class="font-normal text-[12px] text-[#64748B]">#1 by ${card.author}</h1>
        <h1 class="font-normal text-[12px] text-[#64748B]">${card.createdAt}</h1>
    </div>

</div>
        `
        cardContainer.appendChild(newCard);
    }

    const count = document.getElementById('num');
    count.innerText = `${cards.length} Issues`;
}



loadData();



// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"