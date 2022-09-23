import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";

// 关于state和props的关系
// 将state映射到 UI 组件的参数（props）
class CoursesPage extends React.Component {
  // 预定义的state数据结构
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         course: { title: "" },
  //         authors: { authorName: "" }
  //     }
  //     // this.handleChange = this.handleChange.bind(this);
  // }
  state = {
    redirectToAddCoursePage: false,
  };

  // 将输入框的内容同步到状态数据中
  // 函数式可以不用bind(this)
  // handleChange = (event) => {
  //     // 因为 React 中的对象都是Immutable的，所以要使用 ... 运算符复制目前的 this.state.course，然后将其title属性改为 event.target.value
  //     // 这里是对目前state中的course对象进行修改，因为是immutable的，所以要拷贝以后再改，course就是新对象
  //     // 之后将新对象赋值到state中
  //     // 简而言之，实时地将输入的文本写入到state中存储起来。
  //     const course = { ...this.state.course, title: event.target.value };
  //     // 语法糖，等价于 this.setState({course: course});
  //     this.setState({ course });
  // }

  // // 提交时要借助dispatch来修改state
  // handleSubmit = (event) => {
  //     // 提交时不要刷新页面
  //     event.preventDefault();
  //     // 执行了一个 createCourse 的动作
  //     // debugger;
  //     // 取出state中存储的文本，将其用来创建新对象。
  //     // props用来调用输出逻辑，也就是将用户的操作(submit)转化为动作并调用
  //     // 见:81
  //     this.props.actions.createCourse(this.state.course)
  //     // this.props.dispatch(courseActions.createCourse(this.state.course))
  //     // we don't need to call dispatch here since that's being handled in mapDispatchToProps now
  //     // alert(this.state.course.title);
  // }

  // 在初始状态下读取数据
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading Courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading Authors failed" + error);
      });
    }
  }
  // console.log(authors.length === 0);

  // const {courses, authors, actions} = this.props;

  // if(courses.length === 0) {
  //     actions.loadCourses().catch(error => {
  //         alert("Loading Courses failed" + error);
  //     });
  // }

  // if(authors.length === 0) {
  //     actions.loadAuthors().catch(error => {
  //         alert("Loading Authors failed" + error);
  //     })
  // }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}>
              Add Course
            </button>
            <CourseList courses={this.props.courses} />
          </>
        )}
      </>

      // <form onSubmit={this.handleSubmit}>
      //     <h2>Courses</h2>
      //     {/* <h3>Add Course</h3> */}
      //     {/* 这个 .bind(this) [React的事件绑定为什么要bind this - SegmentFault 思否](https://segmentfault.com/a/1190000038167700) */}
      //     {/* onChange就是往文本框里打字的时候触发， */}
      //     {/* <input type="text" onChange={this.handleChange} value={this.state.course.title} />
      //     <input type="submit" value="Save" /> */}
      //     {/* 将courses逐个列出 */}
      //     {this.props.courses.map(course => (
      //         // map可以理解为iterator，此类迭代器必须包含一个key
      //         <div key={course.title}>{course.title}</div>
      //     ))}
      // </form>
    );
  }
}
// propTypes用于检查传入参数的类型是否正确
// [使用 propTypes 进行类型检查 – React 中文文档 v16.6.3](https://react.html.cn/docs/typechecking-with-proptypes.html)
CoursesPage.propTypes = {
  // 在没有提供dispatch的时候显示警告
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  // since we declared mapDispatchToProps, dispatch is no longer injected.
  // only the actions we declared in mapDispatchToProps are passed in.
  // dispatch: PropTypes.func.isRequired
};

// 将传入的state转换为UI组件的props
function mapStateToProps(state) {
  // debugger;
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallInProgress > 0,
    // courses: state.courses.map(course => {
    //     return {
    //         // 解包
    //         // {
    //         //     "id": 1,
    //         //     "title": "Securing React Apps with Auth0",
    //         //     "slug": "react-auth0-authentication-security",
    //         //     "authorId": 1,
    //         //     "category": "JavaScript"
    //         // }
    //         ...course,
    //         // Loading Courses failedTypeError: Cannot read properties of undefined (reading 'name')
    //         authorName: state.authors.find(a => a.id === course.authorId).name
    //     }
    // }
    // )
  };
}

// 应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
// 这里的意思是：对于createCourse这个方法，应该去怎样调用action，:40
// 这里用来注册各种方法
function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    // 使用redux的方法进行简化
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}
// [Redux 入门教程（三）：React-Redux 的用法 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
// 前者负责输入逻辑，将state转换为UI组件的props，后者, mapDispatchToProps负责输出逻辑，将用户对UI的操作映射为action
// 即使不写后面那个mapDispatchToProps，也会自动传入
// 在这里，CoursesPage是UI组件，mapStateToProps,mapDispatchToProps这两个是逻辑组件，connect方法将其连接在一起。
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
