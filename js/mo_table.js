        // 获取触发模态框的自定义属性
        var modalButtons = document.querySelectorAll("[data-modal-action]");

        // 获取模态框主体
        var modals = document.querySelectorAll(".modal");

        // 监听模态框的按钮事件
        modalButtons.forEach(function(button) {
            button.addEventListener("click", function() {
                var targetId = this.dataset.modalTarget;
                var targetModal = document.getElementById(targetId);

                if (targetModal) {
                    var action = this.dataset.modalAction;
                    var modalData = this.dataset.modalData; // 获取自定义数据属性

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
            const tip = await fetchData("./viewpoint/json/CARD_Shouhou_Tips.json");
            const tips = check_Tips(tip,modalData)
            const timelist = await fetchData("./viewpoint/json/CARD_Shouhou_Latest_time.json")
            const updatetime = check_Times(timelist,modalData)

                if(modalData==="in_GetCard_Buy"){
                    //修改模态框中的相关内容
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_GETCard_BUY.json");
                    var title = "卡密购买"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_GetCard_Get"){
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_GETCard_URL.json");
                    var title = "卡密提取"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_AfterCard_QQgroup"){
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_AfterCard_QQGroup.json");
                    var title = "加入售后群"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_Download"){
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_StartDownload_URL.json");
                    var title = "辅助下载"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_FansClub"){
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_FansClub.json");
                    var title = "加入辉夜粉丝群（非售后群）"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }else if(modalData==="in_WechatLinks"){
                    const json_data = await fetchData("./viewpoint/json/CARD_Shouhou_WechatLinks.json");
                    var title = "关注辉夜公众号"
                    updateModalContent(modal, title, getCarddatahandle(modal, json_data),tips,updatetime)
                }
            })();
        }

        // 关闭模态框
        function closeModal(modal) {
            modal.querySelector(".modal-content").classList.add("modal-hide");
            modal.querySelector(".modal-content").addEventListener("animationend", function () {
                modal.style.display = "none";
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

        function getCarddatahandle(modal, data){
            //测试获取到的标签id和异步获取到的json
            //获取完整的标识符key
            //标记组成tr的部分
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
                                                "<a href='" + data[i][part] + "' target='_blank'>"+
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

            
                if(data[i][part][k]===null || part==="button_color"){
                    continue;
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

    //      function getCarddatahandle(modal, data){
    //         console.log(modal,data);
    //         //测试获取到的标签id和异步获取到的json
    //         //获取完整的标识符key
    //         //标记组成tr的部分
    //         var content = "";
    //         var data_key = Object.keys(data[0]);
    //         var data_keyFirst = Object.keys(data[0])[0];
            
    // for (var i = 0; i < data.length; i++) {
    //     // 第一列rowspan
    //     var arrLength = data[i][data_key[1]].length;
    //     for (var k = 0; k < arrLength; k++) {
    //         content += "<tr>";
    //         if (k === 0) {
    //             content += "<td rowspan='" + arrLength + "' style='border:1px solid #000;'>" + data[i][data_keyFirst] + "</td>";
    //         }
    //         // 其余字段同一行显示同一索引内容
    //         for (var j = 1; j < data_key.length; j++) {
    //             var part = data_key[j];
    //             console.log(data[i][part][k])
    //             if(data[i][part][k]===null){
    //                 continue;
    //             }
    //             content += "<td rowspan='" + pd_null(data[i][part],k) + "'style='border:1px solid #000;'>" + data[i][part][k] + "</td>";
    //         }
    //         content += "</tr>";
    //     }
    // }
    // return content;

    //     }

        function pd_null(data, inround) {
            let count = 0;
            for (let i = inround + 1; i < data.length && data[i] === null; i++) {
                count++;
            }
            return count + 1; // 最终返回时多算1
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
                // contentElement.textContent = content;
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
            var closeButton = modal.querySelector(".close");
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