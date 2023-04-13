const matchTypesdb = require('../model/matchTypesModel');

module.exports.addmatch = (req,res) =>{
    return res.render('addMatchtypes');
}

module.exports.insertMatchtype = async (req,res) =>{
    let data = await matchTypesdb.create(req.body);

    return res.redirect('back');
}

module.exports.matchTypesRecod = async (req,res) =>{
    let data = await matchTypesdb.find({});

    return res.render('show_matchTypesRecord',{
        data : data
    });
}

module.exports.deleteAdminRecord = async (req,res) =>{
    let data = await matchTypesdb.findByIdAndDelete(req.params.id);

    return res.redirect('back');
}

module.exports.updateAdminRecord = async (req,res) =>{
    let data = await matchTypesdb.findById(req.params.id);

    return res.render('update_addMatchtypes',{
        data : data
    })
}

module.exports.updateData = async (req,res) =>{
    let data = await matchTypesdb.findByIdAndUpdate(req.body.uid, req.body);
    
    return res.redirect('matchTypesRecod')
}