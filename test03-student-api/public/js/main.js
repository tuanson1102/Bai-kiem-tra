let tbodyEl = document.getElementsByTagName('tbody')[0]
let students = [];


function getListStudent(){
    return axios.get("/users"); 
}
async function getStudents() {
    try {
        const res = await getListStudent();
        students = res.data;
        students.sort((a,b) => (a.id < b.id ) ? 1 : ((b.id  < a.id ) ? -1 : 0))
        console.log(students)

        // Render ra ngoài giao diện
        renderUI(students);
    } catch (error) {
        console.log(error);
    }
}
function deleteStudentAPI(id){
    return axios({
        method : "delete",
        url : `/users/${id}`
    })
}
async function deleteStudent(id) {
    try {
        await deleteStudentAPI(id) 
        students.forEach((student, index) => {
            if(student.id == id) {
                students.splice(index, 1)
            }
        })

        renderUI(students)

    } catch (error) {
        console.log(error);
    }
}

function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }

function renderUI(arr){
    tbodyEl.innerHTML = "";
      
      if(arr.length == 0 ){
        tbodyEl.innerHTML = "Không có học sinh"
          return;
      }
      
      for (let i = 0 ; i < arr.length ; i++){
          const t = arr[i]
          tbodyEl.innerHTML += `<tr>
          <td>${t.name}</td>
          <td>${t.birthday}</td>
          <td>${t.email}</td>
          <td>${t.phone}</td>
          <td>
              <a href="/edit.html?id=${t.id}" class="text-info"><i class="fa fa-edit"></i> Chỉnh sửa</a>
              |
              <a class="text-danger"  onclick=deleteUser(${t.id})><i class="fa fa-trash-alt"></i> Xóa</a>
          </td>
      </tr>`
      }
     
}

function deleteUser(id) {
	let answer = window.confirm(`Bạn có muốn xóa`);
	if (answer) deleteStudent(id);
}

window.onload = () => {
    getStudents();
 };