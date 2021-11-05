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
3. Author
4. Category
5. Course
6. Lecture

# API's base url - https://dct-e-learning.herokuapp.com/api

### User Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a user | POST | /admin/users/register | <ul> <li> username*  </li> <li> email*  </li> <li> password*  </li> <li> role  </li> </ul>  |  <ul> <li> _id </li> <li> username </li> <li> email </li>  <li> password </li>  <li> admin (default first user is admin) </li> <li> createdAt</li> <li> updatedAt </li> </ul> | no | no|
| 2. | login a user | POST | /admin/users/login |  <ul> <li> email* </li> <li> password* </li> </ul> | <ul> <li>  token (validity 2 days.) </li></ul> | no | no|
| 3. | get user information | GET | /admin/users/account | - |  <ul> <li> _id </li> <li> username </li> <li> email </li>  <li> password </li><li> role </li><li> iat ( "Issued At" )(provided by jwt)</li><li> exp <li>(The date-time when this token will expire.)</li> <li>(provided by jwt)</li></li> </ul> | `{ Authorization : <token>}` | admin|
| 4. | get all users | GET | /admin/users | - | empty array or array of objects | `{ Authorization : <token>}` | admin|
| 5. | register a user (role moderator) | POST | /admin/users/register | <ul> <li> username*  </li> <li> email*  </li> <li> password*  </li> <li> role </li> </ul>  |  <ul> <li> _id </li> <li> username </li> <li> email </li>  <li> password </li>  <li> moderator (default except first user is moderator) </li> <li> createdAt</li> <li> updatedAt </li> </ul> | `{ Authorization : <token>}` | admin (only admin role can create moderator)|
---
**note - * indicates a required field**
---
### Student Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|
| 1. | register a user | POST | /students/register | <ul> <li> name*  </li> <li> email*  </li> <li> password*  </li><li> role </li><li> isAllowed (default true)</li><li> courses </li> </ul>  |  <ul> <li> _id </li> <li> username </li> <li> email </li>  <li> password </li><li> true </li> <li> empty array </li><li> createdAt</li> <li> updatedAt </li> </ul> | no | no|
| 2. | login a user | POST | /students/login |  <ul> <li> email* </li> <li> password* </li> </ul> | <ul> <li>  token (no expiry date) </li></ul> | no | no|
| 3. | get student information | GET | /students/:id | - |  <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> empty array or array of objects </li> <li> createdAt</li> <li> updatedAt </li> </ul> | `{ Authorization : <token>}` | yes (any)|
| 4. | get all students | GET | /students | - | empty array or array of objects | `{ Authorization : <token>}` | all  |
| 5. | update student info | PUT | /students/:id | <ul> <li> name </li> <li> email </li><li> isAllowed (boolean) </li>   </ul>  | <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> empty array or array of objects </li> <li> createdAt</li> <li> updatedAt </li> </ul>  | `{ Authorization : <token>}` | admin, moderator and registerd student   |
| 6. | delete student | DELETE | /students/:id | -  | <ul> <li> _id </li> <li> name </li> <li> email </li>  <li> password </li> <li> role </li><li> isAllowed </li><li> empty array or array of objects </li> <li> createdAt</li> <li> updatedAt </li> </ul>  | `{ Authorization : <token>}` | admin   |
---
**note - * indicates a required field**
---
### Student Resource
| # | action | method | url | request | response | auth (headers) | Role |
| ---- |-----|-------|--------|---------|------| ------|------|



---
**note - * indicates a required field**
---