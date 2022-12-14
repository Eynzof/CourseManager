import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

import Spinner from "../../components/common/Spinner";
import { toast} from "react-toastify";

export function ManageCoursePage({
    courses,
    authors,
    loadAuthors,
    loadCourses,
    saveCourse,
    history,
    ...props
}) {
    // 这些东西叫 localState
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch((error) => {
                alert("Loading Courses failed" + error);
            });
        } else {
            setCourse({ ...props.course })
        }
        if (authors.length === 0) {
            loadAuthors().catch(error => {
                alert("Loading authors failed" + error);
            })
        }
        // [] 只运行一次
        // 这里用到了 React 的 Hook 系统。
        // 逗号后面的内容就是 sideEffect（副作用），也就是调用函数之后伴随发生的东西。
        // 这里的意思是，当props.course发生变化时，就会调用这个函数
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }));
    }

    function handleSave(event) {
        event.preventDefault();
        if(!formIsValid()) return;    
        setSaving(true);
        // saveCourse is getting passed in by props, and it's being bound to dispatch via our mapDispatchProps declaration
        // this is different from the one at the top of the file
        saveCourse(course).then(() => {
            toast.success("Course Saved.")
            history.push('/courses');
            // setSaving(false);
        }).catch(error => {
            console.log("error occured")
            setSaving(false);
            setErrors({onSave: error.message })
        });
    }

    function formIsValid() {
        const { title, authorId, category} = course;
        const errors = {};

        if (!title) errors.title = "Title is required."
        if(!authorId) errors.author = "Author is required"
        if(!category) errors.category = "Category is required"

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    return authors.length === 0 || courses.length === 0 ? (<Spinner />) :(
          
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
        />
    );
}

// Prop types
ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
  }
  
// this will run each time redux state changes
function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length > 0
        ? getCourseBySlug(state.courses, slug)
        : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
};

// Redux Connect
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
