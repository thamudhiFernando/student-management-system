function getAllStudents() {
    return students;
}
function getAllCourses() {
    return courses;
}
function getAllBatches() {
    return batchs;
}
function getAllRegistrations() {
    return register;
}

var studentArray;
var courseArray;
var batchArray;

switch (document.readyState) {
    case "loading":
        studentArray = getAllStudents();
        courseArray = getAllCourses();
        batchArray = getAllBatches();
        loadStudentCombo();
        loadCourseCombo();
        loadBatchCombo();
        break;
    default:
        alert("nothing");
}

function loadStudentCombo() {
    $("#selectStudentID").empty();
    for(var i=0;i<studentArray.length;i++){
        var studentObject=studentArray[i];
        var studentID=studentObject.student_id;
        $("#selectStudentID").append("<option>"+studentID+"</option>");
    }
}

$("#selectStudentID").click(function () {
    var selectedCode = $("#selectStudentID").val();
    for(var i=0;i<studentArray.length;i++){
        var studentObject=studentArray[i];
        var studentID=studentObject.student_id;
        if (selectedCode == studentID) {
            $("#studentName").val(studentArray[i].student_name);
        }
    }
});

function loadCourseCombo() {
    for(var i=0;i<courseArray.length;i++){
        var courseObject=courseArray[i];
        var courseID=courseObject.course_id;
        $("#selectCourseID").append("<option>"+courseID+"</option>");
    }
}

$("#selectCourseID").click(function () {
    var selectedCode = $("#selectCourseID").val();
    for(var i=0;i<courseArray.length;i++){
        var studentObject=courseArray[i];
        var studentID=studentObject.course_id;
        if (selectedCode == studentID) {
            $("#txtCourseName").val(courseArray[i].course_name);
        }
    }
});

function loadBatchCombo() {
    for(var i=0;i<batchArray.length;i++){
        var batchObject=batchArray[i];
        var batchID=batchObject.batch_id;
        $("#selectBatchID").append("<option>"+batchID+"</option>");
    }
}
$("#selectBatchID").click(function () {
    var selectedCode = $("#selectBatchID").val();
    for(var i=0;i<batchArray.length;i++){
        var batchObject=batchArray[i];
        var batchID=batchObject.batch_id;
        if (selectedCode == batchID) {
            $("#txtBatchName").val(batchArray[i].batch_name);
        }
    }
});

$("#btnRegister").click(function () {
    var studentId = $("#selectStudentID").val();
    var studentName = $("#studentName").val();
    var courseId = $("#selectCourseID").val();
    var courseName = $("#txtCourseName").val();
    var batchId = $("#selectBatchID").val();
    var batchName = $("#txtBatchName").val();


    // var isEmpty = checkEmpty();
    // if (isEmpty) {
    //     var isValidate = checkValidate(id,name,address);
    //     if (isValidate) {
    makeRegistration(studentId, studentName, courseId,courseName,batchId,batchName);
    reload(courseId,courseName,batchId,batchName);
        // }
    // }
});
function makeRegistration(studentId, studentName, courseId,courseName,batchId,batchName) {
    register.push(
        {
            student_id: studentId,
            student_name: studentName,
            course_id:courseId,
            course_name:courseName,
            batch_id:batchId,
            batch_name:batchName
        }
    );
}


function reload(courseId,courseName,batchId,batchName) {
    var tempArray=getAllRegistrations();
    $('#tbody').empty();

        var row="<tr>" +
            "<td>"+courseId+"</td>" +
            "<td>"+courseName+"</td>" +
            "<td>"+batchId+"</td>" +
            "<td>"+batchName+"</td>" +
            "<td><img src='images/recyclebin.png' width='30px'> </td>" +
            "</tr>";
        $('#tbody').append(row);
        $("#tbody tr td:last").click(function () {
            var id= $(this).parent().children().first().text();
            $(this).parent().fadeOut(500);
        });

}


$("#model-save").click(function () {
    var modelID = $("#txtStdId").val();
    var modelName = $("#txtStdName").val();
    var modelContact = $("#txtStdContactNo").val();

    students.push(
        {
            student_id: modelID,
            student_name: modelName,
            student_contact: modelContact
        }
    );
    $("#txtStdId , #txtStdName , #txtStdContactNo").val("");
    loadStudentCombo();
});
