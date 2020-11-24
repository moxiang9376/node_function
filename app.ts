const fs: any = require("fs") // 引入fs

getProgramsMd("F:/MOPrograms/flutter_rent_xiaomei2/flutter_rent_xiaomei2", "flutter")




// 创建目录结构MD文件
function getProgramsMd(path: string, type: string) {
    let mdContent = ""
    createProgramsMd(path)
    fs.writeFileSync(`${path}/项目目录结构_test.md`, mdContent)
    //创建目录结构MD文件，localPath,路径
    function createProgramsMd(localPath: string, num: number = 1) {
        if (!num) {
            num = 1
        }

        let fileName = fs.readdirSync(localPath)
        let directoryList = []
        let fileList = []

        if (fileName.length != 0) {
            fileName.forEach(item => {

                //判断是文件还是文件夹
                let check = fs.statSync(`${localPath}/${item}`)
                if (check.isFile()) {
                    fileList.push(item)
                }
                if (check.isDirectory()) {

                    if (checkDirectoryName(item, type)) {
                        directoryList.push(item)
                    }
                }
            })

            let n = ""

            if (num != 1) {
                for (let i = 0; i < num; i++) {
                    n += "  "
                }
            }

            num++
            //先写入文件夹名称
            directoryList.sort()
            directoryList.forEach(item => {
                mdContent += n + '+ ' + item + '\n'
                let newPath = localPath + "/" + item
                createProgramsMd(newPath, num)
            })

            //再写入文件名称
            fileList.sort()
            fileList.forEach(item => {
                let content = changeFontColor(item, type)
                mdContent += n + '+ ' + content + '\n'
            })
        }
    }
}

//检查不录入md的文件夹名称，name文件夹名称，type，项目类型 uniapp
function checkDirectoryName(name: string, type: string) {
    let checkArr = [
        {
            type: "uniapp",
            checkList: [".git", 'unpackage']
        },
        {
            type: "flutter",
            checkList: [".git", ".idea", ".dart_tool", "android", "build", "ios", "test"]

        }
    ]


    let check = checkArr.find(item => {
        return type == item.type
    })

    //如果存在这种项目类型的检查方法
    if (check != undefined) {
        let checkName = check.checkList.some(item => {
            return name == item
        })

        return !checkName
    }
    else {
        return true
    }

}

//修改md字体颜色,type,content，md文本内容 项目类型flutter,uniapp
function changeFontColor(content: string, type: string) {
    let changeColorArr = [
        {
            type: "uniapp",
            funs: (content) => {
                let colorCheckArr = [
                    {
                        checkText: 'js',
                        color: "SteelBlue"
                    }, {
                        checkText: 'css',
                        color: "DarkOrange"
                    }, {
                        checkText: 'nvue',
                        color: "OrangeRed"
                    }, {
                        checkText: 'vue',
                        color: "ForestGreen"
                    },
                ]
                function sortNumber(a, b) {
                    return b.checkText.length - a.checkText.length
                }
                colorCheckArr.sort(sortNumber)
                colorCheckArr.forEach(item => {
                    content = setColor({ text: content, checkText: item.checkText, color: item.color })
                })
                return content
            }
        },
        {
            type: "flutter",
            funs: (content) => {
                let colorCheckArr = [
                    {
                        checkText: 'dart',
                        color: "GoldEnrod"
                    }
                ]
                function sortNumber(a, b) {
                    return b.checkText.length - a.checkText.length
                }
                colorCheckArr.sort(sortNumber)
                colorCheckArr.forEach(item => {
                    content = setColor({ text: content, checkText: item.checkText, color: item.color })
                })
                return content
            }
        }
    ]


    let check = changeColorArr.find(item => {
        return type == item.type
    })

    if (check != undefined) {
        let newContent = check.funs(content)
        return newContent
    }
    else {
        return content
    }



    function setColor(data: any) {
        let check = ""
        check = data.text.substring(data.text.length - data.checkText.length)
        if (check == data.checkText) {
            return `<font color=${data.color}>` + data.text + "</font>"
        } else {
            return data.text
        }
    }
}