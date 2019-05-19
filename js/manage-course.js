$(window).on("load",function () {
    $("#txtCourseID").focus();
    console.log("jdjdjd");
});


/////////////////////////////////
$("#btn-save").click(function(){
    console.log("ckxl");

    var courseID=$("#txtCourseID").val();
    var courseName=$("#txtCourseName").val();
    var courseDescription=$("#txtCourseDescription").val();
    var courseDuration=$("#txtCourseDuration").val();

    var validation = true;

    //ID check whether it is in or not


    if (courseDuration.trim().length == 0){
        validation = false;
        $("#txtCourseDuration").focus();
        $("#txtCourseDuration").select();
    }

    if (courseDescription.trim().length == 0){
        validation = false;

        $("#txtCourseDescription").focus();
        $("#txtCourseDescription").select();
    }

    if (courseName.trim().length == 0){
        validation = false;
        $("#txtCourseName").focus();
        $("#txtCourseName").select();
    }
    if (courseID.trim().length==0){
        validation = false;
        $("#txtCourseID").focus();
        $("#txtCourseID").select();
    }

    if (!validation){
        return;
    }

    var html = "<tr>" +
        "<td>" + courseID +"</td>" +
        "<td>" + courseName + "</td>" +
        "<td>" + courseDescription +"</td>" +
        "<td>" + courseDuration + "</td>" +
        // "<td></td>" +
        "</tr>";

    $("table tbody").append(html);

    clear();

    courses.push(
        {
            course_id:courseID,
            course_name:courseName,
            course_description:courseDescription,
            course_duration:courseDuration
        }
    );



});
function clear(){
    $("#txtCourseID").val("");
    $("#txtCourseName").val("");
    $("#txtCourseDescription").val("");
    $("#txtCourseDuration").val("");

}






