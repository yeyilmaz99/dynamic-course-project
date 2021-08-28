// Creating Course Class

class Course{
    constructor(title,instructor,image){
        this.courseId = Math.floor(Math.random()*10000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}
//creating UI class
class UI{
    addCourseToList(course){
        const list = document.getElementById('course-list');
        var html = `
            <tr>
            <td><img class="img1" src="img/${course.image}"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a data-id="${course.courseId}" class="btn btn-danger delete">Delete</a></td>
            </tr>
            
            `
        list.innerHTML += html
    }
    clearControls(){
        const title = document.getElementById('title').value='';
        const instructor = document.getElementById('instructor').value='';
        const image = document.getElementById('image').value='';
    }
    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true;
        }
    }
    deleteAllCourses(element){
        const list = document.getElementById('course-list');
        list.innerHTML='';
    }

    showAlert(message,className){
        var alert = `
            <div class="alert alert-${className}">
            ${message}
            </div>
        `
        const row = document.querySelector('.row');
        //beforeBegin , afterBegin , beforeEnd, afterEnd, // adding alert to row
        row.insertAdjacentHTML('beforeBegin',alert)

        setTimeout(() => {
            document.querySelector('.alert').remove();
        },2000)
    }
}

//creating Storage Class for local storage

class Storage{
    static getCourses(){
        let courses;
        if(localStorage.getItem('courses')===null){
            courses =[];
        }else{
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    };

    static displayCourses(){
        const courses = Storage.getCourses();

        courses.forEach(course => {
            const ui = new UI();
            ui.addCourseToList(course);
        });
        
    };

    static addCourse(course){
        const courses = Storage.getCourses();

        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    };

    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');
            console.log(id)

            const courses = Storage.getCourses();

            courses.forEach((course,index) =>{
                if(course.courseId == id){
                    courses.splice(index,1);
                }
            })
            localStorage.setItem('courses',JSON.stringify(courses));
        }
    };
}

document.addEventListener('DOMContentLoaded', Storage.displayCourses);

// creating form submit event
document.getElementById('new-course').addEventListener('submit',function(e){
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value;


    // creating course object
    const course = new Course(title,instructor,image);
    console.log(course);


    //creating ui

    const ui = new UI();
    
    if(title ==='' ||instructor==='' ||image===''){
        ui.showAlert('please complete the form','warning');
    }if(image!=='1.jpg' && image!== '2.jpg'&& image!== '3.jpg'&& image!== '4.jpg'){
        ui.showAlert('image should be (1.jpg, 2.jpg, 3.jpg or 4.jpg','warning');
    }else{
        //adding course object to the list
        ui.addCourseToList(course);
        // Saving course to Local Storage
        Storage.addCourse(course);
        // clearing the form
        ui.clearControls();
        // Success alert
        ui.showAlert('the form has been saved','success');

    }
    e.preventDefault();
})
// Deleting one item
document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI();
    // deleting the course
    if(ui.deleteCourse(e.target)==true){

        //Deleting the course from local storage
        Storage.deleteCourse(e.target);
    
        ui.showAlert('the course has been deleted','danger')
    }
});

//Delete All in once
document.getElementById('delete-All').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteAllCourses(e.target)
    localStorage.clear();
})

