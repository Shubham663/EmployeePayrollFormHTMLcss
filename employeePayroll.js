let employeePayrollList = new Array();
class EmployeePayroll{
    _name;
    _imageSource;
    _gender;
    _department;
    _salary;
    _startDate;
    _notes;

    constructor(name,image,gender,department,salary,startDate,notes){
        this.name = name;
        this.image = image;
        this.gender = gender;
        this.department = department;
        this.salary = salary;
        this.startDate = startDate;
        this.notes = notes;
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
}

function save(){
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
        employeePayrollList.push(new EmployeePayroll(name,imageSource2,gender2,department2,salary,startDate,notes));
    }catch(e){
        console.error(e);
        return;
    }
    console.log(employeePayrollList);
    let image = new Image();
    let image5 = document.images[5];
    image.onload = function(){
        image5.src = this.src;
        image5.alt = "The directory of the image selected not corrected."
    }
    image.src = imageSource2;
}