window.addEventListener('DOMContentLoaded',(event) => {
    createInnerHtml();
})

const createInnerHtml= () => {
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>";
    const empPayrollList = createEmployeePayrollJSON();
    let inHtml = `${headerHTML}`;
    console.log(empPayrollList);
    for(const empPayrollData of empPayrollList){
        inHtml = `${inHtml}
            <tr>
                <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>${getDeptHTML(empPayrollData._department)}</td>
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td>
                    <img src="icons/delete-black-18dp.svg" alt="delete" name="${empPayrollData._id}" onclick="remove(this)">
                    <img src="icons/create-black-18dp.svg" alt="edit" name="${empPayrollData._id}" onclick="update(this)">
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