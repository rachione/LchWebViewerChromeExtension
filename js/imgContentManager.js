"use strict";
let imgContentManager = {

    imgContent: {
        imgDataSet: [],
        imgSize: {
            border: 3,
            w: 50,
            h: 50

        },
        statusEnum: {
            NORMAL: 0,
            LIKED: 1,
            RETWEETED: 2,
            LIKEDADDRETWEETED: 3,
            CLICKED: 4
        },
        largeMediaData: {
            id: "testImg",
            canvas: null,
            ctx: null
        },
        containerData: {
            id: "pictureSearchCanvasContainer",
            minCol: 10,
            w: 0,
            h: 0
        },
        canvasData: {
            id: "pictureSearchCanvas",
            canvas: null,
            ctx: null,
            col: 200,
            row: 10,
            w: 0,
            h: 0,
            max: 0
        },

        canvasManager: {
            init: function () {
                imgContentManager.initTemperate(this);
                this.canvasInit()
                this.canvasAdjust()
            },
            canvasInit: function () {
                let canvasData = this.parent.canvasData;
                let largeMediaData = this.parent.largeMediaData;

                canvasData.canvas = document.getElementById(canvasData.id);
                canvasData.ctx = canvasData.canvas.getContext("2d");
                /*
                                largeMediaData.canvas = document.getElementById(largeMediaData.id);
                                largeMediaData.ctx = largeMediaData.canvas.getContext("2d");*/

            },
            canvasAdjust: function () {
                let canvasData = this.parent.canvasData;
                let containerData = this.parent.containerData;
                let imgSize = this.parent.imgSize;
                canvasData.w = imgSize.border + (imgSize.border + imgSize.w) * canvasData.row
                canvasData.h = imgSize.border + (imgSize.border + imgSize.h) * canvasData.col
                canvasData.max = canvasData.col * canvasData.row

                containerData.w = canvasData.w
                containerData.h = imgSize.border + (imgSize.border + imgSize.h) * containerData.minCol

                //extend

                $('#pictureSearchMain').css({
                    width: canvasData.w + 6,
                    height: containerData.h
                })
                $('#pictureSearchContainer').css({
                    width: canvasData.w + 6,
                    height: containerData.h
                })

                $('#displayPictureWindows').css({
                    left: $("#pictureSearchWindows").width() + 5
                })


                $("#" + canvasData.id).attr({
                    width: canvasData.w,
                    height: canvasData.h
                }).css({
                    cursor: "pointer",
                })
                $("#" + containerData.id).css({
                    overflow: "hidden",
                    width: containerData.w,
                    height: containerData.h

                })
            }
        },
        eventManager: {
            eventData: {
                isClicked: false,
                showedId: -1,
                clickedId: -1,
                mousemovedIndex: -1,
                clickInit: function () {
                    this.isClicked = false
                    this.clickedId = -1
                },
                mousemoveInit: function () {
                    this.showedId = -1
                    this.mousemovedIndex = -1
                }
            },
            init: function () {
                imgContentManager.initTemperate(this);
            },
            handleEvents: function () {
                let canvasData = this.parent.canvasData;
                $("#" + canvasData.id).on('mousemove', { self: this }, this.mousemove)
                $("#" + canvasData.id).on('mouseleave', { self: this }, this.mouseleave)
                $("#" + canvasData.id).on('click', { self: this }, this.click)
            },
            contentDetect: function (e, element, callback) {
                let imgSize = this.parent.imgSize
                let parentOffset = $(element).offset();
                let xPosition = e.pageX - parentOffset.left;
                let yPosition = e.pageY - parentOffset.top;

                let row = Math.max(0, Math.floor((xPosition - imgSize.border) / (imgSize.w + imgSize.border)))
                let col = Math.max(0, Math.floor((yPosition - imgSize.border) / (imgSize.h + imgSize.border)))
                let index = row + col * this.parent.canvasData.row;

                if (index >= this.parent.imgDataSet.length) {
                    callback(-1);
                    return;
                } else {
                    callback(index);
                    return;
                }
            },
            getClickedItem: function () {
                let eventData = this.eventData
                return this.parent.imgDataSet.find(function (e) {
                    return e.id == eventData.clickedId;
                });
            },
            click: function (e) {
                let self = e.data.self;
                let eventData = self.eventData


                self.contentDetect(e, this, function (index) {
                    if (index == -1) return;

                    let preContent = self.getClickedItem();
                    let preContentIndex = -1;
                    preContentIndex = self.parent.imgDataSet.indexOf(preContent);

                    let content = self.parent.imgDataSet[index]

                    if (eventData.showedId != content.id)
                        self.funcMgr.largeMedia.draw(index)


                    if (eventData.clickedId == content.id) {
                        if (content.status.isClicked()) {
                            eventData.showedId = -1
                            content.status.backtrace()
                        }
                        else {
                            eventData.showedId = content.id
                            content.status.clicked()
                        }
                        eventData.isClicked = !eventData.isClicked;
                    }
                    else {
                        if (preContent != null) {
                            preContent.status.backtrace()
                        }
                        content.status.clicked()


                        eventData.isClicked = true;
                        eventData.showedId = content.id
                        eventData.clickedId = content.id
                    }

                    eventData.mousemovedIndex = index;


                    if (preContentIndex != -1) {
                        self.funcMgr.imgCell.drawAll(preContentIndex)
                    }
                    self.funcMgr.imgCell.drawAll(index)
                });
            },
            mousemove: function (e) {

                let self = e.data.self;
                let eventData = self.eventData

                if (eventData.isClicked) return;
                self.contentDetect(e, this, function (index) {
                    if (index == -1) {
                        eventData.mousemoveInit();
                        self.funcMgr.largeMedia.clear();
                        return;
                    }
                    if (index == eventData.mousemovedIndex) return
                    eventData.mousemovedIndex = index;
                    let content = self.parent.imgDataSet[index]
                    self.funcMgr.largeMedia.draw(index)

                    eventData.showedId = content.id
                })
            },
            mouseleave: function (e) {

                let self = e.data.self;
                let eventData = self.eventData

                if (eventData.isClicked) return;
                eventData.mousemoveInit();
                self.funcMgr.largeMedia.clear()
            }

        },
        functionManager: {
            init: function () {
                imgContentManager.initTemperate(this);
                this.imgCell.init(this);
                this.imgDataStatus.init(this);
                this.imgData.init(this);
                this.largeMedia.init(this);
            },
            useless: {
                getBlob: function (img, callback) {
                    let canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(callback);

                },
                getBase64Image: function (img) {
                    let canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    let dataUrl = canvas.toDataURL();
                    canvas = null;

                    return dataUrl
                },
            },
            imgCell: {
                idCounter: 0,
                init: function (_this) {
                    Object.assign(this, _this);
                },
                onload: function (imgSrc, callback) {
                    let img = new Image()


                    img.crossOrigin = 'anonymous';
                    img.src = imgSrc
                    img.onload = function () {
                        callback(img)
                    }
                    img.onerror = function () {
                        callback(null)
                    }
                },
                onloadEachimg: async function (tweet, callback) {
                    let self = this;
                    let imgObjects = [];
                    let avatarObject = null;
                    if (tweet.imgUrl_Base64 != null) {
                        for (var i = 0; i < tweet.imgUrl_Base64.length; i++) {
                            await new Promise(resolve => {
                                var imgUrlBase64 = "data:image/wepb;base64," + tweet.imgUrl_Base64[i]
                                self.onload(imgUrlBase64, function (imgOb) {
                                    imgObjects[i] = imgOb
                                    resolve();
                                })
                            });
                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                    }

                    await new Promise(resolve => {
                        var avatarBase64 = "data:image/wepb;base64," + tweet.avatar_Base64
                        self.onload(avatarBase64, function (imgOb) {
                            avatarObject = imgOb
                            resolve();
                        })
                    });

                    tweet.imgOb = imgObjects;
                    tweet.avatarimgOb = avatarObject;
                    //use this id to connect allTweetCollects
                    tweet.id = self.idCounter++;


                    callback({
                        tweet: tweet
                    })

                },
                drawFavoriteNum: function (ImgDataSet, imgX, imgY) {
                    let canvasData = this.parent.canvasData;
                    let imgSize = this.parent.imgSize;
                    let Favorite = ImgDataSet.tweet.favoriteCount
                    let ctx = canvasData.ctx;
                    let DisplayTest = ""
                    if (Favorite < 10) return

                    if (Favorite >= 1000) {
                        DisplayTest = "1000⮝"

                    } else if (Favorite >= 500) {
                        DisplayTest = "500⮝"

                    } else if (Favorite >= 200) {
                        DisplayTest = "200⮝"

                    } else if (Favorite >= 100) {
                        DisplayTest = "100⮝"

                    } else if (Favorite >= 50) {
                        DisplayTest = "50⮝"

                    } else if (Favorite >= 20) {
                        DisplayTest = "20⮝"

                    } else if (Favorite >= 10) {
                        DisplayTest = "10⮝"

                    }

                    let mainColor = "rgb(255, 0, 72)";



                    ctx.font = "bold 16px Arial";
                    ctx.fillStyle = mainColor;
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 3;
                    ctx.textAlign = "center";
                    ctx.strokeText(DisplayTest, imgX + imgSize.w / 2, imgY + 10);
                    ctx.fillText(DisplayTest, imgX + imgSize.w / 2, imgY + 10);

/*
                    var lineWidth = 3
                    ctx.beginPath();
                    ctx.strokeStyle = mainColor;
                    ctx.lineWidth = lineWidth;
                    ctx.rect(imgX + lineWidth / 2, imgY + lineWidth / 2, imgSize.w + lineWidth, imgSize.h + lineWidth);
                    ctx.stroke();*/





                },
                drawHighlightProc: function (ImgDataSet, imgX, imgY) {
                    let statusEnum = this.parent.statusEnum;
                    switch (ImgDataSet.status.get()) {
                        case statusEnum.LIKED:
                            this.drawHighlight({
                                imgX: imgX,
                                imgY: imgY,
                                color: "rgb(224, 36, 94)"
                            })
                            break;
                        case statusEnum.RETWEETED:
                            this.drawHighlight({
                                imgX: imgX,
                                imgY: imgY,
                                color: "rgb(23, 191, 99)"
                            })
                            break;
                        case statusEnum.LIKEDADDRETWEETED:
                            this.drawHighlight({
                                imgX: imgX,
                                imgY: imgY,
                                color: "rgb(224, 36, 94)",
                                color2: "rgb(23, 191, 99)"
                            })
                            break;
                        case statusEnum.CLICKED:
                            this.drawHighlight({
                                imgX: imgX,
                                imgY: imgY,
                                color: "rgb(2, 117, 216)"
                            })
                            break;
                    }
                },
                drawHighlight: function (para) {
                    let canvasData = this.parent.canvasData;
                    let imgSize = this.parent.imgSize;

                    canvasData.ctx.globalAlpha = 0.4
                    if (para.color2 != null) {
                        var grd = canvasData.ctx.createLinearGradient(para.imgX, para.imgY, para.imgX + imgSize.w, para.imgY);
                        grd.addColorStop(0.45, para.color);
                        grd.addColorStop(0.55, para.color2);
                        canvasData.ctx.fillStyle = grd;
                    }
                    else {
                        canvasData.ctx.fillStyle = para.color;
                    }
                    canvasData.ctx.fillRect(para.imgX, para.imgY, imgSize.w, imgSize.h);
                    canvasData.ctx.globalAlpha = 1

                    let lineWidth = 3;
                    canvasData.ctx.beginPath();

                    canvasData.ctx.lineWidth = lineWidth;
                    if (para.color2 != null) {
                        var grd = canvasData.ctx.createLinearGradient(para.imgX, para.imgY, para.imgX + imgSize.w, para.imgY);
                        grd.addColorStop(0.45, para.color);

                        grd.addColorStop(0.55, para.color2);
                        canvasData.ctx.strokeStyle = grd;
                    }
                    else {
                        canvasData.ctx.strokeStyle = para.color;
                    }
                    canvasData.ctx.rect(para.imgX + lineWidth / 2, para.imgY + lineWidth / 2, imgSize.w - lineWidth, imgSize.h - lineWidth);
                    canvasData.ctx.stroke();
                },
                drawAll: function (index) {


                    let canvasData = this.parent.canvasData;
                    let imgDataSet = this.parent.imgDataSet;
                    let imgSize = this.parent.imgSize;

                    let containerData = this.parent.containerData;

                    let imgX = this.parent.imgSize.border
                    let imgY = this.parent.imgSize.border

                    let tempImgDataSet = imgDataSet.slice();
                    if (index == null) {
                        for (var i = 0; i < tempImgDataSet.length; i++) {
                            canvasData.ctx.drawImage(tempImgDataSet[i].tweet.imgOb[0], imgX, imgY, imgSize.w, imgSize.h);
                            this.drawHighlightProc(tempImgDataSet[i], imgX, imgY)
                            this.drawFavoriteNum(tempImgDataSet[i], imgX, imgY)

                            imgX += imgSize.w + imgSize.border
                            if (imgX >= canvasData.w) {
                                imgX = imgSize.border
                                imgY += imgSize.h + imgSize.border
                            }
                        }
                    } else {
                        let row = this.parent.canvasData.row;
                        imgX += (index % row) * (imgSize.w + imgSize.border)
                        imgY += Math.floor(index / row) * (imgSize.h + imgSize.border)

                        canvasData.ctx.drawImage(tempImgDataSet[index].tweet.imgOb[0], imgX, imgY, imgSize.w, imgSize.h);
                        this.drawHighlightProc(tempImgDataSet[index], imgX, imgY)
                        this.drawFavoriteNum(tempImgDataSet[index], imgX, imgY)

                        return;
                    }

                    let currentH = imgSize.border + Math.ceil(imgDataSet.length / canvasData.row) * (imgSize.h + imgSize.border)
                    if (currentH > containerData.h) {
                        containerData.h = currentH
                        $("#" + containerData.id).css({ height: containerData.h })
                    }
                },

                append: function (tweet, callback) {
                    let self = this
                    this.onloadEachimg(tweet, function (para) {
                        if (para.tweet.imgOb[0] == null) {
                            console.log("error")
                            callback()
                            return;
                        }
                        self.group.imgData.unshift(para);
                        //self.drawAll()
                        callback()
                    })

                }
            },
            imgDataStatus: {
                init: function (_this) {
                    Object.assign(this, _this);
                    this.set(this.parent.statusEnum.NORMAL, true);
                },
                get: function () {
                    return this.val;
                },
                set: function (val, isSetOrigin, isSetSurface) {
                    if (isSetSurface == null) isSetSurface = true
                    if (isSetOrigin) {
                        this.oriVal = val
                    }
                    if (isSetSurface) {
                        this.val = val
                    }
                },
                Retweeted: function () {
                    this.set(this.parent.statusEnum.RETWEETED, true);
                },
                liked: function () {
                    this.set(this.parent.statusEnum.LIKED, true);
                },
                likedAndRetweeted: function () {
                    this.set(this.parent.statusEnum.LIKEDADDRETWEETED, true);
                },
                clicked: function () {
                    this.set(this.parent.statusEnum.CLICKED);
                },
                isClicked: function () {
                    return this.val == this.parent.statusEnum.CLICKED
                },
                backtrace: function () {
                    this.val = this.oriVal
                }
            },
            imgData: {
                idCounter: 0,
                init: function (_this) {
                    Object.assign(this, _this);
                },
                removeByUser: function (tweet) {
                    let imgDataSet = this.parent.imgDataSet;
                    let muteImgDatas = imgDataSet.filter(function (e) {
                        return e.tweet.userId == tweet.userId;
                    });
                    for (var i = 0; i < muteImgDatas.length; i++) {
                        let index = imgDataSet.indexOf(muteImgDatas[i]);
                        this.remove(index, false);

                    }

                },
                remove: function (index, isdraw) {
                    let imgDataSet = this.parent.imgDataSet;
                    imgDataSet[index].img = null;
                    if (imgDataSet[index].status.isClicked()) {
                        this.group.largeMedia.hide()
                    }
                    imgDataSet.splice(index, 1);
                    if (isdraw) {
                        this.group.imgCell.drawAll();
                    }

                },
                unshift: function (para) {
                    let imgDataSet = this.parent.imgDataSet;
                    let imgSize = this.parent.imgSize;
                    let canvasData = this.parent.canvasData;


                    para.status = {};
                    para.id = this.idCounter++;
                    Object.assign(para.status, this.group.imgDataStatus);
                    this.defineStatus(para, true)



                    imgDataSet.unshift(para);
                    if (imgDataSet.length > canvasData.max) {
                        this.remove(imgDataSet.length - 1);
                    }
                },
                defineStatus: function (para, isSetOrigin, isSetSurface) {
                    if (isSetSurface == null) isSetSurface = true;
                    if (para.tweet.isRetweet && para.tweet.isFavorite) {
                        para.status.set(this.parent.statusEnum.LIKEDADDRETWEETED, isSetOrigin, isSetSurface);
                    }
                    else if (para.tweet.isRetweet) {
                        para.status.set(this.parent.statusEnum.RETWEETED, isSetOrigin, isSetSurface);
                    }
                    else if (para.tweet.isFavorite) {
                        para.status.set(this.parent.statusEnum.LIKED, isSetOrigin, isSetSurface);
                    }
                },
                changeStatus: function (tweet) {
                    let imgData = this.parent.imgDataSet.find(function (e) {
                        return e.tweet.tweetId == tweet.tweetId;
                    });
                    imgData.tweet = tweet;
                    this.defineStatus(imgData, true, false)

                }
            },
            largeMedia: {
                init: function (_this) {
                    Object.assign(this, _this);
                },/*
                draw: function (index) {
                    let largeMediaData = this.parent.largeMediaData;
                    if (index == -1) {
                        largeMediaData.ctx.clearRect(0, 0, largeMediaData.canvas.width, largeMediaData.canvas.height);
                        return;
                    }
                    let content = this.parent.imgDataSet[index]

                    $("#" + largeMediaData.id).attr({
                        width: content.img.width,
                        height: content.img.height
                    })
                    largeMediaData.ctx.drawImage(content.img, 0, 0, content.img.width, content.img.height);
                }, */
                draw: function (index) {
                    if (index == -1) {
                        pictureSearch.displayPictureHide();
                        return;
                    }
                    let content = this.parent.imgDataSet[index]
                    pictureSearch.displayPictureShow(content.tweet);
                },

                clear: function () {
                    this.draw(-1)
                },
                hide: function () {
                    this.evtMgr.eventData.clickInit();
                    this.clear();
                }
            }


        },

        init: function () {
            this.canvasManager.init();
            this.functionManager.init();
            this.eventManager.init();
        },

        append: function (tweet, callback) {
            this.functionManager.imgCell.append(tweet, callback);
        },


    },


    init: function () {

        this.imgContent.init();
    },

    append: function (tweet, callback) {
        this.imgContent.append(tweet, callback);
    },
    allReady: function () {
        this.imgContent.eventManager.handleEvents();
        this.drawAll();
    },
    drawAll: function () {
        this.imgContent.functionManager.imgCell.drawAll();
    },
    initTemperate: function (self) {
        self.group = self
        self.parent = this.imgContent;
        self.funcMgr = this.imgContent.functionManager;
        self.evtMgr = this.imgContent.eventManager;
    },
    imgDataChangeStatus: function (tweet) {
        this.imgContent.functionManager.imgData.changeStatus(tweet);
        //this.drawAll();
    },
    mute: function (tweet) {
        this.imgContent.functionManager.imgData.removeByUser(tweet);
        this.drawAll();
    },
    largeMediaHide: function () {
        let content = this.imgContent.eventManager.getClickedItem();
        content.status.backtrace()
        this.drawAll();
        this.imgContent.functionManager.largeMedia.hide();
    },
    getimgDataSet: function () {
        return this.imgContent.imgDataSet;
    }

}



//imgContentManager.append(imgSrcs[randIndex])



