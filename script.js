document.addEventListener("DOMContentLoaded", function() {
  // Falling drops
  for(let i=0;i<20;i++){
    const d=document.createElement('div');
    d.className='drop';
    d.style.left=Math.random()*100+'vw';
    d.style.animationDelay=Math.random()*6+'s';
    document.body.appendChild(d);
  }

  // --- Data ---
  const bloodStock = { 'A+':10,'A-':5,'B+':8,'B-':4,'O+':15,'O-':7,'AB+':6,'AB-':3 };
  const usersStatus = { Pending:5, Approved:20, Rejected:3 };
  const usersRole = { Donor:15, Hospital:8, Recipient:5 };
  const donors=[
    {name:'sabiya', blood:'A+', city:'Mumbai'},
    {name:'Sakshi', blood:'B+', city:'Pune'},
    {name:'Aishwarya', blood:'O+', city:'Karjat'}
  ];
  const usersList = [
    {id:1,name:'sabiya',role:'Donor',status:'Pending'},
    {id:2,name:'Sakshi',role:'Hospital',status:'Approved'},
    {id:3,name:'Aishwarya',role:'Recipient',status:'Pending'},
    {id:4,name:'Saniya',role:'Donor',status:'Approved'},
    {id:5,name:'Rahul',role:'Donor',status:'Rejected'}
  ];

  // --- Populate Users Table ---
  const tableBody = document.getElementById('userTable');
  usersList.forEach(u=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${u.id}</td><td>${u.name}</td><td>${u.role}</td><td>${u.status}</td>
      <td><button class="approve" onclick="alert('User Approved')">Approve</button>
      <button class="reject" onclick="alert('User Rejected')">Reject</button></td>`;
    tableBody.appendChild(tr);
  });

  // --- Charts ---
  new Chart(document.getElementById('bloodStockChart').getContext('2d'),{
    type:'bar',
    data:{labels:Object.keys(bloodStock),datasets:[{label:'Units',data:Object.values(bloodStock),backgroundColor:'#ff3b3b'}]},
    options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}
  });

  new Chart(document.getElementById('statusChart').getContext('2d'),{
    type:'doughnut',
    data:{labels:Object.keys(usersStatus),datasets:[{data:Object.values(usersStatus),backgroundColor:['#ffc107','#28a745','#dc3545']}]},
    options:{responsive:true,plugins:{legend:{position:'bottom'}}}
  });

  new Chart(document.getElementById('roleChart').getContext('2d'),{
    type:'pie',
    data:{labels:Object.keys(usersRole),datasets:[{data:Object.values(usersRole),backgroundColor:['#ff3b3b','#fd7e14','#ffc107']}]},
    options:{responsive:true,plugins:{legend:{position:'bottom'}}}
  });

  // --- Dark/Light toggle ---
  document.getElementById("toggleModeBtn").addEventListener("click", function(){    
    document.body.classList.toggle("dark-mode");    
  });

  // --- Login functionality ---
  document.getElementById("loginBtn").addEventListener("click", function() {
    const user=document.getElementById('username').value;
    const role=document.getElementById('role').value;
    alert(user + ' logged in as ' + role);
  });

  // --- Search donors functionality ---
  document.getElementById("searchDonorBtn").addEventListener("click", function() {
    const blood=document.getElementById('searchBlood').value.toUpperCase();
    const city=document.getElementById('searchCity').value;
    const result=donors.filter(d=>d.blood===blood && d.city.toLowerCase()===city.toLowerCase());
    alert(result.length ? result.map(r=>r.name).join(', ') : 'No donors found');
  });

});
