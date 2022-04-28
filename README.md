# e-learning
### This is done to help the students who are learning front end development either React / Angular / Vue to build an application to test out their skills.
###### This is backened app built with technnologies: NodeJS, ExpressJS and MongoDB.
###### other tools: Postman, REST APIs.
###### Packages: 
```javascript 
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "mongoose": "^6.0.12",
    "mongoose-unique-validator": "^3.0.0",
    "nodemon": "^2.0.14",
    "uuid": "^8.3.2",
    "validator": "^13.6.0""
 ```

The modules are as follows

1. User
2. Student
3. Course
4. Lecture

## API's base url - https://dct-e-learning-app.herokuapp.com/api

### User Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a user (admin) | POST | /admin/register | <ul> <li> username*  </li> <li> email*  </li> <li> password*  </li><li>academy <ul><li> name*  </li> <li> website  </li> </ul></li></ul>  | <ul> <li>{ "notice": "Successfully created admin for < Academy name >" } </li></ul> or <ul> <li>{ "errors": "admin for this academy is already created" }</li></ul> | no | no|
| 2. | login a user (admin) | POST | /admin/login | <ul> <li> email*  </li> <li> password*  </li> </ul>  |  <ul> <li> token </li> </ul> | no | no|
| 3. | get user info | GET | /admin/account | -  |  <ul> <li> _id </li> <li> email </li><li> username </li><li> role </li><li> academy <ul><li>academyId</li><li>name</li><li>website</li></ul></li> </ul> | `{ Authorization : <token>}` | admin |
|4.| update user info | PUT | /admin |<ul> <li> email </li><li> username </li><li>academy<ul><li> name </li><li> website </li></ul> </li></ul> |<ul> <li> _id </li><li> email </li><li> username </li><li> role </li><li> academy <ul><li>academyId</li><li>name</li><li>website</li></ul></li> </ul> | `{ Authorization : <token>}` | admin |
---
***note - * indicates a required field***
---
### Student Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a student | POST | /admin/students | <ul> <li> name*  </li> <li> email*  </li> <li> password*  </li><li> isAllowed </li> </ul>  |  <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> student </li><li> true (default true) </li> <li> courses empty array </li> <li> user </li> <li> createdAt</li> <li> updatedAt </li> </ul> | `{ Authorization : <token>}` | admin|
| 2. | login a student | POST | /students/login |  <ul> <li> email* </li> <li> password* </li> </ul> | <ul> <li>  token </li></ul> | no | no|
| 3. | get student information | GET | /students/:id | - |  <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> role </li><li> isAllowed </li><li> empty array / array of courses </li> <li> user</li> </ul> | `{ Authorization : <token>}` | admin or student  |
| 4. | update student info | PUT | /students/:id | <ul> <li> name </li> <li> email </li><li> isAllowed (boolean) </li>   </ul>  | <ul> <li> _id </li> <li> name </li> <li> email </li> <li> role </li><li> isAllowed </li><li> empty array / array of courses </li> <li> user</li></ul>  | `{ Authorization : <token>}` | admin   |
| 5. | get all students | GET | /admin/students | - | empty array / array of students | `{ Authorization : <token>}` | admin  |
| 6. | delete student | DELETE | /admin/students/:id | -  | <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> role </li><li> isAllowed </li><li> user </li><li> empty array / array of courses </li> </ul>  | `{ Authorization : <token>}` | admin   |
---
***note - * indicates a required field***
---
### Course Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | get all courses (admin)| GET | /courses | -  | empty array / array of courses | `{ Authorization : <token>}` | admin   |
| 2. | get all courses (student)| GET | /courses | -  | empty array / array of courses | `{ Authorization : <token>}` | student   |
| 3. | create a course | POST | /courses | <ul> <li> name*  </li><li> description*  </li><li> duration*  </li><li> releaseDate  </li><li> isDelete  </li><li> category*  </li><li> validity*</li><li> level* </li><li> author*  </li></ul>|  <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li>empty array / array of students</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
| 4. | get a course info | GET | /courses/:id | -  | <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li>empty array or array of students</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin or student  |
| 5. | update course info | PUT | /courses/:id | <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li>  </ul> |  <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> empty array / array of students</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|6. | delete course | DELETE | /courses/:id |-| <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li>empty array / array of students</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|7. | enroll to the course by admin | PATCH | /courses/enroll?courseId=< courseId >&studentId=< studentId > |-| <ul> <li> _id </li> <li>students - array of students  </li><li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|8. | unenroll to the course by admin | PATCH | /courses/unenroll?courseId=< courseId >&studentId=< studentId > |-| <ul> <li> _id </li><li>students - array of students / empty array  </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|9. | enroll to the course by logged in student | PATCH | /courses/enroll?courseId=< courseId > |-| <ul>  <li>students - arrya of students  </li><li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul> </ul> | `{ Authorization : <token>}` | student   |
|10. | unenroll to the course by logged in student | PATCH | /courses/unenroll?courseId=< courseId > |-| <ul>  <li>students - arrya of objects  </li><li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> isDelete  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul> </ul> | `{ Authorization : <token>}` | student   |
|11. | enrolled courses | GET | /courses/enrolled |-|  empty array / array of courses | `{ Authorization : <token>}` | student   |

---
### Choose the courses - 'HTML', 'CSS', 'javascript', 'reactjs', 'nodejs','expressjs', 'mongodb'
### Choose the levels - 'beginner', 'intermediate', 'expert'
### Release Date format - YYYY-MM-DD
### Validity and duration fields - Number type in months (Ex: 6)
***note - * indicates a required field***
---
### Lecture Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | get all lectures (admin)| GET | /courses/:id/lectures | -  | empty array / array of lectures | `{ Authorization : <token>}` | admin or student   |
| 2. | create a lecture | POST | /courses/:id/lectures | <ul> <li> title*  </li><li> description*  </li><li> assetType*  </li><li> assetURL* </li><li> comments </li><li> students </li><li> course  </li><li> isDelete  </li></ul>|  <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> empty array </li><li> students empty array </li><li> user  </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin|
| 3. | get a lecture info | GET | /courses/:courseId/lectures/:id | -  | <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> empty array / array of comments </li><li> empty array / array of students </li><li> user  </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin or student   |
| 4. | update lecture info | PUT | /courses/:courseId/lectures/:id | <ul>  <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li>  empty array / array of students </li><li> course  </li><li> isDelete  </li> </ul> |  <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li>  empty array / array of comments </li><li>  empty array / array of students </li><li> user  </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|5. | delete lecture | DELETE | /courses/:courseId/lectures/:id |-| <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li>  empty array / array of comments </li><li>  empty array / array of students </li><li> user  </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
---
### asset URL you can take it from YouTube
### asset types - 'video', 'audio', 'text', 'pdf', 'img'
***note - * indicates a required field***
---
