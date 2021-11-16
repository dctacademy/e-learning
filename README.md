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

# API's base url - https://dct-e-learning.herokuapp.com/api

### User Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a user (admin) | POST | /admin/register | <ul> <li> username*  </li> <li> email*  </li> <li> password*  </li><li>academy <ul><li> name*  </li> <li> website  </li> </ul></li></ul>  | <ul> <li>{ "notice": "Successfully created admin for dct Academy" } </li></ul> or <ul> <li>{ "errors": "admin for this academy is already created" }</li></ul> | no | no|
| 2. | login a user (admin) | POST | /admin/login | <ul> <li> email*  </li> <li> password*  </li> </ul>  |  <ul> <li> token </li> </ul> | no | no|
| 3. | get user info | GET | /admin/account | -  |  <ul> <li> _id </li> <li> email </li><li> username </li><li> role </li><li> password </li><li> academy <ul><li>academyId</li><li>name</li><li>website</li></ul></li> </ul> | `{ Authorization : <token>}` | admin |
|4.| update user info | PUT | /admin |<ul> <li> email </li><li> username </li><li>academy<ul><li> name </li><li> website </li></ul> </li></ul> |<ul> <li> _id </li><li> email </li><li> username </li><li> role </li><li> academy <ul><li>academyId</li><li>name</li><li>website</li></ul></li> </ul> |  | `{ Authorization : <token>}` | admin |
---
***note - * indicates a required field***
---
### Student Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a student | POST | /admin/students | <ul> <li> name*  </li> <li> email*  </li> <li> password*  </li><li> isAllowed </li> </ul>  |  <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> student </li><li> true (default true) </li> <li> courses empty array </li> <li> user </li> <li> createdAt</li> <li> updatedAt </li> </ul> | `{ Authorization : <token>}` | admin|
| 2. | login a student | POST | /students/login |  <ul> <li> email* </li> <li> password* </li> </ul> | <ul> <li>  token </li></ul> | no | no|
| 3. | get student information | GET | /students/:id | - |  <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> empty array / array of courses </li> <li> user</li><li> createdAt</li> <li> updatedAt </li> </ul> | `{ Authorization : <token>}` | admin | student  |
| 4. | update student info | PUT | /students/:id | <ul> <li> name </li> <li> email </li><li> isAllowed (boolean) </li>   </ul>  | <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> empty array / array of courses </li> <li> createdAt</li> <li> updatedAt </li> </ul>  | `{ Authorization : <token>}` | admin   |
| 5. | get all students | GET | /admin/students | - | empty array / array of students | `{ Authorization : <token>}` | admin  |
| 6. | delete student | DELETE | /admin/students/:id | -  | <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> user </li><li> empty array / array of courses </li> <li> createdAt</li> <li> updatedAt </li> </ul>  | `{ Authorization : <token>}` | admin   |
---
***note - * indicates a required field***
---
