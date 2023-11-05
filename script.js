let data = {}
        if (localStorage.getItem("data") !== null) {
            data = JSON.parse(localStorage.getItem("data"))
        }
        console.log(data)

        const handleCopy = (val)=>{
            navigator.clipboard.writeText(data[val])
        }

        const handleSave = ()=>{
            localStorage.setItem("data", JSON.stringify(data));
        }

        const handleDelete = (val)=>{
            delete data[val];
            renderData()
            handleSave()
        }
    
        const renderData = ()=>{
            const keys = Object.keys(data)
            document.getElementById('main').innerHTML = keys.map((key)=>
                `<div id="${key}-hide" class="d-flex justify-content-between align-items-center border rounded p-2 mb-1">
                    <div class="" id="${key}">
                        <div style="cursor:pointer;" class="font-monospace">${key}</div>
                    </div>
                    <div>
                        <a id="${key}-del" class="btn btn-outline-danger btn-sm">Delete</a>
                    </div>
                </div>  
                `
            ).join("")

            keys.map((key)=>{
                document.getElementById(key).onclick = ()=>handleCopy(key)
            })

            keys.map((key)=>{
                document.getElementById(key+"-del").onclick = ()=>handleDelete(key)
            })
        }

        renderData()


        const handleSearchChange = ()=>{
            const substr = document.getElementById("search").value.toUpperCase()
            console.log("HERE")
            for(const key in data){
                if(key.toUpperCase().indexOf(substr)<0){
                    document.getElementById(key).style.display = 'none'
                    document.getElementById(key+"-del").style.display = 'none'
                }else{
                    document.getElementById(key).style.display = ""
                    document.getElementById(key+"-del").style.display = ""

                }
            }
        }

        const handleSubmit = ()=>{
            data[document.getElementById("key").value] = document.getElementById("value").value
            renderData()
            handleSave()
        }
        document.getElementById("search").onkeyup = ()=>handleSearchChange()

        document.getElementById("add").onclick = ()=> handleSubmit()