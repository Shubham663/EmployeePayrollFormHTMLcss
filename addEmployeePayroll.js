let empPayrollList;

window.addEventListener('DOMContentLoaded',(event) => {
    getEmployeeData().then(empList => {
        empPayrollList = empList;
        document.querySelector('.emp-count').textContent = empPayrollList.length;
        createInnerHtml();
        localStorage.removeItem('editEmp');
    });
})

const getEmployeeData = () => {
    // Getting data from local storage when from_local is true
    if(site_properties.from_local)
        return new Promise((resolve,reject) => {
            localStorage.getItem('EmployeePayrollList')?
                resolve(JSON.parse(localStorage.getItem('EmployeePayrollList'))):resolve([]);
        })
        // Getting data from server when from_local is false
    else{
        return new Promise((resolve,reject) => {
            const getURL = "http://localhost:3000/employees/list";
            makePromiseCall("GET",getURL).then(responseText => {
                resolve(JSON.parse(responseText));
            }).catch(error => {
                console.log("GET Error Staus: " + JSON.stringify(error));
                resolve([]);
            });
        })
    }
};

const createInnerHtml= () => {
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    if(empPayrollList.length == 0) return;
    let inHtml = `${headerHTML}`;
    for(const empPayrollData of empPayrollList){
        // console.log(empPayrollData)
        inHtml = `${inHtml}
            <tr>
                <td><img class="profile" alt="" src="${empPayrollData.image}"></td>
                <td>${empPayrollData.name}</td>
                <td>${empPayrollData.gender}</td>
                <td>${getDeptHTML(empPayrollData.department)}</td>
                <td>${empPayrollData.salary}</td>
                <td>${empPayrollData.startDate}</td>
                <td>
                    <img src="icons/delete-black-18dp.svg" alt="delete" id="${empPayrollData.id}" onclick="remove(this)">
                    <img src="icons/create-black-18dp.svg" alt="edit" id="${empPayrollData.id}" onclick="update(this)">
                </td>
            </tr>
        `;
    }
    document.getElementById('display').innerHTML= inHtml;
}

const getDeptHTML = (deptList) => {
    // console.log(deptList);
    let deptHTML = '';
    for(const dept of deptList){
        deptHTML = `${deptHTML} <div class='dept-label'>${dept}</div>`
    }
    return deptHTML;
};

const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            _name: 'Narayan Mahadevan',
            _gender: 'male',
            _department: [
                'engineering',
                'finance'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: new Date().getTime(),
            _profilePic: 'images/Ellipse -2.png'
        },
        {
            _name: 'Anarpa Shashantha Keerti Kumar',
            _gender: 'female',
            _department: [
                'sales'
            ],
            _salary: '400000',
            _startDate: '29 Oct 2019',
            _note: '',
            id: new Date().getTime() + 1,
            _profilePic: 'images/Ellipse -1.png'
        }
    ]
    return employeePayrollListLocal;
}

const remove = (node) =>{
    // console.log(node);
    // empPayrollList.forEach(element => {
    //     console.log("Hi " + element.id);
    // });
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    const index = empPayrollList
                  .map(empData => empData.id)
                  .indexOf(empPayrollData.id);
    empPayrollList.splice(index,1)
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
};

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    localStorage.setItem("editEmp",JSON.stringify(empPayrollData));
    // remove(node);
    myfunc();
};

const myfunc = () => {
    location.href = "./employeePayrollFormHtml.html";
};