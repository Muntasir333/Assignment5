const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const spinner = document.getElementById("loading-spinner")
let currentStatus = "all";
let allIssues =[];
async function loadissues(){
    spinner.style.display = "flex";
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const json = await res.json();
    allIssues = json.data;
    filterIssues();
    spinner.style.display = "none";
}
loadissues();


async function toggle(id){
    allBtn.classList.remove('btn-primary');
    openBtn.classList.remove('btn-primary');
    closedBtn.classList.remove('btn-primary');

    allBtn.classList.add('btn-outline');
    openBtn.classList.add('btn-outline');
    closedBtn.classList.add('btn-outline');

    const selected = document.getElementById(id);
    selected.classList.remove('btn-outline');
    selected.classList.add('btn-primary');
     currentStatus = id;

      spinner.style.display = "flex";
    setTimeout(()=>{
        filterIssues();
spinner.style.display = "none";
},300);
}  
    



function filterIssues(){
     let filter;
    if(currentStatus==="all"){
        filter = allIssues;
    }
    else{
        filter = allIssues.filter(issue=> issue.status.toLowerCase() === currentStatus);
    }
    display(filter)

}

const loadDetails= async(id)=>{
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json();
    displayDetails(data.data)

}

const displayDetails =(issue)=>{
    const detailsBox = document.getElementById("details")
    let priorityCol;
    if(issue.priority=='high'){
        priorityCol="bg-red-300";
    }
    else if (issue.priority == 'medium'){
        priorityCol="bg-yellow-200";
    }
    else if (issue.priority=='low'){
        priorityCol="bg-green-200";
    }

    let labelHTML = '';
    for (let label of issue.labels){
        let colorClass ='bg-gray-300';
        icon ='';

        if (label.toLowerCase()==='bug'){
            colorClass= 'bg-red-300';
            icon='<i class="fa-solid fa-bug"></i>'
        }
        else if (label.toLowerCase()==='help wanted'){
             colorClass= 'bg-yellow-200';
            icon='<i class="fa-regular fa-life-ring"></i>'
        }
        else if (label.toLowerCase()==='enhancement'){
             colorClass= 'bg-green-200';
            icon='<i class="fa-solid fa-wand-magic-sparkles"></i>'
        }
         else if (label.toLowerCase()==='good first issue'){
             colorClass= 'bg-violet-200';
            icon='<i class="fa-brands fa-jira"></i>'
        }
        else if (label.toLowerCase()==='documentation'){
             colorClass= 'bg-blue-200';
            icon='<i class="fa-solid fa-file-code"></i>'
        }
        labelHTML +=`<div class="${colorClass} px-2 py-1 text-[12px] rounded-xl inline-block mr-1">${icon} ${label}</div>`
    }
    detailsBox.innerHTML=` <div class="modal-box min-w-[700px] min-h-[415px]">
    <div class=" bg-white p-8">
    <h2 class="font-semibold text-2xl">${issue.title}</h2>
    <div class="flex gap-3 items-center font-normal text-[12px] text-[#64748B] mt-2 mb-6">
        <h1>Opened <h1><img src="./assets/Ellipse 5.png"></h1>
        <h1>Opened by ${issue.assignee} <h1><img src="./assets/Ellipse 5.png"></h1>
        <h1>${issue.updatedAt}</h1>
    </div>
    <div class="mb-6">${labelHTML}</div>
    <p class="font-normal text-[16px] text-[#64748B] mb-6">${issue.description}</p>
    <div class="grid grid-cols-2 items-center bg-[#F8FAFC] w-[636px] h-[81px] p-4">
        <div>
            <h1 class="font-normal text-[16px] text-[#64748B] ">Assignee:</h1>
            <h2 class="text-xl font-bold">${issue.assignee}</h2>
        </div>
        <div>
            <h1 class="font-normal text-[16px] text-[#64748B] ">Priority:</h1>
            <h2 class="${priorityCol} w-20 py-1 inline-block text-center rounded-xl font-medium text-[16px]">${issue.priority}</h2>
        </div>
    </div>
</div>`;
    document.getElementById("my_modal_1").showModal();
}




function display(issues){
  const cont = document.getElementById("card-Container") ;
  cont.innerHTML="" ;
  for (let issue of issues){
    const cart = document.createElement("div");
            let logo = "./assets/Open-Status.png";
        if(issue.status==="open"){
            logo =  "./assets/Open-Status.png";
    }
     else{
        logo = "./assets/Closed- Status .png"
    }

    let priorityCol;
    if(issue.priority=='high'){
        priorityCol="bg-red-300";
    }
    else if (issue.priority == 'medium'){
        priorityCol="bg-yellow-200";
    }
    else if (issue.priority=='low'){
        priorityCol="bg-green-200";
    }

    let labelHTML = '';
    for (let label of issue.labels){
        let colorClass ='bg-gray-300';
        icon ='';

        if (label.toLowerCase()==='bug'){
            colorClass= 'bg-red-300';
            icon='<i class="fa-solid fa-bug"></i>'
        }
        else if (label.toLowerCase()==='help wanted'){
             colorClass= 'bg-yellow-200';
            icon='<i class="fa-regular fa-life-ring"></i>'
        }
        else if (label.toLowerCase()==='enhancement'){
             colorClass= 'bg-green-200';
            icon='<i class="fa-solid fa-wand-magic-sparkles"></i>'
        }
         else if (label.toLowerCase()==='good first issue'){
             colorClass= 'bg-violet-200';
            icon='<i class="fa-brands fa-jira"></i>'
        }
        else if (label.toLowerCase()==='documentation'){
             colorClass= 'bg-blue-200';
            icon='<i class="fa-solid fa-file-code"></i>'
        }
        labelHTML +=`<div class="${colorClass} px-2 py-1 text-[12px] rounded-xl inline-block mr-1">${icon} ${label}</div>`
    }

    let borderT = issue.status==='open'? "border-t-4 border-t-green-400" : "border-t-4 border-t-violet-400"
    cart.innerHTML=`<div class="card w-64 h-64 border border-gray-400 ${borderT} p-2 space-y-3">
    <div class="front flex justify-between">
        <img src="${logo}" alt="">
        <h1 class="${priorityCol} w-20 py-1 inline-block text-center rounded-xl font-medium text-[12px]">${issue.priority}</h1>
    </div>
    <div>
        <h2 onclick="loadDetails(${issue.id})" class="font-semibold text-[14px]">${issue.title}</h2>
        <p class="font-normal text-[12px] text-[#64748B] truncate">${issue.description}</p>
    </div>
    <div class="flex gap-2">
        ${labelHTML}
    </div>
    <hr>
    <div>
        <h1 class="font-normal text-[12px] text-[#64748B]">#1 by ${issue.author}</h1>
        <h1 class="font-normal text-[12px] text-[#64748B]">${issue.createdAt}</h1>
    </div>

</div>
    `
    cont.appendChild(cart);
  }
 const ct = document.getElementById("num");
 ct.innerText = `${issues.length} Issues`
}

document.getElementById("btn-search").addEventListener("click", ()=>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res=>res.json())
    .then((data) => {
        const allData = data.data;
        const filterData = allData.filter(issue=>issue.title.toLowerCase().includes(searchValue));
        display(filterData);
    })
})











// async function loadData(){
// const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
// const data = await res.json();
// showData(data.data);
// }

// const showData =(cards)=>{
//     const cardContainer = document.getElementById("card-Container");
//     cardContainer.innerHTML="";
//     for(let card of cards){
//         const newCard = document.createElement("div");

//         let logo = "./assets/Open-Status.png";
//         if(card.status==="open"){
//             logo =  "./assets/Open-Status.png";
//     }
//      else{
//         logo = "./assets/Closed- Status .png"
//     }

//     let priorityCol;
//     if(card.priority=='high'){
//         priorityCol="bg-red-300";
//     }
//     else if (card.priority == 'medium'){
//         priorityCol="bg-yellow-200";
//     }
//     else if (card.priority=='low'){
//         priorityCol="bg-green-200";
//     }

//     let borderT = card.status==='open'? "border-t-4 border-t-green-400" : "border-t-4 border-t-violet-400"

//         newCard.innerHTML=`<div class="card w-64 h-64 border border-gray-400 ${borderT} p-2 space-y-3">
//     <div class="front flex justify-between">
//         <img src="${logo}" alt="">
//         <h1 class="${priorityCol} w-20 py-1 inline-block text-center rounded-xl font-medium text-[12px]">${card.priority}</h1>
//     </div>
//     <div>
//         <h2 class="font-semibold text-[14px]">${card.title}</h2>
//         <p class="font-normal text-[12px] text-[#64748B] truncate">${card.description}</p>
//     </div>
//     <div class="flex gap-2">
//         <div class="bg-red-300 w-20 text-center rounded-xl font-medium text-[12px] py-1 inline-block"><i class="fa-solid fa-bug"></i> Bug</div> <div class="bg-yellow-200 w-30 text-center rounded-xl font-medium text-[12px] py-1 inline-block"><i class="fa-regular fa-life-ring"></i>Help Wanted</div>
//     </div>
//     <hr>
//     <div>
//         <h1 class="font-normal text-[12px] text-[#64748B]">#1 by ${card.author}</h1>
//         <h1 class="font-normal text-[12px] text-[#64748B]">${card.createdAt}</h1>
//     </div>

// </div>
//         `
//         cardContainer.appendChild(newCard);
//     }

//     const count = document.getElementById('num');
//     count.innerText = `${cards.length} Issues`;
// }



// loadData();



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