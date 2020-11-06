(function(w) {
    let TransferType = {
        url: 'url',
        base64: 'base64'
    };
    let PixivBtnType = {
        all: 0,
        split: 1
    };

    class TransferUI {


        constructor() {
            this.collectedFiles = [];
            this.artTitle = '';
            this.sendType = '';
            this.isFolder = false;
            this.hideResponseInterval = null;
        }
        setCollectedFiles(file) {
            this.collectedFiles = file
        }
        setSendType(type) {
            this.sendType = type
        }
        setArtTitle(title) {
            this.artTitle = title
        }
        setArtTitleFromDom() {
            this.artTitle = $("#artTitle").val();
        }
        setIsFolderFromDom() {
            this.isFolder = $('#isFolderSwitch').is(':checked')
        }
        uncheckIsFolder() {
            $('#isFolderSwitch').prop('checked', false);
        }

        setSelectedIndex(selectedIndex) {
            this.selectedIndex = selectedIndex
        }



        getRequestData() {
            let data = {};
            data.type = this.sendType;
            data.title = this.artTitle;
            data.isFolder = this.isFolder;
            data.referrer = window.location.href;
            data.files = this.collectedFiles;
            data.indexs = this.selectedIndex;
            let jsonData = JSON.stringify(data);

            return jsonData;
        }



        init() {
            let transferMenuOverlay = "<div id='transferMenuOverlay' class='myOverlay' ></div>";

            let transferMenuWindows = `<div id='transferMenuWindows'>
                                        <input type="text" id='artTitle' rows="1" wrap="soft"  onclick="this.focus();this.select()" />

                                        <ol id='fileNameList' class='mybreadcrumb scrollbar-default' ></ol>
                                        <div id='myPathList'></div>
                                        <hr class='myHR'>
                                        <div id='myRecentSets' class='scrollbar-default'></div>
                                        <hr class='myHR'>
                                        <div id='myActionBtn' class='GroupFloatRight'>
                                            
                                            <button type='button' id='myActionBtnCancel' class='mybtn mybtn-danger'>Cancel</button>
                                            <button type='button' id='myActionBtnOK' class='mybtn mybtn-success'>Send</button>
                                            <div class="custom-control custom-switch mySwitch">
                                              <input type="checkbox" class="custom-control-input" id="isFolderSwitch">
                                              <label class="custom-control-label" for="isFolderSwitch">Make Folder</label>
                                            </div>
                                        </div>      
                                    </div>`;

            let resultPopupWindows = "<div id='resultPopupWindows'></div>";

            $('body').eq(0).append(transferMenuOverlay);
            $('body').eq(0).append(transferMenuWindows);
            $('body').eq(0).append(resultPopupWindows);



            $('#transferMenuOverlay').hide();
            $('#transferMenuWindows').hide();
            $('#resultPopupWindows').hide();

            this.setData();
        }

        setData() {
            let cls = this;

            py_getDestPath(function(resp) {
                let zone = 1
                resp.pSets.forEach(function(item, index) {
                    name = item.name
                    if (name.indexOf("OtherZone") != -1) {
                        zone = parseInt(name.replace('OtherZone', ''));
                    } else {
                        var btnStyle = ''
                        switch (zone) {
                            case 1:
                                btnStyle = 'mybtn-primary';
                                break;
                            case 2:
                                btnStyle = 'mybtn-second';
                                break;
                            case 3:
                                btnStyle = 'mybtn-orange';
                                break;
                            case 4:
                                btnStyle = 'mybtn-purple';
                                break;
                        }


                        $("#myPathList").append(`<button type='button' index='${index}' class='mybtn ${btnStyle}'>${name}</button>`);

                    }

                })
                resp.pMarks.forEach(function(ele) {

                    var ol = document.createElement("ol");

                    ele.forEach(function(pathIndex) {
                        name = resp.pSets[pathIndex].name;
                        $(ol).append(`<li index='${pathIndex}'>${name}</li>`);

                    })

                    $("#myRecentSets").append(`<li class='mylist-group-item' >${ol.outerHTML}</li>`);

                });
                cls.setEvent();

            });

        }
        sendData() {
            let cls = this;
            if (cls.collectedFiles == null || cls.sendType == null || cls.selectedIndex == null) {
                return;
            }
            cls.beforeSendData().then(function() {
                cls.startSendData();
            })

        }
        beforeSendData() {
            let cls = this;
            cls.setArtTitleFromDom();
            cls.setIsFolderFromDom();


            return new Promise((resolve) => {
                switch (cls.sendType) {
                    case TransferType.base64:
                        let base64ImgFiles = []
                        let count = 0;
                        let max = cls.collectedFiles.length;
                        let assignFiles = function() {
                            base64ImgFiles.sort(function(a, b) {
                                return a.index - b.index;
                            })
                            cls.setCollectedFiles(base64ImgFiles)
                            resolve();

                        }
                        cls.collectedFiles.forEach(function(file, index) {

                            cls.getBase64Img({
                                file: file,
                                index: index
                            }, function(resp) {
                                var para = {};
                                para.name = resp.name;
                                para.url = resp.base64;
                                para.index = resp.index;
                                base64ImgFiles.push(para);
                                count++;
                                if (count >= max) {
                                    assignFiles()
                                }
                            })
                        });
                        break;
                    default:
                        resolve();
                        break;
                }

            });


        }
        startSendData() {
            let cls = this;
            py_sendData(cls.getRequestData(), function(response) {
                console.log(response)
                let resObj = response;
                cls.showResponseUI(resObj);

            })
        }

        getBase64Img(source, callback) {
            let cls = this;
            let file = source.file;
            fetch(file.url, {
                credentials: "include",
                referrer: window.location.href
            }).then(function(resp) {
                return resp.arrayBuffer()
            }).then(function(buffer) {
                console.log(buffer)
                callback({
                    base64: cls.arrayBufferToBase64(buffer),
                    name: file.name,
                    index: source.index
                });
            })

        }
        arrayBufferToBase64(buffer) {
            let bins = '';
            let bytes = new Uint8Array(buffer);
            bytes.forEach(b => bins += String.fromCharCode(b));
            return window.btoa(bins);
        };


        setEvent() {
            let cls = this;

            $("#myPathList > .mybtn").click(function() {
                $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
            }).dblclick(function() {
                let index = parseInt($(this).attr('index'));
                let data = {};
                data.index = index;
                py_openPathFolder(JSON.stringify(data));

            })
            $("#myRecentSets > .mylist-group-item").click(function() {
                var isHasClass = $(this).hasClass("active");
                $("#myRecentSets > .mylist-group-item.active").removeClass("active");

                if (!isHasClass)
                    $(this).addClass("active");

            });
            $("#myActionBtnOK").click(function() {
                if ($("#myPathList > .mybtn.active").length > 0 || $(".mylist-group-item.active").length > 0) {
                    cls.hideMenuUI();
                    //await new Promise(resolve => setTimeout(resolve, 5000));


                    var selectedBtns = $("#myPathList > .mybtn.active").map(function() {
                        return parseInt($(this).attr('index'));
                    }).toArray();

                    var selectedGroup = $(".mylist-group-item.active").eq(0).find('li').map(function() {
                        return parseInt($(this).attr("index"));
                    }).toArray();

                    var selectedIndex = selectedBtns.concat(selectedGroup).filter((v, i, a) => a.indexOf(v) === i);
                    cls.setSelectedIndex(selectedIndex);
                    cls.sendData();



                }
            });
            $("#myActionBtnCancel,#transferMenuOverlay").click(function() {
                cls.hideMenuUI();
            });
        }




        hideMenuUI() {
            $('#transferMenuWindows').hide();
            $('#transferMenuOverlay').hide();
        }

        showMenuUI() {
            if (this.collectedFiles.length > 0) {

                $("#fileNameList").empty();
                $("#myPathList > .mybtn.active").removeClass("active");
                $(".mylist-group-item.active").removeClass("active");
                this.uncheckIsFolder();

                this.collectedFiles.forEach(function(item) {
                    $("#fileNameList").append(`<li>${item.name}</li>`);

                })
                $("#artTitle").val(this.artTitle);
                $('#transferMenuWindows').show();
                $('#transferMenuOverlay').show();
            }
        }

        showResponseUI(resObj) {
            let statusTxt = (resObj.succeed == "true") ? `transfer to ${resObj.paths} success!` : `transfer fail!`;
            let resultTxt = `${resObj.names}<br/>${statusTxt}`;
            $('#resultPopupWindows').html(resultTxt).show();

            if (this.hideResponseInterval != null)
                clearTimeout(this.hideResponseInterval);
            this.hideResponseInterval = setTimeout(function() {
                $('#resultPopupWindows').hide()
            }, 5000);
        }

    }
    class UIobserve {
        constructor(query, option = { childList: true, subtree: true }) {
            this.query = query;
            this.option = option;
            this.observer = null;


        }
        start(targetCallback, obsCallback) {
            let cls = this;
            cls.getTarget(cls.query)
                .then(function(target) {
                    targetCallback(target);
                    cls.observing(target, obsCallback);

                });
        }
        getTarget(query) {
            let cls = this;
            return new Promise((resolve, reject) => {
                let target = $(query).get(0)
                if (target != null) {
                    resolve(target);
                }
                let timer = setInterval(function() {
                    if (target == null) {
                        target = $(query).get(0)

                    } else {
                        clearInterval(timer);
                        resolve(target);
                    }
                }, 20)
            });
        }
        observing(target, obsCallback) {
            let cls = this;
            cls.observeDOM(target, cls.option, function($node) {
                obsCallback($node)

            });

        }
        observeDOM(target, options, callback) {
            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    var newNodes = mutation.addedNodes;
                    if (newNodes !== null) {
                        callback($(newNodes));
                    }
                });
            });

            this.observer.observe(target, options);
        }


    }

    class ExtendUI {

        constructor(transferUI) {
            this.transferUI = transferUI;
            this.mainQuery = 'body';
            this.imgQuery = 'img';

            this.extendedImg = `extendedImg`
            this.extendedImgQuery = `.${this.extendedImg}`
            this.mybtn = `.mybtn`
            this.observeOpt = { childList: true, subtree: true }
        }
        init() {
            return new Promise(resolve => { resolve() })
        }


        update() {
            let cls = this;
            let obs = new UIobserve(cls.mainQuery, cls.observeOpt)
            obs.start(function() {
                cls.targetFunc()
            }, function($node) {
                cls.observeFunc($node)

            })


        }
        targetFunc() {
            let cls = this;
            cls.addDownloadBtn(cls.findContainer(cls.mainQuery));
        }
        observeFunc($node) {
            let cls = this;
            let $container = cls.findContainer($node)
            if ($container.length !== 0) {
                cls.addDownloadBtn($container);
            } else if ($node.is(cls.imgQuery) && !$node.hasClass(cls.extendedImg)) {
                cls.addDownloadBtn($node);
            }

        }
        findContainer(node) {
            let cls = this;
            return $(node).find($(cls.imgQuery)).not(cls.extendedImgQuery)

        }
        collectFile(img) {
            let para = {};
            let url = $(img).attr('src') || $(img).find('source').attr('src');

            para.url = url
            para.name = url.split('/').pop();

            return para;

        }


        addDownloadBtn($node) {
            let cls = this
            $node.addClass(cls.extendedImg).each(function() {
                let img = this
                $(img).mousedown(function(event) {
                    //right click
                    if (event.which == 3) {

                        let file = [cls.collectFile(img)]
                        cls.transferUI.setSendType(TransferType.base64)
                        cls.transferUI.setCollectedFiles(file)
                        cls.transferUI.showMenuUI();
                    }

                })


            })

        }
    }
    class PixivExtendUI extends ExtendUI {
        constructor(transferUI) {
            super(transferUI);
            this.mainQuery = `#root`;
            this.imgQuery = `main > section section:first,main > section div[role="presentation"] a img`
            this.subBtnContainerQuery = `div[role="presentation"]`
            this.removeInterruptUIQuery = `main > section div[role="presentation"] button:not(.mybtn)`
            this.mainBtn = '<button type="button" class="mybtn mybtn-warning pixiv-btn-adjust-all" >download</button>';
            this.subBtn = '<button type="button" style="float:right;" class="mybtn mybtn-warning pixiv-btn-adjust" >download</button>';

            this.imgData = []
            this.setCurrentUrl()



        }
        init() {
            let cls = this;
            return new Promise((resolve) => {
                cls.observeInterrupt()
                cls.getImgData().then(function() {
                    resolve();
                })

            })
        }


        observeInterrupt() {
            let cls = this;
            let obs = new UIobserve(cls.mainQuery)
            obs.start(function(target) {
                    $(target).find($(cls.removeInterruptUIQuery)).each(function() {
                        console.log('init remove interrupt ')
                        $(this).remove();
                    })
                },
                function($node) {
                    $node.find($(cls.removeInterruptUIQuery)).each(function() {
                        console.log('remove interrupt')
                        $(this).remove();
                    })
                })


        }
        setCurrentUrl() {
            this.currentUrl = document.URL
        }
        testCurrentUrl() {
            return this.currentUrl == document.URL
        }
        getImgData() {
            let cls = this;
            return new Promise((resolve) => {
                let illust_id = cls.currentUrl.split('/').pop();
                if (illust_id == null || isNaN(illust_id)) {
                    cls.imgData = []
                    console.log('no illust_id ' + illust_id)
                    resolve()
                } else {

                    fetch(`https://www.pixiv.net/ajax/illust/${illust_id}/pages`, {
                        credentials: "include",
                        referrer: window.location.href
                    }).then(function(resp) {
                        return resp.text()
                    }).then(function(text) {
                        cls.imgData = JSON.parse(text).body;
                        resolve()
                    });
                }
            })



        }
        collectFile(imgUrl) {
            let para = {}
            para.url = imgUrl
            para.name = imgUrl.split('/').pop();

            return para;

        }
        addDownloadBtn($node) {
            let cls = this
            $node.addClass(cls.extendedImg).each(async function() {
                let $btnContainer = $(this);
                let downloadBtn = cls.mainBtn;
                let type = PixivBtnType.all;

                //test fail then re get ImgData
                if (!cls.testCurrentUrl()) {
                    cls.setCurrentUrl()
                    await cls.getImgData()
                }

                if ($btnContainer.is('img') && cls.imgData.length > 1) {
                    $btnContainer = $(this).closest(cls.subBtnContainerQuery)
                    downloadBtn = cls.subBtn
                    type = PixivBtnType.split;
                }
                //avoid duplicate btn
                if ($btnContainer.children(cls.mybtn).length > 0) {
                    return
                }

                $(downloadBtn)
                    .appendTo($btnContainer)
                    .click(function() {
                        let file = []
                        switch (type) {
                            case PixivBtnType.all:
                                file = cls.imgData.map(ele => cls.collectFile(ele.urls.original));
                                break
                            case PixivBtnType.split:
                                let $btn = $(this)
                                let indexDom = $btn.closest(cls.subBtnContainerQuery).prev()
                                let index = parseInt(indexDom.attr('id')) - 1;
                                let ele = cls.imgData[index]
                                file = [cls.collectFile(ele.urls.original)]
                                break

                        }
                        cls.transferUI.setArtTitle($('figcaption h1').html());
                        cls.transferUI.setSendType(TransferType.url)
                        cls.transferUI.setCollectedFiles(file)
                        cls.transferUI.showMenuUI();


                    })

            })


        }

    }


    class TwitterExtendUI extends ExtendUI {


        constructor(transferUI) {
            super(transferUI);
            this.mainQuery = `#react-root`;
            this.imgQuery = `article > div div[data-testid='tweet'] ,
                                ul[role="list"]>li[role="listitem"]`;
            this.tweetActionListQuery = `div[role='group']`;
            this.tweetParentsQuery = `article`;
            this.imgIndexQuery = `a[role='link']`;

            this.subBtn = `<div style="float:right;text-align:right" class="ProfileTweet-action">
                                    <button type="button"  class="mybtn mybtn-warning twitter-btn-adjust" >download</button>
                                </div>`;
            this.mainBtn = `<button type="button"  class="mybtn mybtn-warning multipic-twitter-btn-adjust" >download</button>`;
        }

        collectFile(img) {
            let para = {};
            let oriUrl = $(img).attr('src') || $(img).find('source').attr('src');
            let u = new URL(oriUrl);
            let format = u.searchParams.get("format");
            let url = oriUrl.match(/^[^?]+/)[0] + "." + format;

            para.url = url + ":orig"
            para.name = url.split('/').pop();

            return para;

        }
        findContainer(node) {
            let cls = this;
            let $matches = $(node).find($(cls.imgQuery)).not(cls.extendedImgQuery)

            if ($matches.attr("data-testid")) {
                return $matches.filter(function() {

                    return $(this).find('> div').last().find('> div').last().find('> div').eq(1).children().length != 0
                })

            } else {
                return $matches
            }


        }

        addDownloadBtn($node) {
            let cls = this;

            $node.addClass(cls.extendedImg)
                .each(function() {
                    var $mediaOuterContainer = $(this);
                    var $parents = $mediaOuterContainer.closest(cls.tweetParentsQuery);
                    var downloadBtnContainer = $parents.find(cls.tweetActionListQuery)

                    var downloadBtn = cls.subBtn
                    //mutiple picture pick one
                    if ($mediaOuterContainer.attr('role') == "listitem") {
                        downloadBtnContainer = $mediaOuterContainer;
                        downloadBtn = cls.mainBtn;
                    }
                    $(downloadBtn)
                        .appendTo(downloadBtnContainer)
                        .click(function() {

                            let $imgQuery = $(this).closest(cls.tweetParentsQuery).find(cls.extendedImgQuery);
                            console.log($imgQuery)
                            //mutiple picture pick one
                            if ($(this).parents(cls.extendedImgQuery).length != 0) {
                                $imgQuery = $(this).closest(cls.extendedImgQuery);

                            }
                            let $imgs = $imgQuery.find('div > img[draggable="true"]')
                            $imgs = $imgs.filter(function() {
                                return !$(this).attr('src').includes("_bigger")
                            })

                            //sort by img herf index
                            if ($imgs.length > 1) {
                                $imgs.each(function() {
                                    console.log($(this).closest(cls.imgIndexQuery))
                                    let index = $(this).closest(cls.imgIndexQuery).attr('href').split('/').pop()
                                    $(this).attr('index', index)
                                })

                                $imgs.sort(function(a, b) {
                                    let aIndex = parseInt($(a).attr('index'))
                                    let bIndex = parseInt($(b).attr('index'))
                                    return aIndex - bIndex
                                })
                            }


                            let file = $imgs.map(function() {
                                return cls.collectFile(this)
                            }).toArray();
                            cls.transferUI.setSendType(TransferType.url)
                            cls.transferUI.setCollectedFiles(file)
                            cls.transferUI.showMenuUI();

                        });
                });
        }
    }
    let transferUI = null;
    w.downloadMedias = function(file) {
        transferUI.setSendType(TransferType.url)
        transferUI.setCollectedFiles(file)
        transferUI.showMenuUI();
    }

    let main = function() {
        let hostname = window.location.hostname;
        transferUI = new TransferUI();
        let extendUI = null;
        transferUI.init();
        switch (hostname) {
            case "twitter.com":
            case "mobile.twitter.com":
                extendUI = new TwitterExtendUI(transferUI);
                break;
            case "www.pixiv.net":

                extendUI = new PixivExtendUI(transferUI);
                break;
            default:
                extendUI = new ExtendUI(transferUI);
                break;
        }
        extendUI.init().then(function() {

            extendUI.update()
        })

    }()
})(window);