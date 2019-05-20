function findCourseName(id) {
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].course_id == id) {
            return courses[i].course_name;
        }
    }
}

function generateBatchID() {
    var newId = $("tbody tr:last-child td:first-child").text();
    var num = parseInt(newId.substring(1,4));
    $("#txtBatchID").val("B00" +(num+1));
}

function rowClick() {
    $("tbody tr").off("click");
    $("tbody tr").click(function () {
        // set Selected data to Fields
        $("#slctSelectCourse").val($(this).find("td:nth-child(3)").text());
        $("#txtCourseName").val($(this).find("td:nth-child(4)").text());
        $("#txtBatchID").val($(this).find("td:nth-child(1)").text());
        $("#txtBatchName").val($(this).find("td:nth-child(2)").text());

        // change button to Update
        $("#btnSave").text("Update");
    });
}

// Form Validations
function validationForms() {
    var courseName = $("#txtCourseName").val();
    var batchName = $("#txtBatchName").val();
    var valid = true;

    if ($.trim(batchName).length == 0) {
        $("#txtBatchName").css("border-color", "red");
        valid = false;
    }
    if ($.trim(courseName).length == 0) {
        $("#txtCourseName").css("border-color", "red");
        valid = false;
    }
    return valid;
}

// clear fields
function clearFields() {
    $("#txtCourseName").val("");
    $("#txtBatchID").val("");
    $("#txtBatchName").val("");
}

// Data Insert / Update to the table
function insertAndUpdate() {
    $("#btnSave").click(function () {
        var buttonType = $("#btnSave").text();

        var courseID = $("#slctSelectCourse").val();
        var courseName = $("#txtCourseName").val();
        var batchID = $("#txtBatchID").val();
        var batchName = $("#txtBatchName").val();

        if (buttonType == "Update") {
            var valid1 = validationForms();
            if (valid1) {
                $("tbody tr td:first-child").each(function () {
                    if ($(this).text() == batchID) {
                        $(this).parent().find("td:nth-child(2)").text(batchName);
                        $(this).parent().find("td:nth-child(3)").text(courseID);
                        $(this).parent().find("td:nth-child(4)").text(courseName);
                        clearFields();
                        generateBatchID();
                        $("#btnSave").text("Save");
                    }
                });
            }
        }
        else if (buttonType == "Save") {
            alert("save")
            if (validationForms()) {
                batchs.push(
                    {
                        course_id: courseID,
                        course_name: courseName,
                        batch_id:batchID,
                        batch_name: batchName
                    }
                );
                var html = "<tr>" +
                    "<td>" + batchID + "</td>" +
                    "<td>" + batchName + "</td>" +
                    "<td>" + courseID + "</td>" +
                    "<td>" + courseName + "</td>" +
                    "<td><i class=\"fas fa-trash\"></i></td>" +
                    "</tr>";

                $("#tblBatch tbody").append(html);

                clearFields();
                generateBatchID();

            }
        }
        reload();
    });
}

$(document).ready(function () {
    //load data to  combobox
    for (var i = 0; i < courses.length; i++) {
        var option = "<option>" + courses[i].course_id + "</option>";
        $("#slctSelectCourse").append(option);
    }

    //load selected name to feild
    $("#slctSelectCourse").click(function () {
        var courseID = $("#slctSelectCourse").val();
        $("#txtCourseName").val(findCourseName(courseID));
    });

    reload();

    //load batch id
    generateBatchID();

    rowClick();
    insertAndUpdate();


});


function reload() {
    $('#tbody').empty();
    alert(batchs.length)
    for (var i = 0; i < batchs.length; i++) {
        var row="<tr>" +
            "<td>"+batchs[i].batch_id+"</td>" +
            "<td>"+batchs[i].batch_name+"</td>" +
            "<td>"+batchs[i].course_id+"</td>" +
            "<td>"+batchs[i].course_name+"</td>" +
            "<td><i class=\"fas fa-trash\"></i></td>" +
            "</tr>";
        $("tbody").append(row);

        $("#tbody tr td:last-child").click(function () {
            if (confirm("Are you whether you want to delete this record?")) {
                var row = $(this).parent();
                $(this).parent("tr").fadeOut(200, function () {
                    row.remove();
                });
            }
        });
    }
}
