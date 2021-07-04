/**
* @name         AnimatedProfilePicture
* @description  Adds nitro-like animated profile pictures
* @source       https://github.com/rmkx/APFP
* @author       rmkx, p0rtL
* @invite       HnGWVQbQBv
* @version      1.0beta
*/


module.exports = class test {
    load() { }
    start() {
        dmListPatch();
        dmListUpdatePatch();
        memberListPatch();
        memberListUpdatePatch();
        friendsListPatch();
        friendsListUpdatePatch();
        nowPlayingAvatarPatch();
        patchUserSection();
        newDm();
        voiceChannelAvatar();
        userProfilePatch();
        userCardPatch();
        chatAvatarPatch();
        if (!document.querySelector("bd-styles #APFP")) { BdApi.injectCSS("APFP", `@import url(https://rmkx.github.io/APFP/src/APFP.Import.css)`); }
    }
    stop() {
        unpatchAll();
        if (document.querySelector("bd-styles #APFP")) { BdApi.clearCSS("APFP"); }
    }

    observer(changes) { }
}
const getElementByComponentName = componentName => new Promise(resolve => {
    const getElement = () => {
        const element = document.querySelector(componentName);
        if (element) {
            resolve(element);
        } else {
            requestAnimationFrame(getElement);
        }
    };
    getElement();
});
const DMListAvatar = BdApi.findModuleByDisplayName("PrivateChannel");
const dmListPatch = () => BdApi.Patcher.after("DMListPatch", DMListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const dmListUpdatePatch = () => BdApi.Patcher.after("DMListUpdatePatch", DMListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const MemberListAvatar = BdApi.findModuleByDisplayName("MemberListItem");
const memberListPatch = () => BdApi.Patcher.after("MemberListAvatarPatch", MemberListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const memberListUpdatePatch = () => BdApi.Patcher.after("MemberListUpdateAvatarPatch", MemberListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const FriendsListAvatar = BdApi.findModuleByDisplayName("PeopleListItem");
const friendsListPatch = () => BdApi.Patcher.after("FriendsListAvatarPatch", FriendsListAvatar.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id);
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const friendsListUpdatePatch = () => BdApi.Patcher.after("FriendsListUpdateAvatarPatch", FriendsListAvatar.prototype, "componentDidUpdate", (that, args, value) => {
    const instance = that;
    try {
        const svgChildrenNodes = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.child.child.child.child.child.child.child.stateNode.childNodes;
        const avatarStackNode = svgChildrenNodes.length > 2 ? svgChildrenNodes[1].childNodes[0] : svgChildrenNodes[0].childNodes[0];
        if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", instance.props.user.id); }
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const NowPlayingAvatar = BdApi.findModuleByProps("AnimatedAvatar", "Sizes");
const nowPlayingAvatarPatch = () => BdApi.Patcher.after("NowPlayingAvatarPatch", NowPlayingAvatar, "default", (that, args, value) => {
    const [props] = args;
    try {
        const { [4]: userId } = props.src.split("/");
        if (value.type === "div") {
            const originalRef = typeof value.ref === "function" ? value.ref : null;
            value.ref = (e) => {
                if (!e) return originalRef ? originalRef(e) : e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return originalRef ? originalRef(e) : e;
            };
        }
        else if (value.type.displayName === "Clickable") {
            const originalRef = typeof value.props.children.ref === "function" ? value.props.children.ref : null;
            value.props.children.ref = (e) => {
                if (!e) return originalRef ? originalRef(e) : e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return originalRef ? originalRef(e) : e;
            };
        };
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const NewDirectMessage = BdApi.findModuleByDisplayName("DirectMessage");
const newDm = () => BdApi.Patcher.after("NewDirectMessagePatcher", NewDirectMessage.prototype, "render", (that, args, value) => {
    const instance = that;
    try {
        const userId = instance.props.channel.rawRecipients[0].id;
        const originalRef = typeof value.ref === "function" ? value.ref : null;
        value.ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
            if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
            return originalRef ? originalRef(e) : e;
        };
    }
    catch (error) { console.log(error); return value; }
    return value;
});
async function patchUserSection() {
    const UserInfo = await getElementByComponentName(".container-3baos1");
    const UserInfoAvatar = UserInfo.__reactInternalInstance$.return.type;
    const userInfoAvatarPatch = () => BdApi.Patcher.after("UserInfoAvatarPatch", UserInfoAvatar.prototype, "render", (that, args, value) => {
        const instance = that;
        try {
            const userId = instance.props.currentUser.id;
            const originalRef = typeof value.ref === "function" ? value.ref : null;
            value.ref = (e) => {
                if (!e) return originalRef ? originalRef(e) : e;
                const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
                if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                return originalRef ? originalRef(e) : e;
            };
        }
        catch (error) { console.log(error); return value; }
        return value;
    });
    userInfoAvatarPatch();
    document.querySelector(".container-3baos1").__reactInternalInstance$.return.stateNode.forceUpdate();
}
const VoiceChannelUsers = BdApi.findModuleByDisplayName("VoiceUser");
const voiceChannelAvatar = () => BdApi.Patcher.after("VoiceChannelAvatarPatch", VoiceChannelUsers.prototype, "componentDidMount", (that, args, value) => {
    const instance = that;
    try {
        const avatarStackNode = instance._reactInternalFiber.stateNode._reactInternalFiber.child.child.child.child.stateNode;
        let APFPDiv = document.createElement("div");
        APFPDiv.className = "APFP";
        APFPDiv.style = "position: fixed; top: inherit; left: inherit; width: 24px; height: 24px; border-radius: 50%; margin-left: 8px;";
        APFPDiv.setAttribute("apfp-user-id", instance.props.user.id);
        avatarStackNode.insertBefore(APFPDiv, avatarStackNode.childNodes[1]);
    }
    catch (error) { console.log(error); return value; }
    return value;
});
async function userCardPatch() {
    const UserCard = await getElementByComponentName(".layer-v9HyYc");
    const UserCardFunc = UserCard.__reactInternalInstance$.return.type;
    const userCardAvatar = () => BdApi.Patcher.after("UserCardPatch", UserCardFunc.prototype, "componentDidMount", (that, args, value) => {
        try {
            const instance = that;
            const currentRef = typeof instance.elementRef.current !== null ? instance.elementRef.current : null;
            if (currentRef) {
                if (currentRef.id !== null && currentRef.id !== "") {
                    const avatarStackNode = currentRef.querySelector("foreignObject").childNodes[0];
                    const userId = currentRef.__reactInternalInstance$.stateNode.childNodes[0].childNodes[0].childNodes[0].__reactInternalInstance$.memoizedProps.children.props.user.id;
                    if (!avatarStackNode.hasAttribute("apfp-user-id")) { avatarStackNode.setAttribute("apfp-user-id", userId); }
                }
                else if (currentRef.querySelector(".avatarContainer-3CQrif")) {
                    const lastAvatar = currentRef.querySelectorAll(".avatarContainer-3CQrif");
                    for (let i = 0; i < lastAvatar.length; i++) {
                        const lastAvatarID = lastAvatar[i].__reactInternalInstance$.key;
                        let APFPDiv = document.createElement("div");
                        APFPDiv.className = "APFP";
                        APFPDiv.style = "position: fixed; top: inherit; left: inherit; width: inherit; height: inherit; border-radius: 50%;";
                        APFPDiv.setAttribute("apfp-user-id", lastAvatarID);
                        lastAvatar[i].insertBefore(APFPDiv, lastAvatar[i].childNodes[0]);
                        lastAvatar[i].setAttribute("apfp-user-id", lastAvatarID);
                    }
                    if (currentRef.querySelector("foreignObject")) {
                        const maskedAvatars = currentRef.querySelectorAll("foreignObject");
                        for (let i = 0; i < maskedAvatars.length; i++) {
                            const avatarUserID = maskedAvatars[i].__reactInternalInstance$.child.key;
                            let APFPDiv = document.createElement("div");
                            APFPDiv.className = "APFP";
                            APFPDiv.style = "position: fixed; top: inherit; left: inherit; width: inherit; height: inherit; border-radius: 50%;";
                            APFPDiv.setAttribute("apfp-user-id", avatarUserID);
                            maskedAvatars[i].insertBefore(APFPDiv, maskedAvatars[i].childNodes[0]);
                        }
                    }
                    else { return value; }
                }
                else { return value; }
            }
            else { return value; }
        }
        catch (error) { console.log(error); return value; }
        return value;
    });
    userCardAvatar();
}
const UserProfile = BdApi.findModule((m) => m?.default?.displayName === "UserProfileModal");
const userProfilePatch = () => BdApi.Patcher.after("UserProfilePatch", UserProfile, "default", (that, args, value) => {
    const [props] = args;
    try {
        const userId = props.user.id;
        const originalRef = typeof value.props.children.ref === "function" ? value.props.children.ref : null;
        value.props.children.props.children[0].ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            const avatarStackNode = e.querySelector("foreignObject").childNodes[0];
            avatarStackNode.setAttribute("apfp-user-id", userId);
            return originalRef ? originalRef(e) : e;
        }
        value.props.children.ref(e);
    }
    catch (error) { console.log(error); return value; }
    return value;
});
const ChatMessages = BdApi.findModule(m => m.default && m.default.toString().search("childrenRepliedMessage") > -1);
const chatAvatarPatch = () => BdApi.Patcher.after("ChatAvatarPatch", ChatMessages, "default", (that, args, value) => {
    const [props] = args;
    if (value.props.children.props.className.includes("groupStart") && !value.props.children.props.className.includes("systemMessage")) {
        const originalRef = typeof value.props.children.ref === "function" ? value.props.children.ref : null;
        value.props.children.ref = (e) => {
            if (!e) return originalRef ? originalRef(e) : e;
            if (!e.querySelector(".APFP")) {
                const avatarParentNode = e.querySelector(".contents-2mQqc9");
                const userID = props.childrenHeader.props.message.author.id;
                let APFPDiv = document.createElement("div");
                APFPDiv.className = "APFP";
                APFPDiv.style = "position: absolute; top: 0px; left: -56px; margin-top: calc(4px - .125rem); width: 40px; height: 40px; border-radius: 50%; pointer-events: none; z-index: 1;";
                APFPDiv.setAttribute("apfp-user-id", userID);
                avatarParentNode.childNodes[1].insertBefore(APFPDiv, avatarParentNode.childNodes[1].childNodes[0]);
            }
            return originalRef ? originalRef(e) : e;
        };
    }
    return value;
});
function unpatchAll() {
    BdApi.Patcher.unpatchAll("DMListPatch");
    BdApi.Patcher.unpatchAll("DMListUpdatePatch");
    BdApi.Patcher.unpatchAll("MemberListAvatarPatch");
    BdApi.Patcher.unpatchAll("MemberListUpdateAvatarPatch");
    BdApi.Patcher.unpatchAll("FriendsListAvatarPatch");
    BdApi.Patcher.unpatchAll("FriendsListUpdateAvatarPatch");
    BdApi.Patcher.unpatchAll("ActivityPanelPatch");
    BdApi.Patcher.unpatchAll("NowPlayingAvatarPatch");
    BdApi.Patcher.unpatchAll("UserInfoAvatarPatch");
    BdApi.Patcher.unpatchAll("NewDMPatch");
    BdApi.Patcher.unpatchAll("VoiceChannelAvatarPatch");
    BdApi.Patcher.unpatchAll("PopupLayerPatch");
    BdApi.Patcher.unpatchAll("UserProfilePatch");
    BdApi.Patcher.unpatchAll("UserCardPatch");
    BdApi.Patcher.unpatchAll("ChatAvatarPatch");
}