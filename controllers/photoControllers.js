const { Photo, Comment, User, Sequelize } = require("../models");
const jwt = require("jsonwebtoken");

class photoControllers{
    static async create(req, res){  
        let token = req.headers.token;
		let user_login = jwt.verify(token, "secretkey");
 
        let input = {
            poster_image_url : req.body.poster_image_url,
            title : req.body.title,
            caption : req.body.caption,
            UserId : user_login.id
        }

        Photo.create(input)
            .then((data) => {
                res.status(201).json({
                    id : data.id,
                    poster_image_url: data.poster_image_url,
                    title : data.title,
                    caption: data.caption,
                    UserId: data.UserId
                });
            })
            .catch((err) => {
                let errCode = 500;
                let errMessages = [];
    
                if(err.name.includes("SequelizeForeignKeyConstraint")){
                    errCode = 400
                    errMessages.push(err.parent.detail);
                }else if (err.name.includes("SequelizeValidation")) {
                    errCode = 400
                    for (let index in err.errors) {
                        let errMsg = err.errors[index].message;
                        errMessages.push(errMsg);
                    }
                }
                res.status(errCode).json({
                    message: errMessages
                })

                
            });                 
    }
    
    static index(req, res){
        Photo.findAll({
            include : [
                {
                    model: Comment,
                    attributes: ['comment'],
                    include: [{
                        model: User,
                        attributes : ['username']
                    }]
                },

                {model: User, attributes: ['id', 'username', 'profile_image_url']}            
            ]
        })
        .then(data=>{
            res.status(200).json({
                "photos" : data
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    }

    static async edit(req, res){
    let token = req.headers.token;
    let user_login = jwt.verify(token, "secretkey");
    let photo_instance = await Photo.findOne({
        where: {
            id: req.params.photoId
        },
    }); 
    
    if(photo_instance === null){
        res.status(404).json({massage: "Photo doest not exists"})
    }

    if(user_login.id !== photo_instance.UserId){
        res.status(403).json({massage: "You dont have permision on this photo"})
    }else{
        photo_instance.update({
           title : req.body.title,
           caption : req.body.caption,
           poster_image_url: req.body.poster_image_url

        }).then(data=>{
            res.status(200).json({
                photo:  data
            })
        }).catch(err=>{
            res.status(500).json(err)
        })
    }
       

    }

    static async delete(req, res) { 
        let token = req.headers.token;
        let user_login = jwt.verify(token, "secretkey");
        let photo_instance = await Photo.findOne({
            where: {
                id: req.params.photoId
            },
        }); 
        if (photo_instance === null) {
            res.status(404).json({
                message: "Photo doesn't exist.",
            });
        } else if (user_login.id != photo_instance.UserId) {
            res.status(403).json({
                message: "You dont have permission on this user.",
            });
        } else {
            photo_instance
                .destroy()
                .then(() => {
                    res.status(200).json({
                        message: "Your Photo has been successfully deleted.",
                    });
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        }
          
	}
}

module.exports = photoControllers
