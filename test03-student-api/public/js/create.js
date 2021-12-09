let students = [];
let inputName = document.getElementById("name");
let inputBirthday = document.getElementById("birthday");
let inputEmail = document.getElementById("email");
let inputPhone = document.getElementById("phone");
let btnSave = document.getElementsByClassName("btn-success")[0];

function newId() {
  return  students.length + 1;
}

function getListStudent() {
  return axios.get("/users");
}

function createStudentAPI(newName, newEmail, newPhone, newBirthday) {
  return axios.post("/users", {
    id: newId(),
    name: newName,
    email: newEmail,
    phone: newPhone,
    birthday: newBirthday,
  });
}

async function getStudents() {
  try {
    const res = await getListStudent();
    students = res.data;
  } catch (error) {
    console.log(error);
  }
}

async function createStudent(newName, newEmail, newPhone, newBirthday) {
  try {
    const res = await createStudentAPI(
      newName,
      newEmail,
      newPhone,
      newBirthday
    );
    students.push(res.data);
  } catch (error) {
    console.log(error);
  }
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateDOB(dob) {
  var pattern =/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/;
  if (dob== null || dob == "" || !pattern.test(dob)) {
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



btnSave.addEventListener("click", function () {
  let name = inputName.value;
  let birthday = inputBirthday.value;
  let email = inputEmail.value;
  let phone = inputPhone.value;
  if (name == "" || birthday == "" || email == "" || phone == "") {
    alert("Không được để ");
    return;
  } else if (validateEmail(email) == false) {
    alert("Email không đúng định dạng");
  } else if (validateDOB(birthday) == false) {
    alert("Ngày tháng năm sinh không đúng định dạng : DD//MM//YYYY");
  } else if (validateName(name) == false) {
    alert("Tên Phải Dài hơn 8 ký tụ");
  }
  else if (phonenumber(phone)) {
    alert("Số Điện Thoại phải đúng 10 số và định dạng số Việt Nam");
  }
   else {
    createStudent(name, email, phone, birthday);
    window.location.href = "index.html";
  }
});

let goBack = document.getElementById('goback')
goBack.addEventListener('click',function(){
  window.location.href = "index.html";
})

window.onload = () => {
  getStudents();
};