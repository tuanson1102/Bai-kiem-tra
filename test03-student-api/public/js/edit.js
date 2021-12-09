let students = [];
let inputName = document.getElementById('name')
let inputBirthday = document.getElementById('birthday')
let inputEmail = document.getElementById('email')
let inputhone = document.getElementById('phone')
let btnSave = document.getElementById('btn-save')

function getListStudent(){
    return axios.get("/users"); 
}
function getStudentByID(id){
    return axios.get(`/users/${id}`)
}

function updateStudentAPI(id,newName,newEmail,newPhone,newBirthday){
    return axios.put(`/users/${id}`,{
        id : id,
        name: newName,
        email: newEmail,
        phone: newPhone,
        birthday: newBirthday
    })
}
async function getStudents() {
    try {
        const res = await getListStudent();
        students = res.data;
    } catch (error) {
        console.log(error);
    }
}

async function updateStudents(id,newName,newEmail,newPhone,newBirthday) {
    try {
        const res = await updateStudentAPI(id,newName,newEmail,newPhone,newBirthday);
        for(let i = 0 ;i  < students.length ; i++) {
            if(students[i] == id){
                students[i].name = newName;
                students[i].email = newEmail;
                students[i].phone = newPhone;
                students[i].birthday = newBirthday
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  function validateDOB(phone) {
    var pattern =/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/;
    if (phone == null || phone == "" || !pattern.test(phone)) {
      return false;
    } else {
      return true;
    }
  }
  function validateName(name) {
    if (name.length < 8) {
      return false;
    }
    return true;
  }

  function phonenumber(inputtxt)
  {
    var phoneno = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if(!phoneno.test(inputtxt))
          {
        return true;
          }
        else
          {
          
          return false;
          }
  }
  

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


async function request(){
    try {
        let id = getUrlParameter('id')
        const res = await getStudentByID(id)
        
        inputName.value = res.data.name
        inputEmail.value = res.data.email
        inputPhone.value = res.data.phone
        inputBirthday.value = res.data.birthday
    } catch (error) {
        console.log(error)
    }
}
btnSave.addEventListener('click',function(){
   let name = inputName.value;
   let birthday = inputBirthday.value;
   let email = inputEmail.value;
   let phone = inputPhone.value;
   if (name == "" || birthday == "" || email == "" || phone == "") {
    alert("Không được để trống");
    return;
  } else if (validateEmail(email) == false) {
    alert("Email không đúng định dạng");
  } else if (validateDOB(birthday) == false) {
    alert("Ngày tháng năm sinh không đúng định dạng");
  } else if (validateName(name) == false) {
    alert("Tên Phải Dài hơn 8 ký tụ");
  } else if (phonenumber(phone)) {
    alert("Số Điện Thoại chỉ được 10 số và định dạng số Việt Nam");
  }
  else{
    let id = getUrlParameter('id')
    updateStudents(id,name,email,phone,birthday)
    window.location.href = "index.html";
  }
  
})


let goBack = document.getElementById('goback')
goBack.addEventListener('click',function(){
  window.location.href = "index.html";
})


window.onload = () => {
    getStudents();
    request();
 };