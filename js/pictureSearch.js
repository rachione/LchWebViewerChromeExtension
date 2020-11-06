let pictureSearch = {
    /*
    query: {
    	tweets: ".js-stream-item",
    	tweetText: ".js-tweet-text",
    	user: ".account-group  .username b",
    	fullname: ".FullNameGroup  .fullname",
    	description: ".content .js-tweet-text-container .js-tweet-text",
    	avatar: ".avatar",
    	userLink: ".stream-item-header a.js-user-profile-link",
    	tweetLink: ".twitter-timeline-link.u-hidden",
    	imgContent: "div[class='css-1dbjc4n r-1udh08x']",
    	retweetCount: '.ProfileTweet-action--retweet .ProfileTweet-actionCountForPresentation',
    	favoriteCount: '.ProfileTweet-action--favorite .ProfileTweet-actionCountForPresentation',
    	isFavorite: '.js-stream-tweet.favorited',
    	isRetweet: '.js-stream-tweet.retweeted',

    	userId: "data-user-id",
    	tweetId: "data-item-id",


    },*/
    glyphicon: {
        favorite: `<path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>`,
        retweet: `<path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>`,
        close: `<path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>`,
        setting: `<path d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"></path><path d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"></path>`,
        add: ``
    },
    content: {
        CONST: {
            staticHost: "118.167.109.194",
            port: "7265",
            apiPort: "7266",
            authenticationPassword: "xmldxmld"
        },
        myHost: {
            host: "",
            set: function(_val) {
                this.host = _val;
            },
            getHost: function() {
                return `http://${this.host}:${pictureSearch.content.CONST.port}`;
            },
            getAPIHost: function() {
                return `http://${this.host}:${pictureSearch.content.CONST.apiPort}`;
            }
        },
        canSaveTempTweets: {
            val: false,
            set: function(_val) {
                this.val = _val;
            },
            get: function() {
                return this.val;
            }
        },
        allTweetCollects: [],
        clientIdentification: "",
        baseTool: {
            init: function() {
                pictureSearch.initTemperate(this)
            },
            makeImgBlob: function(imgUrl) {

                var def = $.Deferred();
                this.searchFetch({
                    url: imgUrl,
                    responseType: 'blob'
                }).then(function({
                    response: blob
                }) {

                    var objectURL = URL.createObjectURL(blob);
                    def.resolve(objectURL);
                });
                return def.promise();
            },
            searchFetch: function(para) {
                var url = para.url;
                var memo = para.memo == null ? null : para.memo;
                var responseType = para.responseType;
                var def = $.Deferred();

                var urlObject = new URL(url, window.location.href);

                fetch(urlObject, {
                    credentials: "include",
                    referrer: window.location.href
                }).then(function(response) {
                    if (responseType == 'arrayBuffer') {
                        return response.arrayBuffer();
                    } else if (responseType == 'blob') {
                        return response.blob();
                    } else {
                        return response.text();
                    }

                }).then(function(response) {

                    def.resolve({
                        response: response,
                        url: url,
                        memo: memo
                    })

                }).catch(function(error) {
                    def.resolve({
                        response: null,
                        url: url,
                        memo: memo
                    })
                });
                return def.promise();

            },
            addAuthenticationPassword: function(ob) {
                ob.authentication = this.const.authenticationPassword;
                return ob;
            },
            asyncForEach: async function(array, callback) {
                for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array)
                }
            },
            clone: function(obj) {
                if (null == obj || "object" != typeof obj)
                    return obj;
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr))
                        copy[attr] = obj[attr];
                }
                return copy;
            },
            distinct: function(fieldNames) {
                var self = this;
                return function(item, i, arr) {
                    return i == indexOf(arr, item, equalsAllFields)
                }

                function indexOf(arr, obj, comparator) {
                    for (var index in arr) {
                        if (comparator(obj, arr[index]) == true)
                            return index;
                    }
                    return -1;
                }

                function equalsAllFields(a, b) {
                    for (var i in fieldNames) {
                        var f = fieldNames[i];
                        if (a[f] !== b[f])
                            return false;
                    }
                    return true;
                }
            }
        },
        jqueryExtent: {
            addMemoEvent: function() {
                $(this).click(function(event) {
                    if (event.target.className == "deleteMemo")
                        return;
                    var $this = $(this).find('.content');
                    if ($this.find("input").length > 0)
                        return;
                    var originMemo = $this.html();
                    var originWidth = $this.width();
                    $this.html(`<input type="text" value="">`);
                    $this.find('input')
                        .val(originMemo)
                        .width(originWidth)
                        .focus()
                        .focusout(function() {
                            var newMemo = $(this).val();
                            var $parents = $(this).parent();
                            $parents.html('' + newMemo);
                        });
                });
                $(this).find('.deleteMemo').click(function() {

                    var $memo = $(this).parent('li.memo');
                    $memo.remove();
                });

                return $(this);
            }
        },
        twitterAPI: {
            init: function() {
                pictureSearch.initTemperate(this)
            },
            createFavorite: function(tweetId) {
                let self = this;
                var data = {
                    id: String(tweetId)
                }
                data = this.baseTool.addAuthenticationPassword(data);
                data = JSON.stringify(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getAPIHost()}/createFavorite`,
                    data: data
                }, function(responseText) {
                    resObj = JSON.parse(responseText);
                    def.resolve(resObj);

                });
                return def.promise();
            },
            destroyFavorite: function(tweetId) {
                let self = this;
                var data = {
                    id: String(tweetId)
                }
                data = this.baseTool.addAuthenticationPassword(data);
                data = JSON.stringify(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getAPIHost()}/destroyFavorite`,
                    data: data
                }, function(responseText) {
                    resObj = JSON.parse(responseText);
                    def.resolve(resObj);

                });
                return def.promise();
            },

            retweet: function(tweetId) {
                let self = this;
                var data = {
                    id: String(tweetId)
                }
                data = this.baseTool.addAuthenticationPassword(data);
                data = JSON.stringify(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getAPIHost()}/retweet`,
                    data: data
                }, function(responseText) {
                    resObj = JSON.parse(responseText);
                    def.resolve(resObj);

                });
                return def.promise();
            },
            searchTweet: function(keyword, since_id, max_id, searchCount) {

                let self = this;
                var data = {
                    'count': String(searchCount),
                    'q': keyword,
                    'result_type': 'mixed',
                    'tweet_mode': 'extended'
                }

                if (since_id != null && since_id != 0) {
                    data.since_id = String(since_id);
                }
                if (max_id != null && max_id != 0) {
                    data.max_id = String(max_id);
                }



                //data = this.baseTool.addAuthenticationPassword(data);
                var jsonData = JSON.stringify(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getAPIHost()}/searchTweet`,
                    data: jsonData
                }, function(responseText) {
                    let resObj = JSON.parse(responseText);

                    def.resolve(resObj);

                });
                return def.promise();

            },


            unretweet: function(tweetId) {
                let self = this;
                var data = {
                    id: String(tweetId)
                }
                data = this.baseTool.addAuthenticationPassword(data);
                data = JSON.stringify(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getAPIHost()}/unretweet`,
                    data: data
                }, function(responseText) {
                    resObj = JSON.parse(responseText);
                    def.resolve(resObj);

                });
                return def.promise();

            },
            mute: function(userId) {
                let self = this;
                var data = {
                    user_id: String(userId)
                }
                data = this.baseTool.addAuthenticationPassword(data);
                data = JSON.stringify(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getAPIHost()}/mute`,
                    data: data
                }, function(responseText) {
                    resObj = JSON.parse(responseText);
                    def.resolve(resObj);

                });
                return def.promise();

            },
            usersShow: function(userId) {
                let self = this;
                var data = {
                    user_id: String(userId)
                }
                data = this.baseTool.addAuthenticationPassword(data);
                data = JSON.stringify(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getAPIHost()}/usersShow`,
                    data: data
                }, function(responseText) {
                    resObj = JSON.parse(responseText);
                    def.resolve(resObj);

                });
                return def.promise();

            }
        },
        myAPI: {
            init: function() {
                pictureSearch.initTemperate(this)
            },
            setTempTweets: function() {
                let self = this;
                var data = {};
                data.tempTweets = JSON.stringify(this.parent.allTweetCollects);
                data = this.baseTool.addAuthenticationPassword(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/setTempTweets`,
                    data: JSON.stringify(data)
                }, function(responseText) {
                    def.resolve();

                });
                return def.promise();

            },
            getTempTweets: function() {
                let self = this;
                let data = {};
                data = this.baseTool.addAuthenticationPassword(data);

                let def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/getTempTweets`,
                    data: JSON.stringify(data)
                }, function(responseText) {
                    var hasTempData = false;
                    if (responseText != "") {
                        hasTempData = true;
                        self.parent.allTweetCollects = JSON.parse(responseText);
                    }
                    def.resolve(hasTempData);

                });
                return def.promise();

            },
            getAllTweets: function() {
                let self = this;
                let data = {};
                data = this.baseTool.addAuthenticationPassword(data);

                let def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/getTweets`,
                    data: JSON.stringify(data)
                }, function(responseText) {
                    self.parent.allTweetCollects = JSON.parse(responseText);
                    //console.log(self.parent.allTweetCollects)
                    def.resolve();

                });
                return def.promise();

            },
            setPicSearchConfig: function() {
                let self = this;
                let picSearchConfig = this.uiManager.config.get();
                picSearchConfig = this.baseTool.addAuthenticationPassword(picSearchConfig);
                var data = JSON.stringify(picSearchConfig);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/setPicSearchConfig`,
                    data: data
                }, function(responseText) {
                    self.uiManager.message.popup(responseText);
                    self.parent.canSaveTempTweets.set(false);

                    def.resolve();

                });
                return def.promise();

            },
            getPicSearchConfig: function() {
                let self = this;
                let data = {};
                data = this.baseTool.addAuthenticationPassword(data);

                let def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/getPicSearchConfig`,
                    data: JSON.stringify(data)
                }, function(responseText) {
                    resObj = JSON.parse(responseText);

                    self.uiManager.config.set(resObj);
                    self.uiManager.config.setUI();

                    def.resolve();

                });
                return def.promise();

            },
            getClientIdentifications: function() {
                let self = this;
                var data = {};
                data = this.baseTool.addAuthenticationPassword(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/getClientIdentifications`,
                    data: JSON.stringify(data)
                }, function(responseText) {
                    resObj = JSON.parse(responseText);
                    def.resolve(resObj);

                });
                return def.promise();

            },
            recordClientIdentification: function() {
                let self = this;
                var data = {};
                data.clientIdentification = this.parent.clientIdentification;
                data = this.baseTool.addAuthenticationPassword(data);

                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/recordClientIdentification`,
                    data: JSON.stringify(data)
                }, function(responseText) {

                    def.resolve((responseText == 'true'));

                });
                return def.promise();

            },
            deleteClientIdentification: function() {
                let self = this;
                var data = {};
                data.clientIdentification = this.parent.clientIdentification;
                data = this.baseTool.addAuthenticationPassword(data);


                var def = $.Deferred();
                chrome.runtime.sendMessage({
                    method: 'POST',
                    action: 'fetch',
                    url: `${self.parent.myHost.getHost()}/deleteClientIdentification`,
                    data: JSON.stringify(data)
                }, function(responseText) {

                    def.resolve();

                });
                return def.promise();

            }
        },
        processBar: {
            init: function() {
                pictureSearch.initTemperate(this)
            },
            clear: function() {
                let ctx = imgContentManager.imgContent.canvasData.ctx;
                let canvasW = imgContentManager.imgContent.containerData.w;
                let canvasH = imgContentManager.imgContent.containerData.h;
                ctx.clearRect(0, 0, canvasW, canvasH);
            },
            draw: function(percent, isComplete) {
                isComplete = (isComplete == null) ? false : isComplete


                var ctx = imgContentManager.imgContent.canvasData.ctx;
                var canvasW = imgContentManager.imgContent.containerData.w;
                var canvasH = imgContentManager.imgContent.containerData.h;
                var circleRadius = 60;

                var gradient = ctx.createLinearGradient(canvasH / 2 - circleRadius * 2, 0, canvasH / 2 + circleRadius * 2, 0);
                gradient.addColorStop("0", "#0396ff");
                gradient.addColorStop("1.0", "#abdcff");

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 3;
                ctx.clearRect(0, 0, canvasW, canvasH);
                ctx.restore();

                ctx.beginPath();
                var word = isComplete ? "Complete!" : parseInt(percent * 100) + "%";
                ctx.font = "30px Arial";
                ctx.fillStyle = gradient;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillText(word, canvasW / 2, canvasH / 2);

                if (!isComplete) {
                    ctx.beginPath();
                    ctx.arc(canvasW / 2, canvasH / 2, circleRadius, 0, 2 * Math.PI * percent);
                    ctx.stroke();
                }

            },
            execute: function(currentPercent, maxLength, slice, rangeMin, rangeMax) {
                this.draw((((currentPercent - 1) / maxLength + slice * 1 / maxLength) * (rangeMax - rangeMin) / 100) + rangeMin / 100);

            }
        },
        system: {
            lastTimes: [],
            init: function() {
                pictureSearch.initTemperate(this)
            },
            allReady: async function() {
                let self = this;
                self.processBar.execute(1, 1, 1, 100, 100);

                setTimeout(async () => {
                    self.processBar.draw(null, true);
                    setTimeout(async () => {
                        self.processBar.clear();
                        imgContentManager.allReady();

                    }, 500);

                }, 500);

            },
            getSearchUrl: function(searchMemo) {
                return `https://twitter.com/search?f=tweets&vertical=default&q=${searchMemo}`;
            },
            pauseSystem: function() {
                return new Promise(resolve => setTimeout(resolve, 100));
            },
            searchPicture: function(memo, since_id, max_id, searchCount) {





                let gettimeSplits = function(timeStr, errSeconds) {
                    if (errSeconds == null) errSeconds = 0;
                    let createtime = new Date(timeStr);
                    createtime.setSeconds(createtime.getSeconds() + errSeconds);

                    let timeArray = [];
                    timeArray.push(createtime.getHours());
                    timeArray.push(createtime.getMinutes());
                    timeArray.push(createtime.getFullYear());
                    timeArray.push(createtime.getMonth() + 1);
                    timeArray.push(createtime.getDate());

                    return timeArray;
                }
                let setReturnObj = function(_tweetCollects, _since_id, _max_id) {
                    let obj = {};
                    obj.tweetCollects = _tweetCollects;
                    obj.since_id = _since_id;
                    obj.max_id = _max_id;
                    return obj;
                }
                let self = this;
                let def = $.Deferred();
                self.twitterAPI.searchTweet(memo, since_id, max_id, searchCount).then(async function(res) {


                    let last_id = null;
                    let first_id = null;

                    let statuses = res.statuses;
                    console.log(statuses);

                    if (statuses.length > 0) {

                        last_id = statuses[statuses.length - 1].id;
                        first_id = statuses[0].id;
                    }

                    var imgTweets = [];
                    if (memo.indexOf("from:") !== -1) {
                        imgTweets = statuses;
                    } else {
                        memo = memo.replace(/\"/g, '')
                        memo = memo.split(" ")[0].toLowerCase();
                        console.log(memo);

                        //to lowercase and delete @xxxx 
                        imgTweets = statuses.filter(statuse => statuse.full_text.toLowerCase().replace(/@\S+/g, '').indexOf(memo) !== -1);
                    }







                    var tweetCollectsPromises = await new Promise(resolveTweets => {
                        (async () => {
                            let mapedImgTweets = $(imgTweets).map(async function() {
                                let statuse = this;

                                var collect = {};
                                collect.user = statuse.user.screen_name;
                                collect.fullname = statuse.user.name;

                                var full_text = statuse.full_text.replace(/(http|https|ftp):\/\/.*/g, '');
                                collect.description = full_text;
                                collect.userDes = statuse.user.description;

                                collect.avatar = statuse.user.profile_image_url;
                                collect.userLink = `https://twitter.com/` + statuse.user.screen_name;
                                if (statuse.entities.media != null) {
                                    collect.link = statuse.entities.media[0].expanded_url
                                } else {
                                    var url = statuse.entities.urls[0].expanded_url.replace(/^http:/, 'https:')
                                    collect.link = url;

                                }


                                if (statuse.entities.media != null) {
                                    collect.imgUrl = $(statuse.extended_entities.media).map(function() {
                                        return this.media_url;
                                    }).toArray();
                                } else {
                                    var urlObject = new URL(collect.link, window.location.href);

                                    await new Promise(resolve87 =>
                                        fetch(urlObject, {
                                            credentials: "include",
                                            referrer: window.location.href
                                        }).then(function(response) {
                                            return response.text();
                                        }).then(function(html) {
                                            var doc = new DOMParser().parseFromString(html, "text/html");
                                            var imgArray = [];
                                            var imgUrl = $(doc).find("img").attr('src');

                                            imgArray.push(imgUrl);
                                            collect.imgUrl = imgArray;
                                            resolve87();
                                        })
                                    )
                                }



                                collect.isRetweet = statuse.retweeted;
                                collect.isFavorite = statuse.favorited;
                                collect.retweetCount = statuse.retweet_count;
                                collect.favoriteCount = statuse.favorite_count;
                                collect.tweetId = statuse.id_str;
                                collect.userId = statuse.user.id;

                                let timeSplits = gettimeSplits(statuse.created_at);

                                collect.time = `${timeSplits[2]}-${timeSplits[3]}-${timeSplits[4]}_${timeSplits[0]}:${timeSplits[1]}:00_JST`;
                                collect.displaytime = `${timeSplits[2]}/${timeSplits[3]}/${timeSplits[4]} ${timeSplits[0]}:${timeSplits[1]}`;

                                return collect;

                            }).toArray()
                            resolveTweets(mapedImgTweets);
                        })();
                    });


                    let tweetCollects = [];
                    await Promise.all(tweetCollectsPromises).then(function(results) {
                        tweetCollects = results;
                    })


                    def.resolve(setReturnObj(tweetCollects, first_id, last_id));

                });

                return def.promise();

            },
            /*
            searchTweetsFunc: async function (resolve) {
            	let self = this;
            	let diffTweetCollects = [];
            	let allTweetCollects = self.parent.allTweetCollects;



            	let picSearchConfig = this.uiManager.config.get();
            	let searchMemos = picSearchConfig.searchMemos.slice();
            	for (var i = 0; i < searchMemos.length; i++) {
            		let searchMemo = searchMemos[i];
            		var searchCount = picSearchConfig.searchCount;
            		await new Promise(resolve => {
            			(async () => {

            				searchMemo += ` filter:images AND -filter:retweets`


            				let obj = await self.searchPicture(searchMemo, self.lastTimes[i], 0, searchCount);
            				if (obj.since_id != null) {
            					self.lastTimes[i] = obj.since_id;
            				}
            				if (obj.tweetCollects.length == 0) {
            					resolve();
            					return;
            				}

            				var diffTweets = obj.tweetCollects.filter(item => !allTweetCollects.some(other => item.tweetId === other.tweetId));
            				if (diffTweets.length != 0) {
            					diffTweetCollects = diffTweetCollects.concat(diffTweets);
            				}
            				resolve();
            			})();
            		});
            		await self.pauseSystem()
            	}

            	console.log("endSearchProcess ")
            	diffTweetCollects = diffTweetCollects.filter(self.baseTool.distinct(["tweetId"]));
            	diffTweetCollects = diffTweetCollects.sort(function (a, b) {
            		return a.tweetId > b.tweetId ? 1 : -1;
            	});
            	console.log(`Add ${diffTweetCollects.length} Tweets!`);


            	for (var i = 0; i < diffTweetCollects.length; i++) {
            		let tweet = diffTweetCollects[i];
            		await new Promise(resolve =>
            			imgContentManager.append(tweet, function () {
            				resolve();
            			}))
            		await self.pauseSystem()
            	}
            	imgContentManager.drawAll();


            	allTweetCollects = allTweetCollects.concat(diffTweetCollects)



            	self.parent.allTweetCollects = allTweetCollects;

            	resolve();
            },
            */
            searchTweetsInitVer2: async function() {

                await this.myAPI.getPicSearchConfig();

                let self = this;
                let allTweetCollects = null;
                let images_loaded = 0;
                let picSearchConfig = this.uiManager.config.get();

                do {
                    await this.myAPI.getAllTweets();
                    allTweetCollects = self.parent.allTweetCollects;
                    if (allTweetCollects == null || allTweetCollects.length == 0) {
                        await new Promise(resolve => setTimeout(resolve, 15 * 1000))
                    }
                } while (allTweetCollects == null || allTweetCollects.length == 0);



                for (var i = 0; i < allTweetCollects.length; i++) {
                    let tweet = allTweetCollects[i];
                    await new Promise(resolve =>
                        imgContentManager.append(tweet, function() {

                            images_loaded++;
                            self.processBar.execute(images_loaded, allTweetCollects.length, 1, 0, 100);
                            resolve();
                        }))
                }
                self.saveCurrentLen();
                self.allReady();


                while (1) {
                    await new Promise(resolve => setTimeout(async function() {


                        await self.myAPI.getAllTweets();
                        self.loadDiffTweetCollects(resolve);

                    }, 60 * 1000 * picSearchConfig.intervalTime))
                }





            },
            /*
            searchTweetsInit: async function () {
            	await this.myAPI.getPicSearchConfig();
            	let hasTempData = await this.myAPI.getTempTweets();

            	let self = this;
            	let allTweetCollects = self.parent.allTweetCollects;






            	if (!hasTempData) {
            		let picSearchConfig = this.uiManager.config.get();
            		let searchMemos = picSearchConfig.searchMemos.slice();
            		for (var i = 0; i < searchMemos.length; i++) {
            			let searchMemo = searchMemos[i];
            			let searchMemoIndex = i + 1;
            			let searchMemosLength = searchMemos.length;
            			await new Promise(resolve => {
            				(async () => {
            					var max_id = 0;
            					var firstDepth = picSearchConfig.firstDepth;
            					var searchCount = picSearchConfig.searchCount;

            					var count = 1;
            					searchMemo += ` filter:images AND -filter:retweets`

            					while (count <= firstDepth) {

            					


            						let objs = await self.searchPicture(searchMemo, 0, max_id, searchCount);
            						if (objs.since_id != null && count == 1) {
            							self.lastTimes[i] = objs.since_id;
            						}
            						
            						if (objs.tweetCollects.length != 0) {
            							allTweetCollects = allTweetCollects.concat(objs.tweetCollects);
            						}
            						self.processBar.execute(searchMemoIndex, searchMemosLength, count / firstDepth, 0, 80);
            						max_id = objs.max_id;
            						count++;

            						await self.pauseSystem()
            					}
            					resolve();
            				})();
            			});
            			await self.pauseSystem()
            		}



            		allTweetCollects = allTweetCollects.filter(self.baseTool.distinct(["tweetId"]));
            		allTweetCollects = allTweetCollects.sort(function (a, b) {
            			return a.tweetId > b.tweetId ? 1 : -1;
            		});

            	}


            	let images_loaded = 0;
            	for (var i = 0; i < allTweetCollects.length; i++) {
            		let tweet = allTweetCollects[i];
            		await new Promise(resolve =>
            			imgContentManager.append(tweet, function () {

            				images_loaded++;
            				self.processBar.execute(images_loaded, allTweetCollects.length, 1, 0, 100);
            				resolve();
            			}))
            		await self.pauseSystem()
            	}




            	self.parent.allTweetCollects = allTweetCollects;


            	self.allReady();



            },
            */
            AllTweetCurrentLen: 0,
            saveCurrentLen: function() {
                this.AllTweetCurrentLen = this.parent.allTweetCollects.length;
            },
            updateImgContentTweet: function() {
                console.log("updateImgContentTweet")
                let allTweetCollects = this.parent.allTweetCollects;
                let imgDataSet = imgContentManager.getimgDataSet();
                for (var i = 0; i < imgDataSet.length; i++) {
                    imgDataSet[i].tweet.favoriteCount = allTweetCollects[imgDataSet[i].tweet.id].favoriteCount
                    imgDataSet[i].tweet.retweetCount = allTweetCollects[imgDataSet[i].tweet.id].retweetCount

                }

            },
            loadDiffTweetCollects: async function(finalResolve) {
                let allTweetCollects = this.parent.allTweetCollects;
                let allLen = allTweetCollects.length

                if (this.AllTweetCurrentLen == allLen) {
                    finalResolve()
                    return
                }


                for (var i = this.AllTweetCurrentLen; i < allLen; i++) {
                    let tweet = allTweetCollects[i];
                    await new Promise(resolve =>
                        imgContentManager.append(tweet, function() {
                            resolve();
                        }))
                    await this.pauseSystem()
                }

                this.saveCurrentLen();
                imgContentManager.drawAll();
                this.updateImgContentTweet();

                finalResolve()

            },

            loadAllTweetCollectsInit: async function() {
                let self = this;
                let allTweetCollects = self.parent.allTweetCollects;
                let images_loaded = 0;
                for (var i = 0; i < allTweetCollects.length; i++) {
                    let tweet = allTweetCollects[i];
                    await new Promise(resolve =>
                        imgContentManager.append(tweet, function() {

                            images_loaded++;
                            self.processBar.execute(images_loaded, allTweetCollects.length, 1, 80, 100);
                            resolve();
                        }))
                    await self.pauseSystem()
                }

            },
            checkClientIdentification: async function(callback) {
                let self = this;
                self.parent.myHost.set("localhost");
                var hostname = location.hostname;
                switch (hostname) {
                    case "twitter.com":
                        let ClientIdentificationArray = await self.myAPI.getClientIdentifications();
                        let canOpen = true;

                        console.log(ClientIdentificationArray)
                        if (ClientIdentificationArray != null) {
                            await self.baseTool.asyncForEach(ClientIdentificationArray, async (element) => {
                                let isOpen = await new Promise(resolve => {
                                    chrome.runtime.sendMessage({
                                        method: 'GET',
                                        action: 'xhttp',
                                        url: element,
                                        data: null
                                    }, function(responseText) {
                                        resolve(responseText)

                                    })
                                })

                                if (isOpen == "open") {
                                    canOpen = false;
                                }
                            });

                        }

                        if (!canOpen) {
                            return;
                        }

                        //set clientIdentification
                        self.parent.clientIdentification = URL.createObjectURL(new Blob(["open"], {
                            type: 'application/json'
                        }));

                        var openWindow = await self.myAPI.recordClientIdentification();
                        if (openWindow) {
                            callback()
                        }

                        break;

                }

            }
        },
        UIManager: {

            init: function() {
                pictureSearch.initTemperate(this)
                this.displayPicture.init(this);
                this.main.init(this);
                this.message.init(this);
                this.config.init(this);
            },
            displayPicture: {
                lock: false,
                ctx: {
                    avatar: null,
                    myMedia: null
                },
                tempTweet: {
                    val: null,
                    get: function() {
                        return val;
                    },
                    set: function(_val) {
                        val = _val;
                    }
                },
                init: function(_this) {
                    Object.assign(this, _this);
                },
                setEvent: function() {
                    let self = this;
                    let $displayPictureWindows = $("#displayPictureWindows");

                    $displayPictureWindows.find('.myFullname,.myAvatar').on({
                        'click': function() {
                            let tweet = self.tempTweet.get();
                            window.open(tweet.userLink, '_blank');
                        },
                        'mouseenter': function() {

                            self.setHover = setTimeout(async () => {
                                $displayPictureWindows.find('.myUserDes').show();

                            }, 100);
                        },
                        'mouseleave': function() {

                            $displayPictureWindows.find('.myUserDes').hide();
                            clearTimeout(self.setHover);
                        }
                    });


                    $displayPictureWindows.find('#openTweetLink').click(function() {
                        let tweet = self.tempTweet.get();
                        window.open(tweet.link, '_blank');
                    });



                    $displayPictureWindows.find('#MuteUserBtn').click(async () => {
                        if (window.confirm('Do you really want to mute this user?')) {
                            let tweet = self.tempTweet.get();
                            await self.twitterAPI.mute(tweet.userId).then(function(res) {
                                let userId = res.id_str;
                                let name = res.name;

                                self.parent.allTweetCollects = self.parent.allTweetCollects.filter(item => item.userId != userId);
                                imgContentManager.mute(tweet);

                                self.uiManager.message.popup(`User ${name} is muted!`);

                            });
                        }

                    });



                    $displayPictureWindows.find('.DownloadImg').click(function() {
                        let tweet = self.tempTweet.get();
                        var collectedFiles = tweet.imgUrl.map(function(url) {
                            var para = {};
                            para.url = url + ":orig";
                            para.name = url.split('/').pop();
                            para.htmlElement = null;

                            return para;
                        });

                        window.downloadMedias(collectedFiles);

                    });







                    $displayPictureWindows.find('#closeBtn').click(function() {
                        imgContentManager.largeMediaHide();
                    });


                    $displayPictureWindows.find('#myFavoriteBtn').click(async () => {
                        let $parent = $displayPictureWindows;
                        let tweet = self.tempTweet.get();

                        if ($parent.hasClass('favorited')) {

                            //unfavorite
                            $parent.removeClass('favorited');
                            await self.twitterAPI.destroyFavorite(tweet.tweetId).then(function(res) {
                                let favorite_count = res.favorite_count;

                                tweet.favoriteCount = favorite_count;
                                tweet.isFavorite = false;
                                $displayPictureWindows.find("#myFavoriteBtn .actionCount").html(tweet.favoriteCount);

                                imgContentManager.imgDataChangeStatus(tweet);

                            });
                        } else {
                            //favorite
                            $parent.addClass('favorited');
                            await self.twitterAPI.createFavorite(tweet.tweetId).then(function(res) {
                                console.log(res)
                                let favorite_count = res.favorite_count;

                                tweet.favoriteCount = favorite_count;
                                tweet.isFavorite = true;
                                $displayPictureWindows.find("#myFavoriteBtn .actionCount").html(tweet.favoriteCount);

                                imgContentManager.imgDataChangeStatus(tweet);

                            });

                        }



                    })
                    $displayPictureWindows.find('#myRetweetBtn').click(async () => {
                        let $parent = $displayPictureWindows;
                        let tweet = self.tempTweet.get();

                        if ($parent.hasClass('retweeted')) {
                            //unretweeted
                            $parent.removeClass('retweeted');
                            await self.twitterAPI.unretweet(tweet.tweetId).then(function(res) {
                                let retweet_count = res.retweet_count;

                                tweet.retweetCount = retweet_count;
                                tweet.isRetweet = false;
                                $displayPictureWindows.find("#myRetweetBtn .actionCount").html(tweet.retweetCount);

                                imgContentManager.imgDataChangeStatus(tweet);

                            });
                        } else {
                            //retweeted
                            $parent.addClass('retweeted');
                            await self.twitterAPI.retweet(tweet.tweetId).then(function(res) {
                                let retweet_count = res.retweet_count;

                                tweet.retweetCount = retweet_count;
                                tweet.isRetweet = true;
                                $displayPictureWindows.find("#myRetweetBtn .actionCount").html(tweet.retweetCount);

                                imgContentManager.imgDataChangeStatus(tweet);

                            });

                        }

                    });

                    $("#galleryWindowsOverlay,#galleryWindows .container").click(function(event) {
                        if (event.target.className == "myGallery")
                            return;
                        $("#galleryWindows").hide();
                    });

                    let $myAvatar = $displayPictureWindows.find(".myAvatar");
                    this.ctx.avatar = $myAvatar.get(0).getContext("2d");


                    this.mediaContainerH = $displayPictureWindows.find(".MediaContainer").css('max-height');
                    this.mediaContainerH = parseInt(this.mediaContainerH.substring(0, this.mediaContainerH.length - 2));

                    this.mediaContainerW = $displayPictureWindows.find(".MediaContainer").css('width');
                    this.mediaContainerW = parseInt(this.mediaContainerW.substring(0, this.mediaContainerW.length - 2));

                    for (var i = 0; i < 4; i++) {
                        let $cellContainer = $(`<div class="cellContainer" ><canvas class="myMedia" width="0" height="0" ></canvas></div>`)
                            .appendTo($displayPictureWindows.find(".MediaContainer"));

                        $myMedia = $cellContainer.find('.myMedia')
                        $myMedia.click({ index: i }, function(e) {
                            let index = e.data.index;
                            let tweet = self.tempTweet.get();
                            let clickImbUrl = tweet.imgUrl[index]
                            var regex1 = /(jpg|png)$/;
                            clickImbUrl = clickImbUrl.replace(regex1, 'jpg:small')


                            $("#galleryWindows .myGallery").off("load").on("load", function() {
                                $("#galleryWindows").show();
                            }).attr("src", clickImbUrl)





                        });
                    }



                },
                show: function(imgDataTweet) {
                    if (this.lock) return;
                    this.lock = true;
                    if (this.tempTweet.tweetId == imgDataTweet.tweetId)
                        return;

                    let tweet = imgDataTweet;
                    let $displayPictureWindows = $("#displayPictureWindows");


                    this.tempTweet.set(tweet);







                    $displayPictureWindows.find(".myFullname").html(tweet.fullname);
                    $displayPictureWindows.find(".updatetime").html(tweet.displaytime);
                    $displayPictureWindows.find(".myDescribe").html(tweet.description);
                    $displayPictureWindows.find(".myUserDes").html(tweet.userDes);
                    $displayPictureWindows.find("#myRetweetBtn .actionCount").html(tweet.retweetCount);
                    $displayPictureWindows.find("#myFavoriteBtn .actionCount").html(tweet.favoriteCount);

                    $displayPictureWindows.removeClass('retweeted favorited');
                    $displayPictureWindows.find('.myUserDes').hide();

                    if (tweet.isRetweet)
                        $displayPictureWindows.addClass('retweeted');
                    if (tweet.isFavorite)
                        $displayPictureWindows.addClass('favorited');

                    $displayPictureWindows.show();

                    //avatar
                    let $myAvatar = $displayPictureWindows.find(".myAvatar");
                    if (tweet.avatarimgOb != null) {
                        this.ctx.avatar.drawImage(tweet.avatarimgOb, 0, 0, $myAvatar.get(0).width, $myAvatar.get(0).height);
                    }

                    let $cellContainers = $('.cellContainer');
                    $cellContainers.hide();

                    //add perMedia
                    for (var i = 0; i < tweet.imgOb.length; i++) {
                        let imbOb = tweet.imgOb[i];
                        if (imbOb == null) continue;

                        let width = (tweet.imgOb.length > 1) ? 'calc(50% - 1px)' : '100%';
                        let perHeight = this.mediaContainerH / 2;



                        let $cellContainer = $cellContainers.eq(i)
                        let $myMedia = $cellContainer
                            .css({
                                'width': width,
                                'height': 'auto'
                            })
                            .find('.myMedia')
                            .css({
                                'top': '0',
                                'left': '0'
                            })

                        if (tweet.imgOb.length > 1) {
                            $cellContainer.css({
                                'height': perHeight
                            });
                        }


                        let imgW = imbOb.width;
                        let imgH = imbOb.height;



                        if (tweet.imgOb.length > 1) {

                            if (imgH > imgW) {
                                imgW = perHeight;
                                imgH = (imgW / imbOb.width) * imbOb.height;

                                var adjust = (imgH - perHeight) / 2;
                                $myMedia.css('top', `-${adjust}px`);

                            } else if (imgH < imgW) {

                                imgH = perHeight;
                                imgW = (imgH / imbOb.height) * imbOb.width;

                                var adjust = (imgW - perHeight) / 2;
                                $myMedia.css('left', `-${adjust}px`);

                            } else {
                                imgH = perHeight;
                                imgW = this.mediaContainerW / 2
                            }

                        } else {
                            imgW = this.mediaContainerW;
                            imgH = (imgW / imbOb.width) * imbOb.height;

                            if (imgH > imgW) {
                                var adjust = (imgH - this.mediaContainerH) / 2;
                                $myMedia.css('top', `-${adjust}px`);
                            }
                        }

                        $myMedia.attr({
                            width: imgW,
                            height: imgH
                        }).css({
                            width: imgW,
                            height: imgH
                        })

                        let ctx = $myMedia.get(0).getContext("2d");
                        ctx.drawImage(imbOb, 0, 0, imgW, imgH);
                        $cellContainer.show();


                    }




                    this.lock = false;



                },
                hide: function() {
                    $("#displayPictureWindows").hide();
                }


            },
            main: {
                init: function(_this) {
                    Object.assign(this, _this);
                },
                initAllUI: function() {



                    var galleryWindows = `<div id='galleryWindows'>
                                                <div id='galleryWindowsOverlay' class='myOverlay'></div>
                                                <div class='container'>
                                                    <img class='myGallery' >
                                                </div>
                                            </div>`;

                    $('body').eq(0).append(galleryWindows);
                    var displayPictureWindows = `<div id='displayPictureWindows'>
                                                    <div class="myUserDes" ></div>
                                                    <canvas class="myAvatar" width="40" height="40"></canvas>
                                                    <div class="myContainer">
                                                        <a class="myFullname"></a>
                                                        <div class="updatetime"></div>
                                                        <div class="myDescribe"></div>
                                                        <div class="MediaContainer">
                                                            
                                                        </div>
														<div class="GroupFloatLeft" >
															

															<div id="myRetweetBtn" class="actionBtn">
																<svg viewBox="0 0 24 24" class="myglyph">
																	<g>
																		${pictureSearch.glyphicon.retweet}
																	</g>
																</svg>
																<span class="actionCount" >0</span>
															</div>
															<div id="myFavoriteBtn" class="actionBtn">
																<svg viewBox="0 0 24 24" class="myglyph">
																	<g>
																		${pictureSearch.glyphicon.favorite}
																	</g>
																</svg>
																<span class="actionCount" >0</span>
															</div>
														</div>

                                                        
                                                        
														<div class="GroupFloatRight" >
															<button type="button" class="DownloadImg mybtn mybtn-warning">download</button>
															<button type="button" id="openTweetLink" class="mybtn mybtn-info">open</button>
                                                            <!--button type="button" id="MuteUserBtn" class="mybtn mybtn-danger">mute</button-->
                                                            
                                                        </div>
													</div>
													<div id="closeBtn" class="actionBtn">
														<svg viewBox="0 0 24 24" class="myglyph">
															<g>
																${pictureSearch.glyphicon.close}
															</g>
														</svg>
                                                	</div>
                                                    
                                                </div>
                                               
                                        
                                                </div>`;
                    $('body').eq(0).append(displayPictureWindows);

                    var pictureSearchWindows = `<div id='pictureSearchWindows'></div>`;
                    $('body').eq(0).append(pictureSearchWindows);
                    var pictureSearchHeader = `<div id='pictureSearchHeader'>
                                                    <h3 >Picture Search&nbsp;
														<div id="pictureSearchSettingBtn" class="actionBtn" >
															<svg viewBox="0 0 24 24" class="myglyph">
																<g>
																	${pictureSearch.glyphicon.setting}
																</g>
															</svg>
														</div>
                                                    </h3> 
                                                </div>`;
                    $('#pictureSearchWindows').append(pictureSearchHeader);
                    var pictureSearchMain = `<div id='pictureSearchMain'>
                                                <div id="pictureSearchContainer" class='scrollbar-default'>
                                                    <div id="pictureSearchCanvasContainer" >
                                                        <canvas id='pictureSearchCanvas' width="0" height="0" ></canvas>
                                                    </div>
                                                </div>
                                                
                                            </div>`;
                    $("#pictureSearchWindows").append(pictureSearchMain);

                    var pictureSearchSettingWindow = `<div id='pictureSearchSettingWindow'  >
                                                            <div id="pictureSearchSettingContainer">
                                                                <div class="control-group">
                                                                    <label class="t1-label control-label" >初検索割合</label>
                                                                    <div class="controls">
                                                                    <input id="FirstCountRatio" maxlength="3" type="number">
                                                                    </div>
																</div>
																<div class="control-group">
                                                                    <label class="t1-label control-label" >検索深度</label>
                                                                    <div class="controls">
                                                                    <input id="SearchCount" maxlength="3" type="number">
                                                                    </div>
                                                                </div>
                                                                <div class="control-group">
                                                                    <label class="t1-label control-label" >検索間隔</label>
                                                                    <div class="controls">
                                                                    <input id="IntervalTime" maxlength="3" type="number">
                                                                    </div>
                                                                </div>
                                                                <div class="control-group">
                                                                    <label class="t1-label control-label" >検索メモ</label>
                                                                    <div class="controls">
                                                                    <ul id="searchMemos" ></ul> 
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr class="myHR">
                                                            <div class="GroupFloatRight">
                                                                <button type="button" id="pictureSearchBtnCancel" class="mybtn mybtn-danger">Cancel</button>
                                                                <button type="button" id="pictureSearchBtnSave" class="mybtn mybtn-success">Save</button>
                                                            </div>
                                                        </div>`;
                    $('body').eq(0).append(pictureSearchSettingWindow);

                    $("#pictureSearchSettingWindow").hide();
                    $("#displayPictureWindows").hide();
                    $("#galleryWindows").hide();

                    this.setEvent();

                },
                setEvent: function() {


                    $('#pictureSearchHeader').click({ self: this }, function(event) {

                        if (event.target.id == "pictureSearchSettingBtn" || $(event.target).closest('#pictureSearchSettingBtn').length) {
                            return;
                        }
                        $("#pictureSearchMain").toggle();
                        if (!$("#pictureSearchMain").is(':visible')) {
                            $('.isLock').removeClass('isLock');
                            $("#displayPictureWindows").hide();
                        }


                    });

                    $('#pictureSearchSettingBtn').click({ self: this }, function(event) {
                        let self = event.data.self;



                        $("#pictureSearchSettingWindow").toggle();
                        if ($("#pictureSearchSettingWindow").is(':visible')) {
                            self.uiManager.config.storeTemp();
                        } else {
                            if (self.uiManager.config.hasTemp()) {
                                self.uiManager.config.recoverFromTemp();
                                self.uiManager.config.setUI();
                            }
                        }


                    });

                    $('#pictureSearchBtnCancel').click({ self: this }, function(event) {
                        let self = event.data.self;
                        $("#pictureSearchSettingWindow").hide();
                        self.uiManager.config.recoverFromTemp();
                        self.uiManager.config.setUI();
                    });

                    $('#pictureSearchBtnSave').click({ self: this }, function(event) {
                        let self = event.data.self;
                        let picSearchConfig = {}
                        picSearchConfig.firstCountRatio = parseInt($("#FirstCountRatio").val());
                        picSearchConfig.searchCount = parseInt($("#SearchCount").val());
                        picSearchConfig.intervalTime = parseInt($("#IntervalTime").val());
                        picSearchConfig.searchMemos = $("#searchMemos .memo .content").map(function() {
                            return $(this).html();
                        }).toArray();
                        self.uiManager.config.set(picSearchConfig);
                        self.myAPI.setPicSearchConfig();

                        $("#pictureSearchSettingWindow").hide();



                    });



                    $(window).on("beforeunload", { self: this }, function(event) {
                        let self = event.data.self;

                        /*
                        if (self.parent.canSaveTempTweets.get()) {
                        	self.myAPI.setTempTweets();
                        }*/
                        console.log("close");
                        URL.revokeObjectURL(self.parent.clientIdentification)
                        self.myAPI.deleteClientIdentification();
                    });


                    this.uiManager.displayPicture.setEvent();

                }
            },
            message: {
                resultPopupWindowsInterval: null,
                init: function(_this) {
                    Object.assign(this, _this);
                },
                popup: function(responseText) {

                    var resultTxt = responseText;
                    $('#resultPopupWindows').html(resultTxt).show();

                    if (this.resultPopupWindowsInterval != null) {
                        clearTimeout(this.resultPopupWindowsInterval);
                    }
                    this.resultPopupWindowsInterval = setTimeout(function() {
                        $('#resultPopupWindows').hide()
                    }, 5000);
                }
            },
            config: {
                picSearchConfig: null,
                picSearchConfigTemp: null,
                init: function(_this) {
                    Object.assign(this, _this);
                },
                set: function(config) {
                    this.picSearchConfig = config;
                },
                hasTemp: function() {
                    return this.picSearchConfigTemp != null;
                },
                storeTemp: function() {
                    this.picSearchConfigTemp = this.baseTool.clone(this.picSearchConfig);
                },
                recoverFromTemp: function() {
                    this.picSearchConfig = this.baseTool.clone(this.picSearchConfigTemp);
                },
                get: function() {
                    return this.picSearchConfig;
                },
                setUI: function() {
                    var setMemoHtml = function(content) {
                        return `<li class='memo'>
							<span class='deleteMemo '>
								<svg viewBox="0 0 24 24" class="myglyph">
								<g>
									${pictureSearch.glyphicon.close}
								</g>
								</svg>
							</span>
                            <span class='content'>${content}</span>
                        </li>`
                    }

                    $('#addMemoBtn').off('click');
                    $('.memo .deleteMemo').off('click');
                    $('.memo').off('click');

                    $("#searchMemos").empty();
                    $("#FirstCountRatio").val(this.picSearchConfig.firstCountRatio);
                    $("#SearchCount").val(this.picSearchConfig.searchCount);
                    $("#IntervalTime").val(this.picSearchConfig.intervalTime);

                    for (var i = 0; i < this.picSearchConfig.searchMemos.length; i++) {
                        $("#searchMemos").append(setMemoHtml(this.picSearchConfig.searchMemos[i]));
                    }

                    $("#searchMemos").append(`<li id="addMemoBtn">+</li>`);
                    $("#searchMemos").sortable({
                        items: "> .memo",
                        containment: "#pictureSearchSettingWindow"
                    });

                    $('#addMemoBtn').click(function() {
                        $(setMemoHtml('new memo'))
                            .insertBefore(this)
                            .addMemoEvent();
                    });

                    $('.memo').addMemoEvent();

                }

            }

        },
        init: function() {
            this.baseTool.init();
            this.twitterAPI.init();
            this.myAPI.init();
            this.system.init();
            this.processBar.init();
            this.UIManager.init();
        }
    },
    init: async function() {
        let self = this;
        this.content.init();
        $.fn.extend(this.content.jqueryExtent);

        this.content.system.checkClientIdentification(function() {
            self.initAllUI();
            self.searchTweetsInit();
        });


    },
    initAllUI: function() {
        this.content.UIManager.main.initAllUI();
        imgContentManager.init();
    },
    searchTweetsInit: function() {
        this.content.system.searchTweetsInitVer2();
    },

    displayPictureShow: function(imgDataTweet) {
        this.content.UIManager.displayPicture.show(imgDataTweet);
    },
    displayPictureHide: function() {
        this.content.UIManager.displayPicture.hide();
    },

    initTemperate: function(self) {
        self.group = self
        self.parent = this.content;
        self.uiManager = this.content.UIManager;
        self.const = this.content.CONST;
        self.baseTool = this.content.baseTool;
        self.myAPI = this.content.myAPI;
        self.twitterAPI = this.content.twitterAPI;
        self.processBar = this.content.processBar;

    }


}


$(window).on("load", async function() {
    pictureSearch.init();
});