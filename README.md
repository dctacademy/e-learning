# e-learning
### This is done to help the students who are learning front end development either React / Angular / Vue to build an application to test out their skills.
###### This is backened app built with technnologies: NodeJS, ExpressJS and MongoDB.
###### other tools: Postman, REST APIs.
###### Packages: 
```javascript "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.12",
    "nodemon": "^2.0.14",
    "validator": "^13.6.0" 
 ```

The modules are as follows

1. User
2. Student
3. Course
4. Lecture

# API's base url - https://dct-e-learning.herokuapp.com/api

### User Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a user (admin) | POST | /admin/register | <ul> <li> username*  </li> <li> email*  </li> <li> password*  </li><ul>academy <li> name*  </li> <li> website  </li> </ul><li> role </li> </ul>  |  <ul> <li> _id </li> <li> username </li> <li> email </li>  <li> password </li>  <li> role (default first user is admin) </li><ul>academy <li> _id </li><li> name  </li> <li> website  </li> </ul> <li> createdAt</li> <li> updatedAt </li> </ul> | no | no|
| 2. | login a user (admin) | POST | /admin/login | <ul> <li> email*  </li> <li> password*  </li> </ul>  |  <ul> <li> token </li> </ul> | no | no|
| 3. | get user info | GET | /admin/account | -  |  <ul> <li> _id </li> <li> email </li><li> username </li><li> role </li><li> password </li><li> academyId </li><li> iat (Issued at provided by JWT) </li><li> exp (The date-time when this token will expire. by JWT)</li> </ul> | `{ Authorization : <token>}` | admin |
|4.| get all users belongs to academy | GET | /admin/users | -  | empty array or array of objects | `{ Authorization : <token>}` | admin |
|5.| update user info | PUT | /admin/users/:id |<ul> <li> email </li><li> username </li><ul>academy<li> name </li><li> website </li></ul> </ul> |<ul> <li> _id </li><li> email </li><li> username </li><li> role </li><ul>academy<li> name </li><li> website </li></ul> </ul> |  | `{ Authorization : <token>}` | admin |
---
### Student Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a student | POST | /admin/students/register | <ul> <li> name*  </li> <li> email*  </li> <li> password*  </li><li> role </li><li> isAllowed </li><li> courses </li> </ul>  |  <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> student </li><li> true (default true) </li> <li> courses empty array </li> <li> user </li> <li> createdAt</li> <li> updatedAt </li> </ul> | `{ Authorization : <token>}` | admin|
| 2. | login a student | POST | /students/login |  <ul> <li> email* </li> <li> password* </li> </ul> | <ul> <li>  token </li></ul> | no | no|
| 3. | get student information | GET | /students/:id | - |  <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> empty array or array of objects </li> <li> user</li><li> createdAt</li> <li> updatedAt </li> </ul> | `{ Authorization : <token>}` | admin |
| 4. | get all students | GET | /students | - | empty array or array of objects | `{ Authorization : <token>}` | admin  |
| 5. | update student info | PUT | /students/:id | <ul> <li> name </li> <li> email </li><li> isAllowed (boolean) </li>   </ul>  | <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> empty array or array of objects </li> <li> createdAt</li> <li> updatedAt </li> </ul>  | `{ Authorization : <token>}` | admin   |
| 6. | delete student | DELETE | /students/:id | -  | <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> user </li><li> empty array or array of objects </li> <li> createdAt</li> <li> updatedAt </li> </ul>  | `{ Authorization : <token>}` | admin   |
---
***note - * indicates a required field***
---
### Course Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | get all courses (admin)| GET | /courses | -  | empty array of array of objects | `{ Authorization : <token>}` | admin   |
| 2. | get all courses (student)| GET | /courses | -  | empty array of array of objects | `{ Authorization : <token>}` | student   |
| 3. | create a course | POST | /courses | <ul> <li> name*  </li><li> description*  </li><li> duration*  </li><li> releaseDate  </li><li> category* </li><li> validity*</li><li> level* </li><li> author*  </li></ul>|  <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li>students empty array or array of objects</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
| 4. | get a course info | GET | /courses/:id | -  | <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li>students empty array or array of objects</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
| 5. | update course info | PUT | /courses/:id | <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li>  </ul> |  <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li>students empty array or array of objects</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|6. | delete course | DELETE | /courses/:id |-| <ul> <li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li>students empty array or array of objects</li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|7. | enroll to the course by admin | PATCH | /courses/enroll?courseId= < courseId >&studentId=<studentId> |-| <ul> <li>students - array of objects  </li><li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|8. | unenroll to the course by admin | PATCH | /courses/unenroll?courseId=<courseId>&studentId=<studentId> |-| <ul> <li>students - array of objects / empty array  </li><li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|9. | enroll to the course by logged in student | PATCH | /courses/enroll?courseId=<courseId> |-| <ul>  <li>students - arrya of objects  </li><li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | student   |
|10. | unenroll to the course by logged in student | PATCH | /courses/unenroll?courseId=<courseId> |-| <ul>  <li>students - arrya of objects  </li><li> _id </li> <li> name  </li><li> description  </li><li> duration  </li><li> releaseDate  </li><li> category </li><li> validity</li><li> level </li><li> author  </li><li> createdAt </li><li> updatedAt </li>  </ul><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | student   |


---
***note - * indicates a required field***
---
### Lecture Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | get all lectures (admin)| GET | /course/:courseId/lectures | -  | empty array of array of objects | `{ Authorization : <token>}` | admin   |
| 2. | create a lecture | POST | /course/:courseId/lectures | <ul> <li> title*  </li><li> description*  </li><li> assetType*  </li><li> assetURL* </li><li> comments </li><li> students </li><li> course*  </li><li> isDelete  </li></ul>|  <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> comments empty array or array of objects </li><li> students empty array or array of objects </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
| 3. | get a lecture info | GET | /course/:courseId/lectures/:id | -  | <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> comments empty array or array of objects </li><li> students empty array or array of objects </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
| 4. | update lecture info | PUT | /course/:courseId/lectures/:id | <ul>  <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> students empty array or array of objects </li><li> course  </li><li> isDelete  </li> </ul> |  <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> comments empty array or array of objects </li><li> students empty array or array of objects </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|5. | delete lecture | DELETE | /course/:courseId/lectures/:id |-| <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> comments empty array or array of objects </li><li> students empty array or array of objects </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | admin   |
|6. | comment to the lecture | PATCH | /course/:courseId/lectures/:id/comments |<ul><li> body*  </li>  </ul>| <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> comments array of objects </li><li> students empty array or array of objects </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | student   |
|7. | comment to the lecture | PATCH | /course/:courseId/lectures/:id/comments/commentId |<ul><li> body*  </li>  </ul>| <ul><li> _id  </li> <li> title  </li><li> description  </li><li> assetType  </li><li> assetURL </li><li> comments array of objects </li><li> students empty array or array of objects </li><li> course  </li><li> isDelete  </li><li> createdAt </li><li> updatedAt </li>  </ul> | `{ Authorization : <token>}` | student   |

---
***note - * indicates a required field***
---
