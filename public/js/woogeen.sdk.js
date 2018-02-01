/*
 * Intel WebRTC SDK version 3.3.0
 * Copyright (c) 2017 Intel <http://webrtc.intel.com>
 * Homepage: http://webrtc.intel.com
 */

! function(a) {
    function b(a) {
        "use strict";
        this.type = a.type, this.attributes = a.attributes
    }

    function c(a) {
        "use strict";
        var b = this,
            c = new SignalingChannel;
        this.onConnected = null, this.onInstaMessage = null, this.onDisconnected = null, this.onConnectFailed = null, this.onChatInvitation = null, this.onStatusChanged = null, this.onChatDenied = null, this.onChatStopped = null, this.onChatAccepted = null, this.onChatSignal = null, this.onStreamType = null, this.onAuthenticated = null, c.onMessage = function(a, c) {
            var d = JSON.parse(a);
            switch (d.type) {
                case "chat-invitation":
                    b.onChatInvitation && b.onChatInvitation(c, d.ua);
                    break;
                case "chat-accepted":
                    b.onChatAccepted && b.onChatAccepted(c, d.ua);
                    break;
                case "chat-denied":
                    b.onChatDenied && b.onChatDenied(c);
                    break;
                case "chat-closed":
                    b.onChatStopped && b.onChatStopped(c);
                    break;
                case "stream-type":
                    b.onStreamType && b.onStreamType(d.data, c);
                    break;
                case "chat-signal":
                    b.onChatSignal && b.onChatSignal(d.data, c);
                    break;
                case "chat-negotiation-needed":
                    b.onNegotiationNeeded && b.onNegotiationNeeded(c);
                    break;
                case "chat-negotiation-accepted":
                    b.onNegotiationAccepted && b.onNegotiationAccepted(c);
                    break;
                default:
                    e.Logger.error("Received unkown message")
            }
        }, c.onServerDisconnected = function() {
            b.onDisconnected && b.onDisconnected()
        }, c.onUserStatusChanged = function(data){
            b.onStatusChanged && b.onStatusChanged(data)
        }, c.onInstaMessageReceived = function(data){
            b.onInstaMessage && b.onInstaMessage(data)
        }, this.sendChatInvitation = function(a, b, d, e) {
            var f = {
                type: "chat-closed"
            };
            c.sendMessage(JSON.stringify(f), a), f = {
                type: "chat-invitation",
                ua: b
            }, c.sendMessage(JSON.stringify(f), a, d, e)
        }, this.sendChatAccepted = function(a, b, d, e) {
            var f = {
                type: "chat-accepted",
                ua: b
            };
            c.sendMessage(JSON.stringify(f), a, d, e)
        }, this.sendChatDenied = function(a, b, d) {
            var e = {
                type: "chat-denied"
            };
            c.sendMessage(JSON.stringify(e), a, b, d)
        }, this.sendChatStopped = function(a, b, d) {
            var e = {
                type: "chat-closed"
            };
            c.sendMessage(JSON.stringify(e), a, b, d)
        }, this.sendStreamType = function(a, b, d, e) {
            var f = {
                type: "stream-type",
                data: b
            };
            c.sendMessage(JSON.stringify(f), a, d, e)
        }, this.sendSignalMessage = function(a, b, d, e) {
            var f = {
                type: "chat-signal",
                data: b
            };
            c.sendMessage(JSON.stringify(f), a, d, e)
        }, this.sendNegotiationNeeded = function(a, b, d) {
            var e = {
                type: "chat-negotiation-needed"
            };
            c.sendMessage(JSON.stringify(e), a, b, d)
        }, this.sendNegotiationAccepted = function(a, b, d) {
            var e = {
                type: "chat-negotiation-accepted"
            };
            c.sendMessage(JSON.stringify(e), a, b, d)
        }, this.finalize = function() {
            c.disconnect()
        }, this.connect = function(a, d, e) {
            c.connect(a, function(a) {
                b.onConnected && b.onConnected(), b.onAuthenticated && b.onAuthenticated(a), d && d(a)
            }, e)
        }, this.subscribe = function(uid){
            c.subscribe(uid)
        }, this.sendInstaMessage = function(objData, uid){
            c.sendInstaMessage(objData, uid)
        }
    }
    var d = function() {
            "use strict";
            var a = {};
            return Object.defineProperties(a, {
                version: {
                    get: function() {
                        return "3.3.0"
                    }
                },
                name: {
                    get: function() {
                        return "Intel WebRTC SDK"
                    }
                }
            }), a
        }(),
        e = {},
        f = {};
    d.EventDispatcher = function(a) {
            "use strict";
            var b = {};
            return a.dispatcher = {}, a.dispatcher.eventListeners = {}, b.addEventListener = function(b, c) {
                void 0 === a.dispatcher.eventListeners[b] && (a.dispatcher.eventListeners[b] = []), a.dispatcher.eventListeners[b].push(c)
            }, b.on = b.addEventListener, b.removeEventListener = function(b, c) {
                if (a.dispatcher.eventListeners[b]) {
                    var d = a.dispatcher.eventListeners[b].indexOf(c); - 1 !== d && a.dispatcher.eventListeners[b].splice(d, 1)
                }
            }, b.clearEventListener = function(b) {
                a.dispatcher.eventListeners[b] = []
            }, b.dispatchEvent = function(b) {
                a.dispatcher.eventListeners[b.type] && a.dispatcher.eventListeners[b.type].map(function(a) {
                    a(b)
                })
            }, b
        }, d.StreamEvent = function(a) {
            "use strict";
            b.call(this, a), this.stream = a.stream, this.msg = a.msg
        }, d.ClientEvent = function(a) {
            "use strict";
            b.call(this, a), this.user = a.user
        }, d.MessageEvent = function(a) {
            "use strict";
            b.call(this, a), this.msg = a.msg
        }, d.ChatEvent = function(a) {
            "use strict";
            b.call(this, a), this.type = a.type, this.senderId = a.senderId, this.peerId = a.peerId
        }, d.DataEvent = function(a) {
            "use strict";
            b.call(this, a), this.type = a.type, this.senderId = a.senderId, this.data = a.data
        }, d.RecorderEvent = function(a) {
            "use strict";
            b.call(this, a), this.recorderId = a.id
        }, d.StreamEvent.prototype = Object.create(b.prototype), d.StreamEvent.prototype.constructor = d.StreamEvent, d.ClientEvent.prototype = Object.create(b.prototype), d.ClientEvent.prototype.constructor = d.ClientEvent, d.MessageEvent.prototype = Object.create(b.prototype), d.MessageEvent.prototype.constructor = d.MessageEvent, d.ChatEvent.prototype = Object.create(b.prototype), d.ChatEvent.prototype.constructor = d.ChatEvent, d.DataEvent.prototype = Object.create(b.prototype), d.DataEvent.prototype.constructor = d.DataEvent, d.RecorderEvent.prototype = Object.create(b.prototype), d.RecorderEvent.prototype.constructor = d.RecorderEvent, d.Common = function() {
            function a(a, c, d) {
                return b(a, 0, -1, c, d)
            }

            function b(a, b, c, d, e) {
                for (var f = -1 !== c ? c : a.length, g = b; f > g; ++g)
                    if (0 === a[g].indexOf(d) && (!e || -1 !== a[g].toLowerCase().indexOf(e.toLowerCase()))) return g;
                return null
            }

            function c(b, c) {
                var e = a(b, "a=rtpmap", c);
                return e ? d(b[e]) : null
            }

            function d(a) {
                var b = new RegExp("a=rtpmap:(\\d+) [a-zA-Z0-9-]+\\/\\d+", "i"),
                    c = a.match(b);
                return c && 2 === c.length ? c[1] : null
            }

            function f(a, b) {
                var c = a.split(" "),
                    d = c.slice(0, 3);
                d.push(b);
                for (var e = 3; e < c.length; e++) c[e] !== b && d.push(c[e]);
                return d.join(" ")
            }

            function g(c, d, f) {
                var g = c.split("\r\n"),
                    h = a(g, "m=", d);
                if (null === h) return e.Logger.debug("Failed to add bandwidth line to sdp, as no m-line found"), c;
                var i = b(g, h + 1, -1, "m=");
                null === i && (i = g.length);
                var j = b(g, h + 1, i, "c=");
                if (null === j) return e.Logger.debug("Failed to add bandwidth line to sdp, as no c-line found"), c;
                var k = b(g, j + 1, i, "b=AS");
                k && g.splice(k, 1);
                var l = "b=AS:" + f;
                return g.splice(j + 1, 0, l), c = g.join("\r\n")
            }
            var h = "3.3",
                i = function(a) {
                    "use strict";
                    var b = 0,
                        c = [];
                    return navigator.mozGetUserMedia ? a.forEach(function(d, e) {
                        var f, g = !1;
                        e.indexOf("outbound_rtp_audio_") >= 0 ? (g = !0, f = {
                            type: "ssrc_audio_send",
                            id: d.id,
                            stats: {
                                bytes_sent: d.bytesSent,
                                codec_name: "",
                                packets_sent: d.packetsSent,
                                packets_lost: a.get("outbound_rtcp_audio_" + e.slice(19)).packetsLost,
                                rtt_ms: a.get("outbound_rtcp_audio_" + e.slice(19)).mozRtt
                            }
                        }) : e.indexOf("outbound_rtp_video_") >= 0 ? (g = !0, f = {
                            type: "ssrc_video_send",
                            id: d.id,
                            stats: {
                                bytes_sent: d.bytesSent,
                                codec_name: "",
                                packets_sent: d.packetsSent,
                                packets_lost: a.get("outbound_rtcp_video_" + e.slice(19)).packetsLost,
                                firs_rcvd: -1,
                                plis_rcvd: -1,
                                nacks_rcvd: -1,
                                send_frame_width: -1,
                                send_frame_height: -1,
                                adapt_reason: -1,
                                adapt_changes: -1,
                                framerate_sent: d.framerateMean,
                                rtt_ms: a.get("outbound_rtcp_video_" + e.slice(19)).mozRtt
                            }
                        }) : e.indexOf("inbound_rtp_audio_") >= 0 ? (g = !0, f = {
                            type: "ssrc_audio_recv",
                            id: d.id,
                            stats: {
                                bytes_rcvd: d.bytesReceived,
                                delay_estimated_ms: -1,
                                packets_rcvd: d.packetsReceived,
                                packets_lost: d.packetsLost,
                                codec_name: ""
                            }
                        }) : e.indexOf("inbound_rtp_video_") >= 0 && (g = !0, f = {
                            type: "ssrc_video_recv",
                            id: d.id,
                            stats: {
                                bytes_rcvd: d.bytesReceived,
                                packets_rcvd: d.packetsReceived,
                                packets_lost: d.packetsLost,
                                firs_sent: -1,
                                nacks_sent: -1,
                                plis_sent: -1,
                                frame_width: -1,
                                frame_height: -1,
                                framerate_rcvd: d.framerateMean,
                                framerate_output: -1,
                                current_delay_ms: -1,
                                codec_name: ""
                            }
                        }), g && (c[b] = f, b++)
                    }) : a.forEach(function(a) {
                        var d, e = !1;
                        if ("ssrc" === a.type)
                            if (e = !0, a.bytesSent)
                                if (a.googFrameHeightSent) {
                                    var f;
                                    f = a.googCpuLimitedResolution === !0 ? 1 : a.googBandwidthLimitedResolution === !0 ? 2 : a.googViewLimitedResolution === !0 ? 3 : 99, d = {
                                        type: "ssrc_video_send",
                                        id: a.id,
                                        stats: {
                                            bytes_sent: a.bytesSent,
                                            codec_name: a.googCodecName,
                                            packets_sent: a.packetsSent,
                                            packets_lost: a.packetsLost,
                                            firs_rcvd: a.googFirsReceived,
                                            plis_rcvd: a.googPlisReceived,
                                            nacks_rcvd: a.googNacksReceived,
                                            send_frame_width: a.googFrameWidthSent,
                                            send_frame_height: a.googFrameHeightSent,
                                            adapt_reason: f,
                                            adapt_changes: a.googAdaptationChanges,
                                            framerate_sent: a.googFrameRateSent,
                                            rtt_ms: a.googRtt
                                        }
                                    }
                                } else d = {
                                    type: "ssrc_audio_send",
                                    id: a.id,
                                    stats: {
                                        bytes_sent: a.bytesSent,
                                        codec_name: a.googCodecName,
                                        packets_sent: a.packetsSent,
                                        packets_lost: a.packetsLost,
                                        rtt_ms: a.googRtt
                                    }
                                };
                        else d = a.googFrameHeightReceived ? {
                            type: "ssrc_video_recv",
                            id: a.id,
                            stats: {
                                bytes_rcvd: a.bytesReceived,
                                packets_rcvd: a.packetsReceived,
                                packets_lost: a.packetsLost,
                                firs_sent: a.googFirsSent,
                                nacks_sent: a.googNacksSent,
                                plis_sent: a.googPlisSent,
                                frame_width: a.googFrameWidthReceived,
                                frame_height: a.googFrameHeightReceived,
                                framerate_rcvd: a.googFrameRateReceived,
                                framerate_output: a.googFrameRateDecoded,
                                current_delay_ms: a.googCurrentDelayMs,
                                codec_name: a.googCodecName
                            }
                        } : {
                            type: "ssrc_audio_recv",
                            id: a.id,
                            stats: {
                                bytes_rcvd: a.bytesReceived,
                                delay_estimated_ms: a.googCurrentDelayMs,
                                packets_rcvd: a.packetsReceived,
                                packets_lost: a.packetsLost,
                                codec_name: a.googCodecName
                            }
                        };
                        else "VideoBwe" === a.type && (e = !0, d = {
                            type: "VideoBWE",
                            id: "",
                            stats: {
                                available_send_bandwidth: a.googAvailableSendBandwidth,
                                available_receive_bandwidth: a.googAvailableReceiveBandwidth,
                                transmit_bitrate: a.googTransmitBitrate,
                                retransmit_bitrate: a.googRetransmitBitrate
                            }
                        });
                        e && (c[b] = d, b++)
                    }), c
                },
                j = function(a) {
                    for (var b = 0, c = 0, d = {}, e = [], f = [], g = !1, h = a.result(), i = 0; i < h.length; i++) {
                        var j = h[i];
                        if ("ssrc" === j.type)
                            if (j.stat("bytesSent"))
                                if (j.stat("googFrameHeightSent"));
                                else {
                                    g = !0;
                                    var k = {};
                                    k.ssrc = j.id, k.level = j.stat("audioInputLevel"), e[b] = k, b++
                                } else if (j.stat("googFrameHeightReceived"));
                        else {
                            g = !0;
                            var k = {};
                            k.ssrc = j.id, k.level = j.stat("audioOutputLevel"), f[c] = k, c++
                        }
                    }
                    return g && (b > 0 && (d.audioInputLevels = e), c > 0 && (d.audioOutputLevels = f)), d
                },
                k = function(b, d, g) {
                    if (!d || !g) return e.Logger.warning("Media type or codec name is not provided."), b;
                    var h = b.split("\r\n"),
                        i = a(h, "m=", d);
                    if (null === i) return b;
                    var j = c(h, g);
                    return j && (h[i] = f(h[i], j)), b = h.join("\r\n")
                },
                l = function() {
                    var a = Object.create({});
                    a.sdk = {
                        version: h,
                        type: "JavaScript"
                    };
                    var b = navigator.userAgent,
                        c = /Firefox\/([0-9\.]+)/,
                        d = /Chrome\/([0-9\.]+)/,
                        e = /Edge\/([0-9\.]+)/,
                        f = d.exec(b);
                    f ? a.runtime = {
                        name: "Chrome",
                        version: f[1]
                    } : (f = c.exec(b)) ? a.runtime = {
                        name: "FireFox",
                        version: f[1]
                    } : (f = e.exec(b)) ? a.runtime = {
                        name: "Edge",
                        version: f[1]
                    } : a.runtime = {
                        name: "Unknown",
                        version: "Unknown"
                    };
                    var g = /Windows NT ([0-9\.]+)/,
                        i = /Intel Mac OS X ([0-9_\.]+)/,
                        j = /iPhone OS ([0-9_\.]+)/,
                        k = /X11; Linux/,
                        l = /Android( ([0-9\.]+))?/,
                        m = /CrOS/;
                    return (f = g.exec(b)) ? a.os = {
                        name: "Windows NT",
                        version: f[1]
                    } : (f = i.exec(b)) ? a.os = {
                        name: "Mac OS X",
                        version: f[1].replace(/_/g, ".")
                    } : (f = j.exec(b)) ? a.os = {
                        name: "iPhone OS",
                        version: f[1].replace(/_/g, ".")
                    } : (f = k.exec(b)) ? a.os = {
                        name: "Linux",
                        version: "Unknown"
                    } : (f = l.exec(b)) ? a.os = {
                        name: "Android",
                        version: f[1] || "Unknown"
                    } : (f = m.exec(b)) ? a.os = {
                        name: "Chrome OS",
                        version: "Unknown"
                    } : a.os = {
                        name: "Unknown",
                        version: "Unknown"
                    }, a
                };
            return {
                parseStats: i,
                parseAudioLevel: j,
                setPreferredCodec: k,
                setPreferredBitrate: g,
                sysInfo: l
            }
        }(), attachMediaStream = function() {
            e.Logger.warning("Global attachMediaStream is deprecated, pleause include woogeen.sdk.ui.js and use Woogeen.UI.attachMediaStream instead."), adapter.browserShim.attachMediaStream.apply(this, arguments)
        }, e.Base64 = function() {
            "use strict";
            var a, b, c, d, e, f, g, h, i, j, k, l;
            for (a = -1, b = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"], c = [], f = 0; f < b.length; f += 1) c[b[f]] = f;
            return g = function(a) {
                d = a, e = 0
            }, h = function() {
                var b;
                return d ? e >= d.length ? a : (b = 255 & d.charCodeAt(e), e += 1, b) : a
            }, i = function(c) {
                var d, e, f;
                for (g(c), d = "", e = new Array(3), f = !1; !f && (e[0] = h()) !== a;) e[1] = h(), e[2] = h(), d += b[e[0] >> 2], e[1] !== a ? (d += b[e[0] << 4 & 48 | e[1] >> 4], e[2] !== a ? (d += b[e[1] << 2 & 60 | e[2] >> 6], d += b[63 & e[2]]) : (d += b[e[1] << 2 & 60], d += "=", f = !0)) : (d += b[e[0] << 4 & 48], d += "=", d += "=", f = !0);
                return d
            }, j = function() {
                if (!d) return a;
                for (;;) {
                    if (e >= d.length) return a;
                    var b = d.charAt(e);
                    if (e += 1, c[b]) return c[b];
                    if ("A" === b) return 0
                }
            }, k = function(a) {
                return a = a.toString(16), 1 === a.length && (a = "0" + a), a = "%" + a, unescape(a)
            }, l = function(b) {
                var c, d, e;
                for (g(b), c = "", d = new Array(4), e = !1; !e && (d[0] = j()) !== a && (d[1] = j()) !== a;) d[2] = j(), d[3] = j(), c += k(d[0] << 2 & 255 | d[1] >> 4), d[2] !== a ? (c += k(d[1] << 4 & 255 | d[2] >> 2), d[3] !== a ? c += k(d[2] << 6 & 255 | d[3]) : e = !0) : e = !0;
                return c
            }, {
                encodeBase64: i,
                decodeBase64: l
            }
        }(), e.Logger = function() {
            "use strict";
            var a, b, c, d, e, f, g, h = 0,
                i = 1,
                j = 2,
                k = 3,
                l = 4,
                m = 5,
                n = h;
            return a = function(a) {
                a > m ? a = m : h > a && (a = h), n = a
            }, b = function() {
                var a = arguments[0],
                    b = arguments;
                if (!(n > a)) {
                    switch (a) {
                        case h:
                            b[0] = "DEBUG:";
                            break;
                        case i:
                            b[0] = "TRACE:";
                            break;
                        case j:
                            b[0] = "INFO:";
                            break;
                        case k:
                            b[0] = "WARNING:";
                            break;
                        case l:
                            b[0] = "ERROR:";
                            break;
                        default:
                            return
                    }
                    console.log.apply(console, b)
                }
            }, c = function() {
                for (var a = [h], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, d = function() {
                for (var a = [i], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, e = function() {
                for (var a = [j], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, f = function() {
                for (var a = [k], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, g = function() {
                for (var a = [l], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, {
                DEBUG: h,
                TRACE: i,
                INFO: j,
                WARNING: k,
                ERROR: l,
                NONE: m,
                setLogLevel: a,
                log: b,
                debug: c,
                trace: d,
                info: e,
                warning: f,
                error: g
            }
        }(),
        function() {
            "use strict";

            function b(a) {
                this.mediaStream = a.mediaStream, a.attributes = a.attributes || {}, this.url = function() {
                    return "string" == typeof a.url && "" !== a.url ? a.url : void 0
                }, this.hasVideo = function() {
                    return !!a.video
                }, this.hasAudio = function() {
                    return !!a.audio
                }, this.attributes = function() {
                    return a.attributes
                }, this.attr = function(b, c) {
                    return arguments.length > 1 && (a.attributes[b] = c), a.attributes[b]
                }, this.id = function() {
                    return a.id || null
                }, this.isScreen = function() {
                    return !!a.video && "screen" === a.video.device
                }, this.bitRate = {
                    maxVideoBW: void 0,
                    maxAudioBW: void 0
                }, this.toJson = function() {
                    return {
                        id: this.id(),
                        audio: a.audio,
                        video: a.video,
                        attributes: a.attributes
                    }
                }
            }

            function c(a) {
                b.call(this, a)
            }

            function f(a) {
                b.call(this, a), this.isMixed = function() {
                    return !1
                }, this.from = a.from;
                var c = {},
                    d = this;
                Object.defineProperties(this, {
                    on: {
                        get: function() {
                            return function(a, b) {
                                return c[a] = c[a] || [], c[a].push(b), d
                            }
                        }
                    },
                    emit: {
                        get: function() {
                            return function(a) {
                                if (c[a]) {
                                    var b = [].slice.call(arguments, 1);
                                    c[a].map(function(a) {
                                        a.apply(d, b)
                                    })
                                }
                                return d
                            }
                        }
                    },
                    removeListener: {
                        get: function() {
                            return function(a, b) {
                                return void 0 === b ? c[a] = [] : c[a] && c[a].map(function(d, e) {
                                    d === b && c[a].splice(e, 1)
                                }), d
                            }
                        }
                    },
                    clearListeners: {
                        get: function() {
                            return function() {
                                return c = {}, d
                            }
                        }
                    }
                })
            }

            function g(a) {
                f.call(this, a), this.resolutions = function() {
                    return a.video.resolutions instanceof Array ? a.video.resolutions.map(function(a) {
                        return a
                    }) : []
                }, this.isMixed = function() {
                    return !0
                }
            }

            function h(a) {
                this.url = function() {
                    return "string" == typeof a.url && "" !== a.url ? a.url : void 0
                }, this.id = function() {
                    return a.id || null
                }, this.hasVideo = function() {
                    return !!a.video
                }, this.hasAudio = function() {
                    return !!a.audio
                }, this.toJson = function() {
                    var b;
                    return a.video === !0 ? b = {
                        device: "camera"
                    } : a.video === !1 ? b = a.video : "object" == typeof a.video && (b = a.video, b.device = a.video.device || "camera"), {
                        id: this.id(),
                        audio: a.audio,
                        video: b,
                        url: this.url()
                    }
                }
            }

            function i() {
                return null !== a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) && a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] <= 35
            }

            function j() {
                return a.navigator.appVersion.indexOf("Trident") > -1
            }

            function k() {
                return null !== a.navigator.userAgent.match("Firefox")
            }

            function l() {
                return k() || null !== a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) && a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] >= 34
            }

            function m(a, b) {
                return {
                    width: a,
                    height: b
                }
            }

            function n(a, b) {
                if ("object" == typeof a && null !== a && void 0 !== a.url) {
                    var c = "URL for LocalStream is deprecated, please use ExternalStream instead.";
                    "function" == typeof console.warn ? console.warn(c) : e.Logger.warning(c);
                    var f = new d.LocalStream(a);
                    return void("function" == typeof b && b(null, f))
                }
                if ("function" != typeof q && !j()) return void("function" == typeof b && b({
                    code: 1100,
                    msg: "webrtc support not available"
                }));
                var g = arguments[3];
                void 0 === g && (g = 2);
                var h = {};
                if (null !== a && "object" == typeof a) {
                    if (!a.audio && !a.video) return void("function" == typeof b && b({
                        code: 1107,
                        msg: "At least one of audio and video must be requested."
                    }));
                    if (a.video) {
                        if ("object" != typeof a.video && a.video && (a.video = Object.create({})), "string" != typeof a.video.device && (a.video.device = "camera"), "screen" === a.video.device && !l() && "function" == typeof b) return void b({
                            code: 1103,
                            msg: "browser screen sharing not supported"
                        });
                        "object" == typeof a.video.resolution && void 0 !== a.video.resolution.width && void 0 !== a.video.resolution.height ? h.video = JSON.parse(JSON.stringify(m(a.video.resolution.width, a.video.resolution.height))) : h.video = JSON.parse(JSON.stringify(p[a.video.resolution] || p.unspecified)), "string" == typeof a.video.deviceId && (h.video.deviceId = a.video.deviceId), j() || i() || (a.video.frameRate instanceof Array && a.video.frameRate.length >= 2 ? h.video.frameRate = {
                            min: a.video.frameRate[0],
                            max: a.video.frameRate[1]
                        } : "number" == typeof a.video.frameRate ? h.video.frameRate = a.video.frameRate : e.Logger.warning("Invalid frame rate value, ignored."))
                    }
                    a.audio && (h.audio = !0)
                } else if ("function" == typeof b) return void b({
                    code: 1107,
                    msg: "USER_INPUT_INVALID"
                });
                var o = function(c) {
                        if (a.audio && 0 === c.getAudioTracks().length || a.video && 0 === c.getVideoTracks().length) {
                            for (var e = 0; e < c.getTracks().length; e++) c.getTracks()[e].stop();
                            var f = {
                                code: 1104,
                                msg: "Not all device requests are satisfied."
                            };
                            return void b(f)
                        }
                        a.mediaStream = c, a.id = c.id;
                        var g = new d.LocalStream(a);
                        if (a.video && "screen" === a.video.device) {
                            var i = c.getVideoTracks();
                            i.length > 0 && (i[0].onended = function() {
                                g.close()
                            })
                        }
                        if (h.video) switch (h.video.width) {
                            case 320:
                                g.bitRate.maxVideoBW = 512;
                                break;
                            case 640:
                                g.bitRate.maxVideoBW = 1024;
                                break;
                            case 1280:
                                g.bitRate.maxVideoBW = 2048
                        }
                        "function" == typeof b && b(null, g)
                    },
                    r = function(c) {
                        var d = {
                            code: 1100,
                            msg: c.name || c
                        };
                        switch (d.msg) {
                            case "Starting video failed":
                            case "TrackStartError":
                                if (a.video = {
                                        device: a.video.device,
                                        extensionId: a.video.extensionId
                                    }, g > 0) return void setTimeout(function() {
                                    n(a, b, g - 1)
                                }, 1);
                                d.msg = "MEDIA_OPTION_INVALID", d.code = 1104;
                                break;
                            case "DevicesNotFoundError":
                                d.msg = "DEVICES_NOT_FOUND", d.code = 1102;
                                break;
                            case "NotSupportedError":
                                d.msg = "NOT_SUPPORTED", d.code = 1105;
                                break;
                            case "PermissionDeniedError":
                                d.msg = "PERMISSION_DENIED", d.code = 1101;
                                break;
                            case "PERMISSION_DENIED":
                                d.code = 1101;
                                break;
                            case "ConstraintNotSatisfiedError":
                                d.msg = "CONSTRAINT_NOT_SATISFIED", d.code = 1106;
                                break;
                            default:
                                d.msg || (d.msg = "UNDEFINED")
                        }
                        "function" == typeof b && b(d)
                    };
                if (a.video && "screen" === a.video.device) {
                    if (k()) return void 0 !== h.video ? h.video.mediaSource = "window" : h.video = {
                        mediaSource: "window"
                    }, void q.apply(navigator, [h, o, r]);
                    var s = a.video.extensionId || "pndohhifhheefbpeljcmnhnkphepimhe";
                    h.audio = !1;
                    try {
                        chrome.runtime.sendMessage(s, {
                            getStream: !0
                        }, function(a) {
                            return void 0 === a ? void("function" == typeof b && b({
                                code: 1103,
                                msg: "screen sharing plugin inaccessible"
                            })) : (h.video.mandatory = h.video.mandatory || {}, h.video.mandatory.chromeMediaSource = "desktop", h.video.mandatory.chromeMediaSourceId = a.streamId, h.video.height && (h.video.mandatory.maxHeight = h.video.mandatory.minHeight = h.video.height, delete h.video.height), h.video.width && (h.video.mandatory.maxWidth = h.video.mandatory.minWidth = h.video.width, delete h.video.width), h.video.frameRate && ("object" == typeof h.video.frameRate ? (h.video.mandatory.minFrameRate = h.video.frameRate.min, h.video.mandatory.maxFrameRate = h.video.frameRate.max) : "number" == typeof h.video.frameRate ? (h.video.mandatory.minFrameRate = h.video.frameRate, h.video.mandatory.maxFrameRate = h.video.frameRate) : e.Logger.warning("Invalid frame rate value for screen sharing."), delete h.video.frameRate), void q.apply(navigator, [h, o, r]))
                        })
                    } catch (t) {
                        "function" == typeof b && b({
                            code: 1103,
                            msg: "screen sharing plugin inaccessible",
                            err: t
                        })
                    }
                } else j() ? navigator.getUserMedia(h, o, r) : q.apply(navigator, [h, o, r])
            }

            function o(a, b) {
                if ("object" != typeof a || !a.url) return void("function" == typeof b && b({
                    code: 1107,
                    msg: "External stream must have url property"
                }));
                if (!a.audio && !a.video) return void("function" == typeof b && b({
                    code: 1107,
                    msg: "External stream must have video or audio"
                }));
                var c = new d.ExternalStream(a);
                "function" == typeof b && b(null, c)
            }
            b.prototype.close = function() {
                "function" == typeof this.hide && this.hide(), this.mediaStream && this.mediaStream.getTracks().map(function(a) {
                    "function" == typeof a.stop && a.stop()
                }), this.mediaStream = null, "function" == typeof this.unpublish && this.unpublish(), this.channel && "function" == typeof this.channel.close && this.channel.close()
            }, b.prototype.createObjectURL = function() {
                return this.mediaStream ? (a.URL || webkitURL).createObjectURL(this.mediaStream) : ""
            }, b.prototype.disableAudio = function(a) {
                var b = this;
                if (b.hasAudio() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getAudioTracks().map(function(a) {
                        return a.enabled ? (a.enabled = !1, !0) : !1
                    });
                    var c = b.mediaStream.getAudioTracks();
                    if (c && c[a] && c[a].enabled) return c[a].enabled = !1, !0
                }
                return !1
            }, b.prototype.enableAudio = function(a) {
                var b = this;
                if (b.hasAudio() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getAudioTracks().map(function(a) {
                        return a.enabled !== !0 ? (a.enabled = !0, !0) : !1
                    });
                    var c = b.mediaStream.getAudioTracks();
                    if (c && c[a] && c[a].enabled !== !0) return c[a].enabled = !0, !0
                }
                return !1
            }, b.prototype.disableVideo = function(a) {
                var b = this;
                if (b.hasVideo() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getVideoTracks().map(function(a) {
                        return a.enabled ? (a.enabled = !1, !0) : !1
                    });
                    var c = b.mediaStream.getVideoTracks();
                    if (c && c[a] && c[a].enabled) return c[a].enabled = !1, !0
                }
                return !1
            }, b.prototype.enableVideo = function(a) {
                var b = this;
                if (b.hasVideo() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getVideoTracks().map(function(a) {
                        return a.enabled !== !0 ? (a.enabled = !0, !0) : !1
                    });
                    var c = b.mediaStream.getVideoTracks();
                    if (c && c[a] && c[a].enabled !== !0) return c[a].enabled = !0, !0
                }
                return !1
            }, b.prototype.updateConfiguration = function(a, b) {
                return void 0 !== a ? this.channel ? void this.channel.updateSpec(a, b) : "This stream has not been published, ignoring" : void 0
            }, c.prototype = Object.create(b.prototype), f.prototype = Object.create(b.prototype), g.prototype = Object.create(f.prototype), h.prototype = Object.create({}), c.prototype.constructor = c, f.prototype.constructor = f, g.prototype.constructor = g, h.prototype.constructor = h;
            var p = {
                    "true": {},
                    unspecified: {},
                    sif: m(320, 240),
                    vga: m(640, 480),
                    hd720p: m(1280, 720),
                    hd1080p: m(1920, 1080)
                },
                q = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            c.create = function() {
                n.apply(this, arguments)
            }, h.create = function() {
                o.apply(this, arguments)
            }, d.Stream = b, d.LocalStream = c, d.RemoteStream = f, d.RemoteMixedStream = g, d.ExternalStream = h
        }(),
        function() {
            function b() {
                var a = arguments[0];
                if ("function" == typeof a) {
                    var b = Array.prototype.slice.call(arguments, 1);
                    a.apply(null, b)
                }
            }

            function c(a) {
                a.session_id = d.sessionId += 1;
                var b = {};
                if (b.browser = l(), "mozilla" === b.browser) e.Logger.debug("Firefox Stack"), b = f.FirefoxStack(a);
                else if ("bowser" === b.browser) e.Logger.debug("Bowser Stack"), b = f.BowserStack(a);
                else if ("chrome-stable" === b.browser) e.Logger.debug("Stable!"), b = f.ChromeStableStack(a);
                else {
                    if ("edge" !== b.browser) throw e.Logger.debug("None!"), "WebRTC stack not available";
                    e.Logger.debug("Edge Stack"), b = f.EdgeORTCStack(a)
                }
                return b.updateSpec || (b.updateSpec = function(a, b) {
                    e.Logger.error("Update Configuration not implemented in this browser"), b && b("unimplemented")
                }), b
            }

            function g(a) {
                if (!a.video) return new d.RemoteStream(a);
                switch (a.video.device) {
                    case "mcu":
                        return new d.RemoteMixedStream(a);
                    default:
                        return new d.RemoteStream(a)
                }
            }

            function h(a, b, c) {
                if (!a || !a.connected) return c("socket not ready");
                try {
                    a.emit(b, function(a, b) {
                        return "success" === a ? c(null, b) : c(b || "response error")
                    })
                } catch (d) {
                    c("socket emit error")
                }
            }

            function i(a, b, c, d) {
                if (!a || !a.connected) return d("socket not ready");
                try {
                    a.emit(b, c, function(a, b) {
                        return "success" === a ? d(null, b) : d(b || "response error")
                    })
                } catch (e) {
                    d("socket emit error")
                }
            }

            function j(a, b, c, d, e) {
                if (!a || !a.connected) return e("error", "socket not ready");
                try {
                    a.emit(b, c, d, function(a, b) {
                        e(a, b)
                    })
                } catch (f) {
                    e("error", "socket emit error")
                }
            }

            function k(a, c, d, e, f) {
                var g = {
                    type: "control",
                    payload: {
                        action: c,
                        streamId: d
                    }
                };
                i(a, "customMessage", g, function(a, c) {
                    return a ? b(f, a) : void b(e, c)
                })
            }
            d.sessionId = 103;
            var l = function() {
                    var b = "none";
                    return null !== a.navigator.userAgent.match("Firefox") ? b = "mozilla" : null !== a.navigator.userAgent.match("Bowser") ? b = "bowser" : null !== a.navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) ? b = "edge" : null !== a.navigator.userAgent.match("Chrome") ? a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] >= 26 && (b = "chrome-stable") : null !== a.navigator.userAgent.match("Safari") ? b = "bowser" : null !== a.navigator.userAgent.match("WebKit") && (b = "bowser"), b
                },
                m = 0,
                n = 1,
                o = 2,
                p = function(a) {
                    this.internalDispatcher = d.EventDispatcher({}), this.spec = a || {}, this.remoteStreams = {}, this.localStreams = {}, this.state = m
                };
            p.prototype = d.EventDispatcher({}), p.prototype.setIceServers = function() {
                var a = this.spec;
                return a.userSetIceServers = [], Array.prototype.slice.call(arguments, 0).map(function(b) {
                    b instanceof Array ? b.map(function(b) {
                        "object" == typeof b && null !== b ? "string" == typeof b.urls && "" !== b.urls || b.urls instanceof Array ? a.userSetIceServers.push(b) : "string" == typeof b.url && "" !== b.url && (b.urls = b.url, delete b.url, a.userSetIceServers.push(b)) : "string" == typeof b && "" !== b && a.userSetIceServers.push({
                            urls: b
                        })
                    }) : "object" == typeof b && null !== b ? "string" == typeof b.urls && "" !== b.urls || b.urls instanceof Array ? a.userSetIceServers.push(b) : "string" == typeof b.url && "" !== b.url && (b.urls = b.url, delete b.url, a.userSetIceServers.push(b)) : "string" == typeof b && "" !== b && a.userSetIceServers.push({
                        urls: b
                    })
                }), a.userSetIceServers
            }, p.prototype.trasportMode = function(mode){
                var a = this.spec;
                a.transportPolicy = mode;
                console.log("Transport Mode", a.transportPolicy);
            }, p.prototype.getTrasportMode = function(){
                return this.spec.transportPolicy
            }, p.prototype.getIceServers = function() {
                return this.spec.userSetIceServers
            }, p.prototype.join = function(a, c, f) {
                var h;
                try {
                    h = JSON.parse(e.Base64.decodeBase64(a))
                } catch (i) {
                    return b(f, "invalid token")
                }
                var j = this,
                    k = h.secure === !0,
                    l = h.host.replace('8080', '443');
                if ("string" != typeof l) return b(f, "invalid host");
                if (-1 === l.indexOf("http") && (l = k ? "https://" + l : "http://" + l), j.state !== m) return b(f, "connection state invalid");
                j.state = n, void 0 !== j.socket ? j.socket.connect() : (j.socket = io.connect(l, {
                    reconnect: !1,
                    secure: k,
                    "force new connection": !0
                }), j.socket.on("add_stream", function(a) {
                    if (void 0 !== j.remoteStreams[a.id]) return void e.Logger.warning("stream already added:", a.id);
                    var b = g({
                            video: a.video,
                            audio: a.audio,
                            id: a.id,
                            from: a.from,
                            attributes: a.attributes
                        }),
                        c = new d.StreamEvent({
                            type: "stream-added",
                            stream: b
                        });
                    j.remoteStreams[a.id] = b, j.dispatchEvent(c)
                }), j.socket.on("update_stream", function(a) {
                    var b = j.remoteStreams[a.id];
                    b && b.emit(a.event, a.data)
                }), j.socket.on("remove_stream", function(a) {
                    var b = j.remoteStreams[a.id];
                    if (b) {
                        b.close(), delete j.remoteStreams[a.id];
                        var c = new d.StreamEvent({
                            type: "stream-removed",
                            stream: b
                        });
                        j.dispatchEvent(c)
                    }
                }), j.socket.on("signaling_message_erizo", function(a) {
                    var b;
                    b = a.peerId ? j.remoteStreams[a.peerId] : j.localStreams[a.streamId], b && b.channel && b.channel.processSignalingMessage(a.mess)
                }), j.socket.on("add_recorder", function(a) {
                    var b = new d.RecorderEvent({
                        type: "recorder-added",
                        id: a.id
                    });
                    j.dispatchEvent(b)
                }), j.socket.on("reuse_recorder", function(a) {
                    var b = new d.RecorderEvent({
                        type: "recorder-continued",
                        id: a.id
                    });
                    j.dispatchEvent(b)
                }), j.socket.on("remove_recorder", function(a) {
                    var b = new d.RecorderEvent({
                        type: "recorder-removed",
                        id: a.id
                    });
                    j.dispatchEvent(b)
                }), j.socket.on("disconnect", function() {
                    var a = !1;
                    j.state !== m ? (a = !0, e.Logger.info("Will trigger server-disconnect")) : e.Logger.info("Will not trigger server-disconnect"), j.state = m, j.myId = null;
                    var b, c;
                    for (b in j.remoteStreams) j.remoteStreams.hasOwnProperty(b) && (c = j.remoteStreams[b], c.close(), delete j.remoteStreams[b]);
                    for (b in j.localStreams) j.localStreams.hasOwnProperty(b) && (c = j.localStreams[b], c.channel && "function" == typeof c.channel.close && c.channel.close(), delete j.localStreams[b]);
                    try {
                        j.socket.disconnect()
                    } catch (f) {}
                    if (a) {
                        var g = new d.ClientEvent({
                            type: "server-disconnected"
                        });
                        j.dispatchEvent(g)
                    }
                }), j.socket.on("user_join", function(a) {
                    var b = new d.ClientEvent({
                        type: "user-joined",
                        user: a.user
                    });
                    j.dispatchEvent(b)
                }), j.socket.on("user_leave", function(a) {
                    var b = new d.ClientEvent({
                        type: "user-left",
                        user: a.user
                    });
                    j.dispatchEvent(b)
                }), j.socket.on("custom_message", function(a) {
                    var b = new d.MessageEvent({
                        type: "message-received",
                        msg: a
                    });
                    j.dispatchEvent(b)
                }), j.socket.on("connect_failed", function(a) {
                    b(f, a || "connection_failed")
                }), j.socket.on("error", function(a) {
                    b(f, a || "connection_error")
                }), j.socket.on("connection_failed", function(a) {
                    if (e.Logger.error("MCU reports connection failed for stream: " + a.streamId), void 0 !== j.localStreams[a.streamId]) {
                        var b = j.localStreams[a.streamId];
                        j.unpublish(b), delete j.localStreams[a.streamId]
                    } else j.unsubscribe(j.remoteStreams[a.streamId]);
                    if (j.state !== m) {
                        var c = new d.StreamEvent({
                            type: "stream-failed"
                        });
                        j.dispatchEvent(c)
                    }
                }), j.socket.on("stream-publish", function(a) {
                    var b = j.localStreams[a.id];
                    b && (console.log("Stream published"), j.dispatchEvent(new d.StreamEvent({
                        type: "stream-published",
                        stream: b
                    })))
                }));
                try {
                    var p = {
                        token: a,
                        userAgent: d.Common.sysInfo()
                    };
                    j.socket.emit("login", p, function(a, d) {
                        if ("success" === a) {
                            j.myId = d.clientId, j.conferenceId = d.id, j.state = o;
                            var e = [];
                            j.conferenceId = d.id, void 0 !== d.streams && (e = d.streams.map(function(a) {
                                return j.remoteStreams[a.id] = g(a), j.remoteStreams[a.id]
                            }));
                            var h;
                            if (void 0 !== d.users)
                                for (var i = 0; i < d.users.length; i++)
                                    if (d.users[i].id === d.clientId) {
                                        h = d.users[i];
                                        break
                                    }
                            return b(c, {
                                streams: e,
                                users: d.users,
                                self: h
                            })
                        }
                        return b(f, d || "response error")
                    })
                } catch (q) {
                    b(f, "socket emit error")
                }
            }, p.prototype.publish = function(a, f, g, h) {
                var l = this;
                if (a = a || {}, "function" == typeof f ? (h = g, g = f, f = a.bitRate) : "object" == typeof f && null !== f || (f = a.bitRate), !(a instanceof d.LocalStream || a instanceof d.ExternalStream) || ("object" != typeof a.mediaStream || null === a.mediaStream) && void 0 === a.url()) return b(h, "invalid stream");
                if (void 0 !== l.localStreams[a.id()]) return b(h, "already published");
                var m = a.toJson();
                return f.unmix === !0 && (m.unmix = !0), void 0 !== a.url() ? (m.state = "url", m.transport = f.transport, m.bufferSize = f.bufferSize, void j(l.socket, "publish", m, a.url(), function(c, d) {
                    return "success" !== c ? b(h, c) : (a.id = function() {
                        return d
                    }, a.unpublish = function(b, c) {
                        l.unpublish(a, b, c)
                    }, l.localStreams[d] = a, void b(g, a))
                })) : (m.state = "erizo", void j(l.socket, "publish", m, void 0, function(d, m) {
                    if ("error" === d) return b(h, m);
                    if ("timeout" === d) return b(h, d);
                    a.id = function() {
                        return m
                    }, l.localStreams[m] = a, a.channel = c({
                        callback: function(a) {
                            console.log("Sending message", a), j(l.socket, "signaling_message", {
                                streamId: m,
                                msg: a
                            }, void 0, function() {})
                        },
                        video: a.hasVideo(),
                        audio: a.hasAudio(),
                        iceServers: l.getIceServers(),
                        customTransportPolicy: l.getTrasportMode(),
                        maxAudioBW: f.maxAudioBW,
                        maxVideoBW: f.maxVideoBW,
                        audioCodec: f.audioCodec,
                        videoCodec: f.videoCodec
                    });
                    var n = function() {
                            a.signalOnPlayAudio = function(a, b) {
                                k(l.socket, "audio-out-on", m, a, b)
                            }, a.signalOnPauseAudio = function(a, b) {
                                k(l.socket, "audio-out-off", m, a, b)
                            }, a.signalOnPlayVideo = function(a, b) {
                                k(l.socket, "video-out-on", m, a, b)
                            }, a.signalOnPauseVideo = function(a, b) {
                                k(l.socket, "video-out-off", m, a, b)
                            }, a.unpublish = function(b, c) {
                                l.unpublish(a, b, c)
                            }, b(g, a), h = function() {}, n = function() {}
                        },
                        o = function() {
                            i(l.socket, "unpublish", m, function() {}, function() {}), a.channel.close(), a.channel = void 0, b(h, "peer connection failed"), n = function() {}, o = function() {}
                        };
                    a.channel.oniceconnectionstatechange = function(a) {
                        switch (a) {
                            case "completed":
                            case "connected":
                                n();
                                break;
                            case "checking":
                            case "closed":
                                break;
                            case "failed":
                                o();
                                break;
                            default:
                                e.Logger.warning("unknown ice connection state:", a)
                        }
                    }, a.channel.addStream(a.mediaStream), a.channel.createOffer()
                }))
            }, p.prototype.unpublish = function(a, c, e) {
                var f = this;
                return a instanceof d.LocalStream || a instanceof d.ExternalStream ? void i(f.socket, "unpublish", a.id(), function(d) {
                    return d ? b(e, d) : (a.channel && "function" == typeof a.channel.close && (a.channel.close(), a.channel = null), delete f.localStreams[a.id()], a.id = function() {
                        return null
                    }, a.signalOnPlayAudio = void 0, a.signalOnPauseAudio = void 0, a.signalOnPlayVideo = void 0, a.signalOnPauseVideo = void 0, delete a.unpublish, void b(c, null))
                }) : b(e, "invalid stream")
            }, p.prototype.subscribe = function(a, f, g, h) {
                var m = this,
                    n = !1,
                    o = !1;
                return "function" == typeof f ? (h = g, g = f, f = {}) : "object" == typeof f && null !== f || (f = {}), a instanceof d.RemoteStream ? f.audio === !1 && f.video === !1 ? b(h, "no audio or video to subscribe.") : a.isMixed() || "object" != typeof f.video || !f.video.resolution && !f.video.qualityLevel ? ("object" == typeof f.video && f.video.qualityLevel && (f.video.quality_level = f.video.qualityLevel, delete f.video.qualityLevel), void j(m.socket, "subscribe", {
                    streamId: a.id(),
                    audio: a.hasAudio() && f.audio !== !1,
                    video: a.hasVideo() && f.video,
                    browser: l()
                }, void 0, function(d, l) {
                    if ("error" === d || "timeout" === d) return b(h, l || d);
                    a.channel = c({
                        callback: function(b) {
                            j(m.socket, "signaling_message", {
                                streamId: a.id(),
                                msg: b,
                                browser: a.channel.browser
                            }, void 0, function() {})
                        },
                        audio: a.hasAudio() && f.audio !== !1,
                        video: a.hasVideo() && f.video !== !1,
                        iceServers: m.getIceServers(),
                        customTransportPolicy: m.getTrasportMode(),
                        videoCodec: f.videoCodec
                    }), a.channel.onaddstream = function(c) {
                        a.mediaStream = c.stream, o && n === !1 ? (n = !0, b(g, a)) : n = !0
                    };
                    var p = function() {
                            a.signalOnPlayAudio = function(b, c) {
                                k(m.socket, "audio-in-on", a.id(), b, c)
                            }, a.signalOnPauseAudio = function(b, c) {
                                k(m.socket, "audio-in-off", a.id(), b, c)
                            }, a.signalOnPlayVideo = function(b, c) {
                                k(m.socket, "video-in-on", a.id(), b, c)
                            }, a.signalOnPauseVideo = function(b, c) {
                                k(m.socket, "video-in-off", a.id(), b, c)
                            }, n && o === !1 ? (o = !0, b(g, a)) : o = !0, h = function() {}, p = function() {}
                        },
                        q = function() {
                            i(m.socket, "unsubscribe", a.id(), function() {}, function() {}), a.close(), a.signalOnPlayAudio = void 0, a.signalOnPauseAudio = void 0, a.signalOnPlayVideo = void 0, a.signalOnPauseVideo = void 0, b(h, "peer connection failed"), p = function() {}, q = function() {}
                        };
                    a.channel.oniceconnectionstatechange = function(a) {
                        switch (a) {
                            case "completed":
                            case "connected":
                                p();
                                break;
                            case "checking":
                            case "closed":
                                break;
                            case "failed":
                                q();
                                break;
                            default:
                                e.Logger.warning("unknown ice connection state:", a)
                        }
                    }, a.channel.createOffer(!0)
                })) : b(h, "Resolution and quality level settings are not available for non-mixed stream.") : b(h, "invalid stream")
            }, p.prototype.unsubscribe = function(a, c, e) {
                var f = this;
                return a instanceof d.RemoteStream ? void i(f.socket, "unsubscribe", a.id(), function(d, f) {
                    return d ? b(e, d) : (a.close(), a.signalOnPlayAudio = void 0, a.signalOnPauseAudio = void 0, a.signalOnPlayVideo = void 0, a.signalOnPauseVideo = void 0, void b(c, f))
                }) : b(e, "invalid stream")
            }, p.prototype.onMessage = function(a) {
                "function" == typeof a && this.on("message-received", a)
            }, d.ConferenceClient = function() {
                "use strict";
                var a = function(a) {
                    p.call(this, a), this.join = function(a, b, c) {
                        p.prototype.join.call(this, a, b, c)
                    }, this.leave = function() {
                        h(this.socket, "logout", function(a) {
                            a && e.Logger.warning("Server returns error for logout event")
                        }), this.socket.disconnect()
                    }, this.send = function(a, c, d, e) {
                        if (void 0 === a || null === a || "function" == typeof a) return b(e, "nothing to send");
                        if ("undefined" == typeof c) c = "all";
                        else if ("string" == typeof c);
                        else {
                            if ("function" != typeof c) return b(e, "invalid receiver");
                            e = d, d = c, c = "all"
                        }
                        i(this.socket, "customMessage", {
                            type: "data",
                            data: a,
                            receiver: c
                        }, function(a, c) {
                            return a ? b(e, a) : void b(d, c)
                        })
                    }, this.mix = function(a, c, e) {
                        return a instanceof d.LocalStream || a instanceof d.ExternalStream ? void i(this.socket, "addToMixer", a.id(), function(a) {
                            return a ? b(e, a) : void b(c, null)
                        }) : b(e, "invalid stream")
                    }, this.unmix = function(a, c, e) {
                        return a instanceof d.LocalStream || a instanceof d.ExternalStream ? void i(this.socket, "removeFromMixer", a.id(), function(a) {
                            return a ? b(e, a) : void b(c, null)
                        }) : b(e, "invalid stream")
                    }, this.shareScreen = function(a, c, e) {
                        var f = this;
                        "function" == typeof a && (e = c, c = a, a = {}), a = a || {}, d.LocalStream.create({
                            video: {
                                device: "screen",
                                extensionId: a.extensionId,
                                resolution: a.resolution ? a.resolution : {
                                    width: screen.width,
                                    height: screen.height
                                },
                                frameRate: a.frameRate
                            },
                            audio: !1
                        }, function(d, g) {
                            return d ? b(e, d) : void f.publish(g, {
                                maxVideoBW: a.maxVideoBW,
                                videoCodec: a.videoCodec
                            }, function(a) {
                                b(c, a)
                            }, function(a) {
                                b(e, a)
                            })
                        })
                    }, this.playAudio = function(a, b, c) {
                        return a instanceof d.Stream && a.hasAudio() && "function" == typeof a.signalOnPlayAudio ? a.signalOnPlayAudio(b, c) : void("function" == typeof c && c("unable to call playAudio"))
                    }, this.pauseAudio = function(a, b, c) {
                        return a instanceof d.Stream && a.hasAudio() && "function" == typeof a.signalOnPauseAudio ? a.signalOnPauseAudio(b, c) : void("function" == typeof c && c("unable to call pauseAudio"))
                    }, this.playVideo = function(a, b, c) {
                        return a instanceof d.Stream && a.hasVideo() && "function" == typeof a.signalOnPlayVideo ? a.signalOnPlayVideo(b, c) : void("function" == typeof c && c("unable to call playVideo"))
                    }, this.pauseVideo = function(a, b, c) {
                        return a instanceof d.Stream && a.hasVideo() && "function" == typeof a.signalOnPauseVideo ? a.signalOnPauseVideo(b, c) : void("function" == typeof c && c("unable to call pauseVideo"))
                    }, this.addExternalOutput = function(a, c, d, e) {
                        var f = this;
                        "function" == typeof c ? (e = d, d = c, c = {}) : "object" == typeof c && null !== c || (c = {}), c.url = a, c.video && c.video.resolution && (c.resolution = c.video.resolution), i(f.socket, "addExternalOutput", c, function(a) {
                            return a ? b(e, a) : void b(d)
                        })
                    }, this.updateExternalOutput = function(a, c, d, e) {
                        var f = this;
                        "function" == typeof c ? (e = d, d = c, c = {}) : "object" == typeof c && null !== c || (c = {}), c.url = a, c.video && c.video.resolution && (c.resolution = c.video.resolution), i(f.socket, "updateExternalOutput", c, function(a) {
                            return a ? b(e, a) : void b(d)
                        })
                    }, this.removeExternalOutput = function(a, c, d) {
                        var e = this;
                        return "string" != typeof a ? void b(d, "URL should be string.") : void i(e.socket, "removeExternalOutput", {
                            url: a
                        }, function(a) {
                            return a ? b(d, a) : void b(c)
                        })
                    }, this.startRecorder = function(a, c, d) {
                        var e = this;
                        "function" == typeof a ? (d = c, c = a, a = {}) : "object" == typeof a && null !== a || (a = {}), i(e.socket, "startRecorder", a, function(a, e) {
                            return a ? b(d, a) : void b(c, e)
                        })
                    }, this.stopRecorder = function(a, c, d) {
                        var e = this;
                        "function" == typeof a ? (d = c, c = a, a = {}) : "object" == typeof a && null !== a || (a = {}), i(e.socket, "stopRecorder", a, function(a, e) {
                            return a ? b(d, a) : void b(c, e)
                        })
                    }, this.getRegion = function(a, c, d) {
                        var e = this;
                        return "object" != typeof a || null === a || "string" != typeof a.id || "" === a.id ? b(d, "invalid options") : void i(e.socket, "getRegion", {
                            id: a.id
                        }, function(a, e) {
                            return a ? b(d, a) : void b(c, e)
                        })
                    }, this.setRegion = function(a, c, d) {
                        var e = this;
                        return "object" != typeof a || null === a || "string" != typeof a.id || "" === a.id || "string" != typeof a.region || "" === a.region ? b(d, "invalid options") : void i(e.socket, "setRegion", {
                            id: a.id,
                            region: a.region
                        }, function(a, e) {
                            return a ? b(d, a) : void b(c, e)
                        })
                    }, this.setVideoBitrate = function(a, c, d) {
                        var e = this;
                        "function" == typeof a ? (d = c, c = a, a = {}) : "object" == typeof a && null !== a || (a = {}), i(e.socket, "setVideoBitrate", a, function(a, e) {
                            return a ? b(d, a) : void b(c, e)
                        })
                    }, this.getConnectionStats = function(a, c, d) {
                        a.channel && "function" == typeof a.channel.getConnectionStats ? a.channel.getConnectionStats(function(a) {
                            b(c, a)
                        }, function(a) {
                            b(d, a)
                        }) : b(d, "invalid stream.")
                    }
                };
                return a.prototype = Object.create(p.prototype), a.prototype.constructor = a, a.create = function(b) {
                    return new a(b)
                }, a
            }(), d.SipClient = function() {
                var a = function(a) {
                    p.call(this, a), this.sip = !0, this.join = function(a, b, c) {
                        a.host = this.spec.host, a.secure = this.spec.secure, a = e.Base64.encodeBase64(JSON.stringify(a)), p.prototype.join.call(this, a, b, c)
                    }, this.subscribe = function(a, b, c, e) {
                        var f = this;
                        "function" == typeof b ? (e = c, c = b, b = {}) : "object" == typeof b && null !== b || (b = {});
                        var g = function(a) {
                            f.dispatchEvent(new d.StreamEvent({
                                type: "stream-subscribed",
                                stream: a
                            })), c(a)
                        };
                        p.prototype.subscribe.call(this, a, b, g, e)
                    }, this.acceptCall = function(a, c) {
                        var d = this,
                            e = {
                                type: "acceptCall"
                            };
                        i(d.socket, "customMessage", e, function(d, e) {
                            return d ? b(c, d) : void b(a, e)
                        })
                    }, this.rejectCall = function(a, c) {
                        var d = this,
                            e = {
                                type: "rejectCall"
                            };
                        i(d.socket, "customMessage", e, function(d, e) {
                            return d ? b(c, d) : void b(a, e)
                        })
                    }, this.hangupCall = function(a, c) {
                        var d = this,
                            e = {
                                type: "hangupCall"
                            };
                        i(d.socket, "customMessage", e, function(d, e) {
                            return d ? b(c, d) : void b(a, e)
                        })
                    }, this.makeCall = function(a, c, d) {
                        var e = this,
                            f = {
                                type: "makeCall",
                                payload: a
                            };
                        i(e.socket, "customMessage", f, function(a, e) {
                            return a ? b(d, a) : void b(c, e)
                        })
                    }
                };
                return a.prototype = Object.create(p.prototype), a.prototype.constructor = a, a.create = function(b) {
                    return new a(b)
                }, a
            }()
        }(), f.ChromeStableStack = function(a) {
            "use strict";
            var b = {},
                c = RTCPeerConnection;
            b.pc_config = {
                iceServers: [],
                iceTransportPolicy: a.customTransportPolicy,
            }, b.con = {
                optional: [{
                    DtlsSrtpKeyAgreement: !0
                }]
            }, a.iceServers instanceof Array && (b.pc_config.iceServers = a.iceServers), void 0 === a.audio && (a.audio = !0), void 0 === a.video && (a.video = !0), b.mediaConstraints = {
                mandatory: {
                    OfferToReceiveVideo: a.video,
                    OfferToReceiveAudio: a.audio
                }
            };
            var f = function(a) {
                console.log("Error in Stack ", a)
            };
            b.peerConnection = new c(b.pc_config, b.con);
            var g = function(b) {
                    var c, d;
                    return a.video && a.maxVideoBW && (b = b.replace(/b=AS:.*\r\n/g, ""), c = b.match(/m=video.*\r\n/), null == c && (c = b.match(/m=video.*\n/)), c && c.length > 0 && (d = c[0] + "b=AS:" + a.maxVideoBW + "\r\n", b = b.replace(c[0], d))), a.audio && a.maxAudioBW && (c = b.match(/m=audio.*\r\n/), null == c && (c = b.match(/m=audio.*\n/)), c && c.length > 0 && (d = c[0] + "b=AS:" + a.maxAudioBW + "\r\n", b = b.replace(c[0], d))), b
                },
                h = function(b) {
                    return a.audioCodec ? d.Common.setPreferredCodec(b, "audio", a.audioCodec) : b
                },
                i = function(b) {
                    return a.videoCodec ? d.Common.setPreferredCodec(b, "video", a.videoCodec) : b
                },
                j = function(a) {
                    var b = h(a);
                    return b = i(b)
                };
            b.close = function() {
                b.state = "closed", "closed" !== b.peerConnection.signalingState && b.peerConnection.close()
            }, a.localCandidates = [], b.peerConnection.onicecandidate = function(b) {
                if (b.candidate) {
                    b.candidate.candidate.match(/a=/) || (b.candidate.candidate = "a=" + b.candidate.candidate);
                    var c = {
                        sdpMLineIndex: b.candidate.sdpMLineIndex,
                        sdpMid: b.candidate.sdpMid,
                        candidate: b.candidate.candidate
                    };
                    a.remoteDescriptionSet ? a.callback({
                        type: "candidate",
                        candidate: c
                    }) : (a.localCandidates.push(c), e.Logger.info("Storing candidate: ", a.localCandidates.length, c))
                } else console.log("End of candidates.")
            }, b.peerConnection.onaddstream = function(a) {
                b.onaddstream && b.onaddstream(a)
            }, b.peerConnection.onremovestream = function(a) {
                b.onremovestream && b.onremovestream(a)
            }, b.peerConnection.oniceconnectionstatechange = function(a) {
                b.oniceconnectionstatechange && b.oniceconnectionstatechange(a.currentTarget.iceConnectionState)
            };
            var k, l, m = function(b) {
                    b.sdp = g(b.sdp), b.sdp = j(b.sdp.replace(/a=ice-options:google-ice\r\n/g, "")), a.callback({
                        type: b.type,
                        sdp: b.sdp
                    }), k = b
                },
                n = function(c) {
                    c.sdp = g(c.sdp), a.callback({
                        type: c.type,
                        sdp: c.sdp
                    }), k = c, b.peerConnection.setLocalDescription(c)
                };
            return b.updateSpec = function(c, d) {
                (c.maxVideoBW || c.maxAudioBW) && (c.maxVideoBW && (console.log("Maxvideo Requested", c.maxVideoBW), a.maxVideoBW = c.maxVideoBW), c.maxAudioBW && (console.log("Maxaudio Requested", c.maxAudioBW), a.maxAudioBW = c.maxAudioBW), k.sdp = g(k.sdp), b.peerConnection.setLocalDescription(k, function() {
                    l.sdp = g(l.sdp), b.peerConnection.setRemoteDescription(new RTCSessionDescription(l), function() {
                        a.remoteDescriptionSet = !0, d && d("success")
                    })
                }))
            }, b.createOffer = function(a) {
                a === !0 ? b.peerConnection.createOffer(m, f, b.mediaConstraints) : b.peerConnection.createOffer(m, f)
            }, b.addStream = function(a) {
                b.peerConnection.addStream(a)
            }, a.remoteCandidates = [], a.remoteDescriptionSet = !1, b.processSignalingMessage = function(c) {
                if ("offer" === c.type) c.sdp = g(c.sdp), b.peerConnection.setRemoteDescription(new RTCSessionDescription(c), function() {
                    b.peerConnection.createAnswer(n, function(a) {
                        e.Logger.error("Error: ", a)
                    }, b.mediaConstraints), a.remoteDescriptionSet = !0
                }, function(a) {
                    e.Logger.error("Error setting Remote Description", a)
                });
                else if ("answer" === c.type) console.log("Set remote and local description", c.sdp), c.sdp = g(c.sdp), l = c, b.peerConnection.setLocalDescription(k, function() {
                    b.peerConnection.setRemoteDescription(new RTCSessionDescription(c), function() {
                        for (a.remoteDescriptionSet = !0, console.log("Candidates to be added: ", a.remoteCandidates.length, a.remoteCandidates); a.remoteCandidates.length > 0;) b.peerConnection.addIceCandidate(a.remoteCandidates.shift());
                        for (console.log("Local candidates to send:", a.localCandidates.length); a.localCandidates.length > 0;) a.callback({
                            type: "candidate",
                            candidate: a.localCandidates.shift()
                        })
                    })
                });
                else if ("candidate" === c.type) try {
                    var d;
                    d = "object" == typeof c.candidate ? c.candidate : JSON.parse(c.candidate), d.candidate = d.candidate.replace(/a=/g, ""), d.sdpMLineIndex = parseInt(d.sdpMLineIndex, 10);
                    var f = new RTCIceCandidate(d);
                    a.remoteDescriptionSet ? b.peerConnection.addIceCandidate(f) : (a.remoteCandidates.push(f), console.log("Candidates stored: ", a.remoteCandidates.length, a.remoteCandidates))
                } catch (h) {
                    e.Logger.error("Error parsing candidate", c.candidate)
                }
            }, b.getConnectionStats = function(a, c) {
                b.peerConnection.getStats(null, function(b) {
                    a(d.Common.parseStats(b))
                }, c)
            }, b
        }, f.FirefoxStack = function(a) {
            "use strict";
            var b = {},
                c = mozRTCPeerConnection,
                f = mozRTCSessionDescription,
                g = mozRTCIceCandidate;
            b.pc_config = {
                iceServers: []
            }, a.iceServers instanceof Array && (b.pc_config.iceServers = a.iceServers), void 0 === a.audio && (a.audio = !0), void 0 === a.video && (a.video = !0), b.mediaConstraints = {
                offerToReceiveAudio: a.audio,
                offerToReceiveVideo: a.video,
                mozDontOfferDataChannel: !0
            };
            var h = function(a) {
                    e.Logger.error("Error in Stack ", a)
                },
                i = !1;
            b.peerConnection = new c(b.pc_config), a.localCandidates = [], b.peerConnection.onicecandidate = function(b) {
                b.candidate ? (i = !0, b.candidate.candidate.match(/a=/) || (b.candidate.candidate = "a=" + b.candidate.candidate), a.remoteDescriptionSet ? a.callback({
                    type: "candidate",
                    candidate: b.candidate
                }) : (a.localCandidates.push(b.candidate), console.log("Local Candidates stored: ", a.localCandidates.length, a.localCandidates))) : console.log("End of candidates.")
            };
            var j = function(b) {
                    return a.audioCodec ? d.Common.setPreferredCodec(b, "audio", a.audioCodec) : b
                },
                k = function(b) {
                    return a.videoCodec ? d.Common.setPreferredCodec(b, "video", a.videoCodec) : b
                },
                l = function(a) {
                    var b = j(a);
                    return b = k(b)
                };
            b.peerConnection.onaddstream = function(a) {
                b.onaddstream && b.onaddstream(a)
            }, b.peerConnection.onremovestream = function(a) {
                b.onremovestream && b.onremovestream(a)
            }, b.peerConnection.oniceconnectionstatechange = function(a) {
                b.oniceconnectionstatechange && b.oniceconnectionstatechange(a.currentTarget.iceConnectionState)
            };
            var m, n = function(b) {
                    var c, d;
                    return a.video && a.maxVideoBW && (c = b.match(/m=video.*\r\n/), null == c && (c = b.match(/m=video.*\n/)), c && c.length > 0 && (d = c[0] + "b=AS:" + a.maxVideoBW + "\r\n", b = b.replace(c[0], d))), a.audio && a.maxAudioBW && (c = b.match(/m=audio.*\r\n/), null == c && (c = b.match(/m=audio.*\n/)), c && c.length > 0 && (d = c[0] + "b=AS:" + a.maxAudioBW + "\r\n", b = b.replace(c[0], d))), b
                },
                o = function(b) {
                    b.sdp = n(b.sdp), b.sdp = l(b.sdp.replace(/a=ice-options:google-ice\r\n/g, "")), a.callback(b), m = b
                },
                p = function(c) {
                    c.sdp = n(c.sdp), c.sdp = c.sdp.replace(/a=ice-options:google-ice\r\n/g, ""), a.callback(c), m = c, b.peerConnection.setLocalDescription(m)
                };
            return b.createOffer = function(a) {
                a === !0 ? b.peerConnection.createOffer(o, h, b.mediaConstraints) : b.peerConnection.createOffer(o, h)
            }, b.addStream = function(a) {
                b.peerConnection.addStream(a)
            }, a.remoteCandidates = [], a.remoteDescriptionSet = !1, b.close = function() {
                b.state = "closed", "closed" !== b.peerConnection.signalingState && b.peerConnection.close()
            }, b.processSignalingMessage = function(c) {
                if ("offer" === c.type) c.sdp = n(c.sdp), b.peerConnection.setRemoteDescription(new f(c), function() {
                    b.peerConnection.createAnswer(p, function(a) {
                        e.Logger.error("Error", a)
                    }, b.mediaConstraints), a.remoteDescriptionSet = !0
                }, function(a) {
                    e.Logger.error("Error setting Remote Description", a)
                });
                else if ("answer" === c.type) console.log("Set remote and local description", c.sdp), c.sdp = n(c.sdp), b.peerConnection.setLocalDescription(m, function() {
                    b.peerConnection.setRemoteDescription(new f(c), function() {
                        for (a.remoteDescriptionSet = !0, e.Logger.info("Remote Description successfully set"); a.remoteCandidates.length > 0 && i;) e.Logger.info("Setting stored remote candidates"), b.peerConnection.addIceCandidate(a.remoteCandidates.shift());
                        for (; a.localCandidates.length > 0;) e.Logger.info("Sending Candidate from list"), a.callback({
                            type: "candidate",
                            candidate: a.localCandidates.shift()
                        })
                    }, function(a) {
                        e.Logger.error("Error Setting Remote Description", a)
                    })
                }, function(a) {
                    e.Logger.error("Failure setting Local Description", a)
                });
                else if ("candidate" === c.type) try {
                    var d;
                    d = "object" == typeof c.candidate ? c.candidate : JSON.parse(c.candidate), d.candidate = d.candidate.replace(/ generation 0/g, ""), d.candidate = d.candidate.replace(/ udp /g, " UDP "), d.sdpMLineIndex = parseInt(d.sdpMLineIndex, 10);
                    var h = new g(d);
                    if (a.remoteDescriptionSet && i)
                        for (b.peerConnection.addIceCandidate(h); a.remoteCandidates.length > 0;) e.Logger.info("Setting stored remote candidates"), b.peerConnection.addIceCandidate(a.remoteCandidates.shift());
                    else a.remoteCandidates.push(h)
                } catch (j) {
                    e.Logger.error("Error parsing candidate", c.candidate, j)
                }
            }, b.getConnectionStats = function(a, c) {
                b.peerConnection.getStats(null, function(b) {
                    a(d.Common.parseStats(b))
                }, c)
            }, b
        }, f.EdgeORTCStack = function(b) {
            "use strict";
            var c = {};
            c.generateIdentifier = function() {
                return Math.random().toString(36).substr(2, 10)
            }, c.localCName = c.generateIdentifier(), c.splitLines = function(a) {
                return a.trim().split("\n").map(function(a) {
                    return a.trim()
                })
            }, c.splitSections = function(a) {
                var b = a.split("\nm=");
                return b.map(function(a, b) {
                    return (b > 0 ? "m=" + a : a).trim() + "\r\n"
                })
            }, c.matchPrefix = function(a, b) {
                return c.splitLines(a).filter(function(a) {
                    return 0 === a.indexOf(b)
                })
            }, c.parseCandidate = function(a) {
                var b;
                b = 0 === a.indexOf("a=candidate:") ? a.substring(12).split(" ") : a.substring(10).split(" ");
                for (var c = {
                        foundation: b[0],
                        component: b[1],
                        protocol: b[2].toLowerCase(),
                        priority: parseInt(b[3], 10),
                        ip: b[4],
                        port: parseInt(b[5], 10),
                        type: b[7]
                    }, d = 8; d < b.length; d += 2) switch (b[d]) {
                    case "raddr":
                        c.relatedAddress = b[d + 1];
                        break;
                    case "rport":
                        c.relatedPort = parseInt(b[d + 1], 10);
                        break;
                    case "tcptype":
                        c.tcpType = b[d + 1]
                }
                return c
            }, c.writeCandidate = function(a) {
                var b = [];
                b.push(a.foundation), b.push(a.component), b.push(a.protocol.toUpperCase()), b.push(a.priority), b.push(a.ip), b.push(a.port);
                var c = a.type;
                return b.push("typ"), b.push(c), "host" !== c && a.relatedAddress && a.relatedPort && (b.push("raddr"), b.push(a.relatedAddress), b.push("rport"), b.push(a.relatedPort)), a.tcpType && "tcp" === a.protocol.toLowerCase() && (b.push("tcptype"), b.push(a.tcpType)), "candidate:" + b.join(" ")
            }, c.parseRtpMap = function(a) {
                var b = a.substr(9).split(" "),
                    c = {
                        payloadType: parseInt(b.shift(), 10)
                    };
                return b = b[0].split("/"), c.name = b[0], c.clockRate = parseInt(b[1], 10), c.numChannels = 3 === b.length ? parseInt(b[2], 10) : 1, c
            }, c.writeRtpMap = function(a) {
                var b = a.payloadType;
                return void 0 !== a.preferredPayloadType && (b = a.preferredPayloadType), "a=rtpmap:" + b + " " + a.name + "/" + a.clockRate + (1 !== a.numChannels ? "/" + a.numChannels : "") + "\r\n"
            }, c.parseExtmap = function(a) {
                var b = a.substr(9).split(" ");
                return {
                    id: parseInt(b[0], 10),
                    uri: b[1]
                }
            }, c.writeExtmap = function(a) {
                return "a=extmap:" + (a.id || a.preferredId) + " " + a.uri + "\r\n"
            }, c.parseFmtp = function(a) {
                for (var b, c = {}, d = a.substr(a.indexOf(" ") + 1).split(";"), e = 0; e < d.length; e++) b = d[e].trim().split("="), c[b[0].trim()] = b[1];
                return c
            }, c.writeFmtp = function(a) {
                var b = "",
                    c = a.payloadType;
                if (void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType), a.parameters && Object.keys(a.parameters).length) {
                    var d = [];
                    Object.keys(a.parameters).forEach(function(b) {
                        d.push(b + "=" + a.parameters[b])
                    }), b += "a=fmtp:" + c + " " + d.join(";") + "\r\n"
                }
                return b
            }, c.parseRtcpFb = function(a) {
                var b = a.substr(a.indexOf(" ") + 1).split(" ");
                return {
                    type: b.shift(),
                    parameter: b.join(" ")
                }
            }, c.writeRtcpFb = function(a) {
                var b = "",
                    c = a.payloadType;
                return void 0 !== a.preferredPayloadType && (c = a.preferredPayloadType), a.rtcpFeedback && a.rtcpFeedback.length && a.rtcpFeedback.forEach(function(a) {
                    b += "a=rtcp-fb:" + c + " " + a.type + " " + a.parameter + "\r\n"
                }), b
            }, c.parseSsrcMedia = function(a) {
                var b = a.indexOf(" "),
                    c = {
                        ssrc: parseInt(a.substr(7, b - 7), 10)
                    },
                    d = a.indexOf(":", b);
                return d > -1 ? (c.attribute = a.substr(b + 1, d - b - 1), c.value = a.substr(d + 1)) : c.attribute = a.substr(b + 1), c
            }, c.getDtlsParameters = function(a, b) {
                var d = c.splitLines(a);
                d = d.concat(c.splitLines(b));
                var e = d.filter(function(a) {
                        return 0 === a.indexOf("a=fingerprint:")
                    })[0].substr(14),
                    f = {
                        role: "auto",
                        fingerprints: [{
                            algorithm: e.split(" ")[0],
                            value: e.split(" ")[1]
                        }]
                    };
                return f
            }, c.writeDtlsParameters = function(a, b) {
                var c = "a=setup:" + b + "\r\n";
                return a.fingerprints.forEach(function(a) {
                    c += "a=fingerprint:" + a.algorithm + " " + a.value + "\r\n"
                }), c
            }, c.getIceParameters = function(a, b) {
                var d = c.splitLines(a);
                d = d.concat(c.splitLines(b));
                var e = {
                    usernameFragment: d.filter(function(a) {
                        return 0 === a.indexOf("a=ice-ufrag:")
                    })[0].substr(12),
                    password: d.filter(function(a) {
                        return 0 === a.indexOf("a=ice-pwd:")
                    })[0].substr(10)
                };
                return e
            }, c.writeIceParameters = function(a) {
                return "a=ice-ufrag:" + a.usernameFragment + "\r\na=ice-pwd:" + a.password + "\r\n"
            }, c.parseRtpParameters = function(a) {
                for (var b = {
                        codecs: [],
                        headerExtensions: [],
                        fecMechanisms: [],
                        rtcp: []
                    }, d = c.splitLines(a), e = d[0].split(" "), f = 3; f < e.length; f++) {
                    var g = e[f],
                        h = c.matchPrefix(a, "a=rtpmap:" + g + " ")[0];
                    if (h) {
                        var i = c.parseRtpMap(h),
                            j = c.matchPrefix(a, "a=fmtp:" + g + " ");
                        switch (i.parameters = j.length ? c.parseFmtp(j[0]) : {}, i.rtcpFeedback = c.matchPrefix(a, "a=rtcp-fb:" + g + " ").map(c.parseRtcpFb), b.codecs.push(i), i.name.toUpperCase()) {
                            case "RED":
                            case "ULPFEC":
                                b.fecMechanisms.push(i.name.toUpperCase())
                        }
                    }
                }
                return c.matchPrefix(a, "a=extmap:").forEach(function(a) {
                    b.headerExtensions.push(c.parseExtmap(a))
                }), b
            }, c.writeRtpDescription = function(a, b) {
                var d = "";
                return d += "m=" + a + " ", d += b.codecs.length > 0 ? "9" : "0", d += " UDP/TLS/RTP/SAVPF ", d += b.codecs.map(function(a) {
                    return void 0 !== a.preferredPayloadType ? a.preferredPayloadType : a.payloadType
                }).join(" ") + "\r\n", d += "c=IN IP4 0.0.0.0\r\n", d += "a=rtcp:9 IN IP4 0.0.0.0\r\n", b.codecs.forEach(function(a) {
                    d += c.writeRtpMap(a), d += c.writeFmtp(a), d += c.writeRtcpFb(a)
                }), d += "a=rtcp-mux\r\n"
            }, c.parseRtpEncodingParameters = function(a) {
                var b, d = [],
                    e = c.parseRtpParameters(a),
                    f = -1 !== e.fecMechanisms.indexOf("RED"),
                    g = -1 !== e.fecMechanisms.indexOf("ULPFEC"),
                    h = c.matchPrefix(a, "a=ssrc:").map(function(a) {
                        return c.parseSsrcMedia(a)
                    }).filter(function(a) {
                        return "cname" === a.attribute
                    }),
                    i = h.length > 0 && h[0].ssrc,
                    j = c.matchPrefix(a, "a=ssrc-group:FID").map(function(a) {
                        var b = a.split(" ");
                        return b.shift(), b.map(function(a) {
                            return parseInt(a, 10)
                        })
                    });
                j.length > 0 && j[0].length > 1 && j[0][0] === i && (b = j[0][1]), e.codecs.forEach(function(a) {
                    if ("RTX" === a.name.toUpperCase() && a.parameters.apt) {
                        var c = {
                            ssrc: i,
                            codecPayloadType: parseInt(a.parameters.apt, 10),
                            rtx: {
                                payloadType: a.payloadType,
                                ssrc: b
                            }
                        };
                        d.push(c), f && (c = JSON.parse(JSON.stringify(c)), c.fec = {
                            ssrc: b,
                            mechanism: g ? "red+ulpfec" : "red"
                        }, d.push(c))
                    }
                }), 0 === d.length && i && d.push({
                    ssrc: i
                });
                var k = c.matchPrefix(a, "b=");
                return k.length && (0 === k[0].indexOf("b=TIAS:") ? k = parseInt(k[0].substr(7), 10) : 0 === k[0].indexOf("b=AS:") && (k = parseInt(k[0].substr(5), 10)), d.forEach(function(a) {
                    a.maxBitrate = k
                })), d
            }, c.writeSessionBoilerplate = function() {
                return "v=0\r\no=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
            }, c.writeMediaSection = function(a, b, d, e) {
                var f = c.writeRtpDescription(a.kind, b);
                if (f += c.writeIceParameters(a.iceGatherer.getLocalParameters()), f += c.writeDtlsParameters(a.dtlsTransport.getLocalParameters(), "offer" === d ? "actpass" : "active"), f += "a=mid:" + a.mid + "\r\n", f += a.rtpSender && a.rtpReceiver ? "a=sendrecv\r\n" : a.rtpSender ? "a=sendonly\r\n" : a.rtpReceiver ? "a=recvonly\r\n" : "a=inactive\r\n", a.rtpSender) {
                    var g = "msid:" + e.id + " " + a.rtpSender.track.id + "\r\n";
                    f += "a=" + g, f += "a=ssrc:" + a.sendEncodingParameters[0].ssrc + " " + g
                }
                return f += "a=ssrc:" + a.sendEncodingParameters[0].ssrc + " cname:" + c.localCName + "\r\n"
            }, c.getDirection = function(a, b) {
                for (var d = c.splitLines(a), e = 0; e < d.length; e++) switch (d[e]) {
                    case "a=sendrecv":
                    case "a=sendonly":
                    case "a=recvonly":
                    case "a=inactive":
                        return d[e].substr(2)
                }
                return b ? c.getDirection(b) : "sendrecv"
            }, a.RTCIceGatherer && (a.RTCIceCandidate || (a.RTCIceCandidate = function(a) {
                return a
            }), a.RTCSessionDescription || (a.RTCSessionDescription = function(a) {
                return a
            }));
            var d = {};
            d.pc_config = {
                iceServers: []
            }, b.iceServers instanceof Array && (d.pc_config.iceServers = b.iceServers), void 0 === b.audio && (b.audio = !0), void 0 === b.video && (b.video = !0), a.RTCPeerConnection = function(a) {
                var b = this,
                    c = document.createDocumentFragment();
                if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(a) {
                        b[a] = c[a].bind(c)
                    }), this.onicecandidate = null, this.onaddstream = null, this.ontrack = null, this.onremovestream = null, this.onsignalingstatechange = null, this.oniceconnectionstatechange = null, this.onnegotiationneeded = null, this.ondatachannel = null, this.localStreams = [], this.remoteStreams = [], this.getLocalStreams = function() {
                        return b.localStreams
                    }, this.getRemoteStreams = function() {
                        return b.remoteStreams
                    }, this.localDescription = new RTCSessionDescription({
                        type: "",
                        sdp: ""
                    }), this.remoteDescription = new RTCSessionDescription({
                        type: "",
                        sdp: ""
                    }), this.signalingState = "stable", this.iceConnectionState = "new", this.iceGatheringState = "new", this.iceOptions = {
                        gatherPolicy: "all",
                        iceServers: []
                    }, a && a.iceTransportPolicy) switch (a.iceTransportPolicy) {
                    case "all":
                    case "relay":
                        this.iceOptions.gatherPolicy = a.iceTransportPolicy;
                        break;
                    case "none":
                        throw new TypeError('iceTransportPolicy "none" not supported')
                }
                if (this.usingBundle = a && "max-bundle" === a.bundlePolicy, a && a.iceServers) {
                    var d = JSON.parse(JSON.stringify(a.iceServers));
                    this.iceOptions.iceServers = d.filter(function(a) {
                        if (a && a.urls) {
                            var b = a.urls;
                            return "string" == typeof b && (b = [b]), b = b.filter(function(a) {
                                return 0 === a.indexOf("turn:") && -1 !== a.indexOf("transport=udp")
                            })[0], !!b
                        }
                        return !1
                    })
                }
                this.transceivers = [], this._localIceCandidatesBuffer = []
            }, a.RTCPeerConnection.prototype.addStream = function(a) {
                this.localStreams.push(a.clone()), this._maybeFireNegotiationNeeded()
            }, a.RTCPeerConnection.prototype.removeStream = function(a) {
                var b = this.localStreams.indexOf(a);
                b > -1 && (this.localStreams.splice(b, 1), this._maybeFireNegotiationNeeded())
            }, a.RTCPeerConnection.prototype.getSenders = function() {
                return this.transceivers.filter(function(a) {
                    return !!a.rtpSender
                }).map(function(a) {
                    return a.rtpSender
                })
            }, a.RTCPeerConnection.prototype.getReceivers = function() {
                return this.transceivers.filter(function(a) {
                    return !!a.rtpReceiver
                }).map(function(a) {
                    return a.rtpReceiver
                })
            }, a.RTCPeerConnection.prototype._emitBufferedCandidates = function() {
                var a = this,
                    b = c.splitSections(a.localDescription.sdp);
                this._localIceCandidatesBuffer.forEach(function(c) {
                    var d = !c.candidate || 0 === Object.keys(c.candidate).length;
                    if (d)
                        for (var e = 1; e < b.length; e++) - 1 === b[e].indexOf("\r\na=end-of-candidates\r\n") && (b[e] += "a=end-of-candidates\r\n");
                    else -1 === c.candidate.candidate.indexOf("typ endOfCandidates") && (b[c.candidate.sdpMLineIndex + 1] += "a=" + c.candidate.candidate + "\r\n");
                    if (a.localDescription.sdp = b.join(""), null !== a.dispatchEvent && a.dispatchEvent(c), null !== a.onicecandidate && a.onicecandidate(c), !c.candidate && "complete" !== a.iceGatheringState) {
                        var f = a.transceivers.every(function(a) {
                            return a.iceGatherer && "completed" === a.iceGatherer.state
                        });
                        f && (a.iceGatheringState = "complete")
                    }
                }), this._localIceCandidatesBuffer = []
            }, a.RTCPeerConnection.prototype._getCommonCapabilities = function(a, b) {
                var c = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: []
                };
                return a.codecs.forEach(function(a) {
                    for (var d = 0; d < b.codecs.length; d++) {
                        var e = b.codecs[d];
                        if (a.name.toLowerCase() === e.name.toLowerCase() && a.clockRate === e.clockRate && a.numChannels === e.numChannels) {
                            c.codecs.push(e);
                            break
                        }
                    }
                }), a.headerExtensions.forEach(function(a) {
                    for (var d = 0; d < b.headerExtensions.length; d++) {
                        var e = b.headerExtensions[d];
                        if (a.uri === e.uri) {
                            c.headerExtensions.push(e);
                            break
                        }
                    }
                }), c
            }, a.RTCPeerConnection.prototype._createIceAndDtlsTransports = function(b, d) {
                var e = this,
                    f = new a.RTCIceGatherer(e.iceOptions),
                    g = new a.RTCIceTransport(f);
                f.onlocalcandidate = function(a) {
                    var h = new Event("icecandidate");
                    h.candidate = {
                        sdpMid: b,
                        sdpMLineIndex: d
                    };
                    var i = a.candidate,
                        j = !i || 0 === Object.keys(i).length;
                    j ? (void 0 === f.state && (f.state = "completed"), h.candidate.candidate = "candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates") : (i.component = "RTCP" === g.component ? 2 : 1, h.candidate.candidate = c.writeCandidate(i));
                    var k = c.splitSections(e.localDescription.sdp); - 1 === h.candidate.candidate.indexOf("typ endOfCandidates") ? k[h.candidate.sdpMLineIndex + 1] += "a=" + h.candidate.candidate + "\r\n" : k[h.candidate.sdpMLineIndex + 1] += "a=end-of-candidates\r\n", e.localDescription.sdp = k.join("");
                    var l = e.transceivers.every(function(a) {
                        return a.iceGatherer && "completed" === a.iceGatherer.state
                    });
                    switch (e.iceGatheringState) {
                        case "new":
                            e._localIceCandidatesBuffer.push(h), j && l && e._localIceCandidatesBuffer.push(new Event("icecandidate"));
                            break;
                        case "gathering":
                            e._emitBufferedCandidates(), null !== e.dispatchEvent && e.dispatchEvent(h), null !== e.onicecandidate && e.onicecandidate(h), l && (null !== e.dispatchEvent && e.dispatchEvent(new Event("icecandidate")), null !== e.onicecandidate && e.onicecandidate(new Event("icecandidate")), e.iceGatheringState = "complete");
                            break;
                        case "complete":
                    }
                }, g.onicestatechange = function() {
                    e._updateConnectionState()
                };
                var h = new a.RTCDtlsTransport(g);
                return h.ondtlsstatechange = function() {
                    e._updateConnectionState()
                }, h.onerror = function() {
                    e._updateConnectionState()
                }, {
                    iceGatherer: f,
                    iceTransport: g,
                    dtlsTransport: h
                }
            }, a.RTCPeerConnection.prototype._transceive = function(a, b, d) {
                var e = this._getCommonCapabilities(a.localCapabilities, a.remoteCapabilities);
                b && a.rtpSender && (e.encodings = a.sendEncodingParameters, e.rtcp = {
                    cname: c.localCName
                }, a.recvEncodingParameters.length && (e.rtcp.ssrc = a.recvEncodingParameters[0].ssrc), a.rtpSender.send(e)), d && a.rtpReceiver && (e.encodings = a.recvEncodingParameters, e.rtcp = {
                    cname: a.cname
                }, a.sendEncodingParameters.length && (e.rtcp.ssrc = a.sendEncodingParameters[0].ssrc), a.rtpReceiver.receive(e))
            }, a.RTCPeerConnection.prototype._updateSignalingState = function(a) {
                this.signalingState = a;
                var b = new Event("signalingstatechange");
                null !== this.dispatchEvent && this.dispatchEvent(b), null !== this.onsignalingstatechange && this.onsignalingstatechange(b)
            }, a.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
                var a = new Event("negotiationneeded");
                null !== this.dispatchEvent && this.dispatchEvent(a), null !== this.onnegotiationneeded && this.onnegotiationneeded(a)
            }, a.RTCPeerConnection.prototype._updateConnectionState = function() {
                var a, b = this,
                    c = {
                        "new": 0,
                        closed: 0,
                        connecting: 0,
                        checking: 0,
                        connected: 0,
                        completed: 0,
                        failed: 0
                    };
                if (this.transceivers.forEach(function(a) {
                        c[a.iceTransport.state]++, c[a.dtlsTransport.state]++
                    }), c.connected += c.completed, a = "new", c.failed > 0 ? a = "failed" : c.connecting > 0 || c.checking > 0 ? a = "connecting" : c.disconnected > 0 ? a = "disconnected" : c["new"] > 0 ? a = "new" : (c.connected > 0 || c.completed > 0) && (a = "connected"), a !== b.iceConnectionState) {
                    b.iceConnectionState = a;
                    var d = new Event("iceconnectionstatechange");
                    null !== this.dispatchEvent && this.dispatchEvent(d), null !== this.oniceconnectionstatechange && this.oniceconnectionstatechange(a)
                }
            }, a.RTCPeerConnection.prototype.setLocalDescription = function(b) {
                var d, e, f = this;
                if ("offer" === b.type) this._pendingOffer && (d = c.splitSections(b.sdp), e = d.shift(), d.forEach(function(a, b) {
                    var d = c.parseRtpParameters(a);
                    f._pendingOffer[b].localCapabilities = d
                }), this.transceivers = this._pendingOffer, delete this._pendingOffer);
                else if ("answer" === b.type) {
                    d = c.splitSections(f.remoteDescription.sdp), e = d.shift();
                    var g = c.matchPrefix(e, "a=ice-lite").length > 0;
                    d.forEach(function(a, b) {
                        var d = f.transceivers[b],
                            h = d.iceGatherer,
                            i = d.iceTransport,
                            j = d.dtlsTransport,
                            k = d.localCapabilities,
                            l = d.remoteCapabilities,
                            m = "0" === a.split("\n", 1)[0].split(" ", 2)[1];
                        if (!m) {
                            var n = c.getIceParameters(a, e);
                            if (g) {
                                var o = c.matchPrefix(a, "a=candidate:").map(function(a) {
                                    return c.parseCandidate(a)
                                }).filter(function(a) {
                                    return "1" === a.component
                                });
                                o.length && i.setRemoteCandidates(o)
                            }
                            var p = c.getDtlsParameters(a, e);
                            g && (p.role = "server"), p.role = "client", f.usingBundle && 0 !== b || (i.start(h, n, g ? "controlling" : "controlled"), j.start(p));
                            var q = f._getCommonCapabilities(k, l);
                            f._transceive(d, q.codecs.length > 0, !1)
                        }
                    })
                }
                switch (this.localDescription = {
                    type: b.type,
                    sdp: b.sdp
                }, b.type) {
                    case "offer":
                        this._updateSignalingState("have-local-offer");
                        break;
                    case "answer":
                        this._updateSignalingState("stable");
                        break;
                    default:
                        throw new TypeError('unsupported type "' + b.type + '"')
                }
                var h = arguments.length > 1 && "function" == typeof arguments[1];
                if (h) {
                    var i = arguments[1];
                    a.setTimeout(function() {
                        i(), "new" === f.iceGatheringState && (f.iceGatheringState = "gathering"), f._emitBufferedCandidates()
                    }, 0)
                }
                var j = a.Promise.resolve();
                return j.then(function() {
                    h || ("new" === f.iceGatheringState && (f.iceGatheringState = "gathering"), a.setTimeout(f._emitBufferedCandidates.bind(f), 500))
                }), j
            }, a.RTCPeerConnection.prototype.setRemoteDescription = function(b) {
                var d = this,
                    e = new a.MediaStream,
                    f = [],
                    g = c.splitSections(b.sdp),
                    h = g.shift(),
                    i = c.matchPrefix(h, "a=ice-lite").length > 0;
                switch (this.usingBundle = c.matchPrefix(h, "a=group:BUNDLE ").length > 0, g.forEach(function(g, j) {
                    var k, l, m, n, o, p, q, r, s, t, u, v, w = c.splitLines(g),
                        x = w[0].substr(2).split(" "),
                        y = x[0],
                        z = "0" === x[1],
                        A = c.getDirection(g, h),
                        B = c.parseRtpParameters(g);
                    z || (u = c.getIceParameters(g, h), v = c.getDtlsParameters(g, h), v.role = "client"), v.role = "client", r = c.parseRtpEncodingParameters(g);
                    var C = c.matchPrefix(g, "a=mid:");
                    C = C.length ? C[0].substr(6) : c.generateIdentifier();
                    var D, E = c.matchPrefix(g, "a=ssrc:").map(function(a) {
                        return c.parseSsrcMedia(a)
                    }).filter(function(a) {
                        return "cname" === a.attribute
                    })[0];
                    E && (D = E.value);
                    var F = !0,
                        G = c.matchPrefix(g, "a=candidate:").map(function(a) {
                            return c.parseCandidate(a)
                        }).filter(function(a) {
                            return "1" === a.component
                        });
                    if (G.push({}), "offer" !== b.type || z) "answer" !== b.type || z || (k = d.transceivers[j], l = k.iceGatherer, m = k.iceTransport, n = k.dtlsTransport, o = k.rtpSender, p = k.rtpReceiver, q = k.sendEncodingParameters, s = k.localCapabilities, d.transceivers[j].recvEncodingParameters = r, d.transceivers[j].remoteCapabilities = B, d.transceivers[j].cname = D, (i || F) && G.length && m.setRemoteCandidates(G), d.usingBundle && 0 !== j || (m.start(l, u, "controlling"), n.start(v)), d._transceive(k, "sendrecv" === A || "recvonly" === A, "sendrecv" === A || "sendonly" === A), !p || "sendrecv" !== A && "sendonly" !== A ? delete k.rtpReceiver : (t = p.track, f.push([t, p]), e.addTrack(t)));
                    else {
                        var H = d.usingBundle && j > 0 ? {
                            iceGatherer: d.transceivers[0].iceGatherer,
                            iceTransport: d.transceivers[0].iceTransport,
                            dtlsTransport: d.transceivers[0].dtlsTransport
                        } : d._createIceAndDtlsTransports(C, j);
                        if (F && H.iceTransport.setRemoteCandidates(G), s = a.RTCRtpReceiver.getCapabilities(y), q = [{
                                ssrc: 1001 * (2 * j + 2)
                            }], p = new a.RTCRtpReceiver(H.dtlsTransport, y), t = p.track, f.push([t, p]), e.addTrack(t), d.localStreams.length > 0 && d.localStreams[0].getTracks().length >= j) {
                            var I;
                            "audio" === y ? I = d.localStreams[0].getAudioTracks()[0] : "video" === y && (I = d.localStreams[0].getVideoTracks()[0]), I && (o = new a.RTCRtpSender(I, H.dtlsTransport))
                        }
                        d.transceivers[j] = {
                            iceGatherer: H.iceGatherer,
                            iceTransport: H.iceTransport,
                            dtlsTransport: H.dtlsTransport,
                            localCapabilities: s,
                            remoteCapabilities: B,
                            rtpSender: o,
                            rtpReceiver: p,
                            kind: y,
                            mid: C,
                            cname: D,
                            sendEncodingParameters: q,
                            recvEncodingParameters: r
                        }, d._transceive(d.transceivers[j], !1, "sendrecv" === A || "sendonly" === A)
                    }
                }), this.remoteDescription = {
                    type: b.type,
                    sdp: b.sdp
                }, b.type) {
                    case "offer":
                        this._updateSignalingState("have-remote-offer");
                        break;
                    case "answer":
                        this._updateSignalingState("stable");
                        break;
                    default:
                        throw new TypeError('unsupported type "' + b.type + '"')
                }
                return e.getTracks().length && (d.remoteStreams.push(e), a.setTimeout(function() {
                    var b = new Event("addstream");
                    b.stream = e, null !== d.dispatchEvent && d.dispatchEvent(b), null !== d.onaddstream && a.setTimeout(function() {
                        d.onaddstream(b)
                    }, 0), f.forEach(function(c) {
                        var f = c[0],
                            g = c[1],
                            h = new Event("track");
                        h.track = f, h.receiver = g, h.streams = [e], null !== d.dispatchEvent && d.dispatchEvent(b), null !== d.ontrack && a.setTimeout(function() {
                            d.ontrack(h)
                        }, 0)
                    })
                }, 0)), arguments.length > 1 && "function" == typeof arguments[1] && a.setTimeout(arguments[1], 0), a.Promise.resolve()
            }, a.RTCPeerConnection.prototype.close = function() {
                this.transceivers.forEach(function(a) {
                    a.iceTransport && a.iceTransport.stop(), a.dtlsTransport && a.dtlsTransport.stop(), a.rtpSender && a.rtpSender.stop(), a.rtpReceiver && a.rtpReceiver.stop()
                }), this._updateSignalingState("closed")
            }, a.RTCPeerConnection.prototype.createOffer = function() {
                var b = this;
                if (this._pendingOffer) throw new Error("createOffer called while there is a pending offer.");
                var d;
                1 === arguments.length && "function" != typeof arguments[0] ? d = arguments[0] : 3 === arguments.length && (d = arguments[2]);
                var e = [],
                    f = 0,
                    g = 0;
                if (this.localStreams.length && (f = this.localStreams[0].getAudioTracks().length, g = this.localStreams[0].getVideoTracks().length), d) {
                    if (d.mandatory || d.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                    void 0 !== d.offerToReceiveAudio && (f = d.offerToReceiveAudio), void 0 !== d.offerToReceiveVideo && (g = d.offerToReceiveVideo)
                }
                for (this.localStreams.length && this.localStreams[0].getTracks().forEach(function(a) {
                        e.push({
                            kind: a.kind,
                            track: a,
                            wantReceive: "audio" === a.kind ? f > 0 : g > 0
                        }), "audio" === a.kind ? f-- : "video" === a.kind && g--
                    }); f > 0 || g > 0;) f > 0 && (e.push({
                    kind: "audio",
                    wantReceive: !0
                }), f--), g > 0 && (e.push({
                    kind: "video",
                    wantReceive: !0
                }), g--);
                var h = c.writeSessionBoilerplate(),
                    i = [];
                e.forEach(function(d, e) {
                    var f, g, h = d.track,
                        j = d.kind,
                        k = c.generateIdentifier(),
                        l = b.usingBundle && e > 0 ? {
                            iceGatherer: i[0].iceGatherer,
                            iceTransport: i[0].iceTransport,
                            dtlsTransport: i[0].dtlsTransport
                        } : b._createIceAndDtlsTransports(k, e),
                        m = a.RTCRtpSender.getCapabilities(j),
                        n = [{
                            ssrc: 1001 * (2 * e + 1)
                        }];
                    h && (f = new a.RTCRtpSender(h, l.dtlsTransport)), d.wantReceive && (g = new a.RTCRtpReceiver(l.dtlsTransport, j)), i[e] = {
                        iceGatherer: l.iceGatherer,
                        iceTransport: l.iceTransport,
                        dtlsTransport: l.dtlsTransport,
                        localCapabilities: m,
                        remoteCapabilities: null,
                        rtpSender: f,
                        rtpReceiver: g,
                        kind: j,
                        mid: k,
                        sendEncodingParameters: n,
                        recvEncodingParameters: null
                    }
                }), this.usingBundle && (h += "a=group:BUNDLE " + i.map(function(a) {
                    return a.mid
                }).join(" ") + "\r\n"), e.forEach(function(a, d) {
                    var e = i[d];
                    h += c.writeMediaSection(e, e.localCapabilities, "offer", b.localStreams[0])
                }), this._pendingOffer = i;
                var j = new RTCSessionDescription({
                    type: "offer",
                    sdp: h
                });
                return arguments.length && "function" == typeof arguments[0] && a.setTimeout(arguments[0], 0, j), a.Promise.resolve(j)
            }, a.RTCPeerConnection.prototype.createAnswer = function() {
                var b = this,
                    d = c.writeSessionBoilerplate();
                this.usingBundle && (d += "a=group:BUNDLE " + this.transceivers.map(function(a) {
                    return a.mid
                }).join(" ") + "\r\n"), this.transceivers.forEach(function(a) {
                    var e = b._getCommonCapabilities(a.localCapabilities, a.remoteCapabilities);
                    d += c.writeMediaSection(a, e, "answer", b.localStreams[0])
                });
                var e = new RTCSessionDescription({
                    type: "answer",
                    sdp: d
                });
                return arguments.length && "function" == typeof arguments[0] && a.setTimeout(arguments[0], 0, e), a.Promise.resolve(e)
            }, a.RTCPeerConnection.prototype.addIceCandidate = function(b) {
                if (null === b) this.transceivers.forEach(function(a) {
                    a.iceTransport.addRemoteCandidate({})
                });
                else {
                    var d = b.sdpMLineIndex;
                    if (b.sdpMid)
                        for (var e = 0; e < this.transceivers.length; e++)
                            if (this.transceivers[e].mid === b.sdpMid) {
                                d = e;
                                break
                            }
                    var f = this.transceivers[d];
                    if (f) {
                        var g = Object.keys(b.candidate).length > 0 ? c.parseCandidate(b.candidate) : {};
                        if ("tcp" === g.protocol && 0 === g.port) return;
                        if ("1" !== g.component) return;
                        "endOfCandidates" === g.type && (g = {}), f.iceTransport.addRemoteCandidate(g);
                        var h = c.splitSections(this.remoteDescription.sdp);
                        h[d + 1] += (g.type ? b.candidate.trim() : "a=end-of-candidates") + "\r\n", this.remoteDescription.sdp = h.join("")
                    }
                }
                return arguments.length > 1 && "function" == typeof arguments[1] && a.setTimeout(arguments[1], 0), a.Promise.resolve()
            }, d.mediaConstraints = {
                offerToReceiveVideo: b.video,
                offerToReceiveAudio: b.audio
            };
            var f, g = function(a) {
                    e.Logger.error("Error in Edge Stack ", a)
                },
                h = function(a) {
                    if ("H264" !== b.videoCodec && "h264" !== b.videoCodec) return a;
                    try {
                        var c = a.match(/m=video.*\r\n/g)[0],
                            d = c.replace(/\s120/, "").replace("\r\n", "") + " 120\r\n";
                        return a.replace(c, d)
                    } catch (e) {
                        return a
                    }
                },
                i = function(a) {
                    var b = h(a);
                    return b
                },
                j = function(a) {
                    var c, d;
                    return b.video && b.maxVideoBW && (c = a.match(/m=video.*\r\n/), null == c && (c = a.match(/m=video.*\n/)), c && c.length > 0 && (d = c[0] + "b=AS:" + b.maxVideoBW + "\r\n", a = a.replace(c[0], d))), b.audio && b.maxAudioBW && (c = a.match(/m=audio.*\r\n/), null == c && (c = a.match(/m=audio.*\n/)), c && c.length > 0 && (d = c[0] + "b=AS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0], d))), a
                },
                k = function(a) {
                    a.sdp = j(a.sdp), a.sdp = i(a.sdp.replace(/a=ice-options:google-ice\r\n/g, "")), b.callback(a), f = a
                },
                l = function(a) {
                    a.sdp = j(a.sdp), a.sdp = a.sdp.replace(/a=ice-options:google-ice\r\n/g, ""), b.callback(a), f = a, d.peerConnection.setLocalDescription(f)
                };
            return d.peerConnection = new a.RTCPeerConnection(d.pc_config), b.localCandidates = [], b.remoteCandidates = [], b.remoteDescriptionSet = !1, d.peerConnection.onicecandidate = function(a) {
                if (a.candidate) {
                    a.candidate.candidate.match(/a=/) || (a.candidate.candidate = "a=" + a.candidate.candidate);
                    var c = {
                        sdpMLineIndex: a.candidate.sdpMLineIndex,
                        sdpMid: a.candidate.sdpMid,
                        candidate: a.candidate.candidate
                    };
                    b.remoteDescriptionSet ? b.callback({
                        type: "candidate",
                        candidate: c
                    }) : b.localCandidates.push(c)
                } else b.localCandidates.push({
                    candidate: {}
                }), console.log("End of candidates.")
            }, d.peerConnection.onaddstream = function(a) {
                d.onaddstream && d.onaddstream(a)
            }, d.peerConnection.onremovestream = function(a) {
                d.onremovestream && d.onremovestream(a)
            }, d.peerConnection.oniceconnectionstatechange = function(a) {
                d.oniceconnectionstatechange && d.oniceconnectionstatechange(a)
            }, d.createOffer = function(a) {
                a === !0 ? d.peerConnection.createOffer(k, g, d.mediaConstraints) : d.peerConnection.createOffer(k, g)
            }, d.addStream = function(a) {
                d.peerConnection.addStream(a)
            }, d.processSignalingMessage = function(a) {
                if (e.Logger.debug("Process Signaling Message", a.type), "offer" === a.type) a.sdp = j(a.sdp), console.log("Set offer description \n", a.sdp), d.peerConnection.setRemoteDescription(new RTCSessionDescription(a), function() {
                    d.peerConnection.createAnswer(l, function(a) {
                        e.Logger.error("Error", a)
                    }, d.mediaConstraints), b.remoteDescriptionSet = !0
                }, function(a) {
                    e.Logger.error("Error setting Remote Description", a)
                });
                else if ("answer" === a.type) console.log("Set remote description", a.sdp), a.sdp = j(a.sdp), d.peerConnection.setLocalDescription(f, function() {
                    d.peerConnection.setRemoteDescription(new RTCSessionDescription(a), function() {
                        for (b.remoteDescriptionSet = !0, e.Logger.info("Remote Description successfully set"); b.remoteCandidates.length > 0;) d.peerConnection.addIceCandidate(b.remoteCandidates.shift());
                        for (; b.localCandidates.length > 0;) b.callback({
                            type: "candidate",
                            candidate: b.localCandidates.shift()
                        })
                    }, function(a) {
                        e.Logger.error("Failure Setting Remote Description", a)
                    })
                }, function(a) {
                    e.Logger.error("Failure Setting Local Description", a)
                });
                else if ("candidate" === a.type) try {
                    var c;
                    c = "object" == typeof a.candidate ? a.candidate : JSON.parse(a.candidate), c.candidate = c.candidate.replace(/a=/g, ""), c.sdpMLineIndex = parseInt(c.sdpMLineIndex, 10);
                    var g = new RTCIceCandidate(c);
                    if (b.remoteDescriptionSet)
                        for (d.peerConnection.addIceCandidate(g); b.remoteCandidates.length > 0;) e.Logger.info("Setting stored remote candidates"), d.peerConnection.addIceCandidate(b.remoteCandidates.shift());
                    else b.remoteCandidates.push(g)
                } catch (h) {
                    e.Logger.error("Error parsing candidate", a.candidate, h)
                }
            }, d.close = function() {
                d.state = "closed", "closed" !== d.peerConnection.signalingState && d.peerConnection.close()
            }, d.getConnectionStats = function(a, b) {
                b("getConnectionStats is not supported on Edge.")
            }, d
        };
    var d = d || {};
    d.Error = {
        STREAM_LOCAL_ACCESS_DENIED: {
            code: 1101,
            message: "Cannot access to camera or micphone."
        },
        P2P_CONN_SERVER_UNKNOWN: {
            code: 2100,
            message: "Server unknown error."
        },
        P2P_CONN_SERVER_UNAVAILABLE: {
            code: 2101,
            message: "Server is unavaliable."
        },
        P2P_CONN_SERVER_BUSY: {
            code: 2102,
            message: "Server is too busy."
        },
        P2P_CONN_SERVER_NOT_SUPPORTED: {
            code: 2103,
            message: "Method has not been supported by server"
        },
        P2P_CONN_CLIENT_UNKNOWN: {
            code: 2110,
            message: "Client unknown error."
        },
        P2P_CONN_CLIENT_NOT_INITIALIZED: {
            code: 2111,
            message: "Connection is not initialized."
        },
        P2P_CONN_AUTH_UNKNOWN: {
            code: 2120,
            message: "Authentication unknown error."
        },
        P2P_CONN_AUTH_FAILED: {
            code: 2121,
            message: "Wrong username or token."
        },
        P2P_MESSAGING_TARGET_UNREACHABLE: {
            code: 2201,
            message: "Remote user cannot be reached."
        },
        P2P_CHATROOM_ATTENDEE_EXCEED: {
            code: 2301,
            message: "Exceed room's limitation"
        },
        P2P_CHATROOM_PEER_NOT_FOUND: {
            code: 2302,
            message: "Peer not found. Only one client in the room."
        },
        P2P_CLIENT_UNKNOWN: {
            code: 2400,
            message: "Unknown errors."
        },
        P2P_CLIENT_UNSUPPORTED_METHOD: {
            code: 2401,
            message: "This method is unsupported in current browser."
        },
        P2P_CLIENT_ILLEGAL_ARGUMENT: {
            code: 2402,
            message: "Illegal argument."
        },
        P2P_CLIENT_INVALID_STATE: {
            code: 2403,
            message: "Invalid peer state."
        },
        getErrorByCode: function(a) {
            var b = {
                1101: d.Error.STREAM_LOCAL_ACCESS_DENIED,
                2100: d.Error.P2P_CONN_SERVER_UNKNOWN,
                2101: d.Error.P2P_CONN_SERVER_UNAVAILABLE,
                2102: d.Error.P2P_CONN_SERVER_BUSY,
                2103: d.Error.P2P_CONN_SERVER_NOT_SUPPORTED,
                2110: d.Error.P2P_CONN_CLIENT_UNKNOWN,
                2111: d.Error.P2P_CONN_CLIENT_NOT_INITIALIZED,
                2120: d.Error.P2P_CONN_AUTH_UNKNOWN,
                2121: d.Error.P2P_CONN_AUTH_FAILED,
                2201: d.Error.P2P_MESSAGING_TARGET_UNREACHABLE,
                2301: d.Error.P2P_CHATROOM_ATTENDEE_EXCEED,
                2302: d.Error.P2P_CHATROOM_PEER_NOT_FOUND,
                2400: d.Error.P2P_CLIENT_UNKNOWN,
                2401: d.Error.P2P_CLIENT_UNSUPPORTED_METHOD,
                2402: d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT,
                2403: d.Error.P2P_CLIENT_INVALID_STATE
            };
            return b[a]
        }
    };
    var d = d || {};
    d.PeerClient = function(b) {
        "use strict";
        var f, g, h = d.EventDispatcher({}),
            i = {
                READY: 1,
                MATCHED: 2,
                OFFERED: 3,
                PENDING: 4,
                CONNECTING: 5,
                CONNECTED: 6,
                ERROR: 9
            },
            j = {
                READY: 1,
                REQUESTED: 2,
                ACCEPTED: 3,
                NEGOTIATING: 4
            },
            k = {
                MESSAGE: "message",
                FILE: "file"
            },
            l = {
                READY: 1,
                CONNECTING: 2,
                CONNECTED: 3
            },
            m = l.READY,
            n = b,
            o = function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            },
            p = 15e3,
            q = null,
            r = {},
            s = {},
            t = null,
            u = !1,
            v = {},
            w = {
                optional: [{
                    DtlsSrtpKeyAgreement: "true"
                }]
            },
            x = null,
            y = {
                offerToReceiveAudio: !0,
                offerToReceiveVideo: !0
            },
            z = null,
            A = d.Common.sysInfo(),
            B = !navigator.mozGetUserMedia,
            C = !!navigator.mozGetUserMedia;
        b && (z = {
            iceServers: b.iceServers
        });
        var D = function(a, b) {
                return a.localeCompare(b)
            },
            E = function(a) {
                return a
            },
            F = function(a, b) {
                a.negotiationState = b
            },
            G = function(a, b) {
                a.state !== i.CONNECTED && a.state !== i.CONNECTING || (a.sendDataChannel && a.sendDataChannel.close(), a.receiveDataChannel && a.receiveDataChannel.close(), a.connection && "closed" !== a.connection.iceConnectionState && a.connection.close(), a.state !== i.READY && (a.state = i.READY, h.dispatchEvent(new d.ChatEvent({
                    type: "chat-stopped",
                    peerId: a.id,
                    senderId: b
                }))), fa(a.connection))
            },
            H = function(a, b) {
                b.sdk && b.sdk && "JavaScript" === b.sdk.type && b.runtime && "FireFox" === b.runtime.name ? (a.remoteSideSupportsRemoveStream = !1, a.remoteSideSupportsPlanB = !1, a.remoteSideSupportsUnifiedPlan = !0, a.preferredVideoCodec = "vp8") : (a.remoteSideSupportsRemoveStream = !0, a.remoteSideSupportsPlanB = !0, a.remoteSideSupportsUnifiedPlan = !1)
            },
            I = function() {
                u = !0, m = l.CONNECTED
            },
            J = function() {
                g && g(), f = void 0, g = void 0
            },
            K = function() {
                u = !1, m = l.READY, h.dispatchEvent(new d.ClientEvent({
                    type: "server-disconnected"
                }))
            },
            KD = function(a){
                h.dispatchEvent(new d.DataEvent({
                        type: "status-changed",
                        data: a
                }))
            },
            KDI = function(a){
                h.dispatchEvent(new d.DataEvent({
                        type: "insta-message",
                        data: a,
                        senderId: a.from
                }))  
            },
            L = function(a, b) {
                var c = r[a];
                c || (ka(a), c = r[a]), H(c, b), c.state === i.READY || c.state === i.PENDING ? (r[a].state = i.PENDING, h.dispatchEvent(new d.ChatEvent({
                    type: "chat-invited",
                    senderId: a
                }))) : c.state === i.OFFERED && D(t, a) < 0 && (c.state = i.PENDING, qa(a, function() {
                    h.dispatchEvent(new d.ChatEvent({
                        type: "chat-accepted",
                        senderId: a
                    }))
                }))
            },
            M = function(a) {
                var b = r[a];
                b && b.connection && (b.sendDataChannel && b.sendDataChannel.close(), b.receiveDataChannel && b.receiveDataChannel.close(), b.connection.close()), delete r[a], h.dispatchEvent(new d.ChatEvent({
                    type: "chat-denied",
                    senderId: a
                }))
            },
            N = function(a, b) {
                e.Logger.debug("Received chat accepted.");
                var c = r[a];
                c && (c.state = i.MATCHED, H(c, b), ea(c), c.state = i.CONNECTING, ha(c.id), h.dispatchEvent(new d.ChatEvent({
                    type: "chat-accepted",
                    senderId: a
                })))
            },
            O = function(a) {
                var b = r[a];
                b && b.connection && G(b, a), delete r[a]
            },
            P = function(a, b) {
                var c = r[b];
                c && c.state === i.CONNECTING && (c.connection || ea(c)), _(c, a)
            },
            Q = function(a, b) {
                s[a.streamId] = a.type, e.Logger.debug("remote stream ID:" + a.streamId + ",type:" + s[a.streamId])
            },
            R = function(a) {
                t = a, f && f(a), f = void 0, g = void 0
            },
            S = function() {
                Ea()
            },
            T = function(a) {
                e.Logger.debug("On negotiation needed."), a.isCaller && "stable" === a.connection.signalingState && a.negotiationState === j.READY ? ja(a) : !a.isCaller && q ? q.sendNegotiationNeeded(a.id) : a.isNegotiationNeeded = !0
            },
            U = function(a, b) {
                b.candidate && q && q.sendSignalMessage(a.id, {
                    type: "candidates",
                    candidate: b.candidate.candidate,
                    sdpMid: b.candidate.sdpMid,
                    sdpMLineIndex: b.candidate.sdpMLineIndex
                })
            },
            V = function(a, b) {
                if (a && e.Logger.debug("On remote ice candidate from peer " + a.id), a && (a.state === i.OFFERED || a.state === i.CONNECTING || a.state === i.CONNECTED)) {
                    var c = new RTCIceCandidate({
                        candidate: b.message.candidate,
                        sdpMid: b.message.sdpMid,
                        sdpMLineIndex: b.message.sdpMLineIndex
                    });
                    a.connection ? (e.Logger.debug("Add remote ice candidates."), a.connection.addIceCandidate(c, ba, ca)) : (e.Logger.debug("Cache remote ice candidates."), a.remoteIceCandidates || (a.remoteIceCandidates = []), a.remoteIceCandidates.push(c))
                }
            },
            W = function(a, b) {
                if (!a) return void e.Logger.debug('"peer" cannot be null or undefined');
                switch (a.state) {
                    case i.OFFERED:
                    case i.MATCHED:
                        a.state = i.CONNECTING, ea(a);
                    case i.CONNECTING:
                    case i.CONNECTED:
                        e.Logger.debug("About to set remote description. Signaling state: " + a.connection.signalingState);
                        var c = new RTCSessionDescription(b.message);
                        c.sdp = Pa(c.sdp), a.connection.setRemoteDescription(c, function() {
                            xa(a), ta(a)
                        }, function(a) {
                            e.Logger.debug("Set remote description failed. Message: " + JSON.stringify(a))
                        });
                        break;
                    default:
                        e.Logger.debug("Unexpected peer state: " + a.state)
                }
            },
            X = function(a, b) {
                if (a && (a.state === i.CONNECTING || a.state === i.CONNECTED)) {
                    e.Logger.debug("About to set remote description. Signaling state: " + a.connection.signalingState);
                    var c = new RTCSessionDescription(b.message);
                    c.sdp = Pa(c.sdp), a.connection.setRemoteDescription(new RTCSessionDescription(c), function() {
                        e.Logger.debug("Set remote descripiton successfully."), ta(a), va(a)
                    }, function(a) {
                        e.Logger.debug("Set remote description failed. Message: " + a)
                    })
                }
            },
            Y = function(a, b) {
                var c = s[a.id];
                if (c) {
                    var e = {};
                    "screen" === c ? e.video = {
                        device: "screen"
                    } : (e.video = a.getVideoTracks().length > 0 ? {
                        device: "camera"
                    } : !1, e.audio = a.getAudioTracks().length > 0);
                    var f = new d.RemoteStream(e);
                    return f.mediaStream = a, f.from = b.id, f.id = function() {
                        return a.id
                    }, f
                }
                return null
            },
            Z = function(a, b) {
                e.Logger.debug("Remote stream added.");
                var c = Y(b.stream, a);
                if (c) {
                    var f = new d.StreamEvent({
                        type: "stream-added",
                        senderId: a.id,
                        stream: c
                    });
                    h.dispatchEvent(f)
                }
            },
            $ = function(a, b) {
                e.Logger.debug("Remote stream removed.");
                var c = Y(b.stream, a);
                if (c) {
                    var f = new d.StreamEvent({
                        type: "stream-removed",
                        stream: c
                    });
                    h.dispatchEvent(f)
                }
            },
            _ = function(a, b) {
                e.Logger.debug("S->C: " + JSON.stringify(b)), "offer" === b.type ? W(a, {
                    message: b
                }) : "answer" === b.type ? X(a, {
                    message: b
                }) : "candidates" === b.type && V(a, {
                    message: b
                })
            },
            aa = function(a, b) {
                a && (e.Logger.debug("Ice connection state changed. State: " + a.connection.iceConnectionState), "closed" !== a.connection.iceConnectionState && "failed" !== a.connection.iceConnectionState || a.state !== i.CONNECTED || (G(a, a.id), q && q.sendChatStopped(a.id), delete r[a.id]), "connected" !== a.connection.iceConnectionState && "completed" !== a.connection.iceConnectionState || (a.lastDisconnect = new Date("2099/12/31").getTime(), a.state !== i.CONNECTED && (a.state = i.CONNECTED, h.dispatchEvent(new d.ChatEvent({
                    type: "chat-started",
                    peerId: a.id
                })))), "checking" === a.connection.iceConnectionState && (a.lastDisconnect = new Date("2099/12/31").getTime()), "disconnected" === a.connection.iceConnectionState && (a.lastDisconnect = (new Date).getTime(), setTimeout(function() {
                    (new Date).getTime() - a.lastDisconnect >= p && (e.Logger.debug("Disconnect timeout."), G(a, a.id), a === r[a.id] && delete r[a.id])
                }, p)))
            },
            ba = function() {
                e.Logger.debug("Add ice candidate success.")
            },
            ca = function(a) {
                e.Logger.debug("Add ice candidate failed. Error: " + a)
            },
            da = function(a) {
                e.Logger.debug("Signaling state changed: " + a.connection.signalingState), "closed" === a.connection.signalingState ? (G(a, a.id), delete r[a.id]) : "stable" === a.connection.signalingState && (F(a, j.READY), a.isCaller && a.isNegotiationNeeded && q ? ja(a) : ua(a))
            },
            ea = function(a) {
                if (!a || a.connection) return !0;
                try {
                    a.connection = new RTCPeerConnection(z, w), a.connection.onicecandidate = function(b) {
                        U(a, b)
                    }, a.connection.onaddstream = function(b) {
                        Z(a, b)
                    }, a.connection.onremovestream = function(b) {
                        $(a, b)
                    }, a.connection.oniceconnectionstatechange = function(b) {
                        aa(a, b)
                    }, a.connection.onnegotiationneeded = function() {
                        T(r[a.id])
                    }, a.connection.onsignalingstatechange = function() {
                        da(a)
                    }, a.connection.ondatachannel = function(b) {
                        e.Logger.debug(t + ": On data channel"), a.dataChannels[b.channel.label] || (a.dataChannels[b.channel.label] = b.channel, e.Logger.debug("Save remote created data channel.")), ga(b.channel, a)
                    }
                } catch (b) {
                    return e.Logger.debug("Failed to create PeerConnection, exception: " + b.message), !1
                }
                return !0
            },
            fa = function(a) {
                a.onicecandidate = void 0, a.onaddstream = void 0, a.onremovestream = void 0, a.oniceconnectionstatechange = void 0, a.onnegotiationneeded = void 0, a.onsignalingstatechange = void 0
            },
            ga = function(a, b) {
                a.onmessage = function(a) {
                    Ja(b, a)
                }, a.onopen = function(a) {
                    Ka(b, a)
                }, a.onclose = function(a) {
                    La(b, a)
                }, a.onerror = function(a) {
                    e.Logger.debug("Data Channel Error:", a)
                }
            },
            ha = function(a, b) {
                b || (b = k.MESSAGE), ia(E(a), b)
            },
            ia = function(a, b) {
                var c = r[a];
                if (c && !c.dataChannels[b]) {
                    e.Logger.debug("Do create data channel.");
                    try {
                        var d = c.connection.createDataChannel(b, x);
                        ga(d, c), c.dataChannels[k.MESSAGE] = d
                    } catch (f) {
                        e.Logger.error("Failed to create SendDataChannel, exception: " + f.message)
                    }
                }
            },
            ja = function(a) {
                e.Logger.debug("Do renegotiation."), sa(a)
            },
            ka = function(a) {
                return r[a] || (r[a] = {
                    state: i.READY,
                    id: a,
                    pendingStreams: [],
                    pendingUnpublishStreams: [],
                    remoteIceCandidates: [],
                    dataChannels: {},
                    pendingMessages: [],
                    negotiationState: j.READY,
                    lastDisconnect: new Date("2099/12/31").getTime(),
                    publishedStreams: [],
                    isCaller: !0,
                    remoteSideSupportsRemoveStream: !1,
                    remoteSideSupportsPlanB: !1,
                    remoteSideSupportsUnifiedPlan: !1
                }), r[a]
            },
            la = function(a) {
                var b = r[a];
                e.Logger.debug(t + ": Remote side needs negotiation."), b && (b.isCaller && "stable" === b.connection.signalingState && b.negotiationState === j.READY ? ja(b) : (b.isNegotiationNeeded = !0, e.Logger.error("Should not receive negotiation needed request because user is callee.")))
            },
            ma = function(a, b, f) {
                return m !== l.READY ? (e.Logger.warning("Another peer has already connected"), void(f && f(d.Error.P2P_CLIENT_INVALID_STATE))) : (m = l.CONNECTING, q = new c(a), q.onConnected = I, q.onDisconnected = K, q.onStatusChanged = KD, q.onInstaMessage = KDI, q.onConnectFailed = J, q.onChatStopped = O, q.onChatAccepted = N, q.onChatDenied = M, q.onChatInvitation = L, q.onChatSignal = P, q.onStreamType = Q, q.onNegotiationNeeded = la, q.onAuthenticated = R, q.onForceDisconnect = S, void q.connect(a, b, f))
            },
            na = function(a, b) {
                return u ? (Ea(), q && q.finalize(), q = null, void(a && a())) : void(b && b(d.Error.P2P_CLIENT_INVALID_STATE))
            },
            nasub = function(a){
                return (Ea(), q && q.subscribe(a))
            },
            insmsg = function(a, b){
                return (Ea(), q && q.sendInstaMessage(a, b))
            },
            oa = function(a, b, c) {
                if (!q) return void(c && c(d.Error.P2P_CONN_CLIENT_NOT_INITIALIZED));
                if (a === t) return void(c && c(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT));
                r[a] || ka(a);
                var f = r[a];
                f.state === i.READY || f.state === i.OFFERED ? (e.Logger.debug("Send invitation to " + a), f.state = i.OFFERED, q.sendChatInvitation(a, A, function() {
                    b && b()
                }, function(a) {
                    f.state = i.READY, c && c(d.Error.getErrorByCode(a))
                })) : (e.Logger.debug("Invalid state. Will not send invitation."), c && c(d.Error.P2P_CLIENT_INVALID_STATE))
            },
            pa = function(a, b, c, d) {
                oa(a, function() {
                    za(b, a)
                }, d)
            },
            qa = function(a, b, c) {
                !q && c && c(d.Error.P2P_CONN_CLIENT_NOT_INITIALIZED), r[a] || ka(a);
                var f = r[a];
                f.isCaller = !1, f.state === i.PENDING ? (f.state = i.MATCHED, q.sendChatAccepted(a, A, b, function(a) {
                    f.state = i.PENDING, c && c(d.Error.getErrorByCode(a))
                })) : (e.Logger.debug("Invalid state. Will not send acceptance."), c && c(d.Error.P2P_CLIENT_INVALID_STATE))
            },
            ra = function(a, b, c, d) {
                qa(a, function() {
                    za(b, a)
                }, d)
            },
            sa = function(a) {
                return a.connection ? "stable" !== a.connection.signalingState ? void F(a, j.NEGOTIATING) : (ua(a), a.isNegotiationNeeded = !1, void a.connection.createOffer(function(b) {
                    b.sdp = Qa(b.sdp, a), a.connection.setLocalDescription(b, function() {
                        e.Logger.debug("Set local descripiton successfully."), F(a, j.READY), q && q.sendSignalMessage(a.id, b)
                    }, function(a) {
                        e.Logger.debug("Set local description failed. Message: " + JSON.stringify(a))
                    })
                }, function(a) {
                    e.Logger.debug("Create offer failed. Error info: " + JSON.stringify(a))
                }, y)) : void e.Logger.error("Peer connection have not been created.")
            },
            ta = function(a) {
                if (a && a.connection && a.remoteIceCandidates && 0 !== a.remoteIceCandidates.length) {
                    for (var b = 0; b < a.remoteIceCandidates.length; b++) e.Logger.debug("remoteIce, length:" + remoteIceCandidates.length + ", current:" + b), a.state !== i.CONNECTED && a.state !== i.CONNECTING || a.connection.addIceCandidate(remoteIceCandidates[b], ba, ca);
                    a.remoteIceCandidates = []
                }
            },
            ua = function(a) {
                if (e.Logger.debug("Draining pending streams."), a.connection) {
                    e.Logger.debug("Peer connection is ready for draining pending streams.");
                    for (var b = 0; b < a.pendingStreams.length; b++) {
                        var c = a.pendingStreams[b];
                        a.pendingStreams.shift(), c.mediaStream && (wa(c, a), c.onClose || (c.onClose = function() {
                            Ma(c)
                        }), a.connection.addStream(c.mediaStream), e.Logger.debug("Added stream to peer connection."), Ca(c, a), e.Logger.debug("Sent stream type."))
                    }
                    a.pendingStreams = [];
                    for (var d = 0; d < a.pendingUnpublishStreams.length; d++) a.pendingUnpublishStreams[d].mediaStream && (a.connection.removeStream(a.pendingUnpublishStreams[d].mediaStream), e.Logger.debug("Remove stream."));
                    a.pendingUnpublishStreams = []
                }
            },
            va = function(a) {
                e.Logger.debug("Draining pendding messages.");
                var b = a.dataChannels[k.MESSAGE];
                if (b && "closed" !== b.readyState) {
                    for (var c = 0; c < a.pendingMessages.length; c++) b.send(a.pendingMessages[c]);
                    a.pendingMessages = []
                }
            },
            wa = function(a, b) {
                var c = a.id();
                v[c] || (v[c] = []), v[c].push(b.id)
            },
            xa = function(a) {
                return a.connection ? (ua(a), a.isNegotiationNeeded = !1, void a.connection.createAnswer(function(b) {
                    b.sdp = Qa(b.sdp, a), a.connection.setLocalDescription(b, function() {
                        e.Logger.debug("Set local description successfully."), q && q.sendSignalMessage(a.id, b), e.Logger.debug("Sent answer.")
                    }, function(a) {
                        e.Logger.error("Error occurred while setting local description. Error message:" + a)
                    })
                }, function(a) {
                    e.Logger.error("Create answer failed. Message: " + a)
                })) : void e.Logger.error("Peer connection have not been created.")
            },
            ya = function(a, b) {
                for (var c = 0; c < a.length; c++)
                    if (a[c] === b) return c;
                return -1
            },
            za = function(a, b, c, e) {
                return a instanceof d.LocalStream && a.mediaStream && b ? void Aa(a, b, c, e) : void(e && e(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT))
            },
            Aa = function(a, b, c, f) {
                e.Logger.debug("Publish to: " + b);
                var g = E(b);
                if (!g) return void(f && f(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT));
                r[g] || ka(g);
                var h = r[g],
                    j = h.publishedStreams.length + h.pendingStreams.length > 0,
                    k = h.remoteSideSupportsUnifiedPlan && C || h.remoteSideSupportsPlanB && B;
                if (j && !k) return e.Logger.warning("Cannot publish more than one streams if local and remote use different multiple media sources plan."), void(f && f(d.Error.P2P_CLIENT_UNSUPPORTED_METHOD));
                switch (h.state) {
                    case i.OFFERED:
                    case i.MATCHED:
                    case i.CONNECTING:
                    case i.CONNECTED:
                        break;
                    default:
                        return e.Logger.warning("Cannot publish stream in this state: " + h.state), void(f && f(d.Error.P2P_CLIENT_INVALID_STATE))
                }
                if (ya(h.publishedStreams, a) > -1) return void(f && f("The stream has been published."));
                switch (h.publishedStreams.push(a), o(a) ? h.pendingStreams = h.pendingStreams.concat(a) : a && h.pendingStreams.push(a), h.state) {
                    case i.CONNECTING:
                    case i.CONNECTED:
                        h.pendingStreams.length > 0 && ua(h);
                        break;
                    default:
                        return e.Logger.debug("Unexpected peer state: " + h.state), void(f && f(d.Error.P2P_CLIENT_INVALID_STATE))
                }
                c && c()
            },
            Ba = function(a, b, c, f) {
                if (e.Logger.debug("Unpublish stream."), !(a instanceof d.LocalStream)) return e.Logger.warning("Invalid argument stream"), void(f && f(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT));
                var g = E(b);
                if (!g) return void(f && (e.Logger.warning("Invalid argument targetId"), f(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT)));
                if (!r[g] || ya(r[g].publishedStreams, a) < 0) return void(f && f(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT));
                var h = r[g];
                if (navigator.mozGetUserMedia || !h.remoteSideSupportsRemoveStream) return e.Logger.error("Unpublish is not supported on FireFox."), void(f && f(d.Error.P2P_CLIENT_UNSUPPORTED_METHOD));
                var j = ya(h.publishedStreams, a);
                h.publishedStreams.splice(j, 1), h.pendingUnpublishStreams.push(a), h.state === i.CONNECTED && ua(h), c && c()
            },
            Ca = function(a, b) {
                if (null !== a) {
                    var c = "audio";
                    a.isScreen() ? (c = "screen", a.hide = function() {
                        e.Logger.debug("Unpublish screen sharing."), Ba(a, b.id)
                    }) : a.hasVideo() && (c = "video"), q && q.sendStreamType(b.id, {
                        streamId: a.mediaStream.id,
                        type: c
                    })
                }
            },
            Da = function(a, b, c) {
                if (r[a] && r[a].state === i.PENDING) {
                    if (!q && c) return void c(d.Error.P2P_CONN_CLIENT_NOT_INITIALIZED);
                    q.sendChatDenied(a, b, function(a) {
                        c && c(d.Error.getErrorByCode(a))
                    }), delete r[a]
                } else c && c(d.Error.P2P_CLIENT_INVALID_STATE)
            },
            Ea = function(a, b, c) {
                if (!q) return void(c && c(d.Error.P2P_CONN_CLIENT_NOT_INITIALIZED));
                if (a) {
                    var f = r[a];
                    if (!f) return void(c && (e.Logger.warning("Invalid target ID for stopping chat."), c(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT)));
                    q.sendChatStopped(f.id), G(f, t), delete r[a]
                } else {
                    var g = !0;
                    for (var h in r) {
                        g = !1;
                        var i = r[h];
                        q.sendChatStopped(i.id), G(i, t), delete r[i.id]
                    }
                    if (g) return void(c && (e.Logger.warning("No active connections can be stopped."), c(d.Error.P2P_CLIENT_INVALID_STATE)))
                }
                b && b()
            },
            Fa = function(b, c, e) {
                var f = E(b),
                    g = r[f];
                return g && g.connection && g.state === i.CONNECTED ? void(c && g.connection.getStats(null, function(b) {
                    c(a.navigator.appVersion.indexOf("Trident") > -1 ? b : d.Common.parseStats(b))
                }, function(a) {
                    e && e(a)
                })) : void(e && e("failed to get peerconnection statistics"))
            },
            Ga = function(a, b, c) {
                var f = E(a),
                    g = r[f];
                return g && g.connection && g.state === i.CONNECTED || c("Invalid peer connection status."), navigator.mozGetUserMedia ? (e.Logger.error("GetAudioLevels is not supported on FireFox."), void(c && c(d.Error.P2P_CLIENT_UNSUPPORTED_METHOD))) : void(b && g.connection.getStats(function(a) {
                    b(d.Common.parseAudioLevel(a))
                }, function(a) {
                    c && c(a)
                }))
            },
            Ha = function(a, b, c, f) {
                return a ? a.length > 65535 ? (e.Logger.warning("Message too long. Max size: 65535."), void(f && f(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT))) : void Ia(a, E(b), c, f) : (e.Logger.warning("Message cannot be undefined, null or empty."), void(f && f(d.Error.P2P_CLIENT_ILLEGAL_ARGUMENT)))
            },
            Ia = function(a, b, c, f) {
                var g = r[b];
                if (!g || g.state !== i.CONNECTED) return void(f && (e.Logger.error("Invalid peer state."), f(d.Error.P2P_CLIENT_INVALID_STATE)));
                var h = g.dataChannels[k.MESSAGE];
                h && "open" === h.readyState ? h.send(a) : (g.pendingMessages.push(a), ha(b)), c && c()
            },
            Ja = function(a, b) {
                var c = new d.DataEvent({
                    type: "data-received",
                    senderId: a.id,
                    data: b.data
                });
                h.dispatchEvent(c)
            },
            Ka = function(a, b) {
                e.Logger.debug("Data Channel is opened"), b.target.label === k.MESSAGE && (e.Logger.debug("Data channel for messages is opened."), va(a))
            },
            La = function(a) {
                e.Logger.debug("Data Channel for " + a + " is closed.")
            },
            Ma = function(a) {
                var b = v[a.getID()];
                if (b)
                    for (var c = 0; c < b.length; c++) Ba(a, b[c])
            },
            Na = function(a) {
                return n.bandWidth && n.bandWidth.maxAudioBW ? d.Common.setPreferredBitrate(a, "audio", n.bandWidth.maxAudioBW) : a
            },
            Oa = function(a) {
                return n.bandWidth && n.bandWidth.maxVideoBW ? d.Common.setPreferredBitrate(a, "video", n.bandWidth.maxVideoBW) : a
            },
            Pa = function(a) {
                return a = Na(a), a = Oa(a)
            },
            Qa = function(a, b) {
                return a = Ra(a), a = Sa(a, b)
            },
            Ra = function(a) {
                return n.audioCodec ? a : d.Common.setPreferredCodec(a, "audio", n.audioCodec)
            },
            Sa = function(a, b) {
                var c;
                if (navigator.mozGetUserMedia) c = "vp8";
                else if (b && b.preferredVideoCodec) c = b.preferredVideoCodec;
                else {
                    if (!n.videoCodec) return a;
                    c = n.videoCodec
                }
                return d.Common.setPreferredCodec(a, "video", c)
            };
        return h.connect = ma, h.subscribe = nasub, h.sendInstaMessage = insmsg, h.disconnect = na, h.invite = oa, h.inviteWithStream = pa, h.publish = za, h.unpublish = Ba, h.deny = Da, h.accept = qa, h.acceptWithStream = ra, h.stop = Ea, h.send = Ha, h.getConnectionStats = Fa, h.getAudioLevels = Ga, h
    }, a.Erizo = f, a.Woogeen = d, a.L = e
}(window);