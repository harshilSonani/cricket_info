const stadiumdb = require('../model/stadiumModel');
module.exports.addStadium = (req, res) => {
    return res.render('addStadium');
}

module.exports.insertstadium = async (req, res) => {
    let data = await stadiumdb.create(req.body);

    return res.redirect('back');
}

module.exports.stadiumRecord = async (req, res) => {
    let  data = await stadiumdb.find({});

    return res.render('show_stadiumRecord',{
        data : data
    })
}

module.exports.deleteAdminRecord = async (req,res) =>{
    let data = await stadiumdb.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}

module.exports.update = async (req,res) =>{
    let data = await stadiumdb.findById(req.params.id);
    
    return res.render('update_stadium',{
        data : data
    })
} 

module.exports.updateData = async (req,res) =>{
    let data = await stadiumdb.findByIdAndUpdate(req.body.uid, req.body);

    return res.redirect('stadiumRecord')
}