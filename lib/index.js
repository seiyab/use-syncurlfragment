"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
function useSyncUrlFragment(options) {
    const { enabled = true, ids: paramIDs = null, observerOption = {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px 95% 0px",
    }, } = options !== null && options !== void 0 ? options : {};
    const loc = (0, react_router_dom_1.useLocation)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [dummy, setDummy] = React.useState(0);
    const rerender = React.useCallback(() => setDummy((prev) => prev + 1), []);
    const handler = React.useCallback((entries) => {
        console.log("handling");
        const target = entries
            .filter((entry) => entry.isIntersecting)
            .reduce((acc, entry) => {
            if (!acc || entry.boundingClientRect.top < acc.boundingClientRect.top) {
                return entry;
            }
            return acc;
        }, null);
        console.log(target);
        if (!target)
            return;
        const id = target.target.id;
        if (id === "")
            return;
        console.log(`#${id}`);
        // loc.hash = `#${id}`;
        navigate({ hash: `#${id}` }, { replace: true });
    }, []);
    React.useEffect(() => {
        if (!enabled)
            return;
        const _ = dummy;
        const observer = new IntersectionObserver(handler, observerOption);
        elements(paramIDs).map((e) => observer.observe(e));
        return () => observer.disconnect();
    }, [handler, enabled, dummy]);
    return rerender;
}
exports.default = useSyncUrlFragment;
function elements(ids) {
    if (ids === null) {
        const result = [];
        document.querySelectorAll("*[id]").forEach((elem) => result.push(elem));
        return result;
    }
    return ids
        .map(document.getElementById)
        .filter((value) => value !== null);
}
