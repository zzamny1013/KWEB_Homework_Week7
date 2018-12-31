exports.isLogin = async (req, res, next) => {
    if(req.session.user && req.session.user.uid){
        return next();
    }else{
        return res.redirect('/');
    }
};

exports.isNotLogin = async (req, res, next) =>{
    if(req.session.user && req.session.user.uid){
        return res.redirect(`/users/${req.session.user.uid}`);
    }else{
        return next();
    }
};

exports.isMyUid = async (req, res, next) =>{
    if(req.session.user && req.session.user.uid && req.session.user.uid === parseInt(req.params.uid)){
        return next();
    }else{
        return res.redirect('/');
    }
}

exports.isAdmin = async (req, res, next) =>{
    if(req.session.user.id == 'admin'){
        return next();
    }else {
        console.log("누가 admin인척 하는데 ㅋㅋ");
        res.send('<script>alert("admin인척 하지마라 죽을라고 ㅋㅋ");history.back();</script>');
    }
}

exports.onlyTwoAble = async (req, res, next) => {
    try {
        if (req.session.user.id == 'admin') {
            return next();
        } else if (req.session.user && req.session.user.uid && req.session.user.uid === parseInt(req.params.uid)) {
            return next();
        } else {
            console.log("누가 admin인척 하는데 ㅋㅋ");
            res.send('<script>alert("댁은 뉘셔?");history.back();</script>');
        }
    }catch(e){
        return res.redirect('/');
    }
}
