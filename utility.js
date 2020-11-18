const stringify_date = (date) => {
    const options = {day:'numeric',month:'short',year:'numeric'};
    const newDate = !date ? "undefined":
                            new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
};

let site_prooperties = {
    home_page: "AddEmployee.html",
    add_emp_payroll_page: "employeePayrollFormHtml.html"
}