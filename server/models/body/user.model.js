const createUser = req => {
    const user = {
        email: req.body.email,
        names: req.body.names,
        password: req.body.password
    }

    return user;
}


const loginUser = req => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    return user;
}



export default{createUser,loginUser};