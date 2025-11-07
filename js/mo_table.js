const base = window.location.origin;
const checkbox = document.getElementById('checkbox_pd');
const downloadButton = document.getElementById("dowload_check");
let timeout_tips;
let links;

    document.getElementById("checkbox_pd").addEventListener("change", function() {
        const checkbox = document.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            downloadButton.disabled = false;
            downloadButton.style.backgroundColor = "#04AA6D"; // 绿色
            downloadButton.textContent = "✓确认"
        } else {
            downloadButton.disabled = true;
            downloadButton.style.backgroundColor = "rgba(136, 136, 136, 0.2)"; // 灰色
            downloadButton.textContent = "不给你点！"
        }
    });




    document.getElementById("dowload_check").addEventListener("click", function() {
        const checkbox = document.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            window.open(links, "_blank");
        } else {
            clearTimeout(timeout_tips);
            var checkfalseModal = document.getElementById("myModal_checkfalse");
            checkfalseModal.style.display = "block";
            checkfalseModal.querySelector(".modal-content").classList.remove("modal-hide");

            function close_function(){
                checkfalseModal.querySelector(".modal-content").classList.add("modal-hide");
                checkfalseModal.querySelector(".modal-content").addEventListener("animationend", function () {
                checkfalseModal.style.display = "none";
                }, { once: true });
            }

            timeout_tips = setTimeout(function() {
                close_function()
                checkfalseModal.removeEventListener("click",remove_setTimeOut);
            }, 3000);

            function remove_setTimeOut(e){
                if(e.target === checkfalseModal || e.target.closest("#myModal_checkfalse")){
                    clearTimeout(timeout_tips);
                    //还是确保一下吧
                    close_function();
                    checkfalseModal.removeEventListener("click",remove_setTimeOut);
                }
            }

            checkfalseModal.addEventListener("click",remove_setTimeOut);
        }
    });


        var modalButtons = document.querySelectorAll("[data-modal-action]");

        var modals = document.querySelectorAll(".modal");

        modalButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                var targetId = this.dataset.modalTarget;
                var targetModal = document.getElementById(targetId);

                if (targetModal) {
                    var action = this.dataset.modalAction;
                    var modalData = this.dataset.modalData;

                    if (action === "open") {
                        openModal(targetModal,modalData);
                    } else if (action === "close") {
                        closeModal(targetModal);
                    }
                }
            });
        });

        // 打开模态框
        function openModal(modal,modalData) {
            modal.style.display = "block";
            modal.querySelector(".modal-content").classList.remove("modal-hide");
            (async () => {

                if (typeof modalData === "string") {
                    try {
                        modalData = JSON.parse(modalData);
                    } catch (e) {
                        modalData = modalData;
                    }
                } else {
                    modalData = modalData;
                }

                if(modalData==="in_GetCard_Buy"){
                    const tip = await fetchData("./viewpoint/json/CARD_Shouhou_Tips.json");
                    const tips = check_Tips(tip,modalData)
                    const timelist = await fetchData("./viewpoint/json/CARD_Shouhou_Latest_time.json")
                    const updatetime = check_Times(timelist,modalData)
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_GETCard_BUY.json");
                    var title = "卡密购买"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_GetCard_Get"){
                    const tip = await fetchData("./viewpoint/json/CARD_Shouhou_Tips.json");
                    const tips = check_Tips(tip,modalData)
                    const timelist = await fetchData("./viewpoint/json/CARD_Shouhou_Latest_time.json")
                    const updatetime = check_Times(timelist,modalData)
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_GETCard_URL.json");
                    var title = "卡密提取"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_AfterCard_QQgroup"){
                    const tip = await fetchData("./viewpoint/json/CARD_Shouhou_Tips.json");
                    const tips = check_Tips(tip,modalData)
                    const timelist = await fetchData("./viewpoint/json/CARD_Shouhou_Latest_time.json")
                    const updatetime = check_Times(timelist,modalData)
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_AfterCard_QQGroup.json");
                    var title = "加入售后群"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_Download"){
                    const tip = await fetchData("./viewpoint/json/CARD_Shouhou_Tips.json");
                    const tips = check_Tips(tip,modalData)
                    const timelist = await fetchData("./viewpoint/json/CARD_Shouhou_Latest_time.json")
                    const updatetime = check_Times(timelist,modalData)
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_StartDownload_URL.json");
                    var title = "辅助下载"
                    updateModalContent_download(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                    // updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_FansClub"){
                    const tip = await fetchData("/viewpoint/json/CARD_Shouhou_Tips.json");
                    const tips = check_Tips(tip,modalData)
                    const timelist = await fetchData("/viewpoint/json/CARD_Shouhou_Latest_time.json")
                    const updatetime = check_Times(timelist,modalData)
                    const json_data = await fetchData("/viewpoint/json/CARD_Shouhou_FansClub.json");
                    var title = "加入辉夜粉丝群（非售后群）"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_WechatLinks"){
                    const tip = await fetchData("/viewpoint/json/CARD_Shouhou_Tips.json");
                    const tips = check_Tips(tip,modalData)
                    const timelist = await fetchData("/viewpoint/json/CARD_Shouhou_Latest_time.json")
                    const updatetime = check_Times(timelist,modalData)
                    const json_data = await fetchData("/viewpoint/json/CARD_Shouhou_WechatLinks.json");
                    var title = "关注辉夜公众号"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(Array.isArray(modalData)){
                    links ="";
                    const tip = await fetchData("/viewpoint/json/CARD_Shouhou_Tips_downloadtrue.json");
                    const tips = check_Tips(tip,modalData[0])
                    links = modalData[3];
                    updateModalContent_DownloadTrue(modal, getCarddatahandle_DownloadTrue(modalData[0],modalData[1],modalData[2]),tips)
                }
            })();
        }

        // 关闭模态框
        function closeModal(modal) {
            modal.querySelector(".modal-content").classList.add("modal-hide");
            modal.querySelector(".modal-content").addEventListener("animationend", function () {
                modal.style.display = "none";
                if (checkbox && checkbox.checked !== false) {
                                checkbox.checked = false;
                                downloadButton.disabled = true;
                                downloadButton.style.backgroundColor = "rgba(136, 136, 136, 0.2)"; // 灰色
                                downloadButton.textContent = "✓确认"
                            }
            }, { once: true });
        }

        //获取json数据
        function fetchData(url) {
            return new Promise((resolve,reject)=>{
            fetch(url)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            });
    });
        }

        function check_Tips(tip,data){
            for(i=0;i<tip.length;i++){
                if(tip[i]["where"] == data){
                    return tip[i]["Tips"]
                }
            }
            return null
        }

        function check_Times(timelist,data){
            for(i=0;i<timelist.length;i++){
                if(timelist[i]["where"] == data){
                    return timelist[i]["time"]
                }
            }
            return null
        }

        function getCarddatahandle_DownloadTrue(modal,taobaolink,weidianlink){
                content = '<a href='+taobaolink+' target="_blank" class="shop-link">'+
                    '<img src="./img/cardphoto/'+modal+'_card_tb.png"/>'+
                    '<div class="shop-text taobao-text">淘宝</div>'+
                    '</a>'+
                    '<a href='+weidianlink+' target="_blank" class="shop-link">'+
                    '<img src="./img/cardphoto/'+modal+'_card_wd.png"/>'+
                    '<div class="shop-text weidian-text">微店</div>'+
                    '</a>'
                return content
        }

        function getCarddatahandle(modal, data){
            var content = "";
            var data_key = Object.keys(data[0]);
            var data_keyFirst = Object.keys(data[0])[0];
            
    for (var i = 0; i < data.length; i++) {
        // 第一列rowspan

        var arrLength = Array.isArray(data[i][data_key[1]]) ? data[i][data_key[1]].length : 1;


        for (var k = 0; k < arrLength; k++) {
            content += "<tr>";
            if (k === 0) {
                content += "<td rowspan='" + arrLength + "' style='border:1px solid #000;'>" + data[i][data_keyFirst] + "</td>";
            }
            // 其余字段同一行显示同一索引内容
            for (var j = 1; j < data_key.length; j++) {
                var part = data_key[j];

                if(part==="ingroup_URL"){
                    if(data[i][part][k] != null){
                    content += "<td style='border:1px solid #000;width:30%'><center>" +
                                                "<a href='" + data[i][part][k] + "' target='_blank'>"+
                                                '<span class="fa-stack fa-lg">'+
                                                    '<i class="fa fa-circle fa-stack-2x" style="color:#008CBA"></i>'+
                                                    '<i class="fa fa-stack-1x fa-inverse fa-qq"></i>'+
                                                "</span>"+
                                                "</a>"+
                                            "</center></td>";
                    continue;
                    }else{
                    content += "<td style='border:1px solid #000;width:30%'><a style='color:black'><center>" +"群已满人"
                                            "</center></a></td>";
                    }

                }else if(part == "ImgLinks"){
                    content += "<td style='border:1px solid #000;width:30%'>" +
                                            "<img src='" + data[i][part] + "'>" +
                                            "</img></td>";
                    continue
                }

            
                if(data[i][part][k]===null &&part!="use_card" || part==="button_color"|| part==="use_card_taobao"|| part==="use_card_weidian"|| part==="use_card_URL"){
                    continue;
                }

                if(part==="use_card"){
                    if(data[i][part][k]=="My"){
                        const linkdata = [];
                            linkdata.push(data[i][data_key[j]][k])
                            linkdata.push(data[i][data_key[j+1]][k])
                            linkdata.push(data[i][data_key[j+2]][k])
                            linkdata.push(data[i][data_key[j+3]][k])

                        content +="<td style='border:1px solid #000;width:30%'>" +
                                            "<button class='button' style='background-color:" + data[i][data_key[j+4]][k] + ";' data-modal-action='open' data-modal-target='myModal_2' data-modal-data="+JSON.stringify(linkdata)+">点击跳转</button>" +
                                            "</td>";
                                            continue;
                    }else if(data[i][part]=="mini"){
                        const linkdata = [
                            data[i][part],
                            data[i][data_key[j+1]],
                            data[i][data_key[j+2]],
                            data[i][data_key[j+3]]
                        ];
                        //迷你只有一个版本所以暂时不需要定位第几个
                        content +="<td style='border:1px solid #000;width:30%'>" +
                                            "<button class='button' style='background-color:" + data[i][data_key[j+4]] + ";' data-modal-action='open' data-modal-target='myModal_2' data-modal-data="+JSON.stringify(linkdata)+">点击跳转</button>" +
                                            "</td>";
                                            continue;
                    }else if(data[i][part][k]=="keqi"){
                        const linkdata = [
                            data[i][part][k],
                            data[i][data_key[j+1]][k],
                            data[i][data_key[j+2]][k],
                            data[i][data_key[j+3]][k]
                        ];
                        content +="<td style='border:1px solid #000;width:30%'>" +
                                            "<button class='button' style='background-color:" + data[i][data_key[j+4]][k]  + ";' data-modal-action='open' data-modal-target='myModal_2' data-modal-data="+JSON.stringify(linkdata)+">点击跳转</button>" +
                                            "</td>";
                                            continue;
                    }else{
                        //没做对只有一行的优化，后续做
                        content +="<td style='border:1px solid #000;width:30%'>" +
                                            "<a href='" + data[i][data_key[j+3]][k] + "' target='_blank'>" +
                                            "<button class='button' style='background-color:" + data[i][data_key[j+4]][k] + ";'>点击跳转</button>" +
                                            "</a></td>";
                                            continue;
                    }
                }


                if(part==="URL"){
                    if(arrLength != 1){
                    content += "<td rowspan='" + pd_null(data[i][part],k) + "' style='border:1px solid #000;width:30%'>" +
                                            "<a href='" + data[i][part][k] + "' target='_blank'>" +
                                            "<button class='button' style='background-color:" + data[i][data_key[j+1]][k] + ";'>点击跳转</button>" +
                                            "</a></td>";
                    continue;
                    }else{
                    content += "<td style='border:1px solid #000;width:30%'>" +
                                            "<a href='" + data[i][part] + "' target='_blank'>" +
                                            "<button class='button' style='background-color:" + data[i][data_key[j+1]] + ";'>点击跳转</button>" +
                                            "</a></td>";
                    continue;
                    }
                    
                }

                if(arrLength != 1){
                content += "<td rowspan='" + pd_null(data[i][part],k) + "'style='border:1px solid #000;'>" + data[i][part][k] + "</td>";
                }else{
                content += "<td style='border:1px solid #000;'>" + data[i][part]+ "</td>";
                }

            }
            content += "</tr>";
        }
    }
    return content;

        }

        function pd_null(data, inround) {
            let count = 0;
            for (let i = inround + 1; i < data.length && data[i] === null; i++) {
                count++;
            }
            return count + 1; 
        }

        //修改模态框中的相关内容
        function updateModalContent(modal, title, content,tips,updatetime) {
            var titleElement = modal.querySelector("h3");
            var contentElement = modal.querySelector("table");
            var tipsElement = modal.querySelector("#tips");
            var updateTimeElement = modal.querySelector("#update-time");

            if (titleElement) {
                titleElement.textContent = title;
            }
            if (contentElement) {
                contentElement.innerHTML = content;
            }
            if (tipsElement) {
                tipsElement.textContent = "Tips:"+tips;
            }
            if (updateTimeElement) {
                updateTimeElement.textContent = "更新时间："+updatetime;
            }
        }

        function updateModalContent_DownloadTrue(modal,content,tips) {
            var contentElement = modal.querySelector("span");
            var tipsElement = modal.querySelector("#tips");
            if (contentElement) {
                contentElement.innerHTML = content;
            }
            if (tipsElement) {
                tipsElement.textContent = "Tips:"+tips;
            }
        }
        


        function updateModalContent_download(modal, title, content,tips,updatetime) {
            var titleElement = modal.querySelector("h3");
            var contentElement = modal.querySelector("table");
            var tipsElement = modal.querySelector("#tips");
            var updateTimeElement = modal.querySelector("#update-time");

            if (titleElement) {
                titleElement.textContent = title;
            }
            if (contentElement) {
                contentElement.innerHTML = content;
                contentElement.addEventListener("click", function (e) {
                    const button = e.target.closest("[data-modal-action='open']");
                        var targetId = button.dataset.modalTarget;
                        var targetModal = document.getElementById(targetId);
                        if (targetModal) {
                        var action = button.dataset.modalAction;
                        var modalData = button.dataset.modalData; 

                        if (action === "open") {
                            openModal(targetModal,modalData);
                        } else if (action === "close") {
                            closeModal(targetModal);
                        }
                    }

                    window.onclick = function (event) {
                        modals.forEach(function(modal) {
                            if (event.target === modal) {
                                closeModal(modal);
                            }
                        });
                    };
                });
            }
            if (tipsElement) {
                tipsElement.textContent = "Tips:"+tips;
                // contentElement.textContent = content;
            }
            if (updateTimeElement) {
                updateTimeElement.textContent = "更新时间："+updatetime;
                // contentElement.textContent = content;
            }
        }


        // 监听模态框的关闭时事件
        modals.forEach(function(modal) {
            var closeButton = modal.querySelector(".close_buttonuse");
            if (closeButton) {
                closeButton.addEventListener("click", function() {
                    var targetModal = this.closest(".modal");
                    closeModal(targetModal);
                });
            }
        });

        // 当用户点击模态框外部时，关闭模态框
        window.onclick = function (event) {
            modals.forEach(function(modal) {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });
        };
