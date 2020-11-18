let empPayrollList;

window.addEventListener('DOMContentLoaded',(event) => {
    empPayrollList = getEmployeeDataFromLocalStorage();
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
})

const getEmployeeDataFromLocalStorage= () => {
    return localStorage.getItem('EmployeePayrollList')?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
};

const createInnerHtml= () => {
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    if(empPayrollList.length == 0) return;
    let inHtml = `${headerHTML}`;
    for(const empPayrollData of empPayrollList){
        inHtml = `${inHtml}
            <tr>
                <td><img class="profile" alt="" src="${empPayrollData._imageSource}"></td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>${getDeptHTML(empPayrollData._department)}</td>
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td>
                    <img src="icons/delete-black-18dp.svg" alt="delete" id="${empPayrollData._id}" onclick="remove(this)">
                    <img src="icons/create-black-18dp.svg" alt="edit" id="${empPayrollData._id}" onclick="update(this)">
                </td>
            </tr>
        `;
    }
    document.getElementById('display').innerHTML= inHtml;
}

const getDeptHTML = (deptList) => {
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
            _id: new Date().getTime(),
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
            _id: new Date().getTime() + 1,
            _profilePic: 'images/Ellipse -1.png'
        }
    ]
    return employeePayrollListLocal;
}

const remove = (node) =>{
    // console.log(node);
    // empPayrollList.forEach(element => {
    //     console.log("Hi " + element._id);
    // });
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if(!empPayrollData) return;
    const index = empPayrollList
                  .map(empData => empData._id)
                  .indexOf(empPayrollData._id);
    empPayrollList.splice(index,1)
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
};

const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if(!empPayrollData) return;
    localStorage.setItem("editEmp",JSON.stringify(empPayrollData));
    remove(node);
    myfunc();
};

const myfunc = () => {
    location.href = "./employeePayrollFormHtml.html";
};