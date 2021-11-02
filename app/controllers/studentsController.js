const Student = require('../models/student')
const studentsController = {}


studentsController.register = (req, res) => {
    const body = req.body 
    const student = new Student(body)
    student.save()
        .then((student) => {
            res.json(student)
        })
        .catch((err) =>{ 
            res.json(err)
        })
   
        
    /*
    const student = new student()
    student.studentname = body.name 
    student.email = body.email
    student.password = body.password
    */
}

studentsController.login = (req, res) => {
    const body = req.body 
    Student.findOne({ email: body.email }) 
        .then((student) => {
            if(!student) {
                res.json({ 
                    errors: 'invalid email or password'
                })
            }

            bcryptjs.compare(body.password, student.password)
                .then((match) => {
                    if(match) {
                        const tokenData = {
                            _id: student._id,
                            email: student.email,
                            name: student.name
                        }
                        const token = jwt.sign(tokenData, 'dct123', { expiresIn: '2d'})
                        res.json({
                            token: `${token}`
                        })
                    } else {
                        res.json({ errors: 'invalid email or password'})
                    }
                })
        }).catch(err=>{
            res.json(err)
        })
}

studentsController.list = (req, res) => {
    Student.find({ })
        .then((students) => {
            res.json(students)
        })
        .catch((err) => {
            res.json(err)
        })
}

studentsController.show = (req, res) => {
    const id = req.params.id
    Student.findOne({ _id: id })
        .then((student) => {
            if (student) {
                res.json(student)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

studentsController.create = (req, res) => {
    const body = req.body
    const student = new Student(body)
    student.save()
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            res.json(err)
        })
}

studentsController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Student.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            res.json(err)
        })
}

studentsController.destroy = (req, res) => {
    const id = req.params.id
    Student.findOneAndDelete({ _id: id })
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = studentsController