let employeePayrollList = new Array();
let id=0;
class EmployeePayroll{
    _name;
    _imageSource;
    _gender;
    _department;
    _salary;
    _startDate;
    _notes;
    _id;

    // constructor(name,image,gender,department,salary,startDate,notes){
    //     this.name = name;
    //     this.image = image;
    //     this.gender = gender;
    //     this.department = department;
    //     this.salary = salary;
    //     this.startDate = startDate;
    //     this.notes = notes;
    // }

    toString(){
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = this._startDate === undefined ? "undefined" : this._startDate.toLocaleDateString("en-US",options);
        return "Name: " + this._name + ", Image: " + this.image + 
                "Gender: " + this._gender + ", Departments: " + this.department + 
                "StartDate: " + this._startDate + ", Salary: " + this.salary + ", Id: " + this._id; 
    }

    set name(name){
        const pattern = RegExp("[A-Z]{1}.{2,}");
        if(pattern.test(name))
        this._name = name;
        else throw "The name provided is not valid";
    }
    get name(){
        return this._name;
    }
    set image(image){
        this._imageSource = image;
    }
    get image(){
        return this._imageSource;
    }
    set gender(gender){
        this._gender = gender;
    }
    get gender(){
        return this._gender;
    }
    set department(department){
        this._department = department;
    }
    get department(){
        return this._department;
    }
    set salary(salary){
        this._salary= salary;
    }
    get salary(){
        return this._salary;
    }
    set startDate(startDate){
        if(startDate <= new Date())
            this._startDate = startDate;
        else throw "You entered start date sometime in future";
    }
    get startDate(){
        return this._startDate;
    }
    set notes(notes){
        this._notes = notes;
    }
    get notes(){
        return this._notes;
    }
    set id(id){
        this._id = id;
    }
    get id(){
        return this._id;
    }
}

let isUpdate= false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded',(event) =>{
    const name = document.getElementById('name');
    const textError = document.querySelector('.text-error');
    // const textError = textErrors[0];
    name.addEventListener('input',function(){
        try{
            (new EmployeePayroll()).name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });
    checkForUpdates();
});

window.addEventListener('DOMContentLoaded',(event) =>{
    const date = document.getElementById('day');
    const selectError = document.querySelector('.select-error');
    // const textError = textErrors[0];
    date.addEventListener('input',function(){
        try{
            let startDay = document.getElementById('day').value;
            let startMonth = document.getElementById('month').value;
            let startYear = document.getElementById('year').value;
            let startDate = new Date(startYear+"-"+startMonth+"-"+startDay);
            (new EmployeePayroll()).startDate = startDate;
            selectError.textContent = "";
        }catch(e){
            selectError.textContent = e;
        }
    });
});

function save(){
    let id = new Date().getTime();
    let name = document.getElementById('name').value;
    let imageSource =  document.getElementsByName('profile');
    var imageSource2;
    for(let i=0;i<imageSource.length;i++)
        if(imageSource[i].checked){
            imageSource2 = imageSource[i].value;
            break;
        }
    let gender = document.getElementsByName('gender');
    var gender2;
    for(let i=0;i<gender.length;i++)
        if(gender[i].checked){
            gender2 = gender[i].value;
            break;
        }
    let department = document.getElementsByName('department');
    var department2 = new Array();
    for(let i=0;i<department.length;i++)
        if(department[i].checked){
            department2.push(department[i].value);
            // break;
        }
    let salary = document.getElementById('salary').value;
    let startDay = document.getElementById('day').value;
    let startMonth = document.getElementById('month').value;
    let startYear = document.getElementById('year').value;
    let startDate = new Date(startYear+"-"+startMonth+"-"+startDay);
    let notes = document.getElementById('notes').value;
    try{
        let e1= new EmployeePayroll();
        e1.name = name;
        e1.image = imageSource2;
        e1.gender = gender2;
        e1.department = department2;
        e1.salary = salary;
        e1.startDate = startDate;
        e1.notes = notes;
        e1.id = id;
        employeePayrollList.push(e1);
        createAndUpdateStorage(e1);
    }catch(e){
        console.error(e);
        return;
    }
    // console.log(employeePayrollList);
    let image = new Image();
    let image5 = document.images[5];
    image.onload = function(){
        image5.src = this.src;
        image5.alt = "The directory of the image selected not corrected."
    }
    image.src = imageSource2;
    resetForm();
    location.href = "./AddEmployee.html ";
}

function createAndUpdateStorage(employeePayroll){
    let employeePayrollList2 = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList2 != undefined){
        employeePayrollList2.push(employeePayroll);
    }
    else{
        employeePayrollList2 = [employeePayroll];
    }
    alert(employeePayrollList2.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList2))
}

const resetForm = () => {
    setValue('#name','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
    setValue('#salary','');
    setTextValue('.salary-output','400000')
    unsetSelectedValues('[name=profiel]');
    resetImage();
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const resetImage = () => {
    let image = new Image();
    let image5 = document.images[5];
    image.onload = function(){
        image5.src = this.src;
        image5.alt = "The directory of the image selected not corrected."
    }
    image.src = "images/clear.gif";
}

const setTextValue = (className,value) => {
    const element = document.querySelector(className);
    element.textContent = value;
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const checkForUpdates = () => {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true:false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
};

const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setValue('#notes',employeePayrollObj._notes);
    let date = stringify_date(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary)
    setSelectedValues('[name=profile]',employeePayrollObj._imageSource);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
};

const setSelectedValues = (propertyValue,value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((item) => {
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if(item.value == value)
            item.checked = true;
    });
};