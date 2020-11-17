window.addEventListener('DOMContentLoaded',(event) => {
    createInnerHtml();
})

const createInnerHtml= () => {
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    const inHtml = `${headerHTML}
        <tr>
            <td><img class="profile" alt="" src="images/Ellipse -2.png"></td>
            <td>Narayan Mahadevan</td>
            <td>Male</td>
            <td><div class="dept-label">HR</div>
            <div class="dept-label">Finance</div></td>
            <td>3000000</td>
            <td>1 Nov 2020</td>
            <td>
                <img src="icons/delete-black-18dp.svg" alt="delete" id="1" onclick="remove(this)">
                <img src="icons/create-black-18dp.svg" alt="edit" id="1" onclick="update(this)">
            </td>
        </tr>
    `;
    document.getElementById('display').innerHTML= inHtml;
}