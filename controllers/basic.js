const user = require("../schema")

const makeuser = async (req, res) => {
    const { username } = req.body
    try {
        const data = await user.create({ username })
        res.send(data)
    }
    catch (error) {
        res.send(error)
    }

}

const add = async (req, res) => {
    const { status, username, category, keyword, code, scope, description } = req.body

    try {
        const thisuser = await user.findOne({ username })
        if (!thisuser) {
            res.send("no such user")
        }
        else {
            if (status == "public") {
                const data = thisuser.public.push({ category, keyword, code, scope, description }) // 1 if its pushed
            }
            else {
                const data = thisuser.private.push({ category, keyword, code, scope, description }) // 1 if its pushed

            }
            const datasave = await thisuser.save()

            // console.log(thisuser)
            // console.log(data)
            console.log(datasave)
            res.status(200).send(datasave)
        }

    }
    catch (error) {
        res.send(error)
    }
}

const update = async (req, res) => {
    const { status, username, category, newkeyword, keyword, code, scope, description } = req.body

    try {
        const thisuser = await user.findOne({ username })
        console.log(status)
        // console.log(thisuser)
        // const isfound = false 
        if (!thisuser) {
            res.send("no such user")
        }
        else {
            if (status == "public") {
                // console.log(thisuser.public.length)
                // const data = thisuser.public.findIndex((obj => obj.keyword == keyword));

                // searching using FINDINDEX
                const data = thisuser.public.findIndex(obj => {
                    return obj.keyword === keyword;
                });
                thisuser.public[data].code = code
                thisuser.public[data].category = category
                thisuser.public[data].description = description
                thisuser.public[data].scope = scope
                thisuser.public[data].keyword = newkeyword


                // serching for object via FOR LOOP
                // for (var j = 0; j < thisuser.public.length; j++) {

                //     if (thisuser.public[j].keyword == keyword) {
                // if (!newkeyword) {
                // thisuser.public[j].keyword = newkeyword
                // // }
                // // else {
                // //     thisuser.public[j].keyword = keyword
                // // }
                // // isfound = true

                // thisuser.public[j].category = category
                // thisuser.public[j].code = code
                // thisuser.public[j].scope = scope
                // thisuser.public[j].description = description
                // const data = thisuser.public.push({ category, keyword, code, scope, description }) // 1 if its pushed
                // const data = thisuser.public.update({code , category , scope , description , keyword})

                const datasave = await thisuser.save()
                res.status(200).send(datasave)
                //     }
                // }
                // console.log("hello")
            }
            else {
                console.log(thisuser.private.length)

                const data = thisuser.private.findIndex(obj => {
                    return obj.keyword === keyword;
                });
                thisuser.private[data].code = code
                thisuser.private[data].category = category
                thisuser.private[data].description = description
                thisuser.private[data].scope = scope
                thisuser.private[data].keyword = newkeyword

                // for (var j = 0; j < thisuser.private.length; j++) {
                //     console.log(thisuser.private[j].keyword, j, keyword)

                //     if (thisuser.private[j].keyword == keyword) {
                //         console.log(thisuser.private[j])
                //         // isfound = true
                //         // console.log(isfound)
                //         console.log("in here")
                //         // thisuser.public[j].remove()
                //         thisuser.private[j].keyword = keyword
                //         thisuser.private[j].category = category
                //         thisuser.private[j].code = code
                //         thisuser.private[j].scope = scope
                //         thisuser.private[j].description = description

                // const data = thisuser.private.push({ category, keyword, code, scope, description }) // 1 if its pushed
                const datasave = await thisuser.save()
                return res.status(200).send(datasave)
                // break;
                //     }

                // }
                // const data = thisuser.private.push({ category, keyword, code, scope, description }) // 1 if its pushed 
            }
            // console.log(thisuser)
            // console.log(data)
            console.log(datasave)

            res.send("invalid keyword")
        }
    }
    catch (error) {
        res.send(error)
    }

}

const remove = async (req, res) => {
    const { status, username, keyword } = req.body
    try {
        const thisuser = await user.findOne({ username })
        if (!thisuser) {
            res.send("no such user")
        }
        else {
            if (status == "public") {
                // console.log(thisuser.public.length)
                for (var j = 0; j < thisuser.public.length; j++) {

                    if (thisuser.public[j].keyword == keyword) {
                        thisuser.public.splice(j, 1)
                        // thisuser.public.remove(thisuser.public[j])

                        // const data = thisuser.public.push({ category, keyword, code, scope, description }) // 1 if its pushed
                        const datasave = await thisuser.save()
                        res.status(200).send(datasave)
                    }
                }
                // console.log("hello")
            }
            else {
                console.log(thisuser.private.length)
                for (var j = 0; j < thisuser.private.length; j++) {
                    console.log(thisuser.private[j].keyword, j, keyword)

                    if (thisuser.private[j].keyword == keyword) {
                        console.log(thisuser.private[j])
                        thisuser.private.splice(j, 1)
                        // thisuser.private.remove(thisuser.private[j])


                        // const data = thisuser.private.push({ category, keyword, code, scope, description }) // 1 if its pushed
                        const datasave = await thisuser.save()
                        return res.status(200).send(datasave)
                        // break;
                    }

                }
                // const data = thisuser.private.push({ category, keyword, code, scope, description }) // 1 if its pushed 
            }

        }
    }
    catch (error) {
        res.send(error)
    }
}

const searchpub = async (req, res) => {
    const { word } = req.body
    // const myArray = text.split(" ");
    const ans = [];

    try {
        // const thisuser = await user.find( )
        for await (const doc of user.find()) {
            // console.log(doc.public.length)
            //  //use `doc`
            for (var j = 0; j < doc.public.length; j++) {
                const temparray = doc.public[j].category.split(" ");

                for (var i = 0; i < temparray.length; i++) {
                    if (temparray[i] == word) {
                        console.log(temparray[i], doc.username)
                        ans.push(doc.public[j])
                    }
                }
            }
        }
        res.send(ans)

    }
    catch (error) {
        res.send(error)
    }
}

const searchpri = async (req, res) => {
    const { username, word } = req.body
    const ans = []

    try {
        const thisuser = await user.findOne({ username })

        for (var j = 0; j < thisuser.private.length; j++) {
            const temparray = thisuser.private[j].category.split(" ");

            for (var i = 0; i < temparray.length; i++) {
                if (temparray[i] == word) {
                    console.log(temparray[i], thisuser.username)
                    ans.push(thisuser.private[j])
                }
            }

        }
        res.send(ans)
    }
    catch (error) {
        res.send(error)
    }
}

const getpassword = async (req, res) => {
    const { username, keyword } = req.body
    // here username and keyword is of the sender
    try {
        const password = username + "." + keyword
        res.send(password)
    }
    catch (error) {
        res.send(error)
    }
}

const getcode = async (req, res) => {
    const { password, username } = req.body
    // here username is the name of the user who is requesting the code 

    const data = password.split(".");
    console.log(data[0], " ", data[1])

    try {
        const s = data[0]
        console.log(s)
        const sender = await user.findOne({ username: s })
        console.log(sender.username)
        const reciever = await user.findOne({ username: username })
        console.log(reciever.username)
        // console.log(sender.private.length)
        for (var j = 0; j < sender.private.length; j++) {
            console.log("here ", sender.private[j].keyword)
            if (sender.private[j].keyword == data[1]) {
                console.log(sender.private[j].keyword, " here i am",)
                console.log(sender.private[j])
                try {
                    const data1 = {
                        code: sender.private[j].code,
                        category: sender.private[j].category,
                        scope: sender.private[j].scope,
                        description: sender.private[j].description,
                        keyword: sender.private[j].keyword
                    }
                    // const data1 = sender.private[j] 
                    const pushdata = reciever.private.push(data1) // 1 if its pushed
                    console.log(pushdata)
                    const datasave = await reciever.save()
                    // console.log(thisuser)
                    // console.log(data)
                    console.log(datasave)
                    res.status(200).send(datasave)
                }
                catch (error) {
                    res.send(error)
                }
                // console.log(sender.private[j])                
            }
        }
        // const datasave = await reciever.save()
        // // console.log(thisuser)
        // // console.log(data)
        // console.log(datasave)
        // res.status(200).send(datasave)
        // res.send("hi")
    }
    catch (error) {
        res.send(error)
    }
}

const searchdidntwork = async (req, res) => {
    const { username, input, status } = req.body
    const letters = input.split('');
    console.log(username, " ", input, " ", status)
    // for(var k = 0;k<letters.length;k++)
    // {
    //     console.log(letters[k]," ")
    // }
    const ans = [];

    try {
        const thisuser = await user.findOne({ username: username })
        // console.log(thisuser)
        if (status == 'public') {
            // console.log(thisuser.public.length)
            for (var j = 0; j < thisuser.public.length; j++) {
                // console.log(thisuser.public[j].keyword.includes(input));
                const temparray = thisuser.public[j].keyword.split("");
                // for (var k = 0; k < temparray.length; k++) {
                //     console.log(temparray[k], " ")
                // }
                const issame = true
                // console.log(issame)
                if (letters.length <= temparray.length) {
                    for (var i = 0; i < letters.length; i++) {
                        console.log(letters[i], " ", temparray[i])

                        if (temparray[i] != letters[i]) {
                            // console.log("here ")
                            // try{
                            issame = false
                            // }
                            // catch(error){
                            //     return res.send(error)
                            // }
                            // break
                        }
                    }
                    
                    console.log(issame)
                    if (issame === true) {
                        console.log("pushed ")
                        ans.push(thisuser.public[j])
                    }
                }
                console.log("...........................")
            }
        }
        else {
            for (var j = 0; j < doc.public.length; j++) {
                const temparray = doc.public[j].category.split(" ");

                for (var i = 0; i < temparray.length; i++) {
                    if (temparray[i] == word) {
                        console.log(temparray[i], doc.username)
                        ans.push(doc.public[j])
                    }
                }
            }
            res.send(ans)
        }
    }
    catch (error) {
        res.send(error)
    }

}

const searchbyk = async (req,res)=>{
    const { username, input, status } = req.body
    const ans = [];

    try {
        const thisuser = await user.findOne({ username: username })
        // console.log(thisuser)
        if (status == 'public') {
            for (var j = 0; j < thisuser.public.length; j++) {
                const startswith = thisuser.public[j].keyword.startsWith(input);
                if(startswith === true)
                {
                    ans.push(thisuser.public[j])
                }               
            }
        }
        else {
            for (var j = 0; j < thisuser.private.length; j++) {
                const startswith = thisuser.private[j].keyword.startsWith(input);
                if(startswith === true)
                {
                    ans.push(thisuser.private[j])
                }               
            }
           
        }

        res.send(ans)
    }
    catch (error) {
        res.send(error)
    }

}



module.exports = { makeuser, add, update, remove, searchpub, searchpri, getpassword, getcode, searchbyk }